const users = [
    {
        id: 1,
        username: "nancy",
        password: "1234",
        name: "Nancy Khelfa"
    },
    {
        id: 2,
        username: "shahed",
        password: "1234",
        name: "Shahed AL-bundouq"
    },
    {
        id: 3,
        username: "rana",
        password: "1234",
        name: "Rana Safi"
    }
];

const submissions = [
    {
        id: 1,
        userId: 1,
        recipeName: "Microwave Mug Pizza",
        description: "A quick pizza made using a microwave.",
        time: "5 minutes",
        date: "2026-08-10"
    },
    {
        id: 2,
        userId: 1,
        recipeName: "Cheese Toast",
        description: "Crispy toast with melted cheese.",
        time: "3 minutes",
        date: "2026-08-12"
    },
    {
        id: 3,
        userId: 2,
        recipeName: "Instant Noodles",
        description: "A simple low-cost meal.",
        time: "5 minutes",
        date: "2026-08-11"
    },
    {
        id: 4,
        userId: 3,
        recipeName: "Peanut Butter Sandwich",
        description: "A simple sandwich.",
        time: "2 minutes",
        date: "2026-08-13"
    }
];

const getSubmissionsByUser = (userId) => {
    return submissions.filter(sub => sub.userId === userId);
};

const findUser = (username, password) => {
    return users.find(
        user => user.username === username && user.password === password
    );
};

module.exports = {
    users,
    submissions,
    getSubmissionsByUser,
    findUser
};
