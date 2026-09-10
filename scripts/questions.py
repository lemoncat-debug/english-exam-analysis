import json,re,sys
from pathlib import Path
import pdfplumber
sys.stdout.reconfigure(encoding='utf-8')
root=Path(__file__).resolve().parent.parent
qs=[]
with pdfplumber.open(r'E:/Userdata/Documents/考研学习/考研真题/英语/真题/英语二/2010年考研英语二真题.pdf') as pdf:
    for name in ['cloze','reading']:
        for line in (root/f'scripts/questions-{name}.tsv').read_text(encoding='utf-8').splitlines():
            n,ans,picked,zh,optszh,reason,trap,tip,evidence,ref=line.split('|')
            n=int(n);pid=0 if n<=20 else (n-21)//5+1;page=1 if pid==0 else pid*2+1
            raw=pdf.pages[page].extract_text()
            if pid==0:
                chunk=re.search(r'(?m)^'+str(n)+r'\.\s+(.+)',raw).group(1)
                text='Choose the best word(s) for blank '+str(n)+'.'
                options=re.split(r'\[[ABCD]\]\s*',chunk)[1:]
            else:
                match=re.search(r'(?ms)^'+str(n)+r'\.\s+(.*?)(?=^\d+\.\s|\Z)',raw);chunk=match.group(1)
                parts=re.split(r'\[[ABCD]\]\s*',chunk)
                text=parts[0];options=parts[1:]
            def clean(s):
                s=re.sub(r'\s+-\d+\s*-\s*$','',s.strip())
                s=re.sub(r'\s+',' ',s).replace('onjuries','on juries').replace('federaljurors','federal jurors')
                s=re.sub(r'[_,-]{2,}|_\s+_+', '____',s)
                return s.strip()
            options=[clean(o) for o in options]
            assert len(options)==4,(n,options)
            qs.append(dict(id=n,passage=pid,answer=ans,picked=picked,text=clean(text),zh=zh,options=options,optionsZh=optszh.split('~'),reason=reason,trap=trap,tip=tip,evidence=evidence,refPage=int(ref)))
(root/'scripts/questions.json').write_text(json.dumps(qs,ensure_ascii=False,indent=2),encoding='utf-8')
print('Created',len(qs),'questions')
