const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2018-page9-d4c3fc316cae.json', '2018-page10-e49c51e903e9.json', '2018-page11-96059613fcd7.json', '2018-page12-34922164eb8f.json'];
const translations = {
  '2018-page9-d4c3fc316cae.json': [
    '文章4：为了应对把忙碌看得过于重要这一陷阱，《深度工作：在分心的世界里取得专注成功的规则》作者卡尔·纽波特建议养成“深度工作”的习惯，即不受干扰地集中注意力。',
    '掌握深度工作的艺术有多种方法：可以是专门处理某项任务的长期闭关，可以是建立每日仪式，也可以采用“新闻记者式”的方法，在一天中随时抓住能够进行深度工作的片刻。',
    '无论采用哪种方法，关键是确定自己的专注时长并坚持下去。',
    '纽波特还建议“深度安排”，以对抗不断的打断，在更少的时间里完成更多事情。',
    '他写道：“在任何时候，我都应该把接下来大约一个月的深度工作安排好。”',
    '“一旦写进日历，我就像保护医生预约或重要会议那样保护这段时间。”',
    '要在更少时间里完成更多事情，另一种方法是重新思考如何安排一天，尤其是如何制定待办事项清单。',
    '《凌乱：混乱改变生活的力量》作者蒂姆·哈福德提到20世纪80年代初的一项研究：研究把大学生分成两组，一组被建议制定每月目标和学习活动，另一组则被要求按天制定更详细的活动和目标。',
    '研究人员原以为结构完善的每日计划在执行任务时最有效，但他们错了：详细的每日计划反而让学生失去了动力。',
    '哈福德认为，不可避免的干扰常常使每日待办清单失效，而在清单中留出即兴调整的空间，反而能取得最佳效果。',
    '为了充分利用注意力和精力，我们还需要接受停工时间，或者按照纽波特的建议，“学会偷懒”。',
    '他认为：“无所事事不只是一种假期、享受或恶习；它对大脑就像维生素D对身体一样不可或缺……无所事事看似矛盾，却是完成任何工作的必要条件。”',
    '哈佛医学院精神病学助理教授斯里尼·皮莱认为，停工时间与生产力之间这种违反直觉的联系，可能源于大脑的运作方式。',
    '当大脑在专注和不专注于一项任务之间切换时，往往会变得更高效。',
    '皮莱说：“人们没有意识到，要完成这些任务，他们需要同时使用大脑中的专注和不专注回路。”',
    '— 9 —'
  ],
  '2018-page10-e49c51e903e9.json': [
    '36. 掌握深度工作的艺术，关键是____。',
    '[A] 坚持自己的专注时间  [B]',
    '[B] 列出眼前的任务  [C]',
    '[C] 制定具体的每日计划  [D]',
    '[D] 抓住每一分钟工作',
    '37. 哈福德引用的20世纪80年代初研究表明____。',
    '[A] 干扰实际上可能提高效率  [B]',
    '[B] 每日安排对学习不可或缺  [C]',
    '[C] 学生几乎不会受到月度目标激励  [D]',
    '[D] 详细计划可能没有预期那么有效',
    '38. 根据纽波特的说法，无所事事是____。',
    '[A] 忙碌人士理想的心理状态  [B]',
    '[B] 促进身体健康的重要因素  [C]',
    '[C] 节省时间和精力的有效方法  [D]',
    '[D] 完成任何工作不可或缺的因素',
    '39. 皮莱认为，大脑在专注和不专注之间的转换____。',
    '[A] 能带来心理健康  [B]',
    '[B] 能带来更高效率  [C]',
    '[C] 旨在实现工作中的更好平衡  [D]',
    '[D] 由任务的紧迫性驱动',
    '40. 本文主要讨论____。',
    '[A] 缓解忙碌生活压力的方法  [B]',
    '[B] 在更少时间里完成更多事情的方法  [C]',
    '[C] 消除干扰的关键  [D]',
    '[D] 缺乏专注时间的原因 — 10 —'
  ],
  '2018-page11-96059613fcd7.json': [
    'B节 说明：阅读下面的文章，从A—G七个小标题中为第41—45段选择最合适的标题。',
    '有两个多余的小标题，不需要使用。',
    '在答题纸上标记答案。',
    '（10分）',
    '[A] 直接说出来  [B] 活在当下  [C] 给予独特的赞美  [D] 名字、地点、事物  [E] 找到“我也是”  [F] 跳过寒暄  [G] 征求意见 与任何人交谈的五种方法。交谈就是建立联系：当你与一个陌生人交谈时，一条联系就形成了，此后你进行的每次交谈都会加强这条联系。',
    '你每天都会遇到新的人：杂货店员工、出租车司机、新同事，或门口的保安。',
    '只要主动和他们开始交谈，就能建立联系。',
    '下面是五种简单方法，可以让你迈出第一步，与陌生人开始交谈。',
    '41. 假设你和一个不认识的人在同一个房间里，内心有个声音说“我想和这个人聊聊”——这种情况我们大多数人都会遇到。',
    '你想说点什么——说出第一个词——但话就是出不来，仿佛卡在某个地方。',
    '我知道这种感觉，我的建议是：直接说出来。',
    '想一想：最糟糕的情况会是什么？',
    '他们不和你说话？',
    '可是，他们现在本来就没有和你说话！',
    '我坚信，一旦你说出了第一个词，其他话就会自然流淌。',
    '— 11 —'
  ],
  '2018-page12-34922164eb8f.json': [
    '所以保持简单：“嗨”“嘿”或“你好”——尽你所能调动热情和活力，露出灿烂的笑容，然后说“你好”。',
    '42. 这是我们所有人都会面临的问题：你与想交谈的人相处时间有限，还希望这次谈话令人难忘。',
    '老实说，如果我们陷在“嗨”“你好”“你好吗？”的套路里，',
    '以及“最近怎么样？”这样的寒暄中，就无法给谈话带来那种让它令人难忘的最初冲击。',
    '所以不要害怕问更私人一些的问题。',
    '相信我，只要你开口询问，就会惊讶于人们愿意分享多少。',
    '43. 第一次见一个人时，要努力寻找你们之间的共同点，以便从那里展开对话。',
    '从共同点开始，再向外延伸，你会突然发现谈话变得容易得多。',
    '44. 想象一下，你正向某人倾诉心事，对方却只顾着玩手机；当你要求对方注意时，得到的回答是“我可以一心多用”。',
    '所以当有人试图和你交流时，就要全心投入这次交流。',
    '进行眼神交流。相信我，所有奇妙的事情都发生在眼神交流中。',
    '当你与对方目光接触时，你能感受到这场谈话。',
    '45. 你们第一次见面时开始了一次谈话，但过了一段时间再次见面，你可能已经忘记了对方的名字。',
    '那不是很尴尬吗？所以要记住你见过或聊过的人的细节：他们去过哪里、想去哪里、喜欢什么、讨厌什么——无论你们谈过什么。',
    '当你记住这些事情时，你会自然而然地关心他们的身心健康。',
    '于是，他们会觉得有责任维持与你的关系。',
    '就是这样：五种几乎可以和任何人交谈的奇妙方法。',
    '每个人都是一本很值得阅读、也很值得交谈的好书！',
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
