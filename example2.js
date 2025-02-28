const url = 'https://reqres.in/api/users?page=2';

async function getData() {
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        let filteredData = data.data.sort((a,b) => b.id - a.id ) // сорт хочет 2 параметра и на основе их сортирует.  
        let sortedData = data.data.filter((a) => a.id > 10 ) // фильтр делает так, чтобы просто на основе чего-то отфильтрить
        let sumProducts = data.data.reduce((sum, product) => sum + product.id, 0)
        //console.log(filteredData)
        console.log(sortedData)
        console.log(sumProducts)
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

getData().then(data => {
    if (data) {
        console.log('Fetched Data:', data);
    }
});

