const myProfile = {
    name: "Saveliy",
    age: 18,
    city: "Tyumen",
    sayHello: function(name) {
        return `Hello "${name}"`;
    }
};

console.log(myProfile.sayHello("Saveliy"));



const users = [
    {name: "Melody", age: 30, isAdmin: false},
    {name: "El Primo", age: 40, isAdmin: true},
    {name: "Colt", age: 22, isAdmin: false},
    {name: "Dinomike", age: 28, isAdmin: false},
    {name: "Brok", age: 35, isAdmin: true}
];


let regularUserCount = 0;

for (let i = 0; i < users.length; i++) {
    if (!users[i].isAdmin) {
        regularUserCount++;
    }
}

console.log("количество обычных пользователей:", regularUserCount);
