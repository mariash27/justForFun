const url = "https://api.apify.com/v2/datasets/VuFwckCdhVhoLJJ08/items?clean=true&format=json";

async function fetchData() {
  try {
    // Шаг 1: Получаем данные
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    const data = await response.json();

    // Шаг 2: Сортируем массив по productId
    let sortedData = data.sort((a, b) => a.productId.localeCompare(b.productId));

    // Шаг 3: Инициализация переменных
    let minPrice = Infinity;
    let cheapesArray = [];
    let myOfferId = 0;

    // Шаг 4: Проходим по отсортированному массиву
    for (let i = 1; i < sortedData.length; i++) {
      const currentProduct = sortedData[i];
      const previousProduct = sortedData[i - 1];

      // Если текущий и предыдущий продукт имеют одинаковый productId
      if (currentProduct.productId === previousProduct.productId) {
        // Сравниваем цены и выбираем минимальную
        if (parseFloat(previousProduct.price.replace("$", "")) < parseFloat(currentProduct.price.replace("$", ""))) {
          minPrice = parseFloat(previousProduct.price.replace("$", ""));
          myOfferId = previousProduct.offerId;
        } else {
          minPrice = parseFloat(currentProduct.price.replace("$", ""));
          myOfferId = currentProduct.offerId;
        }
      } else {
        // Если продукт изменился, добавляем минимальное предложение в массив
        cheapesArray.push({
          productId: previousProduct.productId,
          offerId: myOfferId,
          price: `$${minPrice.toFixed(2)}`,
        });

        // Сбрасываем значения для следующего продукта
        minPrice = parseFloat(currentProduct.price.replace("$", ""));
        myOfferId = currentProduct.offerId;
      }
    }

    // Добавляем последний продукт в массив
    const lastProduct = sortedData[sortedData.length - 1];
    cheapesArray.push({
      productId: lastProduct.productId,
      offerId: myOfferId,
      price: `$${minPrice.toFixed(2)}`,
    });

    // Шаг 5: Выводим результат
    console.log("Самые дешевые предложения:", cheapesArray);
    return cheapesArray;
  } catch (error) {
    console.error("Ошибка:", error.message);
    return [];
  }
}

// Вызов функции
fetchData();
