const express = require("express");

const app = express();
const PORT = 3003;


// Use EJS template engine
app.set("view engine", "ejs");


// Connect CSS and other static files
app.use(express.static("public"));


// Context Object
const projectInfo = {

    title: "Fast & affordable Recipe Platform",

    description:
        "An interactive website where students can share quick, inexpensive food recipes that do not require complicated cooking equipment (such as recipes that only rely on a microwave).",


    problem:
        "Students struggle to find quick, affordable meals due to limited time, budget, and cooking equipment. The platform provides simple recipes that require minimal tools and low-cost ingredients.",


    team: [
        {
            name: "Nancy Khelfa",
            ID: 202410994
        },

        {
            name: "Shahed AL-bundouq",
            ID: 202210334
        },

        {
            name: "Rana safi",
            ID: 202210727
        }
    ],

    recipes: [
        {
            id: 1,
            name: "Microwave Mug Pizza",
            description: "A quick pizza made using a microwave.",
            time: "5 minutes",
            ingredients: [
                "4 tbsp flour",
                "1/4 tsp baking powder",
                "3 tbsp milk",
                "1 tbsp oil",
                "2 tbsp pizza sauce",
                "Shredded cheese",
                "Toppings of choice"
            ],
            steps: [
                "Mix flour, baking powder, milk, and oil in a mug until smooth.",
                "Spread the pizza sauce on top of the batter.",
                "Add shredded cheese and your favorite toppings.",
                "Microwave on high for 1 to 1.5 minutes until the cheese melts.",
                "Let it cool for a minute before eating."
            ]
        },

        {
            id: 2,
            name: "Instant Noodles",
            description: "A simple low-cost meal.",
            time: "5 minutes",
            ingredients: [
                "1 pack instant noodles",
                "2 cups water",
                "Seasoning packet (included)",
                "Optional: egg or vegetables"
            ],
            steps: [
                "Boil water in a pot or microwave-safe bowl.",
                "Add the noodles and cook for 2-3 minutes.",
                "Stir in the seasoning packet.",
                "Add egg or vegetables if desired and cook for 1 more minute.",
                "Serve hot."
            ]
        },

        {
            id: 3,
            name: "Peanut Butter Sandwich",
            description: "A simple sandwich with affordable ingredients.",
            time: "2 minutes",
            ingredients: [
                "2 slices of bread",
                "2 tbsp peanut butter"
            ],
            steps: [
                "Take two slices of bread.",
                "Spread peanut butter evenly on one or both slices.",
                "Put the slices together to form a sandwich.",
                "Cut in half if desired and serve."
            ]
        }
    ]

};


// Static Route
app.get("/about", (req, res) => {

    res.render("about", projectInfo);

});
app.get("/recipe/:id", (req,res)=>{


     // Get id from URL
    const recipeId = Number(req.params.id);

    // Find recipe with this id
    const selectedRecipe = projectInfo.recipes.find(
        recipe => recipe.id === recipeId
    );

    res.render("recipe", {
        recipe: selectedRecipe
    });
    

});



// Start Server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});