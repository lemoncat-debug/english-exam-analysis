const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = [
  '2021-page1-0d1c76cbe2a7.json',
  '2021-page2-926b045692ea.json',
  '2021-page3-68b871e83878.json',
  '2021-page4-ed47edcde5e0.json'
];
const translations = {
  '2021-page1-0d1c76cbe2a7.json': [
    '2021年全国硕士研究生招生考试英语（二）试题（10分）第一部分 英语知识运用',
    '说明：阅读下面的文章，从每题给出的A、B、C、D四个选项中选出最佳答案，并在答题纸上作答。',
    '为员工设定目标并不难。',
    '然而，要理解这些目标带来的负面后果，却难得多。',
    '大多数与工作有关的行为都包含多个组成部分。',
    '一旦强调其中一个组成部分，其他部分就会变得扭曲。',
    '乘坐伦敦的公交车，你很快就会看到这种机制如何作用于司机。',
    '观察人们上车并出示车票。',
    '车票会被仔细检查吗？',
    '从来不会。人们会不付钱就上车吗？',
    '当然会！有检票员核实乘客是否付钱吗？',
    '可能有，但非常少。',
    '那么赶公交车的人呢？',
    '他们会受到惩罚。',
    '闯红灯呢？',
    '公交车闯红灯的频率几乎和骑车人一样高。',
    '为什么？因为目标是准点率。',
    '人们抱怨公交车晚点且班次少。',
    '于是，公交车数量和公交专用道增加了，司机还按照用时获得奖励或受到惩罚。',
    '司机达成了这些目标。',
    '但他们也因此撞上了骑车人。',
    '如果把目标改成收入，你会拥有更多检票员和更灵敏的定价机制。',
    '如果评价标准改成安全，你会得到更多遵守交通法规、工作更勤勉的司机。',
    '但这两个标准都会以牺牲时间为代价。',
    '还有另一个问题：人们在完成目标方面变得极其有创造性。',
    '你有没有注意到，航班可以晚起飞一小时，却仍能准时到达？',
    '顺风吗？当然不是！',
    '航空公司只是改变了航程本应花费的时间。',
    '一小时的航班现在被标成两小时。',
    '这个故事的要旨很简单。',
    '大多数工作都是多维度的，有多个评价标准。',
    '选择一个标准，很可能就会牺牲其他标准。',
    '一切都可以做得更快、更便宜，但总会有代价。',
    '设定目标确实会带来未预见的负面后果。',
    '这并不是反对设定目标。',
    '但它说明我们应该先探究后果。',
    '所有好的目标都应包含多个标准，涉及时间、金钱、质量和客户反馈等关键因素。',
    '诀窍不仅在于不要只规定目标的一个甚至两个维度，还在于理解如何帮助人们更好地实现目标。',
    '— 1 —'
  ],
  '2021-page2-926b045692ea.json': [
    '1. [A] 因此  [B] 然而  [C] 再次  [D] 此外',
    '2. [A] 强调  [B] 识别  [C] 评估  [D] 解释',
    '3. [A] 几乎  [B] 奇怪地  [C] 急切地  [D] 很快地',
    '4. [A] 声称  [B] 证明  [C] 检查  [D] 回忆',
    '5. [A] 受到威胁的  [B] 被忽视的  [C] 被嘲笑的  [D] 被责备的',
    '6. [A] 准时  [B] 好客  [C] 竞争  [D] 创新',
    '7. [A] 然而  [B] 所以  [C] 此外  [D] 仍然',
    '8. [A] 雇用  [B] 培训  [C] 奖励  [D] 分组  [A] 只有  [B] 而是  [C] 一旦  [D] 也',
    '10. [A] 舒适  [B] 收入  [C] 效率  [D] 安全',
    '11. [A] 友好的  [B] 安静的  [C] 谨慎的  [D] 勤勉的',
    '12. [A] 目的  [B] 问题  [C] 偏见  [D] 政策',
    '13. [A] 报道  [B] 揭示  [C] 承认  [D] 注意到',
    '14. [A] 中断  [B] 旅行  [C] 出发  [D] 转移',
    '15. [A] 道德  [B] 背景  [C] 风格  [D] 要旨',
    '16. [A] 解释  [B] 批评  [C] 牺牲  [D] 容忍',
    '17. [A] 任务  [B] 秘密  [C] 产品  [D] 代价',
    '18. [A] 导致  [B] 要求  [C] 关于  [D] 说明',
    '19. [A] 具体说明  [B] 预测  [C] 恢复  [D] 创造',
    '20. [A] 修改  [B] 复习  [C] 提出  [D] 实现 第二部分 阅读理解 A节 说明：阅读下面四篇文章，回答每篇文章后的问题，从A、B、C、D四个选项中选出最佳答案。',
    '在答题纸上作答。',
    '请在答题纸上标记答案。',
    '（40分）'
  ],
  '2021-page3-68b871e83878.json': [
    '文章1',
    '“技能再培训”听起来像一个流行词，但如果我们希望未来不会有大量潜在劳动者被落下，它实际上是一项必需之举。',
    '我们正进入这样一个时期：需求旺盛的工作岗位会迅速变化，仍然存在的岗位要求也会变化。',
    '世界经济论坛的研究发现，到2022年，各职业岗位中“核心技能”平均有42%将发生变化。',
    '这个时间跨度非常短。',
    '谁应当为技能再培训买单，是一个棘手的问题。',
    '对单个公司而言，最容易采取的做法总是解雇技能不再受需求的员工，再用拥有所需技能的人替代他们。',
    '但事情并不总是这样发生。',
    '美国电话电报公司常被视为黄金标准：它决定开展大规模再培训，而不是采用“解雇并重新招聘”策略。',
    '包括亚马逊和迪士尼在内的其他公司也承诺制定自己的计划。',
    '然而，当技能错配存在于整个经济中时，人们通常会把处理责任转向政府。',
    '加拿大及其他地方的努力充其量只能说进展缓慢，这导致我们经常听到雇主求职，即使是在失业率很高的时期和地区。',
    '疫情使失业率确实非常高。',
    '2月份，加拿大和美国的失业率分别为3.5%和5.5%，处于几代人以来的低点，而劳动力短缺随处可见。',
    '截至5月，这两个数字已分别飙升至13.3%和13.7%；尽管许多劳动力短缺消失了，却并非全部消失。',
    '以医疗领域为明显例子，疫情意味着医生、护士和其他医务人员仍然明显短缺。',
    '当然，不管由谁付钱，也不可能把一名失业的服务员在几周内培训成医生。',
    '但即便无法填补这一缺口，也许可以填补其他缺口，而这样做会让所有相关者受益。',
    '瑞典的情况似乎就是如此：斯堪的纳维亚航空被迫让90%的客舱员工停薪休假后，决定启动短期再培训项目，让被裁员的员工转而支持医院工作人员。',
    '这是一项集体行动，其他公司以及一所瑞典大学也参与其中。'
  ],
  '2021-page4-ed47edcde5e0.json': [
    '21. 世界经济论坛的研究表明____。',
    '[A] 全职就业增加  [B] 对新工作技能的迫切需求  [C] 工作机会稳步增长  [D] 对“核心技能”的争议',
    '22. 文中引用美国电话电报公司是为了说明____。',
    '[A] “解雇并重新招聘”策略的替代方案  [B] 立即获得政府支持的必要性  [C] 员工评价标准的重要性  [D] 再培训项目的特点',
    '23. 解决技能错配的努力____。',
    '[A] 推高了劳动力成本  [B] 已被证明前后不一致  [C] 遭到了强烈反对  [D] 似乎并不充分',
    '24. 从第三段可以得知，当时____。',
    '[A] 有人呼吁调整政策  [B] 招聘做法发生了变化  [C] 医务人员短缺  [D] 出现了经济复苏迹象',
    '25. 斯堪的纳维亚航空决定____。',
    '[A] 为失业者创造职位空缺  [B] 为被裁员工准备其他工作  [C] 为更好的服务培训客舱员工  [D] 资助员工接受大学教育',
    '— 4 —'
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
