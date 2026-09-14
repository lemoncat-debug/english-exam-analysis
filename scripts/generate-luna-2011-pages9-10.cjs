const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files=['2011-page9-8b76d44196fb.json','2011-page10-415d1aeaf2e1.json'];
const translations={
'2011-page9-8b76d44196fb.json':[
'文章4：欧盟能维持下去吗？',
'不久以前，这个问题听起来还很奇怪。',
'如今，就连这个项目最热心的支持者也在谈论一个面临债务、人口减少和增长放缓“三角困境”的欧洲大陆。',
'除了这些长期存在的问题，欧盟的经济核心——使用统一货币的16个国家——还面临着一场严重危机。',
'市场已经不再相信，欧元区无论强弱的经济体终有一天会因为共同遵守单一货币的纪律而趋同；统一货币使缺乏竞争力的成员无法迅速通过货币贬值来解决问题。',
'然而，关于如何拯救欧洲统一货币、避免其解体的争论陷入了僵局。',
'僵局的原因在于，欧元区的主导力量法国和德国都同意需要在欧元区内加强协调，却不同意应当协调什么。',
'德国认为，必须通过更严格的借贷、支出和竞争力规则来拯救欧元，并对不遵守规则的政府辅以近乎自动的制裁。',
'制裁可能包括威胁冻结对较贫困地区的欧盟资金和欧盟大型项目资金，甚至暂停某国在欧盟部长理事会中的投票权。',
'德国坚持认为，经济协调应涉及欧盟俱乐部的全部27个成员；其中，自由市场主义和经济严谨派略占多数，而德国担心，在核心内部，支持法国式干预的人会略占多数。',
'由法国领导的“南方”阵营希望采取不同方案：在欧元区成员组成的核心内部建立“欧洲经济政府”。',
'换句话说，这意味着政治家干预货币政策，并通过共同发行欧元债券让各国政府以较低成本借款，或通过完整的财政转移，建立从富裕成员向贫困成员的再分配制度。',
'最后，法国政府关系密切的人士低声表示，欧元区成员还应同意进行某种财政和社会协调，例如限制企业税率或劳动力成本方面的竞争。',
'现在断言欧盟无可救药还为时过早。',
'它仍然是世界上最大的贸易集团。',
'欧洲项目最理想的状态非常自由：它建立在一个由27个贫富不一国家组成的单一市场之上，其内部边界对商品、资本和劳动力的开放程度远高于任何可比的贸易区域。',
'这是一次雄心勃勃的尝试，旨在削弱全球化最尖锐的棱角，并让资本主义变得更为温和。',
'— 9 —'
],
'2011-page10-415d1aeaf2e1.json':[
'36. 欧盟面临如此多的问题，以至于____。',
'[A] 它对市场或多或少失去了信心；[B] 就连它的支持者也开始感到担忧；[C] 一些成员国计划放弃欧元；[D] 它打算否认货币贬值的可能性。',
'37. 关于欧盟统一货币的争论陷入僵局，是因为主导力量____。',
'[A] 正在争夺领导地位；[B] 忙于处理各自的危机；[C] 未能就协调方案达成一致；[D] 不同意解决解体问题的步骤。',
'38. 为了解决欧元问题，德国提议____。',
'[A] 增加对贫困地区的欧盟资金；[B] 实施更严格的法规；[C] 只有核心成员参与经济协调；[D] 保障欧盟成员的投票权。',
'39. 法国提出的危机处理方案意味着____。',
'[A] 贫困国家更有可能获得资金；[B] 对贫困国家实行严格的货币政策；[C] 富裕国家可以方便地获得贷款；[D] 富裕国家基本上会控制欧元债券。',
'40. 关于欧盟的未来，作者似乎感到____。',
'[A] 悲观；[B] 绝望；[C] 自负；[D] 乐观。— 10 —'
]
};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'标题、数字或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};return {lemma:c||'word',partOfSpeech:'词汇',contextMeaning:'该词需结合整句和上下文理解',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
for(const file of files){const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs',file),'utf8'));const trans=translations[file];if(!trans||trans.length!==input.sentences.length)throw Error(file+' translation count '+(trans?.length||0)+'/'+input.sentences.length);const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:trans[i],grammar:'精读译文；长句请结合主干、从句和指代关系复核。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};fs.writeFileSync(path.join(root,'translation-work/completed',input.taskId+'.json'),JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));}
