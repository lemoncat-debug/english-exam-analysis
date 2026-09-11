"""Build local, traceable page assets from the user's individual exam PDFs."""
import json,re,sys,csv
from pathlib import Path
import pdfplumber,pypdfium2 as pdfium
from PIL import Image
sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/library';OUT.mkdir(parents=True,exist_ok=True)
EXAMS=Path(r'E:\Userdata\Documents\考研学习\考研真题\英语\真题\英语二')
REFS=Path(r'E:\Userdata\Documents\考研学习\考研真题\英语\解析\kaoyanzhenti\英语真题解析\英语二真题解析')
def section(page):
 return '完形填空' if page<=2 else '阅读 Text '+str((page-1)//2) if page<=10 else '新题型' if page<=12 else '翻译' if page==13 else '写作'
def render(doc,index,path,width):
 if path.exists():return
 page=doc[index];im=page.render(scale=width/page.get_width()).to_pil().convert('RGB');im.save(path,quality=84,optimize=True);im.close();page.close()
catalog={'schema':1,'examType':'英语二','years':[],'excluded':['10-22考研英语二真题无解析.pdf']}
tokens=set();jobs=[]
for file in sorted(EXAMS.glob('20*年考研英语二真题.pdf')):
 year=int(file.name[:4]);folder=OUT/str(year);folder.mkdir(exist_ok=True);doc=pdfium.PdfDocument(str(file));pages=[]
 with pdfplumber.open(file) as pdf:
  for i,p in enumerate(pdf.pages):
   page=i+1;words=p.extract_words(x_tolerance=2,y_tolerance=3)
   words=[{'text':w['text'],'x':round(w['x0']/p.width*100,3),'y':round(w['top']/p.height*100,3),'w':round((w['x1']-w['x0'])/p.width*100,3),'h':round((w['bottom']-w['top'])/p.height*100,3)} for w in words]
   text=p.extract_text(x_tolerance=2,y_tolerance=3) or ''
   questions=[]
   if page in [4,6,8,10]:
    starts=list(re.finditer(r'(?m)^\s*(2[1-9]|3[0-9]|40)\s*[.．、]\s*',text))
    for j,m in enumerate(starts):
     chunk=text[m.end():starts[j+1].start() if j+1<len(starts) else len(text)].strip()
     questions.append({'number':int(m[1]),'text':chunk})
   elif page==2:
    for n in range(1,21):questions.append({'number':n,'text':f'完形填空第 {n} 题'})
   elif page in [11,12]:questions=[{'number':n,'text':f'新题型第 {n} 题'} for n in range(41,46)]
   elif page==13:questions=[{'number':46,'text':text}]
   elif page==14:questions=[{'number':n,'text':f'写作第 {n} 题'} for n in [47,48]]
   image=f'library/{year}/exam-{page}.jpg';render(doc,i,ROOT/'dist'/image,1500)
   pages.append({'id':f'{year}-{page}','year':year,'page':page,'section':section(page),'image':image,'text':text,'words':words,'questions':questions})
   tokens.update(re.findall(r"[a-z]+(?:'[a-z]+)?",text.lower()))
 doc.close();(folder/'exam.json').write_text(json.dumps(pages,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
 ref=REFS/f'{year}年张剑英语二解析.pdf';count=0
 if ref.exists():
  rdoc=pdfium.PdfDocument(str(ref));count=len(rdoc)
  for i in range(count):
   image=f'library/{year}/ref-{i+1}.jpg';render(rdoc,i,ROOT/'dist'/image,1500)
   jobs.append({'year':year,'page':i+1,'image':image})
  rdoc.close()
 catalog['years'].append({'year':year,'pages':len(pages),'referencePages':count,'exam':f'library/{year}/exam.json','reference':f'library/{year}/references.json' if count else None,'sourceExam':file.name,'sourceReference':ref.name if count else None})
 print(json.dumps({'year':year,'examPages':len(pages),'referencePages':count}),flush=True)
(OUT/'catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(ROOT/'scripts/cache/reference-jobs.json').write_text(json.dumps(jobs),encoding='utf-8')
sizes={}
for file in OUT.glob('*/exam-*.jpg'):
 with Image.open(file) as im:sizes[file.relative_to(ROOT/'dist').as_posix()]={'w':im.width,'h':im.height}
(ROOT/'scripts/cache/image-sizes.json').write_text(json.dumps(sizes),encoding='utf-8')
# Bundle only words that appear in this library, plus their likely base forms.
wanted=set(tokens)
for t in tokens:
 for base in [t.rstrip('s'),t[:-2] if t.endswith('es') else t,t[:-3] if t.endswith('ing') else t,t[:-2] if t.endswith('ed') else t]:wanted.update([base,base+'e'])
dictionary={}
with open(r'E:\XUEXISOFT\考研英语精读网站_2010_20260911\scripts\cache\ecdict.csv',encoding='utf-8') as f:
 for r in csv.DictReader(f):
  w=r['word'].lower()
  if w in wanted and r.get('translation'):dictionary[w]={'zh':r['translation'].replace('\\n','\n'),'phonetic':r.get('phonetic','')}
(OUT/'dictionary.json').write_text(json.dumps(dictionary,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print(json.dumps({'referenceJobs':len(jobs),'dictionary':len(dictionary)}),flush=True)
