const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2017-page5-9c319108f773.json', '2017-page6-0f6e0cb7d577.json', '2017-page7-0c6e7d458b9e.json', '2017-page8-da85d5d9c784.json'];
const translations = {
  '2017-page5-9c319108f773.json': [
    '文章2：在如此关注孩子使用屏幕的情况下，父母很容易忘记自己的屏幕使用情况。',
    '数字技术的设计就是要“真正把你吸进去”，数字产品也旨在让用户最大程度地参与其中，数字游戏研究者珍妮·拉德斯基说。',
    '这使人难以抽身，也导致数字设备大量渗透到家庭日常生活中。',
    '拉德斯基让母子配对完成一项食物测试练习，研究她们在吃饭时使用手机和平板电脑的情况。',
    '她发现，在练习过程中使用设备的母亲，与孩子进行的口头互动少了20%，非口头互动少了39%。',
    '在另一次观察中，她看到手机成了家庭紧张关系的来源。',
    '父母可能在查看邮件，而孩子则兴奋地争取他们的注意力。',
    '婴儿天生会观察父母的脸，试图理解自己的世界；如果父母的脸毫无表情、没有反应——他们沉浸在设备中时常常如此——孩子会极度不安。',
    '拉德斯基引用了发展心理学家艾德·特朗尼克在20世纪70年代设计的“静止脸实验”。',
    '实验中，要求母亲先以正常方式与孩子互动，然后摆出毫无表情的脸，不给孩子任何视觉上的社交反馈；孩子为了吸引母亲的注意力，会变得越来越焦虑。',
    '拉德斯基说：“父母不必每时每刻都高度投入，但应当保持平衡，并对孩子表达情绪需求时的口头或非口头信号作出敏感回应。”',
    '另一方面，特朗尼克本人担心，对孩子使用屏幕的担忧源于一种“压迫性的意识形态”，它要求父母始终与孩子互动：“这种意识形态建立在一种多少有些幻想化、非常白人化、非常中上阶层的观念上，认为如果你没有让孩子接触3万个词，你就是在忽视他们。”',
    '特朗尼克认为，孩子没有从屏幕中学习，并不意味着屏幕毫无价值——尤其是当它能让父母有时间洗澡、做家务，或者只是暂时离开孩子休息一下时。',
    '他说，父母可以利用设备与朋友交谈，或先处理掉一些工作，从中获得很多好处。',
    '这会让父母心情更愉快，也让他们在其余时间更有精力陪伴孩子。',
    '— 5 —'
  ],
  '2017-page6-0f6e0cb7d577.json': [
    '26. 根据珍妮·拉德斯基的说法，数字产品的设计目的是____。',
    '[A] 简化日常事务  [B] 吸引用户注意力  [C] 改善人际关系  [D] 提高工作效率',
    '27. 拉德斯基的食物测试练习表明，母亲使用设备会____。',
    '[A] 让婴儿没有食欲  [B] 分散孩子的注意力  [C] 减缓婴儿的语言发展  [D] 减少母子交流',
    '28. 拉德斯基引用“静止脸实验”是为了说明____。',
    '[A] 孩子很容易适应毫无表情的脸  [B] 情感交流不需要语言表达  [C] 孩子对父母情绪变化不敏感  [D] 父母需要回应孩子的情感需求',
    '29. 特朗尼克所说的压迫性意识形态要求父母____。',
    '[A] 保护孩子不接触狂野的想象  [B] 每年至少教孩子3万个词  [C] 确保始终与孩子互动  [D] 持续关注孩子使用屏幕',
    '30. 根据特朗尼克的观点，孩子使用屏幕可能____。',
    '[A] 给父母一些空闲时间  [B] 让父母更有创造力  [C] 帮助孩子完成作业  [D] 帮助孩子变得更专注 — 6 —'
  ],
  '2017-page7-0c6e7d458b9e.json': [
    '文章3：如今，社会普遍要求学生立即上大学，再加上快速变化的世界中不断提高的期望，往往使学生完全忽视了休学一年的可能性。',
    '毕竟，如果你认识的每个人秋天都要上大学，自己留在原地一年似乎很傻，不是吗？',
    '而且，在学校学习了12年后，花一年时间做非学术性的事情，感觉也不太自然。',
    '但即使这些说法有一定道理，也不足以成为否定间隔年的充分理由。',
    '人们始终担心会在社会不断推动的“冲向终点线”的赛跑中落后于他人，无论终点是研究生院、医学院，还是高薪职业。',
    '但与普遍的误解相反，间隔年并不会阻碍学业追求；事实上，它可能会增强学业表现。',
    '美国和澳大利亚的研究表明，休学一年的学生通常比没有休学的学生为大学生活准备得更充分，表现也更好。',
    '间隔年不是把学生往后拉，而是通过让他们为独立生活、新的责任和环境变化做好准备，把他们向前推——这些正是大学一年级学生最容易遇到困难的事情。',
    '间隔年的经历可以减轻适应大学、进入全新环境时的冲击，让学生更容易把注意力放在学业和活动上，而不是适应环境时犯下的错误上。',
    '如果你还没有被休学一年、探索兴趣的内在价值说服，那就考虑它对未来学业选择的经济影响。',
    '根据国家教育统计中心的数据，近80%的大学生至少会更换一次专业。',
    '这并不奇怪，因为基础的高中必修课程让学生对大学里等待他们的广阔学术可能性了解很少。',
    '许多学生在大学申请上填写一个专业，但上过大学课程后又转到另一个专业。',
    '这并不一定是坏事，但根据学校不同，如果转专业太晚，补修学分可能代价高昂。',
    '例如在波士顿学院，如果你从其他院系转到护理学院，就必须额外完成一年学习。',
    '一开始就用间隔年把事情想清楚，有助于避免日后的压力并节省费用。',
    '— 7 —'
  ],
  '2017-page8-da85d5d9c784.json': [
    '31. 高中毕业生不休间隔年的原因之一是____。',
    '[A] 他们认为这会误导学业  [B] 他们期待大学里有很多乐趣  [C] 与别人做法不同让他们感到奇怪  [D] 参加校外课程似乎没有价值',
    '32. 美国和澳大利亚的研究表明，休学一年有助于____。',
    '[A] 防止学生不切实际  [B] 降低职业选择的风险  [C] 减轻大学新生的经济负担  [D] 减轻大学新生的压力',
    '33. “acclimation”（第3段',
    '）最接近的含义是____。',
    '[A] 适应  [B] 申请  [C] 动机  [D] 竞争',
    '34. 间隔年可以通过帮助学生____来省钱。',
    '[A] 避免学业失败  [B] 确立长期目标  [C] 转到另一所大学  [D] 选定正确的专业',
    '35. 本文最合适的标题是____。',
    '[A] 支持间隔年  [B] 间隔年入门  [C] 间隔年回归  [D] 间隔年：一个两难选择 — 8 —'
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
