function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchProducts = async (query) => {

//await sleep(8000);

 const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
 const data = await response.json();

 // console.log("consumo de api realizado");  
 
 return data.results;

}


export default fetchProducts;