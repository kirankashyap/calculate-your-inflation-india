let currentStep = 1;
let userLocation = '';
let inflationData = {}; // Changed from const to let

function showStep(step) {
    // Prevent moving to step 3 if the button is disabled
    if (step === 3 && document.getElementById('step3Button').disabled) {
        return;
    }

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
    let personalInflationSince2012 = 0;
    let totalWeight = 0;
    let calculationDetails = [];

    inputs.forEach(input => {
        const category = input.name;
        const userPercentage = parseFloat(input.value) || 0;
        const inflationKey = userLocation === 'rural' ? 'Reported Inflation - Rural' : 'Reported Inflation - Urban';
        const categoryInflation = inflationData[category][inflationKey];
        const indexKey = userLocation === 'rural' ? 'Rural Sep 2024 Index' : 'Urban Sep 2024 Index';
        const categoryIndex2024 = inflationData[category][indexKey];
        
        const weightedInflation = (userPercentage / 100) * categoryInflation;
        personalInflation += weightedInflation;
        
        const inflationSince2012 = ((categoryIndex2024 / 100) - 1) * 100;
        const weightedInflationSince2012 = (userPercentage / 100) * inflationSince2012;
        personalInflationSince2012 += weightedInflationSince2012;
        
        totalWeight += userPercentage;

        if (weightedInflation !== 0) {
            calculationDetails.push({
                category,
                userPercentage,
                categoryInflation,
                weightedInflation,
                inflationSince2012: inflationSince2012.toFixed(2),
                weightedInflationSince2012: weightedInflationSince2012.toFixed(2)
            });
        }
    });

    if (totalWeight !== 100) {
        alert('Please ensure your expense percentages total 100% before calculating.');
        return;
    }

    const resultDiv = document.getElementById('inflationResult');
    const userName = document.getElementById('name').value.trim();
    const personalGreeting = userName ? `<h3>Hello ${userName}!</h3>` : '';
    var text = 'You can also calculate your personal inflation rate at https://kirankashyap.github.io/calculate-your-inflation-india/'
    const shareText = `My personal inflation rate is ${personalInflation.toFixed(2)}% for 2023-2024, and ${personalInflationSince2012.toFixed(2)}% since 2012. ${text}`;
    const encodedShareText = encodeURIComponent(shareText);

    resultDiv.innerHTML = `
        ${personalGreeting}
        <div class="result-box">
            <h3>Your Personal Inflation Rate</h3>
            <p>Based on your expense distribution and <span class="highlight">${userLocation}</span> location:</p>
            <div class="inflation-result">
                <div class="inflation-item">
                    <span class="label">2023-2024 Inflation: </span>
                    <span class="value">${personalInflation.toFixed(2)}%</span>
                </div>
                <p class="explanation">This means that in 2024, your expenses are approximately <span class="highlight">${personalInflation.toFixed(2)}%</span> more than in 2023 due to inflation.</p>
            </div>
            <div class="inflation-result">
                <div class="inflation-item">
                    <span class="label">Inflation Since 2012: </span>
                    <span class="value">${personalInflationSince2012.toFixed(2)}%</span>
                </div>
                <p class="explanation">This means that your expenses have increased by approximately <span class="highlight">${personalInflationSince2012.toFixed(2)}%</span> since 2012 due to inflation.</p>
            </div>
        </div>
        <h4>Calculation Breakdown:</h4>
        <table id="calculationTable">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Your %</th>
                    <th>2023-2024 Inflation</th>
                    <th>Weighted 2023-2024</th>
                    <th>Inflation Since 2012</th>
                    <th>Weighted Since 2012</th>
                </tr>
            </thead>
            <tbody>
                ${calculationDetails.map(detail => `
                    <tr>
                        <td data-label="Category"><span>${detail.category}</span></td>
                        <td data-label="Your %"><span>${detail.userPercentage.toFixed(1)}%</span></td>
                        <td data-label="2023-2024 Inflation"><span>${detail.categoryInflation.toFixed(2)}%</span></td>
                        <td data-label="Weighted 2023-2024"><span>${detail.weightedInflation.toFixed(2)}%</span></td>
                        <td data-label="Inflation Since 2012"><span>${detail.inflationSince2012}%</span></td>
                        <td data-label="Weighted Since 2012"><span>${detail.weightedInflationSince2012}%</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p>Your personal inflation rates are the sum of all weighted inflation values.</p>
        <p>Note: Categories with 0% weighted inflation are not shown in the breakdown.</p>
        <p class="data-source">Category inflation data has been taken from the Ministry of Statistics and Programme Implementation. For more information, visit <a href="https://mospi.gov.in/cpi" target="_blank">https://mospi.gov.in/cpi</a>.</p>
        <div class="share-buttons">
            <p>Share your result:</p>
            <a href="https://api.whatsapp.com/send?text=${encodedShareText}" target="_blank" class="share-button whatsapp"><i class="fab fa-whatsapp"></i></a>
            <a href="https://t.me/share/url?url=${shareText}" target="_blank" class="share-button telegram"><i class="fab fa-telegram-plane"></i></a>
        </div>
    `;

    // Enable the Step 3 button after calculation
    document.getElementById('step3Button').disabled = false;

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
    
    // Disable the Step 3 button when resetting
    document.getElementById('step3Button').disabled = true;
    
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
    "Cereals and products": {"Reported Inflation - Rural": 7.11, "Reported Inflation - Urban": 6.34, "Rural Sep 2024 Index": 194.3, "Urban Sep 2024 Index": 192.8},
    "Meat and fish": {"Reported Inflation - Rural": 2.66, "Reported Inflation - Urban": 2.59, "Rural Sep 2024 Index": 220.2, "Urban Sep 2024 Index": 229.5},
    "Egg": {"Reported Inflation - Rural": 6.55, "Reported Inflation - Urban": 5.97, "Rural Sep 2024 Index": 190.2, "Urban Sep 2024 Index": 195.2},
    "Milk and products": {"Reported Inflation - Rural": 2.81, "Reported Inflation - Urban": 3.3, "Rural Sep 2024 Index": 186.6, "Urban Sep 2024 Index": 187.6},
    "Oils and fats": {"Reported Inflation - Rural": 2.98, "Reported Inflation - Urban": 1.58, "Rural Sep 2024 Index": 169.4, "Urban Sep 2024 Index": 160.8},
    "Fruits": {"Reported Inflation - Rural": 8.35, "Reported Inflation - Urban": 6.79, "Rural Sep 2024 Index": 188.1, "Urban Sep 2024 Index": 195.1},
    "Vegetables": {"Reported Inflation - Rural": 36.04, "Reported Inflation - Urban": 35.88, "Rural Sep 2024 Index": 251.0, "Urban Sep 2024 Index": 306.4},
    "Pulses and products": {"Reported Inflation - Rural": 9.79, "Reported Inflation - Urban": 9.8, "Rural Sep 2024 Index": 214.1, "Urban Sep 2024 Index": 219.7},
    "Sugar and Confectionery": {"Reported Inflation - Rural": 3.48, "Reported Inflation - Urban": 3.5, "Rural Sep 2024 Index": 131.0, "Urban Sep 2024 Index": 132.9},
    "Spices": {"Reported Inflation - Rural": -6.78, "Reported Inflation - Urban": -4.79, "Rural Sep 2024 Index": 229.6, "Urban Sep 2024 Index": 224.7},
    "Non-alcoholic beverages": {"Reported Inflation - Rural": 2.33, "Reported Inflation - Urban": 3.03, "Rural Sep 2024 Index": 184.7, "Urban Sep 2024 Index": 173.3},
    "Prepared meals, snacks, sweets etc.": {"Reported Inflation - Rural": 2.95, "Reported Inflation - Urban": 4.29, "Rural Sep 2024 Index": 198.9, "Urban Sep 2024 Index": 209.3},
    "Pan, tobacco and intoxicants": {"Reported Inflation - Rural": 2.32, "Reported Inflation - Urban": 2.94, "Rural Sep 2024 Index": 206.9, "Urban Sep 2024 Index": 213.3},
    "Clothing": {"Reported Inflation - Rural": 2.69, "Reported Inflation - Urban": 3, "Rural Sep 2024 Index": 198.5, "Urban Sep 2024 Index": 188.7},
    "Footwear": {"Reported Inflation - Rural": 1.58, "Reported Inflation - Urban": 2.64, "Rural Sep 2024 Index": 192.4, "Urban Sep 2024 Index": 174.7},
    "Housing": {"Reported Inflation - Rural": 0, "Reported Inflation - Urban": 2.78, "Rural Sep 2024 Index": 100, "Urban Sep 2024 Index": 181.1},
    "Fuel and light": {"Reported Inflation - Rural": -0.33, "Reported Inflation - Urban": -3.25, "Rural Sep 2024 Index": 181.0, "Urban Sep 2024 Index": 169.8},
    "Household goods and services": {"Reported Inflation - Rural": 2.15, "Reported Inflation - Urban": 3.09, "Rural Sep 2024 Index": 185.2, "Urban Sep 2024 Index": 177.0},
    "Health": {"Reported Inflation - Rural": 3.94, "Reported Inflation - Urban": 4.38, "Rural Sep 2024 Index": 197.9, "Urban Sep 2024 Index": 193.0},
    "Transport and communication": {"Reported Inflation - Rural": 2.92, "Reported Inflation - Urban": 2.54, "Rural Sep 2024 Index": 176.3, "Urban Sep 2024 Index": 165.4},
    "Recreation and amusement": {"Reported Inflation - Rural": 2.22, "Reported Inflation - Urban": 2.45, "Rural Sep 2024 Index": 179.8, "Urban Sep 2024 Index": 175.4},
    "Education": {"Reported Inflation - Rural": 3.62, "Reported Inflation - Urban": 3.94, "Rural Sep 2024 Index": 191.6, "Urban Sep 2024 Index": 187.4},
    "Personal care and effects": {"Reported Inflation - Rural": 8.81, "Reported Inflation - Urban": 9.3, "Rural Sep 2024 Index": 201.4, "Urban Sep 2024 Index": 203.4}
};
