const API_URL = "https://api.example.com/orders";

// Функция для получения данных и вычисления статистики
async function calculateOrderStatistics() {
  try {
    // 1. Делаем запрос к API
    const response = await fetch(API_URL);

    // Проверяем, успешно ли выполнен запрос
    if (!response.ok) {
      throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
    }

    // 2. Преобразуем ответ в массив
    const orders = await response.json();

    // 3. Инициализируем переменные для подсчётов
    let totalSum = 0; // Общая сумма заказов
    const orderCount = orders.length; // Количество заказов

    // 4. Подсчёт общей суммы
    for (const order of orders) {
      totalSum += order.total; // Суммируем поле `total` каждого заказа
    }

    // 5. Вычисление среднего размера заказа
    const averageOrder = orderCount > 0 ? (totalSum / orderCount).toFixed(2) : 0;

    // 6. Возвращаем объект с результатами
    return {
      totalSum,
      averageOrder: parseFloat(averageOrder), // Преобразуем строку в число
      orderCount,
    };
  } catch (error) {
    console.error("Ошибка:", error.message);
    return {
      totalSum: 0,
      averageOrder: 0,
      orderCount: 0,
    }; // Возвращаем пустую статистику в случае ошибки
  }
}

// Использование функции
calculateOrderStatistics().then((statistics) => {
  console.log("Статистика заказов:", statistics);
});