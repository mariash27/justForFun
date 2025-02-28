const API_URL = "https://api.example.com/transactions";

// Функция для получения данных и разделения по категориям
async function groupTransactionsByType() {
  try {
    // 1. Делаем запрос к API
    const response = await fetch(API_URL);

    // Проверяем успешность запроса
    if (!response.ok) {
      console.error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
      return {};
    }

    // 2. Преобразуем ответ в массив
    const transactions = await response.json();

    // 3. Создаём объект для категорий
    const groupedTransactions = {};

    // 4. Проходим по всем транзакциям
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i]; // Текущая транзакция
      const type = transaction.type; // Тип транзакции

      // Если категории ещё нет, создаём её
      if (!groupedTransactions[type]) {
        groupedTransactions[type] = [];
      }

      // Добавляем транзакцию в нужную категорию
      groupedTransactions[type].push(transaction);
    }

    // 5. Возвращаем объект с категориями
    return groupedTransactions;
  } catch (error) {
    console.error("Ошибка:", error.message);
    return {}; // Возвращаем пустой объект в случае ошибки
  }
}

// Используем функцию
groupTransactionsByType().then((groupedTransactions) => {
  console.log("Транзакции по категориям:", groupedTransactions);
});
