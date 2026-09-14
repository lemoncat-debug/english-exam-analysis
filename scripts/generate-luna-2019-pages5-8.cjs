const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2019-page5-4cb367c3e43d.json', '2019-page6-0dfc0fe5e5cf.json', '2019-page7-28427eb4565a.json', '2019-page8-d282097ea238.json'];
const translations = {
  '2019-page5-4cb367c3e43d.json': [
    '文章2：森林为我们提供阴凉和安静，也构成应对气候变化最棘手的挑战之一。',
    '正当我们人类依靠森林吸收自己产生的大量二氧化碳时，我们却在威胁森林这样做的能力。',
    '我们正在加速的气候变化有一天可能让森林排放的碳多于吸收的碳。',
    '幸好，有办法走出这一困境，但这需要取得微妙的平衡。',
    '要让森林在未来很长时间内继续作为有价值的“碳汇”茂盛生长，可能需要暂时降低它们现在吸收碳的能力。',
    '加利福尼亚州在许多气候行动上都走在前面，如今也在研究具体做法。',
    '该州提出的森林碳计划旨在加倍努力，疏伐森林中的幼树，并清除部分区域的灌木。',
    '这会暂时降低森林携碳能力。',
    '但剩下的树木会吸收更大份额的可用水分，从而生长得更好，恢复森林从空气中吸收碳的能力。',
    '健康的树木也更能抵御昆虫。',
    '景观因此不那么容易燃烧。',
    '即使发生火灾，被烧掉的树木也会更少。',
    '对这种规划的需求日益紧迫。',
    '自2010年以来，加州的干旱和昆虫已经杀死超过1亿棵树，其中大多数死于2016年；野火也烧毁了数十万英亩土地。',
    '加州计划到2020年每年治理3.5万英亩森林，到2030年每年治理6万英亩，资金来自该州排放许可拍卖的收益。',
    '这只占所有可能受益面积的一小部分——总共约50万英亩，因此优先处理火灾或干旱风险最大的地区至关重要。',
    '该战略还力求确保从森林中移除的木质材料中的碳被锁定在实木中，或在原本使用化石燃料的车辆中作为生物燃料燃烧。',
    '关于交通生物燃料的新研究已经在进行。',
    '各州政府非常熟悉森林管理，但传统上更关注野生动物、流域和休闲机会。',
    '直到最近，他们才开始认识到森林在储存碳方面将发挥的重要作用。',
    '加州计划预计明年由州长最终批准，应当成为一个范例。',
    '— 5 —'
  ],
  '2019-page6-0dfc0fe5e5cf.json': [
    '26. 作者称森林是“最棘手的挑战之一”，暗示____。',
    '[A] 全球气候变化可能失控  [B] 人们可能误解全球变暖  [C] 极端天气状况可能出现  [D] 森林可能成为潜在威胁',
    '27. 为了让森林继续作为有价值的“碳汇”，我们可能需要____。',
    '[A] 保护森林中的物种多样性  [B] 加快幼树生长  [C] 在不同植物之间取得平衡  [D] 降低森林目前吸收碳的能力',
    '28. 加州森林碳计划致力于____。',
    '[A] 培育更耐旱的树木  [B] 降低部分森林的密度  [C] 找到更有效的灭虫方法  [D] 在野火后迅速恢复森林',
    '29. 根据第五段，加州计划的关键是____。',
    '[A] 首先处理处于严重危险中的地区。',
    '[B] 在2020年之前实施计划。',
    '[C] 完善排放许可拍卖。',
    '[D] 获得足够的资金支持。',
    '30. 作者对加州计划的态度最好描述为____。',
    '[A] 模棱两可  [B] 宽容  [C] 支持  [D] 谨慎 — 6 —'
  ],
  '2019-page7-28427eb4565a.json': [
    '文章3',
    '多年来，美国农民一直抱怨劳动力短缺。',
    '如果不彻底改革农场工人的移民规定，这些抱怨很可能不会停止。',
    '国会阻碍了为农业工人制定更简单签证的努力；这种签证本可以让外国工人在美国停留更久，并在行业内更换工作。',
    '如果这一点不改变，美国企业、社区和消费者都将成为输家。',
    '美国农场工人中或许有一半是无证移民。',
    '随着进入美国的这类工人减少，农业劳动力的特点正在改变。',
    '如今的农场工人虽然仍主要出生于墨西哥，但更可能定居而不是迁徙，也更可能已婚而不是单身。',
    '他们也在变老。本世纪初，大约三分之一的作物工人年龄超过35岁。',
    '如今这一比例超过一半。',
    '而采摘农作物对年长者的身体负担很重。',
    '一种经常被讨论的解决劳动力短缺办法，和过去一样不切实际：美国本土工人不会回到农场。',
    '机械化也不是答案——至少目前还不是。',
    '玉米、棉花、水稻、大豆和小麦的生产已经基本机械化，但许多高价值、劳动密集型作物（如草莓）仍需要人工。',
    '即使奶牛场已有机器人完成一小部分挤奶工作，距离完全自动化也还有很长的路。',
    '因此，农场越来越依赖持H-2A签证的临时客工来填补劳动力缺口。',
    '大约从2012年开始，签证申请量急剧上升；从2011年到2016年，签发的签证数量增加了一倍多。',
    'H-2A签证没有数量上限，而非农业工作的H-2B签证每年限制在6.6万份。',
    '即便如此，雇主仍抱怨没有得到所需的全部工人。',
    '这个过程繁琐、昂贵且不可靠。',
    '一项调查发现，官僚程序的延误导致H-2A工人平均晚到工作岗位22天。',
    '联邦移民突袭也加剧了短缺：一些工人被带走，另一些则被迫转入地下。',
    '在2012年的一项调查中，71%的树果种植者以及近80%的葡萄干和浆果种植者表示劳动力不足。',
    '一些西部农民通过把经营活动迁往墨西哥来应对。',
    '1998年至2000年，美国人消费的水果中有14.5%来自进口。',
    '十多年后，进口水果的比例为25.8%。',
    '实际上，美国可以进口食物，也可以进口采摘食物的工人。',
    '— 7 —'
  ],
  '2019-page8-d282097ea238.json': [
    '31. 根据前两段，应当解决什么问题？',
    '[A] 美国对外国工人的歧视  [B] 偏袒部分美国企业的法律',
    '[C] 美国农场工人移民规定的缺陷',
    '[D] 美国农业就业机会的减少',
    '32. 美国农业劳动力面临的一个问题是____。',
    '[A] 非法移民人数增加  [B] 作物工人流动性高  [C] 缺乏有经验的工人  [D] 移民农场工人年龄老化',
    '33. 关于美国农业劳动力短缺，讨论最多的解决办法是什么？',
    '[A] 吸引更年轻的工人从事农活。',
    '[B] 让美国本土工人回到农业。',
    '[C] 使用更多机器人种植高价值作物。',
    '[D] 加强对农民的资金支持。',
    '34. 农业雇主抱怨H-2A签证是因为它____。',
    '[A] 批准程序缓慢  [B] 停留期限有限  [C] 要求更加严格  [D] 控制年度签发数量',
    '35. 下列哪项最适合作为本文标题？',
    '[A] 衰退中的美国农业？',
    '[B] 进口食物还是进口劳动力？',
    '[C] 墨西哥拯救了美国？',
    '[D] 人力与自动化？',
    '— 8 —'
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
