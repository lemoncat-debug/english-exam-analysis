import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(root,'dist/data.js'),'utf8'),context);
const d=context.window.STUDY_DATA;
assert.equal(d.passages.length,5);assert.equal(d.pages.length,10);assert.equal(d.questions.length,40);
assert.equal(new Set(d.questions.map(q=>q.id)).size,40);
for(const s of Object.values(d.sentences)){assert(s.en.trim());assert(s.zh.trim(),s.id+' missing translation');assert(!s.en.includes('�'),s.id+' OCR replacement character')}
for(const q of d.questions){assert.equal(q.options.length,4);assert.equal(q.optionsZh.length,4);assert('ABCD'.includes(q.answer));assert(q.reason&&q.trap&&q.tip);assert(Object.values(d.sentences).some(s=>s.passage===q.passage&&s.paragraph>0&&s.en.toLowerCase().includes(q.evidence.toLowerCase())),'No evidence for '+q.id)}
for(const p of d.pages){assert(fs.existsSync(path.join(root,'dist',p.paper)));assert(fs.existsSync(path.join(root,'dist',p.photo)));assert.equal(p.words.length,p.photoWords.length);for(const w of p.words){assert(w.w>=0&&w.h>=0);if(w.sid)assert(d.sentences[w.sid])}}
for(const asset of ['style.css','app.js','context.js','photo-import.js','site-tools.js','vendor/tesseract.min.js','vendor/worker.min.js','vendor/eng.traineddata.gz'])assert(fs.existsSync(path.join(root,'dist',asset)),asset+' missing');
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){if(!m[1].startsWith('http'))assert(fs.existsSync(path.join(root,'dist',m[1])),m[1])}
assert(d.dictionary.momentum.zh);assert(d.dictionary.the.zh);assert(d.dictionary.salerooms.zh);
console.log(JSON.stringify({passages:d.passages.length,translatedUnits:Object.keys(d.sentences).length,questions:d.questions.length,pages:d.pages.length,dictionaryEntries:Object.keys(d.dictionary).length,linkedWords:d.pages.map(p=>({page:p.id,matched:p.words.filter(w=>w.sid).length,total:p.words.length}))},null,2));
