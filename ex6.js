const url = "https://api.example.com/products"
const categories = ["electronics", "furniture", "clothing"];
const MAX_PER_PAGE = 40;




async function fetchProductsByCategory(categories) {

    const allProducts = {}

    for (let i = 0; i < categories.length; i++){
        let category = categories[i]
        allProducts[category] = await fetchAllProducts(category)
    }
    return allProducts;
    
}

async function fetchProductsByCategory(categories) {

    const promises = categories.map((category) => fetchAllProducts(category));
    const results = await Promise.all(promises);

    const allProducts = {};
    categories.forEach((category, index) => {
        allProducts[category] = results[index];
    });

    return allProducts;
    
}

async function fetchAllProducts(category) {
    let page = 1;
    let result = [];
    let total = Infinity;
    
    try{
        while( (page - 1) * MAX_PER_PAGE < total){
        const response = await fetch(`${url}?category=${category}&page=${page}`)
        if(!response.ok){
            throw new Error('Error fetching data')
        }
        const data = await response.json()
        total = data.total;
        result = result.concat(data.products)
        page++;
    }


    }catch(error){
        console.error(error.message)
    }
    
    return result;
}

fetchProductsByCategory(categories).then((allProducts)=> {
    console.log("All products:", allProducts)
})