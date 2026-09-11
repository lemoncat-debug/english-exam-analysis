'use strict';
if(document.modelContext?.registerTool){
 const lifecycle=new AbortController();
 const tool={name:'open_study_question',title:'打开真题复盘',description:'在精读台打开指定的 2010 年英语二题目，可选择展开答案。不修改学习者的作答记录。',inputSchema:{type:'object',properties:{question:{type:'integer',minimum:1,maximum:40},showExplanation:{type:'boolean'}},required:['question'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||!Number.isInteger(input.question)||input.question<1||input.question>40||Object.keys(input).some(k=>!['question','showExplanation'].includes(k))||(input.showExplanation!==undefined&&typeof input.showExplanation!=='boolean'))throw Error('题号必须为 1—40 的整数');const q=D.questions.find(q=>q.id===input.question);switchPassage(q.passage);S.question=q.id;S.panel='questions';S.reveal=input.showExplanation===true;render();return {question:q.id,passage:q.passage,explanationVisible:S.reveal}}};
 try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{}
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
