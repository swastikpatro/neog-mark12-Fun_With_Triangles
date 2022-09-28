console.log('Hare Krishna');

const baseInput = document.querySelector('#base-input');
const heightInput = document.querySelector('#height-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');
const alertText = document.querySelector('.alert');

function alertMsg(type, msg, ms) {
  const tID = setInterval(() => {
    alertText.innerText = msg;
    alertText.classList.add(`alert-${type}`);
    alertText.classList.add('show-alert');
  }, 0);

  setTimeout(() => {
    clearInterval(tID);
    alertText.classList.remove(`alert-${type}`);
    alertText.classList.remove('show-alert');
  }, ms);
}

function displayOutput(hypoVal) {
  output.innerHTML = `The length of hypotenuse is 
  <span>${hypoVal}</span>`;
}

function squared(num) {
  return num ** 2;
}

function handleContainerClick(e) {
  e.preventDefault();
  if (!('btn' in e.target.dataset)) {
    return;
  }

  const btnClicked = e.target.dataset.btn;
  const base = baseInput.valueAsNumber;
  const height = heightInput.valueAsNumber;
  if (btnClicked === 'clear') {
    baseInput.value = '';
    heightInput.value = '';
    output.innerText = '';
    alertMsg('success', 'Cleared', 1000);
    return;
  }

  if (!(baseInput.value && heightInput.value)) {
    alertMsg('danger', 'Please fill all input fields 🙏', 1000);
    return;
  }
  if (baseInput.value <= 0 || heightInput.value <= 0) {
    alertMsg('danger', "Inputs can't be zero or less than zero ❌", 1000);
    return;
  }

  const hypotenuse = Math.sqrt(squared(base) + squared(height)).toFixed(2);
  displayOutput(hypotenuse);
  alertMsg('success', 'Done ✅', 1000);
}

btnContainer.addEventListener('click', handleContainerClick);

document.querySelectorAll('input').forEach((singleInput) => {
  singleInput.addEventListener('click', () => {
    output.innerText = '';
  });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
  const scrollHeight = window.scrollY;
  const headerHeight = header.getBoundingClientRect().height;
  if (scrollHeight > headerHeight) {
    header.classList.add('fixed-nav');
  } else {
    header.classList.remove('fixed-nav');
  }
});
