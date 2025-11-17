// app.js

// L'élément principal de notre HTML où tout sera affiché
const appContainer = document.getElementById('app');

// Nos données de recettes (vous pouvez en ajouter autant que vous voulez !)
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
            { name: "Tranche de citron vert", baseQuantity: 1.0, unit: "cl" }
        ]
    },
    {
        name: "Orgasme",
        ingredients: [
            { name: "Bayley's", baseQuantity: 2.0, unit:"cl"},
            { name: "Tequila", baseQuantity: 2.0, unit:"cl"},
            { name: "Liqueur de Menthe", baseQuantity: 1.0, unit:"cl"}
        ]
    }, 
    {
        name: "Madeleine",
        ingredients: [
            { name: "Amaretto", baseQuantity: 1.0, unit:"cl"},
            { name: "Triple sec", baseQuantity: 1.0, unit:"cl"},
            { name: "Jus d'ananas", baseQuantity: 1.0, unit:"cl"}
        ]
    },
    {
        name: "Buttery Nipple",
        ingredients: [
            { name: "Schnaps au caramel", baseQuantity: 2.0, unit:"cl"},
            { name: "Crème irlandaise", baseQuantity: 2.0, unit:"cl"}
        ]
    },
    {
        name: "Melon Ball",
        ingredients: [
            { name: "Liqueur de melon", baseQuantity: 1.0, unit:"cl"},
            { name: "Jus d'ananas", baseQuantity: 1.0, unit:"cl"},
            { name: "Vodka", baseQuantity: 1.0, unit:"cl"}
        ]
    },
    {
        name: "Washington Apple",
        ingredients: [
            { name: "Whyskey Canadien", baseQuantity: 3.0, unit:"cl"},
            { name: "Liqueur de pomme", baseQuantity: 3.0, unit:"cl"},
            { name: "Jus de cramberry", baseQuantity: 3.0, unit:"cl"}
        ]
    },
    {
        name: "Pineapple Upside-Down Cake",
        ingredients: [
            { name: "Vodka à la vanille", baseQuantity: 3.0, unit:"cl"},
            { name: "Jus d'ananasa", baseQuantity: 3.0, unit:"cl"},
            { name: "Grenadine", baseQuantity: 0.7, unit:"cl"}
        ]
    },
    {
        name: "Cappuccinotini",
        ingredients: [
            { name: "Van Gogh Double espresso", baseQuantity: 1.5, unit:"cl"},
            { name: "Van Gogh Vanilla", baseQuantity: 1.5, unit:"cl"},
            { name: "Liqueur de chocolat", baseQuantity: 1.5, unit:"cl"}
        ]
    },
    {
        name: "Peach Tart",
        ingredients: [
            { name: "Liqueur de pêche", baseQuantity: 6.0, unit:"cl"},
            { name: "Jus de citron vert", baseQuantity: 1.5, unit:"cl"}
        ]
    },
    {
        name: "Chocolate Cake",
        ingredients: [
            { name: "Vodka à la vanille", baseQuantity: 2.0, unit:"cl"},
            { name: "Frangelico", baseQuantity: 1.5, unit:"cl"},
            { name: "Liqueur de chocolat", baseQuantity: 1.5, unit:"cl"}
        ]
    },
    {
        name: "Woo Woo",
        ingredients: [
            { name: "Liqueur de pêche", baseQuantity: 1.5, unit:"cl"},
            { name: "Vodka", baseQuantity: 1.5, unit:"cl"},
            { name: "Jus de Cramberry", baseQuantity: 3.0, unit:"cl"}
        ]
    },
    {
        name: "Martini crème à la pistache",
        ingredients: [
            { name: "Liqueur de pistache", baseQuantity: 3.0, unit:"cl"},
            { name: "Rhum Vanille", baseQuantity: 4.5, unit: "cl"},
            { name:"Liqueur de Curaçao Triple Sec", baseQuantity: 1.5, unit:"cl"},
            { name: "Crème liquide légère", baseQuantity: 6.0, unit:"cl"}
        ]
    },
    {
        name: "Le cercueil",
        ingredients: [
            {name: "Mélange de tous les alcools présents sur la table"}
        ]
    }
];

// Fonction pour afficher la liste principale des recettes
function renderRecipeList() {
    let html = `<div class="header">Mes Shots</div>`;
    recipesData.forEach((recipe, index) => {
        // Pour chaque recette, on crée une "carte" cliquable
        html += `<div class="recipe-card" onclick="renderRecipeDetail(${index})">${recipe.name}</div>`;
    });
    appContainer.innerHTML = html;
}

// Fonction pour afficher la vue détaillée d'UNE recette
function renderRecipeDetail(recipeIndex) {
    const recipe = recipesData[recipeIndex];
    let numberOfPeople = 1;

    function getIngredientsHTML() {
        let ingredientsHtml = '';
        recipe.ingredients.forEach(ing => {
            const adjustedQuantity = ing.baseQuantity * numberOfPeople;
            ingredientsHtml += `
                <div class="ingredient">
                    <span class="ingredient-name">${ing.name}</span>
                    <span class="ingredient-quantity">${adjustedQuantity.toFixed(1)} ${ing.unit}</span>
                </div>
            `;
        });
        return ingredientsHtml;
    }

    let detailHtml = `
        <div class="detail-view">
            <button class="back-button" onclick="renderRecipeList()">‹ Retour</button>
            <div class="header">${recipe.name}</div>
            
            <div class="slider-container">
                <h2>Pour combien de personnes ?</h2>
                <div class="people-count" id="people-count-label">${numberOfPeople}</div>
                <input type="range" min="1" max="20" value="${numberOfPeople}" class="slider" id="people-slider">
            </div>

            <h2>Ingrédients</h2>
            <div class="ingredients-list" id="ingredients-list">
                ${getIngredientsHTML()}
            </div>
        </div>
    `;
    appContainer.innerHTML = detailHtml;

    // Ajout de la logique pour le curseur
    const slider = document.getElementById('people-slider');
    slider.addEventListener('input', (event) => {
        numberOfPeople = parseInt(event.target.value);
        document.getElementById('people-count-label').innerText = numberOfPeople;
        document.getElementById('ingredients-list').innerHTML = getIngredientsHTML();
    });
}

// Affiche la liste des recettes au démarrage de l'app
renderRecipeList();