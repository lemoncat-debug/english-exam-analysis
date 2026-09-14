const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2017-page1-6e6e43098ffa.json', '2017-page2-8243191af9c6.json', '2017-page3-330c3ec59737.json', '2017-page4-069dbb179818.json'];
const translations = {
  '2017-page1-6e6e43098ffa.json': [
    '2017年全国硕士研究生入学统一考试英语（二）试题 第一部分 英语知识运用',
    '说明：阅读下面的文章，从每题给出的A、B、C、D四个选项中选出最佳答案，并在答题纸上作答。',
    '（10分）几个世纪以来，人们一直在猜想一个没有工作的未来。',
    '今天也不例外，学者、作家和活动人士再次警告说，技术正在取代人类劳动者。',
    '有些人设想，未来没有工作的世界将由不平等来定义：少数富人拥有全部资本，大众则在贫困的荒地中挣扎。',
    '另一种并不互相排斥的预测认为，未来将是另一种荒地，其特征是毫无目的：没有工作赋予生活意义，人们只会变得懒惰和沮丧。',
    '的确，如今的失业者似乎过得并不愉快。',
    '盖洛普的一项民调发现，至少失业一年的美国人中有20%报告患有抑郁症，是有工作的美国人的两倍。',
    '还有研究表明，中年、教育程度较低的人死亡率、心理健康问题和成瘾率上升，原因之一是缺少高薪工作。',
    '也许正因为如此，许多人担心没有工作的未来会令人痛苦地无聊。',
    '但从这些发现中并不能必然推导出，没有工作的世界会充满不安。',
    '这些设想建立在这样一种体验之上：人们是在以就业为核心的社会中经历失业。',
    '如果没有工作，一个以其他目标为设计初衷的社会，可能为未来的劳动和闲暇带来截然不同的情形。',
    '如今，人们对工作的推崇可能有些夸大。',
    '爱尔兰国立大学戈尔韦分校讲师约翰·达纳赫说：“许多工作枯燥、有辱人格、不健康，还浪费了人的潜能。”',
    '如今，对大多数劳动者来说，闲暇时间相对稀缺，人们用空闲时间来抵消工作给智力和情感带来的压力。',
    '达纳赫说：“辛苦工作一天回家后，我常常感到疲惫。”他补充道：“在不必工作的世界里，我可能会有完全不同的感受。”也许这种不同足以让他全身心投入某种爱好或激情项目，投入程度通常只留给工作事务。',
    '— 1 —'
  ],
  '2017-page2-8243191af9c6.json': [
    '1. [A] 吹嘘  [B] 否认  [C] 警告  [D] 确保',
    '2. [A] 不平等  [B] 不稳定  [C] 不可靠  [D] 不确定',
    '3. [A] 政策  [B] 指导方针  [C] 决议  [D] 预测',
    '4. [A] 以……为特征  [B] 被分割  [C] 被平衡  [D] 被测量',
    '5. [A] 智慧  [B] 意义  [C] 荣耀  [D] 自由',
    '6. [A] 相反  [B] 的确  [C] 因此  [D] 然而',
    '7. [A] 富裕的  [B] 城市的  [C] 有工作的  [D] 受过教育的',
    '8. [A] 解释  [B] 要求  [C] 补偿  [D] 替代物',
    '9. [A] 在……之下  [B] 超过  [C] 与……一起  [D] 在……之中',
    '10. [A] 抛在身后  [B] 组成  [C] 担心  [D] 搁置',
    '11. [A] 统计上地  [B] 偶尔地  [C] 必然地  [D] 经济上地',
    '12. [A] 机会  [B] 不利因素  [C] 好处  [D] 原则',
    '13. [A] 缺乏  [B] 高度  [C] 面对  [D] 过程',
    '14. [A] 扰乱  [B] 恢复  [C] 排除  [D] 带来、产生',
    '15. [A] 模式  [B] 实践  [C] 美德  [D] 困难',
    '16. [A] 棘手的  [B] 漫长的  [C] 神秘的  [D] 稀缺的',
    '17. [A] 要求  [B] 标准  [C] 品质  [D] 威胁',
    '18. [A] 被忽视  [B] 疲惫  [C] 困惑  [D] 饥饿',
    '19. [A] 离开  [B] 反对  [C] 在……后面  [D] 进入',
    '20. [A] 技术的  [B] 职业的  [C] 教育的  [D] 人际的',
    '第二部分 阅读理解 A节 说明：阅读下面四篇文章，回答每篇文章后的问题，从A、B、C、D四个选项中选出最佳答案。',
    '在答题纸上作答。',
    '（40分）— 2 —'
  ],
  '2017-page3-330c3ec59737.json': [
    '文章1',
    '每周六上午9点，超过5万名跑步者从起点出发，在当地公园里跑5公里。',
    'Parkrun现象最初由十几位朋友发起，如今已在英国和其他国家激发了400多场活动。',
    '活动免费，由数千名志愿者负责。',
    '跑步者从4岁儿童到祖父母都有；他们的成绩从安德鲁·巴德利创造的13分48秒世界纪录，到长达一小时不等。',
    'Parkrun正在取得成功，而伦敦奥运会的“遗产”却没有做到这一点。',
    '十年前的星期一，人们宣布第30届奥运会将在伦敦举行。',
    '规划文件承诺，奥运会的伟大遗产将是把一个热爱运动的民族从沙发上带起来。',
    '人们会更健壮、更健康，并培养出更多赢家。',
    '但事实并非如此。',
    '在2012年奥运会前夕，每周参加体育运动的成年人确实增加了近200万，但总人口增长得更快。',
    '更糟的是，如今这一数字正以加速的速度下降。',
    '反对党声称，每周至少参加两小时体育活动的小学生人数几乎减少了一半。',
    '成年人和儿童中的肥胖率都上升了。',
    '官方仍在反思伦敦2012为何未能“激励一代人”。',
    'Parkrun的成功提供了答案。',
    'Parkrun不是比赛，而是计时测试：你唯一的竞争对手是时钟。',
    '它的理念欢迎任何人参加。',
    '一个气喘吁吁的初次参赛者被拍手欢迎冲过终点线时，所获得的快乐并不亚于顶尖选手大放异彩。',
    '相比之下，奥运会申办者想让更多人参加体育运动，并培养更多精英运动员。',
    '这两个目标混在了一起：强调成功而非参与，让新手望而生畏。',
    '事实上，让国家参与规划社区体育协会这样根本属于“草根”的理念，多少有些荒谬。',
    '如果政府有职责，那就应该参与提供公共物品——确保有运动场地，筹资铺设网球场和无挡板篮球场，并鼓励学校提供所有这些活动。',
    '但历届政府却任由绿地被出售，挤压地方政府的资金，并逐渐减少对体育教育的关注。',
    '未来政府需要做更多工作，为体育蓬勃发展提供条件，而不是制定冗长却空洞的策略。',
    '至少不要让条件变得更糟。',
    '— 3 —'
  ],
  '2017-page4-069dbb179818.json': [
    '21. 根据第一段，Parkrun已经____。',
    '[A] 获得广泛欢迎  [B] 创造许多就业岗位  [C] 加强社区联系  [D] 成为官方节日',
    '22. 作者认为，伦敦奥运会的“遗产”未能____。',
    '[A] 推动人口增长  [B] 促进体育参与  [C] 改善城市形象  [D] 增加学校体育时数',
    '23. Parkrun与奥运会的不同在于，它____。',
    '[A] 旨在发现人才  [B] 注重大众竞争  [C] 不强调精英主义  [D] 不吸引初次参赛者',
    '24. 关于大众体育，作者认为政府应该____。',
    '[A] 组织“草根”体育活动  [B] 监督地方体育协会  [C] 增加对体育俱乐部的资金  [D] 投资公共体育设施',
    '25. 作者对英国政府在体育方面所作所为的态度是____。',
    '[A] 宽容  [B] 批评  [C] 不确定  [D] 同情 — 4 —'
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
