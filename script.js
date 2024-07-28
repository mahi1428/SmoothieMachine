// Smoothie class to create smoothie objects
class Smoothie {
    constructor(name, base, fruits, extras) {
        this.name = name; // Smoothie name
        this.base = base; // Base liquid
        this.fruits = fruits; // Array of selected fruits
        this.extras = extras; // Array of selected extras
    }

    // Method to return a description of the smoothie
    getDescription() {
        return `Your smoothie '${this.name}' with ${this.base}, including ${this.fruits.join(", ")} and ${this.extras.join(", ")}.`;
    }
}

// Function to handle smoothie orders
function orderSmoothie() {
    // Get input values
    const name = document.getElementById('name').value;
    const base = document.getElementById('base').value;

    // Collect selected fruits
    const fruits = [];
    document.querySelectorAll('input[name="fruits"]:checked').forEach(fruit => {
        fruits.push(fruit.value);
    });

    // Collect selected extras
    const extras = [];
    document.querySelectorAll('input[name="extras"]:checked').forEach(extra => {
        extras.push(extra.value);
    });

    // Create a new smoothie object
    const smoothie = new Smoothie(name, base, fruits, extras);

    // Display the order summary
    document.getElementById('orderSummary').innerText = smoothie.getDescription();

    // Save order to localStorage
    saveOrder(smoothie);

    // Display all previous orders
    displayPreviousOrders();
}

// Function to save the order in localStorage
function saveOrder(smoothie) {
    let orders = JSON.parse(localStorage.getItem('smoothieOrders')) || [];
    orders.push(smoothie);
    localStorage.setItem('smoothieOrders', JSON.stringify(orders));
}

// Function to display previous orders
function displayPreviousOrders() {
    let orders = JSON.parse(localStorage.getItem('smoothieOrders')) || [];
    const orderList = document.getElementById('previousOrders');
    orderList.innerHTML = '';

    // Create list items for each previous order
    orders.forEach(order => {
        const orderItem = document.createElement('li');
        orderItem.textContent = new Smoothie(order.name, order.base, order.fruits, order.extras).getDescription();
        orderList.appendChild(orderItem);
    });
}

// Function to reset the form and clear localStorage
function resetForm() {
    document.getElementById('smoothieForm').reset();
    document.getElementById('orderSummary').innerText = '';
    localStorage.removeItem('smoothieOrders');
    displayPreviousOrders();
}

// Initialize previous orders on page load
window.onload = displayPreviousOrders;
