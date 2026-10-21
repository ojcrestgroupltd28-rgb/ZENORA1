(() => {
  "use strict";

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  const STORE_KEY = "zenora_store_v1";
  const ORDERS_KEY = "zenora_demo_orders_v1";

  const defaultCategories = [
    "Phones & Tablets",
    "Computers",
    "Electronics",
    "Fashion",
    "Beauty",
    "Home & Living",
    "Groceries",
    "Health & Personal Care",
    "Sports",
    "Gaming",
    "Baby & Kids",
    "Automotive",
    "Books & Education",
    "Jewelry & Watches",
    "Office Supplies"
  ];

  const seed = [
    {
      id: "z101",
      name: "Zenith Wireless Headphones",
      category: "Electronics",
      price: 38500,
      oldPrice: 45000,
      stock: 18,
      featured: true,
      isNew: true,
      rating: 4.8,
      reviews: 26,
      brand: "Zenith",
      image: "",
      description: "Comfortable wireless headphones for daily listening, work and travel.",
      specs: [
        "Connectivity: Wireless",
        "Warranty: As listed by seller",
        "Colour: Black"
      ]
    },
    {
      id: "z102",
      name: "Everyday Smart Watch",
      category: "Electronics",
      price: 52500,
      oldPrice: 0,
      stock: 12,
      featured: true,
      isNew: true,
      rating: 4.6,
      reviews: 18,
      brand: "Zenora Select",
      image: "",
      description: "A versatile smartwatch for everyday activity and notifications.",
      specs: [
        "Display: As listed by seller",
        "Compatibility: Check listing",
        "Warranty: As listed by seller"
      ]
    },
    {
      id: "z103",
      name: "Classic Street Sneakers",
      category: "Fashion",
      price: 32000,
      oldPrice: 40000,
      stock: 7,
      featured: true,
      isNew: false,
      rating: 4.7,
      reviews: 31,
      brand: "Urban Step",
      image: "",
      description: "An easy everyday sneaker with a clean, versatile design.",
      specs: [
        "Sizes: Confirm with seller",
        "Colour: As listed",
        "Material: As listed by seller"
      ]
    },
    {
      id: "z104",
      name: "Everyday Backpack",
      category: "Fashion",
      price: 18500,
      oldPrice: 0,
      stock: 24,
      featured: false,
      isNew: true,
      rating: 4.5,
      reviews: 14,
      brand: "Northline",
      image: "",
      description: "A practical backpack for work, school and daily essentials.",
      specs: [
        "Compartments: As listed",
        "Material: As listed by seller",
        "Warranty: As listed by seller"
      ]
    },
    {
      id: "z105",
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 27500,
      oldPrice: 31000,
      stock: 5,
      featured: true,
      isNew: false,
      rating: 4.4,
      reviews: 19,
      brand: "Soundbay",
      image: "",
      description: "Portable sound for your desk, room or outdoor get-togethers.",
      specs: [
        "Connectivity: Bluetooth",
        "Battery: See product packaging",
        "Warranty: As listed by seller"
      ]
    },
    {
      id: "z106",
      name: "Minimal Desk Lamp",
      category: "Home & Living",
      price: 14500,
      oldPrice: 0,
      stock: 3,
      featured: false,
      isNew: true,
      rating: 4.3,
      reviews: 9,
      brand: "Casa Form",
      image: "",
      description: "A minimal desk lamp for a calm and functional workspace.",
      specs: [
        "Power: Check listing",
        "Colour: As listed",
        "Warranty: As listed by seller"
      ]
    },
    {
      id: "z107",
      name: "Daily Care Skin Set",
      category: "Beauty",
      price: 22000,
      oldPrice: 26000,
      stock: 15,
      featured: true,
      isNew: false,
      rating: 4.6,
      reviews: 22,
      brand: "Pure Day",
      image: "",
      description: "A daily skincare set. Check ingredients and suitability before use.",
      specs: [
        "Contents: See packaging",
        "Expiry: Check product packaging",
        "Seller: As listed"
      ]
    },
    {
      id: "z108",
      name: "Compact Laptop Stand",
      category: "Computers",
      price: 16500,
      oldPrice: 0,
      stock: 2,
      featured: false,
      isNew: false,
      rating: 4.5,
      reviews: 11,
      brand: "Deskwise",
      image: "",
      description: "A compact stand designed to help organise your desk setup.",
      specs: [
        "Compatibility: Check dimensions",
        "Material: As listed",
        "Warranty: As listed by seller"
      ]
    },
    {
      id: "z109",
      name: "Cotton Everyday Tee",
      category: "Fashion",
      price: 8500,
      oldPrice: 10000,
      stock: 30,
      featured: false,
      isNew: true,
      rating: 4.2,
      reviews: 7,
      brand: "Plainform",
      image: "",
      description: "A simple everyday T-shirt with an easy-to-style silhouette.",
      specs: [
        "Sizes: Confirm with seller",
        "Fabric: As listed",
        "Care: Follow label"
      ]
    },
    {
      id: "z110",
      name: "Stainless Travel Bottle",
      category: "Home & Living",
      price: 9500,
      oldPrice: 0,
      stock: 21,
      featured: false,
      isNew: true,
      rating: 4.4,
      reviews: 12,
      brand: "Trail & Table",
      image: "",
      description: "A reusable travel bottle for daily hydration.",
      specs: [
        "Capacity: See listing",
        "Material: As listed",
        "Care: Follow instructions"
      ]
    },
    {
      id: "z111",
      name: "Wireless Mouse",
      category: "Computers",
      price: 12000,
      oldPrice: 15000,
      stock: 9,
      featured: true,
      isNew: false,
      rating: 4.5,
      reviews: 17,
      brand: "Deskwise",
      image: "",
      description: "A compact wireless mouse for work, study and everyday computing.",
      specs: [
        "Connectivity: Wireless",
        "Compatibility: Check listing",
        "Warranty: As listed by seller"
      ]
    },
    {
      id: "z112",
      name: "Everyday Crossbody Bag",
      category: "Fashion",
      price: 24000,
      oldPrice: 0,
      stock: 11,
      featured: false,
      isNew: false,
      rating: 4.6,
      reviews: 16,
      brand: "Morrow",
      image: "",
      description: "A versatile crossbody bag for daily essentials.",
      specs: [
        "Material: As listed by seller",
        "Colour: Check options",
        "Warranty: As listed"
      ]
    }
  ];

  const money = n =>
    "₦" + Number(n || 0).toLocaleString("en-NG", {
      maximumFractionDigits: 0
    });

  const esc = s =>
    String(s ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  const read = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const save = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

  function load() {
    let store = read(STORE_KEY, null);

    if (!store || !Array.isArray(store.products)) {
      store = {
        products: seed,
        categories: defaultCategories,
        announcement: ""
      };
    }

    store.categories = [
      ...new Set([
        ...(store.categories || []),
        ...defaultCategories
      ])
    ];

    return store;
  }

  let state = load();
  let orders = read(ORDERS_KEY, []);

  function persist() {
    save(STORE_KEY, state);
  }

  function toast(message) {
    const element = $("#adminToast");

    if (!element) {
      console.log(message);
      return;
    }

    element.textContent = message;
    element.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
      element.classList.remove("show");
    }, 2500);
  }

  function switchTab(tab) {
    $$(".side-link").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.tab === tab
      );
    });

    $$(".admin-panel").forEach(panel => {
      panel.classList.toggle(
        "active",
        panel.id === "tab-" + tab
      );
    });

    const names = {
      overview: "Overview",
      products: "Products",
      orders: "Orders",
      categories: "Categories",
      promotions: "Promotions",
      customers: "Customers",
      reports: "Reports"
    };

    const pageTitle = $("#adminPageTitle");

    if (pageTitle) {
      pageTitle.textContent = names[tab] || "Overview";
    }

    if (tab === "overview") renderOverview();
    if (tab === "products") renderProducts();
    if (tab === "orders") renderOrders();
    if (tab === "categories") renderCategories();
    if (tab === "customers") renderCustomers();
    if (tab === "reports") renderReports();
  }

  function renderCategoryOptions() {
    const productCategory = $("#productCategory");
    const adminCategory = $("#adminProductCategory");

    if (!productCategory || !adminCategory) return;

    const selected = productCategory.value;
    const filterSelected = adminCategory.value;

    const options = state.categories
      .map(category =>
        `<option value="${esc(category)}">${esc(category)}</option>`
      )
      .join("");

    productCategory.innerHTML = options;

    adminCategory.innerHTML =
      '<option value="">All categories</option>' + options;

    if (state.categories.includes(selected)) {
      productCategory.value = selected;
    }

    if (state.categories.includes(filterSelected)) {
      adminCategory.value = filterSelected;
    }
  }

  function renderOverview() {
    const sales = orders
      .filter(order => order.status !== "Cancelled")
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    $("#metricSales").textContent = money(sales);
    $("#metricOrders").textContent = orders.length;
    $("#metricProducts").textContent = state.products.length;

    $("#metricLowStock").textContent =
      state.products.filter(product => Number(product.stock) <= 5).length;

    $("#inventorySnapshot").innerHTML =
      [...state.products]
        .sort((a, b) => Number(a.stock) - Number(b.stock))
        .slice(0, 5)
        .map(product => `
          <div class="snapshot-row">
            <span>${esc(product.name)}</span>
            <b>${product.stock} left</b>
          </div>
        `)
        .join("") ||
      '<p class="muted">No products yet.</p>';

    $("#recentOrders").innerHTML =
      orders.slice(0, 5)
        .map(order => `
          <div class="snapshot-row">
            <span>${esc(order.id)} · ${esc(order.name)}</span>
            <b>${money(order.total)}</b>
          </div>
        `)
        .join("") ||
      '<p class="muted">No demo orders yet.</p>';
  }

  function renderProducts() {
    const search = $("#adminProductSearch").value.toLowerCase();
    const category = $("#adminProductCategory").value;

    const list = state.products.filter(product =>
      (
        !search ||
        `${product.name} ${product.category} ${product.id}`
          .toLowerCase()
          .includes(search)
      ) &&
      (!category || product.category === category)
    );

    $("#adminProductsTable").innerHTML =
      list.map(product => `
        <tr>
          <td>
            <div class="table-product">
              ${
                product.image
                  ? `<img class="table-thumb" src="${esc(product.image)}" alt="">`
                  : '<span class="table-thumb-fallback">Z</span>'
              }
              <span>
                <strong>${esc(product.name)}</strong><br>
                <small>${esc(product.id)}</small>
              </span>
            </div>
          </td>

          <td>${esc(product.category)}</td>

          <td>
            ${money(product.price)}
            ${
              product.oldPrice > product.price
                ? `<br><small><s>${money(product.oldPrice)}</s></small>`
                : ""
            }
          </td>

          <td>
            ${
              Number(product.stock) <= 5
                ? `<span class="status-badge">${product.stock} left</span>`
                : product.stock
            }
          </td>

          <td>${product.featured ? "Yes" : "No"}</td>

          <td>
            <div class="table-actions">
              <button data-edit="${esc(product.id)}">EDIT</button>
              <button class="delete-btn" data-delete="${esc(product.id)}">
                DELETE
              </button>
            </div>
          </td>
        </tr>
      `).join("") ||
      '<tr><td colspan="6">No products match your search.</td></tr>';
  }

  function renderOrders() {
    const search = $("#orderSearch").value.toLowerCase();
    const status = $("#orderStatusFilter").value;

    const list = orders.filter(order =>
      (
        !search ||
        `${order.id} ${order.name} ${order.email}`
          .toLowerCase()
          .includes(search)
      ) &&
      (!status || order.status === status)
    );

    $("#ordersTable").innerHTML =
      list.map(order => `
        <tr>
          <td><strong>${esc(order.id)}</strong></td>

          <td>
            ${esc(order.name)}<br>
            <small>${esc(order.email)}</small>
          </td>

          <td>${new Date(order.date).toLocaleDateString()}</td>

          <td>${money(order.total)}</td>

          <td>${esc(order.payment || "Demo")}</td>

          <td>
            <span class="status-badge ${
              order.status === "Delivered"
                ? "delivered"
                : order.status === "Cancelled"
                  ? "cancelled"
                  : ""
            }">
              ${esc(order.status)}
            </span>
          </td>

          <td>
            <select class="status-select" data-status="${esc(order.id)}">
              ${
                ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
                  .map(statusOption => `
                    <option ${
                      order.status === statusOption ? "selected" : ""
                    }>${statusOption}</option>
                  `)
                  .join("")
              }
            </select>
          </td>
        </tr>
      `).join("") ||
      '<tr><td colspan="7">No orders recorded yet.</td></tr>';
  }

  function renderCategories() {
    renderCategoryOptions();

    $("#categoryList").innerHTML =
      state.categories.map(category => `
        <div class="category-admin-row">
          <span>${esc(category)}</span>
          <button data-remove-category="${esc(category)}">REMOVE</button>
        </div>
      `).join("");

    $("#announcementInput").value = state.announcement || "";
  }

  function renderCustomers() {
    const customers = new Map();

    orders.forEach(order => {
      const key = order.email || order.name;

      const customer = customers.get(key) || {
        name: order.name,
        email: order.email,
        phone: order.phone,
        count: 0
      };

      customer.count++;
      customers.set(key, customer);
    });

    $("#customersTable").innerHTML =
      [...customers.values()]
        .map(customer => `
          <tr>
            <td>${esc(customer.name)}</td>
            <td>${esc(customer.email)}</td>
            <td>${esc(customer.phone)}</td>
            <td>${customer.count}</td>
          </tr>
        `)
        .join("") ||
      '<tr><td colspan="4">No demo customers yet.</td></tr>';
  }

  function renderReports() {
    const inventoryValue = state.products.reduce(
      (sum, product) =>
        sum + Number(product.price) * Number(product.stock),
      0
    );

    const totalOrders = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    $("#reportInventoryValue").textContent = money(inventoryValue);

    $("#reportAverageOrder").textContent =
      money(orders.length ? totalOrders / orders.length : 0);

    $("#reportUnits").textContent =
      state.products.reduce(
        (sum, product) => sum + Number(product.stock || 0),
        0
      );

    $("#reportDelivered").textContent =
      orders.filter(order => order.status === "Delivered").length;
  }

  function openEditor(product) {
    $("#productForm").reset();

    $("#editProductId").value = product?.id || "";

    $("#productEditorTitle").textContent =
      product ? "Edit product" : "Add product";

    $("#productName").value = product?.name || "";
    $("#productPrice").value = product?.price ?? "";
    $("#productOldPrice").value = product?.oldPrice || "";

    $("#productCategory").value =
      product?.category || state.categories[0] || "";

    $("#productStock").value = product?.stock ?? 0;
    $("#productImage").value = product?.image || "";

    $("#productDescription").value = product?.description || "";

    $("#productSpecs").value =
      (product?.specs || []).join("\n");

    $("#productFeatured").checked = !!product?.featured;
    $("#productNew").checked = !!product?.isNew;

    selectedProductImage = null;

    if (imageFileInput) imageFileInput.value = "";

    if (imagePreview) {
      if (product?.image) {
        imagePreview.src = product.image;
        imagePreview.style.display = "block";
      } else {
        imagePreview.removeAttribute("src");
        imagePreview.style.display = "none";
      }
    }

    if (imageStatus) {
      imageStatus.textContent =
        "Choose an image from your phone. Maximum size: 20 MB.";
    }

    $("#productEditor").classList.add("show");
  }

  function closeEditor() {
    $("#productEditor").classList.remove("show");
  }

  function csvDownload(filename, rows) {
    const csv = rows.map(row =>
      row.map(value =>
        `"${String(value ?? "").replace(/"/g, '""')}"`
      ).join(",")
    ).join("\r\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;
    anchor.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Supabase image upload setup.

  const imageFileInput = $("#productImageFile");
  const imagePreview = $("#productImagePreview");
  const imageStatus = $("#productImageStatus");

  let zenoraSupabase = null;
  let selectedProductImage = null;

  let supabaseReady = Promise.resolve(null);

  if (
    window.ZENORA_CONFIG?.SUPABASE_URL &&
    window.ZENORA_CONFIG?.SUPABASE_ANON_KEY
  ) {
    supabaseReady = new Promise((resolve, reject) => {
      if (window.supabase?.createClient) {
        try {
          zenoraSupabase = window.supabase.createClient(
            window.ZENORA_CONFIG.SUPABASE_URL,
            window.ZENORA_CONFIG.SUPABASE_ANON_KEY
          );

          resolve(zenoraSupabase);
        } catch (error) {
          reject(error);
        }

        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

      script.onload = () => {
        try {
          if (!window.supabase?.createClient) {
            throw new Error("Supabase library did not initialise.");
          }

          zenoraSupabase = window.supabase.createClient(
            window.ZENORA_CONFIG.SUPABASE_URL,
            window.ZENORA_CONFIG.SUPABASE_ANON_KEY
          );

          resolve(zenoraSupabase);
        } catch (error) {
          reject(error);
        }
      };

      script.onerror = () => {
        reject(new Error(
          "Could not load the image upload service. Check your connection and refresh."
        ));
      };

      document.head.appendChild(script);
    });
  } else {
    supabaseReady = Promise.reject(
      new Error("Supabase configuration is missing.")
    );

    // Prevent an unhandled rejection before an upload is attempted.
    supabaseReady.catch(() => {});
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
    await supabaseReady;

    if (!zenoraSupabase) {
      throw new Error("Supabase is unavailable. Please refresh and try again.");
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
      user.id + "/" +
      Date.now() + "-" +
      Math.random().toString(36).slice(2) +
      "." + safeExtension;

    const { error } = await zenoraSupabase.storage
      .from("zenora-products")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type
      });

    if (error) {
      throw error;
    }

    const { data } = zenoraSupabase.storage
      .from("zenora-products")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  // Navigation buttons.

  $$(".side-link").forEach(button => {
    button.addEventListener("click", () => {
      switchTab(button.dataset.tab);
    });
  });

  $$("[data-goto]").forEach(button => {
    button.addEventListener("click", () => {
      switchTab(button.dataset.goto);
    });
  });

  // Add-product buttons.

  $("#quickAddProduct").addEventListener("click", () => {
    switchTab("products");
    openEditor();
  });

  $("#addProductButton").addEventListener("click", () => {
    openEditor();
  });

  // Search and filters.

  $("#adminProductSearch").addEventListener("input", renderProducts);

  $("#adminProductCategory").addEventListener("change", renderProducts);

  $("#orderSearch").addEventListener("input", renderOrders);

  $("#orderStatusFilter").addEventListener("change", renderOrders);

  // Edit and delete products.

  $("#adminProductsTable").addEventListener("click", event => {
    const editButton = event.target.closest("[data-edit]");

    if (editButton) {
      const product = state.products.find(
        item => item.id === editButton.dataset.edit
      );

      if (product) openEditor(product);

      return;
    }

    const deleteButton = event.target.closest("[data-delete]");

    if (deleteButton) {
      const product = state.products.find(
        item => item.id === deleteButton.dataset.delete
      );

      if (
        product &&
        confirm(`Delete "${product.name}" from this browser's catalogue?`)
      ) {
        state.products = state.products.filter(
          item => item.id !== product.id
        );

        persist();
        renderProducts();
        renderOverview();
        renderReports();

        toast("Product deleted.");
      }
    }
  });

  // Save or update products.

  $("#productForm").addEventListener("submit", async event => {
    event.preventDefault();

    const submitButton = event.submitter;

    try {
      if (submitButton) submitButton.disabled = true;

      const id =
        $("#editProductId").value ||
        "z" + Date.now().toString(36);

      const old = state.products.find(product => product.id === id);

      // Keep the existing image unless a new one is selected.
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
          .map(value => value.trim())
          .filter(Boolean),

        featured: $("#productFeatured").checked,
        isNew: $("#productNew").checked,

        brand: old?.brand || "ZENORA SELECT",
        rating: old?.rating || 0,
        reviews: old?.reviews || 0
      };

      if (old) {
        state.products = state.products.map(item =>
          item.id === id ? product : item
        );
      } else {
        state.products.unshift(product);
      }

      // Save product details in this browser.
      persist();

      selectedProductImage = null;

      if (imageFileInput) {
        imageFileInput.value = "";
      }

      closeEditor();

      renderProducts();
      renderOverview();
      renderReports();

      toast(old ? "Product updated." : "Product added.");

    } catch (error) {
      console.error("ZENORA product save error:", error);

      const message =
        error.message || "Something went wrong. Please try again.";

      if (imageStatus) {
        imageStatus.textContent = message;
      }

      toast(message);

    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });

  // Close product editor.

  $$("[data-close]").forEach(button => {
    button.addEventListener("click", closeEditor);
  });

  // Add categories.

  $("#categoryForm").addEventListener("submit", event => {
    event.preventDefault();

    const category = $("#newCategory").value.trim();

    if (!category) return;

    if (
      state.categories.some(
        item => item.toLowerCase() === category.toLowerCase()
      )
    ) {
      toast("That category already exists.");
      return;
    }

    state.categories.push(category);

    persist();

    $("#newCategory").value = "";

    renderCategories();

    toast("Category added.");
  });

  // Remove categories.

  $("#categoryList").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-category]");

    if (!button) return;

    const category = button.dataset.removeCategory;

    if (
      state.products.some(product => product.category === category)
    ) {
      toast("Move or edit products in this category before removing it.");
      return;
    }

    if (confirm(`Remove category "${category}"?`)) {
      state.categories = state.categories.filter(
        item => item !== category
      );

      persist();
      renderCategories();

      toast("Category removed.");
    }
  });

  // Save announcement.

  $("#announcementForm").addEventListener("submit", event => {
    event.preventDefault();

    state.announcement = $("#announcementInput").value.trim();

    persist();

    toast("Announcement saved in this browser.");
  });

  // Update order status.

  $("#ordersTable").addEventListener("change", event => {
    const select = event.target.closest("[data-status]");

    if (!select) return;

    const order = orders.find(
      item => item.id === select.dataset.status
    );

    if (order) {
      order.status = select.value;

      save(ORDERS_KEY, orders);

      renderOrders();
      renderOverview();
      renderReports();

      toast("Demo order status updated.");
    }
  });

  // Export orders to CSV.

  $("#exportOrders").addEventListener("click", () => {
    csvDownload("zenora-orders.csv", [
      [
        "Order ID",
        "Date",
        "Customer",
        "Email",
        "Phone",
        "Address",
        "Total NGN",
        "Payment",
        "Status"
      ],
      ...orders.map(order => [
        order.id,
        order.date,
        order.name,
        order.email,
        order.phone,
        order.address,
        order.total,
        order.payment,
        order.status
      ])
    ]);
  });

  // Export products to CSV.

  $("#exportProducts").addEventListener("click", () => {
    csvDownload("zenora-products.csv", [
      [
        "ID",
        "Name",
        "Category",
        "Price NGN",
        "Previous Price NGN",
        "Stock",
        "Featured",
        "New Arrival",
        "Image URL",
        "Description",
        "Specifications"
      ],
      ...state.products.map(product => [
        product.id,
        product.name,
        product.category,
        product.price,
        product.oldPrice,
        product.stock,
        product.featured,
        product.isNew,
        product.image,
        product.description,
        (product.specs || []).join("; ")
      ])
    ]);
  });

  // Initial dashboard rendering.

  renderCategoryOptions();
  renderOverview();
  renderProducts();
  renderOrders();
  renderCategories();
  renderCustomers();
  renderReports();

  // Refresh the dashboard when another tab changes local data.

  window.addEventListener("storage", event => {
    if (event.key === STORE_KEY || event.key === ORDERS_KEY) {
      state = load();
      orders = read(ORDERS_KEY, []);

      renderCategoryOptions();
      renderOverview();
      renderProducts();
      renderOrders();
      renderCategories();
      renderCustomers();
      renderReports();
    }
  });
// ZENORA administrator authentication
const zenoraLogin = document.getElementById("zenoraLogin");
const zenoraLoginForm = document.getElementById("zenoraLoginForm");
const zenoraLoginEmail = document.getElementById("zenoraLoginEmail");
const zenoraLoginPassword = document.getElementById("zenoraLoginPassword");
const zenoraLoginMessage = document.getElementById("zenoraLoginMessage");
const zenoraAdminShell = document.querySelector(".admin-shell");

function showZenoraLogin(message = "") {
if (zenoraLogin) {
zenoraLogin.style.display = "flex";
}

if (zenoraAdminShell) {
zenoraAdminShell.style.display = "none";
}

if (zenoraLoginMessage) {
zenoraLoginMessage.textContent = message;
}
}

function showZenoraDashboard() {
if (zenoraLogin) {
zenoraLogin.style.display = "none";
}

if (zenoraAdminShell) {
zenoraAdminShell.style.display = "";
}
}

if (zenoraLoginForm) {
zenoraLoginForm.addEventListener("submit", async (event) => {
event.preventDefault();

const email = zenoraLoginEmail.value.trim();
const password = zenoraLoginPassword.value;

if (zenoraLoginMessage) {
  zenoraLoginMessage.textContent = "Signing in...";
}

try {
  const client = await supabaseReady;

  if (!client) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  if (!data.session) {
    throw new Error("Sign-in did not create a session. Please try again.");
  }

  zenoraLoginPassword.value = "";
  showZenoraDashboard();
} catch (error) {
  showZenoraLogin(
    error.message || "Sign-in failed. Please check your details."
  );
}

});
}

// Check whether an administrator is already signed in.
showZenoraLogin();

supabaseReady
.then(async (client) => {
const { data, error } = await client.auth.getSession();

if (error) {
  showZenoraLogin("Unable to check your session. Please sign in again.");
  return;
}

if (data.session) {
  showZenoraDashboard();
} else {
  showZenoraLogin();
}

})
.catch(() => {
showZenoraLogin(
"Could not connect to Supabase. Check your configuration and internet connection."
);
});
})();
