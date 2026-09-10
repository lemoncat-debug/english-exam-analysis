'use strict';
(function(root){
 const KEY='study2010.v2',TAGS=['词义不清','长句没读懂','定位错误','主旨偏差','选项混淆','漏看限定词'];
 const object=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
 const validChoice=v=>v===null||['A','B','C','D'].includes(v);
 function fresh(){return {schema:2,year:2010,answers:{},confirmed:{},notes:{},tags:{},mastered:{},attempts:[],saved:[],last:{passage:1,page:3,view:'text',mode:'word',question:22,zoom:1,scrolls:{}},updatedAt:null}}
 function validate(raw,data){
  if(!object(raw)||raw.year!==2010||(raw.schema!==undefined&&![1,2].includes(raw.schema)))throw Error('这不是受支持的 2010 年学习记录。');
  const v=fresh(),ids=new Set(data.questions.map(q=>String(q.id))),sids=new Set(Object.keys(data.sentences));
  for(const key of ['answers','confirmed','notes','tags','mastered']){
   if(raw[key]!==undefined&&!object(raw[key]))throw Error('记录中的 '+key+' 格式无效。');
   for(const [id,value] of Object.entries(raw[key]||{})){
    if(!ids.has(id))throw Error('记录包含未知题号 '+id);
    if(key==='answers'){if(!validChoice(value))throw Error('第 '+id+' 题答案格式无效。');v.answers[id]=value}
    if(key==='confirmed'||key==='mastered'){if(typeof value!=='boolean')throw Error('状态格式无效。');v[key][id]=value}
    if(key==='notes'){if(typeof value!=='string'||value.length>2000)throw Error('单题笔记不能超过 2000 字。');v.notes[id]=value}
    if(key==='tags'){if(!Array.isArray(value)||value.some(x=>!TAGS.includes(x)))throw Error('错因标签无效。');v.tags[id]=[...new Set(value)]}
   }
  }
  if(raw.saved!==undefined&&!Array.isArray(raw.saved))throw Error('收藏格式无效。');
  if((raw.saved?.length||0)>2000)throw Error('收藏数量过多。');
  const keys=new Set();
  for(const item of raw.saved||[]){
   if(!object(item)||!['word','sentence','phrase'].includes(item.type)||typeof item.text!=='string'||item.text.length>4000||typeof item.translation!=='string'||item.translation.length>10000||typeof item.key!=='string'||item.key.length>300||!Number.isInteger(item.passage)||item.passage<0||item.passage>4||(item.sid!==null&&item.sid!==undefined&&!sids.has(item.sid)))throw Error('收藏项目格式无效。');
   if(keys.has(item.key))continue;keys.add(item.key);
   v.saved.push({key:item.key,type:item.type,text:item.text,translation:item.translation,passage:item.passage,sid:item.sid||null,reviewed:item.reviewed===true});
  }
  if(raw.attempts!==undefined&&!Array.isArray(raw.attempts))throw Error('重做记录格式无效。');
  for(const a of (raw.attempts||[]).slice(-1000)){
   if(!object(a)||!ids.has(String(a.question))||!['A','B','C','D'].includes(a.answer)||typeof a.at!=='string'||!Number.isFinite(Date.parse(a.at)))throw Error('重做记录无效。');
   v.attempts.push({question:Number(a.question),answer:a.answer,at:a.at});
  }
  if(object(raw.last)){
   const l=raw.last,pid=Number.isInteger(l.passage)&&l.passage>=0&&l.passage<=4?l.passage:1;
   const p=data.passages.find(p=>p.id===pid);v.last.passage=pid;
   v.last.page=[p.page,p.questionPage].includes(l.page)?l.page:p.page;
   v.last.question=data.questions.some(q=>q.id===l.question&&q.passage===pid)?l.question:data.questions.find(q=>q.passage===pid).id;
   for(const [k,opts] of [['view',['text','paper','photo']],['mode',['word','sentence']]])if(opts.includes(l[k]))v.last[k]=l[k];
   if(typeof l.zoom==='number'&&Number.isFinite(l.zoom))v.last.zoom=Math.max(.85,Math.min(2,l.zoom));
   if(object(l.scrolls))for(const [k,n] of Object.entries(l.scrolls))if(/^(text|paper|photo):([1-9]|10)$/.test(k)&&Number.isFinite(n)&&n>=0)v.last.scrolls[k]=Math.min(n,100000);
  }
  return v;
 }
 function load(storage,data){
  try{
   const raw=storage.getItem(KEY);
   if(raw)return {state:validate(JSON.parse(raw),data),warning:null};
   const old={year:2010};for(const k of ['answers','confirmed','saved']){const value=storage.getItem('study2010.'+k);if(value)old[k]=JSON.parse(value)}
   return {state:validate(old,data),warning:null};
  }catch{return {state:fresh(),warning:'本地记录无法读取，已使用初始记录。原存储未被删除；如有备份，可从「记录与备份」恢复。'}}
 }
 function chosen(state,q){return Object.hasOwn(state.answers,q.id)?state.answers[q.id]:q.picked}
 function grade(state,q){const a=chosen(state,q);return !a?'empty':!state.confirmed[q.id]?'pending':a===q.answer?'correct':'wrong'}
 function stats(state,qs){const result={total:qs.length,correct:0,wrong:0,pending:0,empty:0,mastered:0};for(const q of qs){result[grade(state,q)]++;if(grade(state,q)==='wrong'&&state.mastered[q.id])result.mastered++}return result}
 function recordRetry(state,q,choice,at=new Date().toISOString()){if(!['A','B','C','D'].includes(choice))throw Error('请选择一个选项');state.attempts.push({question:q.id,answer:choice,at});state.attempts=state.attempts.slice(-1000);return choice===q.answer}
 function save(storage,state){state.updatedAt=new Date().toISOString();storage.setItem(KEY,JSON.stringify(state))}
 root.StudyStore={KEY,TAGS,fresh,validate,load,chosen,grade,stats,recordRetry,save};
})(globalThis);
