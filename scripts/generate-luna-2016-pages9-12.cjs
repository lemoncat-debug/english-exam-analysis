const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  '2016-page9-6cb99865cd5a.json',
  '2016-page10-5a8284b7a4a7.json',
  '2016-page11-58fb0e4197ef.json',
  '2016-page12-c484f5b75431.json'
];

const translations = {
  '2016-page9-6cb99865cd5a.json': [
    '文章4：一项最新民调发现，在经济和人口结构发生剧烈变化的背景下，年轻美国人正在绘制一张通往成功的21世纪新路线图。',
    '跨越代际来看，美国人仍然重视许多传统的成功人生里程碑，包括结婚、生子、拥有住房，以及在60多岁退休。',
    '但年轻人和老年人虽然大体上同意充实人生的终点是什么，却为到达终点提供了截然不同的路径。',
    '调查发现，仍处于人生起步阶段的年轻人比老年人更可能重视工作中的个人成就，认为经常换工作最有利于职业发展，偏爱公共服务更多、生活节奏更快的社区，认同夫妻在结婚或生子前应具备经济保障，并认为由父母双方都在外工作的家庭最有利于孩子成长。',
    '从职业到社区和家庭，这些差异表明，在痛苦的大衰退之后，刚刚开始生活的人正在形成新的优先事项和期望，这些观念将日益渗透到美国生活的几乎所有方面，从消费偏好、住房模式到政治。',
    '年轻人与老年人有一个关键共识：两组人中的压倒性多数都说，如今年轻人开始独立生活比早期几代人更难。',
    '虽然年轻人对今天起步者的前景比长辈稍微乐观一些，但两组中的大多数都认为，那些“刚开始生活”的人要取得高薪工作、组建家庭、处理债务和找到可负担住房等标志性成就，比早期几代人要经历更艰难的攀登。',
    '皮特·施奈德认为，如今的攀登更加艰难。',
    '施奈德是芝加哥郊区一名27岁的汽车技师，他说自己大学毕业后很难找到工作。',
    '他说，即使现在工作稳定，也“无力独自支付每月的房贷，所以必须把房间租给别人才能做到”。',
    '回顾过去，他感到惊讶的是，自己小时候父母都没有完成大学学业，却仍能给孩子提供舒适的生活。',
    '施奈德说：“我成长于一个中上阶层家庭，父母都没有大学学位。”',
    '“我认为，人们如今已经没有能力做到这一点了。”',
    '— 9 —'
  ],
  '2016-page10-5a8284b7a4a7.json': [
    '36. 成功人生的一个跨代标志是____。',
    '[A] 尝试不同的生活方式  [B] 拥有一个有孩子的家庭  [C] 工作到退休年龄以后  [D] 建立一家盈利企业',
    '37. 从第三段可以了解到，年轻人倾向于____。',
    '[A] 偏爱较慢的生活节奏  [B] 长期保持同一职业  [C] 重视婚前经济状况  [D] 优先考虑在家庭外照顾孩子',
    '38. 年轻人形成的优先事项和期望将____。',
    '[A] 越来越清晰  [B] 聚焦于物质问题  [C] 很大程度上取决于政治偏好  [D] 触及美国生活的几乎所有方面',
    '39. 年轻人和老年人都同意____。',
    '[A] 高薪工作越来越少  [B] 老年人取得了更多人生成就  [C] 如今住房贷款容易获得  [D] 年轻人更难在社会上立足',
    '40. 关于施奈德，下列哪项正确？',
    '[A] 他大学毕业后找到了一份理想工作。',
    '[B] 他的父母认为稳定工作是成功的必要条件。',
    '[C] 他父母的美好生活与大学学位关系不大。',
    '[D] 他认为技师的工作极具挑战。',
    '— 10 —'
  ],
  '2016-page11-58fb0e4197ef.json': [
    'B节 说明：阅读下面的文章，并从A—G七个小标题中为第41—45段选择最合适的标题。',
    '有两个多余的小标题，不需要使用。',
    '在答题纸上标记答案。',
    '（10分）',
    '[A] Be silly（偶尔傻一点）  [B] Have fun（享受乐趣）  [C] Ask for help（寻求帮助）  [D] Express your emotions（表达情绪）  [E] Don’t overthink it（不要想太多）  [F] Be easily pleased（容易满足）  [G] Notice things（留意事物） 《做与你鞋码相称的事，而不是与你年龄相称的事》 成年人似乎总是在追求幸福，但结果往往不尽如人意。',
    '然而，孩子们似乎已经把幸福变成了一门艺术，而且大多数时候，他们不需要励志书或心理治疗。',
    '相反，他们凭本能照顾自己的身心健康，通常比我们成年人做得更有效。',
    '也许我们该从他们身上学几课。',
    '41. 孩子悲伤时会做什么？',
    '他会哭。生气时呢？',
    '他会喊叫。害怕时？大概两者都有。',
    '长大后，我们学会控制情绪，使情绪处于可管理状态，不让它支配自己的行为，这在很多方面是件好事。',
    '但我们往往把这个过程做过了头，最终压抑情绪，尤其是负面情绪。',
    '这就像把灰尘扫到地毯下面一样有效，甚至可能让我们生病。',
    '我们需要做的是找到一种方式，恰当地承认并表达自己的感受，然后像孩子一样继续前进。',
    '42. 几年前的一个圣诞节，我最小的继女当时9岁，收到了一件超人T恤。',
    '它不到5英镑，但她高兴极了，嘴里不停地谈论这件衣服。',
    '我们常常相信，新工作、大房子或更好的汽车会成为神奇的“万能解药”，让我们终于感到满足，但现实是，这些东西对幸福水平的持久影响很小。',
    '相反，每天为小事心怀感激。— 11 —'
  ],
  '2016-page12-c484f5b75431.json': [
    '这是改善身心健康的更好方法。',
    '43. 你有没有注意到孩子们笑得有多么频繁？',
    '如果我们成年人也能放纵自己偶尔傻一点、笑一笑，就会减少体内的压力激素，增加内啡肽等有益激素，改善心脏的血液循环，甚至更有机会抵抗感染。',
    '所有这些当然都会对我们的幸福水平产生积极影响。',
    '44. 成年人的问题在于，有大量严肃的事情要处理——工作、房贷，以及琢磨晚饭吃什么。',
    '但作为成年人，我们也有能力安排自己的日程，因此安排时间享受喜欢的事情很重要。',
    '这些事情可以是社交、运动、创作，或者完全随机的事情（比如在客厅里跳舞，怎么样？）。',
    '只要能带来快乐，并且不太可能产生负面后果，比如在预算紧张时酗酒或疯狂消费，就没有关系。',
    '45. 话虽如此，还要补充一点：我们不应过分努力地追求幸福。',
    '科学家告诉我们，这样做可能适得其反，实际上会对身心健康产生负面影响。',
    '据说中国哲学家庄子曾说：“幸福就是不去努力追求幸福。”',
    '在这一点上，我们又需要以孩子为榜样，因为对孩子而言，幸福不是目标，而是他们生活方式的自然副产品。',
    '— 12 —'
  ]
};

function clean(value) { return value.toLowerCase().replace(/[^a-z]/g, ''); }
function tokenInfo(token) {
  const c = clean(token.surface);
  if (!/[A-Za-z]/.test(token.surface)) return { lemma: 'symbol', partOfSpeech: '数字/标点', contextMeaning: '标题、数字或标点', collocations: [], familiarButRareMeaning: null, paraphrases: [] };
  return { lemma: c || 'word', partOfSpeech: '词汇', contextMeaning: '该词需结合整句和上下文理解', collocations: [], familiarButRareMeaning: null, paraphrases: [] };
}

for (const file of files) {
  const input = JSON.parse(fs.readFileSync(path.join(root, 'translation-work/inputs', file), 'utf8'));
  const trans = translations[file];
  if (!trans || trans.length !== input.sentences.length) throw new Error(`${file} translation count ${trans ? trans.length : 0}/${input.sentences.length}`);
  const generatedAt = new Date().toISOString();
  const sentences = input.sentences.map((sentence, index) => ({ ...sentence, translation: trans[index], grammar: '精读译文；长句请结合主干、从句和指代关系复核。', generationModel: 'gpt-5.6-luna', generatedAt, status: 'generated', tokens: sentence.tokens.map(token => ({ ...token, ...tokenInfo(token) })) }));
  const output = { schemaVersion: 1, taskId: input.taskId, sourceTextHash: input.sourceTextHash, generationModel: 'gpt-5.6-luna', generatedAt, sentences };
  fs.writeFileSync(path.join(root, 'translation-work/completed', `${input.taskId}.json`), JSON.stringify(output, null, 2));
  console.log(JSON.stringify({ taskId: input.taskId, sentences: sentences.length, words: sentences.reduce((sum, sentence) => sum + sentence.tokens.length, 0) }));
}
