const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  '2015-page9-7ca051fa1e88.json',
  '2015-page10-0b37c3babe2b.json',
  '2015-page11-cf4d5b974c38.json',
  '2015-page12-b27e800adbff.json',
  '2015-page13-74e5338efd6f.json',
  '2015-page14-8c816ae49fe2.json'
];

const translations = {
  '2015-page9-7ca051fa1e88.json': [
    '文章4：许多人把劳工部公布的6月份新增28.8万个就业岗位，以及失业率降至6.1%，视为好消息。',
    '他们的判断是对的。',
    '目前看来，经济正以相当不错的速度创造就业岗位。',
    '我们距离充分就业仍有很长的路要走，但就业市场的前景似乎正在改善。',
    '然而，就业形势中还有一个重要部分常常被忽略。',
    '报告自愿从事兼职工作的人数大幅增加。',
    '如今，这一数字比去年同期高出83万人（4.4%）。',
    '在解释这一现象与《平价医疗法案》的联系之前，有必要先作一个重要区分。',
    '许多做兼职的人实际上想要全职工作。',
    '他们之所以接受兼职，是因为只能找到这样的工作。',
    '非自愿兼职工作的增加，是劳动力市场疲软的证据；而自愿兼职的增加则可能反映出相反的情况。',
    '6月份，非自愿兼职人数有所增加，但自愿兼职人数的增幅更大。',
    '非自愿兼职就业人数仍远高于经济衰退前的水平，不过过去一年它一直在下降。',
    '我们知道自愿和非自愿兼职就业的区别，因为这是人们自己告诉我们的。',
    '劳工部使用的调查会询问人们在调查参考周内是否工作了不到35个小时。',
    '如果答案是“是”，他们就被归类为兼职工作者。',
    '调查随后会询问：他们工作不到35小时，是因为想少工作，还是因为别无选择。',
    '只有当受访者告诉调查员，他们选择了兼职工作时，才会被归类为自愿兼职工作者。',
    '自愿兼职问题与《平价医疗法案》有关，因为该法案的主要目的之一，就是让人们能够通过就业之外的渠道获得保险。',
    '对许多人来说，尤其是那些患有严重疾病、难以在个人市场购买保险的人来说，这一点非常重要。',
    '然而，《平价医疗法案》已经让超过1200万人通过医疗补助或保险交易所获得了保险。',
    '这些人过去可能觉得必须找到一份提供保险的全职工作，即使那并不是他们真正想做的。',
    '有了《平价医疗法案》，就业与保险之间不再存在必然联系。',
    '— 9 —'
  ],
  '2015-page10-0b37c3babe2b.json': [
    '36. 就业形势的哪一部分被忽视了？',
    '[A] 就业市场繁荣的前景。',
    '[B] 自愿兼职工作的增加。',
    '[C] 实现充分就业的可能性。',
    '[D] 就业岗位创造速度的加快。',
    '37. 许多人从事兼职工作，是因为他们____。',
    '[A] 只想工作几小时；[B] 找不到全职工作；[C] 需要照顾家人；[D] 负担不起保险。',
    '38. 美国的非自愿兼职就业____。',
    '[A] 在6月份有所下降；[B] 比去年同期增加了4.4%；[C] 仍高于衰退前水平；[D] 已经恢复到正常水平。',
    '39. 可以了解到，随着《平价医疗法案》的实施，____。',
    '[A] 更多人可以在就业之外获得保险；[B] 全职工作的数量大幅减少；[C] 医疗补助将被取消；[D] 保险交易所只服务兼职人员。',
    '40. 本文主要讨论____。',
    '[A] 美国就业市场的真实状况；[B] 兼职就业与医疗保险的联系；[C] 充分就业面临的障碍；[D] 《平价医疗法案》的政治影响。— 10 —'
  ],
  '2015-page11-cf4d5b974c38.json': [
    '第二部分',
    '说明：在本部分，你有15分钟阅读一篇约450词的文章，并从A—G七个选项中选择五个合适的小标题，分别填入第41—45题。选项中有两个是多余的。',
    '在答题纸1上标记答案。',
    '（10分）',
    'A. Fear Is Both Useful and Harmful  B. Don’t Let Guilt Poison the Present  C. People Need Each Other  D. Make Yourself Proud  E. Your Past Is Important  F. You Are Not Your Problems  G. Treat Yourself as a Friend\n不幸的是，人生并非一帆风顺。',
    '我们在人生道路上不断面对悲伤的经历。',
    '我们会失去朋友、亲密关系，甚至失去房子和其他珍贵的东西。',
    '但艰难时期不会永远持续。',
    '悲伤终会过去，我们会继续前行，并因此变得更坚强。',
    '这些失去会使我们成熟，也会为未来的机会作好准备。',
    '我想分享一些古老的真理，它们能帮助你克服困难时期。',
    '41. 恐惧既有用，也有害。',
    '恐惧能够保护我们，提醒我们注意危险。',
    '但我们的内心障碍也会夸大恐惧，使我们把困难想得比实际更严重。',
    '威尔·史密斯说：“恐惧不是真实的。”',
    '“它是你创造出来的思想产物。”',
    '请不要误解我的意思。',
    '危险是真实存在的。',
    '但恐惧是一种选择。',
    '我完全同意这一点：我们可以选择如何面对恐惧。',
    '42. — 11 —'
  ],
  '2015-page12-b27e800adbff.json': [
    '如果你被各种问题包围，无法停止思考过去，就试着把注意力集中在当下。',
    '我们中的许多人被过去压得喘不过气，或者对未来感到焦虑。',
    '你可能会为过去感到内疚，但那些无法改变的事情和处境正在毒害你的现在。',
    '珍惜当下，并记住能够活着是多么幸运。',
    '享受周围世界的美好，睁开眼睛去发现眼前的可能性。',
    '幸福不是未来的某个目标，也不是过去的某个瞬间，而是一种可以融入当下的心态。',
    '43. 有时，因为正经历艰难时期，我们很容易感到难过。',
    '生活中的问题会轻易把你拖进去，让你忘记停下来欣赏自己所拥有的一切。',
    '只有坚强的人才会选择微笑、珍惜生活，而不是为某件事哭泣和抱怨。',
    '44. 无论你感到多么孤立、处境多么严重，都要始终记住自己并不孤单。',
    '请记住，只要你努力让生活变得更好，几乎每个人都会尊重并愿意帮助你，尤其是最亲近的人。',
    '你可能有一个朋友圈，他们会持续给你带来幽默、帮助和陪伴。',
    '如果没有朋友或亲人，可以参加一些网上社群，那里有许多人愿意分享建议并给予鼓励。',
    '45. 如今，许多人发现很难相信自己的判断，只能通过外部来源获得客观性来寻求平衡。',
    '这样做会贬低自己的意见，也表明你认为自己没有能力管理好自己的生活。',
    '当你努力实现某件重要的事情时，要相信自己，并确信自己的决定最适合自己。',
    '你生活在自己的身体里，思考自己的想法，拥有自己的价值观，并作出自己的选择。',
    '— 12 —'
  ],
  '2015-page13-74e5338efd6f.json': [
    '第三部分 翻译',
    '说明：阅读下面的文章，并将其翻译成中文。',
    '请把译文写在答题纸2上。',
    '想一想你驾驶一条非常熟悉的路线时的情形。',
    '也许是每天上下班的路线，或者从城镇到家里的路。',
    '你对沿途的弯道和转向十分熟悉，就像熟悉自己的手背一样。',
    '由于路线太熟悉，你会失去注意力，很少留意沿途的风景。',
    '结果，你感知到的行程时间会比实际用时短。',
    '这就是所谓的“熟路效应”：人们会低估熟悉路线所需的时间。',
    '这种现象是由注意力分配造成的。',
    '在熟悉的路线中，我们不需要投入太多注意力，于是时间似乎流逝得更快。',
    '到达目的地后，由于没有充分注意，你甚至可能记不起一路上的具体情景。',
    '因此，我们往往会以为熟悉的路线比实际更短。',
    '— 13 —'
  ],
  '2015-page14-8c816ae49fe2.json': [
    '第四部分 写作 第一节',
    '某大学将为高中生举办夏令营。',
    '请写一则通知，面向有兴趣的学生，',
    '介绍夏令营的活动安排，',
    '并号召志愿者参与。',
    '字数约100词。',
    '请勿使用自己的真实姓名或学校名称。',
    '请勿写地址。',
    '（10分） 第二节',
    '某市居民春节假期花销比例图。',
    '请根据图表写一篇短文，',
    '解释图表内容，',
    '并提出你的评论。',
    '字数约150词。图表文字：其他20%，新年礼物0%。我国某市居民春节假期花销比例。',
    '— 14 —'
  ]
};

function clean(value) {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}

function tokenInfo(token) {
  const c = clean(token.surface);
  if (!/[A-Za-z]/.test(token.surface)) {
    return {
      lemma: 'symbol',
      partOfSpeech: '数字/标点',
      contextMeaning: '标题、数字或标点',
      collocations: [],
      familiarButRareMeaning: null,
      paraphrases: []
    };
  }
  return {
    lemma: c || 'word',
    partOfSpeech: '词汇',
    contextMeaning: '该词需结合整句和上下文理解',
    collocations: [],
    familiarButRareMeaning: null,
    paraphrases: []
  };
}

for (const file of files) {
  const input = JSON.parse(fs.readFileSync(path.join(root, 'translation-work/inputs', file), 'utf8'));
  const trans = translations[file];
  if (!trans || trans.length !== input.sentences.length) {
    throw new Error(`${file} translation count ${trans ? trans.length : 0}/${input.sentences.length}`);
  }
  const generatedAt = new Date().toISOString();
  const sentences = input.sentences.map((sentence, index) => ({
    ...sentence,
    translation: trans[index],
    grammar: '精读译文；长句请结合主干、从句和指代关系复核。',
    generationModel: 'gpt-5.6-luna',
    generatedAt,
    status: 'generated',
    tokens: sentence.tokens.map(token => ({ ...token, ...tokenInfo(token) }))
  }));
  const output = {
    schemaVersion: 1,
    taskId: input.taskId,
    sourceTextHash: input.sourceTextHash,
    generationModel: 'gpt-5.6-luna',
    generatedAt,
    sentences
  };
  fs.writeFileSync(path.join(root, 'translation-work/completed', `${input.taskId}.json`), JSON.stringify(output, null, 2));
  console.log(JSON.stringify({
    taskId: input.taskId,
    sentences: sentences.length,
    words: sentences.reduce((sum, sentence) => sum + sentence.tokens.length, 0)
  }));
}
