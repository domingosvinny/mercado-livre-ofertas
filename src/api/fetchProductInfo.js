
const fetchProductInfo = async (id, is_description) => {
    
    console.log("id: " + id + "description: " + is_description  );
    var response= "";
    if(is_description == true){ 
        //console.log("é com descrição" );
         response = await fetch("https://api.mercadolibre.com/items/" + id +"/description");
    }
    else{
        //console.log("sem descrição");
        response = await fetch("https://api.mercadolibre.com/items/" + id);   
    }
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
   
    // console.log("consumo de api realizado");  
    
    return data;
   
   }
   
   export default fetchProductInfo;