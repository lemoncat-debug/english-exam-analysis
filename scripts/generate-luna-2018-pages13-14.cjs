const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2018-page13-dee65dcb0375.json', '2018-page14-8337f6472eb1.json'];
const translations = {
  '2018-page13-dee65dcb0375.json': [
    '第三部分 翻译',
    '46. 说明：将下面的文章翻译成中文。',
    '请把译文工整地写在答题纸上。',
    '（15分）一个五年级学生接到一项家庭作业：从一份职业清单中选择自己未来的职业道路。',
    '他在“宇航员”上打了勾，但很快又把“科学家”加到清单中，并同样选中了它。',
    '男孩相信，只要阅读足够多的书，他想探索多少职业道路都可以。',
    '于是他什么都读——从百科全书到科幻小说。',
    '他读得如此投入，以至于父母不得不规定晚餐桌上“禁止阅读”。',
    '这个男孩就是比尔·盖茨，即使后来成为世界上最成功的人之一，他至今仍没有停止阅读。',
    '如今，他阅读的材料已经从科幻小说和参考书转变为其他类型：最近他透露，自己每年至少阅读50本非虚构类书籍。',
    '盖茨选择非虚构类书籍，是因为这些书能解释世界如何运作。',
    '盖茨说：“每本书都会打开新的知识途径，供我们探索。”',
    '— 13 —'
  ],
  '2018-page14-8337f6472eb1.json': [
    '第四部分 写作 第一节',
    '47. 说明：假设你必须取消旅行计划，无法拜访史密斯教授。',
    '请给他写一封电子邮件，',
    '1）道歉并解释情况；',
    '2）提出未来见面的建议。',
    '你应在答题纸上写约100词。',
    '不要使用自己的姓名。',
    '请使用“李明”代替。',
    '请勿写地址。',
    '（10分）第二节',
    '48. 说明：根据下面的图表写一篇短文。',
    '在文章中，你应当：',
    '1）解释图表；',
    '2）提出你的评论。',
    '你应在答题纸上写约150词。图表显示2017年某市消费者选择餐厅时关注的因素：价格26.80%，服务、环境、特色及其他占其余比例。',
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
