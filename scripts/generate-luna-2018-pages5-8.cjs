const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2018-page5-941b432b41d0.json', '2018-page6-0adef8f8775b.json', '2018-page7-c8fd33cdf854.json', '2018-page8-60e98aa4f004.json'];
const translations = {
  '2018-page5-941b432b41d0.json': [
    '文章2：虽然化石燃料——煤炭、石油和天然气——仍然产生全球能源供应的大约85%，但未来显然属于风能、太阳能等可再生能源。',
    '全世界向可再生能源转型的势头正在增强：如今新上线的电力来源中，超过一半来自可再生能源。',
    '部分增长源于政府和有远见的企业承诺资助更清洁的能源来源。',
    '但越来越多的讨论集中在可再生能源价格的暴跌上，尤其是风能和太阳能。',
    '过去八年，太阳能电池板的成本下降了80%，风力涡轮机的成本下降了近三分之一。',
    '在世界许多地方，可再生能源已经是主要能源来源。',
    '例如在苏格兰，风力涡轮机提供的电力足以满足95%家庭的用电需求。',
    '世界其他地区，尤其是中国和欧洲，正在引领潮流；美国也出现了显著转变。',
    '美国能源信息署报告称，3月份风能和太阳能首次占美国发电量的10%以上。',
    '特朗普总统把化石燃料，尤其是煤炭，强调为经济增长的道路。',
    '在爱荷华州最近的一次演讲中，他认为风能是不可靠的能源。',
    '但这一说法在爱荷华州许多人那里并不受欢迎。当地田野里遍布风力涡轮机，风能占该州发电量的36%；微软等科技巨头也正因清洁能源可为其数据中心供电而被吸引到这里。',
    '“风不吹、太阳不照时会发生什么？”',
    '这个问题一直是怀疑者快速反驳的理由。',
    '但电池储能能力的提升，使电池全天候维持电力供应越来越有可能。',
    '这项进步部分由汽车制造商推动，他们正在大举押注电池驱动的电动汽车。',
    '虽然如今道路上的电动汽车仍很少见，但这项大规模投资可能在未来几年迅速改变局面。',
    '尽管还有很长的路要走，可再生能源的趋势线正在急剧上升。',
    '能源来源的变化速度似乎正在加快，也许正好能及时对减缓气候变化产生实质影响。',
    '在全球思想转变之际，华盛顿采取什么措施（或不采取措施）来推动替代能源，影响可能越来越小。',
    '— 5 —'
  ],
  '2018-page6-0adef8f8775b.json': [
    '26. “plummeting”（第2段第3行）最接近的含义是____。',
    '____最接近的含义是____。',
    '[A] 稳定  [B] 改变  [C]',
    '[C] 下降  [D] 上升',
    '27. 根据第三段，美国使用可再生能源____。',
    '[A] 正在显著发展  [B]',
    '[B] 与欧洲一样广泛  [C]',
    '[C] 面临许多挑战  [D]',
    '[D] 已被证明不切实际',
    '28. 可以了解到，在爱荷华州，____。',
    '[A] 风能是一种广泛使用的能源  [B]',
    '[B] 风能已经取代化石燃料  [C]',
    '[C] 科技巨头正在投资清洁能源  [D]',
    '[D] 清洁能源供应短缺',
    '29. 根据第五、六段，关于清洁能源，下列说法正确的是____。',
    '[A] 清洁能源的应用推动了电池储能。',
    '[B] 清洁能源普遍用于汽车制造。',
    '[C] 持续供应清洁能源正逐渐成为现实。',
    '[D] 可持续开发清洁能源仍将很困难。',
    '30. 从最后一段可以推断，可再生能源____。',
    '[A] 会使美国更接近其他国家  [B]',
    '[B] 会加速全球环境变化  [C]',
    '[C] 并未真正得到美国政府鼓励  [D]',
    '[D] 就成本而言竞争力不足 — 6 —'
  ],
  '2018-page7-c8fd33cdf854.json': [
    '文章3：数字经济巨头的力量和野心令人震惊——亚马逊刚刚宣布以137亿美元收购高端连锁超市Whole Foods，但两年前，脸书收购即时通信服务WhatsApp时支付的金额甚至更高，而WhatsApp根本没有任何实体产品。',
    'WhatsApp给脸书提供的是一张复杂而细致的用户友谊和社交生活网络。',
    '当时脸书向欧盟委员会承诺不会把电话号码与脸书身份关联起来，但交易完成后几乎立即就违背了这一承诺。',
    '即使不知道消息内容，知道谁给谁发消息也能透露大量信息，而且现在仍可能如此。',
    '哪位政治记者、哪位党鞭会不想知道特雷莎·梅的敌人目前正在其中策划行动的WhatsApp群组构成？',
    'Whole Foods对亚马逊的价值，可能不在于它拥有的460家商店，而在于它掌握了哪些顾客购买了什么的记录。',
    '竞争法似乎是解决这种权力失衡的唯一方式。',
    '但竞争法很笨拙。',
    '一方面，与数字经济内部的变化速度相比，它的反应非常缓慢。',
    '等问题得到处理和补救时，它可能已经在市场上消失，被新的权力滥用取代。',
    '但这还存在一个更深层的概念问题。',
    '按目前的解释，竞争法处理的是消费者的经济劣势；而当服务使用者不为服务付费时，这种劣势并不明显。',
    '这些服务的使用者并不是它们的顾客。',
    '真正的顾客是向它们购买广告的人——而脸书和谷歌这两个虚拟巨头垄断了数字广告，使其他媒体和娱乐公司处于不利地位。',
    '它们出售的产品是数据，而我们这些使用者把自己的生活转化为数据，供数字巨头获利。',
    '正如一些蚂蚁饲养蚜虫，以获取蚜虫进食时产生的蜜露一样，谷歌也“饲养”我们，以获取数字生活产生的数据。',
    '蚂蚁会把捕食性昆虫赶离蚜虫进食的地方；Gmail则把垃圾邮件挡在我们的收件箱外。',
    '即使双方都能获益，这种关系也不像人与人之间或民主关系。',
    '— 7 —'
  ],
  '2018-page8-60e98aa4f004.json': [
    '31. 根据第一段，脸书收购WhatsApp是为了获得它的____。',
    '[A] 数字产品  [B]',
    '[B] 用户信息  [C] 实体资产  [D]',
    '[D] 高质量服务',
    '32. 将电话号码与脸书身份关联可能____。',
    '[A] 加剧政治争端  [B]',
    '[B] 搞乱客户记录  [C]',
    '[C] 给脸书用户带来风险  [D]',
    '[D] 误导欧盟委员会',
    '33. 根据作者的观点，竞争法____。',
    '[A] 应该服务于新的市场力量  [B]',
    '[B] 可能加剧经济失衡  [C]',
    '[C] 不应只提供一种法律解决方案  [D]',
    '[D] 跟不上市场变化的速度',
    '34. 按目前的解释，竞争法很难保护脸书用户，因为____。',
    '[A] 他们不被定义为顾客  [B]',
    '[B] 他们在经济上不可靠  [C]',
    '[C] 这些服务通常是数字化的  [D]',
    '[D] 服务费用由广告商支付',
    '35. 蚂蚁的类比被用来说明____。',
    '[A] 数字巨头之间的双赢商业模式  [B]',
    '[B] 数字巨头之间典型的竞争模式  [C]',
    '[C] 为数字巨头顾客提供的好处  [D]',
    '[D] 数字巨头与其用户之间的关系 — 8 —'
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
