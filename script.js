//Step No 1: Accessing my html form input and button

const inputValue=document.querySelector("#inputValue");

const mainTodoElement=document.querySelector(".todo-lists-elem");


//step no 4 : Fetching the values from the local storage

const getValuesFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem("myTodoList"));
}

//Step no 8: last step update the local storage after deleting elements

const updateLocalStorage=(localTodoLists)=>{
    return localStorage.setItem("myTodoList",JSON.stringify(localTodoLists));
}

let localTodoLists=getValuesFromLocalStorage() || [];


//step no 6:Calling th e addDynamicElement function to add elements automatically when we first time open website

const addDynamicElements=(curElem)=>{
    
    // creating a new element and adding it in my section below input form

    const divElement=document.createElement("div");

    //adding class and innerHtml in div

    divElement.classList.add("main_todo_div");

    divElement.innerHTML=`<li>${curElem}</li>   <button class="deleteBtn">Delete</button>`;

    mainTodoElement.append(divElement);
}


//Step No 3: Creating a addTodo() function to add create and add a element and store the values to a local storage

//    let localTodoLists=[]; we use it in first step but now we create it in new style

 const addTodoList=(e)=>{
    // The purpose of e.preventDefault is that by default form had a behavior of submit so i cancel that behavior.

    e.preventDefault();

    // Accessing the input value and store it in a new variable
    let localTodoValue=inputValue.value.trim();

    inputValue.value="";


    // applying a condition that if user enter a empty string or same name it should not add in section

    if(localTodoValue!=="" && !localTodoLists.includes(localTodoValue))
    {
        localTodoLists.push(localTodoValue);

        // to avoid multiplicity in array i use set method
    
        localTodoLists=[ ...new Set(localTodoLists)];
    
       // storing my array in local storage
        
        localStorage.setItem("myTodoList",JSON.stringify(localTodoLists));
    
        
        addDynamicElements(localTodoValue);

    }

   

     
 };



 //step no 5: now after storing my values in local storage i want to show them when we first time open the website

  const showTodo=()=>{
    console.log(localTodoLists);
   localTodoLists.forEach((curElem)=>{
        addDynamicElements(curElem);
    })

  }

showTodo();


//step no 7: now adding a removeTodo function to remove my element from section

const removeTodo=(e)=>{
    let target=e.target;
  
    let removeContentList=target.previousElementSibling.innerText;
    
    let parentElem=target.parentElement;
    console.log(parentElem);

    localTodoLists=localTodoLists.filter((curTodo)=>{
        return curTodo!=removeContentList.toLowerCase();
    })
   
    updateLocalStorage(localTodoLists);
    parentElem.remove();
}


mainTodoElement.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn"))
    {
        removeTodo(e);
    }
})



//Step no 2 : Applying event listener to my input button to add Todo Elements in my section

document.querySelector(".btn").addEventListener("click",(e)=>{

// Now calling addTo() function to create and add element in my section
    addTodoList(e);
});