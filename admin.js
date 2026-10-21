(() => {
"use strict";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const STORE_KEY="zenora_store_v1",ORDERS_KEY="zenora_demo_orders_v1";
const defaultCategories=["Phones & Tablets","Computers","Electronics","Fashion","Beauty","Home & Living","Groceries","Health & Personal Care","Sports","Gaming","Baby & Kids","Automotive","Books & Education","Jewelry & Watches","Office Supplies"];
const seed=[{id:"z101",name:"Zenith Wireless Headphones",category:"Electronics",price:38500,oldPrice:45000,stock:18,featured:true,isNew:true,rating:4.8,reviews:26,brand:"Zenith",image:"",description:"Comfortable wireless headphones for daily listening, work and travel.",specs:["Connectivity: Wireless","Warranty: As listed by seller","Colour: Black"]},{id:"z102",name:"Everyday Smart Watch",category:"Electronics",price:52500,oldPrice:0,stock:12,featured:true,isNew:true,rating:4.6,reviews:18,brand:"Zenora Select",image:"",description:"A versatile smartwatch for everyday activity and notifications.",specs:["Display: As listed by seller","Compatibility: Check listing","Warranty: As listed by seller"]},{id:"z103",name:"Classic Street Sneakers",category:"Fashion",price:32000,oldPrice:40000,stock:7,featured:true,isNew:false,rating:4.7,reviews:31,brand:"Urban Step",image:"",description:"An easy everyday sneaker with a clean, versatile design.",specs:["Sizes: Confirm with seller","Colour: As listed","Material: As listed by seller"]},{id:"z104",name:"Everyday Backpack",category:"Fashion",price:18500,oldPrice:0,stock:24,featured:false,isNew:true,rating:4.5,reviews:14,brand:"Northline",image:"",description:"A practical backpack for work, school and daily essentials.",specs:["Compartments: As listed","Material: As listed by seller","Warranty: As listed by seller"]},{id:"z105",name:"Portable Bluetooth Speaker",category:"Electronics",price:27500,oldPrice:31000,stock:5,featured:true,isNew:false,rating:4.4,reviews:19,brand:"Soundbay",image:"",description:"Portable sound for your desk, room or outdoor get-togethers.",specs:["Connectivity: Bluetooth","Battery: See product packaging","Warranty: As listed by seller"]},{id:"z106",name:"Minimal Desk Lamp",category:"Home & Living",price:14500,oldPrice:0,stock:3,featured:false,isNew:true,rating:4.3,reviews:9,brand:"Casa Form",image:"",description:"A minimal desk lamp for a calm and functional workspace.",specs:["Power: Check listing","Colour: As listed","Warranty: As listed by seller"]},{id:"z107",name:"Daily Care Skin Set",category:"Beauty",price:22000,oldPrice:26000,stock:15,featured:true,isNew:false,rating:4.6,reviews:22,brand:"Pure Day",image:"",description:"A daily skincare set. Check ingredients and suitability before use.",specs:["Contents: See packaging","Expiry: Check product packaging","Seller: As listed"]},{id:"z108",name:"Compact Laptop Stand",category:"Computers",price:16500,oldPrice:0,stock:2,featured:false,isNew:false,rating:4.5,reviews:11,brand:"Deskwise",image:"",description:"A compact stand designed to help organise your desk setup.",specs:["Compatibility: Check dimensions","Material: As listed","Warranty: As listed by seller"]},{id:"z109",name:"Cotton Everyday Tee",category:"Fashion",price:8500,oldPrice:10000,stock:30,featured:false,isNew:true,rating:4.2,reviews:7,brand:"Plainform",image:"",description:"A simple everyday T-shirt with an easy-to-style silhouette.",specs:["Sizes: Confirm with seller","Fabric: As listed","Care: Follow label"]},{id:"z110",name:"Stainless Travel Bottle",category:"Home & Living",price:9500,oldPrice:0,stock:21,featured:false,isNew:true,rating:4.4,reviews:12,brand:"Trail & Table",image:"",description:"A reusable travel bottle for daily hydration.",specs:["Capacity: See listing","Material: As listed","Care: Follow instructions"]},{id:"z111",name:"Wireless Mouse",category:"Computers",price:12000,oldPrice:15000,stock:9,featured:true,isNew:false,rating:4.5,reviews:17,brand:"Deskwise",image:"",description:"A compact wireless mouse for work, study and everyday computing.",specs:["Connectivity: Wireless","Compatibility: Check listing","Warranty: As listed by seller"]},{id:"z112",name:"Everyday Crossbody Bag",category:"Fashion",price:24000,oldPrice:0,stock:11,featured:false,isNew:false,rating:4.6,reviews:16,brand:"Morrow",image:"",description:"A versatile crossbody bag for daily essentials.",specs:["Material: As listed by seller","Colour: Check options","Warranty: As listed"]}];
const money=n=>"₦"+Number(n||0).toLocaleString("en-NG",{maximumFractionDigits:0});
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}},save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function load(){let s=read(STORE_KEY,null);if(!s||!Array.isArray(s.products))s={products:seed,categories:defaultCategories,announcement:""};s.categories=[...new Set([...(s.categories||[]),...defaultCategories])];return s}
let state=load(),orders=read(ORDERS_KEY,[]);
function persist(){save(STORE_KEY,state)}
function toast(m){const t=$("#adminToast");t.textContent=m;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2500)}
function switchTab(tab){$$(".side-link").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));$$(".admin-panel").forEach(p=>p.classList.toggle("active",p.id==="tab-"+tab));const names={overview:"Overview",products:"Products",orders:"Orders",categories:"Categories",promotions:"Promotions",customers:"Customers",reports:"Reports"};$("#adminPageTitle").textContent=names[tab]||"Overview";if(tab==="overview")renderOverview();if(tab==="products")renderProducts();if(tab==="orders")renderOrders();if(tab==="categories")renderCategories();if(tab==="customers")renderCustomers();if(tab==="reports")renderReports()}
function renderCategoryOptions(){const opts=state.categories.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");$("#productCategory").innerHTML=opts;$("#adminProductCategory").innerHTML='<option value="">All categories</option>'+opts}
function renderOverview(){const sales=orders.filter(o=>o.status!=="Cancelled").reduce((s,o)=>s+Number(o.total||0),0);$("#metricSales").textContent=money(sales);$("#metricOrders").textContent=orders.length;$("#metricProducts").textContent=state.products.length;$("#metricLowStock").textContent=state.products.filter(p=>Number(p.stock)<=5).length;$("#inventorySnapshot").innerHTML=[...state.products].sort((a,b)=>a.stock-b.stock).slice(0,5).map(p=>`<div class="snapshot-row"><span>${esc(p.name)}</span><b>${p.stock} left</b></div>`).join("")||'<p class="muted">No products yet.</p>';$("#recentOrders").innerHTML=orders.slice(0,5).map(o=>`<div class="snapshot-row"><span>${esc(o.id)} · ${esc(o.name)}</span><b>${money(o.total)}</b></div>`).join("")||'<p class="muted">No demo orders yet.</p>'}
function renderProducts(){const q=$("#adminProductSearch").value.toLowerCase(),cat=$("#adminProductCategory").value;const list=state.products.filter(p=>(!q||`${p.name} ${p.category} ${p.id}`.toLowerCase().includes(q))&&(!cat||p.category===cat));$("#adminProductsTable").innerHTML=list.map(p=>`<tr><td><div class="table-product">${p.image?`<img class="table-thumb" src="${esc(p.image)}" alt="">`:'<span class="table-thumb-fallback">Z</span>'}<span><strong>${esc(p.name)}</strong><br><small>${esc(p.id)}</small></span></div></td><td>${esc(p.category)}</td><td>${money(p.price)}${p.oldPrice>p.price?`<br><small><s>${money(p.oldPrice)}</s></small>`:""}</td><td>${p.stock<=5?`<span class="status-badge">${p.stock} left</span>`:p.stock}</td><td>${p.featured?"Yes":"No"}</td><td><div class="table-actions"><button data-edit="${esc(p.id)}">EDIT</button><button class="delete-btn" data-delete="${esc(p.id)}">DELETE</button></div></td></tr>`).join("")||'<tr><td colspan="6">No products match your search.</td></tr>'}
function renderOrders(){const q=$("#orderSearch").value.toLowerCase(),status=$("#orderStatusFilter").value;const list=orders.filter(o=>(!q||`${o.id} ${o.name} ${o.email}`.toLowerCase().includes(q))&&(!status||o.status===status));$("#ordersTable").innerHTML=list.map(o=>`<tr><td><strong>${esc(o.id)}</strong></td><td>${esc(o.name)}<br><small>${esc(o.email)}</small></td><td>${new Date(o.date).toLocaleDateString()}</td><td>${money(o.total)}</td><td>${esc(o.payment||"Demo")}</td><td><span class="status-badge ${o.status==="Delivered"?"delivered":o.status==="Cancelled"?"cancelled":""}">${esc(o.status)}</span></td><td><select class="status-select" data-status="${esc(o.id)}">${["Pending","Processing","Shipped","Delivered","Cancelled"].map(s=>`<option ${o.status===s?"selected":""}>${s}</option>`).join("")}</select></td></tr>`).join("")||'<tr><td colspan="7">No orders recorded yet.</td></tr>'}
function renderCategories(){renderCategoryOptions();$("#categoryList").innerHTML=state.categories.map(c=>`<div class="category-admin-row"><span>${esc(c)}</span><button data-remove-category="${esc(c)}">REMOVE</button></div>`).join("");$("#announcementInput").value=state.announcement||""}
function renderCustomers(){const byEmail=new Map();orders.forEach(o=>{const k=o.email||o.name;const old=byEmail.get(k)||{name:o.name,email:o.email,phone:o.phone,count:0};old.count++;byEmail.set(k,old)});$("#customersTable").innerHTML=[...byEmail.values()].map(c=>`<tr><td>${esc(c.name)}</td><td>${esc(c.email)}</td><td>${esc(c.phone)}</td><td>${c.count}</td></tr>`).join("")||'<tr><td colspan="4">No demo customers yet.</td></tr>'}
function renderReports(){const value=state.products.reduce((s,p)=>s+p.price*p.stock,0),total=orders.reduce((s,o)=>s+Number(o.total||0),0);$("#reportInventoryValue").textContent=money(value);$("#reportAverageOrder").textContent=money(orders.length?total/orders.length:0);$("#reportUnits").textContent=state.products.reduce((s,p)=>s+Number(p.stock||0),0);$("#reportDelivered").textContent=orders.filter(o=>o.status==="Delivered").length}
function openEditor(p){$("#productForm").reset();$("#editProductId").value=p?.id||"";$("#productEditorTitle").textContent=p?"Edit product":"Add product";$("#productName").value=p?.name||"";$("#productPrice").value=p?.price??"";$("#productOldPrice").value=p?.oldPrice||"";$("#productCategory").value=p?.category||state.categories[0];$("#productStock").value=p?.stock??0;$("#productImage").value=p?.image||"";$("#productDescription").value=p?.description||"";$("#productSpecs").value=(p?.specs||[]).join("\n");$("#productFeatured").checked=!!p?.featured;$("#productNew").checked=!!p?.isNew;$("#productEditor").classList.add("show")}
function closeEditor(){$("#productEditor").classList.remove("show")}
function csvDownload(filename,rows){const csv=rows.map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}
$$(".side-link").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));$$("[data-goto]").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.goto)));
$("#quickAddProduct").addEventListener("click",()=>{switchTab("products");openEditor()});$("#addProductButton").addEventListener("click",()=>openEditor());$("#adminProductSearch").addEventListener("input",renderProducts);$("#adminProductCategory").addEventListener("change",renderProducts);$("#orderSearch").addEventListener("input",renderOrders);$("#orderStatusFilter").addEventListener("change",renderOrders);
$("#adminProductsTable").addEventListener("click",e=>{const edit=e.target.closest("[data-edit]");if(edit){openEditor(state.products.find(p=>p.id===edit.dataset.edit));return}const del=e.target.closest("[data-delete]");if(del){const p=state.products.find(p=>p.id===del.dataset.delete);if(p&&confirm(`Delete "${p.name}" from this browser's catalogue?`)){state.products=state.products.filter(x=>x.id!==p.id);persist();renderProducts();renderOverview();toast("Product deleted.")}}});
// Save ZENORA products and upload selected images
$("#productForm").addEventListener("submit", async e => {
  e.preventDefault();

  const submitButton = e.submitter;

  try {
    if (submitButton) submitButton.disabled = true;

    const id =
      $("#editProductId").value ||
      "z" + Date.now().toString(36);

    const old = state.products.find(p => p.id === id);

    // Keep the existing image unless a new image is selected.
    let imageUrl = $("#productImage").value.trim();

    // Upload a newly selected image to Supabase.
    if (selectedProductImage) {
      imageStatus.textContent = "Uploading product image...";

      imageUrl = await uploadZenoraProductImage(
        selectedProductImage
      );

      $("#productImage").value = imageUrl;

      imagePreview.src = imageUrl;
      imagePreview.style.display = "block";

      imageStatus.textContent = "Image uploaded successfully.";
    }

    const product = {
      id,
      name: $("#productName").value.trim(),
      category: $("#productCategory").value,
      price: Number($("#productPrice").value),
      oldPrice: Number($("#productOldPrice").value || 0),
      stock: Number($("#productStock").value),
      image: imageUrl,
      description: $("#productDescription").value.trim(),
      specs: $("#productSpecs").value
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean),
      featured: $("#productFeatured").checked,
      isNew: $("#productNew").checked,
      brand: old?.brand || "ZENORA SELECT",
      rating: old?.rating || 0,
      reviews: old?.reviews || 0
    };

    if (old) {
      state.products = state.products.map(p =>
        p.id === id ? product : p
      );
    } else {
      state.products.unshift(product);
    }

    // Save to this browser's local storage.
    persist();

    // Clear the selected file after successful saving.
    selectedProductImage = null;
    imageFileInput.value = "";

    closeEditor();
    renderProducts();
    renderOverview();
    renderReports();

    toast(old ? "Product updated." : "Product added.");

  } catch (error) {
    console.error("ZENORA product save error:", error);

    imageStatus.textContent =
      error.message || "Something went wrong. Please try again.";

    toast(error.message || "Could not save the product.");

  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});const id=$("#editProductId").value||"z"+Date.now().toString(36);const old=state.products.find(p=>p.id===id);const p={id,name:$("#productName").value.trim(),category:$("#productCategory").value,price:Number($("#productPrice").value),oldPrice:Number($("#productOldPrice").value||0),stock:Number($("#productStock").value),image:$("#productImage").value.trim(),description:$("#productDescription").value.trim(),specs:$("#productSpecs").value.split("\n").map(x=>x.trim()).filter(Boolean),featured:$("#productFeatured").checked,isNew:$("#productNew").checked,brand:old?.brand||"ZENORA SELECT",rating:old?.rating||0,reviews:old?.reviews||0};if(old)state.products=state.products.map(x=>x.id===id?p:x);else state.products.unshift(p);persist();closeEditor();renderProducts();renderOverview();renderReports();toast(old?"Product updated.":"Product added.");});
$$("[data-close]").forEach(b=>b.addEventListener("click",closeEditor));
$("#categoryForm").addEventListener("submit",e=>{e.preventDefault();const c=$("#newCategory").value.trim();if(!c)return;if(state.categories.some(x=>x.toLowerCase()===c.toLowerCase())){toast("That category already exists.");return}state.categories.push(c);persist();$("#newCategory").value="";renderCategories();toast("Category added.")});
$("#categoryList").addEventListener("click",e=>{const b=e.target.closest("[data-remove-category]");if(!b)return;const c=b.dataset.removeCategory;if(state.products.some(p=>p.category===c)){toast("Move or edit products in this category before removing it.");return}if(confirm(`Remove category "${c}"?`)){state.categories=state.categories.filter(x=>x!==c);persist();renderCategories();toast("Category removed.")}});
$("#announcementForm").addEventListener("submit",e=>{e.preventDefault();state.announcement=$("#announcementInput").value.trim();persist();toast("Announcement saved in this browser.")});
$("#ordersTable").addEventListener("change",e=>{const sel=e.target.closest("[data-status]");if(!sel)return;const o=orders.find(o=>o.id===sel.dataset.status);if(o){o.status=sel.value;save(ORDERS_KEY,orders);renderOrders();renderOverview();renderReports();toast("Demo order status updated.")}});
$("#exportOrders").addEventListener("click",()=>csvDownload("zenora-orders.csv",[["Order ID","Date","Customer","Email","Phone","Address","Total NGN","Payment","Status"],...orders.map(o=>[o.id,o.date,o.name,o.email,o.phone,o.address,o.total,o.payment,o.status])]));
$("#exportProducts").addEventListener("click",()=>csvDownload("zenora-products.csv",[["ID","Name","Category","Price NGN","Previous Price NGN","Stock","Featured","New Arrival","Image URL","Description","Specifications"],...state.products.map(p=>[p.id,p.name,p.category,p.price,p.oldPrice,p.stock,p.featured,p.isNew,p.image,p.description,(p.specs||[]).join("; ")])]));
renderCategoryOptions();renderOverview();renderProducts();renderOrders();renderCategories();renderCustomers();renderReports();
window.addEventListener("storage",e=>{if(e.key===STORE_KEY||e.key===ORDERS_KEY){state=load();orders=read(ORDERS_KEY,[]);renderCategoryOptions();renderOverview();renderProducts();renderOrders();renderCategories();renderCustomers();renderReports()}});
// ZENORA product image upload
const imageFileInput = document.querySelector("#productImageFile");
const imagePreview = document.querySelector("#productImagePreview");
const imageStatus = document.querySelector("#productImageStatus");

let zenoraSupabase = null;
let selectedProductImage = null;

if (window.ZENORA_CONFIG?.SUPABASE_URL &&
    window.ZENORA_CONFIG?.SUPABASE_ANON_KEY) {
  const supabaseScript = document.createElement("script");
  supabaseScript.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  supabaseScript.onload = () => {
    zenoraSupabase = window.supabase.createClient(
      window.ZENORA_CONFIG.SUPABASE_URL,
      window.ZENORA_CONFIG.SUPABASE_ANON_KEY
    );
  };

  supabaseScript.onerror = () => {
    imageStatus.textContent =
      "Could not load the image upload service. Refresh and try again.";
  };

  document.head.appendChild(supabaseScript);
}

if (imageFileInput) {
  imageFileInput.addEventListener("change", event => {
    const file = event.target.files?.[0];

    selectedProductImage = null;

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ];

    if (!allowedTypes.includes(file.type)) {
      imageStatus.textContent =
        "Choose a JPG, PNG, WEBP or GIF image.";
      imageFileInput.value = "";
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      imageStatus.textContent =
        "Image is too large. Maximum size is 20 MB.";
      imageFileInput.value = "";
      return;
    }

    selectedProductImage = file;

    imagePreview.src = URL.createObjectURL(file);
    imagePreview.style.display = "block";

    imageStatus.textContent =
      "Image selected. It will upload when you save the product.";
  });
}

async function uploadZenoraProductImage(file) {
  if (!zenoraSupabase) {
    throw new Error(
      "Supabase is still loading. Wait a moment and try again."
    );
  }

  const {
    data: { user },
    error: authError
  } = await zenoraSupabase.auth.getUser();

  if (authError || !user) {
    throw new Error(
      "Please sign in to your administrator account before uploading."
    );
  }

  const extension = file.name.split(".").pop().toLowerCase();
  const safeExtension =
    ["jpg", "jpeg", "png", "webp", "gif"].includes(extension)
      ? extension
      : "jpg";

  const filePath =
    user.id + "/" + Date.now() + "-" +
    Math.random().toString(36).slice(2) + "." + safeExtension;

  const { error } = await zenoraSupabase.storage
    .from("zenora-products")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

  if (error) throw error;

  const { data } = zenoraSupabase.storage
    .from("zenora-products")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
})();