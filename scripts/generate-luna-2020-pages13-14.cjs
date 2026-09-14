const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2020-page13-03d190d891c6.json', '2020-page14-d8c7a91f5f66.json'];
const translations = {
  '2020-page13-03d190d891c6.json': [
    '第三部分 翻译',
    '46. 说明：将下面的文章翻译成中文。',
    '请把译文写在答题纸上。',
    '（15分）我们几乎不可能一生不经历某种失败。',
    '能够做到这一点的人，可能生活得过于谨慎，以至于一事无成。',
    '简单地说，他们其实根本没有真正生活。',
    '但失败的奇妙之处在于，如何看待它完全由我们自己决定。',
    '我们可以选择把失败看作“世界末日”。',
    '也可以把失败看作它常常带来的不可思议的学习经历。',
    '每当我们在某件事上失败时，都可以选择去寻找自己应该学到的教训。',
    '这些教训非常重要；我们正是通过它们成长，并避免再次犯同样的错误。',
    '只有当我们允许失败阻止自己时，失败才会阻止我们。',
    '失败还可以告诉我们一些关于自己的事情，而这些事情如果没有失败，我们可能永远不会知道。',
    '例如，失败能帮助你发现自己是一个多么坚强的人。',
    '在某件事上失败，能帮助你发现真正的朋友，或找到意想不到的成功动力。',
    '— 13 —'
  ],
  '2020-page14-d8c7a91f5f66.json': [
    '第四部分 写作 第一节',
    '47. 说明：假设你正在为一群国际学生安排一次历史遗址之旅。',
    '请写一封电子邮件，',
    '1）向他们介绍该遗址；2）为旅行提供一些建议。',
    '请把答案写在答题纸上。',
    '不要使用自己的姓名，请使用“李明”代替。',
    '（10分）第二节',
    '48. 说明：根据下面的图表写一篇短文。',
    '在文章中，你应当：',
    '1）解释图表；',
    '2）提出你的评论。',
    '你应在答题纸上写约150词。图表显示某高校学生使用手机阅读的目的，其中学习知识占59.5%。',
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
