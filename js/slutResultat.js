// Henter alle sectioner og step-box, så vi har referencen til dem fra index
const sectioner = document.getElementsByTagName('section');
const steps = document.getElementsByClassName('step-box');

// Vi selecter de 3 gå videre knapper via deres id, så vi kan enable dem når brugeren har valgt et input
const button1 = document.querySelector('#choice1_button');
const button2 = document.querySelector('#choice2_button');
const button3 = document.querySelector('#choice3_button');

// Vi gemmer vores selectorer for de forskellige rækker af svarmuligheder, sådan at vi kan genbruge dem senere.
const inputChoice1 = 'input[name=choice1]';
const inputChoice2 = 'input[name=choice2]';
const inputChoice3 = 'input[name=choice3]';

// Funktionen der tjekker om du har valgt en svarmulighed, for ellers kan du ikke gå videre.
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

// Her ser vi hvilken side vi er på.
let nuværendeIndex = 0;
let nuværendeSection = sectioner[nuværendeIndex];
let nuværendeStep = steps[nuværendeIndex];

// Hvis antallet af sectioner er 4, så er det sidste index i listen 3.
// Vi er kun intereseret i det sidste index, da vi derved kan finde ud af at vi er på sidste section.
const sidsteIndex = sectioner.length - 1;

// Vi tager nuværende section og skjuler den ved at give den klassen d-none.
// Så tager vi nuværendes step og fjerner klassen active for at vise at den ikke er det aktive step længere.
// Så forøger vi vores nuværende index med +1, og tager fat i den tilsvarende section og step.
// Så tjekker vi om vi er på den sidste side.
// Hvis vi er det, så beregner vi svaret.
// Til sidst viser vi vores nye nuværende section og nuværende step som aktiv.
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

// Gå tilbage knappen.
function forrigeSection() {
    nuværendeSection.classList.toggle('d-none');
    nuværendeStep.classList.toggle('active');

    nuværendeIndex = nuværendeIndex - 1;
    nuværendeSection = sectioner[nuværendeIndex];
    nuværendeStep = steps[nuværendeIndex];

    nuværendeSection.classList.toggle('d-none');
    nuværendeStep.classList.toggle('active');
}

// Her retunere vi svarene som brugeren har valgt på side 1, hvis brugeren ikke har valgt nogle svar, så returene den null (og de kan ikke gå videre).
function tjekSvar1() {
    return document.querySelector(inputChoice1 + ':checked');
}

function tjekSvar2() {
    return document.querySelector(inputChoice2 + ':checked');
}

function tjekSvar3() {
    return document.querySelector(inputChoice3 + ':checked');
}

// Her har vi defineret svarene ud fra hvad de vælger.
function beregnSvar() {
    const svarmuligheder = {
        'Segmentering': {
            overskrift: 'Hjælp til dine kampagner',
            brødtekst: 'Det lyder til at du står og mangler hjælp til din kampagne, med alt hvad det indebære. Alt lige fra segmentering til addressering. Det kan vi hjælpe med, hos Bech. Når vi håndterer adresseringen af jeres tryksager, er det forbundet med fortrolighed og tillid til at håndtere kundedatabaser med oplysninger om bopæl og andre personlige oplysninger. Vi har ISAE 3000 erklæring, så jeres data er i sikkerhed hos os.'
        },
        'Print': {
            overskrift: 'Printet og pakket',
            brødtekst: 'Det lyder til at du står og har brug for at få printet og pakket dine opgaver. Hos Bech A/S har vi forskellige moderne produktionsprintere og kan klare stort set alt inden for digitaltryk. Vi printer og pakker stort set alle typer materialer på kort tid. Vi har topmoderne udstyr til at printe, kuvertere og pakke forsendelser, hvilket betyder, at vi kan tilbyde dig to vigtige ting: En enorm printkapacitet og unikke løsninger til lige netop dine behov.'
        },
        'Forsendelse - lagerhotel': {
            overskrift: 'Forsendelse og Lager',
            brødtekst: 'Det lyder til at du står og mangler en ansvarlig for dine materialer og forsendelser. Hos os har du mulighed for at få opbevaret dine tryksager på vores lager. Du får altså nogle hyldemeter hos os til at have tryksager liggende. Det betyder, at der spares en række omkostninger til transport og ikke mindst tid. Når tryksagerne ligger på lager hos os, kan vi tage materialer direkte fra lager til en opgave – så bliver den meget hurtigere ekspederet.'
        },
        'Fulfilment': {
            overskrift: 'Lidt af det hele',
            brødtekst: 'Det lyder til at det er en all-around løsning vi skal have lavet. Fulfilment er en ydelse, som vi sammensætter i samarbejde med dig. Måske du har brug for en fast aftale i forhold til at have materialer på lager hos os, samtidig med du har regelmæssigt behov for at få trykt flyers til potentielle kunder – mulighederne er mange.\n' +
                '\n' +
                'Den, måske, største gevinst ved fulfilment for vores dig er, at det kan lette din arbejdsbyrde. Ved at flytte flere dele af processen med at klargøre materialer, printe flyers, eller noget helt tredje væk fra din virksomheden og over til os, bliver I mere effektive.'
        },
    }

    // Svar 1 er nu hvad end de har valgt i spørgsmål 1.
    const svar1 = tjekSvar1();
    const svar2 = tjekSvar2();
    const svar3 = tjekSvar3();

    // Her omdanner jeg svaret til en kategori.
    const beregnetSvar1 = beregnIndividueltSvar(svar1);
    const beregnetSvar2 = beregnIndividueltSvar(svar2);
    const beregnetSvar3 = beregnIndividueltSvar(svar3);

    // Hvis jeg har svaret det samme på side 1, som på side 2, så er det slutsvar 1 den skal vise til sidst.
    // Hvis jeg har svaret det samme på side 1, som på side 3, så er det slutsvar 1 den også skal vise til sidst.
    // Hvis jeg har svaret det samme på side 2, som på side 3, så er det slutsvar 2 den skal vise til sidst.
    let svar;

    if (beregnetSvar1 === beregnetSvar2 || beregnetSvar1 === beregnetSvar3) {
        svar = svarmuligheder[beregnetSvar1];
    } else if (beregnetSvar2 === beregnetSvar3) {
        svar = svarmuligheder[beregnetSvar2];
    } else {
        // Hvis ingen af svarene er ens, så returnere vi fulfilment!
        svar = svarmuligheder['Fulfilment'];
    }

    // Her sætter vi overskrift ind på overskrift og brødtekst ind på brødtekst.
    document.querySelector('#overskrift').textContent = svar.overskrift;
    document.querySelector('#brødtekst').textContent = svar.brødtekst;
}

// Her omdanner vi IDet på svaret, til en kategori.
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