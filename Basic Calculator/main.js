let abegAmountDisplay = document.querySelector("#number-input");
let keypad = Array.from(document.querySelectorAll(".number-pad"));
let erase = document.querySelector(".erase");
let zeroKeypad = document.querySelector(".zero");

let calculator={
    firstOperand: null,
    nextOperand:null,
    operatorSymbol:null,
}

abegAmountDisplay.onkeydown = ()=> false;

(disableZeroKeypad =()=>{
    if(abegAmountDisplay.value == "" ){
       zeroKeypad.disabled=true;
     }
})()


let limitNumber = (input, numKeypad)=>{
    //number can't be more than 999,999,999  
    numKeypad.disabled = true;

    if(input.includes('.')){abegAmountDisplay.value = input.substr(0,9); return}
    abegAmountDisplay.value = input.substr(0,8)   
}

let getInput = (name, key)=>{
    erase.textContent = "C"
    if(name == 'digit'){

        if(calculator.nextOperand === true){
            abegAmountDisplay.value = key.value;
            calculator.nextOperand = false
        }
        else{
            abegAmountDisplay.value += key.value;
        }

        let currentInput = abegAmountDisplay.value;
        if(currentInput == "" ){
            zeroKeypad.disabled=true;
          }else{
            zeroKeypad.disabled=false;
          }

        if((Number(currentInput) > 99999999) || (String(currentInput).length > 9)){limitNumber(currentInput, key)}
    }
}

if (abegAmountDisplay.value != ""){zeroKeypad.disabled=false;}


let checkOperand =(operator)=>{
    let{firstOperand, operatorSymbol} = calculator;

    value = parseFloat(abegAmountDisplay.value)

    if((operatorSymbol) && (calculator.nextOperand) && !(operator == 'percentage')){
        calculator.operatorSymbol = operator;
        return;
    }

    if(operator == 'percentage'){
        value = parseFloat((value/100).toFixed(7));
        abegAmountDisplay.value = value;
    }

    if((calculator.firstOperand == null) && (!isNaN(value))){
        calculator.firstOperand = value;
    }

    else if(operator){
        let answer = calculate(firstOperand, value, operatorSymbol)

        if(String(answer).length > 8){
            answer = answer.toExponential(3);
            abegAmountDisplay.value = answer;
            calculator.firstOperand = answer;
        }else{
            abegAmountDisplay.value = parseFloat(answer.toFixed(7));
            calculator.firstOperand = answer;
        }
    }

    calculator.nextOperand= true;
    calculator.operatorSymbol = operator;
}

let calculate =(firstOperand, secondOperand, operator)=>{
    firstOperand = Number(firstOperand)

        if(operator === 'multiplication'){
            return firstOperand * secondOperand;
        }
    
        else if(operator === 'division'){
            return firstOperand / secondOperand;
        }
    
        else if(operator === 'addition'){
            return firstOperand + secondOperand;
        }
    
        else if(operator === 'subtraction'){
            return firstOperand - secondOperand;
        }
    
        return secondOperand;
    }



keypad.forEach((key)=>{
    key.addEventListener("click", (event)=>{

        
        getInput(event.target.name, key)

        if(event.target.name != 'digit'){
            if(event.target.name == 'multiplication'){
                checkOperand(event.target.name)
            }

            else if(event.target.name == 'division'){
                checkOperand(event.target.name)
            }

            else if(event.target.name == 'addition'){
                checkOperand(event.target.name)
            }

            else if(event.target.name == 'subtraction'){
                checkOperand(event.target.name)
            }

            else if(event.target.name == 'equal'){
                checkOperand(event.target.name)
            }

            else if(event.target.name == 'percentage'){
                checkOperand(event.target.name)
            }

            else if(event.target.name == 'decimal'){
               // if(String(decimalInput).length > 9){limitNumber(decimalInput, key)} 

                if(calculator.nextOperand == true || abegAmountDisplay.value== ""){
                    abegAmountDisplay.value= "0.";
                    calculator.nextOperand = false
                    return;
                }

                if(!(abegAmountDisplay.value.includes('.'))){
                    abegAmountDisplay.value +=key.value
                }
            }
        }


         //abegAmountDisplay.value = input;
         abegAmountDisplay.style.width = ((abegAmountDisplay.value.length + 1) * 27) + 'px';
    
    })
})


erase.addEventListener("click", ()=> {
    erase.textContent ="AC"
    if (abegAmountDisplay.value.length > 0){
            abegAmountDisplay.value="";
            disableZeroKeypad()
    }

    //reset calculator
    calculator.firstOperand = null;
    calculator.nextOperand = null;
    calculator.operatorSymbol=null; 
})  
