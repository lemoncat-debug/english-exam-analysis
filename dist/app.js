'use strict';
const D=window.STUDY_DATA, $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s).toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/g,'').replace(/’/g,"'").replace(/_+.*$/,'');
const storageAdapter={getItem:key=>localStorage.getItem(key),setItem:(key,value)=>localStorage.setItem(key,value)};
const initial=StudyStore.load(storageAdapter,D);
const S={...initial.state.last,word:null,sid:null,panel:'lookup',reveal:false,rawWord:'',answers:initial.state.answers,saved:initial.state.saved,confirmed:initial.state.confirmed,notes:initial.state.notes,tags:initial.state.tags,mastered:initial.state.mastered,attempts:initial.state.attempts,scrolls:initial.state.last.scrolls,uploads:{},filter:'all',retry:false,retryChoice:null,retrySubmitted:false,storageWarning:initial.warning};
function stateSnapshot(){return {schema:2,year:2010,answers:S.answers,confirmed:S.confirmed,notes:S.notes,tags:S.tags,mastered:S.mastered,attempts:S.attempts,saved:S.saved,last:{passage:S.passage,page:S.page,view:S.view,mode:S.mode,question:S.question,zoom:S.zoom,scrolls:S.scrolls}}}
let toastTimer;
function toast(msg){$('#toast').textContent=msg;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,3200)}
function persist(){try{if(S.storageWarning){const original=storageAdapter.getItem(StudyStore.KEY);if(original)storageAdapter.setItem(StudyStore.KEY+'.recovery',original);S.storageWarning=null}StudyStore.save(storageAdapter,stateSnapshot());document.dispatchEvent(new Event('study:changed'))}catch{toast('浏览器无法保存记录，请立即导出备份。')}}
function passage(){return D.passages.find(p=>p.id===S.passage)}
function questions(){return D.questions.filter(q=>q.passage===S.passage)}
function answer(q){return StudyStore.chosen(S,q)}
function switchPassage(id){if(!D.passages.some(p=>p.id===id))throw Error('没有这篇文章');S.passage=id;S.page=passage().page;S.sid=null;S.word=null;S.question=questions()[0]?.id??null;S.reveal=false;S.retry=false;S.retryChoice=null;S.retrySubmitted=false;S.filter='all';render()}
function sentenceMarkup(s){return '<span class="sentence '+(S.sid===s.id?'selected':'')+'" data-sid="'+esc(s.id)+'">'+s.en.split(/(\s+)/).map(t=>/\s/.test(t)?t:'<button class="word" data-word="'+esc(t)+'" data-sid="'+esc(s.id)+'">'+esc(t)+'</button>').join('')+'</span>'}
function render(){
 $('#passageNav').innerHTML=D.passages.map(p=>'<button data-passage="'+p.id+'" class="'+(p.id===S.passage?'active':'')+'"><small>'+(p.id?'READING / TEXT '+p.id:'USE OF ENGLISH')+'</small><strong>'+esc(p.title)+'</strong></button>').join('');
 $('#passageTitle').textContent=passage().title;$('#sectionLabel').textContent=S.passage?'READING / TEXT '+S.passage:'USE OF ENGLISH';
 $('#pageSwitch').innerHTML=[passage().page,passage().questionPage].map((p,i)=>'<button data-page="'+p+'" class="'+(S.page===p?'active':'')+'">'+(i?'题目':'文章')+'</button>').join('');
 document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===S.view));
 document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===S.mode));
 document.querySelectorAll('[data-panel]').forEach(b=>b.classList.toggle('active',b.dataset.panel===S.panel));
 $('#wrongBadge').textContent=StudyStore.stats(S,questions()).wrong||'';
 renderReader();renderPanel();
}
function renderReader(){
 const reader=$('#reader');reader.className='reader '+(S.mode==='sentence'?'sentence-mode ':'')+(S.view==='text'?'':'photo-reader');
 $('#readingHint').textContent=S.view==='photo'?'照片已转正。点读区域按电子真题定位，纸张弯曲处可能略有偏差。':'点击单词查释义，切换「句子」看整句翻译。';
 if(S.view==='text'){
  if(S.page===passage().page){
   reader.innerHTML=passage().paragraphs.map((para,i)=>'<div class="paragraph"><span class="paragraph-number">'+String(i+1).padStart(2,'0')+'</span><div class="paragraph-body" style="font-size:'+20*S.zoom+'px">'+para.map(sentenceMarkup).join(' ')+'</div></div>').join('')+'<div class="passage-footer">2010 年英语二 · '+(S.passage?'Text '+S.passage:'完形填空')+' · 点击后显示翻译</div>';
  }else{
   reader.innerHTML=questions().map(q=>'<div class="paper-question"><div class="question-title">'+q.id+'. '+sentenceMarkup(D.sentences['q'+q.id+'-0'])+'</div>'+q.options.map((o,i)=>'<p style="font:18px/1.8 Georgia,serif">['+'ABCD'[i]+'] '+sentenceMarkup(D.sentences['q'+q.id+'-'+(i+1)])+'</p>').join('')+'<button data-question="'+q.id+'" class="evidence-button">复盘第 '+q.id+' 题</button><div class="divider"></div></div>').join('')||'<p>题目正在整理。</p>';
  }
 }else{
  const pg=D.pages.find(p=>p.id===S.page),uploaded=S.uploads[S.page],photo=S.view==='photo';
  const source=photo?(uploaded?.url||pg.photo):pg.paper,words=photo?(uploaded?.words||pg.photoWords):pg.words;
  reader.innerHTML='<div class="image-wrap" style="width:'+S.zoom*100+'%"><img src="'+esc(source)+'" alt="2010 年英语二第 '+S.page+' 页'+(photo?'作答照片':'真题')+'"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="图片文字点读层">'+words.map((w,i)=>{
   const attrs='class="image-word '+(S.sid&&w.sid===S.sid?'selected':'')+'" data-image-word="'+i+'" tabindex="0" role="button" aria-label="'+esc(w.text)+'"';
   return w.points?'<polygon '+attrs+' points="'+w.points.map(p=>p.join(',')).join(' ')+'"/>':'<rect '+attrs+' x="'+w.x+'" y="'+w.y+'" width="'+w.w+'" height="'+w.h+'"/>';
  }).join('')+'</svg></div>';
 }
}
function lookup(text,sid){S.rawWord=String(text);S.word=norm(text);S.sid=sid;S.panel='lookup';renderPanel();document.querySelectorAll('[data-panel]').forEach(b=>b.classList.toggle('active',b.dataset.panel===S.panel));document.querySelectorAll('.word.selected,.sentence.selected').forEach(el=>el.classList.remove('selected'));document.querySelectorAll('[data-sid]').forEach(el=>{if(el.dataset.sid===sid&&((el.classList.contains('sentence')&&S.mode==='sentence')||(el.classList.contains('word')&&norm(el.dataset.word)===S.word)))el.classList.add('selected')});document.querySelectorAll('[data-image-word]').forEach(el=>{const pg=D.pages.find(p=>p.id===S.page),ws=S.view==='photo'?(S.uploads[S.page]?.words||pg.photoWords):pg.words,w=ws[Number(el.dataset.imageWord)];el.classList.toggle('selected',S.mode==='sentence'?w.sid===sid&&!!sid:w.sid===sid&&norm(w.text)===S.word)});if(innerWidth<900)document.body.classList.add('panel-open')}
function dictionary(word){if(/^[0-9]+(?:[.,][0-9]+)*$/.test(word||''))return {word,lemma:word,zh:/%/.test(S.rawWord||'')?'百分之 '+word:'数字 '+word};const exact=D.dictionary[word];if(exact)return exact;const base=word?.replace(/'s$/,'');if(D.dictionary[base])return D.dictionary[base];return null}
function renderPanel(){
 document.querySelectorAll('[data-panel]').forEach(b=>b.classList.toggle('active',b.dataset.panel===S.panel));
 if(S.panel==='questions'){renderQuestions();return}
 const s=D.sentences[S.sid],entry=dictionary(S.word),box=$('#panelContent');
 if(!S.word&&!s){box.innerHTML='<div class="kicker">READ WITH CONTEXT</div><div class="empty-title">把词放回句子里。</div><p class="empty-copy">点一下左侧的单词，查看释义和所在句子的翻译。<br>想看完整句意，切换到「句子」。</p><div class="divider"></div><div class="label">试试看</div><button class="example-chip" id="tryWord">'+(S.passage===1?'momentum':'点读第一句')+'</button><p class="source-note">释义与翻译已预先整理，无需逐次等待生成。</p>';return}
 const saveKey=S.mode==='sentence'?'sentence:'+S.sid:'word:'+S.word+':'+(S.sid||''),saved=S.saved.some(x=>x.key===saveKey);
 if(S.mode==='sentence'&&s){
  box.innerHTML='<div class="kicker">SENTENCE / '+(s.paragraph?'第 '+s.paragraph+' 段':'题目与选项')+'</div><p class="sentence-original">'+esc(s.en)+'</p><div class="label">整句翻译</div><div class="sentence-translation">'+esc(s.zh||'这句尚未匹配到已整理的翻译，请切换到清晰原文定位。')+'</div>'+sentenceNote(s)+'<button id="saveLookup" class="save-button">'+(saved?'★ 已收藏':'☆ 收藏这句话')+'</button>';
 }else{
  const context=typeof CONTEXT!=='undefined'?CONTEXT[S.passage]?.[S.word]:null;
  box.innerHTML='<div class="kicker">WORD / '+(s?.paragraph?'第 '+s.paragraph+' 段':'词典')+'</div><div class="lookup-top"><div><h2>'+esc(S.word)+'</h2><div class="phonetic">'+(entry?.phonetic?'/'+esc(entry.phonetic)+'/':'')+(entry?.lemma!==S.word&&entry?.lemma?' · 原形 '+esc(entry.lemma):'')+'</div></div><button id="speakWord" aria-label="朗读单词">▷</button></div>'+(context?'<div class="label">本文语境</div><div class="definition">'+esc(context)+'</div>':'')+'<div class="label">词典释义</div><div class="definition">'+esc(entry?.zh||'未收录这个拼写。可查看下方整句翻译，或回到清晰原文核对。')+'</div>'+(s?'<div class="label">所在句子</div><div class="context-box"><p class="en">'+esc(s.en)+'</p><p>'+esc(s.zh||'该句翻译尚未匹配。')+'</p></div><button id="wholeSentence" class="evidence-button">查看整句</button>':'')+'<button id="saveLookup" class="save-button">'+(saved?'★ 已收藏':'☆ 收藏这个词')+'</button><p class="source-note">基础词典：ECDICT。语境释义和译文按本套题整理。</p>';
 }
 $('#saveLookup')?.addEventListener('click',()=>{if(S.mode==='sentence'&&!s){toast('请先选中一句原文');return}if(saved)S.saved=S.saved.filter(x=>x.key!==saveKey);else S.saved.push({key:saveKey,type:S.mode,text:S.mode==='sentence'?s.en:S.word,translation:S.mode==='sentence'?s.zh:(CONTEXT?.[S.passage]?.[S.word]||entry?.zh||s?.zh||''),sid:S.sid,passage:S.passage});persist();renderPanel()});
 $('#speakWord')?.addEventListener('click',()=>{if(!('speechSynthesis'in window)){toast('此浏览器不支持朗读');return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(S.word);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)});
 $('#wholeSentence')?.addEventListener('click',()=>{S.mode='sentence';const pos=$('#reader').scrollTop;render();$('#reader').scrollTop=pos});
}
function sentenceNote(s){
 const notes={
 'p1-2-1':'that 指前一句描述的消费低迷现象。stayed away from 在这里对应“不再积极参与”，是第 22 题的定位依据。',
 'p1-4-1':'主干：Almost everyone said that...；who 引导定语从句修饰 everyone。not...but... 表示“不是……而是……”。',
 'p2-1-0':'主干：This episode crystallizes the irony。that 引出 irony 的具体内容；although...they... 构成让步与反差。',
 'p2-3-2':'主干：I found that...。as Hacker observed years before 是插入说明；but 连接夫妻双方期待的反差。',
 'p4-0-0':'主干：Many Americans regard the jury system as...。including 后列举多个由 that 引出的原则。不要把其中的年龄与识字条件漏掉。'
 };return notes[s.id]?'<div class="note">'+esc(notes[s.id])+'</div>':'';
}
function renderQuestions(){
 const qs=questions(),q=qs.find(q=>q.id===S.question)||qs[0],box=$('#panelContent');
 if(!q){box.innerHTML='<p class="empty-copy">这篇的题目正在整理。</p>';return}
 S.question=q.id;const picked=answer(q),confirmed=S.confirmed[q.id];
 box.innerHTML='<div class="kicker">REVIEW / '+(S.passage?'TEXT '+S.passage:'CLOZE')+'</div><p class="question-summary">黑笔答案已从照片录入，可逐题修改。标为「待核对」的答案尚未由你确认。</p><div class="question-grid">'+qs.map(x=>'<button data-question="'+x.id+'" class="'+(answer(x)?answer(x)===x.answer?'correct':'wrong':'')+' '+(q.id===x.id?'selected':'')+'">'+x.id+'</button>').join('')+'</div><div class="question-title">'+q.id+'. '+esc(q.text)+'</div><p class="question-summary">'+esc(q.zh)+'</p>'+q.options.map((o,i)=>'<button class="option '+(picked==='ABCD'[i]?'picked ':'')+(S.reveal&&q.answer==='ABCD'[i]?'answer ':'')+(S.reveal&&picked==='ABCD'[i]&&picked!==q.answer?'mistake':'')+'" data-answer="'+'ABCD'[i]+'"><span>'+'ABCD'[i]+'</span><div>'+esc(o)+(S.reveal?'<div class="source-note" style="margin-top:4px">'+esc(q.optionsZh[i])+'</div>':'')+'</div></button>').join('')+'<div class="answer-row">我的答案 <strong>'+esc(picked||'未作答')+'</strong><span class="badge">'+(confirmed?'已确认':'照片识别 · 待核对')+'</span><button id="confirmAnswer" class="text-button">确认</button><button id="clearAnswer" class="text-button">清空</button></div><button id="revealAnswer" class="primary" style="width:100%">'+(S.reveal?'收起解析':'查看答案与讲解')+'</button>'+(S.reveal?'<div class="explanation"><h3>参考答案 '+q.answer+(picked?' · '+(picked===q.answer?'这题做对了':'你的选择是 '+picked):'')+'</h3><p>'+esc(q.reason)+'</p><h3>选项辨析</h3><p>'+esc(q.trap)+'</p><h3>下次怎么做</h3><p>'+esc(q.tip)+'</p><button class="evidence-button" id="locateEvidence">回到原文依据 ↗</button><p class="source-note">讲解按真题原文整理；可对照你提供的解析。<a href="assets/reference-2010.pdf#page='+q.refPage+'" target="_blank" rel="noopener">打开参考解析第 '+q.refPage+' 页</a></p></div>':'');
 $('#confirmAnswer').onclick=()=>{if(!answer(q)){toast('先选择你的答案');return}S.confirmed[q.id]=true;persist();renderQuestions()};
 $('#clearAnswer').onclick=()=>{S.answers[q.id]=null;S.confirmed[q.id]=false;persist();render()};
 $('#revealAnswer').onclick=()=>{S.reveal=!S.reveal;renderQuestions()};
 $('#locateEvidence')?.addEventListener('click',()=>{const s=Object.values(D.sentences).find(s=>s.passage===q.passage&&s.paragraph>0&&s.en.toLowerCase().includes(q.evidence.toLowerCase()));S.view='text';S.page=passage().page;S.mode='sentence';S.sid=s?.id??null;S.word=null;renderReader();document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===S.view));document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===S.mode));const el=document.querySelector('.sentence.selected');el?.scrollIntoView({behavior:'smooth',block:'center'});if(!s)toast('已打开原文，请结合解析定位。')});
}
function modal(title,html){$('#modalTitle').textContent=title;$('#modalContent').innerHTML=html;$('#modal').showModal()}
function showCollection(){modal('我的收藏',S.saved.length?S.saved.map((x,i)=>'<div class="collection-item"><button data-remove-save="'+i+'">移除</button><strong>'+esc(x.text)+'</strong><p>'+esc(x.translation)+'</p><button data-open-save="'+i+'">回到原文</button><div style="clear:both"></div></div>').join(''):'<p class="empty-copy">还没有收藏。点击词句后，用「收藏」留下复习内容。</p>')}
document.addEventListener('click',e=>{
 const b=e.target.closest('button,polygon,rect');if(!b)return;
 if(b.dataset.passage!==undefined)switchPassage(Number(b.dataset.passage));
 if(b.dataset.view){rememberPosition();S.view=b.dataset.view;render();restorePosition();persist()}
 if(b.dataset.mode){const pos=$('#reader').scrollTop;S.mode=b.dataset.mode;render();$('#reader').scrollTop=pos;persist()}
 if(b.dataset.panel){S.panel=b.dataset.panel;renderPanel();if(innerWidth<900)document.body.classList.add('panel-open')}
 if(b.dataset.page){rememberPosition();S.page=Number(b.dataset.page);S.sid=null;S.word=null;render();restorePosition();persist()}
 if(b.dataset.word)lookup(b.dataset.word,b.dataset.sid);
 if(b.dataset.imageWord!==undefined){const pg=D.pages.find(p=>p.id===S.page),words=S.view==='photo'?(S.uploads[S.page]?.words||pg.photoWords):pg.words,w=words[Number(b.dataset.imageWord)];if(S.mode==='sentence'&&!w.sid){toast('这一处尚未匹配整句，请切换到清晰原文。');return}lookup(w.text,w.sid)}
 if(b.dataset.question){openQuestion(Number(b.dataset.question))}
 if(b.dataset.answer){selectAnswer(b.dataset.answer)}
 if(b.id==='tryWord'){let s=passage().paragraphs[0][0],word=s.en.split(' ')[0];if(S.passage===1){s=passage().paragraphs[1][0];word='momentum'}lookup(word,s.id)}
 if(b.dataset.removeSave!==undefined){S.saved.splice(Number(b.dataset.removeSave),1);persist();showCollection()}
 if(b.dataset.openSave!==undefined){const x=S.saved[Number(b.dataset.openSave)];$('#modal').close();switchPassage(x.passage);S.mode=x.type==='sentence'?'sentence':'word';const sentence=D.sentences[x.sid];if(sentence?.id?.startsWith('q'))S.page=passage().questionPage;S.view='text';render();lookup(x.text,x.sid);document.querySelector('.sentence.selected')?.scrollIntoView({block:'center'});persist()}
});
$('#reader').addEventListener('click',e=>{if(S.mode==='sentence'&&S.view==='text'){const el=e.target.closest('.sentence');if(el)lookup('',el.dataset.sid)}});
$('#reader').addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)&&e.target.dataset.imageWord!==undefined){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
$('#closeModal').onclick=()=>$('#modal').close();
$('#collectionButton').onclick=showCollection;
$('#zoomIn').onclick=()=>{S.zoom=Math.min(2,S.zoom+.15);renderReader()};
$('#zoomOut').onclick=()=>{S.zoom=Math.max(.85,S.zoom-.15);renderReader()};
$('#exportButton').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({year:2010,answers:S.answers,confirmed:S.confirmed,saved:S.saved},null,2)],{type:'application/json'}));a.download='2010英语二-学习记录.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('学习记录已导出')};
$('#helpButton').onclick=()=>modal('使用说明与资料来源','<p>本版可学习 2010 年英语二完形填空和四篇阅读（第 1—40 题）。</p><p><b>点读：</b>在清晰原文、真题原页或已导入照片中点词。切换「句子」查看整句翻译。</p><p><b>错题：</b>照片里的黑笔答案是初始记录，需要你核对。点击选项可以修改，再打开讲解。</p><p><b>照片导入：</b>选择本套题对应页，旋转到文字朝上后识别。印刷文字可点读；手写答案请在右侧确认。</p><p><b>保存：</b>答案和收藏仅保存在当前浏览器，不跨设备同步。新导入照片保存在当前浏览器；清理浏览器数据会移除它们。</p><p><a href="assets/exam-2010.pdf" target="_blank" rel="noopener">2010 年英语二电子真题</a> · <a href="assets/reference-2010.pdf" target="_blank" rel="noopener">你提供的张剑解析</a></p><p>译文和讲解为本学习页整理内容。基础词典使用 <a href="https://github.com/skywind3000/ECDICT" target="_blank" rel="noopener">ECDICT</a>（<a href="assets/ECDICT-LICENSE.txt">MIT 许可</a>），本文重点词另配语境解释。已登记真题 2010—2026 年、张剑解析 2010—2022 年。当前仅 2010 年已制作点读内容，明确排除了 10—22 年真题合订版。</p>');
$('#uploadButton').onclick=()=>typeof openUpload==='function'?openUpload():toast('照片导入正在准备');
render();
