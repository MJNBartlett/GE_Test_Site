/*
* Start Header/Navigation functions
*/
const hamburgerCheckbox = document.getElementById('x-hamburger');
const header = document.getElementById('header');

window.addEventListener('resize', resizeWindow);
hamburgerCheckbox.addEventListener('change', headerHeight);

function headerHeight(){
  if(hamburgerCheckbox.checked){
    header.classList.add('header-large');
  }else{
    header.classList.remove('header-large');
  }
}

// Accomodate for window resize with hamburger menu open - Collapses memnu automaticallu\y.
function resizeWindow(){
  if(window.innerWidth >= 850){
    hamburgerCheckbox.checked = false;
    header.classList.remove('header-large');
  }
}

/*
* End Header/Navigation functions
*
* Start carousel functions
*/

const radio1 = document.getElementById('radio-1');
const radio2 = document.getElementById('radio-2');
const carousel = document.getElementById('section-1-carousel');

radio1.addEventListener('click', scrollLeft);
radio2.addEventListener('click', scrollRight);
carousel.addEventListener('scroll', scrollIndicator);

function scrollLeft(){
  const borderLeft = carousel.getBoundingClientRect().left;
  carousel.scrollTo({
    left: 0,
    behavior: 'smooth'
  });
}

function scrollRight(){
  const borderRight = carousel.getBoundingClientRect().right;
  carousel.scrollTo({
    left: borderRight,
    behavior: 'smooth'
  });
}

function scrollIndicator(){
  // setTimeout to prevent flickering of radio buttons when clicked.
  setTimeout(() => {
    if (carousel.scrollLeft <= 120){
      radio1.checked = true;
    }else if (carousel.scrollLeft >= 120) {
      radio2.checked = true;
    }
  }, 400)
}

/*
* End carousel functionality
*
* Start form validation and handling
*/

const nameInput = document.getElementById('name-input');
const nameError = document.getElementById('name-error');
const phoneInput = document.getElementById('phone-input');
const phoneError = document.getElementById('phone-error');
const messageInput = document.getElementById('message-input');
const submitButton = document.getElementById('submit-button');

// Input event triggered every key press.
phoneInput.addEventListener('input', validatePhone)
nameInput.addEventListener('input', validateName)
submitButton.addEventListener('click', validateSubmit);

function validatePhone(){
  const inputValue = phoneInput.value;
  const reg = new RegExp(/[^0-9]/); //Check for illegal characters (any non-numbers)
  const result = reg.test(inputValue); //Returns false if valid.

  if (result){
    // Reveal error message
    phoneError.classList.remove('display-none');
  }else{
    // Hide error message
    phoneError.classList.add('display-none');
  }
  return result
}

function validateName(){
  const inputValue = nameInput.value;
  const reg = new RegExp(/[^A-Za-z\. ]/); //Check for illegal characters (any non-(alphabet, space, dot))
  const result = reg.test(inputValue); //Returns false if valid.

  if (result){
    // Reveal error message
    nameError.classList.remove('display-none');
  }else{
    // Hide error message
    nameError.classList.add('display-none');
  }
  return result
}

function validateSubmit(evt){
  evt.preventDefault();

  if (messageInput.value === '' || phoneInput.value === '' || nameInput.value === ''){
    // Incomplete fields
    alert('Enter the complete details.')
  }else if(validateName() || validatePhone()){
    // Invalid fields - each function returns true if illegal characters.
    alert('Invalid entry, please check each field and try again.')
  }else{
    // Valid fields - Reset each field and display success message.
    messageInput.value = ''
    phoneInput.value = ''
    nameInput.value = ''
    alert('Form Submitted')
  }
}

/*
* End form validation and handling
*/
