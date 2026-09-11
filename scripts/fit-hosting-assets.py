"""Keep original pixel dimensions while fitting the private host's archive limit."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import json
ROOT=Path(__file__).resolve().parent.parent.resolve();CACHE=ROOT/'scripts/cache/exam-jpg';CACHE.mkdir(exist_ok=True)
refs=list((ROOT/'scripts/cache/reference-jpg').glob('*/*.jpg'))
exams=list((ROOT/'dist/library').glob('*/exam-*.jpg'))
jobs=[(p,ROOT/'dist/library'/p.parent.name/p.with_suffix('.webp').name,64,False) for p in refs]+[(p,p.with_suffix('.webp'),78,True) for p in exams]
def process(job):
 source,target,quality,move=job
 assert ROOT in source.resolve().parents and ROOT in target.resolve().parents
 with Image.open(source) as im:im.save(target,quality=quality,method=4)
 if move:
  backup=CACHE/source.parent.name/source.name;assert ROOT in backup.resolve().parents;backup.parent.mkdir(exist_ok=True)
  if not backup.exists():source.rename(backup)
  else:source.unlink()
 return target.stat().st_size
with ThreadPoolExecutor(max_workers=4) as pool:
 for i,size in enumerate(pool.map(process,jobs),1):
  if i%150==0:print(json.dumps({'done':i,'total':len(jobs)}),flush=True)
for file in (ROOT/'dist/library').glob('*/exam.json'):
 pages=json.loads(file.read_text(encoding='utf-8'))
 for p in pages:p['image']=p['image'].replace('.jpg','.webp')
 file.write_text(json.dumps(pages,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print(json.dumps({'distBytes':sum(p.stat().st_size for p in (ROOT/'dist').rglob('*') if p.is_file())}),flush=True)
