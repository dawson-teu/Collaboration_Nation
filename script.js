document.querySelector('section#start button').addEventListener('click', (event) => {
    document.querySelector('section#start').classList.add('hidden');
    document.querySelector('section#login').classList.remove('hidden');
});
