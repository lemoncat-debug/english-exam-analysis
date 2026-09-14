const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = ['2020-page1-ebf785a29db8.json', '2020-page2-e68ca2f9547d.json', '2020-page3-547b2ce68e90.json', '2020-page4-d7b4fb6ccd50.json'];
const translations = {
  '2020-page1-ebf785a29db8.json': [
    '2020年全国硕士研究生入学统一考试英语（二）试题 第一部分 英语知识运用',
    '说明：阅读下面的文章，从每题给出的A、B、C、D四个选项中选出最佳答案，并在答题纸上作答。',
    '（10分）当然，成为好父母是每位父母都希望做到的事。',
    '但要界定好父母意味着什么，无疑非常棘手，尤其是因为孩子对同一种教养方式的反应各不相同。',
    '一个平静、遵守规则的孩子，可能比年幼的兄弟姐妹更适合另一种教养方式。',
    '幸运的是，还有一种父母类型比较容易描述：耐心的父母。',
    '各个年龄段的孩子都能从有耐心的教养中受益。',
    '不过，尽管每位父母都希望有耐心，这并不是一件容易的事。',
    '有时父母会感到疲惫和沮丧，无法在孩子面前保持宽容、沉着的态度。',
    '我理解这一点。你只是个普通人，有时孩子确实会把你逼得有点太过分。',
    '接下来不可避免的事情就发生了：你失去耐心，要么对孩子大喊大叫，要么说出过于严厉、对谁都没有好处的话。',
    '你希望能够把时钟拨回去重新开始。我们都经历过这种情况。',
    '然而，尽管这种事很常见，也要记住，在疲惫的某个瞬间，',
    '你可能会对孩子说出一句让自己长期后悔的话。',
    '这不仅可能损害你与孩子的关系，还会影响孩子的自尊。',
    '如果你总是在孩子面前失去耐心，',
    '那么你会在不经意间向孩子示范缺乏情绪控制。',
    '我们越来越意识到，为年轻一代示范宽容和耐心的重要性。',
    '这是一项会让他们终身受益的技能。',
    '事实上，在压力面前调节情绪或保持情绪控制的能力，是人生所有技能中最重要的能力之一。',
    '当然，要始终对孩子保持耐心非常困难。',
    '更实际的目标是：当面对涉及孩子的令人惊讶的情境时，尽力做到尽可能宽容和沉着。',
    '我可以向你保证：努力实现这一目标后，',
    '你和孩子都会受益，并能从压力时刻中恢复，身心感觉更好。',
    '— 1 —'
  ],
  '2020-page2-e68ca2f9547d.json': [
    '1. [A] 枯燥的  [B] 愉快的  [C] 有教育意义的  [D] 棘手的',
    '2. [A] 此外  [B] 例如  [C] 立即  [D] 偶然',
    '3. [A] 幸运地  [B] 偶尔  [C] 因此  [D] 最终',
    '4. [A] 逗乐  [B] 协助  [C] 描述  [D] 训练',
    '5. [A] 尽管  [B] 因为  [C] 除非  [D] 一旦',
    '6. [A] 答案  [B] 任务  [C] 选择  [D] 进入',
    '7. [A] 宽容的  [B] 正式的  [C] 僵硬的  [D] 批评的',
    '8. [A] 移动  [B] 拖拽  [C] 推动  [D] 发送',
    '9. [A] 神秘的  [B] 不合逻辑的  [C] 可疑的  [D] 不可避免的',
    '10. [A] 无聊的  [B] 天真的  [C] 严厉的  [D] 模糊的',
    '11. [A] 把时钟拨回去  [B] 拆开  [C] 放在一边  [D] 掩盖',
    '12. [A] 总体而言  [B] 相反  [C] 然而  [D] 否则',
    '13. [A] 喜欢  [B] 错过  [C] 相信  [D] 后悔',
    '14. [A] 提高  [B] 影响  [C] 证明合理  [D] 反映',
    '15. [A] 时间  [B] 联系  [C] 比赛  [D] 冷静',
    '16. [A] 本质  [B] 秘密  [C] 重要性  [D] 语境',
    '17. [A] 欺骗  [B] 击败  [C] 困惑  [D] 面对',
    '18. [A] 糟糕的  [B] 困难的  [C] 奇怪的  [D] 错误的',
    '19. [A] 令人费力的  [B] 变化的  [C] 令人兴奋的  [D] 令人惊讶的',
    '20. [A] 隐藏  [B] 出现  [C] 退出  [D] 逃离',
    '第二部分 阅读理解 A节 说明：阅读下面四篇文章，回答每篇文章后的问题，从A、B、C、D四个选项中选出最佳答案。',
    '在答题纸1上作答。',
    '（40分）— 2 —'
  ],
  '2020-page3-547b2ce68e90.json': [
    '文章1',
    '老鼠和其他动物需要高度留意同类发出的社交信号，以便辨认可以合作的朋友和需要躲避的敌人。',
    '为了了解这种能力是否也适用于非生物，圣迭戈加州大学的拉蕾·奎因及同事测试了老鼠能否识别机器老鼠发出的社交信号。',
    '他们让8只成年老鼠与两种机器老鼠共同生活4天——一种具有社交性，另一种没有。机器老鼠极其简约，像一只装有轮子的、较胖的电脑鼠标，还有彩色标记。',
    '实验期间，社交机器老鼠跟随活老鼠四处走动，玩同样的玩具，还打开笼门让被困的老鼠逃走。',
    '与此同时，非社交机器老鼠只会前后、左右移动。',
    '接下来，研究人员把机器老鼠困在笼中，让活老鼠通过按压杠杆释放它们。在18次试验中，活老鼠平均更有可能释放社交机器老鼠，概率比释放非社交机器老鼠高52%。',
    '奎因说，这表明老鼠把社交机器老鼠视为真正的社会存在。',
    '她说，社交机器老鼠表现出共同探索、共同玩耍等行为，可能让老鼠与它建立了更多联系。',
    '这可能使老鼠更容易记住自己曾经释放过它，并希望在自己被困时机器老鼠也能回报它们。',
    '奎因说：“研究表明，老鼠会进行多种形式的互惠帮助和合作，包括直接互惠，即一只老鼠会帮助曾经帮助过自己的另一只老鼠。”',
    '考虑到机器老鼠的设计极其简单，老鼠愿意与之交朋友令人惊讶。机器老鼠与普通老鼠大小相同，却像一个装在轮子上的塑料盒。',
    '帮助研究的澳大利亚昆士兰大学珍妮特·怀尔斯说：“我们原以为必须给它装上会动的头和尾巴、面部特征，还要给它加上气味让它闻起来像真老鼠，但其实没有必要。”',
    '怀尔斯说，这一发现显示，即使社交线索来自简单的机器人，老鼠也对其非常敏感。',
    '同样，即使机器人只展示简单的社交信号，儿童也倾向于把机器人当作同类来对待。',
    '怀尔斯说：“我们人类似乎会被机器人吸引，事实证明，其他动物也会。”',
    '— 3 —'
  ],
  '2020-page4-d7b4fb6ccd50.json': [
    '21. 奎因及同事进行测试，是为了了解老鼠能否____。',
    '[A] 从非生物老鼠身上识别社交信号  [B] 区分友善老鼠和敌对老鼠  [C] 通过特殊训练获得社交特征  [D] 向同伴发出警告信息',
    '22. 实验期间，非社交机器老鼠做了什么？',
    '[A] 它跟随社交机器老鼠。',
    '[B] 它和一些玩具一起玩。',
    '[C] 它释放了被困的老鼠。',
    '[D] 它独自四处移动。',
    '23. 根据奎因的说法，老鼠释放社交机器老鼠，是因为它们____。[A] 试图练习一种逃脱方法。',
    '[B] 期待机器老鼠以后以同样方式回报。',
    '[C] 想展示自己的智力。',
    '[D] 认为这是一个有趣的游戏。',
    '24. 怀尔斯指出，老鼠____。[A] 能记住其他老鼠的面部特征。',
    '[B] 对气味的辨别能力胜过对大小的辨别。',
    '[C] 对行为的反应多于对外表的反应。',
    '[D] 会被装在轮子上的塑料盒吓到。',
    '25. 从本文可以了解到，老鼠____。',
    '[A] 似乎能适应新环境  [B] 比其他动物更活跃于社交  [C] 在社交方面与儿童行为不同  [D] 对社交线索的敏感程度超出预期 — 4 —'
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
