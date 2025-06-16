const btnOpen = document.querySelector('.btn-open');
const btnClose = document.querySelector('.modal__btn-close');
const modal = document.querySelector('.modal');

btnOpen.addEventListener('click', () => {
    modal.classList.add('active');
});

btnClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        modal.classList.remove('active')
    }
})