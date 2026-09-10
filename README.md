# 考研英语精读台

2010 年英语二个人学习网站。静态网页，预先整理的真题内容与解释，无需 AI API 密钥。

## 已实现

- 完形填空与四篇阅读，题号 1—40，80 个原文句段及题目、选项中文翻译。
- 清晰原文、真题原页、个人作答照片三种视图，单词及整句点读。
- 原有十张照片利用页面特征匹配生成文字位置。
- 40 题原始答案草稿、可编辑答案、逐题讲解、定位原文和打开参考 PDF。
- 本地词典、重点词语境释义、浏览器语音朗读、收藏、记录导出。
- 新照片的浏览器 OCR，匹配选定的 2010 年页码；照片保存在当前浏览器的 IndexedDB，答案和收藏保存在 localStorage。

## 边界

- 当前只整理了 2010 年前十页，未包括新题型、翻译题和作文。
- 不根据手写笔迹自动判定新照片的选项，需要用户在复盘面板确认。
- 其他年份仅登记资料路径，尚未制作点读与讲解。
- 照片透视、纸张弯曲、划线可能影响点读位置及 OCR；提供清晰原文作核对。
- 大部分词提供基础字典释义；重点词另有语境释义。不是对每次点击动态调用 AI。
- 预先整理的中文译文、讲解可与用户提供的张剑解析核对，不是出版社官方电子版。
- 保存数据不跨设备同步；清除浏览器数据可能删除个人记录。

## 文件

- dist：可部署的完整站点。
- scripts/prepare.py：提取文本坐标、构建素材与词典。
- scripts/questions.py：生成题目与解析数据。
- scripts/source-catalog.json：已授权的各年真题、解析路径及明确排除项。
- scripts/verify.mjs：内容与资源完整性检查。
- scripts/verify-ocr.cjs：对用户照片实际运行 OCR 并验证句子匹配。

使用 HTTP 服务打开 dist/index.html。依赖安装使用 npm ci；资料生成脚本需要 Python 的 pdfplumber、pypdfium2、opencv-python-headless、numpy 和 Pillow。生成数据已随站点保存，日常使用无需运行 Python。

基础词典来自 https://github.com/skywind3000/ECDICT ，MIT 许可随 dist/assets 保留。OCR 使用 Tesseract.js（Apache-2.0），许可证随 dist/vendor 保留。
