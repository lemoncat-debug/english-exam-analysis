const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2011-page11-e993cb940420.json','2011-page12-ed5910e98b54.json'];
const translations={
'2011-page11-e993cb940420.json':[
'Part B 说明：阅读下面的文章，并从右栏中找出与左栏标记细节相对应的信息来回答问题。',
'右栏中有两个多余选项。',
'请在答题卡1上标出答案。',
'（10分）今天，知名医生加入了关于政府在促进公共健康方面作用的争论，他们要求部长们对不健康食品征收“脂肪税”，并像香烟包装那样向儿童警示不良饮食的危害。',
'这些要求源于卫生大臣安德鲁·兰斯利上周发表的评论。他坚持认为政府不能强迫人们作出健康选择，并承诺让企业摆脱公共卫生监管。',
'但医学界的资深人士希望阻止快餐店在学校附近开设，限制高脂肪、高盐或高糖产品的广告，并限制麦当劳等快餐生产商赞助体育赛事。',
'他们认为，政府采取行动对于遏制英国人对不健康食品的依赖，并帮助阻止肥胖、糖尿病和心脏病发病率不断上升，是必要的。',
'英国皇家儿科与儿童健康学院院长特伦斯·斯蒂芬森教授说，食用不健康食品造成的危害，应当被视为与吸烟或过量饮酒同样严重。',
'“三十年前，谁也无法想象工作场所或酒吧会禁烟，但如今我们已经做到了。',
'面对肥胖问题，我们是否也愿意同样勇敢？',
'我认为我们应该如此。”这位英国儿科医生的负责人说。',
'兰斯利暗示应由行业而不是政府牵头，这一说法令健康倡导者感到不安。',
'他说，薯片和糖果生产商可以在“改变生活”运动中发挥核心作用；该运动是政府促进健康饮食和健身工作的中心项目。',
'他还批评名厨杰米·奥利弗在英格兰改善学校午餐的高调尝试，认为“说教”并不是改变人们行为的最佳方式。',
'斯蒂芬森建议，潜在的限制措施可以包括：晚上9点前禁止播放高脂肪、高盐或高糖食品的电视广告，并限制它们在广告牌或电影院中的投放。',
'“如果我们真的大胆一些，甚至可以开始把高热量快餐与香烟同等看待——严格限制广告、产品植入和体育赛事赞助。”他说。',
'— 11 —'
],
'2011-page12-ed5910e98b54.json':[
'这样的措施可能会影响麦当劳等企业；麦当劳赞助由足球协会运营的青少年教练计划。',
'斯蒂芬森说，快餐连锁店还应停止提供玩具、可爱动物和手机话费等“诱因”，以吸引年轻顾客。',
'英国皇家精神科医学院院长迪内什·布格拉教授说：“如果孩子们了解到食物对生长的影响，以及某些食物可能造成伤害，至少他们能够提前获得相关信息。”',
'他还敦促地方议会在学校和医院周边设立“无快餐区”，即外卖店不得开设的区域。',
'卫生部发言人说：“我们需要为公共卫生创造一个新愿景，让全社会共同努力，变得健康并活得更久。',
'这包括与企业建立新的‘责任协议’，以社会责任为基础，而不是依靠国家监管。',
'今年晚些时候，我们将发布一份白皮书，明确说明实现这一目标的具体方式。”',
'食品行业会对如此资深的医生支持这些激进措施感到震惊，尤其是他们呼吁采用过去十年针对吸烟问题所使用的一些强硬手段。',
'[A] 应对麦当劳等快餐生产商征收“脂肪税”。',
'41. 安德鲁·兰斯利认为：[B] 政府应禁止在学校附近开设快餐店。',
'42. 特伦斯·斯蒂芬森同意：[C] “说教”是改善英格兰学校午餐的有效方式。',
'43. 杰米·奥利弗似乎认为：[D] 应向儿童引入香烟式警告，说明不良饮食的危害。',
'44. 迪内什·布格拉建议：[E] 薯片和糖果生产商可以为“改变生活”运动作出重要贡献。',
'45. 卫生部发言人提出：[F] 父母应在家中保持健康饮食，为孩子树立好榜样。',
'[G] 政府应增强企业的责任意识。',
'— 12 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
