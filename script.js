let imgPlaceholder;
let imageNum;
let toggle;

const hideRawImage = () => imgPlaceholder.src = `images/rt/${imageNum}.webp`;

const loadRawImage = () => imgPlaceholder.src = `images/raws/raw${imageNum.replace('rt', '')}.webp`;

const toggleImage = () => {
    if (toggle.textContent.endsWith('Original')) {
        toggle.textContent = 'Show Retouched';
        loadRawImage();
    } else {
        toggle.textContent = 'Show Original';
        hideRawImage();
    }
};

const removeActive = () => {
    const active = document.querySelector('.active');
    active && active.classList.remove('active');
};

const loadRetouchedImage = e => {
    const target = e.target;

    removeActive();

    target.classList.add('active');
    toggle.textContent = 'Show Original';

    imageNum = target.dataset.rt;
    imgPlaceholder.src = `images/rt/${imageNum}.webp`;
    imgPlaceholder.alt = target.alt;
    imgPlaceholder.dataset.raw = `raw${imageNum.replace('rt', '')}`;

    imgPlaceholder.onload = () => {
        toggle.style.right = `${((1000 - imgPlaceholder.width) / 2) + 10}px`;
        toggle.hidden && (toggle.hidden = false);
    }
};

const init = () => {
    imgPlaceholder = document.querySelector('.image-wrapper img');
    toggle = document.querySelector('.toggle');

    document.querySelector('.thumbs').addEventListener('click', loadRetouchedImage);
    toggle.addEventListener('click', toggleImage);
};

window.addEventListener('load', init);