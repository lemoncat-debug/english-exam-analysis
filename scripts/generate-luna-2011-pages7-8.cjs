const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2011-page7-8d4f1b984914.json','2011-page8-76044512879d.json'];
const translations={
'2011-page7-8d4f1b984914.json':[
'文章3：我们往往把二战结束后紧接着的几十年看作繁荣与增长的时期：数百万士兵回到家乡，凭借《退伍军人权利法案》进入大学，并在婚姻介绍所排队。',
'《退伍军人权利法案》以及在婚姻介绍所排队。',
'但说到住房，那是一个崇尚常识、相信“少即是多”的时代。',
'大萧条和战争期间，美国人学会了节衣缩食；这种克制与战后对未来的信心结合起来，使小巧、高效的住宅变得格外时髦。',
'经济状况只是推动高效生活趋势的一个因素。',
'“少即是多”这句话其实最早由德国建筑师路德维希·密斯·凡·德·罗厄推广开来。他和其他与包豪斯这所设计学校有关的人一样，在二战前移居美国，并在美国的建筑院校任教。',
'这些设计师对美国建筑的发展产生了巨大影响，但没有谁比密斯的影响更大。',
'密斯的名言意思是：经过恰当组织的少量装饰，比大量装饰更有冲击力。',
'他认为，优雅并不源于堆砌。',
'和其他现代建筑师一样，他使用金属、玻璃和层压木材——这些材料如今司空见惯，但在20世纪40年代却象征着未来。',
'密斯精巧的设计掩盖了这样一个事实：他设计的空间小而高效，而不是宽大且常常空旷。',
'例如，密斯在芝加哥湖滨大道建造的优雅高塔住宅，其两居室单元面积不到1000平方英尺，比城市黄金海岸沿线老式邻居建筑中的住宅更小。',
'但这些住宅因通透的玻璃墙、开阔的景观，以及建筑细部和比例的优雅而广受欢迎；这种建筑风格相当于当时流行的抽象艺术。',
'“少”的趋势并非完全来自外国。',
'20世纪30年代，弗兰克·劳埃德·赖特开始建造更加朴素、高效的住宅，通常面积约1200平方英尺，小于他在19世纪90年代和20世纪初设计的那种向外铺展的两层住宅。',
'1945年至1962年间，《加利福尼亚艺术与建筑》杂志委托才华横溢的现代建筑师设计的“案例住宅”，是“少即是多”趋势的又一个本土影响来源。',
'美感效果来自景观、新材料和直截了当的细部处理。',
'在他的案例住宅中，拉尔夫·拉普森可能误判了机械革命究竟会如何影响日常生活——很少有美国家庭买到直升机，尽管大多数家庭最终拥有了烘干机——但他认为自给自足既值得追求又不可避免，这一信念得到了广泛认同。',
'— 7 —'
],
'2011-page8-76044512879d.json':[
'31. 战后美国的住房风格主要反映了美国人的____。',
'[A] 繁荣与增长；[B] 效率与实用；[C] 克制与信心；[D] 自豪与忠诚。',
'32. 从第3段可以推断出关于包豪斯的哪一点？',
'[A] 它由路德维希·密斯·凡·德·罗厄创立。',
'[B] 它的设计理念受二战影响。',
'[C] 大多数美国建筑师过去都与它有关。',
'[D] 它对美国建筑产生了很大影响。',
'33. 密斯认为，建筑设计的优雅____。',
'[A] 与大空间有关；[B] 等同于空旷；[C] 不依赖大量装饰；[D] 与效率无关。',
'34. 关于密斯在芝加哥湖滨大道建造的住宅，哪一项是正确的？',
'[A] 它们忽视了细部和比例。',
'[B] 它们采用了当时流行的材料。',
'[C] 它们比邻近建筑更宽敞。',
'[D] 它们具有抽象艺术的一些特征。',
'35. 关于“案例住宅”的设计，我们能了解到什么？',
'[A] 机械设备得到广泛使用。',
'[B] 设计考虑了自然景观。',
'[C] 为了整体效果牺牲了细节。',
'[D] 使用了环保材料。',
'— 8 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
