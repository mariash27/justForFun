var Car = /** @class */ (function () {
    function Car(type, year, model) {
        this.brand = type;
        this.year = year;
        this.model = model;
    }
    return Car;
}());
// Создай машину и выведи в консоль
var myCar = new Car("Toyota", 2022, "Kamri");
myCar.color = "red";
myCar.year = 2025;
console.log(myCar);
console.log("owner" in myCar);
//Перебор свойств объекта
for (var key in myCar) {
    console.log("".concat(key, ": ").concat(myCar[key]));
}
myCar.year = undefined;
console.log(myCar);
