const url = "https://api.example.com/users"
const url_post = "https://api.example.com/filtered-users"
const AGE = 30; 

async function fetchFilteredData() {
    let result = []
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Error fetching data');
        }
        const data = await response.json();
        result = data.filter((user) => user.age > AGE)

    }catch(error){
        console.error(error.message)
    }
    return result
    
}

async function postFilteredData(filteredData) {
    try{
        const response = await fetch(url_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filteredData)
        })

        const result = await response.json()

    }catch(error){
        console.error(error.message)
    }

    
}

fetchFilteredData().then((filteredData) => {
    console.log(filteredData)
    postFilteredData(filteredData)
})