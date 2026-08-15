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
            name: "Rana Safi",
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
                "Microwave on high for 1 to 1.5 minutes.",
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
                "Seasoning packet",
                "Optional: egg or vegetables"
            ],
            steps: [
                "Boil water.",
                "Add noodles.",
                "Add seasoning.",
                "Cook one more minute.",
                "Serve."
            ]
        },

        {
            id: 3,
            name: "Peanut Butter Sandwich",
            description: "A simple sandwich.",
            time: "2 minutes",
            ingredients: [
                "2 slices bread",
                "2 tbsp peanut butter"
            ],
            steps: [
                "Spread peanut butter.",
                "Close sandwich.",
                "Cut and serve."
            ]
        }
    ]
};
function addRecipe(recipe) {
    const newRecipe = {
        id: projectInfo.recipes.length + 1,
        ...recipe
    };
    projectInfo.recipes.push(newRecipe);
    return newRecipe;
}
module.exports = projectInfo;
module.exports.addRecipe = addRecipe;