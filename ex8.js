const API_PRODUCTS = "https://api.example.com/products"; // URL для списка продуктов


// Функция для получения полной информации о продуктах
async function fetchProductDetails() {
  try {
    // 1. Получить список продуктов
    const response = await fetch(API_PRODUCTS);

    if (!response.ok) {
      throw new Error(`Ошибка при запросе списка продуктов: ${response.status} ${response.statusText}`);
    }

    const products = await response.json(); // Список продуктов с базовой информацией

    // 2. Получить детали для каждого продукта параллельно
    const detailedProducts = await Promise.all(
      products.map(async (product) => {   //потому что это как бы асинхронная стрелочная функция
        const detailsResponse = await fetch(`${API_PRODUCT}/${product.id}`); // Запрос на детали продукта

        if (!detailsResponse.ok) {
          throw new Error(`Ошибка при запросе деталей продукта ${product.id}: ${detailsResponse.status}`);
        }

        const details = await detailsResponse.json(); // Получение деталей
        return details; // Возвращаем объект с полной информацией о продукте
      })
    );

    // 3. Вернуть массив с полной информацией о продуктах
    return detailedProducts;
  } catch (error) {
    console.error("Ошибка:", error.message);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}

// Использование функции
fetchProductDetails().then((products) => {
  console.log("Детальная информация о продуктах:", products);
});
