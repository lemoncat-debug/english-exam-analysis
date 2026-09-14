# 翻译接续说明

当前阶段：代码及输入清单已准备，等待用户把本任务切换到 GPT-5.6 Terra 并明确回复“已切换，继续”。没有 API 密钥，不走 Responses/Batch API。不得假称使用 Terra API，也不得在未确认模型切换前用 Astra 批量翻译。

1. 读取 manifest.json，按 tasks 中未完成的条目依次读取 inputs/<taskId>.json。每次以一页为批次，结合相邻正文页理解题干和选项。
2. 为每个 sentenceId 写入完整句子译文、语法与每个英文词位的语境义。保持原文、页码、wordIndex、surface、sourceTextHash 不变。标点词位允许 lemma/词性为空，但数组位置不得遗漏。
3. 结果保存到 completed/<taskId>.json；注明真实生成模型 gpt-5.6-terra、实际时间、生成方法 Codex 会话。不要填写虚构的 API 响应 ID、token 或调用费用。
4. 每完成一个批次运行 node scripts/merge-translations.cjs，再运行 node scripts/test-translation-contract.cjs。验证失败时只修复该批次。完成条目重复合并不需重新生成。
5. 原文哈希变化时重新准备受影响批次；保持既有源文本哈希一致且已生成的译文。
6. 接续时先检查已完成文件，不重复生成相同任务。不得把 pending 的 null 数据计入翻译覆盖率。
7. 2010 既有精读译文标记 legacy-import，不冒充新的 Terra 生成。可以审校后替换，但保留来源。
8. 完成全部任务并报告真实覆盖率后，再根据复杂代码复核需要提醒用户切回 GPT-6 Astra High，等待“已切换，继续”。最后合并测试与原站发布。

点读页面读取 dist/library/translations/<year>.json。读取过程没有模型接口；所有静态译文随发布版本保存。
