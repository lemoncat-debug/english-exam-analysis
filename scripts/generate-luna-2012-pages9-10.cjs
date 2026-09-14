const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2012-page9-24f13caa5ebd.json','2012-page10-9dbecc8a1b22.json'];
const translations={
'2012-page9-24f13caa5ebd.json':[
'文章4：大衰退也许已经结束，但这个高失业率时代可能才刚刚开始。',
'在它结束之前，它很可能会改变一代年轻人的人生轨迹和性格。',
'最终，它很可能在多年间重塑我们的政治、文化以及社会的性格。',
'面对这场全国性的经济灾难，没有人比失业者更努力地寻找其中的“利好”。',
'许多人说，失业虽然极其痛苦，却在某些方面改善了他们：他们变得不那么物质主义，在财务上更加谨慎，也更加了解他人的挣扎。',
'也许在有限的方面，这场衰退会让社会变得更好。',
'至少，它把我们从一场关于轻易致富和更大房屋的全国性狂热梦中唤醒，并为鲁莽的个人消费时代画上了必要的句号。',
'但在很大程度上，这些好处显得微薄、不确定，而且遥不可及。',
'经济史学家本杰明·弗里德曼在《经济增长的道德后果》中指出，无论在美国国内还是国外，长期的经济停滞或衰退几乎总会让社会变得更刻薄、包容性更低，并且通常会阻止或逆转权利与自由的发展。',
'反移民情绪通常会增加，种族与阶级之间的冲突也会加剧。',
'收入不平等通常会在衰退期间下降，但这一次并没有缩小。',
'事实上，这一经济疲软时期可能会加深阶级分化，减少跨越阶级鸿沟的机会——尤其是对年轻人而言。',
'哥伦比亚大学经济学家蒂尔·冯·瓦赫特的研究表明，并非所有在衰退时期毕业的人都能看到人生机会变暗：名牌大学毕业生很快就能追赶到在经济景气时期毕业时本来会达到的位置，而被落下的是他们之下的大多数人。',
'在互联网时代，我们尤其容易看到美国社会中一直隐藏着的怨恨。',
'但在当下，要准确辨别这些困难时期如何影响社会性格，却更为困难。',
'在许多方面，美国进入这场衰退时比历史上任何时期都更加宽容；此后有关社会冲突的各种全国性民调显示出的结果也好坏参半。',
'我们必须等待并观察这些艰难岁月究竟会如何重塑我们的社会结构。',
'但它们肯定会重塑社会，而且持续时间越长，重塑程度就越深。',
'— 9 —'
],
'2012-page10-9dbecc8a1b22.json':[
'36. 作者说“寻找其中的利好”（第2段第1行，',
'2）是指失业者试图____。',
'[A] 向政府寻求补贴；[B] 从困难的经济中获利；[C] 探究失业的原因；[D] 从衰退中看到光明的一面。',
'37. 根据第2段，衰退使人们____。',
'[A] 彼此斗争；[B] 实现国家梦想；[C] 质疑自己的谨慎；[D] 重新思考生活方式。',
'38. 本杰明·弗里德曼认为，经济衰退可能____。',
'[A] 给移民带来更沉重的负担；[B] 暴露更多人性的弱点；[C] 推动权利与自由的发展；[D] 缓和种族与阶级冲突。',
'39. 蒂尔·冯·瓦赫特的研究表明，在经济衰退中，名牌大学毕业生往往____。',
'[A] 因机会减少而落后于他人；[B] 很快赶上有经验的员工；[C] 像其他人一样感到人生机会变暗；[D] 比其他人更快恢复。',
'40. 作者认为，困难时期对社会的影响是____。',
'[A] 微不足道的；[B] 积极的；[C] 确定会发生的；[D] 破坏性的。— 10 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
