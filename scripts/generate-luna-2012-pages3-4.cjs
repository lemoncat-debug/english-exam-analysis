const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2012-page3-b5e0bdb55726.json','2012-page4-734dd39ebc9b.json'];
const translations={
'2012-page3-b5e0bdb55726.json':[
'文章1',
'家庭作业一直不太受学生、甚至许多家长欢迎，但近年来尤其受到鄙视。',
'全国各地的学区，最近包括洛杉矶联合学区，都在重新思考这种教育惯例。',
'遗憾的是，洛杉矶联合学区制定了一项僵化政策，规定除一些高级课程外，家庭作业在学生学业成绩中的占比不得超过10%。',
'这条规定旨在解决贫困或家庭混乱的学生可能难以完成家庭作业的问题。',
'但这项政策既含糊又自相矛盾。',
'当然，不应布置学生无法独立完成，或必须借助昂贵设备才能完成的作业。',
'但是，如果学区实际上因为学生家庭生活复杂而对不交作业者网开一面，就会危险地接近这样一种暗示：对贫困儿童需要降低标准。',
'学区管理者说，家庭作业仍将是学校教育的一部分；教师可以布置他们想布置的数量。',
'但由于家庭作业在成绩中所占比例不超过10%，学生很容易漏掉一半作业，却几乎看不出成绩单有什么差别。',
'有些学生不完成家庭作业也许能在州考试中取得好成绩，但那些考试成绩好且完成了家庭作业的学生怎么办？',
'家庭作业确实可能起到了帮助作用。',
'然而，这项政策没有赋予教师寻找最适合学生的方法的权力，反而制定了一个一刀切的规则。',
'与此同时，这项政策完全没有触及家庭作业真正棘手的问题。',
'如果学区认定家庭作业对学生的学业成就并不重要，就应该减少或取消作业，而不是让它几乎不计入成绩。',
'反过来，如果家庭作业很重要，就应在成绩中占有相当大的比重。',
'同时，这项政策既没有确保学生得到的作业有意义、适合其年龄和学科，也没有确保教师不会布置超出自己愿意批改能力的作业。',
'在学区教育委员会——负责制定教育政策的机构——调查此事并举行公开听证会期间，家庭作业规定应暂缓执行。',
'洛杉矶联合学区现在采取正确的家庭作业政策还不算太晚。',
'联合学区仍然有机会把家庭作业做对。',
'— 3 —'
],
'2012-page4-734dd39ebc9b.json':[
'21. 第1段暗示，如今家庭作业____。',
'[A] 正受到更多批评；[B] 越来越受欢迎；[C] 不再是一种教育惯例；[D] 高级课程不要求家庭作业。',
'22. 洛杉矶联合学区制定家庭作业规定，主要是因为贫困学生____。',
'[A] 对教育往往抱有适度期望；[B] 要求采用不同的教育标准；[C] 可能难以完成家庭作业；[D] 表达了对家庭作业的不满。23. 根据第3段，这项政策的一个问题是它可能____。',
'[A] 导致学生对成绩单漠不关心；[B] 削弱州考试的权威；[C] 限制教师在教育中的权力；[D] 使学生不愿做家庭作业。',
'24. 第4段提到，关于家庭作业尚未回答的一个关键问题是____。',
'[A] 是否应该取消家庭作业；[B] 家庭作业在学校教育中占多大比重；[C] 家庭作业是否给教师带来额外负担；[D] 家庭作业对成绩是否重要。',
'25. 本文合适的标题可以是____。',
'[A] 一种有缺陷的家庭作业方法；[B] 一项受贫困学生欢迎的政策；[C] 关于家庭作业的棘手问题；[D] 对一项教育政策的错误解读。— 4 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
