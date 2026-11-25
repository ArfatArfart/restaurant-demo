'use strict';
const icons = {
  utensils:'<path d="M4 3v6a3 3 0 0 0 6 0V3M7 3v18m9-10h4V3c-3 2-4 5-4 8zm4 0v10"/>',
  heart:'<path d="M20.8 4.8c-2.1-2-5.3-1.9-7.3.2L12 6.6l-1.5-1.6C8.5 2.9 5.3 2.8 3.2 4.8c-2.2 2.1-2.2 5.5 0 7.7L12 21l8.8-8.5c2.2-2.2 2.2-5.6 0-7.7z"/>',
  receipt:'<path d="M5 3l2 1.5L9.5 3 12 4.5 14.5 3 17 4.5 19 3v18l-2-1.5-2.5 1.5-2.5-1.5L9.5 21 7 19.5 5 21zM8 9h8m-8 4h6"/>',
  'map-pin':'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>','shopping-bag':'<path d="M5 7h14l1 14H4L5 7zM9 9V6a3 3 0 0 1 6 0v3"/>',
  sparkles:'<path d="m10 4 1.8 5.2L17 11l-5.2 1.8L10 18l-1.8-5.2L3 11l5.2-1.8zM18 2l.9 2.8L22 6l-3.1 1L18 10l-1-3-3-1 3-1.2z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  pizza:'<path d="m4 21 3-18a22 22 0 0 1 15 11L4 21zm2.5-14a18 18 0 0 1 12 9"/><circle cx="10" cy="12" r="1"/><circle cx="8" cy="16.5" r=".8"/>',
  burger:'<path d="M3 10a9 7 0 0 1 18 0H3zm-1 4 3-1.5L8 14l4-1.5 4 1.5 3-1.5 3 1.5M3 17h18a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM9 6h.1m4 1h.1"/>',
  pasta:'<path d="M3 13h18a9 9 0 0 1-18 0zm5 8h8M7 10c-2-3 3-3 1-6m4 6c-2-3 3-3 1-6m4 6c-2-3 3-3 1-6"/>',
  biryani:'<path d="M3 11h18a9 9 0 0 1-18 0zm2-1c0-2 2-3 4-3 1-4 6-4 7 0 2 0 3 1 3 3M7 21h10"/>',
  drinks:'<path d="M5 8h14l-2 13H7L5 8zm7 0 2-5h5M6 12h12"/>',dessert:'<path d="m7 13 5 9 5-9M5 12a3 3 0 0 1 1-5 6 6 0 0 1 12 0 3 3 0 0 1 1 5c-2 1-3 0-4 0s-2 2-4 1-3 0-6-1z"/>',
  star:'<path d="m12 2 3 6.3 7 1-5 5 1.2 7-6.2-3.4-6.2 3.4 1.2-7-5-5 7-1z"/>',flame:'<path d="M12 2c1 5-4 6-3 10-2-1-2-3-2-3-5 6-1 12 5 12 8 0 10-9 5-14 0 3-1 4-2 5 1-4-1-7-3-10z"/>',x:'<path d="m6 6 12 12m0-12L6 18"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="m4 12 5 5L20 6"/>'
};
const icon = name => '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24">'+icons[name]+'</svg>';
document.querySelectorAll('[data-icon]').forEach(el=>{el.outerHTML=icon(el.dataset.icon)});
const menu = [
  {id:'margherita',name:'Signature Margherita',category:'Pizza',price:299,veg:true,desc:'Fresh mozzarella, tomato sauce and basil.',badge:'Chef’s pick'},
  {id:'chicken-burger',name:'Crispy Chicken Burger',category:'Burgers',price:249,veg:false,desc:'Crunchy chicken, lettuce and house sauce.',badge:'Spicy'},
  {id:'penne',name:'Creamy Tomato Pasta',category:'Pasta',price:269,veg:true,desc:'Penne tossed in our creamy tomato sauce.'},
  {id:'biryani',name:'Chicken Dum Biryani',category:'Biryani',price:329,veg:false,desc:'Slow-cooked chicken and fragrant basmati.'},
  {id:'mushroom-pizza',name:'Roasted Mushroom Pizza',category:'Pizza',price:329,veg:true,desc:'Roasted mushrooms, mozzarella and herbs.'},
  {id:'paneer-burger',name:'Paneer Tikka Burger',category:'Burgers',price:219,veg:true,desc:'Grilled paneer, crisp onions and mint sauce.'},
  {id:'lime-cooler',name:'Mint Lime Cooler',category:'Drinks',price:119,veg:true,desc:'Fresh lime, muddled mint and crushed ice.'},
  {id:'brownie',name:'Chocolate Brownie',category:'Desserts',price:159,veg:true,desc:'Warm chocolate brownie with vanilla ice cream.'}
];
menu.unshift(
  {id:'butter-chicken',name:'Butter Chicken',category:'Indian kitchen',price:319,veg:false,desc:'Tandoori chicken in a slow-simmered tomato and butter gravy.',badge:'House special'},
  menu.splice(menu.findIndex(d=>d.id==='biryani'),1)[0],
  {id:'fried-chicken',name:'Crispy Fried Chicken',category:'Fried chicken',price:249,veg:false,desc:'Three crunchy chicken drumsticks with a chilli dip.',badge:'Spicy'},
  {id:'momos',name:'Steamed Veg Momos',category:'Momos',price:149,veg:true,desc:'Six vegetable dumplings with our red chilli chutney.'},
  {id:'cold-coffee',name:'Iced Coffee',category:'Drinks',price:129,veg:true,desc:'Espresso poured over chilled milk and ice.'}
);
const categories = [['All items','grid'],['Indian kitchen','biryani'],['Biryani','biryani'],['Fried chicken','flame'],['Momos','pasta'],['Pizza','pizza'],['Burgers','burger'],['Pasta','pasta'],['Drinks','drinks'],['Desserts','dessert']];
const features = [
  {id:'butter-chicken',title:['A feast of','flavours.'],desc:'From rich butter chicken to fragrant dum biryani, discover the favourites from our kitchen.',img:'feast'},
  {id:'momos',title:['Fresh from','the steamer.'],desc:'Soft, hand-pleated vegetable momos with a generous side of red chilli chutney.',img:'momos'},
  {id:'fried-chicken',title:['Bring on','the crunch.'],desc:'Golden, craggy fried chicken with a spicy dip. Pick a piece from the ARFAT kitchen.',img:'fried-chicken'},
  {id:'biryani',title:['Dum biryani,','slow-cooked.'],desc:'Saffron basmati layered with tender chicken and sealed on dum for the deepest flavour.',img:'biryani'},
  {id:'margherita',title:['Hot from','the oven.'],desc:'Stone-baked margherita with bubbling mozzarella and fresh basil, ready in minutes.',img:'margherita'}
];
const $ = selector => document.querySelector(selector);
const {escape:esc,money,addressText,when,shortId} = Kitchen;
const dish = id => menu.find(item=>item.id===id);
const photo = d => 'assets/'+d.id+'.webp';
let category='All items', feature=0, panel='', addressReturn='', editingAddress='', reviewSnapshot='', toastTimer;
let state;
try { state=Kitchen.read() } catch {state={cart:{},favourites:[],orders:[],addresses:[],address:null}}
function refresh() {
  state=Kitchen.read();
  renderMenu();
  renderHeader();
  if(panel && panel!=='address-form') renderPanel();
}
async function change(edit) { await Kitchen.update(edit); refresh() }
function notify(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2100)}
function cartLines(){return menu.filter(d=>state.cart[d.id])}
function total(){return cartLines().reduce((sum,d)=>sum+d.price*state.cart[d.id],0)}
function stepper(d){const q=state.cart[d.id]||0;return q?'<div class="stepper"><button data-minus="'+d.id+'" aria-label="Remove one '+d.name+'">'+icon('minus')+'</button><span>'+q+'</span><button data-plus="'+d.id+'" aria-label="Add one '+d.name+'" '+(q===99?'disabled':'')+'>'+icon('plus')+'</button></div>':'<button class="add" data-plus="'+d.id+'" aria-label="Add '+d.name+'">'+icon('plus')+'Add</button>'}
function renderCard(d){const liked=state.favourites.includes(d.id);return '<article class="card"><div class="foodPhoto"><img src="'+photo(d)+'" srcset="assets/'+d.id+'-small.webp 360w, '+photo(d)+' 660w" sizes="(max-width:359px) 36vw, (max-width:850px) 45vw, 23vw" alt="'+d.name+'" width="700" height="467" loading="lazy">'+(d.badge?'<span class="dishbadge '+(d.badge==='Spicy'?'spicy':'')+'">'+icon(d.badge==='Spicy'?'flame':'star')+d.badge+'</span>':'')+'<button class="heart '+(liked?'saved':'')+'" data-heart="'+d.id+'" aria-label="'+(liked?'Remove '+d.name+' from':'Save '+d.name+' to')+' favourites" aria-pressed="'+liked+'">'+icon('heart')+'</button></div><div class="cardbody"><span class="diet '+(d.veg?'':'meat')+'"><i></i>'+(d.veg?'Veg':'Non-veg')+'</span><h3>'+d.name+'</h3><p>'+d.desc+'</p><div class="cardfoot"><span class="price">'+money(d.price)+'</span>'+stepper(d)+'</div></div></article>'}
function renderMenu(){const items=menu.filter(d=>(category==='All items'||category===d.category)&&(!$('#veg').checked||d.veg));$('#dishes').innerHTML=items.length?items.map(renderCard).join(''):'<div class="empty full-empty"><h3>No vegetarian dishes in this category</h3><button class="textBtn" data-action="all-veg">See all vegetarian dishes</button></div>';$('#categories').innerHTML=categories.map(([name,i])=>'<button class="chip '+(name===category?'active':'')+'" data-category="'+name+'" aria-pressed="'+(category===name)+'">'+icon(i)+name+'</button>').join('')}
function renderHeader(){const count=Object.values(state.cart).reduce((a,b)=>a+b,0);document.querySelectorAll('.count').forEach(el=>el.textContent=count);$('#location-label').textContent=state.address?.city||'Add address'}
function showFeature(index) {
  feature=index;
  const f=features[index], d=dish(f.id);
  $('#hero-title').innerHTML=f.title[0]+'<br><em>'+f.title[1]+'</em>';
  $('#hero-desc').textContent=f.desc;
  $('#hero-price').textContent=money(d.price);
  $('#feature-dish').textContent=d.name;
  $('#hero-image').srcset='assets/'+f.img+'-small.webp '+(index===0?'660w':'360w')+', assets/'+f.img+'.webp '+(index===0?'1350w':'660w');
  $('#hero-image').src='assets/'+f.img+'.webp';
  $('#hero-image').alt=index===0?'Butter chicken, saffron biryani and naan':d.name;
  $('#dots').innerHTML=features.map((v,i)=>'<button class="'+(i===index?'active':'')+'" data-slide="'+i+'" aria-label="Feature '+dish(v.id).name+'" aria-pressed="'+(i===index)+'"></button>').join('');
}
function empty(i,title,message){return '<div class="empty">'+icon(i)+'<h3>'+title+'</h3><p>'+message+'</p><button class="primary" data-action="browse">Browse menu</button></div>'}
function itemRow(d,control){return '<div class="row"><img src="'+photo(d)+'" alt=""><div class="rowmain"><strong>'+d.name+'</strong><small>'+money(d.price)+'</small></div>'+control+'</div>'}
function field(label,name,options,value='') {
  return '<label>'+label+'<input name="'+name+'" '+options+' value="'+esc(value)+'" required></label>';
}
function addressForm() {
  const a=state.addresses.find(v=>v.id===editingAddress)||{};
  return '<form class="form" id="addressForm">'+field('Address label','label','maxlength="30" placeholder="Home or work"',a.label||'Home')+
    field('Full name','name','autocomplete="name" maxlength="80"',a.name)+
    field('Phone number','phone','type="tel" autocomplete="tel" maxlength="20"',a.phone)+
    '<label>Street address<textarea name="street" autocomplete="street-address" maxlength="300" placeholder="Flat, building, street and locality" required>'+esc(a.street)+'</textarea></label>'+
    field('City','city','autocomplete="address-level2" maxlength="70"',a.city)+
    field('PIN code','pin','autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6"',a.pin)+
    '<button class="primary">Save and use address</button><button type="button" class="secondary" data-action="back-address">Back</button></form>';
}
function addresses() {
  return state.addresses.map(a=>'<article class="addressBlock"><div class="subhead"><strong>'+esc(a.label||'Delivery')+'</strong>'+
    (state.address?.id===a.id?'<span class="statusTag">Selected</span>':'')+'</div><p>'+esc(a.name)+' · '+esc(a.phone)+'</p><p>'+addressText(a)+'</p><div class="addressButtons">'+
    '<button class="textBtn" data-select-address="'+esc(a.id)+'">Deliver here</button><button class="textBtn" data-edit-address="'+esc(a.id)+'">Edit</button></div></article>').join('')+
    '<button class="primary wide" data-action="new-address">'+icon('plus')+'Add address</button>';
}
function showOrders() {
  return state.orders.length?state.orders.map((o,i)=>{
    const history=o.history.map(h=>'<li><b>'+esc(h.status)+'</b><span>'+esc(when(h.at))+'</span></li>').join('');
    return '<details class="orderBlock trackOrder" '+(i===0?'open':'')+'><summary><span><b>Order #'+esc(shortId(o.id))+'</b><small>'+esc(when(o.date))+'</small></span><span class="statusTag">'+esc(o.status)+'</span></summary><ol class="timeline">'+history+'</ol>'+Kitchen.receipt(o)+'</details>';
  }).join(''):empty('receipt','No orders yet','Your order and its latest kitchen status will appear here.');
}
function checkout() {
  if(!cartLines().length) return empty('shopping-bag','Your cart is empty','Choose something from the menu to get started.');
  const a=state.address;
  reviewSnapshot=JSON.stringify([state.cart,a]);
  return cartLines().map(d=>itemRow(d,'<b>× '+state.cart[d.id]+'</b>')).join('')+
    '<div class="addressBlock"><div class="subhead"><strong>Delivery address</strong><button class="textBtn" data-action="choose-address">'+(a?'Change':'Add address')+'</button></div>'+
    (a?'<p>'+esc(a.name)+' · '+esc(a.phone)+'</p><p>'+addressText(a)+'</p>':'<p>Choose where you want your order delivered.</p>')+'</div>'+
    '<div class="summary"><span>Total</span><strong>'+money(total())+'</strong></div><p class="hint">Local demo · This order goes to the staff panel in this browser. No payment is collected.</p><button class="primary wide" data-action="'+(a?'confirm':'choose-address')+'">'+(a?'Place order · '+money(total()):'Add delivery address')+'</button>';
}
function renderPanel() {
  const content=$('#panelBody'), title=$('#panelTitle');
  switch(panel) {
    case 'address-form': title.textContent=editingAddress?'Edit delivery address':'New delivery address';content.innerHTML=addressForm();break;
    case 'address': title.textContent='Delivery addresses';content.innerHTML=addresses();break;
    case 'cart': title.textContent='Your cart';content.innerHTML=cartLines().length?
      cartLines().map(d=>itemRow(d,stepper(d))).join('')+'<div class="summary"><span>Subtotal</span><span>'+money(total())+'</span></div><button class="primary wide" data-action="checkout">Review order</button>':
      empty('shopping-bag','Your cart is empty','Choose something from the menu to get started.');break;
    case 'checkout':title.textContent='Review order';content.innerHTML=checkout();break;
    case 'favourites': title.textContent='Your favourites';content.innerHTML=state.favourites.length?
      state.favourites.filter(dish).map(id=>itemRow(dish(id),'<button class="textBtn" data-heart="'+id+'" aria-label="Remove from favourites">'+icon('x')+'</button>'+stepper(dish(id)))).join(''):
      empty('heart','Save your favourites','Tap the heart on a dish to find it here.');break;
    case 'orders':title.textContent='My orders';content.innerHTML=showOrders();break;
  }
}
function showPanel(name) {
  panel=name;renderPanel();
  if(!$('#panel').open)$('#panel').showModal();
  $('#panel').scrollTop=0;
}
function closePanel() {$('#panel').close();panel=''}
function goAddress(returnTo='') {
  addressReturn=returnTo;
  editingAddress='';
  showPanel(state.addresses.length?'address':'address-form');
}
function finishAddress() {
  if(addressReturn==='checkout') showPanel('checkout');
  else closePanel();
}
async function changeQty(id,amount) {
  if(!dish(id))return;
  await change(s=>{
    const next=Math.max(0,Math.min(99,(s.cart[id]||0)+amount));
    if(next)s.cart[id]=next;
    else delete s.cart[id];
  });
  if(amount>0&&!panel)notify(dish(id).name+' added to cart');
}
async function clickButton(b) {
  const data=b.dataset;
  if(data.category){category=data.category;renderMenu();return}
  if(data.slide!==undefined){showFeature(Number(data.slide));return}
  if(data.plus||data.minus){await changeQty(data.plus||data.minus,data.plus?1:-1);return}
  if(data.heart){
    await change(s=>{s.favourites=s.favourites.includes(data.heart)?s.favourites.filter(id=>id!==data.heart):[...s.favourites,data.heart]});
    if(!panel)notify(state.favourites.includes(data.heart)?'Saved to favourites':'Removed from favourites');
    return;
  }
  if(data.selectAddress){
    await change(s=>{s.address=s.addresses.find(a=>a.id===data.selectAddress)||s.address});
    finishAddress();return;
  }
  if(data.editAddress){editingAddress=data.editAddress;showPanel('address-form');return}
  switch(data.action) {
    case 'hero-add':await changeQty(features[feature].id,1);break;
    case 'close':closePanel();break;
    case 'browse':closePanel();
    case 'menu':$('#menu').scrollIntoView({block:'start'});break;
    case 'address':goAddress();break;
    case 'choose-address':goAddress('checkout');break;
    case 'new-address':editingAddress='';showPanel('address-form');break;
    case 'back-address':if(state.addresses.length)showPanel('address');else finishAddress();break;
    case 'cart':case 'orders':case 'favourites':case 'checkout':showPanel(data.action);break;
    case 'confirm':
      b.disabled=true;
      try {await Kitchen.place(menu,reviewSnapshot);refresh();showPanel('orders')}
      finally {b.disabled=false}
      break;
    case 'all-veg':category='All items';renderMenu();break;
  }
}
function report(error) {
  try{refresh()}catch{}
  const msg=error.name==='QuotaExceededError'?'Device storage is full. Your order was not saved.':error.message||'Unable to save on this device.';
  if(panel){
    const p=document.createElement('p');p.className='errorMsg';p.setAttribute('role','alert');p.textContent=msg;$('#panelBody').prepend(p);
  }else notify(msg);
}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(b)clickButton(b).catch(report)});
$('#veg').addEventListener('change',renderMenu);
$('#panel').addEventListener('close',()=>{panel='';addressReturn=''});
$('#panel').addEventListener('click',e=>{
  if(e.target!==e.currentTarget)return;
  const box=e.target.getBoundingClientRect();
  if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)closePanel();
});
document.addEventListener('submit',async e=>{
  const form=e.target;if(form.id!=='addressForm')return;e.preventDefault();
  const fields=Object.fromEntries(Array.from(new FormData(form),([k,v])=>[k,String(v).trim()]));
  for(const [k,v] of Object.entries(fields))if(!v){form.elements[k].setCustomValidity('Please fill in this field.');form.elements[k].reportValidity();return}
  if(!/^\+?[\d ()-]+$/.test(fields.phone)||!/^\d{7,15}$/.test(fields.phone.replace(/\D/g,''))){form.elements.phone.setCustomValidity('Enter a valid phone number.');form.elements.phone.reportValidity();return}
  const button=form.querySelector('.primary');button.disabled=true;
  try{
    const entry={...fields,id:editingAddress||Kitchen.uuid()};
    await change(s=>{s.addresses=[...s.addresses.filter(a=>a.id!==entry.id),entry];s.address=entry});
    finishAddress();notify('Delivery address saved');
  }catch(err){report(err)}finally{button.disabled=false}
});
window.addEventListener('storage',e=>{if(e.key===Kitchen.key||e.key===null)refresh()});
window.addEventListener('pageshow',()=>{try{refresh()}catch{}});
document.addEventListener('input',e=>{if(e.target.closest('#addressForm'))e.target.setCustomValidity('')});
renderHeader();renderMenu();showFeature(0);

/* Hero banner autoplay: rotates featured dishes every 4.5s, pauses on hover/touch and when the tab is hidden. */
(function heroAutoplay(){
  const hero=document.querySelector('.feastHero');
  if(!hero||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let timer, pausedUntil=0;
  const go=i=>{
    const img=document.getElementById('hero-image');
    hero.classList.add('swapping'); img.classList.add('swap');
    setTimeout(()=>{showFeature(i); hero.classList.remove('swapping'); img.classList.remove('swap');},300);
  };
  const tick=()=>{ if(document.hidden||Date.now()<pausedUntil) return; go((feature+1)%features.length); };
  const start=()=>{ clearInterval(timer); timer=setInterval(tick,4000); };
  hero.addEventListener('mouseenter',()=>pausedUntil=Infinity);
  hero.addEventListener('mouseleave',()=>pausedUntil=0);
  hero.addEventListener('touchstart',()=>pausedUntil=Date.now()+6000,{passive:true});
  hero.addEventListener('click',e=>{ if(e.target.closest('[data-slide]')) start(); });
  start();
})();
