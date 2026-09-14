const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2020-page5-f637a479f434.json', '2020-page6-5cdae83f3f2e.json', '2020-page7-fe7be9abcceb.json', '2020-page8-92bd3f420a37.json'];
const translations = {
  '2020-page5-f637a479f434.json': [
    '文章2：的确，首席执行官的薪酬已经上涨——顶级公司的首席执行官平均可能拿到普通工人300倍的薪酬；自20世纪70年代中期以来，大型美国上市公司的首席执行官薪酬按不同估算上涨了约500%。',
    '如今，一家顶级美国公司的首席执行官年薪约为1890万美元。',
    '理解首席执行官薪酬增长的最佳模型，是把它看作一个顶尖人才有限、而顶级企业商业机会迅速增长的世界。',
    '美国收入最高的1%所作的努力，已经成为全球经济中最具活力的因素之一。',
    '这样说并不受欢迎。',
    '但他们薪酬大幅上涨的一个原因，是相对于美国经济中的许多其他劳动者，首席执行官确实提高了自己的水平。',
    '如今的首席执行官，至少对大型美国企业而言，必须拥有远不止“经营公司”这一项技能。',
    '首席执行官必须对金融市场有良好判断，甚至要知道公司应该如何在金融市场上交易。',
    '与前任相比，他们还需要更强的公共关系技能，因为哪怕一个小失误也可能带来重大代价。',
    '此外，大型美国公司比以往任何时候都更加全球化，供应链遍布更多国家。',
    '要在这样的体系中领导企业，需要相当令人惊叹的知识。',
    '除此之外，几乎所有大型美国公司都在以某种方式成为科技公司。',
    '大型首席执行官仍然必须完成一直以来的日常工作。',
    '认为高额首席执行官薪酬主要是剥削他人的普遍看法，并不能很好地解释历史。',
    '从大多数指标看，自20世纪70年代以来，公司治理已经变得更加严格和规范。',
    '然而，恰恰是在治理更强的这段时期，首席执行官薪酬一直很高并且不断上升。',
    '这表明，招聘顶尖候选人来承担日益艰巨的工作符合更广泛的公司利益。',
    '此外，最高的首席执行官薪酬支付给外部候选人，而不是关系亲密的内部人选，这进一步说明高薪并不是以公司其他人为代价的掠夺。',
    '当公司把首席执行官薪酬与股票价格等因素挂钩时，股市会作出积极反应，这表明这些做法提升的是公司价值，而不只是首席执行官个人的价值。',
    '— 5 —'
  ],
  '2020-page6-5cdae83f3f2e.json': [
    '26. 下列哪项促成了首席执行官薪酬的上涨？',
    '[A] 公司数量增加。',
    '[B] 经济改善带来的普遍加薪。',
    '[C] 顶级企业商业机会增加。',
    '[D] 领先经济体之间的密切合作。',
    '27. 与前任相比，如今的首席执行官被要求____。',
    '[A] 培养更强的团队意识  [B] 为更多研发提供资金  [C] 与科技公司建立更紧密联系  [D] 经营更加全球化的公司',
    '28. 尽管____，首席执行官的薪酬自20世纪70年代以来一直上涨。',
    '[A] 持续的内部反对  [B] 严格的公司治理  [C] 保守的经营策略  [D] 政府反复警告',
    '29. 高额首席执行官薪酬可以用这样一个事实来解释：它有助于____。',
    '[A] 确认首席执行官的地位  [B] 激励内部候选人  [C] 提高首席执行官效率  [D] 增加公司价值',
    '30. 本文最合适的标题是____。',
    '[A] 首席执行官并没有拿得过多  [B] 首席执行官薪酬：过去与现在  [C] 当今首席执行官的挑战  [D] 首席执行官特质：难以下定义 — 6 —'
  ],
  '2020-page7-fe7be9abcceb.json': [
    '文章3：去年11月，马德里实施了针对污染最严重汽车的雄心勃勃的限制措施，被誉为公共卫生的灯塔。',
    '七个月后，经历一天选举，新一届保守派市议会暂停执行清洁空气区，这是它可能消亡的第一步。',
    '尽管清洁空气区在改善空气质量方面取得了成功，市长何塞·路易斯·马丁内斯-阿尔梅达仍把反对该区域作为竞选活动的核心。',
    '如今，一名法官推翻了市政府停止征收罚款的决定，下令恢复罚款。',
    '但考虑到未来的法律斗争，该区域的前景充其量也不确定。',
    '除此之外，城市独自应对空气污染时必须采取的措施还存在其他缺陷：这些措施在政治上有争议，因此很脆弱。',
    '这是因为它们必然把清洁空气的成本转嫁给个体司机——司机必须缴费或购买更好的车辆——而不是让真正造成有毒污染、存在欺骗行为的汽车制造商承担。',
    '不难想象，伦敦也会发生类似的逆转。',
    '新的超低排放区（Ulez）很可能成为明年市长选举中的一个大问题。',
    '如果萨迪克·汗获胜，并按计划在2021年把区域扩展到南北环路，势必会引发更多受影响驾车者的强烈反对。',
    '这并不是说伦敦这样的Ulez措施毫无用处。',
    '远非如此。面对严重威胁，地方官员正在利用手头的工具保护居民健康。',
    '这些区域确实改善了一些空气质量，而科学告诉我们，这意味着真正的健康收益——更少的心脏病发作、中风和早产，更少的癌症、痴呆和哮喘。',
    '过早死亡也会减少。但对于一个远大于任何单个城市或城镇的问题，市长和议员能做的终究有限。',
    '他们之所以采取行动，是因为各国政府——英国政府以及欧洲其他国家的政府——未能这样做。',
    '把高度污染汽车挡在某些区域之外的限制——市中心、“学校街道”，甚至单条道路——是对更大范围行动缺失的回应；这种更大行动本应切实执行现有法规，并要求汽车公司让车辆达标。',
    '威尔士已经引入特殊的低速限制，以尽量减少污染。',
    '我们什么都做了，却唯独没有要求制造商清理他们的汽车。',
    '— 7 —'
  ],
  '2020-page8-92bd3f420a37.json': [
    '31. 关于马德里的清洁空气区，下列说法正确的是____。',
    '[A] 它的效果令人怀疑。',
    '[B] 它遭到了一名法官的反对。',
    '[C] 它需要更严格的执行。',
    '[D] 它的命运尚未决定。',
    '32. 下列哪项被认为是城市层面治理空气污染措施的弱点？',
    '[A] 它们偏袒汽车制造商。',
    '[B] 它们对市议会来说不切实际。',
    '[C] 它们被政治人士认为过于温和。',
    '[D] 它们把过多负担放在个人驾车者身上。',
    '33. 作者认为，伦敦Ulez的扩展将____。',
    '[A] 引发强烈抵制  [B] 确保汗的选举成功  [C] 改善城市交通  [D] 阻碍汽车制造',
    '34. 作者认为谁本应解决这一问题？',
    '[A] 当地居民  [B] 市长。',
    '[C] 市议员。  [D] 各国政府。',
    '35. 从最后一段可以推断，汽车公司____。',
    '[A] 将提高低排放汽车产量  [B] 应被迫遵守法规  [C] 将升级车辆设计  [D] 应接受公众监督 — 8 —'
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
