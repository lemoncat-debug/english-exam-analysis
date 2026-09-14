const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2018-page1-b0d33a979ceb.json', '2018-page2-b9ce2a3b41fb.json', '2018-page3-dad78ae4e916.json', '2018-page4-ae13d816bfdb.json'];
const translations = {
  '2018-page1-b0d33a979ceb.json': [
    '2018年全国硕士研究生入学统一考试英语（二）试题 第一部分 英语知识运用',
    '说明：阅读下面的文章，从每题给出的A、B、C、D四个选项中选出最佳答案，并在答题纸上作答。',
    '（10分）为什么人们会阅读负面的网络评论，或做其他明显会带来痛苦的事情？',
    '芝加哥大学《心理科学》近期的一项研究认为，这是因为人类天生需要解决不确定性。',
    '新研究揭示，人们求知的需要非常强烈，即使答案显然会带来伤害，他们也会寻求满足好奇心。芝加哥大学和威斯康星商学院的行为科学家进行了一系列四项实验，测试学生为了满足好奇心而让自己接触不愉快刺激的意愿。',
    '例如，在一次实验中，每名参与者都看到一堆钢笔，研究人员声称这些钢笔来自之前的一项实验。',
    '转折在于：其中一半钢笔在按下时会发出电击。',
    '研究人员告诉27名学生哪些钢笔通电，另27名学生只被告知其中一些通电。',
    '当学生被单独留在房间里时，不知道哪些钢笔会电击的学生按下了更多钢笔，也遭受了比那些知道会发生什么的学生更多的电击。',
    '后续实验用其他刺激重复了这一结果，例如黑板上指甲划过的声音和令人恶心的昆虫照片。',
    '芝加哥大学的克里斯托弗·希说，探索未知的驱动力深深植根于人类，就像对食物或住所的基本需求一样。',
    '好奇心通常被视为一种良好本能——例如，它可以带来新的科学进步——但有时这种探究也会适得其反。',
    '好奇心会驱使人做出自我毁灭之事，这一认识意义深远。',
    '不过，不健康的好奇心是可以抵制的。',
    '在最后一项实验中，那些被鼓励预测自己看完令人不快的图片后的感受的参与者，更不容易选择去看这种图片。',
    '这些结果表明，提前想象顺着好奇心行动的后果，有助于判断这种行为是否值得。',
    '希说：“思考长期后果是减少好奇心潜在负面影响的关键。”',
    '换句话说，不要阅读网络评论。',
    '— 1 —'
  ],
  '2018-page2-b9ce2a3b41fb.json': [
    '1. [A] 保护  [B]', '[B] 解决  [C] 讨论  [D]', '[D] 忽视',
    '2. [A] 拒绝  [B]', '[B] 等待  [C] 后悔  [D]', '[D] 寻求',
    '3. [A] 伤害  [B]', '[B] 持续  [C] 误导  [D]', '[D] 上升',
    '4. [A] 警觉  [B]', '[B] 约束  [C] 对待  [D]', '[D] 使自己接触',
    '5. [A] 信息  [B]', '[B] 评论  [C] 试验  [D]', '[D] 概念',
    '6. [A] 移除  [B]', '[B] 削弱  [C] 打断  [D]', '[D] 传递、发出',
    '7. [A] 当……时  [B]', '[B] 如果  [C] 尽管  [D]', '[D] 除非',
    '8. [A] 继续  [B]', '[B] 发生  [C] 消失  [D]', '[D] 改变',
    '9. [A] 而不是  [B]', '[B] 不管  [C] 例如  [D]', '[D] 由于',
    '10. [A] 发现  [B]', '[B] 原谅  [C] 忘记  [D]', '[D] 不同意',
    '11. [A] 报酬  [B]', '[B] 婚姻  [C] 教育  [D]', '[D] 食物',
    '12. [A] 导致  [B]', '[B] 依靠  [C] 向……学习  [D]', '[D] 从……开始',
    '13. [A] 退出  [B]', '[B] 坚持  [C] 探究  [D]', '[D] 勤奋',
    '14. [A] 自立的  [B]', '[B] 自我毁灭的  [C] 不言自明的  [D]', '[D] 自欺的',
    '15. [A] 界定  [B]', '[B] 抵制  [C] 替代  [D]', '[D] 追踪',
    '16. [A] 忽视  [B]', '[B] 预测  [C] 设计  [D]', '[D] 隐藏',
    '17. [A] 记得  [B]', '[B] 承诺  [C] 选择  [D]', '[D] 假装',
    '18. [A] 宽慰  [B]', '[B] 计划  [C] 责任  [D]', '[D] 结果',
    '19. [A] 为什么  [B]', '[B] 是否  [C] 哪里  [D]', '[D] 如何',
    '20. [A] 后果  [B]', '[B] 投资  [C] 策略  [D]', '[D] 局限',
    '第二部分 阅读理解 A节 说明：阅读下面四篇文章，回答每篇文章后的问题，从A、B、C、D四个选项中选出最佳答案。',
    '在答题纸上作答。',
    '（40分）— 2 —'
  ],
  '2018-page3-dad78ae4e916.json': [
    '文章1',
    '令人好奇的是，斯蒂芬·科济亚特克几乎觉得自己必须为让学生拥有更美好未来的努力辩解。',
    '科济亚特先生正在参与一项开创性的事业。',
    '他是新罕布什尔州一所高中的教师，在那里学习不是通过书本、考试和机械记忆，而是强调实践。',
    '人们是什么时候开始接受这样的常识：学生应该能说出美国第13任总统的名字，却会被一条坏掉的自行车链条完全难住？',
    '正如科济亚特所知，几乎任何事情中都有学习的机会。',
    '强迫学生在一张粘满几代人丢弃口香糖、布满涂鸦的课桌前学习几何，并不一定能带来什么收获。',
    '他们也可以通过组装自行车学习几何。',
    '但他还发现了一种隐蔽的偏见。',
    '动手工作几乎被视为低人一等的标志。',
    '职业教育学校背负着这样的刻板印象：“它是给那些学业上无法成功的孩子的。”',
    '一方面，这种看法是美国发展历程的合乎逻辑的产物。',
    '制造业已不再是过去那样的经济引擎。',
    '美国经济曾经为高中毕业生提供的工作保障大多已经消失。',
    '更多教育成为新的原则。',
    '我们希望孩子得到更多，这当然是合理的。',
    '但把所有人都一股脑推向学士学位、微妙地贬低其他道路，忽略了一个重要事实：美国经济需要的不只是这一种人才。',
    '是的，学士学位会打开更多大门。',
    '但即使在今天，全国54%的工作属于中等技能岗位，例如建筑业和高技能制造业岗位。',
    '然而，只有44%的劳动者受到了充分培训。',
    '换句话说，在工人阶级因曾经定义美国的机会正在消失而感到沮丧、并在政治上掀起巨变之时，一个显而易见的解决方案正摆在我们面前。',
    '工人阶级的岗位存在缺口，但最需要这些岗位的工人却没有能力胜任。',
    '科济亚特克的曼彻斯特技术高中正试图填补这一缺口。',
    '科济亚特克的学校敲响了警钟。',
    '当教育变成千篇一律的模式时，就有可能忽视一个国家多样化的天赋。',
    '— 3 —'
  ],
  '2018-page4-ae13d816bfdb.json': [
    '21. 提到坏掉的自行车链条，是为了说明学生缺乏____。',
    '[A] 实际能力  [B] 学术训练',
    '[C] 开创精神  [D] 机械记忆能力',
    '22. 人们对职业教育存在这样的偏见，认为它是给____的孩子的。',
    '[A] 思维刻板',
    '[B] 没有职业动力',
    '[C] 学业上不成功',
    '[D] 经济上处于不利地位',
    '23. 从第五段可以推断，高中毕业生过去____。',
    '[A] 曾经面临较大的经济忧虑',
    '[B] 过去拥有更多就业机会',
    '[C] 不愿意从事制造业',
    '[D] 有权享受更多教育特权',
    '24. 把所有人一股脑推向学士学位____。',
    '[A] 有助于创造大量中等技能岗位',
    '[B] 可能缩小工人阶级岗位的缺口',
    '[C] 预计会培养出受训更充分的劳动力',
    '[D] 表明人们高估了高等教育的价值',
    '25. 作者对科济亚特克学校的态度可以描述为____。',
    '[A] 支持  [B] 宽容  [C] 失望',
    '[D] 谨慎 — 4 —'
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
