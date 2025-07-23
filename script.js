const services = [
  { id: 1, name: "Spark Electric", category: "Electricians", price: 40, rating: 4.5, phone: "123-456-7890", email: "contact@sparkelectric.com", address: "123 Electric St" },
  { id: 2, name: "Bright Sparks", category: "Electricians", price: 35, rating: 4.2, phone: "987-654-3210", email: "info@brightsparks.com", address: "456 Wire Ave" },
  { id: 3, name: "Pipe Masters", category: "Plumbers", price: 50, rating: 4.6, phone: "555-234-5678", email: "support@pipemasters.com", address: "789 Water Rd" },
  { id: 4, name: "Flush Experts", category: "Plumbers", price: 45, rating: 4.4, phone: "555-345-6789", email: "contact@flushexperts.com", address: "321 Drain Blvd" },
  { id: 5, name: "Color Splash", category: "Painters", price: 30, rating: 4.7, phone: "555-456-7890", email: "hello@colorsplash.com", address: "654 Paint Ln" },
  { id: 6, name: "Perfect Finish", category: "Painters", price: 28, rating: 4.3, phone: "555-567-8901", email: "info@perfectfinish.com", address: "987 Brush St" },
  { id: 7, name: "AutoFix Garage", category: "Mechanics", price: 55, rating: 4.8, phone: "555-678-9012", email: "service@autofix.com", address: "234 Repair Rd" },
  { id: 8, name: "Car Care Pros", category: "Car Repair", price: 60, rating: 4.5, phone: "555-789-0123", email: "contact@carcarepros.com", address: "567 Auto Blvd" },
  { id: 9, name: "Fresh Mart", category: "Grocery Stores", price: 0, rating: 4.2, phone: "555-890-1234", email: "freshmart@grocery.com", address: "345 Market St" },
  { id: 10, name: "Clean Sweep", category: "Cleaning Services", price: 40, rating: 4.6, phone: "555-901-2345", email: "info@cleansweep.com", address: "678 Clean Ave" },
  { id: 11, name: "Tutor Time", category: "Tutors", price: 25, rating: 4.9, phone: "555-012-3456", email: "hello@tutortime.com", address: "890 Study Rd" },
  { id: 12, name: "Tech Support Co", category: "IT Support", price: 50, rating: 4.4, phone: "555-123-4567", email: "support@techsupport.com", address: "123 Tech Blvd" },
  { id: 13, name: "GreenScape", category: "Landscaping", price: 50, rating: 4.8, phone: "555-666-7777", email: "greenscape@landscaping.com", address: "89 Garden Blvd" },
  { id: 14, name: "LawnPros", category: "Landscaping", price: 45, rating: 4.7, phone: "555-777-8888", email: "lawnpros@landscaping.com", address: "12 Lawn St" },
  { id: 15, name: "Shiny Car Wash", category: "Car Wash", price: 20, rating: 4.5, phone: "555-222-3333", email: "contact@shinycarwash.com", address: "45 Clean St" }
];

const categoryBlocksContainer = document.getElementById("category-blocks");
const categoriesContainer = document.querySelector(".categories-container");
const backBtnContainer = document.querySelector(".back-container");
const backBtn = document.getElementById("back-btn");
const serviceList = document.getElementById("service-list");
const searchContainer = document.getElementById("search-container");
const searchInput = document.getElementById("search-input");
const categorySearchInput = document.getElementById("category-search-input");

let currentCategory = "";

// Show services for a category (and optional search filter)
function showServices(category, filterText = "") {
  currentCategory = category;
  serviceList.innerHTML = "";

  // Remove any existing detail container
  const existingDetail = document.getElementById("service-detail");
  if (existingDetail) existingDetail.remove();

  const filteredServices = services.filter(
    (s) =>
      s.category === category &&
      s.name.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filteredServices.length === 0) {
    serviceList.innerHTML = "<p>No service providers found.</p>";
  } else {
    filteredServices.forEach((service) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", service.id);
      card.style.cursor = "pointer";

      card.innerHTML = `
        <h3>${service.name}</h3>
        <p><strong>Price:</strong> $${service.price}</p>
        <p><strong>Rating:</strong> ${service.rating} ⭐</p>
        <p><strong>Phone:</strong> <a href="tel:${service.phone}">${service.phone}</a></p>
        <p><strong>Email:</strong> <a href="mailto:${service.email}">${service.email}</a></p>
        <p><strong>Address:</strong> ${service.address}</p>
      `;

      card.addEventListener("click", () => {
        showServiceDetails(service.id);
      });

      serviceList.appendChild(card);
    });
  }

  categoriesContainer.classList.add("hidden");
  backBtnContainer.classList.remove("hidden");
  serviceList.classList.remove("hidden");
  searchContainer.classList.remove("hidden");
  searchInput.value = "";
  searchInput.focus();
}

// Show detailed info of a single service provider
function showServiceDetails(serviceId) {
  const service = services.find(s => s.id === serviceId);
  if (!service) return;

  // Hide categories, search, service list
  categoriesContainer.classList.add("hidden");
  backBtnContainer.classList.remove("hidden");
  searchContainer.classList.add("hidden");
  serviceList.classList.add("hidden");

  // Remove previous detail container if exists
  const existingDetail = document.getElementById("service-detail");
  if (existingDetail) existingDetail.remove();

  // Create detail container
  const detailContainer = document.createElement("div");
  detailContainer.id = "service-detail";
  detailContainer.style.maxWidth = "600px";
  detailContainer.style.margin = "0 auto";
  detailContainer.style.background = "white";
  detailContainer.style.borderRadius = "15px";
  detailContainer.style.padding = "1.5rem";
  detailContainer.style.boxShadow = "0 6px 15px rgba(0,0,0,0.12)";
  detailContainer.style.color = "#222";

  detailContainer.innerHTML = `
    <h2>${service.name}</h2>
    <p><strong>Category:</strong> ${service.category}</p>
    <p><strong>Price:</strong> $${service.price}</p>
    <p><strong>Rating:</strong> ${service.rating} ⭐</p>
    <p><strong>Phone:</strong> <a href="tel:${service.phone}">${service.phone}</a></p>
    <p><strong>Email:</strong> <a href="mailto:${service.email}">${service.email}</a></p>
    <p><strong>Address:</strong> ${service.address}</p>
    <button id="detail-back-btn" style="
      margin-top: 1rem; 
      background-color: #0a74da; 
      color: white; 
      padding: 0.6rem 1.2rem; 
      border: none; 
      border-radius: 25px; 
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 5px 12px rgba(10, 116, 218, 0.5);
    ">← Back to list</button>
  `;

  document.querySelector("main").appendChild(detailContainer);

  // Back button inside detail view
  const detailBackBtn = document.getElementById("detail-back-btn");
  detailBackBtn.addEventListener("click", () => {
    detailContainer.remove();
    serviceList.classList.remove("hidden");
    searchContainer.classList.remove("hidden");
  });
}

// Click on category block to show services
categoryBlocksContainer.addEventListener("click", (e) => {
  const block = e.target.closest(".category-block");
  if (block) {
    showServices(block.dataset.category);
  }
});

// Back to categories view
backBtn.addEventListener("click", () => {
  currentCategory = "";
  serviceList.innerHTML = "";
  categoriesContainer.classList.remove("hidden");
  backBtnContainer.classList.add("hidden");
  serviceList.classList.add("hidden");
  searchContainer.classList.add("hidden");
  categorySearchInput.value = "";
  filterCategories("");

  // Remove detail view if open
  const existingDetail = document.getElementById("service-detail");
  if (existingDetail) existingDetail.remove();
});

// Search providers within current category
searchInput.addEventListener("input", (e) => {
  if (!currentCategory) return;
  showServices(currentCategory, e.target.value.trim());
});

// Filter categories based on input
function filterCategories(text) {
  const lowerText = text.toLowerCase();
  const blocks = categoryBlocksContainer.querySelectorAll(".category-block");
  blocks.forEach((block) => {
    const category = block.dataset.category.toLowerCase();
    if (category.includes(lowerText)) {
      block.style.display = "flex";
    } else {
      block.style.display = "none";
    }
  });
}

// Category search filter input
categorySearchInput.addEventListener("input", (e) => {
  filterCategories(e.target.value.trim());
});

