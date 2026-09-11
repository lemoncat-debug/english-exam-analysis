const fs=require('node:fs'),path=require('node:path');
const {createWorker}=require('tesseract.js');
const root=path.resolve(__dirname,'..');
(async()=>{
 const jobs=JSON.parse(fs.readFileSync(path.join(root,'scripts/cache/reference-jobs.json'),'utf8'));
 const cache=path.join(root,'scripts/cache/reference-ocr');fs.mkdirSync(cache,{recursive:true});
 let cursor=0,finished=0;
 await Promise.all(Array.from({length:4},async()=>{
  const worker=await createWorker('eng',1,{langPath:path.join(root,'dist/2010/vendor'),cachePath:path.join(root,'scripts/cache')});
  await worker.setParameters({tessedit_pageseg_mode:'3'});
  try{while(cursor<jobs.length){const job=jobs[cursor++],out=path.join(cache,job.year+'-'+job.page+'.json');
   if(!fs.existsSync(out)){const {data}=await worker.recognize(path.join(root,'dist',job.image));fs.writeFileSync(out,JSON.stringify({...job,text:data.text}));}
   finished++;if(finished%25===0)console.log(JSON.stringify({finished,total:jobs.length}));
  }}finally{await worker.terminate()}
 }));
 for(const year of [...new Set(jobs.map(j=>j.year))]){const pages=jobs.filter(j=>j.year===year).map(j=>JSON.parse(fs.readFileSync(path.join(cache,j.year+'-'+j.page+'.json'),'utf8')));fs.writeFileSync(path.join(root,'dist/library',String(year),'references.json'),JSON.stringify(pages));}
 console.log('Reference OCR complete: '+finished);
})().catch(e=>{console.error(e);process.exitCode=1});
