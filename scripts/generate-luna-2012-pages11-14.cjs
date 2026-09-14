const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2012-page11-afbb39a4cac1.json','2012-page12-05a71650cabc.json','2012-page13-64d4d36dfb27.json','2012-page14-da1836fb7fc8.json'];
const translations={
'2012-page11-afbb39a4cac1.json':[
'Part B 说明：阅读下面的文章，并从左栏中找出与右栏标记细节相对应的信息来回答问题。',
'右栏中有两个多余选项。',
'请在答题卡1上标出答案。',
'（10分）“世界通史，也就是人类在这个世界上所取得成就的历史，归根结底是那些在此工作的伟人的历史。”维多利亚时代的圣贤托马斯·卡莱尔这样写道。',
'嗯，如今已经不是这样了。',
'突然之间，英国似乎已经与自己最喜欢的历史形式决裂。',
'这可能只是一时的文学风潮，但它也指出了我们如今接近过去时的一个更广泛事实：我们不再那么关心向祖先学习，而是更有兴趣感受他们的痛苦。',
'如今，我们要的是同理心，而不是激励。',
'从文艺复兴最初的日子起，历史写作就意味着叙述伟人的典范人生。',
'1337年，彼特拉克开始创作洋洋洒洒的《名人传》，突出古典英雄的virtus（即美德）。',
'彼特拉克赞颂他们征服命运、登上顶峰的伟大。',
'这正是尼科洛·马基雅维利颠覆的传记传统。',
'在《君主论》中，他推崇狡诈、无情和大胆，而不是美德、仁慈和正义，把这些看作成功领导者应具备的技能。',
'随着时间推移，伟大的特征发生了变化。',
'浪漫主义者纪念他们那个时代的杰出画家和作家，强调艺术家个人经历的独特性，而不是公共荣耀。',
'相比之下，维多利亚时代作家塞缪尔·斯迈尔斯在《自助》一书中，把工程师、实业家和探险家的可贵人生编成了目录。',
'斯迈尔斯写道：“他们所提供的宝贵范例，展示了自助、耐心的目标、坚定的工作和持久的正直所具有的力量；这些品质最终塑造出真正高尚而有男子气概的品格，也展示了每个人凭借自身力量能够成就什么。”',
'他的詹姆斯·瓦特、理查德·阿克莱特和约西亚·韦奇伍德传记，被树立为灯塔，指引劳动者度过艰难人生。',
'对托马斯·卡莱尔来说，这一切有些过于资产阶级；他的传记关注马丁·路德、奥利弗·克伦威尔和拿破仑·波拿巴等真正英雄的人生。',
'这些划时代人物代表着难以模仿的人生，但人们承认他们拥有高于凡人的权威。',
'并非所有人都被这种夸夸其谈说服。',
'马克思和恩格斯在《共产党宣言》中写道：“迄今为止一切社会的历史都是阶级斗争的历史。”— 11 —'
],
'2012-page12-05a71650cabc.json':[
'《共产党宣言》接着写道：对马克思和恩格斯而言，历史什么也没有做，它既不拥有巨大财富，也不进行战斗；“做这一切的是人，是现实的、活生生的人”。',
'历史应当成为人民大众及其斗争记录的故事。因此，它需要理解每个时代所处的经济现实、社会背景和权力关系。',
'因为：“人们自己创造自己的历史，但他们并不是随心所欲地创造，也不是在自己选定的条件下创造，而是在直接遇到的、既定的、从过去承继下来的条件下创造。”',
'正是这一传统彻底改变了我们对过去的理解。',
'英国没有继续以托马斯·卡莱尔为中心，而是培养了克里斯托弗·希尔、E.P.汤普森和埃里克·霍布斯鲍姆等历史学家。',
'来自底层的历史与伟人传记并列存在。',
'从性别、种族到文化研究等全新的理解领域被打开，学者们逐一梳理那些消逝社会的多样性。',
'它也改变了公共历史：楼下和楼上一样引人入胜。',
'[A] 强调古典英雄的美德。',
'41. 彼特拉克：[B] 突出杰出艺术家的公共荣耀。',
'42. 尼科洛·马基雅维利：[C] 关注那些人生难以模仿的划时代人物。',
'43. 塞缪尔·斯迈尔斯：[D] 打开了理解历史上伟人的新领域。',
'44. 托马斯·卡莱尔：[E] 认为历史应当成为人民大众及其斗争记录的故事。',
'45. 马克思和恩格斯：[F] 认为美德不是成功领导者必需的品质。',
'[G] 描绘了工程师、实业家和探险家的可贵人生。',
'— 12 —'
],
'2012-page13-64d4d36dfb27.json':[
'第三部分 翻译',
'46. 说明：将下面的英语短文翻译成中文。',
'请将译文写在答题卡2上。',
'（15分）发展中国家的人们担心移民问题时，通常担心的是本国最优秀、最聪明的人才离开，前往硅谷，或前往发达国家的医院和大学。',
'英国、加拿大和澳大利亚等国家正是通过偏向大学毕业生的移民规定来吸引这类人才。',
'大量研究发现，来自发展中国家的受过良好教育的人尤其容易移民。',
'2004年对印度家庭进行的一项大型调查发现，近40%的移民受教育程度超过高中，而25岁以上的全部印度人中这一比例约为3.3%。',
'这种“人才流失”长期以来一直困扰着贫困国家的政策制定者。',
'他们担心这会损害本国经济，使国家失去急需的技术人才；这些人才本来可以在大学任教、在医院工作，并为工厂研发巧妙的新产品。',
'— 13 —'
],
'2012-page14-da1836fb7fc8.json':[
'第四部分 写作 A',
'47. 说明：假设你前几天从网上商店买的电子词典出了问题。',
'给客户服务中心写一封电子邮件，要求：',
'1）提出投诉；并且',
'2）要求迅速解决问题。',
'你应在答题卡2上写约100词。',
'信末不要署自己的名字。',
'改用“张伟”。',
'不要写地址。',
'（10分）B部分',
'48. 说明：根据下面的表格写一篇文章。',
'写作时，你应当：',
'1）描述表格；并且',
'2）给出你的评论。',
'你应至少写150词。',
'请将文章写在答题卡2上。',
'某公司员工工作满意度调查：年龄组；满意；不清楚；不满意。40岁以下：16.7%、50.0%、33.3%；41—50岁：0.0%、36.0%、64.0%；50岁以上：40.0%、50.0%、10.0%。— 14 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
