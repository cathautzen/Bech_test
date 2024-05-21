const sectioner = document.getElementsByTagName('section');
const steps = document.getElementsByClassName('step-box');

// Vi selecter de 3 gå videre knapper via deres id.
const button1 = document.querySelector('#choice1_button');
const button2 = document.querySelector('#choice2_button');
const button3 = document.querySelector('#choice3_button');

// Vi gemmer vores selectorer for de forskellige rækker af svarmuligheder, sådan at vi kan genbruge dem senere.
const inputChoice1 = 'input[name=choice1]';
const inputChoice2 = 'input[name=choice2]';
const inputChoice3 = 'input[name=choice3]';

document.querySelectorAll(inputChoice1).forEach(function(input) {
    input.addEventListener('change', function() {
        const svar1 = tjekSvar1();

        if (svar1 != null) {
            button1.disabled = false;
        }
    })
});

document.querySelectorAll(inputChoice2).forEach(function(input) {
    input.addEventListener('change', function() {
        const svar2 = tjekSvar2();

        if (svar2 != null) {
            button2.disabled = false;
        }
    })
});

document.querySelectorAll(inputChoice3).forEach(function(input) {
    input.addEventListener('change', function() {
        const svar3 = tjekSvar3();

        if (svar3 != null) {
            button3.disabled = false;
        }
    })
});

let nuværendeIndex = 0;
let nuværendeSection = sectioner[nuværendeIndex];
let nuværendeStep = steps[nuværendeIndex];

// Hvis antallet af sectioner er 4, så er det sidste index i listen 3.
// Vi er kun intereseret i det sidste index, da vi derved kan finde ud af at vi er på sidste section.
const sidsteIndex = sectioner.length - 1;

function næsteSection() {
    nuværendeSection.classList.toggle('d-none');
    nuværendeStep.classList.toggle('active');

    nuværendeIndex = nuværendeIndex + 1;
    nuværendeSection = sectioner[nuværendeIndex];
    nuværendeStep = steps[nuværendeIndex];

    if (nuværendeIndex == sidsteIndex) {
        beregnSvar();
    }

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

function tjekSvar1() {
    return document.querySelector(inputChoice1 + ':checked');
}

function tjekSvar2() {
    return document.querySelector(inputChoice2 + ':checked');
}

function tjekSvar3() {
    return document.querySelector(inputChoice3 + ':checked');
}

function beregnSvar() {
    const svar1 = tjekSvar1();
    const svar2 = tjekSvar2();
    const svar3 = tjekSvar3();

    console.log(svar1.id);
    console.log(svar2.id);
    console.log(svar3.id);
}

function beregnIndividueltSvar(svar) {
    if (svar.id.endsWith('1')) {
        return 'Segmentering';
    } else if (svar.id.endsWith('2')) {
        return 'Print';
    } else if (svar.id.endsWith('3')) {
        return 'Forsendelse - lagerhotel';
    } else {
        return 'Fulfilment';
    }
}