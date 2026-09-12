const products=[
 {id:1,name:"Gói Basic",price:49000,icon:"⚡",desc:"Gói dùng thử cho khách mới."},
 {id:2,name:"Gói Pro",price:99000,icon:"🔥",desc:"Gói phổ biến, nhiều quyền lợi."},
 {id:3,name:"Gói Premium",price:199000,icon:"👑",desc:"Gói cao cấp cho người dùng lâu dài."}
];
let cart=JSON.parse(localStorage.getItem("hb_cart")||"[]");
let orders=JSON.parse(localStorage.getItem("hb_orders")||"[]");
let current=localStorage.getItem("hb_user")||"";

const money=n=>n.toLocaleString("vi-VN")+"đ";
function render(){
 document.getElementById("productGrid").innerHTML=products.map(p=>`
 <article class="card"><div class="icon">${p.icon}</div><h3>${p.name}</h3>
 <p class="muted">${p.desc}</p><div class="price">${money(p.price)}</div>
 <button class="primary" onclick="add(${p.id})">Thêm vào giỏ</button></article>`).join("");
 document.getElementById("cartCount").textContent=cart.length;
 document.getElementById("welcome").textContent=current?`Đang đăng nhập: ${current}`:"Chưa đăng nhập";
 document.getElementById("orders").innerHTML=orders.length?orders.map(o=>`
 <div class="order"><b>#${o.id}</b> — ${o.items.map(x=>x.name).join(", ")}
 <br><span class="muted">${money(o.total)} • ${o.status}</span></div>`).join(""):"<p class='muted'>Chưa có đơn hàng.</p>";
}
function register(){
 let u=document.getElementById("username").value.trim(),p=document.getElementById("password").value;
 if(!u||!p)return alert("Nhập tên tài khoản và mật khẩu.");
 let users=JSON.parse(localStorage.getItem("hb_users")||"{}");
 if(users[u])return alert("Tài khoản đã tồn tại.");
 users[u]=p;localStorage.setItem("hb_users",JSON.stringify(users));alert("Đăng ký thành công. Bấm Đăng nhập.");
}
function login(){
 let u=document.getElementById("username").value.trim(),p=document.getElementById("password").value;
 let users=JSON.parse(localStorage.getItem("hb_users")||"{}");
 if(!users[u]||users[u]!==p)return alert("Sai tài khoản hoặc mật khẩu.");
 current=u;localStorage.setItem("hb_user",u);render();
}
function logout(){current="";localStorage.removeItem("hb_user");render()}
function add(id){cart.push(products.find(p=>p.id===id));localStorage.setItem("hb_cart",JSON.stringify(cart));render();alert("Đã thêm vào giỏ.");}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function checkout(){
 if(!cart.length)return "<p>Giỏ hàng đang trống.</p>";
 let total=cart.reduce((s,p)=>s+p.price,0);
 return `<p>${cart.map(p=>`• ${p.name} — ${money(p.price)}`).join("<br>")}</p>
 <hr><h3>Tổng: ${money(total)}</h3>
 <p class="muted">Demo: sau khi bấm đặt hàng, hệ thống tạo đơn tự động. Có thể nối API thanh toán thật ở bước sau.</p>
 <button class="primary" onclick="placeOrder()">Xác nhận đặt hàng</button>`;
}
function openCart(){document.getElementById("checkout").innerHTML=checkout();document.getElementById("modal").classList.remove("hidden")}
function placeOrder(){
 if(!current)return alert("Vui lòng đăng nhập trước khi đặt hàng.");
 let total=cart.reduce((s,p)=>s+p.price,0);
 orders.unshift({id:Date.now().toString().slice(-6),items:cart,total,status:"Đã tạo"});
 localStorage.setItem("hb_orders",JSON.stringify(orders));cart=[];localStorage.setItem("hb_cart","[]");closeModal();render();alert("Đặt hàng thành công!");
}
document.getElementById("cartBtn").onclick=openCart;render();