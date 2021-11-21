function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const btnStartRef = document.querySelector('[data-start]');
  const btnStopRef = document.querySelector('[data-stop]');
  let  colorId;


  btnStartRef.addEventListener('click', () => {
    colorId = setInterval(() => document.querySelector('body').style.backgroundColor = getRandomHexColor(), 1000);
if(colorId !== null){
    btnStartRef.disabled = true;
}
});

btnStopRef.addEventListener('click', () => {
    clearInterval(colorId);
    btnStartRef.disabled = false;
});

