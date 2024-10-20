function showStep2() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    populateExpensesForm();
}

function updateTotal() {
    const inputs = document.querySelectorAll('#expensesForm input[type="number"]');
    let total = 0;
    inputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    const totalPercentage = document.getElementById('totalPercentage');
    totalPercentage.textContent = `Total: ${total}%`;

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

    const form = document.getElementById('expensesForm');
    form.innerHTML = ''; // Clear existing form content

    expensesData.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <label for="expense${index}">${item}:</label>
            <input type="number" id="expense${index}" name="${item}" min="0" max="100" step="0.1" oninput="updateTotal()">
        `;
        form.appendChild(div);
    });

    // Add total percentage display
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = '<span id="totalPercentage">Total: 0%</span>';
    form.appendChild(totalDiv);

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = '<span id="error" style="display:none;">Total must equal 100%</span>';
    form.appendChild(errorDiv);

    // Add calculate button
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = '<button id="calculateButton" onclick="calculateInflation()" style="display:none;">Calculate Inflation</button>';
    form.appendChild(buttonDiv);
}
