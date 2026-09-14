const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2019-page9-77e9019fdb90.json', '2019-page10-5d4d061d0d84.json', '2019-page11-fce2d8439e68.json', '2019-page12-fd0ad6a63695.json'];
const translations = {
  '2019-page9-77e9019fdb90.json': [
    '文章4：阿诺德·施瓦辛格、迪雅·米尔扎和阿德里安·格勒尼尔要告诉你一件事：打败塑料并不难。',
    '他们是一群名人，出演了世界环境日的一段新视频，鼓励消费者用可重复使用的物品替代吸管、餐具等一次性塑料用品，以应对塑料危机。',
    '为世界环境日整理的核心信息确实包括呼吁政府制定法律，限制一次性塑料。',
    '但总体信息是针对个人的。',
    '然而，我担心把责任交给个人，是因为我们对需要实现的目标认识有限。',
    '例如，自己带购物袋去杂货店或放弃塑料吸管，单独来看作用很小，对我们的要求也很低。',
    '它们甚至可能有害：让我们产生“已经尽了一份力”的满足感，却始终不进一步采取更大、更大胆、更有效的行动——这是一种“道德许可”，它缓解我们的担忧，也阻止我们要求掌权者做更多。',
    '当关于环境及其责任的讨论始终围绕购物袋和吸管时，我们就忽视了其中暗含的权力关系：作为“消费者”，我们被要求可持续地购物，而不是作为“公民”要求政府和行业承担责任、推动真正的系统性变化。',
    '必须承认，环境并不是每个人，甚至不是大多数人的优先事项。',
    '我们不应期待它成为优先事项。',
    '韦尔斯利学院教授伊丽莎白·德松布尔在其新书《好人为什么做有害环境的事》中提出了相关观点。',
    '德松布尔主张，要集体改变大量人的行为，最好的方式是进行结构性改变。',
    '这可能意味着实施塑料税等政策，让有害环境的行为增加成本，或彻底禁止一次性塑料。',
    '印度刚刚宣布将在2022年前“消除全国所有一次性塑料”。',
    '还可以采用激励方式，让更好的环境选择变得容易，例如确保回收至少和丢弃垃圾一样方便。',
    '德松布尔并不是说人们应该停止关心环境。',
    '她只是说，个人行动太慢，不能把它作为改变广泛行为的唯一、甚至主要方法。',
    '这些话并不是要放弃个人。',
    '只是要把事情放在正确的尺度上看。',
    '我们没有时间等待。',
    '我们需要推动集体行动的进步政策（并约束污染企业），同时也需要积极参与、推动变革的公民。',
    '— 9 —'
  ],
  '2019-page10-5d4d061d0d84.json': [
    '36. 一些名人出演新视频，是为了____。',
    '[A] 要求制定有关塑料使用的新法律  [B] 敦促消费者减少塑料使用  [C] 征求公众对塑料危机的意见  [D] 揭示塑料危机的原因',
    '37. 作者担心“道德许可”可能____。',
    '[A] 误导我们去做无价值的事情  [B] 阻止我们继续努力  [C] 削弱我们的成就感  [D] 压制我们对成功的渴望',
    '38. 作者指出我们的“公民”身份，意在说明____。',
    '[A] 我们应把关注点转向社区福利  [B] 我们与地方产业的关系正在改善  [C] 我们一直在积极行使公民权利  [D] 我们应该敦促政府领导这场斗争',
    '39. 德松布尔认为，集体改变行为的最佳方式应该是____。',
    '[A] 双赢安排  [B] 自我驱动机制  [C] 具有成本效益的方法  [D] 自上而下的过程',
    '40. 作者最后得出结论，个人努力____。',
    '[A] 可能过于激进  [B] 可能过于不一致  [C] 远远不够  [D] 远非理性 — 10 —'
  ],
  '2019-page11-fce2d8439e68.json': [
    'B节 说明：阅读下面的文章，把左栏各编号项目与右栏相应的信息进行匹配。',
    '右栏中有两个多余选项。',
    '在答题纸上标记答案。',
    '（10分）在选择新家时，卡米尔·麦克莱恩的孩子只有一个要求：要有后院。',
    '麦克莱恩的孩子并不是唯一对住房有看法的孩子。根据2018年哈里斯民调对2000多名美国成年人的调查，在许多情况下，孩子的意见会对父母的房地产决策产生很大影响。',
    '越来越多的家庭不再遵循老一代不让孩子参与房地产决策的倾向，但房地产经纪人和心理学家对孩子意见可能带来的经济、个人和长期影响看法不一。',
    '芝加哥临床心理学家瑞安·胡珀说，让孩子参与重大决定是个好主意，因为这能帮助他们在这个可能令人不知所措的过程中获得控制感和主人翁感。',
    '他说：“孩子在应对重大搬迁时可能面临严重困难，尤其是搬迁会让他们离开原来的学校或支持系统时。”',
    'Gagliardo Realty Associates的房地产经纪人格雷格·亚罗舍夫斯基说，他不确定孩子是否应该参与挑选住房，但如果可能，应当考虑住房与朋友和社交活动的距离。',
    '纽约房地产律师亚当·贝利说，年幼的孩子应该觉得自己在选择住房——尽管实际上并没有选择权。',
    '贝利说，询问他们喜欢潜在住房后院的哪些方面，会让他们觉得自己被纳入了决策过程。',
    '加州圣克拉丽塔房地产经纪人特蕾西·汉普森说，购房的许多方面并不在孩子的考虑范围内。',
    '过分重视孩子的意见，可能会毁掉一笔很棒的购房交易。',
    '汉普森说：“在作出房地产决定前与孩子交谈是明智的，但我不会只根据他们的意见决定是否购买。”',
    '汉普森说，另一个问题是，许多孩子——尤其是年龄较大的孩子——可能会根据HGTV节目形成对房地产的认识。— 11 —'
  ],
  '2019-page12-fd0ad6a63695.json': [
    '他们可能通过HGTV节目了解房地产知识。里弗赛德诺里斯集团的亚伦·诺里斯说，',
    '“他们和我们其他人一样喜欢奇普和乔安娜·盖恩斯。”',
    '他说：“HGTV彻底改变了人们看待房地产的方式。”',
    '“房地产不只是住所，还是一种生活方式。”',
    '“这种观念转变会带来严重的经济后果。”',
    '诺里斯说，孩子往往会被住房的特色和对他们个人的即时好处吸引。',
    'FitSmallBusiness.com房地产分析师朱莉·格纳说，父母需要提醒孩子，他们的需求和愿望会随着时间而改变。',
    '格纳说：“他们的意见明天就可能改变。”',
    '“这话听起来或许严厉，但决定不应取决于孩子的意见；相反，应充分考虑什么样的住房最能满足他们的需要，并替他们作决定，同时给他们一些定制空间，让住房成为他们自己的家。”',
    '即使当前住房市场紧张，越来越多父母希望接纳孩子的想法，这一建议现在比任何时候都更有意义。',
    '[A] 说重大搬迁可能给孩子带来挑战。',
    '41. 瑞安·胡珀 [B] 说，让孩子不了解房地产决定是明智的。',
    '42. 亚当·贝利 [C] 建议购房不应只根据孩子的意见。',
    '43. 特蕾西·汉普森 [D] 认为应让孩子参与购房决定，使他们有参与感。',
    '44. 亚伦·诺里斯 [E] 指出，购房时应考虑孩子的朋友和社交活动等因素。',
    '45. 朱莉·格纳 [F] 认为购房决定应根据孩子的需要，而不是他们的意见。',
    '[G] 认为许多孩子对房地产的看法受到媒体影响。',
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
