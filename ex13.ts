class Car {
    brand: string;
    model: string;
    year: number;

    constructor(type:string, year: number, model:string){
        this.brand = type;
    this.year = year;
    this.model = model;
    }
}



// Создай машину и выведи в консоль
const myCar = new Car("Toyota", 2022, "Kamri");

(myCar as any).color = "red"
myCar.year = 2025
console.log(myCar);


console.log("owner" in myCar)

//Перебор свойств объекта
for(let key in myCar){
    console.log(`${key}: ${myCar[key]}`)
}

myCar.year = undefined as any; 
console.log(myCar)

////////////////////////////////////////////

const user1 = { name: "Alice", age: 25 };
const user2 = { city: "Prague", country: "Czech Republic" };

// ✅ Способ 1: Object.assign()
const merged1 = Object.assign({}, user1, user2);

// ✅ Способ 2: Spread-оператор (...)
const merged2 = { ...user1, ...user2 };

console.log(merged1);
console.log(merged2);
/*
{
  name: "Alice",
  age: 25,
  city: "Prague",
  country: "Czech Republic"
}
*/
////////////////////////////////////////////////////////////

const user = { name: "Alice", age: 25 };

// ✅ Создаём копию объекта (не ссылку!)
const userCopy = { ...user }; // Или Object.assign({}, user)

// ✅ Изменяем копию
userCopy.age = 30;

console.log(userCopy); // { name: "Alice", age: 30 }
console.log(user); // { name: "Alice", age: 25 } (оригинал не изменился!)

///////////////////////////////////////////////////

const products = [
    { name: "Laptop", price: 1200 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 150 },
    { name: "Monitor", price: 200 },
    { name: "USB Cable", price: 10 }
];

// ✅ Фильтрация товаров дороже 100
const expensiveProducts = products.filter(product => product.price > 100);

console.log(expensiveProducts);
/*
[
  { name: "Laptop", price: 1200 },
  { name: "Keyboard", price: 150 },
  { name: "Monitor", price: 200 }
]
*/
/////////////////////////////////////
const words = ["apple", "banana", "apple", "orange", "banana", "apple"];

// ✅ Подсчёт количества повторений
const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

console.log(wordCount);
/*
{
  apple: 3,
  banana: 2,
  orange: 1
}
*/
