
const $cardName = document.querySelector(".card-name");
const $cardNumbers = document.querySelector(".card-front-data-1");
const $cardDateMonth = document.querySelector(".date-month");
const $cardDateYear = document.querySelector(".date-year");
const $cardCvv = document.querySelector(".card-back-cvv");
const $form = document.querySelector(".card-form");
const $formName = $form.querySelector("#name");
const $formNumber = $form.querySelector("#number");
const $formDateMonth = $form.querySelector("#month");
const $formDateYear = $form.querySelector("#year");
const $formCvv = $form.querySelector("#cvv");
const $errorName = document.querySelector(".error-name");
const $errorNumber = document.querySelector(".error-number");
const $errorDate = document.querySelector(".error-date");
const $errorCvv = document.querySelector(".error-cvv");
const $modal = document.querySelector(".modal-card");
const $buttonModal = document.querySelector(".modal-card button");

const initialForm = {
  name : false,
  number : false,
  month : false,
  year : false,
  cvv : false,
}

$form.addEventListener("submit", e=>{
  e.preventDefault();
  let {name, number, month, year, cvv} = initialForm;

  name ? $errorName.classList.remove("error") :  $errorName.classList.add("error");
  
  number ?  $errorNumber.classList.remove("error") : $errorNumber.classList.add("error");

  month && year ? $errorDate.classList.remove("error") : $errorDate.classList.add("error")

  cvv ? $errorCvv.classList.remove("error") : $errorCvv .classList.add("error");

  if(name && number && month && year && cvv){
    $modal.classList.add("is-active");
  }
});
$buttonModal.addEventListener("click", e=>{
  location.reload();
});

let cardName = [];
$formName.addEventListener("keydown", e=>{
  e.preventDefault();
  if(e.key === "Backspace") cardName.pop();
  if(cardName.length === 28) return;
  if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 32) cardName.push(e.key);
  $formName.value = cardName.join("");
  $cardName.textContent = cardName.join("");
  if(cardName.length > 0){
    initialForm.name = true;
  }else{
    initialForm.name = false;
    $cardName.textContent = "Jose Jairo";
  }
});

let cardNums = [];
let count = 0;
$formNumber.addEventListener("keydown", e=>{
  e.preventDefault();
  if(e.key === "Backspace"){
    if(!cardNums.length) return;
    if(cardNums[cardNums.length - 1] === " "){
      cardNums.pop();
      count = 4;
    }
    cardNums.pop();
    count--;
  }
  if(cardNums.length === 19) return;
  if(count === 4){
    cardNums.push(" ");
    count = 0;
  }
  if(e.key >= 48 || e.key <= 57){
    cardNums.push(e.key);
    count++;
  }
  $formNumber.value = cardNums.join("");
  $cardNumbers.textContent = cardNums.join("");
  if(!cardNums.length) $cardNumbers.textContent = "1234 5678 9123 0000";
  if(cardNums.length < 19) initialForm.number = false;
  if(cardNums.length === 19) initialForm.number = true;
});

let month = [];
$formDateMonth.addEventListener("keydown", e=>{
  e.preventDefault();
  if(e.key === "Backspace") month.pop();
  if(month.length >= 2) return;
  if(e.key >= 48 || e.key <= 57) month.push(e.key);
  $formDateMonth.value = month.join("");
  $cardDateMonth.textContent = month.join("");  
  if(!month.length) $cardDateMonth.textContent = "00";
});
$formDateMonth.addEventListener("blur", e=>{
  if(month[0] === "0" && month[1] === "0") month.length = 0;
  if(month.length === 1) month.unshift("0");
  if(month[0]+month[1] > 12 ) month.length = 0;
  $formDateMonth.value = month.join("");
  $cardDateMonth.textContent = month.join("");  
  if(!month.length) $cardDateMonth.textContent = "00";
  month.length >= 2 ? initialForm.month = true : initialForm.month = false;
});

let year = [];
$formDateYear.addEventListener("keydown", e=>{
  e.preventDefault();
  if(e.key === "Backspace") year.pop();
  if(year.length >= 2) return;
  if(e.key >= 48 || e.key <= 57) year.push(e.key);
  $formDateYear.value = year.join("");
  $cardDateYear.textContent = year.join("");  
  if(!year.length) $cardDateYear.textContent = "00";
});
$formDateYear.addEventListener("blur", e=>{
  let currentYear = Number(`${new Date().getFullYear()}`.slice(2, 4));
  let yearInput = Number(year.join(""));
  if(yearInput <= currentYear) year.length = 0;
  $formDateYear.value = year.join("");
  $cardDateYear.textContent = year.join("");  
  if(!year.length) $cardDateYear.textContent = "00";
  yearInput > currentYear ? initialForm.year = true : initialForm.year = false;
});

let cvv = [];
$formCvv.addEventListener("keydown", e=>{
  e.preventDefault();
  if(e.key === "Backspace") cvv.pop();
  if(cvv.length >= 3) return;
  if(e.key >= 48 || e.key <= 57) cvv.push(e.key);
  $formCvv.value = cvv.join("");
  $cardCvv.textContent = cvv.join("");  
  if(!cvv.length) $cardCvv.textContent = "123";
  cvv.length >= 3 ? initialForm.cvv = true : initialForm.cvv = false;
});