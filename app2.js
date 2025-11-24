// app.js

const appContainer = document.getElementById('app');
let activeFilter = null; // Variable pour garder en mémoire le filtre actif

// --- GESTION DES FAVORIS ---
function getFavorites() {
    const favorites = localStorage.getItem('favoriteShots');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favoriteShots', JSON.stringify(favorites));
}

function toggleFavorite(recipeName, event, recipeIndex = -1) {
    if (event) event.stopPropagation();
    const favorites = getFavorites();
    const favoriteIndex = favorites.indexOf(recipeName);
    if (favoriteIndex > -1) favorites.splice(favoriteIndex, 1);
    else favorites.push(recipeName);
    saveFavorites(favorites);
    if (recipeIndex > -1) renderRecipeDetail(recipeIndex);
    else renderRecipeList();
}

// --- GESTION DES FILTRES ---
function filterBy(filterTerm) {
    activeFilter = filterTerm;
    renderRecipeList();
}

// --- VOS DONNÉES DE RECETTES (AVEC TOUTES LES VIRGULES CORRIGÉES) ---
const recipesData = [
    {
        name: "B-52",
        ingredients: [
            { name: "Kahlúa (liqueur de café)", baseQuantity: 1.0, unit: "cl" },
            { name: "Baileys (crème de whisky)", baseQuantity: 1.0, unit: "cl" },
            { name: "Grand Marnier", baseQuantity: 1.0, unit: "cl" }
        ]
    },
    {
        name: "Kamikaze",
        ingredients: [
            { name: "Vodka", baseQuantity: 2.0, unit: "cl" },
            { name: "Triple Sec", baseQuantity: 2.0, unit: "cl" },
            { name: "Jus de citron vert", baseQuantity: 2.0, unit: "cl" }
        ]
    },
    {
        name: "Tequila Paf",
        ingredients: [
            { name: "Tequila", baseQuantity: 4.0, unit: "cl" },
            { name: "Sel", baseQuantity: 1.0, unit: "pincée" },
            { name: "Tranche de citron vert", baseQuantity: 1.0, unit: "" }
        ]
    },
    {
        name: "Orgasme",
        ingredients: [
            { name: "Baileys", baseQuantity: 2.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Tequila", baseQuantity: 2.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Liqueur de Menthe", baseQuantity: 1.0, unit:"cl"}
        ]
    }, 
    {
        name: "Madeleine",
        ingredients: [
            { name: "Amaretto", baseQuantity: 1.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Triple sec", baseQuantity: 1.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Jus d'ananas", baseQuantity: 1.0, unit:"cl"}
        ]
    },
    {
        name: "Buttery Nipple",
        ingredients: [
            { name: "Schnaps au caramel", baseQuantity: 2.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Crème irlandaise", baseQuantity: 2.0, unit:"cl"}
        ]
    },
    {
        name: "Melon Ball",
        ingredients: [
            { name: "Liqueur de melon", baseQuantity: 1.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Jus d'ananas", baseQuantity: 1.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Vodka", baseQuantity: 1.0, unit:"cl"}
        ]
    },
    {
        name: "Washington Apple",
        ingredients: [
            { name: "Whiskey Canadien", baseQuantity: 3.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Liqueur de pomme", baseQuantity: 3.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Jus de cramberry", baseQuantity: 3.0, unit:"cl"}
        ]
    },
    {
        name: "Pineapple Upside-Down Cake",
        ingredients: [
            { name: "Vodka à la vanille", baseQuantity: 3.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Jus d'ananas", baseQuantity: 3.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE & TYPO CORRIGÉE
            { name: "Grenadine", baseQuantity: 0.7, unit:"cl"}
        ]
    },
    {
        name: "Cappuccinotini",
        ingredients: [
            { name: "Van Gogh Double espresso", baseQuantity: 1.5, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Van Gogh Vanilla", baseQuantity: 1.5, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Liqueur de chocolat", baseQuantity: 1.5, unit:"cl"}
        ]
    },
    {
        name: "Peach Tart",
        ingredients: [
            { name: "Liqueur de pêche", baseQuantity: 6.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Jus de citron vert", baseQuantity: 1.5, unit:"cl"}
        ]
    },
    {
        name: "Chocolate Cake",
        ingredients: [
            { name: "Vodka à la vanille", baseQuantity: 2.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Frangelico", baseQuantity: 1.5, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Liqueur de chocolat", baseQuantity: 1.5, unit:"cl"}
        ]
    },
    {
        name: "Woo Woo",
        ingredients: [
            { name: "Liqueur de pêche", baseQuantity: 1.5, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Vodka", baseQuantity: 1.5, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Jus de Cramberry", baseQuantity: 3.0, unit:"cl"}
        ]
    },
    {
        name: "Martini crème à la pistache",
        ingredients: [
            { name: "Liqueur de pistache", baseQuantity: 3.0, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Rhum Vanille", baseQuantity: 4.5, unit: "cl"}, // <-- VIRGULE AJOUTÉE
            { name:"Liqueur de Curaçao Triple Sec", baseQuantity: 1.5, unit:"cl"}, // <-- VIRGULE AJOUTÉE
            { name: "Crème liquide légère", baseQuantity: 6.0, unit:"cl"}
        ]
    },
    {
        name: "Le cercueil",
        ingredients: [
            {name: "Mélange de tous les alcools présents sur la table", baseQuantity: 4.0, unit: "cl"}
        ]
    }
];

// --- FONCTIONS D'AFFICHAGE ---
function renderRecipeList() {
    const favorites = getFavorites();
    let filteredRecipes = recipesData;
    if (activeFilter) {
        if (activeFilter === 'FAVORITES') {
            filteredRecipes = recipesData.filter(recipe => favorites.includes(recipe.name));
        } else {
            filteredRecipes = recipesData.filter(recipe => recipe.ingredients.some(ing => ing.name === activeFilter));
        }
    }
    const allIngredients = [...new Set(recipesData.flatMap(recipe => recipe.ingredients.map(ing => ing.name)))];
    let html = `<div class="header">Mes Shots</div>`;
    html += `<div class="filters-container">`;
    html += `<button class="filter-btn ${!activeFilter ? 'active' : ''}" onclick="filterBy(null)">Tous</button>`;
    html += `<button class="filter-btn ${activeFilter === 'FAVORITES' ? 'active' : ''}" onclick="filterBy('FAVORITES')">Favoris ★</button>`;
    allIngredients.sort().forEach(ingredient => {
        html += `<button class="filter-btn ${activeFilter === ingredient ? 'active' : ''}" onclick="filterBy('${ingredient.replace(/'/g, "\\'")}')">${ingredient}</button>`;
    });
    html += `</div>`;
    if (filteredRecipes.length === 0) {
        html += `<p class="no-results">Aucune recette ne correspond à votre filtre.</p>`;
    } else {
        filteredRecipes.forEach(recipe => {
            const index = recipesData.findIndex(r => r.name === recipe.name);
            const isFavorite = favorites.includes(recipe.name);
            html += `
                <div class="recipe-card" onclick="renderRecipeDetail(${index})">
                    ${recipe.name}
                    <div class="favorite-star ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${recipe.name.replace(/'/g, "\\'")}', event)">★</div>
                </div>`;
        });
    }
    appContainer.innerHTML = html;
}

function renderRecipeDetail(recipeIndex) {
    const recipe = recipesData[recipeIndex];
    const favorites = getFavorites();
    const isFavorite = favorites.includes(recipe.name);
    let numberOfPeople = 1;
    function getIngredientsHTML() {
        return recipe.ingredients.map(ing => {
            const adjustedQuantity = ing.baseQuantity * numberOfPeople;
            return `<div class="ingredient"><span class="ingredient-name">${ing.name}</span><span class="ingredient-quantity">${adjustedQuantity.toFixed(1).replace('.0', '')} ${ing.unit}</span></div>`;
        }).join('');
    }
    let detailHtml = `
        <div class="detail-view">
            <button class="back-button" onclick="renderRecipeList()">‹ Retour</button>
            <div class="header-container">
                <div class="header">${recipe.name}</div>
                <div class="favorite-star-detail ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${recipe.name.replace(/'/g, "\\'")}', event, ${recipeIndex})">★</div>
            </div>
            <div class="slider-container">
                <h2>Pour combien de personnes ?</h2>
                <div class="people-count" id="people-count-label">${numberOfPeople}</div>
                <input type="range" min="1" max="20" value="${numberOfPeople}" class="slider" id="people-slider">
            </div>
            <h2>Ingrédients</h2>
            <div class="ingredients-list" id="ingredients-list">${getIngredientsHTML()}</div>
        </div>`;
    appContainer.innerHTML = detailHtml;
    const slider = document.getElementById('people-slider');
    slider.addEventListener('input', (event) => {
        numberOfPeople = parseInt(event.target.value);
        document.getElementById('people-count-label').innerText = numberOfPeople;
        document.getElementById('ingredients-list').innerHTML = getIngredientsHTML();
    });
}