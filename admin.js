'use strict';
const $=selector=>document.querySelector(selector);
const {escape:esc,money,shortId,when}=Kitchen;
const credentialsKey='arfat-local-staff-v1';
let signedIn=false,selectedId='',pendingCancel=null,sessionTimer,activeCredential;
function message(text){$('#adminMsg').textContent=text}
function savedLogin(){return JSON.parse(localStorage.getItem(credentialsKey)||'null')}
function hex(bytes){return Array.from(new Uint8Array(bytes),v=>v.toString(16).padStart(2,'0')).join('')}
async function digest(password,salt) {
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const bytes=Uint8Array.from(salt.match(/../g),v=>parseInt(v,16));
  return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',iterations:210000,salt:bytes},key,256));
}
function renderGate() {
  const setup=!savedLogin();
  $('#staffGate').innerHTML='<div class="loginShell"><div class="loginPhoto"><img src="assets/feast.webp" alt="ARFAT’s butter chicken and biryani"><span>ARFAT <em>Kitchen</em></span></div><div class="loginCopy"><span class="smallLabel">STAFF ACCESS</span><h1>'+(setup?'Set up staff login':'Welcome back')+'</h1><p>'+(setup?'Choose the login for this kitchen on this browser.':'Sign in to view the order queue and update delivery status.')+'</p><form id="staffLogin" class="form"><label>Staff username<input name="username" maxlength="60" required autocomplete="username" autocapitalize="none" spellcheck="false"></label><label>Password<input type="password" name="password" '+(setup?'minlength="8" autocomplete="new-password" placeholder="At least 8 characters"':'autocomplete="current-password"')+' required></label>'+(setup?'<label>Confirm password<input type="password" name="confirm" autocomplete="new-password" required></label>':'')+'<p class="formError" id="loginError" role="alert"></p><button class="primary wide">'+(setup?'Create staff login':'Sign in')+'</button></form><p class="localHelp">Local demo · Staff access and orders are stored in this browser profile.</p></div></div>';
}
function lockPanel() {
  signedIn=false;activeCredential=null;selectedId='';pendingCancel=null;
  clearTimeout(sessionTimer);
  if($('#cancelDialog').open)$('#cancelDialog').close();
  $('#dashboard').hidden=true;$('#staffGate').hidden=false;$('#signOut').hidden=true;
  $('#queue').replaceChildren();$('#ticket').replaceChildren();$('#stats').replaceChildren();message('');renderGate();
}
function touchSession(){if(signedIn){clearTimeout(sessionTimer);sessionTimer=setTimeout(lockPanel,30*60*1000)}}
function checkSession() {
  if(!signedIn || savedLogin()?.hash!==activeCredential) {lockPanel();return false}
  return true;
}
document.addEventListener('submit',async e=>{
  if(e.target.id!=='staffLogin')return;e.preventDefault();
  const form=e.target,button=form.querySelector('button'),error=$('#loginError');
  const username=form.elements.username.value.trim(),password=form.elements.password.value;
  button.disabled=true;error.textContent='';
  try{
    if(!username)throw Error('Enter a staff username.');
    if(form.elements.confirm && (password.length<8||password!==form.elements.confirm.value))throw Error('Enter matching passwords of at least 8 characters.');
    const cred=await Kitchen.locked(credentialsKey,async()=>{
      const current=savedLogin();
      if(current){
        if(username!==current.username || await digest(password,current.salt)!==current.hash)throw Error('Check your username and password.');
        return current;
      }
      if(!form.elements.confirm)throw Error('Refresh to set up staff access.');
      const salt=hex(crypto.getRandomValues(new Uint8Array(16)));
      const record={username,salt,hash:await digest(password,salt)};
      localStorage.setItem(credentialsKey,JSON.stringify(record));return record;
    });
    signedIn=true;activeCredential=cred.hash;form.reset();$('#staffGate').hidden=true;$('#dashboard').hidden=false;$('#signOut').hidden=false;
    touchSession();renderBoard();
  }catch(err){error.textContent=err.message||'Unable to sign in on this device.'}
  finally{button.disabled=false}
});
const active=o=>!['Delivered','Cancelled'].includes(o.status);
function renderBoard() {
  if(!checkSession())return;
  const orders=Kitchen.read().orders,filter=$('#filter').value;
  const visible=orders.filter(o=>filter==='All orders'||(filter==='Active'?active(o):o.status===filter));
  const stats=[['New orders',orders.filter(o=>o.status==='Received').length],['In progress',orders.filter(o=>['Preparing','Out for delivery'].includes(o.status)).length],['Delivered',orders.filter(o=>o.status==='Delivered').length]];
  $('#stats').innerHTML=stats.map(([name,count])=>'<div><span>'+name+'</span><b>'+count+'</b></div>').join('');
  if(!visible.some(o=>o.id===selectedId))selectedId=visible[0]?.id||'';
  $('#queue').innerHTML=visible.length?visible.map(o=>'<button class="queueOrder '+(o.id===selectedId?'selected':'')+'" data-order="'+esc(o.id)+'" aria-pressed="'+(o.id===selectedId)+'"><span><b>#'+esc(shortId(o.id))+'</b><small>'+esc(o.address?.name||'Guest')+' · '+esc(when(o.date))+'</small></span><span><b>'+money(o.total)+'</b><small class="statusTag">'+esc(o.status)+'</small></span></button>').join(''):'<div class="queueEmpty"><h3>No '+(filter==='Active'?'active ':'')+'orders here</h3><p>Orders placed from the menu in this browser appear here.</p><a class="textBtn" href="./">Open restaurant menu</a></div>';
  const order=visible.find(o=>o.id===selectedId);
  if(!order){$('#ticket').innerHTML='<h2>Order details</h2><p class="hint">Select an order from the queue to see its items and delivery details.</p>';return}
  const next=Kitchen.steps[Kitchen.steps.indexOf(order.status)+1];
  const nextLabel={Preparing:'Start preparing','Out for delivery':'Send for delivery',Delivered:'Mark delivered'};
  $('#ticket').innerHTML='<div class="subhead"><div><p class="smallLabel">ORDER DETAILS</p><h2>#'+esc(shortId(order.id))+'</h2></div><span class="statusTag">'+esc(order.status)+'</span></div><p class="orderdate">'+esc(when(order.date))+'</p>'+Kitchen.receipt(order)+
    '<h3 class="ticketTimelineTitle">Order history</h3><ol class="timeline">'+order.history.map(h=>'<li><b>'+esc(h.status)+'</b><span>'+esc(when(h.at))+'</span></li>').join('')+'</ol>'+
    (active(order)?'<div class="ticketActions"><button class="primary" data-next="'+esc(next)+'" data-current="'+esc(order.status)+'">'+nextLabel[next]+'</button><button class="textBtn cancelLink" data-cancel="'+esc(order.status)+'">Cancel order</button></div>':'');
}
async function updateStatus(id,from,to) {
  if(!checkSession())return;
  try {await Kitchen.advance(id,from,to);message('Order #'+shortId(id)+' · '+to)}
  catch(error){message(error.message)}
  renderBoard();
}
$('#dashboard').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b || !checkSession())return;
  touchSession();
  if(b.dataset.order){selectedId=b.dataset.order;renderBoard();if(matchMedia('(max-width:720px)').matches)$('#ticket').scrollIntoView({block:'start'});return}
  if(b.dataset.next){b.disabled=true;updateStatus(selectedId,b.dataset.current,b.dataset.next)}
  if(b.dataset.cancel){pendingCancel={id:selectedId,from:b.dataset.cancel};$('#cancelDialog').showModal()}
});
$('#cancelOrder').addEventListener('click',()=>{const pending=pendingCancel;pendingCancel=null;$('#cancelDialog').close();if(pending)updateStatus(pending.id,pending.from,'Cancelled')});
$('#keepOrder').addEventListener('click',()=>{$('#cancelDialog').close();pendingCancel=null});
$('#signOut').addEventListener('click',lockPanel);
$('#filter').addEventListener('change',()=>{touchSession();renderBoard()});
window.addEventListener('storage',e=>{
  if(e.key===credentialsKey||e.key===null){lockPanel();return}
  if(signedIn&&e.key===Kitchen.key)renderBoard();
});
window.addEventListener('pageshow',e=>{if(e.persisted)lockPanel()});
try {renderGate()} catch {message('Enable browser storage to set up staff access.')}
