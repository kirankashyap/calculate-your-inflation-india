let currentStep = 1;
let userLocation = '';
let inflationData = {}; // Changed from const to let

// Add this at the beginning of your script, after the inflationData declaration
const categoryData = [
    // Cereals and Products
    { Item_Code: "Cereals and Products", Item: "rice PDS (Ration)" },
    { Item_Code: "Cereals and Products", Item: "rice other sources" },
    { Item_Code: "Cereals and Products", Item: "chira" },
    { Item_Code: "Cereals and Products", Item: "muri" },
    { Item_Code: "Cereals and Products", Item: "other rice products" },
    { Item_Code: "Cereals and Products", Item: "wheat/ atta PDS (Ration)" },
    { Item_Code: "Cereals and Products", Item: "wheat/ atta other sources" },
    { Item_Code: "Cereals and Products", Item: "maida" },
    { Item_Code: "Cereals and Products", Item: "suji, rawa" },
    { Item_Code: "Cereals and Products", Item: "sewai, noodles" },
    { Item_Code: "Cereals and Products", Item: "bread (bakery)" },
    { Item_Code: "Cereals and Products", Item: "biscuits, chocolates, etc." },
    { Item_Code: "Cereals and Products", Item: "other cereals" },
    { Item_Code: "Cereals and Products", Item: "cereal substitutes: tapioca, etc." },
    { Item_Code: "Cereals and Products", Item: "jowar & its products" },
    { Item_Code: "Cereals and Products", Item: "bajra & its products" },
    { Item_Code: "Cereals and Products", Item: "maize & products" },
    { Item_Code: "Cereals and Products", Item: "small millets & their products" },
    { Item_Code: "Cereals and Products", Item: "ragi & its products" },
    { Item_Code: "Cereals and Products", Item: "grinding charges" },

    // Meat and Fish
    { Item_Code: "Meat and Fish", Item: "goat meat/mutton" },
    { Item_Code: "Meat and Fish", Item: "beef/ buffalo meat" },
    { Item_Code: "Meat and Fish", Item: "pork" },
    { Item_Code: "Meat and Fish", Item: "chicken" },
    { Item_Code: "Meat and Fish", Item: "others: birds, crab, oyster, tortoise, etc." },
    { Item_Code: "Meat and Fish", Item: "fish, prawn" },

    // Egg
    { Item_Code: "Egg", Item: "eggs (no.)" },

    // Milk and Products
    { Item_Code: "Milk and Products", Item: "milk: liquid (litre)" },
    { Item_Code: "Milk and Products", Item: "baby food" },
    { Item_Code: "Milk and Products", Item: "milk: condensed/ powder" },
    { Item_Code: "Milk and Products", Item: "curd" },
    { Item_Code: "Milk and Products", Item: "other milk products" },

    // Oils and fats
    { Item_Code: "Oils and fats", Item: "mustard oil" },
    { Item_Code: "Oils and fats", Item: "groundnut oil" },
    { Item_Code: "Oils and fats", Item: "coconut oil" },
    { Item_Code: "Oils and fats", Item: "refined oil [sunflower, soyabean, saffola, etc.]" },
    { Item_Code: "Oils and fats", Item: "ghee" },
    { Item_Code: "Oils and fats", Item: "butter" },
    { Item_Code: "Oils and fats", Item: "vanaspati, margarine" },

    // Fruits
    { Item_Code: "Fruits", Item: "banana (no.)" },
    { Item_Code: "Fruits", Item: "jackfruit" },
    { Item_Code: "Fruits", Item: "watermelon" },
    { Item_Code: "Fruits", Item: "pineapple (no.)" },
    { Item_Code: "Fruits", Item: "coconut (no.)" },
    { Item_Code: "Fruits", Item: "green coconut (no.)" },
    { Item_Code: "Fruits", Item: "guava" },
    { Item_Code: "Fruits", Item: "singara" },
    { Item_Code: "Fruits", Item: "orange, mausami (no.)" },
    { Item_Code: "Fruits", Item: "papaya" },
    { Item_Code: "Fruits", Item: "mango" },
    { Item_Code: "Fruits", Item: "kharbooza" },
    { Item_Code: "Fruits", Item: "pears/nashpati" },
    { Item_Code: "Fruits", Item: "berries" },
    { Item_Code: "Fruits", Item: "leechi" },
    { Item_Code: "Fruits", Item: "apple" },
    { Item_Code: "Fruits", Item: "grapes" },
    { Item_Code: "Fruits", Item: "other fresh fruits" },
    { Item_Code: "Fruits", Item: "coconut: copra" },
    { Item_Code: "Fruits", Item: "groundnut" },
    { Item_Code: "Fruits", Item: "dates" },
    { Item_Code: "Fruits", Item: "cashewnut" },
    { Item_Code: "Fruits", Item: "walnut" },
    { Item_Code: "Fruits", Item: "other nuts" },
    { Item_Code: "Fruits", Item: "raisin, kishmish, monacca, etc." },
    { Item_Code: "Fruits", Item: "other dry fruits" },

    // Vegetables
    { Item_Code: "Vegetables", Item: "potato" },
    { Item_Code: "Vegetables", Item: "onion" },
    { Item_Code: "Vegetables", Item: "radish" },
    { Item_Code: "Vegetables", Item: "carrot" },
    { Item_Code: "Vegetables", Item: "garlic (gm)" },
    { Item_Code: "Vegetables", Item: "ginger (gm)" },
    { Item_Code: "Vegetables", Item: "palak/other leafy vegetables" },
    { Item_Code: "Vegetables", Item: "tomato" },
    { Item_Code: "Vegetables", Item: "brinjal" },
    { Item_Code: "Vegetables", Item: "cauliflower" },
    { Item_Code: "Vegetables", Item: "cabbage" },
    { Item_Code: "Vegetables", Item: "green chillies" },
    { Item_Code: "Vegetables", Item: "lady's finger" },
    { Item_Code: "Vegetables", Item: "parwal/patal, kundru" },
    { Item_Code: "Vegetables", Item: "gourd, pumpkin" },
    { Item_Code: "Vegetables", Item: "peas (Vegetables)" },
    { Item_Code: "Vegetables", Item: "beans, barbati" },
    { Item_Code: "Vegetables", Item: "lemon (no.)" },
    { Item_Code: "Vegetables", Item: "other vegetables" },
    { Item_Code: "Vegetables", Item: "pickles (gm)" },
    { Item_Code: "Vegetables", Item: "chips (gm)" },

    // Pulses and products
    { Item_Code: "Pulses and products", Item: "arhar, tur" },
    { Item_Code: "Pulses and products", Item: "gram: split" },
    { Item_Code: "Pulses and products", Item: "gram: whole" },
    { Item_Code: "Pulses and products", Item: "moong" },
    { Item_Code: "Pulses and products", Item: "masur" },
    { Item_Code: "Pulses and products", Item: "urd" },
    { Item_Code: "Pulses and products", Item: "peas (Pulses)" },
    { Item_Code: "Pulses and products", Item: "khesari" },
    { Item_Code: "Pulses and products", Item: "other pulses" },
    { Item_Code: "Pulses and products", Item: "gram products" },
    { Item_Code: "Pulses and products", Item: "besan" },
    { Item_Code: "Pulses and products", Item: "other pulse products" },

    // Sugar and Confectionery
    { Item_Code: "Sugar and Confectionery", Item: "sugar - PDS (Ration)" },
    { Item_Code: "Sugar and Confectionery", Item: "sugar - other sources" },
    { Item_Code: "Sugar and Confectionery", Item: "gur" },
    { Item_Code: "Sugar and Confectionery", Item: "candy, misri" },
    { Item_Code: "Sugar and Confectionery", Item: "honey" },
    { Item_Code: "Sugar and Confectionery", Item: "sauce, jam, jelly (gm)" },
    { Item_Code: "Sugar and Confectionery", Item: "ice-cream" },

    // Spices
    { Item_Code: "Spices", Item: "salt" },
    { Item_Code: "Spices", Item: "jeera (gm)" },
    { Item_Code: "Spices", Item: "dhania (gm)" },
    { Item_Code: "Spices", Item: "turmeric (gm)" },
    { Item_Code: "Spices", Item: "black pepper (gm)" },
    { Item_Code: "Spices", Item: "dry chillies (gm)" },
    { Item_Code: "Spices", Item: "tamarind (gm)" },
    { Item_Code: "Spices", Item: "curry powder (gm)" },
    { Item_Code: "Spices", Item: "oilseeds (gm)" },

    // Prepared meals, snacks, sweets etc
    { Item_Code: "Prepared meals, snacks, sweets etc.", Item: "tea: cups (no.)" },
    { Item_Code: "Prepared meals, snacks, sweets etc.", Item: "coffee: cups (no.)" },
    { Item_Code: "Prepared meals, snacks, sweets etc.", Item: "cooked meals purchased (no.)" },
    { Item_Code: "Prepared meals, snacks, sweets etc.", Item: "cooked snacks purchased [samosa, puri, paratha, burger, chowmein, idli, dosa, vada, chops, pakoras, pao bhaji, etc.]" },
    { Item_Code: "Prepared meals, snacks, sweets etc.", Item: "prepared sweets, cake, pastry" },
    { Item_Code: "Prepared meals, snacks, sweets etc.", Item: "papad, bhujia, namkeen, mixture, chanachur" },
    { Item_Code: "Prepared meals, snacks, sweets etc.", Item: "other packaged processed food" },

    // Non-alcoholic beverages
    { Item_Code: "Non-alcoholic beverages", Item: "tea: leaf (gm)" },
    { Item_Code: "Non-alcoholic beverages", Item: "coffee: powder (gm)" },
    { Item_Code: "Non-alcoholic beverages", Item: "mineral water (litre)" },
    { Item_Code: "Non-alcoholic beverages", Item: "cold beverages: bottled/canned (litre)" },
    { Item_Code: "Non-alcoholic beverages", Item: "fruit juice and shake (litre)" },
    { Item_Code: "Non-alcoholic beverages", Item: "other beverages: cocoa, chocolate, etc." },

    // Pan, tobacco and intoxicants
    { Item_Code: "Pan, tobacco and intoxicants", Item: "country liquor (litre)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "foreign/refined liquor or wine (litre)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "toddy (litre)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "beer (litre)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "other intoxicants" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "pan: leaf (no.)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "pan: finished (no.)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "ingredients for pan (gm)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "bidi (no.)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "cigarettes (no.)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "leaf tobacco (gm)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "snuff (gm)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "hookah tobacco (gm)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "cheroot (no.)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "zarda, kimam, surti (gm)" },
    { Item_Code: "Pan, tobacco and intoxicants", Item: "other tobacco products" },

    // Clothing
    { Item_Code: "Clothing", Item: "dhoti (no.)" },
    { Item_Code: "Clothing", Item: "saree (no.)" },
    { Item_Code: "Clothing", Item: "shawl, chaddar (no.)" },
    { Item_Code: "Clothing", Item: "lungi (no.)" },
    { Item_Code: "Clothing", Item: "kurta-pajama suits: males (no.)" },
    { Item_Code: "Clothing", Item: "shirts, T-shirts (no.)" },
    { Item_Code: "Clothing", Item: "shorts, trousers, bermudas (no.)" },
    { Item_Code: "Clothing", Item: "baniyan, socks, other hosiery and undergarments, etc.(no.)" },
    { Item_Code: "Clothing", Item: "kurta-pajama suits: females (no.)" },
    { Item_Code: "Clothing", Item: "frocks, skirts, etc. (no.)" },
    { Item_Code: "Clothing", Item: "school/college uniform: boys" },
    { Item_Code: "Clothing", Item: "school/college uniform: girls" },
    { Item_Code: "Clothing", Item: "coat, jacket, sweater, windcheater (no.)" },
    { Item_Code: "Clothing", Item: "knitting wool (gm)" },
    { Item_Code: "Clothing", Item: "cloth for shirt, pyjama, kurta, salwar, etc. (metre)" },
    { Item_Code: "Clothing", Item: "cloth for coat, trousers, suit, etc. (metre)" },
    { Item_Code: "Clothing", Item: "clothing (first-hand): other" },
    { Item_Code: "Clothing", Item: "clothing: second-hand" },
    { Item_Code: "Clothing", Item: "gamchha, towel, handkerchief (no.)" },
    { Item_Code: "Clothing", Item: "headwear, belts, ties (no.)" },
    { Item_Code: "Clothing", Item: "washerman, laundry, ironing" },
    { Item_Code: "Clothing", Item: "tailor" },

    // Footwear
    { Item_Code: "Footwear", Item: "leather boots, shoes" },
    { Item_Code: "Footwear", Item: "leather sandals, chappals, etc." },
    { Item_Code: "Footwear", Item: "other leather footwear" },
    { Item_Code: "Footwear", Item: "rubber / PVC footwear" },
    { Item_Code: "Footwear", Item: "other footwear" },

    // Housing
    { Item_Code: "Housing", Item: "house rent, garage rent" },
    { Item_Code: "Housing", Item: "residential building & land (cost of repairs only)" },
    { Item_Code: "Housing", Item: "water charges" },
    { Item_Code: "Housing", Item: "watch man charges (other cons taxes)" },

    // Fuel and light
    { Item_Code: "Fuel and light", Item: "electricity (std. unit)" },
    { Item_Code: "Fuel and light", Item: "LPG [excl. conveyance]" },
    { Item_Code: "Fuel and light", Item: "kerosene PDS (Ration) (litre)" },
    { Item_Code: "Fuel and light", Item: "kerosene other sources (litre)" },
    { Item_Code: "Fuel and light", Item: "diesel (litre) [excl. conveyance]" },
    { Item_Code: "Fuel and light", Item: "other fuel" },
    { Item_Code: "Fuel and light", Item: "coke" },
    { Item_Code: "Fuel and light", Item: "firewood and chips" },
    { Item_Code: "Fuel and light", Item: "coal" },
    { Item_Code: "Fuel and light", Item: "charcoal" },
    { Item_Code: "Fuel and light", Item: "dung cake" },

    // Household goods and services
    { Item_Code: "Household goods and services", Item: "bedstead" },
    { Item_Code: "Household goods and services", Item: "almirah, dressing table" },
    { Item_Code: "Household goods and services", Item: "chair, stool, bench, table" },
    { Item_Code: "Household goods and services", Item: "other furniture & fixtures (couch, sofa, etc.)" },
    { Item_Code: "Household goods and services", Item: "bathroom and sanitary equipment" },
    { Item_Code: "Household goods and services", Item: "carpet, daree & other floor mattings" },
    { Item_Code: "Household goods and services", Item: "bed sheet, bed cover (no.)" },
    { Item_Code: "Household goods and services", Item: "rug, blanket (no.)" },
    { Item_Code: "Household goods and services", Item: "pillow, quilt, mattress (no.)" },
    { Item_Code: "Household goods and services", Item: "cloth for upholstery, curtains, tablecloth, etc. (metre)" },
    { Item_Code: "Household goods and services", Item: "mosquito net (no.)" },
    { Item_Code: "Household goods and services", Item: "bedding: others" },
    { Item_Code: "Household goods and services", Item: "air conditioner, air cooler" },
    { Item_Code: "Household goods and services", Item: "inverter" },
    { Item_Code: "Household goods and services", Item: "sewing machine" },
    { Item_Code: "Household goods and services", Item: "washing machine" },
    { Item_Code: "Household goods and services", Item: "stove, gas burner" },
    { Item_Code: "Household goods and services", Item: "refrigerator" },
    { Item_Code: "Household goods and services", Item: "electric fan" },
    { Item_Code: "Household goods and services", Item: "water purifier" },
    { Item_Code: "Household goods and services", Item: "electric iron, heater, toaster, oven & other electric heating appliances" },
    { Item_Code: "Household goods and services", Item: "other cooking/ household appliances" },
    { Item_Code: "Household goods and services", Item: "other durables (specify)." },
    { Item_Code: "Household goods and services", Item: "stainless steel utensils" },
    { Item_Code: "Household goods and services", Item: "pressure cooker/ pressure pan" },
    { Item_Code: "Household goods and services", Item: "other metal utensils" },
    { Item_Code: "Household goods and services", Item: "other crockery & utensils" },
    { Item_Code: "Household goods and services", Item: "earthenware" },
    { Item_Code: "Household goods and services", Item: "glassware" },
    { Item_Code: "Household goods and services", Item: "electric bulb, tubelight" },
    { Item_Code: "Household goods and services", Item: "plugs, switches & other electrical fittings" },
    { Item_Code: "Household goods and services", Item: "electric batteries" },
    { Item_Code: "Household goods and services", Item: "torch" },
    { Item_Code: "Household goods and services", Item: "lock" },
    { Item_Code: "Household goods and services", Item: "bucket, water bottle/ feeding bottle & other plastic goods" },
    { Item_Code: "Household goods and services", Item: "coir, rope, etc." },
    { Item_Code: "Household goods and services", Item: "washing soap/soda/powder" },
    { Item_Code: "Household goods and services", Item: "other washing requisites" },
    { Item_Code: "Household goods and services", Item: "incense (agarbatti), room freshener" },
    { Item_Code: "Household goods and services", Item: "flower (fresh): all purposes" },
    { Item_Code: "Household goods and services", Item: "mosquito repellent, insecticide, acid etc." },
    { Item_Code: "Household goods and services", Item: "matches (box)" },
    { Item_Code: "Household goods and services", Item: "candle (no.)" },
    { Item_Code: "Household goods and services", Item: "other petty articles" },
    { Item_Code: "Household goods and services", Item: "domestic servant/cook" },
    { Item_Code: "Household goods and services", Item: "sweeper" },
    { Item_Code: "Household goods and services", Item: "Monthly Maintainance charges" },
    { Item_Code: "Household goods and services", Item: "other consumer services excluding conveyance" },

    // Health
    { Item_Code: "Health", Item: "hospital & nursing home charges" },
    { Item_Code: "Health", Item: "medicine (non-institutional)" },
    { Item_Code: "Health", Item: "family planning devices" },
    { Item_Code: "Health", Item: "spectacles" },
    { Item_Code: "Health", Item: "other medical expenses (non-institutional)" },
    { Item_Code: "Health", Item: "doctor's/ surgeon's fee-first consultation (non-institutional)" },
    { Item_Code: "Health", Item: "X-ray, ECG, pathological test, etc. (non-institutional)" },

    // Transport and communication
    { Item_Code: "Transport and communication", Item: "motor car, jeep" },
    { Item_Code: "Transport and communication", Item: "motor cycle, scooter" },
    { Item_Code: "Transport and communication", Item: "bicycle(without accessories)" },
    { Item_Code: "Transport and communication", Item: "tyres & tubes" },
    { Item_Code: "Transport and communication", Item: "petrol for vehicle" },
    { Item_Code: "Transport and communication", Item: "diesel for vehicle" },
    { Item_Code: "Transport and communication", Item: "lubricants & other fuels for vehicle" },
    { Item_Code: "Transport and communication", Item: "other conveyance expenses" },
    { Item_Code: "Transport and communication", Item: "railway fare" },
    { Item_Code: "Transport and communication", Item: "bus/tram fare" },
    { Item_Code: "Transport and communication", Item: "taxi, auto-rickshaw fare" },
    { Item_Code: "Transport and communication", Item: "rickshaw (hand drawn & cycle) fare" },
    { Item_Code: "Transport and communication", Item: "horse cart fare" },
    { Item_Code: "Transport and communication", Item: "school bus, van, etc." },
    { Item_Code: "Transport and communication", Item: "air fare (normal): economy class(adult)" },
    { Item_Code: "Transport and communication", Item: "steamer, boat fare" },
    { Item_Code: "Transport and communication", Item: "porter charges" },
    { Item_Code: "Transport and communication", Item: "mobile handset" },
    { Item_Code: "Transport and communication", Item: "telephone charges: landline*" },
    { Item_Code: "Transport and communication", Item: "telephone charges: mobile" },
    { Item_Code: "Transport and communication", Item: "internet expenses" },

    // Recreation and amusement
    { Item_Code: "Recreation and amusement", Item: "radio, tape recorder, 2-in-1" },
    { Item_Code: "Recreation and amusement", Item: "television" },
    { Item_Code: "Recreation and amusement", Item: "VCR/VCD/DVD player" },
    { Item_Code: "Recreation and amusement", Item: "camera & photographic equipment" },
    { Item_Code: "Recreation and amusement", Item: "PC/ Laptop/ other peripherals incl. software" },
    { Item_Code: "Recreation and amusement", Item: "CD, DVD, audio/video cassette, etc" },
    { Item_Code: "Recreation and amusement", Item: "goods for recreation and hobbies" },
    { Item_Code: "Recreation and amusement", Item: "sports goods, toys, etc." },
    { Item_Code: "Recreation and amusement", Item: "newspapers, periodicals" },
    { Item_Code: "Recreation and amusement", Item: "photography" },
    { Item_Code: "Recreation and amusement", Item: "VCD/ DVD hire (incl. instrument)" },
    { Item_Code: "Recreation and amusement", Item: "cinema: new release(normal day)" },
    { Item_Code: "Recreation and amusement", Item: "monthly charges for cable TV connection" },
    { Item_Code: "Recreation and amusement", Item: "library charges" },
    { Item_Code: "Recreation and amusement", Item: "other entertainment" },
    { Item_Code: "Recreation and amusement", Item: "club fees" },
    { Item_Code: "Recreation and amusement", Item: "hotel lodging charges" },

    // Education
    { Item_Code: "Education", Item: "books, journals: first hand" },
    { Item_Code: "Education", Item: "stationery, photocopying charges" },
    { Item_Code: "Education", Item: "tuition and other fees (school, college, etc.)" },
    { Item_Code: "Education", Item: "private tutor/ coaching centre" },
    { Item_Code: "Education", Item: "other educational expenses (incl. fees for enrollment in web-based training)" },

    // Personal care and effects
    { Item_Code: "Personal care and effects", Item: "toilet soap" },
    { Item_Code: "Personal care and effects", Item: "toothpaste, toothbrush, comb, etc." },
    { Item_Code: "Personal care and effects", Item: "powder, snow, cream, lotion and perfume" },
    { Item_Code: "Personal care and effects", Item: "hair oil, shampoo, hair cream" },
    { Item_Code: "Personal care and effects", Item: "shaving blades, shaving stick, razor" },
    { Item_Code: "Personal care and effects", Item: "shaving cream, aftershave lotion" },
    { Item_Code: "Personal care and effects", Item: "sanitary napkins" },
    { Item_Code: "Personal care and effects", Item: "clock, watch" },
    { Item_Code: "Personal care and effects", Item: "suitcase, trunk, box, handbag and other travel goods" },
    { Item_Code: "Personal care and effects", Item: "umbrella, raincoat" },
    { Item_Code: "Personal care and effects", Item: "lighter (bidi/ cigarette/ gas stove)" },
    { Item_Code: "Personal care and effects", Item: "any other personal goods" },
    { Item_Code: "Personal care and effects", Item: "gold" },
    { Item_Code: "Personal care and effects", Item: "silver" },
    { Item_Code: "Personal care and effects", Item: "other ornaments" },
    { Item_Code: "Personal care and effects", Item: "barber, beautician, etc." }
];

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
    const shareText = `My personal #inflation rate at #india is ${personalInflation.toFixed(2)}% for 2023-2024, and ${personalInflationSince2012.toFixed(2)}% since 2012. ${text}`;
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
            <a href="https://t.me/share/url?url=${encodedShareText}" target="_blank" class="share-button telegram"><i class="fab fa-telegram-plane"></i></a>
            <a href="https://twitter.com/intent/tweet?text=${encodedShareText}" target="_blank" class="share-button twitter"><i class="fab fa-twitter"></i></a>
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

    // Create a map of categories and their items from category.csv
    const categoryItems = {};
    categoryData.forEach(row => {
        if (!categoryItems[row.Item_Code]) {
            categoryItems[row.Item_Code] = [];
        }
        categoryItems[row.Item_Code].push(row.Item);
    });

    expensesData.forEach((item, index) => {
        const tooltipItems = categoryItems[item] ? 
            categoryItems[item].join('\n') : 
            'No detailed items available';
            
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <label for="expense${index}" class="category-label">
                    ${item}
                    <i class="fas fa-info-circle info-icon" onclick="showItemDetails('${item}', \`${tooltipItems}\`)"></i>
                </label>
            </td>
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
    "Cereals and Products": {"Reported Inflation - Rural": 7.11, "Reported Inflation - Urban": 6.34, "Rural Sep 2024 Index": 194.3, "Urban Sep 2024 Index": 192.8},
    "Meat and Fish": {"Reported Inflation - Rural": 2.66, "Reported Inflation - Urban": 2.59, "Rural Sep 2024 Index": 220.2, "Urban Sep 2024 Index": 229.5},
    "Egg": {"Reported Inflation - Rural": 6.55, "Reported Inflation - Urban": 5.97, "Rural Sep 2024 Index": 190.2, "Urban Sep 2024 Index": 195.2},
    "Milk and Products": {"Reported Inflation - Rural": 2.81, "Reported Inflation - Urban": 3.3, "Rural Sep 2024 Index": 186.6, "Urban Sep 2024 Index": 187.6},
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

// Add this new function to handle showing the modal
function showItemDetails(category, items) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('itemDetailsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'itemDetailsModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h3></h3>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add click event to close button
        modal.querySelector('.close-button').onclick = () => {
            modal.style.display = 'none';
        };

        // Close modal when clicking outside
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    // Update modal content
    modal.querySelector('h3').textContent = category;
    modal.querySelector('.modal-body').innerHTML = items.split('\n').map(item => `<div class="item">${item}</div>`).join('');
    
    // Show modal
    modal.style.display = 'block';
}
