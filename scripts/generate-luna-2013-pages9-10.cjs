const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2013-page9-83137f4853a0.json','2013-page10-0983011a9dff.json'];
const translations={
'2013-page9-83137f4853a0.json':[
'文章4：欧洲并不是性别平等的天堂。',
'尤其是，在女性参与高级管理决策之前，企业工作场所永远不会完全适合家庭；而欧洲企业最高层的治理职位仍然绝大多数由男性担任。',
'事实上，女性在欧洲公司董事会中的职位只占14%。',
'欧盟目前正在考虑立法，强制公司董事会保持一定比例的女性，最高可达60%。',
'这项拟议的强制规定源于挫败感。',
'去年，欧盟委员会副主席维维安·雷丁呼吁采取自愿行动。',
'雷丁邀请企业签署性别平衡目标，承诺董事会女性成员比例达到40%。',
'但她的呼吁被视为失败：只有24家公司响应。',
'在女性兼顾工作和家庭的同时，我们是否需要配额来确保她们能够公平地继续攀登企业阶梯？',
'雷丁最近说：“就我个人而言，我不喜欢配额。”',
'“但我喜欢配额所带来的效果。”',
'雷丁说，配额能够促成行动，“为平等打开道路，突破玻璃天花板”；法国和其他对企业高层女性任职作出法律约束的国家已经看到了这种结果。',
'我理解雷丁的犹豫，也理解她的挫败。',
'我也不喜欢配额；它们与我对精英治理的信念相悖，即由有能力的人进行治理。',
'但是，考虑到实现精英治理理想所面临的障碍，公平的世界似乎确实需要暂时采取强制安排。',
'毕竟，四十年的证据已经表明，欧洲和美国的企业都在逃避以精英标准招聘和提拔女性进入高层职位，无论对它们施加多少“软压力”都一样。',
'当女性确实突破企业权力的顶峰时——例如谢丽尔·桑德伯格最近在脸书做到这一点——她们会受到巨大关注，恰恰因为她们仍然是规则的例外。',
'如果有适当的公共政策帮助所有女性（无论是首席执行官还是照顾孩子的人）和所有家庭，那么桑德伯格就不会比生活在更公正社会中的任何其他高能力人士更值得上新闻。',
'— 9 —'
],
'2013-page10-0983011a9dff.json':[
'36. 总的来说，在欧洲企业工作场所，____。',
'[A] 女性发挥领导作用；[B] 男性拥有最终决定权；[C] 公司治理受到压倒性影响；[D] 高级管理层适合家庭。',
'37. 欧盟拟议的立法是____。',
'[A] 性别平衡的反映；[B] 对雷丁呼吁的回应；[C] 不情愿的选择；[D] 自愿行动。',
'38. 根据雷丁的说法，配额可以帮助女性____。',
'[A] 获得企业高层职位；[B] 看穿玻璃天花板；[C] 平衡工作和家庭；[D] 预见法律结果。',
'39. 作者对雷丁的呼吁持____态度。',
'[A] 怀疑；[B] 客观；[C] 冷漠；[D] 赞同。',
'40. 女性进入高层管理后成为新闻头条，是因为缺乏____。',
'[A] 更多社会公正；[B] 大量媒体关注；[C] 合适的公共政策；[D] 更大的“软压力”。— 10 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
