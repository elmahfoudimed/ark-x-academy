async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const users = processUserData(data.users);

        console.log("Processed Users: ");
        for (let i = 0; i < users.length; i++) {
            console.log(users[i]);
        }

        console.log("Total Age of Male Users: " + summarizeAge(data.users));
    } catch (error) {
        console.log(error)
    }
}

function processUserData(data) {
    const filtredUsers = data.filter(user => user.gender !== "male");
    const processedUsers = filtredUsers.map(user => {
        const { firstName, lastName, age } = user;
        return `Name: ${firstName} ${lastName}, Age: ${age}`;
    });
    return processedUsers;
}

function summarizeAge(data) {
    const maleUsers = data.filter(user => user.gender === "male");
    const totalAge = maleUsers.reduce((total, user) => total + user.age, 0);
    return totalAge;
}

fetchUserData('https://dummyjson.com/users/')