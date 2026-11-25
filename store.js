'use strict';
const Kitchen = (() => {
  const key = 'arfat-restaurant-v1';
  const steps = ['Received', 'Preparing', 'Out for delivery', 'Delivered'];
  const statuses = [...steps, 'Cancelled'];
  const uuid = () => crypto.randomUUID();
  function read() {
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    const addresses = Array.isArray(data.addresses) ? data.addresses : [];
    if (!addresses.length && data.address?.street) addresses.push({...data.address, id:'original', label:'Home'});
    const address = addresses.find(a => a.id === data.address?.id) || addresses[0] || null;
    const orders = (Array.isArray(data.orders) ? data.orders : []).filter(o => o?.id && Array.isArray(o.items)).map(o => ({
      ...o, status: statuses.includes(o.status) ? o.status : 'Received',
      history: Array.isArray(o.history) ? o.history : [{status:'Received', at:o.date}]
    }));
    return {...data, cart:data.cart || {}, favourites:data.favourites || [], addresses, address, orders};
  }
  function locked(name, work) {
    return navigator.locks ? navigator.locks.request(name, work) : Promise.resolve().then(work);
  }
  function update(edit) {
    return locked(key, () => {
      const state = read();
      const result = edit(state);
      localStorage.setItem(key, JSON.stringify(state));
      return result;
    });
  }
  function place(menu, expected) {
    return update(s => {
      const items = menu.filter(d => Number.isInteger(s.cart[d.id]) && s.cart[d.id] > 0)
        .map(d => ({id:d.id,name:d.name,price:d.price,qty:s.cart[d.id]}));
      if (!items.length || !s.address) throw Error('Check your cart and delivery address.');
      if (JSON.stringify([s.cart,s.address]) !== expected) throw Error('Your order changed. Review the updated details.');
      const date = new Date().toISOString();
      const order = {id:uuid().toUpperCase(),date,items,total:items.reduce((n,i)=>n+i.price*i.qty,0),
        status:'Received',history:[{status:'Received',at:date}],address:{...s.address}};
      s.orders.unshift(order);
      s.cart = {};
      return order.id;
    });
  }
  function advance(id, expected, next) {
    return update(s => {
      const order = s.orders.find(o => o.id === id);
      if (!order || order.status !== expected) throw Error('This order has changed. Check its current status.');
      const pos = steps.indexOf(expected);
      if (pos < 0 || pos === steps.length-1 || (next !== 'Cancelled' && next !== steps[pos+1])) throw Error('This status change is unavailable.');
      order.status = next;
      order.history.push({status:next,at:new Date().toISOString()});
    });
  }
  const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = amount => '₹'+Number(amount).toLocaleString('en-IN');
  const shortId = id => String(id).split('-')[0];
  const addressText = a => [a?.street,a?.city,a?.pin].filter(Boolean).map(escape).join(', ');
  const when = date => new Date(date).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
  function receipt(order) {
    const a=order.address || {};
    return '<ul class="receiptLines">'+order.items.map(i=>'<li><span>'+escape(i.qty)+' × '+escape(i.name)+'</span><b>'+money(i.price*i.qty)+'</b></li>').join('')+'</ul><div class="receiptTotal"><span>Order total</span><b>'+money(order.total)+'</b></div><div class="receiptAddress"><b>Delivery to '+escape(a.name)+'</b><p>'+addressText(a)+'</p><p>'+escape(a.phone)+'</p></div>';
  }
  return {key,steps,statuses,read,update,locked,place,advance,uuid,escape,money,shortId,addressText,when,receipt};
})();
