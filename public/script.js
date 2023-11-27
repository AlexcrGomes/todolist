const closeMessage = document.querySelector('#closeMessage');
const message = document.querySelector('.message');

closeMessage.addEventListener('click', () => {
    message.style.display = 'none';
});

setTimeout(() => {
    message.style.display = 'none';
}, 5000);


  