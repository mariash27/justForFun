function FindDifference(nums, target) {
    const map = new Map(); // Храним числа и их индексы
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        // Проверяем, есть ли в map число, которое с num даёт разницу target
        if (map.has(num - target)) {
            return [map.get(num - target), i]; // Нашли пару (num - target, num)
        }
        if (map.has(num + target)) {
            return [map.get(num + target), i]; // Нашли пару (num + target, num)
        }
        map.set(num, i); // Добавляем число в map
    }
    return []; // Если не нашли пару
}
// Пример использования
console.log(FindDifference([1, 5, 9, 3], 4)); // [0, 3], так как 5 - 1 = 4
