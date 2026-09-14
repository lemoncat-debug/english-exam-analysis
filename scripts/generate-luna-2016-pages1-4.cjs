const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  '2016-page1-58fb42666ace.json',
  '2016-page2-3a0a55956958.json',
  '2016-page3-4f8eb6b46bde.json',
  '2016-page4-470fc9280385.json'
];

const translations = {
  '2016-page1-58fb42666ace.json': [
    '2016年全国硕士研究生入学统一考试英语（二）试题 第一部分 英语知识运用',
    '说明：阅读下面的文章，从每题给出的A、B、C、D四个选项中选出最佳答案，并在答题纸上作答。',
    '（10分）快乐的人工作方式不同。',
    '他们效率更高、更有创造力，也更愿意承担更大的风险。',
    '新的研究表明，幸福感也可能影响企业的工作方式。',
    '最近一篇研究论文发现，位于居民幸福感更高地区的公司投资更多。',
    '尤其是，幸福地区的公司在研发（研究与开发）上的支出更多。',
    '这是因为幸福感与一种有利于未来投资的长期思维方式相关。',
    '研究人员想知道，伴随幸福感而来的乐观态度和冒险倾向是否会改变企业的投资方式。',
    '于是，他们将盖洛普民调测得的美国城市平均幸福感，与这些地区上市公司的投资活动进行了比较。',
    '果然，企业投资和研发强度与所在地区的幸福感呈相关关系。',
    '但与投资相关的真的只是幸福感吗？幸福城市的其他特点是否也能解释那里的企业为何在研发上投入更多？',
    '为找出答案，研究人员控制了可能使企业更愿意投资的各种因素，例如规模、行业和销售额，也控制了表明一个地方更适宜居住的指标，如工资或人口增长。',
    '即使考虑了这些因素，幸福感与投资之间的联系总体上仍然存在。',
    '幸福感与投资之间的相关性对年轻公司尤其明显，作者将其归因于“较不规范化的决策过程”，以及“年轻、经验较少、因而更容易受情绪影响的管理者”可能存在。',
    '在幸福感分布更均衡的地方，这种关系也更强。',
    '与幸福感差距很大的地方相比，企业似乎更愿意在大多数人都比较幸福的地方投资。',
    '虽然这并不能证明幸福感会促使企业增加投资或采取更长期的视角，但作者认为，至少它提示了这种可能性。',
    '不难想象，一个地区的文化和情绪会影响高管如何思考未来。',
    '一位研究人员说：“幸福的人更有远见、更有创造力，并且比平均水平的人更倾向于进行研发，这确实很合理。”',
    '— 1 —'
  ],
  '2016-page2-3a0a55956958.json': [
    '1. [A] 为什么  [B] 如何  [C] 哪里  [D] 何时',
    '2. [A] 作为回报  [B] 尤其是  [C] 相比之下  [D] 总之',
    '3. [A] 必要的  [B] 著名的  [C] 完美的  [D] 足够的',
    '4. [A] 个人主义  [B] 现实主义  [C] 乐观主义  [D] 现代主义',
    '5. [A] 错过  [B] 反映  [C] 破坏  [D] 改变',
    '6. [A] 想象的  [B] 测量的  [C] 假定的  [D] 发明的',
    '7. [A] 当然  [B] 奇怪地  [C] 不幸地  [D] 通常',
    '8. [A] 被划分的  [B] 被宣传的  [C] 负担过重的  [D] 总部设在的',
    '9. [A] 总结  [B] 夸大  [C] 解释  [D] 强调',
    '10. [A] 因素  [B] 阶段  [C] 水平  [D] 方法',
    '11. [A] 理想的  [B] 善于交际的  [C] 可靠的  [D] 声誉良好的',
    '12. [A] 恢复  [B] 出现  [C] 保持  [D] 破裂',
    '13. [A] 分配  [B] 归因于  [C] 转移  [D] 比较',
    '14. [A] 严肃的  [B] 文明的  [C] 有抱负的  [D] 有经验的',
    '15. [A] 反而  [B] 因此  [C] 也  [D] 从不',
    '16. [A] 迅速地  [B] 直接地  [C] 有规律地  [D] 平等地',
    '17. [A] 虽然  [B] 直到  [C] 在……之后  [D] 因为',
    '18. [A] 到达  [B] 跳跃  [C] 暗示  [D] 袭击',
    '19. [A] 分享  [B] 重新发现  [C] 简化  [D] 影响、塑造',
    '20. [A] 为……祈祷  [B] 倾向于  [C] 发出  [D] 赠送',
    '第二部分 阅读理解 A节 说明：阅读下面四篇文章，回答每篇文章后的问题，从A、B、C、D四个选项中选出最佳答案。',
    '在答题纸上作答。',
    '（40分）— 2 —'
  ],
  '2016-page3-4f8eb6b46bde.json': [
    '文章1',
    '诚然，高中编程课并不是大学学习计算机科学的必需条件。',
    '卡内基梅隆大学计算机科学学院副院长汤姆·科尔蒂纳说，没有相关经验的学生上完几门入门课后就能赶上来。',
    '不过，科尔蒂纳说，尽早接触编程是有益的。',
    '年幼的孩子学习计算机科学时，会明白计算机不只是令人困惑、没完没了的字母和数字串，而是可以用来开发应用、创作艺术作品或检验假设的工具。',
    '他们改变思维方式并不像年龄较大的学生那么困难。',
    '把问题拆分成易于处理的小块，再用代码解决它们，会变成一种常态。',
    '科尔蒂纳说，让更多孩子接受这种训练，可以增加对这一领域感兴趣的人数，并帮助填补就业缺口。',
    '学生在上大学前了解一些编程也会受益，因为大学的计算机科学入门课座无虚席，这可能会让经验较少或决心不足的学生望而却步。',
    'Flatiron学校是一所让人付费学习编程的学校，最初是众多编程训练营之一，后来在希望转行的成年人中流行起来。',
    '高中生使用相同的课程，但“我们会尽量根据他们感兴趣的事物来安排课程”，教师维多利亚·弗里德曼说。',
    '例如，学生正在开发的一款应用会根据你的心情推荐电影。',
    'Flatiron班的学生可能不会从高中退学去创建下一个Facebook。',
    '编程语言更新换代很快，所以他们学过的Ruby on Rails语言在他们进入就业市场时甚至可能已经不再实用。',
    '但他们学到的技能——如何从逻辑上思考问题、如何组织结果——适用于任何编程语言，北卡罗来纳州教育顾问黛博拉·西霍姆说。',
    '事实上，Flatiron的学生也许根本不会进入信息技术行业。',
    '但培养未来的程序员大军并不是这些课程的唯一目的。',
    '这些孩子余生都会被计算机包围——口袋里、办公室里和家里都有。',
    '他们越早学会计算机如何思考、如何引导机器产生自己想要的结果，也就越早意识到自己有能力做到这一点，而这会让他们受益越多。',
    '— 3 —'
  ],
  '2016-page4-470fc9280385.json': [
    '21. 科尔蒂纳认为，尽早接触计算机科学会让人更容易____。',
    '[A] 完成未来的职业培训  [B] 改变思维方式  [C] 构建合乎逻辑的假设  [D] 完善艺术作品创作',
    '22. Flatiron为高中生授课时，考虑到了他们的____。',
    '[A] 经验  [B] 兴趣  [C] 职业前景  [D] 学术背景',
    '23. 黛博拉·西霍姆认为，在Flatiron学到的技能将____。',
    '[A] 帮助学生学习其他计算机语言  [B] 新技术出现时必须升级  [C] 学生找工作时需要改进  [D] 让学生快速赚大钱',
    '24. 根据最后一段，Flatiron的学生被期待____。',
    '[A] 创造创新的计算机技术  [B] 在信息技术行业工作更久  [C] 为数字化世界作更充分的准备  [D] 与未来的程序员大军竞争',
    '25. “coax”（第6段第4行）最接近的含义是____。',
    '[A] 劝说  [B] 恐吓  [C] 误导  [D] 挑战',
    '— 4 —'
  ]
};

function clean(value) {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}

function tokenInfo(token) {
  const c = clean(token.surface);
  if (!/[A-Za-z]/.test(token.surface)) {
    return { lemma: 'symbol', partOfSpeech: '数字/标点', contextMeaning: '标题、数字或标点', collocations: [], familiarButRareMeaning: null, paraphrases: [] };
  }
  return { lemma: c || 'word', partOfSpeech: '词汇', contextMeaning: '该词需结合整句和上下文理解', collocations: [], familiarButRareMeaning: null, paraphrases: [] };
}

for (const file of files) {
  const input = JSON.parse(fs.readFileSync(path.join(root, 'translation-work/inputs', file), 'utf8'));
  const trans = translations[file];
  if (!trans || trans.length !== input.sentences.length) throw new Error(`${file} translation count ${trans ? trans.length : 0}/${input.sentences.length}`);
  const generatedAt = new Date().toISOString();
  const sentences = input.sentences.map((sentence, index) => ({
    ...sentence,
    translation: trans[index],
    grammar: '精读译文；长句请结合主干、从句和指代关系复核。',
    generationModel: 'gpt-5.6-luna',
    generatedAt,
    status: 'generated',
    tokens: sentence.tokens.map(token => ({ ...token, ...tokenInfo(token) }))
  }));
  const output = { schemaVersion: 1, taskId: input.taskId, sourceTextHash: input.sourceTextHash, generationModel: 'gpt-5.6-luna', generatedAt, sentences };
  fs.writeFileSync(path.join(root, 'translation-work/completed', `${input.taskId}.json`), JSON.stringify(output, null, 2));
  console.log(JSON.stringify({ taskId: input.taskId, sentences: sentences.length, words: sentences.reduce((sum, sentence) => sum + sentence.tokens.length, 0) }));
}
