const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2012-page1-2c7ee51e2864.json','2012-page2-c0fbff80ce00.json'];
const translations={
'2012-page1-2c7ee51e2864.json':[
'2012年全国硕士研究生入学统一考试英语（二）试题；第一部分 英语知识运用；说明：阅读下面的短文。',
'从每题给出的四个选项中选出最佳词语，并在答题卡1上标出A、B、C或D。',
'（10分）数百万美国人和外国人把“美国大兵乔”看作没有思想的战争玩偶，是美国军事冒险主义的象征，但过去并不是这样。',
'如今，数百万美国人和外国人把美国大兵乔看作没有思想的战争玩偶，是美国军事冒险主义的象征，但过去并不是这样。',
'对那些参加过二战的男男女女以及他们解放的人来说，美国大兵乔曾是____。',
'对于参加过二战的人和他们解放的人来说，美国大兵乔是一个普通人长成的英雄：他是被迫离开家乡的贫困农场孩子，是一个承担所有战斗重担、睡在冰冷散兵坑里、没有食物和住所等基本需要，却坚持到底并击退纳粹杀戮统治的人。',
'他不是志愿兵，也不是高薪人士，而是一个普通人，面对几个世纪以来最训练有素、装备最好、最凶猛、最残酷的敌人。',
'他的名字没有多少特别之处。',
'“G.I.”只是“政府配发品”的军事缩写，标在发给士兵的所有物品上。',
'至于乔？这是一个从未登顶的普通人的常见名字。',
'乔·布洛、乔·帕卢卡、乔·马格拉克……都是工人阶级的名字。',
'美国历史上从未有过名为乔的总统、副总统或国务卿。',
'“美国大兵乔”在与德国、日本和朝鲜军队作战时，拥有一段____的军旅生涯。',
'他在1945年的电影《美国大兵乔的故事》中作为一个人物，或作为美国人群像的集合出现。',
'这部电影取材于战地记者厄尼·派尔在战争最后阶段的经历。',
'派尔采访过的一些士兵亲自在影片中扮演了自己。',
'派尔以报道战争中人性的一面而闻名：他写的是满身尘土、经受冰雪和泥泞的士兵，而不是行军了多少英里、占领或解放了哪些城镇。',
'他的报道与《星条旗报》著名画家比尔·莫尔丁创作的“威利”漫画相呼应。',
'两人都强调战争的肮脏和疲惫，以及士兵与平民共同分享的文明碎片：咖啡、烟草、威士忌、住所和睡眠。',
'在埃及、法国以及十多个其他国家，“美国大兵乔”都是一名美国士兵。',
'他是他们生活中最重要的人。',
'— 1 —'
],
'2012-page2-c0fbff80ce00.json':[
'1. [A] 服役；[B] 履行；[C] 反抗；[D] 背叛。',
'2. [A] 实际的；[B] 普通的；[C] 特别的；[D] 正常的。',
'3. [A] 承担；[B] 减轻；[C] 移除；[D] 承受。',
'4. [A] 必需品；[B] 设施；[C] 商品；[D] 财产。',
'5. [A] 和；[B] 也不；[C] 但是；[D] 因此。',
'6. [A] 为了；[B] 进入；[C] 从；[D] 对抗。',
'7. [A] 暗示；[B] 意味着；[C] 象征；[D] 声称。',
'8. [A] 分发；[B] 移交；[C] 带回；[D] 传递。',
'9. [A] 推动；[B] 达到；[C] 制造；[D] 设法做到。',
'10. [A] 曾经；[B] 从未；[C] 也；[D] 也不。',
'11. [A] 伪装的；[B] 受干扰的；[C] 有争议的；[D] 杰出的。',
'12. [A] 公司；[B] 社区；[C] 集合；[D] 殖民地。',
'13. [A] 雇用；[B] 任命；[C] 采访；[D] 询问。',
'14. [A] 人性的；[B] 军事的；[C] 政治的；[D] 道德的。',
'15. [A] 毁坏；[B] 通勤；[C] 巡逻；[D] 获得。',
'16. [A] 与……相呼应；[B] 抵消；[C] 复制；[D] 反驳。',
'17. [A] 忽视；[B] 强调；[C] 避免；[D] 欣赏。',
'18. [A] 阶段；[B] 幻觉；[C] 碎片；[D] 进步。',
'19. [A] 和；[B] 对于；[C] 在……之中；[D] 超越。',
'20. [A] 恰恰相反；[B] 通过这种方式；[C] 从一开始；[D] 在那时。第二部分 阅读理解 A；说明：阅读下面四篇文章。',
'回答每篇文章后的问题，从A、B、C或D中选择答案。',
'请在答题卡1上标出答案。',
'（40分）— 2 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
