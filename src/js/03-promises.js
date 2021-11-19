import notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const obj = { position, delay };

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) resolve(obj);
      else reject(obj);
    }, delay);
  })

  .then(({ position, delay }) => {
    notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })

  .catch(({ position, delay }) => {
    notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
};

const inputForm = document.querySelector('.form');

const createPromiseHandler = event => {
  event.preventDefault();

  let delayRef = parseInt(event.target.elements.delay.value);
  const stepRef = parseInt(event.target.elements.step.value);
  const amountRef = parseInt(event.target.elements.amount.value);

  for (let position = 1; position <= amountRef; position += 1) {
    createPromise(position, delayRef);

    delayRef = delayRef + stepRef;
  }
};

inputForm.addEventListener('submit', createPromiseHandler);


