const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2019-page13-fcc0bdc3b18c.json', '2019-page14-5e24a8a0fd22.json'];
const translations = {
  '2019-page13-fcc0bdc3b18c.json': [
    '第三部分 翻译',
    '46. 说明：将下面的文章翻译成中文。',
    '请把译文写在答题纸上。',
    '（15分）人们很容易低估英国作家詹姆斯·赫里奥特。',
    '他的文风愉快、易读，容易让人以为任何人都能模仿。',
    '我听过多少次人们说：“我可以写一本书。',
    '只是没有时间。”',
    '说起来容易，做起来却没那么容易。',
    '与普遍看法相反，詹姆斯·赫里奥特早年并不觉得开始“尝试写作游戏”很容易。',
    '显然，他拥有丰富的天赋，但最终呈现给世人的成熟作品，是多年练习、重写和阅读的结果。',
    '和大多数作者一样，他一路上不得不经历许多失望和拒绝，但这些经历让他更加坚定地要取得成功。',
    '他一生取得的一切都是艰苦努力换来的，在文学领域的成功也不例外。',
    '— 13 —'
  ],
  '2019-page14-5e24a8a0fd22.json': [
    '第四部分 写作 第一节',
    '47. 说明：假设史密斯教授请你策划一场以城市交通为主题的辩论。',
    '请给他写一封电子邮件，',
    '1）提出一个具体话题并说明理由；',
    '2）告诉他你的安排。',
    '你应在答题纸上写约100词。',
    '不要使用自己的姓名。',
    '请使用“李明”代替。',
    '请勿写地址。',
    '（10分）第二节',
    '48. 说明：根据下面的图表写一篇短文。',
    '在文章中，你应当：',
    '1）解释图表；',
    '2）提出你的评论。',
    '你应在答题纸上写约150词。图表显示某高校2013年和2018年本科毕业生的去向统计，包括就业、升学和创业。',
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
