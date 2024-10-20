let currentStep = 1;

function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
    
    document.querySelectorAll('.nav-button').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-button')[step - 1].classList.add('active');
    
    currentStep = step;
    
    if (step === 2 && document.getElementById('expensesTable').querySelector('tbody').children.length === 0) {
        populateExpensesForm();
    }
}

function updateTotal() {
    const inputs = document.querySelectorAll('#expensesForm input[type="number"]');
    let total = 0;
    inputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    const totalPercentage = document.getElementById('totalPercentage');
    totalPercentage.textContent = `Total: ${total.toFixed(1)}%`;

    const error = document.getElementById('error');
    const calculateButton = document.getElementById('calculateButton');
    if (total === 100) {
        totalPercentage.classList.add('ok');
        error.style.display = 'none';
        calculateButton.style.display = 'block';
    } else {
        totalPercentage.classList.remove('ok');
        error.style.display = 'block';
        calculateButton.style.display = 'none';
    }
}

function calculateInflation() {
    // Placeholder for inflation calculation logic
    alert('Calculating inflation...');
}

function populateExpensesForm() {
    const expensesData = [
        "Cereals and products",
        "Meat and fish",
        "Egg",
        "Milk and products",
        "Oils and fats",
        "Fruits",
        "Vegetables",
        "Pulses and products",
        "Sugar and Confectionery",
        "Spices",
        "Non-alcoholic beverages",
        "Prepared meals, snacks, sweets etc.",
        "Pan, tobacco and intoxicants",
        "Clothing",
        "Footwear",
        "Housing",
        "Fuel and light",
        "Household goods and services",
        "Health",
        "Transport and communication",
        "Recreation and amusement",
        "Education",
        "Personal care and effects"
    ];

    const tableBody = document.querySelector('#expensesTable tbody');
    tableBody.innerHTML = ''; // Clear existing table content

    expensesData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><label for="expense${index}">${item}</label></td>
            <td><input type="number" id="expense${index}" name="${item}" min="0" max="100" step="0.1" oninput="updateTotal()">%</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize the first step
showStep(1);
