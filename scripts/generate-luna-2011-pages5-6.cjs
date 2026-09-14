const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2011-page5-b5f626ece028.json','2011-page6-baba74006656.json'];
const translations={
'2011-page5-b5f626ece028.json':[
'文章2：报纸的消亡后来怎么样了？',
'一年前，报纸的末日似乎近在眼前。',
'经济衰退威胁着要夺走那些尚未逃到互联网的广告商和读者。',
'《旧金山纪事报》等报纸正在记录自己的末日。（原文扫描文字有缺损，按上下文理解为 newspapers、chronicling。）',
'美国联邦贸易委员会发起了一轮关于如何拯救报纸的讨论。',
'它们是否应该成为慈善公司？',
'国家是否应该给它们补贴？',
'委员会很快还会再次开会。',
'但如今这些讨论似乎已经过时了。',
'在世界大部分地区，几乎看不到危机的迹象。',
'德国和巴西的报纸已经对经济衰退置之不理。',
'即使是身处全球报业最艰难角落的美国报纸，也不仅存活了下来，而且常常重新实现盈利。',
'当然不是几年前还很常见的20%利润率，但毕竟仍然有利润。',
'这段经历并不愉快。',
'许多报纸靠把记者推下船（裁员）来维持运转。',
'美国新闻编辑协会估计，自2007年以来，新闻编辑部已经失去了13,500个工作岗位。',
'读者要为更精简的内容付出更多费用。',
'有些报纸甚至厚着脸皮拒绝向偏远郊区送报。',
'然而，这些孤注一掷的措施证明是正确的；遗憾的是，对许多记者而言，这些措施还可以进一步加码。',
'报纸正在成为业务结构更加均衡的企业，读者和广告商带来的收入组合也更健康。',
'美国报纸长期以来高度依赖广告，这一点很不寻常。',
'根据经济合作与发展组织（OECD）的数据，2008年美国报纸整整87%的收入来自广告。',
'在日本，这一比例是35%。',
'这并不令人意外，日本报纸稳定得多。',
'席卷新闻编辑部的风暴伤害了所有人，但大部分损失集中在报纸最缺乏特色的领域。',
'汽车和电影评论记者已经消失了。',
'科学和商业综合记者也一样。',
'驻外记者站被大幅削减。',
'因此，报纸的内容完整性降低了。',
'但在报业中，完整性已经不再是一种优点。',
'— 5 —'
],
'2011-page6-baba74006656.json':[
'26. 作者说“《旧金山纪事报》等报纸正在记录自己的末日”（第1段第3—4行），意在说明这些报纸____。',
'[A] 忽视了危机的迹象；[B] 未能获得国家补贴；[C] 并不是慈善公司；[D] 陷入了绝境。',
'27. 有些报纸拒绝向偏远郊区送报，可能是因为____。',
'[A] 读者威胁要少付钱；[B] 报纸想降低成本；[C] 记者很少报道这些地区；[D] 订户抱怨报纸内容变薄。',
'28. 与美国报纸相比，日本报纸稳定得多，因为它们____。',
'[A] 有更多收入来源；[B] 新闻编辑部更均衡；[C] 对广告的依赖程度较低；[D] 受读者数量影响较小。',
'29. 从最后一段可以推断出当前报业的情况是怎样的？',
'[A] 独特性是报纸不可或缺的特征。',
'[B] 报纸的失败应归咎于内容完整。',
'[C] 驻外记者站在报业中发挥着关键作用。',
'[D] 读者已经失去了对汽车和电影评论的兴趣。',
'30. 本文最恰当的标题是____。',
'[A] 美国报纸：为生存而挣扎；[B] 美国报纸：随风而逝；[C] 美国报纸：蓬勃发展的行业；[D] 美国报纸：一则无望的故事。— 6 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
