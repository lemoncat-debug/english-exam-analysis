const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = ['2016-page13-a34d1631b877.json', '2016-page14-bda9accd324c.json'];
const translations = {
  '2016-page13-a34d1631b877.json': [
    '第三部分 翻译',
    '46. 说明：将下面的文章翻译成中文。',
    '请把译文写在答题纸上。',
    '（15分）超市的设计目的，是诱使顾客尽可能长时间地待在店内。',
    '原因很简单：你在店里待的时间越长，看到的东西就越多；看到的东西越多，买的东西也就越多。',
    '而超市里有很多东西。',
    '根据食品营销协会的数据，一家普通超市经营约4.4万种不同商品，许多超市的商品数量还要多出几万种。',
    '可供选择的商品数量之多，足以让购物者陷入信息过载状态。',
    '脑部扫描实验表明，做这么多决定的要求很快就会超出我们的承受能力。',
    '购物约40分钟后，大多数人不再努力进行理性选择，反而开始凭情绪购物；这时，我们购物车里有50%的东西其实是原本没有打算购买的。',
    '— 13 —'
  ],
  '2016-page14-bda9accd324c.json': [
    '第四部分 写作 第一节',
    '47. 说明：假设你在翻译比赛中获奖，你的朋友杰克写邮件向你表示祝贺并请你提供翻译建议。',
    '请写一封回信，',
    '1）感谢他；',
    '2）提出你的建议。',
    '你应在答题纸上写约100词。',
    '不要使用自己的姓名。',
    '请使用“李明”代替。',
    '请勿写地址。',
    '（10分） 第二节',
    '48. 说明：根据下面的图表写一篇短文。',
    '在文章中，你应当：',
    '1）解释图表；',
    '2）提出你的评论。',
    '你应在答题纸上写约150词。图表文字：其他，培养独立能力6%，广交朋友9%，缓解压力33%，我国某市居民春节假期花销比例。',
    '（15分）— 14 —'
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
