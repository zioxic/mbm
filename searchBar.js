// https://fakestoreapi.com/products
let products;
const url = "https://fakestoreapi.com/products";
const autocompleteTag = document.querySelector(".autoCompleteInput");
const resultContainerTag = document.querySelector(".resultContainer")

fetch(url)
.then((response)=>{
const responseData = response.json();
return responseData;
})
.then((productsFromServer)=>{
    products=productsFromServer;
    autocompleteTag.disabled =false;
    console.log(products);
    SearchingUi();
})
.catch((err)=>{
    console.log("error arrivr",err)
});
let filteredProduct=[];

const SearchingUi=()=>{
    autocompleteTag.addEventListener("keyup",(event)=>{
        //select UI function
        if (event.key=== "ArrowDown"||event.key==="ArrowUp"||event.key==="Enter") {
            selectUi(event.key);
            return;
        }



        //AutoConplete Tag DropDown Code
        resultContainerTag.innerHTML="";
        const searchedIream = event.target.value.toLowerCase();
         if (searchedIream.length=== 0){
            return;
         }
        filteredProduct = products.filter((product)=>{
           return product.title.toLowerCase().includes(searchedIream);
             
        });
        const hasProductToshow = filteredProduct.length>0;
        if (hasProductToshow) {
            
          
            for(i=0;i<filteredProduct.length;i++){
                
                const tagContainer = document.createElement("div");
                tagContainer.id = filteredProduct[i].id;
                tagContainer.classList.add("tagcontainer");

                const productname = document.createElement("div");
                productname.append(filteredProduct[i].title);
                productname.classList.add("productName");

                tagContainer.append(productname);
                resultContainerTag.append(tagContainer);

            }
        }

    });
    let indexToselet = -1;

const selectUi =(key)=>{
    if (key=== "ArrowDown") {
        if(indexToselet===filteredProduct.length-1){
            indexToselet=-1;
            iteamDeselectedUI();
            return;
        }
        indexToselet+=1;
       iteamSlectedUI(indexToselet);
    if (indexToselet>0) {
        iteamDeselectedUI();
    }
      
    } else if(key==="ArrowUp") {
        if(indexToselet===0){
            iteamDeselectedUI();
            indexToselet= -1;
            return;
        }
        if(indexToselet===-1){
           
            return;
        }

        indexToselet-=1;
        iteamDeselectedUI();
        iteamSlectedUI(indexToselet);
        
    }else{
         
    }
   


}
const iteamSlectedUI = (index)=>{
    const SelectedContainerID = filteredProduct[index].id.toString();
    const SelectedContainer= document.getElementById(SelectedContainerID);
    SelectedContainer.style.backgroundColor= "#237BFF";
    SelectedContainer.firstChild.style.color="white";
    SelectedContainer.classList.add("selected");
} ;
const iteamDeselectedUI= ()=>{
    const Desaelectediteam= document.querySelector(".selected");
    Desaelectediteam.style.backgroundColor= "white";
    Desaelectediteam.firstChild.style.color="black";
    Desaelectediteam.classList.remove("selected");
}
}