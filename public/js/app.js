const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchElement.value;
  searchElement.value = '';
  messageOne.textContent = 'Loading...';
  fetch(`/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.address.toUpperCase();
      messageTwo.textContent = `The temperature is ${data.temp}. It is ${data.desc.toLowerCase()} now.`
      messageTwo.insertAdjacentHTML('beforebegin', `<img src=${data.icon} alt="weather icon">`);
    }
  })
})
})