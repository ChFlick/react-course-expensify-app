// Object destructuring
// const person = {
//     age: 24,
//     location: {
//         city: 'Muenster',
//         temp: 21,
//     },
// };

// // const name = person.name;
// // const age = person.age;
// const { name: firstName = 'Anon', age } = person;
// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;
// if (temperature && city) {
//     console.log(`It's ${temperature} in ${city}.`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin',
//     },
// };

// const {
//     publisher: {
//         name: publisherName = 'Self-Published',
//     } = {},
// } = book;

// console.log(`${publisherName} `);

// Array destructuring

// const address = ['Neuheim', '17', '48155', 'Muenster', 'Germany'];

// const [,,, city, state = 'Unknown'] = address;

// console.log(`You are in ${city} ${state}`);

const item = ['Coffee (iced)', '$3.00', '$3.50', '$3.75'];

const [hotCoffee,, mediumPrice] = item;

console.log(`A medium ${hotCoffee} costs ${mediumPrice}`);
