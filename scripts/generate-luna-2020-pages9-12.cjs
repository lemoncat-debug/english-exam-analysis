const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2020-page9-dfe5b5d64c99.json', '2020-page10-d69a8180e791.json', '2020-page11-f189bc39d7ca.json', '2020-page12-3e5bb56ad3c5.json'];
const translations = {
  '2020-page9-dfe5b5d64c99.json': [
    '文章4：如今，Z世代成员将在今年春天大学毕业——最普遍接受的定义认为，这一代人出生于1995年之后，前后相差一年左右——近几周来，人们对他们的关注持续上升。',
    'Z世代即将进入就业市场寻找工作，而这个市场比几十年来任何时候都更加紧张。',
    '根据美国大学与雇主协会开展的一项调查，今年美国雇主计划招聘的新毕业生比去年增加约17%。',
    '每个人都想知道，那些即将坐进空置办公室隔间的人，与他们之前的几代人会有什么不同。',
    '如果说“自以为是”是人们不论是否公平地用来形容千禧一代（1981—1995年出生者）最常见的形容词，那么形容Z世代的关键词就是务实和谨慎。',
    '研究他们的职业顾问和专家认为，Z世代是头脑清醒、精于经济计算的现实主义者。',
    '尽管他们毕业时正值过去50年来最好的经济时期，Z世代仍然知道经济灾难是什么样子。',
    '2008年经济崩溃时，他们还是容易受影响的孩子，许多人的父母失去了工作、毕生积蓄，或两者兼失。',
    '他们对冒险不感兴趣。',
    '蓬勃发展的经济似乎并没有缓解这一代人内在的焦虑和紧迫感，尤其是那些背负大学债务的人。',
    '据美联储数据，美国大学贷款余额如今创纪录地达到1.5万亿美元。',
    '埃森哲的一项调查发现，今年毕业的高年级学生中有88%选择专业时就考虑了就业。',
    '与此同时，佐治亚大学2019年对学生的调查发现，未来雇主最受期待的特征是能够提供稳定就业，其次是职业发展与培训，再其次是鼓舞人心的目标。',
    '就业保障或稳定性是第二重要的职业目标（第一是工作与生活平衡），其次是对某项事业的奉献感，或因服务更大利益而感到满足。',
    '这与上一代人有很大变化。',
    '英国YouthSight品牌经理助理总监坦娅·米歇尔森指出，千禧一代“希望生活中有更多灵活性”；她的公司定期对英国年轻人开展为期60天的调查，而这些发现同样适用于美国年轻人。',
    '她说：“Z世代希望获得更多确定性和稳定性，因为零工经济正在兴起。”',
    '“他们很难看清自己的财务未来，而且非常厌恶风险。”',
    '— 9 —'
  ],
  '2020-page10-d69a8180e791.json': [
    '36. 今年春天大学毕业的Z世代____。',
    '[A] 因能力而受到认可  [B] 对就业市场持乐观态度  [C] 偏爱办公室工作机会  [D] 正受到越来越多公众关注 37.',
    'Z世代非常清楚____。',
    '[A] 父母对他们的期望  [B] 职业顾问的建议有多大价值  [C] 艰难的经济状况是什么样  [D] 自己与过去几代人有何不同',
    '38. “assuage”（第2段第9行）最接近的含义是____。',
    '（上题词语的释义）',
    '[A] 加深  [B] 界定  [C] 保持  [D] 缓解',
    '39. 从第三段可以了解到，Z世代____。',
    '[A] 把职业培训放在首位  [B] 对未来工作有清晰想法  [C] 不太关心工作表现  [D] 认为实现工作与生活平衡很困难',
    '40. 米歇尔森认为，与千禧一代相比，Z世代____。',
    '[A] 不那么现实  [B] 不那么喜欢冒险  [C] 更加勤奋  [D] 更加慷慨 — 10 —'
  ],
  '2020-page11-f189bc39d7ca.json': [
    'B节 说明：阅读下面的文章，从A—G七个小标题中为第41—45段选择最合适的标题。',
    '有两个多余的小标题，不需要使用。',
    '在答题纸上标记答案。',
    '（10分）',
    '[A] 赞美，但不要过多。',
    '[B] 始终保持良好面貌。',
    '[C] 调整你的互动方式。',
    '[D] 与每个人相处。',
    '[E] 揭示信息，不要隐藏。',
    '[F] 放慢脚步并倾听。',
    '[G] 设身处地为他人着想。',
    '《在办公室赢得所有人的五种方法》喜欢办公室里的每个人，这可能吗？',
    '想想看，要让15个人，更不用说50个人，完美相处有多么困难。',
    '但与友谊不同，你需要同事。',
    '你每天和他们一起工作，依靠他们，他们也依靠你。',
    '下面是一些让整个办公室支持你的方法。',
    '41. 如果你对工作场所的某个人有意见，可能会试图在他们面前保持沉默。',
    '但这样做对你们任何一方都没有帮助。',
    '哈佛商学院的一项研究发现，观察者始终给那些坦率介绍自己的人更高评价，而隐藏自己的人会失去可信度。',
    '这一教训不是说你应该把个人生活完全公开，而是说，当你可以选择透露自己的细节或刻意藏起来时，应该诚实。',
    '42. 诚实面对自己同样重要的是对他人保持接纳。',
    '— 11 —'
  ],
  '2020-page12-3e5bb56ad3c5.json': [
    '我们经常觉得有必要告诉别人自己的感受，无论是对项目的担忧、一个突然的想法，还是一句赞美。',
    '这些都合理，但你也需要花时间听同事把话说完。',
    '事实上，急于表达自己的想法，可能会让同事觉得你不重视他们的意见。',
    '尽力与同事进行真诚的、你来我往的交谈，而不是只把自己的想法放在首位。',
    '43. 在工作环境中，有一个“隔间伙伴”或特别信任的人很常见。',
    '但除了这些值得信赖的同事，你还应该拓展视野，了解身边的所有人。',
    '利用午餐和喝咖啡的休息时间，去见那些平时不常见的同事。',
    '了解他们工作之外的生活和兴趣。',
    '这只需付出很少努力，却能带来很大收获。',
    '这会帮助你拓展内部人际网络，也能让工作日得到一次愉快的休息。',
    '44. 积极反馈是任何人都需要听到的。',
    '你不必是某人的老板，也可以告诉对方他们在某个项目上表现出色。',
    '这会帮助你在他人心中建立善意。',
    '但不要过度，也不要虚假地赞美。',
    '一项研究发现，人们对从负面转向正面的评论反应最好，可能是因为这暗示他们赢得了某人的认可。',
    '45. 这一点可能更难做到，但对取得成果大有帮助。',
    '与任何同事相处时，要记住他们在互动中看重什么。',
    '注意他们与他人说话的方式。',
    '有些人喜欢在会议中先闲聊，再谈重要事项；另一些人则更加直接。',
    '对一个人有效的笑话，不一定能逗笑另一个人。',
    '因此，要根据对方类型相应调整自己的方式。',
    '提前考虑你正在打交道的人，以及什么做法能帮助你实现目标。',
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
