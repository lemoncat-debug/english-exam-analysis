import sys, json, re, shutil, csv, difflib
from pathlib import Path
import pdfplumber, pypdfium2 as pdfium
import cv2, numpy as np
from PIL import Image
sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist'; ASSETS=OUT/'assets'; ASSETS.mkdir(exist_ok=True)
EXAM=Path(r'E:/Userdata/Documents/考研学习/考研真题/英语/真题/英语二/2010年考研英语二真题.pdf')
REFERENCE=Path(r'E:/Userdata/Documents/考研学习/考研真题/英语/解析/kaoyanzhenti/英语真题解析/英语二真题解析/2010年张剑英语二解析.pdf')
PHOTOS=['002703','002720','002727','002733','002737','002742','002746','002753','002757','002802']
def norm(t): return re.sub(r'[^a-z0-9]','',t.lower())
def clean(t):
    for a,b in {'compames':'companies','express10n':'expression','southwestem':'southwestern','HlNl':'H1N1','controversy m':'controversy in','" m severity':'" in severity','Colgate- Palmolive':'Colgate-Palmolive','T lor v.':'Taylor v.',' be ay representative':' be representative','-double':'— double','-Procter':'— Procter'}.items(): t=t.replace(a,b)
    return t
def split_sentences(t):
    for abbr in ['Dr.','Mr.','U.S.','v.']:t=t.replace(abbr,abbr.replace('.','§'))
    return [s.replace('§','.').strip() for s in re.split(r'(?<=[.!?])\s+(?=["“A-Z])',t) if s.strip()]
data={'passages':[],'pages':[],'sentences':{},'dictionary':{},'questions':[]}
# Authored bilingual passages 1 and 2.
current=None;paragraph=0
for line in (ROOT/'scripts/reading.tsv').read_text(encoding='utf-8').splitlines():
    if line.startswith('@'):
        tag,title=line[1:].split('|',1);current={'id':int(tag),'title':title,'paragraphs':[]};data['passages'].append(current);paragraph=-1
    elif not line.strip():paragraph=-1
    else:
        if paragraph==-1:current['paragraphs'].append([]);paragraph=len(current['paragraphs'])-1
        en,zh=line.split('|',1);current['paragraphs'][paragraph].append({'en':en,'zh':zh})
with pdfplumber.open(EXAM) as pdf:
    for pid,pageindex,title in [(0,0,'猪流感与公共卫生'),(3,6,'广告如何塑造习惯'),(4,8,'陪审团制度的演变')]:
        paras=[]
        for line in pdf.pages[pageindex].extract_text_lines():
            if line['top']<(200 if pid==0 else 90) or line['top']>700:continue
            if line['x0']>85 or not paras:paras.append([])
            if line['text']=='ay':continue
            paras[-1].append(line['text'])
        p={'id':pid,'title':title,'paragraphs':[[{'en':s,'zh':''} for s in split_sentences(clean(' '.join(lines)))] for lines in paras]}
        if pid==0:
            for para in p['paragraphs']:
                for s in para:
                    s['en']=s['en'].replace('is_�16�_','is __16__').replace('to_9_','to __9__')
                    for n in [1,2,4,6,7]:s['en']=s['en'].replace('_'+str(n)+'_','__'+str(n)+'__')
                    for n in [3,5,8,10,11,12,13,14,15,17,18,19,20]:
                        s['en']=re.sub(r'(?<= )'+str(n)+r'(?= )','__'+str(n)+'__',s['en'])
        transfile=ROOT/f'scripts/translations{pid}.json'
        if transfile.exists():
            trans=json.loads(transfile.read_text(encoding='utf-8'))
            flat=[s for para in p['paragraphs'] for s in para]
            assert len(trans)==len(flat),(pid,len(trans),len(flat))
            for s,zh in zip(flat,trans):s['zh']=zh
        data['passages'].append(p)
    data['passages'].sort(key=lambda p:p['id'])
    for p in data['passages']:
        p['page']=1 if p['id']==0 else p['id']*2+1;p['questionPage']=p['page']+1
        for pn,para in enumerate(p['paragraphs']):
            for sn,s in enumerate(para):
                s.update(id=f"p{p['id']}-{pn}-{sn}",passage=p['id'],paragraph=pn+1)
                data['sentences'][s['id']]=s
    questionfile=ROOT/'scripts/questions.json'
    if questionfile.exists():
        data['questions']=json.loads(questionfile.read_text(encoding='utf-8'))
        for q in data['questions']:
            for i,(en,zh) in enumerate([(q['text'],q['zh'])]+list(zip(q['options'],q['optionsZh']))):
                sid=f"q{q['id']}-{i}"
                data['sentences'][sid]={'id':sid,'en':en,'zh':zh,'passage':q['passage'],'paragraph':0}
    pdfdoc=pdfium.PdfDocument(str(EXAM))
    for i in range(10):
        pg=pdf.pages[i]
        words=pg.extract_words(x_tolerance=2,y_tolerance=4,keep_blank_chars=False)
        words=[dict(text=clean(w['text']).replace('federaljurors','federal jurors').replace('onjuries','on juries'),x=round(w['x0']/pg.width*100,4),y=round(w['top']/pg.height*100,4),w=round((w['x1']-w['x0'])/pg.width*100,4),h=round((w['bottom']-w['top'])/pg.height*100,4),sid=None) for w in words if w['top']<700]
        pid=0 if i<2 else i//2
        target=[]
        if i%2==0:
            sentences=[s for s in data['sentences'].values() if s['passage']==pid and s['paragraph']>0]
        else:sentences=[s for key,s in data['sentences'].items() if key.startswith('q') and s['passage']==pid]
        for s in sentences:
            for w in s['en'].split():target.append((norm(w),s['id']))
        a=[norm(w['text']) for w in words];b=[w[0] for w in target]
        for block in difflib.SequenceMatcher(None,a,b,autojunk=False).get_matching_blocks():
            for j in range(block.size):words[block.a+j]['sid']=target[block.b+j][1]
        # Fill tiny OCR/tokenization gaps only between words of the same sentence.
        for j,w in enumerate(words):
            if w['sid'] is None and j>0 and j+1<len(words) and words[j-1]['sid']==words[j+1]['sid']:
                w['sid']=words[j-1]['sid']
        for w in words:
            if not w['sid']:continue
            # Use corrected source token for merged OCR tokens only when exact normalization agrees.
        page={'id':i+1,'passage':pid,'words':words,'paper':f'assets/paper-{i+1}.jpg','photo':f'assets/photo-{i+1}.jpg','photoWords':[]}
        paperfile=ASSETS/f'paper-{i+1}.jpg';photofile=ASSETS/f'photo-{i+1}.jpg';coordfile=ROOT/f'scripts/cache/coords-{i+1}.json'
        if not paperfile.exists():pdfdoc[i].render(scale=2.5).to_pil().convert('RGB').save(paperfile,quality=90)
        if not photofile.exists():
            photo=Image.open(f'E:/Userdata/Downloads/IMG_20260911_{PHOTOS[i]}.jpg')
            if photo.width>photo.height:photo=photo.transpose(Image.Transpose.ROTATE_90)
            photo.thumbnail((1800,2400));photo.save(photofile,quality=90)
        if not coordfile.exists():
            paper=cv2.imdecode(np.fromfile(paperfile,dtype=np.uint8),0);photo=cv2.imdecode(np.fromfile(photofile,dtype=np.uint8),0)
            detector=cv2.SIFT_create(nfeatures=7000)
            kp1,de1=detector.detectAndCompute(paper,None);kp2,de2=detector.detectAndCompute(photo,None)
            matches=cv2.BFMatcher().knnMatch(de1,de2,k=2);good=[m for m,n in matches if m.distance<0.68*n.distance]
            if len(good)<12:raise RuntimeError(f'Not enough alignment points: page {i+1}')
            h,mask=cv2.findHomography(np.float32([kp1[m.queryIdx].pt for m in good]),np.float32([kp2[m.trainIdx].pt for m in good]),cv2.RANSAC,4)
            print('alignment',i+1,'inliers',int(mask.sum()),'/',len(good),flush=True)
            coordfile.write_text(json.dumps({'h':h.tolist(),'paper':[paper.shape[1],paper.shape[0]],'photo':[photo.shape[1],photo.shape[0]]}),encoding='utf-8')
        align=json.loads(coordfile.read_text());H=np.array(align['h']);pw,ph=align['paper'];iw,ih=align['photo']
        for w in words:
            corners=np.array([[[w['x']*pw/100,w['y']*ph/100],[(w['x']+w['w'])*pw/100,w['y']*ph/100],[(w['x']+w['w'])*pw/100,(w['y']+w['h'])*ph/100],[w['x']*pw/100,(w['y']+w['h'])*ph/100]]],np.float32)
            xy=cv2.perspectiveTransform(corners,H)[0]
            page['photoWords'].append({**w,'points':[[round(float(x)/iw*100,4),round(float(y)/ih*100,4)] for x,y in xy]})
        data['pages'].append(page)
dictfile=ROOT/'scripts/cache/ecdict.csv'
entries={r['word'].lower():r for r in csv.DictReader(dictfile.open(encoding='utf-8'))}
forms={}
for key,row in entries.items():
    for part in row.get('exchange','').split('/'):
        if ':' in part:
            kind,value=part.split(':',1)
            if kind not in ['0','1']:forms[value.lower()]=key
needed=set()
for s in data['sentences'].values():needed.update(re.findall(r"[A-Za-z]+(?:['’-][A-Za-z]+)*",s['en'].lower()))
for p in data['pages']:
    for w in p['words']:needed.add(w['text'].lower().strip('.,;:!?()[]"'))
missing=[]
for word in sorted(needed):
    key=word if word in entries else forms.get(word)
    if key is None and word.endswith("'s"):key=word[:-2] if word[:-2] in entries else None
    row=entries.get(key,{})
    if row.get('translation'):
        data['dictionary'][word]={'word':word,'lemma':key,'phonetic':row.get('phonetic',''),'zh':row['translation'].replace('\\n','\n')}
    else:missing.append(word)
override=ROOT/'scripts/dictionary-overrides.json'
if override.exists():
    for word,value in json.loads(override.read_text(encoding='utf-8')).items():data['dictionary'][word]={'word':word,'lemma':word,'phonetic':'','zh':value}
shutil.copyfile(ROOT/'scripts/cache/LICENSE',ASSETS/'ECDICT-LICENSE.txt')
shutil.copyfile(EXAM,ASSETS/'exam-2010.pdf')
shutil.copyfile(REFERENCE,ASSETS/'reference-2010.pdf')
(OUT/'data.js').write_text('window.STUDY_DATA='+json.dumps(data,ensure_ascii=False)+';',encoding='utf-8')
(ROOT/'scripts/cache/missing-words.json').write_text(json.dumps(missing,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'scripts/cache/sentence-index.json').write_text(json.dumps({p['id']:[s for para in p['paragraphs'] for s in para] for p in data['passages']},ensure_ascii=False,indent=2),encoding='utf-8')
print('Ready',len(data['sentences']),'sentences',len(data['dictionary']),'dictionary entries',len(missing),'unmatched')
