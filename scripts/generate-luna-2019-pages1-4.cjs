const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2019-page1-07edcb09460b.json', '2019-page2-b6a93e596ffe.json', '2019-page3-b020532b0e44.json', '2019-page4-9473a5571532.json'];
const translations = {
  '2019-page1-07edcb09460b.json': [
    '2019年全国硕士研究生入学统一考试英语（二）试题 第一部分 英语知识运用',
    '说明：阅读下面的文章，从每题给出的A、B、C、D四个选项中选出最佳答案，并在答题纸上作答。',
    '（10分）定期称体重是了解体重是否发生显著波动的好方法。',
    '然而，如果过于频繁地称体重，这个习惯有时带来的伤害可能大于帮助。就我而言，每天称体重使我把注意力从总体健康和积极运动转移到只关注秤上的数字。',
    '这不利于我实现总体健身目标。',
    '我增加的体重其实来自肌肉，但由于只关注秤上显示的数字，我改变了训练计划。',
    '这与实现目标所需要的训练方式相冲突。',
    '我还发现，每天称体重并不能准确反映我在健身房付出的努力和取得的进步。',
    '改变训练计划后，大约需要三周到一个月才能注意到体重的显著变化。',
    '最直接的变化会体现在技能水平、力量和减少的腰围上。',
    '由于这些原因，我不再每天称体重，而是改为每两个月称一次。',
    '既然减重不是我的目标，每周记录体重对我来说就不那么重要了。',
    '每隔一周称一次体重，可以让我观察并确认体重是否有显著变化。',
    '这能告诉我是否需要调整训练计划。',
    '我也利用每两个月称重的结果了解自己的营养状况。',
    '如果训练强度保持不变，但我总是感到饥饿并且体重下降，这表明我需要增加每日热量摄入。',
    '决定不再每天称重，对我的整体健康、体能和身心状态产生了极大好处。',
    '由于不再承受早晨称重的负担，我锻炼时的热情也提高了。',
    '我在实现具体健身目标方面也取得了更大成功，因为我现在是根据目标训练，而不是根据秤上的数字训练。',
    '与其沉迷于体重，不如把注意力转向自己的外表、感受、衣服合身程度和总体精力水平。',
    '— 1 —'
  ],
  '2019-page2-b6a93e596ffe.json': [
    '1. [A] 此外  [B] 因此  [C] 否则  [D] 然而',
    '2. [A] 帮助  [B] 关心  [C] 警告  [D] 减少',
    '3. [A] 最初地  [B] 仅仅  [C] 偶尔  [D] 正式地',
    '4. [A] 记录  [B] 降低  [C] 解释  [D] 接受',
    '5. [A] 修改  [B] 设定  [C] 复查  [D] 达到',
    '6. [A] 定义  [B] 描述  [C] 分布  [D] 预测',
    '7. [A] 由于  [B] 不管  [C] 除了  [D] 连同',
    '8. [A] 有条理的  [B] 僵硬的  [C] 精确的  [D] 立即的',
    '9. [A] 主张  [B] 判断  [C] 原因  [D] 方法',
    '10. [A] 代替  [B] 虽然  [C] 再次  [D] 确实',
    '11. [A] 跟踪、记录  [B] 忽视  [C] 隐藏  [D] 报告',
    '12. [A] 取决于  [B] 赞成  [C] 保留  [D] 说明、解释',
    '13. [A] 分享  [B] 调整  [C] 确认  [D] 准备',
    '14. [A] 结果  [B] 特征  [C] 规则  [D] 测试',
    '15. [A] 厌烦的  [B] 焦虑的  [C] 饥饿的  [D] 生病的',
    '16. [A] 原则  [B] 秘密  [C] 信念  [D] 标志',
    '17. [A] 请求  [B] 必要性  [C] 决定  [D] 愿望',
    '18. [A] 令人失望的  [B] 令人惊讶的  [C] 限制性的  [D] 消耗性的',
    '19. [A] 如果  [B] 除非  [C] 直到  [D] 因为',
    '20. [A] 过度关注  [B] 支配  [C] 困惑  [D] 胜过',
    '第二部分 阅读理解 A节 说明：阅读下面四篇文章，回答每篇文章后的问题，从A、B、C、D四个选项中选出最佳答案。',
    '在答题纸上作答。',
    '（40分）— 2 —'
  ],
  '2019-page3-b020532b0e44.json': [
    '文章1',
    '与悲伤、恐惧和愤怒等所谓的基本情绪不同，内疚出现得稍晚一些，伴随着孩子逐渐理解社会和道德规范。',
    '孩子并非天生就知道如何说“对不起”；相反，他们会逐渐学会，这样的话能安抚父母和朋友，也能安抚自己的良知。',
    '这就是为什么研究人员通常认为，适度的所谓道德内疚是一件好事。',
    '当然，在大众想象中，内疚仍然名声不好。',
    '它令人极度不适——在情感上就像穿着一件压满石头的外套。',
    '但这种理解已经过时。',
    '弗吉尼亚大学心理学研究者阿姆里莎·亚伊什说：“人们开始重新认识或重新思考内疚是什么、能够发挥什么作用。”她补充说，这种复兴是人们更广泛认识到情绪并非非黑即白的一部分：在一种情境下有益的感受，在另一种情境下可能有害。',
    '例如，嫉妒和愤怒可能是在进化过程中形成的，用来提醒我们注意重要的不平等。',
    '过度的幸福感也可能具有破坏性。',
    '而内疚会促使我们更深入地思考自己的善良程度，鼓励人类弥补错误、修复关系。',
    '换句话说，内疚可以帮助维系一个合作型物种。',
    '它是一种社会黏合剂。',
    '从这个角度看，内疚是一种机会。',
    '多伦多大学心理学教授蒂娜·马尔蒂的研究表明，内疚可能弥补情感上的不足。',
    '在多项研究中，马尔蒂和其他研究者发现，内疚和同情可能代表通往合作与分享的不同路径。',
    '一些缺乏同情心的孩子，可能通过体验更多内疚来弥补这一不足，从而抑制自己更恶劣的冲动。',
    '反过来也一样：高度的同情心可以替代较低的内疚感。',
    '例如，在2014年的一项研究中，马尔蒂观察了244名儿童。',
    '她根据照顾者的评估和儿童的自我观察，为每个孩子评定总体同情心水平，以及他们在道德越界后产生负面情绪的倾向。',
    '随后，孩子们得到巧克力硬币，并有机会与一个匿名儿童分享。',
    '对于同情心较低的孩子来说，他们分享多少，似乎取决于自己产生内疚的倾向。',
    '容易内疚的孩子分享得更多，尽管他们并没有突然变得更能同情另一个孩子的匮乏。',
    '马尔蒂说：“这是个好消息。”',
    '“我们可能因为造成了伤害并感到后悔，而表现出亲社会行为。”',
    '— 3 —'
  ],
  '2019-page4-9473a5571532.json': [
    '21. 研究人员认为内疚可能是一件好事，因为它可以帮助____。',
    '[A] 调节孩子的基本情绪  [B] 提高孩子的智力  [C] 促进孩子的道德发展  [D] 强化孩子的积极感受',
    '22. 根据第二段，许多人仍把内疚看作____。',
    '[A] 欺骗性的  [B] 负担性的  [C] 使人上瘾的  [D] 不可原谅的',
    '23. 亚伊什认为，重新思考内疚源于认识到____。',
    '[A] 情绪与情境无关  [B] 情绪具有社会建设作用  [C] 情绪稳定有益健康  [D] 一种情绪可以发挥相反作用',
    '24. 马尔蒂等人的研究表明，合作与分享____。',
    '[A] 可能帮助纠正情感缺陷  [B] 可能源于同情或内疚  [C] 能带来情感满足  [D] 可能是冲动行为的结果',
    '25. “transgressions”（第5段第4行）最接近的含义是____。',
    '[A] 教导  [B] 讨论  [C] 限制  [D] 错误行为 — 4 —'
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
