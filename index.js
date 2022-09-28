// console.log('Hare Krishna');

const angle1Input = document.querySelector('#angleOne-input');
const angle2Input = document.querySelector('#angleTwo-input');
const angle3Input = document.querySelector('#angleThree-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');
const alertText = document.querySelector('.alert');

// lucky-btn
// const triangleContainer = document.createElement("section");
// triangleContainer.classList.add("triangle-container");
// const triangleInnerDiv = document.createElement("div");

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

function angleLessThan360OrNot(angle) {
  return angle < 360 ? angle : angle % 360;
}

function displayOutput(msg) {
  const condn = msg.includes('Congratulations');
  output.innerHTML = `
  <span style="color: ${condn ? 'green' : 'red'}">
    ${msg}
  </span>
  `;
}

function handleContainerClick(e) {
  e.preventDefault();
  if (!('btn' in e.target.dataset)) {
    return;
  }

  const btnClicked = e.target.dataset.btn;
  const angle1 = angle1Input.valueAsNumber;
  const angle2 = angle2Input.valueAsNumber;
  const angle3 = angle3Input.valueAsNumber;
  const angle1Updated = angleLessThan360OrNot(angle1);
  const angle2Updated = angleLessThan360OrNot(angle2);
  const angle3Updated = angleLessThan360OrNot(angle3);
  if (btnClicked === 'clear') {
    angle1Input.value = '';
    angle2Input.value = '';
    angle3Input.value = '';
    output.innerText = '';
    alertMsg('success', 'Cleared', 1000);
    return;
  }

  if (!(angle1Input.value && angle2Input.value && angle3Input.value)) {
    alertMsg('danger', 'Please fill all input fields 🙏', 1000);
    return;
  }
  if (angle1Input.value < 0 || angle2Input.value < 0 || angle3Input.value < 0) {
    alertMsg('danger', "Angle can't be negative ❌", 1000);
    return;
  }

  const sumOfAllAngles = angle1Updated + angle2Updated + angle3Updated;
  const complementary = sumOfAllAngles === 180;
  const shownAngles = [angle1, angle2, angle3]
    .map((item) => {
      return `${item}°`;
    })
    .join(', ');
  const shownAnglesUpdated = [angle1Updated, angle2Updated, angle3Updated]
    .map((item) => {
      return `${item}°`;
    })
    .join(', ');
  if (complementary) {
    displayOutput(
      `Congratulations, your angles ${shownAngles} i.e. (${shownAnglesUpdated}) forms a triangle.`
    );
  } else {
    displayOutput(
      `Oops, your angles ${shownAngles} i.e. (${shownAnglesUpdated}) can't form a triangle.`
    );
  }

  alertMsg('success', 'Done ✅', 1000);
}

btnContainer.addEventListener('click', handleContainerClick);

[...document.querySelectorAll('input')].forEach((singleInput) => {
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
