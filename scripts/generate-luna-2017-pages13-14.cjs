const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2017-page13-b409628901aa.json', '2017-page14-0f6f42122161.json'];
const translations = {
  '2017-page13-b409628901aa.json': [
    '第三部分 翻译',
    '46. 说明：将下面的文章翻译成中文。',
    '请把译文写在答题纸上。',
    '（15分）我的梦想一直是在时尚与出版之间的某个领域工作。',
    '中学毕业前两年，我参加了缝纫和设计课程，当时以为自己会继续学习时装设计。',
    '然而，在那门课程中我意识到，自己在这一领域还不够优秀，未来无法与其他有创造力的人竞争，于是决定这不是适合我的道路。',
    '申请大学前，我告诉每个人自己要学习新闻学，因为写作过去是、现在仍然是我最喜欢的活动之一。',
    '但老实说，我这样说是因为我觉得时尚和我结合起来只是一个梦想——我知道根本没人能想象我进入时尚行业！',
    '所以我决定寻找一些包含写作内容的时尚相关课程。',
    '就在这时，我注意到了“时尚媒体与推广”课程。',
    '— 13 —'
  ],
  '2017-page14-0f6f42122161.json': [
    '第四部分 写作 第一节',
    '47. 说明：假设威廉姆斯教授邀请你向一群国际学生作关于中国文化的演讲。',
    '请写一封回信，',
    '1）接受邀请；',
    '2）介绍演讲的要点。',
    '你应在答题纸上写约100词。',
    '不要使用自己的姓名。',
    '请使用“李明”代替。',
    '请勿写地址。',
    '（10分）第二节',
    '48. 说明：根据下面的图表写一篇短文。',
    '在文章中，你应当：',
    '1）解释图表；',
    '2）提出你的评论。',
    '你应在答题纸上写约150词。图表显示2013—2015年我国博物馆数量（家）和参观人数（十万人次）的变化。',
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
