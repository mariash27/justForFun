const url = 'https://run.mocky.io/v3/d4bf46d5-6cb8-4459-88a1-efb670114e4b'
const MAX_REQ = 1000; // API limit per request
const MAX_PRICE = 100000; // Max price range

//fetch data with specific range
async function getData(minPrice, maxPrice) {
    try {
        const resp = await fetch(`${url}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        if (!resp.ok) throw new Error('Failed to fetch data');

        const data = await resp.json()
        return data;
    } catch(error){
        console.error('Error fetching data:', error.message)
        return null;
    }
    

    
}

//
async function getAllProducts() {
    let products = []; //for all fetched products
    let queue = [{minPrice: 0, maxPrice: MAX_PRICE}] //queue of price ranges

    while (queue.length > 0){
        let range = queue.shift()
        const minPrice = range.minPrice
        const maxPrice = range.maxPrice
        const data = await getData(minPrice, maxPrice)

        if(!data) continue; //continue if data is null

        if(data.total > MAX_REQ){
            const midPrice = Math.floor( (maxPrice + minPrice) / 2 ) //split range to avoid API limit
            queue.push({minPrice , maxPrice: midPrice})
            queue.push({minPrice: midPrice + 1, maxPrice})
        } else {
            products = products.concat(data.products) // add products to the result arr
        }

    }
    console.log(`Total amount of products fetch: ${products.length}`)
    return products
    
}

getAllProducts()
