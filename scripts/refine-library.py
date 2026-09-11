import json,re,sys
from pathlib import Path
import pdfplumber
sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parent.parent
for year in range(2010,2027):
 f=ROOT/f'dist/library/{year}/exam.json';pages=json.loads(f.read_text(encoding='utf-8'))
 if year!=2021:
  with pdfplumber.open(Path(r'E:\Userdata\Documents\考研学习\考研真题\英语\真题\英语二')/f'{year}年考研英语二真题.pdf') as pdf:
   for p,pg in zip(pages,pdf.pages):
    if p.get('textSource')=='page-ocr':continue
    p['text']=pg.extract_text(x_tolerance=2,y_tolerance=6) or ''
    p['words']=[{'text':w['text'],'x':round(w['x0']/pg.width*100,3),'y':round(w['top']/pg.height*100,3),'w':round((w['x1']-w['x0'])/pg.width*100,3),'h':round((w['bottom']-w['top'])/pg.height*100,3)} for w in pg.extract_words(x_tolerance=2,y_tolerance=6)]
 for p in pages:
  n=p['page'];text=p['text'];text=re.sub(r'(?m)^(\s*)([234])\s+([0-9])([.．、])',r'\1\2\3\4',text);p['text']=text
  if n in [4,6,8,10]:
   start=(n//2-2)*5+21;starts=list(re.finditer(r'(?m)^\s*(2[1-9]|3[0-9]|40)\s*[.．、]\s*',text));qs=[]
   for j,m in enumerate(starts):qs.append({'number':int(m[1]),'text':text[m.end():starts[j+1].start() if j+1<len(starts) else len(text)].strip()})
   p['questions']=qs
  if n==2:
   starts=[]
   for w in p['words']:
    m=re.fullmatch(r'(\d{1,2})[.．]?',w['text'])
    if m and 1<=int(m[1])<=20 and w['x']<30:starts.append((int(m[1]),w['y']))
   unique={num:y for num,y in starts};qs=[]
   for num in range(1,21):
    y=unique.get(num);line=' '.join(w['text'] for w in p['words'] if y is not None and abs(w['y']-y)<1.1)
    qs.append({'number':num,'text':line or f'完形填空第 {num} 题'})
   p['questions']=qs
  if n>=13:
   numbers=[int(m[1]) for m in re.finditer(r'(?m)^\s*(46|47|48)\s*[.．、]\s*',text)]
   if not numbers:numbers=[46] if n==13 else [47,48]
   p['questions']=[{'number':num,'text':text} for num in sorted(set(numbers))]
   if 46 in numbers and 47 in numbers:p['section']='翻译 / 写作 Part A'
   elif numbers==[48]:p['section']='写作 Part B'
 f.write_text(json.dumps(pages,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
 rf=ROOT/f'dist/library/{year}/references.json'
 if rf.exists():
  refs=json.loads(rf.read_text(encoding='utf-8'))
  for p in refs:
   p['questionNumbers']=sorted(set(int(m[1]) for m in re.finditer(r'(?:^|\n)\s*[|\[]?\s*(\d{1,2})[.．、]\s+',p['text']) if 1<=int(m[1])<=48))
  rf.write_text(json.dumps(refs,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
 print(year,flush=True)
