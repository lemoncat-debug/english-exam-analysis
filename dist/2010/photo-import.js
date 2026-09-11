'use strict';
// Match OCR tokens to the selected known exam page; never infer a different exam.
function matchPhotoWords(ocr,reference){
 const token=t=>String(t).toLowerCase().replace(/[^a-z0-9]/g,'');
 const a=ocr.map(w=>token(w.text)),b=reference.map(w=>token(w.text));
 const width=b.length+1,dp=new Uint16Array((a.length+1)*width);
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i*width+j]=a[i]&&a[i]===b[j]?dp[(i+1)*width+j+1]+1:Math.max(dp[(i+1)*width+j],dp[i*width+j+1]);
 let i=0,j=0,matches=[];
 while(i<a.length&&j<b.length){if(a[i]&&a[i]===b[j]){matches.push([i,j]);i++;j++}else if(dp[(i+1)*width+j]>=dp[i*width+j+1])i++;else j++}
 const words=ocr.map(w=>({...w,sid:null}));
 for(let k=0;k<matches.length;k++){
  const [i,j]=matches[k],prev=matches[k-1],next=matches[k+1];
  // Require support from a nearby matched token to avoid linking isolated common words.
  if((prev&&i-prev[0]<=3&&j-prev[1]<=3)||(next&&next[0]-i<=3&&next[1]-j<=3))words[i].sid=reference[j].sid;
 }
 return {words,matched:matches.length,ratio:matches.length/Math.max(1,Math.min(a.length,b.length))};
}
globalThis.matchPhotoWords=matchPhotoWords;
let uploadWorker=null,photoDb=null,uploadBusy=false;
async function getPhotoDb(){if(photoDb)return photoDb;photoDb=await new Promise((resolve,reject)=>{const req=indexedDB.open('study2010.photos',1);req.onupgradeneeded=()=>req.result.createObjectStore('photos',{keyPath:'page'});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});return photoDb}
async function restorePhotos(){try{const db=await getPhotoDb();const records=await new Promise((resolve,reject)=>{const req=db.transaction('photos').objectStore('photos').getAll();req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});for(const r of records)S.uploads[r.page]={url:URL.createObjectURL(r.blob),words:r.words};if(S.view==='photo')renderReader()}catch{/* Import remains usable in memory if private browsing blocks IndexedDB. */}}
async function savePhoto(page,blob,words){const db=await getPhotoDb();return new Promise((resolve,reject)=>{const tx=db.transaction('photos','readwrite');tx.objectStore('photos').put({page,blob,words});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})}
function openUpload(){
 if(uploadBusy){toast('正在识别，请稍候');return}
 modal('导入 2010 年作答照片','<p>选择对应页并让文字朝上。识别在浏览器中完成；手写选项请到「错题复盘」核对。</p><label for="uploadPage">对应真题页</label><select id="uploadPage">'+D.pages.map(p=>'<option value="'+p.id+'" '+(p.id===S.page?'selected':'')+'>第 '+p.id+' 页 · '+D.passages.find(x=>x.id===p.passage).title+' · '+(p.id%2?'文章':'题目')+'</option>').join('')+'</select><input id="photoFile" type="file" accept="image/jpeg,image/png,image/webp,image/bmp"><canvas id="uploadCanvas" class="upload-preview" hidden></canvas><div class="modal-actions"><button id="rotatePhoto" disabled>旋转 90°</button><button id="recognizePhoto" class="primary" disabled>识别并导入</button></div><p id="uploadProgress" class="source-note" role="status">支持 JPG、PNG、WebP。当前只匹配 2010 年这套题，单张不超过 20 MB。</p>');
 let img=null,angle=0,fileGeneration=0;
 const canvas=$('#uploadCanvas'),progress=$('#uploadProgress');
 function draw(){const scale=Math.min(1,2200/Math.max(img.width,img.height));let w=Math.round(img.width*scale),h=Math.round(img.height*scale);canvas.width=angle%180?h:w;canvas.height=angle%180?w:h;const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate(angle*Math.PI/180);ctx.drawImage(img,-w/2,-h/2,w,h);canvas.hidden=false}
 $('#photoFile').onchange=async e=>{const generation=++fileGeneration;img?.close?.();img=null;canvas.hidden=true;$('#rotatePhoto').disabled=true;$('#recognizePhoto').disabled=true;const f=e.target.files[0];if(!f)return;if(f.size>20*1024*1024){progress.textContent='图片超过 20 MB，请缩小后再导入。';return}try{const bitmap=await createImageBitmap(f);if(generation!==fileGeneration){bitmap.close();return}img=bitmap;angle=0;draw();$('#rotatePhoto').disabled=false;$('#recognizePhoto').disabled=false;progress.textContent='请确认文字朝上，并选择对应页。'}catch{progress.textContent='无法读取图片，请使用 JPG、PNG 或 WebP。'}};
 $('#rotatePhoto').onclick=()=>{angle=(angle+90)%360;draw()};
 $('#recognizePhoto').onclick=async()=>{
  uploadBusy=true;const page=Number($('#uploadPage').value);
  const controls=['#recognizePhoto','#rotatePhoto','#photoFile','#uploadPage','#closeModal'];controls.forEach(s=>$(s).disabled=true);
  const cancel=e=>e.preventDefault();$('#modal').addEventListener('cancel',cancel);
  try{
   progress.textContent='正在准备文字识别，首次加载可能需要一点时间……';
   if(!globalThis.Tesseract)await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='vendor/tesseract.min.js';s.onload=resolve;s.onerror=()=>reject(Error('识别组件加载失败，请检查连接后重试'));document.head.appendChild(s)});
   if(!uploadWorker)uploadWorker=await Tesseract.createWorker('eng',1,{workerPath:new URL('vendor/worker.min.js',location.href).href,corePath:new URL('vendor/',location.href).href,langPath:new URL('vendor',location.href).href,workerBlobURL:false,logger:m=>{const p=$('#uploadProgress');if(p)p.textContent=m.status==='recognizing text'?'识别印刷文字 '+Math.round(m.progress*100)+'%':'正在加载识别组件……'}});
   await uploadWorker.setParameters({tessedit_pageseg_mode:'3'});
   const {data}=await uploadWorker.recognize(canvas,{}, {text:true,blocks:true});
   const raw=[];for(const block of data.blocks||[])for(const para of block.paragraphs||[])for(const line of para.lines||[])for(const w of line.words||[])if(w.confidence>=20&&w.text.trim())raw.push({text:w.text,x:w.bbox.x0/canvas.width*100,y:w.bbox.y0/canvas.height*100,w:(w.bbox.x1-w.bbox.x0)/canvas.width*100,h:(w.bbox.y1-w.bbox.y0)/canvas.height*100});
   if(raw.length<15)throw Error('识别到的文字太少。请确认照片清晰、文字朝上，并重新拍摄或旋转后再试。');
   const scores=D.pages.map(p=>({page:p.id,result:matchPhotoWords(raw,p.words)})).sort((a,b)=>b.result.matched-a.result.matched);const result=scores.find(x=>x.page===page).result;const best=scores[0];if(best.page!==page&&best.result.matched>result.matched*1.35&&best.result.ratio>.55)throw Error('这张照片更像第 '+best.page+' 页，请改选页码后重新识别。');
   if(result.ratio<.35||result.matched<20)throw Error('这张照片与所选页匹配不足。请检查年份、页码和方向；目前只支持 2010 年这套题。');
   const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.9));if(!blob)throw Error('图片处理失败，请重试');
   if(S.uploads[page])URL.revokeObjectURL(S.uploads[page].url);
   S.uploads[page]={url:URL.createObjectURL(blob),words:result.words};
   let saved=true;try{await savePhoto(page,blob,result.words)}catch{saved=false}
   S.passage=D.pages.find(p=>p.id===page).passage;S.page=page;S.view='photo';S.sid=null;S.word=null;S.zoom=1;S.question=D.questions.find(q=>q.passage===S.passage).id;S.filter='all';S.retry=false;S.retrySubmitted=false;S.reveal=false;render();persist();
   $('#modal').close();toast(saved?'照片已保存到此浏览器，点击印刷文字即可点读。':'照片已导入，但此浏览器不能保存图片；刷新后需重新导入。');
  }catch(err){progress.textContent=err.message||'识别失败，请重试。';uploadWorker?.terminate();uploadWorker=null}
  finally{uploadBusy=false;controls.forEach(s=>{if($(s))$(s).disabled=false});$('#modal').removeEventListener('cancel',cancel)}
 };
}
if(typeof document!=='undefined')restorePhotos();
