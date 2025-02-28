const url = ''
const MAX_PRICE = 1000;
const MAX_REQ = 100

async function getData(minPrice, maxPrice) {
    const resp = await fetch (`${url}?minPrice=${minPrice}&maxPrice=${maxPrice}`)
    if(!resp.ok) throw new Error('Error fetching data')
    
    const data = await resp.json()
    return data;
}


async function filteredData() {
    let result = []
    let queue = [{minPrice : 0, maxPrice : MAX_PRICE}]
    

    while ( queue.length > 0 ){
        let range = queue.shift()
        let minPrice = range.minPrice
        let maxPrice = range.maxPrice

        let data = await getData(minPrice, maxPrice)

        if(data.total > MAX_REQ){
            let midPrice = Math.floor((maxPrice+ minPrice) / 2)
            queue.push({minPrice : minPrice, maxPrice: midPrice})
            queue.push({minPrice: midPrice + 1, maxPrice})
        }
        else{
            result = result.concat(data.products)
        }
    }
    return result
    
}

filteredData()