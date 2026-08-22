const express = require("express");

const app = express();
const PORT = 3003;

const session = require("express-session");


require("dotenv").config();

// Routes
const homeRoutes = require("./routes/homeRoutes");
const featureRoutes = require("./routes/featureRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const submitRoutes = require("./routes/submitRoutes");

// =========================
// View Engine
// =========================

app.set("view engine", "ejs");
app.set("views", "./views");

// =========================
// Middleware
// =========================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
    session({
        secret: process.env.SESSION_SECRET || "my-secret-key",
        resave: false,
        saveUninitialized: false
    })
);
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// Static files
app.use(express.static("public"));

// =========================
// Routes
// =========================

app.use("/", homeRoutes);
app.use("/", featureRoutes);
app.use("/", recipeRoutes);

// Login & Register
app.use("/", authRoutes);

// Dashboard
app.use("/dashboard", dashboardRoutes);

// Submit + My Submissions
app.use("/", submitRoutes);

// =========================
// Project Information
// =========================

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

// =========================
// Feature Page
// =========================

app.get("/feature", (req, res) => {
    const features = [
        {
            title: "Quick Recipes",
            description:
                "Find fast and simple recipes that can be prepared in a short time.",
            icon: "🍳"
        },

        {
            title: "Low Cost Meals",
            description:
                "Affordable recipes using simple and available ingredients for students.",
            icon: "💰"
        },

        {
            title: "Microwave Recipes",
            description:
                "Prepare meals easily using a microwave without complex cooking tools.",
            icon: "🔥"
        },

        {
            title: "Easy Cooking Steps",
            description:
                "Follow clear step-by-step instructions for preparing meals.",
            icon: "📝"
        },

        {
            title: "Favorite Recipes",
            description:
                "Save your favorite recipes and access them anytime easily.",
            icon: "❤️"
        }
    ];

    res.render("feature", {
        features: features
    });
});

// =========================
// About Page
// =========================

app.get("/about", (req, res) => {
    res.render("about", projectInfo);
});

// =========================
// Recipe Details
// =========================

app.get("/recipe/:id", (req, res) => {
    const recipeId = Number(req.params.id);

    const selectedRecipe = projectInfo.recipes.find(
        (recipe) => recipe.id === recipeId
    );

    if (!selectedRecipe) {
        return res.status(404).send("Recipe not found");
    }

    res.render("recipe", {
        recipe: selectedRecipe
    });
});

// =========================
// Start Server
// =========================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});