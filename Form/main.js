let input = Array.from(document.querySelectorAll("input"));
let textArea = document.querySelector("textarea");
let budgetValue = Array.from(document.getElementsByName("budget"));
let submitButton = document.querySelector("#submit");
let budgetError = document.querySelector(".error.budget");

function addValidationAlerts(inputvalue, firstSiblingOfSelectedInput){
     //error symbol warning
     inputvalue.nextElementSibling.classList.add("error-show");
     inputvalue.classList.add("error-border");
}

function removeValidationAlerts(inputvalue, firstSiblingOfSelectedInput){
    if ( inputvalue.nextElementSibling.classList.contains("error-show") && inputvalue.classList.contains("error-border")){
        inputvalue.nextElementSibling.classList.remove("error-show");
        inputvalue.classList.remove("error-border");
    }
}

//form validation
submitButton.addEventListener("click", (event)=>{
    event.preventDefault();
    let checked = [...document.getElementsByName("budget")].some(c=>c.checked);
    
    input.forEach((input)=>{
        console.log(textArea.value)
        let firstSibling = input.nextElementSibling;

        if(input.type == "email"){
            let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if((input.value.match(mailformat)) == null || input.value == ""){
               addValidationAlerts(input, firstSibling)
            }

            else{
                removeValidationAlerts(input, firstSibling)
            }
        }

        if(!(input.type == "email")){
            if ((input.value == "") || (input.value == null)){
                addValidationAlerts(input, firstSibling)
                
            }

            else{
                removeValidationAlerts(input, firstSibling)
            }
        }
    })

    if(textArea.value == null || textArea.value == ""){
        addValidationAlerts(textArea, textArea.firstSibling)
     }

     else{
         removeValidationAlerts(textArea, textArea.firstSibling)
     }

     for(const budget of budgetValue){
        if(!(budget.checked)){
            budgetError.classList.add("error-show")
        }
        else if(budget.checked){
            if(budgetError.classList.contains("error-show")){ budgetError.classList.remove("error-show")}
            break;
        }
     }

     

    //to check if all fields are filled in
    checkInputs();

})

checkInputs=()=>{
    let check = 0;
    for(let i = 0; i < input.length; i++){
        if((input[i].value != "") && (input[i].value != null)){
            check++;
        }
    }

    if (check == input.length){
         for(let i = 0; i < input.length; i++){
             input[i].value = "";} 
             window.location = "success.html"
            }
}
