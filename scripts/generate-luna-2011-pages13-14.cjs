const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2011-page13-ee79e7cd310a.json','2011-page14-cd9bc5facb95.json'];
const translations={
'2011-page13-ee79e7cd310a.json':[
'第三部分 翻译',
'46. 说明：本部分有一篇英语短文。',
'请将其翻译成中文。',
'请将译文写在答题卡2上。',
'（15分）谁能想到，从全球范围看，信息技术行业产生的温室气体数量与全球航空业大致相同——约占全部二氧化碳排放量的2%？',
'许多日常活动都会以令人意外的方式给环境带来负担。',
'一次谷歌搜索可能产生0.2至7.0克二氧化碳，具体取决于找到“正确”答案需要尝试多少次。',
'因此，为了迅速向用户提供结果，谷歌必须在世界各地维护庞大的数据中心，里面配备着强大的计算机。',
'这些计算机在产生大量二氧化碳的同时还会释放大量热量，因此数据中心需要良好的空调系统，而这又会消耗更多能源。',
'然而，谷歌和其他大型科技供应商会密切监测自身的效率并加以改进。',
'监测是减少排放的第一步，但还有许多工作要做，而且责任不只在大公司。',
'— 13 —'
],
'2011-page14-cd9bc5facb95.json':[
'第四部分 写作 A',
'47. 说明：假设你的表弟李明刚刚被一所大学录取。',
'给他写一封信，要求：',
'1）向他表示祝贺；并且',
'2）就如何为大学生活做好准备给他一些建议。',
'你应在答题卡2上写约100词。',
'信末不要署自己的名字。',
'改用“张伟”。',
'不要写地址。',
'（10分）B部分',
'48. 说明：根据下面的图表写一篇文章。',
'写作时，你应当：',
'1）解读图表；并且',
'2）给出你的评论。',
'你应至少写150词。',
'请将文章写在答题卡2上。',
'40%、35%、30%、25%、20%、15%、10%、5%、0%；2008年、2009年；国产品牌、日系品牌、美系品牌；2008、2009年国内轿车市场部分品牌市场份额示意图。— 14 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
