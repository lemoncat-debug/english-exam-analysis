/* No API calls. Prepare resumable, hash-addressed input for the user-selected Codex model. */
const fs=require('fs'),path=require('path'),crypto=require('crypto'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..'),LIB=path.join(ROOT,'dist/library'),OUT=path.join(ROOT,'translation-work');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
fs.mkdirSync(OUT,{recursive:true});fs.mkdirSync(path.join(OUT,'inputs'),{recursive:true});fs.mkdirSync(path.join(OUT,'completed'),{recursive:true});fs.mkdirSync(path.join(LIB,'translations'),{recursive:true});
const manifest={schemaVersion:1,translationVersion:'flow-1',requestedModel:'gpt-5.6-terra',generationMethod:'Codex model selected by user; no API',createdAt:new Date().toISOString(),tasks:[],unextractable:[]};
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(ROOT,'dist/2010/data.js'),'utf8'),ctx);const legacy=ctx.window.STUDY_DATA;
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
let total=0,migrated=0,words=0;
for(let year=2010;year<=2026;year++){
 const pages=JSON.parse(fs.readFileSync(path.join(LIB,''+year,'exam.json'),'utf8'));let sentences=[];
 for(const p of pages){if(!p.words?.length){manifest.unextractable.push({year,page:p.page,reason:'No reliable word layer'});continue}
  let start=0,paragraph=1;for(let i=0;i<p.words.length;i++){
   const w=p.words[i],next=p.words[i+1];const abbreviation=/^(?:Mr|Mrs|Dr|Ms|Prof|St|vs|etc|U\.S)\.$/i.test(w.text);
   const boundary=!next||(i===1&&p.words[0].text==='Text'&&/^\d$/.test(w.text))||(/[.!?]["”')]*$/.test(w.text)&&!abbreviation&&i-start>2)||i-start>=85||(/^(?:\[A\]|\(?[1-4]?\d[.)])$/.test(next?.text||'')&&next.y-w.y>1);
   if(!boundary)continue;
   const slice=p.words.slice(start,i+1),english=slice.map(w=>w.text).join(' '),sourceTextHash=hash(english),sentenceId=year+'-p'+p.page+'-w'+start+'-'+sourceTextHash.slice(0,10);
   const old=year===2010?Object.values(legacy.sentences).find(s=>norm(s.en)===norm(english)):null;
   const item={schemaVersion:1,sentenceId,year,page:p.page,section:p.section,paragraph,english,startWord:start,endWord:i,sourceTextHash,translationVersion:'flow-1',generationModel:old?'legacy-import':null,generatedAt:null,translation:old?.zh||null,grammar:null,status:old?'legacy-translation':'pending',tokens:slice.map((w,j)=>({wordIndex:start+j,surface:w.text,lemma:null,partOfSpeech:null,kaoyanMeaning:null,contextMeaning:null,collocations:[],familiarButRareMeaning:null,paraphrases:[]}))};
   sentences.push(item);total++;words+=slice.length;if(old)migrated++;if(next&&next.y-w.y>2)paragraph++;start=i+1;
  }
  const group=sentences.filter(s=>s.page===p.page),inputHash=hash(JSON.stringify(group.map(s=>[s.sentenceId,s.sourceTextHash]))),taskId=year+'-page'+p.page+'-'+inputHash.slice(0,12),file='inputs/'+taskId+'.json';
  const input={schemaVersion:1,taskId,year,page:p.page,section:p.section,sourceTextHash:inputHash,instruction:'Translate every sentence and every English word occurrence in context. Preserve sentenceId, sourceTextHash, wordIndex and surface exactly. Fill translation, grammar and contextual token fields. Do not claim API usage. Output a JSON object with schemaVersion, taskId, sourceTextHash, generationModel, generatedAt, sentences. Use GPT-5.6 Terra only after the user confirms the task model switch.',sentences:group};
  fs.writeFileSync(path.join(OUT,file),JSON.stringify(input,null,2));manifest.tasks.push({taskId,year,page:p.page,file,sourceTextHash:inputHash,sentences:group.length,wordPositions:group.reduce((n,s)=>n+s.tokens.length,0),state:fs.existsSync(path.join(OUT,'completed',taskId+'.json'))?'awaiting-validation':'pending'});
 }
 const target=path.join(LIB,'translations',year+'.json');
 const previous=fs.existsSync(target)?JSON.parse(fs.readFileSync(target,'utf8')).sentences:[];
 sentences=sentences.map(s=>{const old=previous.find(o=>o.sentenceId===s.sentenceId&&o.sourceTextHash===s.sourceTextHash&&o.status==='generated');return old||s});
 fs.writeFileSync(target,JSON.stringify({schemaVersion:1,year,translationVersion:'flow-1',sentences}));
}
fs.writeFileSync(path.join(OUT,'manifest.json'),JSON.stringify(manifest,null,2));
const answers={};for(const q of legacy.questions)answers['2010-'+q.id]={answer:q.answer,verified:true,source:'2010年张剑英语二解析.pdf · 已有精读版核验数据',pdfPage:q.refPage,evidence:q.evidence};fs.writeFileSync(path.join(LIB,'answer-keys.json'),JSON.stringify({schemaVersion:1,answers}));
const report={pages:manifest.tasks.length,sentences:total,wordPositions:words,legacyExactTranslations:migrated,unextractable:manifest.unextractable,apiRequests:0,generatedByTerra:0};fs.writeFileSync(path.join(OUT,'coverage.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
