
//variables
let balance=200;
let pay=0;
let loan=0;






//starter fucntion
function start(){

let card1TextId= document.getElementById("card1Text")
card1TextId.innerHTML=balance;
document.getElementById("card2Text").innerHTML=pay;

fetchMethod();
}

//calling starter function
start();


//Loan button

function getALoan(){
    let loanSum= window.prompt("Type in preffered loan")
    if(loanSum==""){
        loanSum=0;
    }
    loanSum=parseInt(loanSum)
    if(loanSum> balance*2){
        document.getElementById("loanError").innerHTML="Error, you cant exceed twice ur balance on loan"
        return false;
    } else if((loan+loanSum) > balance*2){
        return false
    } else{
        loan=loan+loanSum
        balance=balance+loan
        document.getElementById("loan_P").innerHTML="Loan: " + loan;
        document.getElementById("loanError").innerHTML=""

        document.getElementById("card1Text").innerHTML=balance;
    }
    
}

//work button

function work(){
    pay+=100;
    document.getElementById("card2Text").innerHTML=pay;
}

//bank button

function bank(){
    if(loan>0){
        loan-= (pay/10);
        pay= pay*0.9;
        balance += pay;
        document.getElementById("card1Text").innerHTML=balance;
        document.getElementById("loan_P").innerHTML="Loan: " + loan
        pay=0;
        document.getElementById("card2Text").innerHTML=pay;

    }else{
        balance += pay;
        document.getElementById("card1Text").innerHTML=balance;
        pay=0;
        document.getElementById("card2Text").innerHTML=pay;
    }
}

// Varaible for function
let computers= []

function fetchMethod() {
    //fetch("${inn}")
    fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => computers =data)
    .then(computers => addComputersToMenu(computers))
}

//Variable for function
let computerDescription= document.getElementById("card3Text");

const addComputersToMenu = (computers)=> {
    computers.forEach(element => {
        addComputerToMenu(element)
    });

    computerDescription.innerText=computers[0].specs;
    createComputerCard()


}

//Variable for function
let computersElement=document.getElementById("select")

const addComputerToMenu = (computer) =>{
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title))

    computersElement.appendChild(computerElement);
}



const handleComputerMenuChange = e=>{
    const selectedComputer= computers[e.target.selectedIndex]
   // computerDescription.innerText=selectedComputer.specs;

    const compSpecs=selectedComputer.specs;
    

    let p = document.getElementById("card3Text");
    p.innerText=""
    compSpecs.forEach(x =>{ 
        
        p.textContent += x +", " 
        
    }   
        );
    
    
   

    createComputerCard();
    

}

// Eventlistener for method above
computersElement.addEventListener("change", handleComputerMenuChange)


//Variables for the new card
const computerCard= document.getElementById("newCard");
let newCardTitle= document.getElementById("newCardTitle")
let newCardIMG= document.getElementById("newCardIMG");
let newCardText= document.getElementById("newCardText")
let newCardPrice= document.getElementById("newCardPrice")

const createComputerCard= ()=> {
    const theSelectedComputer= computers[computersElement.selectedIndex]
    
    newCardIMG.src="https://hickory-quilled-actress.glitch.me/"+theSelectedComputer.image;
    newCardTitle.innerText=theSelectedComputer.title;
    newCardText.innerText=theSelectedComputer.description;
    newCardPrice.innerText=theSelectedComputer.price;
    

   
    
}

//but method

function buy(){
    console.log("buy")
    const theSelectedComputer= computers[computersElement.selectedIndex]

    let price= theSelectedComputer.price;
    let intPrice= parseInt(price);

    if(price>balance){
        return;
    }else{
        balance=balance-intPrice;
        document.getElementById("card1Text").innerHTML=balance;
    }
    

}

