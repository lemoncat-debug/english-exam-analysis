const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2013-page5-fe656a66e6ea.json','2013-page6-34bfbee5886d.json','2013-page7-dceeb7bc64b2.json','2013-page8-bcb6b9e92ebe.json'];
const translations={
'2013-page5-fe656a66e6ea.json':[
'文章2：一个世纪前，来自大西洋彼岸的移民既有定居者，也有短期居留者。',
'随着许多打算在美国永久定居的人一同到来的，还有一些根本不打算留下、赚些钱后就回家的人。',
'1908年至1915年间，大约有700万人抵达，同时约有200万人离开。',
'例如，约四分之一的意大利移民最终永久返回意大利。',
'他们甚至有一个亲切的绰号：“过路鸟”。',
'如今，我们对移民的看法严格得多。',
'我们把新来者分为两类：合法或非法、好人或坏人。',
'我们要么把他们称为正在成为美国人的人，要么把他们标记为应该被驱逐的外国人。',
'这种框架极大地促成了美国破碎的移民制度，也导致了围绕如何修复制度的长期政治瘫痪。',
'我们不需要更多类别，而是需要改变思考类别的方式。',
'我们需要超越对“合法”和“非法”的严格定义。',
'首先，我们可以认识到新一代“过路鸟”——那些生活在灰色地带并在那里蓬勃发展的人。',
'这样，我们也许就能开始解决移民方面的挑战。',
'采摘工、提琴手、建筑工人、企业家、工程师、家庭保健助手和物理学家，都属于今天的“过路鸟”。',
'他们是全球经济中充满活力的参与者，而这种经济由工作、资金和思想的流动推动。',
'他们更愿意随着机会的召唤自由来去。',
'他们可以做到在一个地方工作、在另一个地方拥有家庭。',
'无论是否得到许可，他们都能轻松跨越法律、司法管辖区和身份的界限。',
'我们需要把美国想象成这样一个地方：人们可以暂时在这里发挥生产力，而不必承诺永远留下。',
'我们需要让他们感到，家可以同时在这里和那里，而且他们可以光明正大地属于两个国家。',
'接纳这个人员流动的新世界，需要移民争论双方都采取新的态度。',
'超越非黑即白的文化战争逻辑，意味着打开中间地带，理解今天管理移民需要多条路径和多种结果，其中包括一些在现行制度下难以合法实现的方案。',
'— 5 —'
],
'2013-page6-34bfbee5886d.json':[
'26.“过路鸟”指的是那些____的人。',
'[A] 暂时留在外国；[B] 永久离开祖国；[C] 跨越大西洋移民；[D] 在海外找到长期工作。',
'27.第2段暗示，美国现行移民制度____。',
'[A] 需要新的移民类别；[B] 放松了对移民的控制；[C] 应当调整以应对挑战；[D] 已通过政治手段得到修复。',
'28.根据作者的说法，今天的“过路鸟”想要____。',
'[A] 金钱激励；[B] 全球认可；[C] 自由地留下和离开；[D] 获得正规工作的机会。',
'29.作者建议，今天的“过路鸟”应当被____。',
'[A] 视为忠诚的伙伴；[B] 以法律上的宽容对待；[C] 给予经济优惠；[D] 视为强大的对手。',
'30.本文最恰当的标题是____。',
'[A] 来去之间：大错特错；[B] 生活并蓬勃发展：巨大风险；[C] 有无许可：巨大风险；[D] 合法或非法：大错特错。— 6 —'
],
'2013-page7-dceeb7bc64b2.json':[
'文章3：科学家发现，虽然我们容易出现突然的过度反应，但如果花一点时间思考自己可能如何反应，就能减少甚至消除快速、由本能驱动的反应所带来的负面影响。',
'面对突发刺激时，迅速作出判断可以是重要的防御机制；如果我们要判断某人是否危险，大脑和身体会在几毫秒内本能地快速反应。',
'但我们需要更多时间来评估其他因素。',
'研究表明，要准确判断一个人是否善于交际，至少需要一分钟，最好是五分钟。',
'判断人格中复杂的方面（如神经质或开放性）需要一段时间。',
'不过，对快速刺激作出突然反应并不只存在于人际关系领域。',
'多伦多大学心理学家发现，只看快餐标志几毫秒，就会让我们阅读速度提高20%，尽管阅读与吃饭几乎没有关系。',
'我们会无意识地把快餐与速度和不耐烦联系起来，并把这些冲动带入正在做的其他事情中。接触过快餐闪现图像的人，也往往觉得一首乐曲持续时间太长。',
'然而，我们可以扭转这种影响。',
'如果知道看到笑脸时会对消费品或住房选项反应过度（这也是优秀销售代表和房地产经纪人总是微笑的原因之一），我们可以在购买前停下来想一想。',
'如果知道女性招聘筛选者更可能拒绝外貌漂亮的女性申请人，就可以帮助筛选者理解自己的偏见，或者聘请外部筛选者。',
'婚姻专家约翰·戈特曼解释说，只有在把这种突然反应建立在“厚切片”的长期研究基础上后，我们才能可靠地对信息进行快速“薄切片”判断。',
'戈特曼博士真正想评估一对夫妻能否长久时，会邀请他们到自己的岛上度假地进行更长时间的评估：两天，而不是两秒。',
'我们通过暂停来抑制本能反应的能力，是人与动物的区别：狗只能间歇性地或在几分钟内思考未来。',
'但从历史上看，我们每天约有12%的时间用于思考长远问题。',
'虽然技术可能改变我们的反应方式，但它并没有改变我们的本性。',
'我们仍然具有超越诱惑、扭转高速趋势的想象力。',
'— 7 —'
],
'2013-page8-bcb6b9e92ebe.json':[
'31. 作出决定所需的时间可能____。',
'[A] 预先决定判断的准确性；[B] 证明大脑反应的复杂性；[C] 取决于评估的重要性；[D] 随情况的紧迫性而变化。',
'32. 我们对快餐标志的反应表明，突然作出的决定____。',
'[A] 可能具有联想性；[B] 并非无意识的；[C] 可能很危险；[D] 并非冲动的。',
'33. 要扭转突然决定的负面影响，我们应该____。',
'[A] 相信第一印象；[B] 行动前先思考；[C] 像人们通常那样做；[D] 寻求专家建议。',
'34. 约翰·戈特曼说，可靠的快速反应建立在____之上。',
'[A] 批判性评估；[B] “薄切片”研究；[C] 充分的信息；[D] 合理的解释。',
'35. 作者对扭转高速趋势的态度是____。',
'[A] 宽容；[B] 乐观；[C] 不确定；[D] 怀疑。— 8 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
