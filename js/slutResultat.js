const sectioner = document.getElementsByTagName('section');
const steps = document.getElementsByClassName('step-box')

let nuværendeIndex = 0;
let nuværendeSection = sectioner[nuværendeIndex];
let nuværendeStep = steps[nuværendeIndex];

function næsteSection() {
    nuværendeSection.classList.toggle('d-none');
    nuværendeStep.classList.toggle('active');

    nuværendeIndex = nuværendeIndex + 1;
    nuværendeSection = sectioner[nuværendeIndex];
    nuværendeStep = steps[nuværendeIndex];

    nuværendeSection.classList.toggle('d-none');
    nuværendeStep.classList.toggle('active');
}

function forrigeSection() {
    nuværendeSection.classList.toggle('d-none');
    nuværendeStep.classList.toggle('active');

    nuværendeIndex = nuværendeIndex - 1;
    nuværendeSection = sectioner[nuværendeIndex];
    nuværendeStep = steps[nuværendeIndex];

    nuværendeSection.classList.toggle('d-none');
    nuværendeStep.classList.toggle('active');
}