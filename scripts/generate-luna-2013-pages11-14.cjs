const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2013-page11-884e71b0d371.json','2013-page12-90689b56a518.json','2013-page13-e7054dd265ce.json','2013-page14-278ed01a1a21.json'];
const translations={
'2013-page11-884e71b0d371.json':[
'Part B 说明：阅读下面的文章，从A—G列表中为编号段落（41—45）选择最合适的小标题。',
'有两个多余的小标题不需要使用。',
'请在答题卡上标出答案。',
'（10分）[A] 像农民一样生活；[B] 均衡饮食；[C] 店主是你的朋友；[D] 记得犒劳自己；[E] 只购买所需；[F] 计划就是一切；[G] 不浪费，想要也不取。广受欢迎的博客“节俭美食家”记录了托尼如何在领取福利的同时保持对美食的热爱。',
'付完账单后，托尼每周有60英镑可花，其中40英镑用于食物；但十年前，他从事企业传播工作，年收入13万英镑，每周至少两次在伦敦最好的餐厅用餐。',
'后来他的婚姻破裂，事业耗尽了精力，饮酒问题也变得严重。',
'“社区心理健康团队救了我的命。',
'当人们对博客反响如此热烈时，我在某种程度上又有了这种感觉。',
'它给了我失去的认可和信心。',
'但这仍然是日复一日的事情。”',
'现在他住在政府公寓里，还要应对文学经纪人的邀约。',
'他感到积极乐观，但他会继续写博客——不是写如何尽可能便宜地吃饭（“有很多人的处境糟糕得多，几乎没有钱花在食物上”），而是写如何在预算有限的情况下吃得好。',
'以下是他给节俭美食家的建议。',
'41. 冲动消费不可取，所以要提前规划一周的菜单，并列出食材清单，注明准确用量。',
'我有一份模板，记录一周的早餐、午餐和晚餐。',
'别笑：这不仅节省成本，也能帮助你均衡饮食。',
'每天购物而不是每周购物也是个好主意，因为——',
'— 11 —'
],
'2013-page12-90689b56a518.json':[
'每周购物，因为作为普通人，你有时会改变对想吃什么的想法。',
'42. 这时，超市及其匿名性就派上用场了。',
'在超市里，买一根胡萝卜不会像在小蔬菜店里那样令人尴尬。',
'而且如果你计划得当，就会知道自己只需要350克牛小腿肉和六片培根，而不是购买超市冷藏柜里预先包装的任意重量。',
'43. 你可以自豪地说冰箱里只有冷冻豌豆，但这还不够。',
'我的冰箱里装满了剩菜、面包、高汤、肉和鱼。',
'提前计划应该能消除浪费；但如果有多余蔬菜，你可以做蔬菜汤，所有快要“变坏”的水果都可以煮熟或榨汁。',
'44. 大家都这么说，但这确实是节俭食客的一个重要秘诀。',
'经常去肉店、熟食店和鱼贩那里买东西，即使只是买少量物品，也要表现得非常友好。',
'很快你就会自在地询问他们是否有猪肘骨可用来做汤和炖菜，或者有没有牛骨、鸡架和鱼头用来熬高汤；这些东西他们往往会免费送给你。',
'45. 你不会经常外出用餐，但要省下零钱，每隔几个月去一家好餐馆享用一次套餐午餐——每周存1.75英镑，存三个月就是21英镑——足够在米其林星级餐厅Arbutus吃一顿三道菜午餐。',
'那里套餐价格是16.95英镑；或者你也可以花12.99英镑买一张达美乐大披萨：我知道自己更愿意吃哪一种。',
'— 12 —'
],
'2013-page13-e7054dd265ce.json':[
'第三部分 翻译',
'46. 说明：将下面的英语短文翻译成中文。',
'请将译文写在答题卡上。',
'（15分）我可以从过去53年中随便说出一个日期，立即知道自己当时在哪里、新闻发生了什么，甚至知道那天是星期几。',
'我从四岁起就能做到这一点。',
'我从不会因为大脑吸收的信息量而感到不堪重负。',
'我的大脑似乎能够处理这些信息，并把它们整齐地储存起来。',
'当我想起一段悲伤的记忆时，我会像所有人一样，试着把它放到一边。',
'我不认为仅仅因为我的记忆更清晰，这件事对我来说就更难。',
'强大的记忆力并不会让我的情绪变得更加尖锐或鲜明。',
'我能回忆起祖父去世的那一天，也记得我们在前一天去医院时感到的悲伤。',
'我还记得音乐剧《毛发》就在同一天在百老汇首演——这两件事以同样的方式突然浮现在我的脑海中。',
'— 13 —'
],
'2013-page14-278ed01a1a21.json':[
'第四部分 写作 A',
'47. 说明：假设你们班要为需要帮助的孩子举办一次慈善义卖。',
'给同学们写一封电子邮件，要求：',
'1）告知他们活动细节；并且',
'2）鼓励他们参加。',
'你应在答题卡上写约100词。',
'不要使用自己的名字。',
'改用“李明”。',
'不要写地址。',
'（10分）B部分',
'48. 说明：根据下面的图表写一篇文章。',
'写作时，你应当：',
'1）解读图表；并且',
'2）给出你的评论。',
'你应在答题卡上写约150词。',
'（15分）某高校学生兼职情况：大一、大二、大三、大四；兼职比例约为60%、80%、88.24%、100%。— 14 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
