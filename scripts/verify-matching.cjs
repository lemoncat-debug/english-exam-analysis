const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'dist/matcher.js'),'utf8'),ctx);
const catalog=JSON.parse(fs.readFileSync(path.join(root,'dist/library/catalog.json'),'utf8'));
const pages=catalog.years.flatMap(y=>JSON.parse(fs.readFileSync(path.join(root,'dist',y.exam),'utf8'))),index=ctx.ExamMatch.build(pages);let exact=0,crops=0;const fail=[],review=[];
for(const p of pages){
 const ts=ctx.ExamMatch.tokens(p.text);if(ts.length<25)continue;
 let r=ctx.ExamMatch.rank(p.text,index),dec=ctx.ExamMatch.decide(r);if(r[0]?.page.id===p.id&&dec.accepted)exact++;else if(r[0]?.page.id===p.id&&!dec.accepted)review.push(p.id);else fail.push({kind:'full',id:p.id,found:r[0]?.page.id,score:r[0]?.score,reason:dec.reason});
 if(ts.length>120){const start=Math.floor(ts.length*.4),crop=ts.slice(start,start+80).filter((_,i)=>i%13!==0).join(' ');r=ctx.ExamMatch.rank(crop,index);dec=ctx.ExamMatch.decide(r);if(r[0]?.page.id===p.id&&dec.accepted)crops++;else fail.push({kind:'crop',id:p.id,found:r[0]?.page.id,score:r[0]?.score,reason:dec.reason})}
}
for(const unrelated of ['Directions Read the following text and choose the best answer on the answer sheet.','hello world','photosynthesis chloroplasts ribosomes mitosis meiosis tectonic volcano magma lithosphere','Choose the best word for each numbered blank mark A B C D on answer sheet 10 points'])assert(!ctx.ExamMatch.decide(ctx.ExamMatch.rank(unrelated,index)).accepted,'False positive');
console.log(JSON.stringify({pages:pages.length,exact,crops,review,fail},null,2));assert.equal(fail.length,0,'Unexpected match failures');
