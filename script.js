let currentStep = 1;
let userLocation = '';
let inflationData = {}; // Changed from const to let

function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
    
    document.querySelectorAll('.nav-button').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-button')[step - 1].classList.add('active');
    
    currentStep = step;
    
    if (step === 2) {
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
    const inputs = document.querySelectorAll('#expensesForm input[type="number"]');
    let personalInflation = 0;
    let totalWeight = 0;
    let calculationDetails = [];

    inputs.forEach(input => {
        const category = input.name;
        const userPercentage = parseFloat(input.value) || 0;
        const inflationKey = userLocation === 'rural' ? 'Reported Inflation - Rural' : 'Reported Inflation - Urban';
        const categoryInflation = inflationData[category][inflationKey];
        
        const weightedInflation = (userPercentage / 100) * categoryInflation;
        personalInflation += weightedInflation;
        totalWeight += userPercentage;

        if (weightedInflation !== 0) {
            calculationDetails.push({
                category,
                userPercentage,
                categoryInflation,
                weightedInflation
            });
        }
    });

    if (totalWeight !== 100) {
        alert('Please ensure your expense percentages total 100% before calculating.');
        return;
    }

    const resultDiv = document.getElementById('inflationResult');
    resultDiv.innerHTML = `
        <h3>Your Personal Inflation Rate</h3>
        <p>Based on your expense distribution and ${userLocation} location, your personal inflation rate is:</p>
        <h2>${personalInflation.toFixed(2)}%</h2>
        <h4>Calculation Breakdown:</h4>
        <table id="calculationTable">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Your %</th>
                    <th>Category Inflation</th>
                    <th>Weighted Inflation</th>
                </tr>
            </thead>
            <tbody>
                ${calculationDetails.map(detail => `
                    <tr>
                        <td>${detail.category}</td>
                        <td>${detail.userPercentage.toFixed(1)}%</td>
                        <td>${detail.categoryInflation.toFixed(2)}%</td>
                        <td>${detail.weightedInflation.toFixed(2)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p>Your personal inflation rate is the sum of all weighted inflation values.</p>
        <p>Note: Categories with 0% weighted inflation are not shown in the breakdown.</p>
    `;

    showStep(3);
}

function populateExpensesForm() {
    const expensesData = Object.keys(inflationData);
    const tableBody = document.querySelector('#expensesTable tbody');
    tableBody.innerHTML = '';

    expensesData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><label for="expense${index}">${item}</label></td>
            <td><input type="number" id="expense${index}" name="${item}" min="0" max="100" step="0.1" oninput="updateTotal()">%</td>
        `;
        tableBody.appendChild(row);
    });
}

function resetWizard() {
    currentStep = 1;
    userLocation = '';
    document.getElementById('name').value = '';
    document.querySelectorAll('input[name="location"]').forEach(radio => radio.checked = false);
    document.getElementById('expensesForm').reset();
    showStep(1);
}

// Initialize the wizard
showStep(1);

// Event listeners for location selection
document.querySelectorAll('input[name="location"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        userLocation = e.target.value;
    });
});

// Populate inflationData object with CSV data
inflationData = {
    "Cereals and products": {"Reported Inflation - Rural": 7.11, "Reported Inflation - Urban": 6.34},
    "Meat and fish": {"Reported Inflation - Rural": 2.66, "Reported Inflation - Urban": 2.59},
    "Egg": {"Reported Inflation - Rural": 6.55, "Reported Inflation - Urban": 5.97},
    "Milk and products": {"Reported Inflation - Rural": 2.81, "Reported Inflation - Urban": 3.3},
    "Oils and fats": {"Reported Inflation - Rural": 2.98, "Reported Inflation - Urban": 1.58},
    "Fruits": {"Reported Inflation - Rural": 8.35, "Reported Inflation - Urban": 6.79},
    "Vegetables": {"Reported Inflation - Rural": 36.04, "Reported Inflation - Urban": 35.88},
    "Pulses and products": {"Reported Inflation - Rural": 9.79, "Reported Inflation - Urban": 9.8},
    "Sugar and Confectionery": {"Reported Inflation - Rural": 3.48, "Reported Inflation - Urban": 3.5},
    "Spices": {"Reported Inflation - Rural": -6.78, "Reported Inflation - Urban": -4.79},
    "Non-alcoholic beverages": {"Reported Inflation - Rural": 2.33, "Reported Inflation - Urban": 3.03},
    "Prepared meals, snacks, sweets etc.": {"Reported Inflation - Rural": 2.95, "Reported Inflation - Urban": 4.29},
    "Pan, tobacco and intoxicants": {"Reported Inflation - Rural": 2.32, "Reported Inflation - Urban": 2.94},
    "Clothing": {"Reported Inflation - Rural": 2.69, "Reported Inflation - Urban": 3},
    "Footwear": {"Reported Inflation - Rural": 1.58, "Reported Inflation - Urban": 2.64},
    "Housing": {"Reported Inflation - Rural": 0, "Reported Inflation - Urban": 2.78},
    "Fuel and light": {"Reported Inflation - Rural": -0.33, "Reported Inflation - Urban": -3.25},
    "Household goods and services": {"Reported Inflation - Rural": 2.15, "Reported Inflation - Urban": 3.09},
    "Health": {"Reported Inflation - Rural": 3.94, "Reported Inflation - Urban": 4.38},
    "Transport and communication": {"Reported Inflation - Rural": 2.92, "Reported Inflation - Urban": 2.54},
    "Recreation and amusement": {"Reported Inflation - Rural": 2.22, "Reported Inflation - Urban": 2.45},
    "Education": {"Reported Inflation - Rural": 3.62, "Reported Inflation - Urban": 3.94},
    "Personal care and effects": {"Reported Inflation - Rural": 8.81, "Reported Inflation - Urban": 9.3}
};
