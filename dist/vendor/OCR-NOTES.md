The original Tesseract 6.0.1 English gzip model is also exposed as four ES module base64 chunks for browser loading. Their decoded concatenation must equal the original eng.traineddata.gz bytes. No model is fetched from a third-party endpoint.

The bundled 2010/vendor/worker.min.js has one narrowly scoped fix in initialize(): when languages are supplied as {code, data}, use the language code rather than the binary data to construct the TessBaseAPI language name. The original 6.0.1 worker-script/index.js used l.data there, while loadLanguage correctly uses l.code. String language arguments remain unchanged. Licenses remain in 2010/vendor/.

PDF.js modules are copied from the bundled pdfjs-dist distribution. See PDFJS-LICENSE.txt.
