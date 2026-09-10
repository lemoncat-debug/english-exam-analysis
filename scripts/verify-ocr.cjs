const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const {createWorker}=require('tesseract.js');
(async()=>{
 const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(path.join(root,'dist/data.js'),'utf8'),ctx);vm.runInContext(fs.readFileSync(path.join(root,'dist/photo-import.js'),'utf8'),ctx);
 const d=ctx.window.STUDY_DATA;
 assert.equal(ctx.matchPhotoWords([{text:'anything'}],[{text:'else',sid:'x'}]).matched,0);
 const worker=await createWorker('eng',1,{langPath:path.join(root,'dist/vendor'),cachePath:path.join(root,'scripts/cache')});
 try{
  await worker.setParameters({tessedit_pageseg_mode:'3'});
  for(const page of [3,10]){
   const {data}=await worker.recognize(path.join(root,'dist/assets/photo-'+page+'.jpg'),{},{text:true,blocks:true});
   const words=data.blocks.flatMap(b=>b.paragraphs.flatMap(p=>p.lines.flatMap(l=>l.words))).filter(w=>w.confidence>=20);
   const result=ctx.matchPhotoWords(words,d.pages[page-1].words);
   assert(result.ratio>=.35&&result.matched>=20,'Photo did not match '+page);
   assert(result.words.some(w=>w.sid),'No sentences matched');
   console.log(JSON.stringify({page,ocrWords:words.length,matched:result.matched,ratio:Number(result.ratio.toFixed(3)),linked:result.words.filter(w=>w.sid).length}));
  }
 }finally{await worker.terminate()}
})().catch(e=>{console.error(e.message);process.exitCode=1});
