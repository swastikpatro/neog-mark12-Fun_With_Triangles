// console.log('Hare Krishna');

const angle1Input = document.querySelector('#angleOne-input');
const angle2Input = document.querySelector('#angleTwo-input');
const angle3Input = document.querySelector('#angleThree-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');

function angleLessThan360OrNot(angle) {
  return angle < 360 ? angle : angle % 360;
}

function displayOutput(msg, condn) {
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
  const referenceAngle1 = angleLessThan360OrNot(angle1);
  const referenceAngle2 = angleLessThan360OrNot(angle2);
  const referenceAngle3 = angleLessThan360OrNot(angle3);
  if (btnClicked === 'clear') {
    angle1Input.value = '';
    angle2Input.value = '';
    angle3Input.value = '';
    output.innerText = '';
    alertMsg('success', 'Cleared', 1000);
    return;
  }

  if (!(angle1Input.value && angle2Input.value && angle3Input.value)) {
    displayOutput('Please fill all input fields 🙏', false);
    return;
  }
  if (angle1Input.value < 0 || angle2Input.value < 0 || angle3Input.value < 0) {
    displayOutput("Angle can't be negative ❌", false);
    return;
  }

  const sumOfAllAngles = referenceAngle1 + referenceAngle2 + referenceAngle3;
  const complementary = sumOfAllAngles === 180;
  const shownAngles = [angle1, angle2, angle3]
    .map((item) => {
      return `${item}°`;
    })
    .join(', ');
  const shownReferenceAngles = [
    referenceAngle1,
    referenceAngle2,
    referenceAngle3,
  ]
    .map((item) => {
      return `${item}°`;
    })
    .join(', ');
  if (complementary) {
    displayOutput(
      `Congratulations, your angles ${shownAngles} i.e. (${shownReferenceAngles}) forms a triangle.`,
      true
    );
  } else {
    displayOutput(
      `Oops, your angles ${shownAngles} i.e. (${shownReferenceAngles}) doesn't form a triangle.`,
      false
    );
  }
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
