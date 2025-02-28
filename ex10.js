const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
  ];
  const API_URL = "https://api.example.com/products";
  

async function fetchProductDetails(products) {
    try {
      // 1. Создаём массив запросов для загрузки деталей продуктов
      const requests = products.map((product) =>
        fetch(`${API_URL}/${product.id}`).then((res) => res.json())
      );
  
      // 2. Выполняем все запросы параллельно
      const details = await Promise.all(requests);
  
      // 3. Возвращаем массив деталей
      return details;
    } catch (error) {
      console.error("Ошибка загрузки деталей продуктов:", error.message);
      return [];
    }
  }
  
  // Использование функции
  fetchProductDetails([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
  ]).then((details) => {
    console.log("Детали продуктов:", details);
  });
  