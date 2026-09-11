import json,sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent.resolve();CACHE=ROOT/'scripts/cache/reference-jpg';CACHE.mkdir(exist_ok=True)
files=list((ROOT/'dist/library').glob('*/ref-*.jpg'))
def convert(p):
 target=p.with_suffix('.webp');backup=CACHE/p.parent.name/p.name
 assert ROOT in p.resolve().parents and ROOT in target.resolve().parents and ROOT in backup.resolve().parents
 with Image.open(p) as im:im.save(target,quality=78,method=3)
 backup.parent.mkdir(exist_ok=True)
 # Keep the JPEG used for OCR outside the published website.
 if not backup.exists():p.rename(backup)
 else:p.unlink()
 return backup.stat().st_size,target.stat().st_size
totals=[]
with ThreadPoolExecutor(max_workers=4) as pool:
 for i,sizes in enumerate(pool.map(convert,files),1):
  totals.append(sizes)
  if i%100==0:print(json.dumps({'compressed':i,'total':len(files)}),flush=True)
for file in (ROOT/'dist/library').glob('*/references.json'):
 refs=json.loads(file.read_text(encoding='utf-8'))
 for r in refs:
  new=r['image'].replace('.jpg','.webp')
  assert (ROOT/'dist'/new).exists();r['image']=new
 file.write_text(json.dumps(refs,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print(json.dumps({'beforeMB':sum(a for a,b in totals)//1000000,'afterMB':sum(b for a,b in totals)//1000000}),flush=True)
