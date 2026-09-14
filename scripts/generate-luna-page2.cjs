const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const input=JSON.parse(fs.readFileSync(path.join(root,'translation-work/inputs/2010-page2-f082f977f24d.json'),'utf8'));
const texts=[
 ['1. [A] criticized [B] appointed [C] commented [D] designated','选项辨析：A 批评；B 任命；C 评论、发表意见；D 指定。'],
 ['2. [A] proceeded [B] activated [C] followed [D] prompted','选项辨析：A 继续进行；B 激活；C 随后；D 促使、引发。'],
 ['3. [A] digits [B] numbers [C] amounts [D] sums','选项辨析：A 位数；B 数字、数量；C 金额；D 总数。'],
 ['4. [A] moderate [B] normal [C] unusual [D] extreme','选项辨析：A 适度的；B 正常的；C 不寻常的；D 极端的。'],
 ['5. [A] with [B] in [C] from [D] by','选项辨析：A 和、带有；B 在……中；C 从；D 被、由。'],
 ['6. [A] progress [B] absence [C] presence [D] favor','选项辨析：A 进展；B 缺乏；C 存在；D 赞成、支持。'],
 ['7. [A] reality [B] phenomenon [C] concept [D] notice','选项辨析：A 现实；B 现象；C 概念；D 注意、关注。'],
 ['8. [A] over [B] for [C] among [D] to','选项辨析：A 超过、在……上方；B 为了；C 在……之中；D 到、向。'],
 ['9. [A] stay up [B] crop up [C] fill up [D] cover up','选项辨析：A 熬夜；B 突然出现；C 填满；D 掩盖。'],
 ['10. [A] as [B] if [C] unless [D] until','选项辨析：A 当……时、随着；B 如果；C 除非；D 直到。'],
 ['11. [A] excessive [B] enormous [C] significant [D] magnificent','选项辨析：A 过度的；B 巨大的；C 重要的、显著的；D 壮丽的。'],
 ['12. [A] categories [B] examples [C] patterns [D] samples','选项辨析：A 类别；B 例子；C 模式；D 样本。'],
 ['13. [A] imparted [B] immersed [C] injected [D] infected','选项辨析：A 传授；B 使浸入；C 注入；D 感染。'],
 ['14. [A] released [B] relayed [C] relieved [D] remained','选项辨析：A 释放、发放；B 转达；C 缓解；D 保持、留下。'],
 ['15. [A] placing [B] delivering [C] taking [D] giving','选项辨析：A 放置；B 交付；C 采取、接受；D 给出。'],
 ['16. [A] feasible [B] available [C] reliable [D] applicable','选项辨析：A 可行的；B 可获得的；C 可靠的；D 适用的。'],
 ['17. [A] prevalent [B] principal [C] innovative [D] initial','选项辨析：A 普遍的；B 主要的；C 创新的；D 最初的。'],
 ['18. [A] presented [B] restricted [C] recommended [D] introduced','选项辨析：A 呈现、提出；B 受限制的；C 推荐的；D 介绍、引入。'],
 ['19. [A] problems [B] issues [C] agonies [D] sufferings','选项辨析：A 问题；B 议题；C 极大痛苦；D 苦难。'],
 ['20. [A] involved in [B] caring for [C] concerned with [D] warding off','选项辨析：A 涉及；B 照顾；C 与……有关；D 防止、避开。'],
 ['Answer the questions below each text by choosing A, B, C or D.','选择 A、B、C 或 D，回答每篇文章后的问题。'],
 ['Mark your answers on ANSWER SHEET 1.','在答题卡 1 上标出你的答案。'],
 ['(40points) - 2 -','（40分）— 2 —。']
];
const gloss={criticized:['criticize','动词','批评'],appointed:['appoint','动词','任命'],commented:['comment','动词','评论'],designated:['designate','动词','指定'],proceeded:['proceed','动词','继续进行'],activated:['activate','动词','激活'],followed:['follow','动词','随后'],prompted:['prompt','动词','促使'],digits:['digit','名词','位数'],numbers:['number','名词','数量'],amounts:['amount','名词','金额'],sums:['sum','名词','总数'],moderate:['moderate','形容词','适度的'],normal:['normal','形容词','正常的'],unusual:['unusual','形容词','不寻常的'],extreme:['extreme','形容词','极端的'],with:['with','介词','和；带有'],in:['in','介词','在……中'],from:['from','介词','从'],by:['by','介词','被；由'],progress:['progress','名词','进展'],absence:['absence','名词','缺乏'],presence:['presence','名词','存在'],favor:['favor','名词','赞成；支持'],reality:['reality','名词','现实'],phenomenon:['phenomenon','名词','现象'],concept:['concept','名词','概念'],notice:['notice','名词/动词','注意；关注'],over:['over','介词','超过'],for:['for','介词','为了'],among:['among','介词','在……之中'],to:['to','介词/不定式符号','到；向'],stay:['stay','动词','停留'],up:['up','副词','向上'],crop:['crop','动词','突然出现'],fill:['fill','动词','填满'],cover:['cover','动词','掩盖'],as:['as','连词','当……时；随着'],if:['if','连词','如果'],unless:['unless','连词','除非'],until:['until','连词/介词','直到'],excessive:['excessive','形容词','过度的'],enormous:['enormous','形容词','巨大的'],significant:['significant','形容词','显著的；重要的'],magnificent:['magnificent','形容词','壮丽的'],categories:['category','名词','类别'],examples:['example','名词','例子'],patterns:['pattern','名词','模式'],samples:['sample','名词','样本'],imparted:['impart','动词','传授'],immersed:['immerse','动词','使浸入'],injected:['inject','动词','注入'],infected:['infect','动词','感染'],released:['release','动词','释放；发放'],relayed:['relay','动词','转达'],relieved:['relieve','动词','缓解'],remained:['remain','动词','保持'],placing:['place','动词','放置'],delivering:['deliver','动词','交付'],taking:['take','动词','采取；接受'],giving:['give','动词','给出'],feasible:['feasible','形容词','可行的'],available:['available','形容词','可获得的'],reliable:['reliable','形容词','可靠的'],applicable:['applicable','形容词','适用的'],prevalent:['prevalent','形容词','普遍的'],principal:['principal','形容词','主要的'],innovative:['innovative','形容词','创新的'],initial:['initial','形容词','最初的'],presented:['present','动词','呈现；提出'],restricted:['restrict','形容词','受限制的'],recommended:['recommend','形容词','推荐的'],introduced:['introduce','动词','介绍；引入'],problems:['problem','名词','问题'],issues:['issue','名词','议题'],agonies:['agony','名词','极大痛苦'],sufferings:['suffering','名词','苦难'],involved:['involve','形容词','涉及的'],caring:['care','动词','照顾'],concerned:['concern','形容词','有关的'],warding:['ward','动词','防止'],off:['off','副词','离开；避开'],answer:['answer','动词/名词','回答；答案'],questions:['question','名词','问题'],below:['below','介词/副词','在……下面'],each:['each','限定词','每个'],text:['text','名词','文章'],choosing:['choose','动词','选择'],mark:['mark','动词','标记'],your:['you','代词','你的'],sheet:['sheet','名词','答题卡']};
function clean(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
function info(t){const c=clean(t.surface);if(!/[A-Za-z]/.test(t.surface))return {lemma:'symbol',partOfSpeech:'数字/标点',contextMeaning:'题号、字母选项或标点',collocations:[],familiarButRareMeaning:null,paraphrases:[]};const g=gloss[c];return {lemma:g?.[0]||c,partOfSpeech:g?.[1]||'词汇',contextMeaning:g?.[2]||'该选项中的词义，需结合题干判断',collocations:[],familiarButRareMeaning:null,paraphrases:[]}}
const generatedAt=new Date().toISOString();const sentences=input.sentences.map((s,i)=>({...s,translation:texts[i][1],grammar:'选项词义与语法辨析。',generationModel:'gpt-5.6-luna',generatedAt,status:'generated',tokens:s.tokens.map(t=>({...t,...info(t)}))}));
const out={schemaVersion:1,taskId:input.taskId,sourceTextHash:input.sourceTextHash,generationModel:'gpt-5.6-luna',generatedAt,sentences};const file=path.join(root,'translation-work/completed',input.taskId+'.json');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(out,null,2));console.log(JSON.stringify({taskId:input.taskId,sentences:sentences.length,words:sentences.reduce((n,s)=>n+s.tokens.length,0)}));
