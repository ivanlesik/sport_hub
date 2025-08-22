// ===== Робота з корзиною =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Функція для збереження в localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Функція для оновлення лічильника
function updateCartCount() {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.querySelector(".count");
    if (counter) counter.innerText = count > 0 ? count : "";
}

// Викликаємо при завантаженні
updateCartCount();

// Обробка кнопок "Купити" (лише на catalog.html)
document.querySelectorAll(".btn-buy").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const product = e.target.closest(".product");
        const title = product.querySelector("h3").innerText;
        const price = product.querySelector(".price").innerText;
        const img = product.querySelector("img").src;

        const item = { title, price, img, quantity: 1 };

        // Якщо товар вже є в корзині – збільшуємо кількість
        const existingItem = cart.find(p => p.title === item.title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }

        // Зберігаємо і оновлюємо
        saveCart();
        updateCartCount();

        alert(`${title} додано в кошик! ✅`);
    });
});

// ===== Відображення корзини (cart.html) =====
function renderCartPage() {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return; // якщо ми не на cart.html

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Кошик порожній 🛒</p>";
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="product">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <span class="price">${item.price}</span>
            <p>Кількість: ${item.quantity}</p>
        </div>
    `).join("");
}

renderCartPage();


document.getElementById("clear-cart").addEventListener("click", () => {
    cart = []; 
    localStorage.removeItem("cart"); 
    updateCartCount();
    renderCartPage(); 
});
