// Constante
const g = 9.81;
const pixeliPeMetru = 100;
const masaMaximaFaraRupere = 50; // 50 kg

// Variabile simulare frânghie
let simulareFranghie = {
    masa: 1.0,
    lungime: 1.8,
    rigiditate: 100,
    pozitieInitiala: 0,
    amortizare: 0.1,
    pozitie: 0,
    viteza: 0,
    animatieId: null,
    estePornita: false,
    franghiaRupta: false
};

// Variabile simulare resort
let simulareResort = {
    masa: 1.0,
    lungime: 0.8,
    rigiditate: 100,
    pozitieInitiala: 0,
    amortizare: 0.1,
    pozitie: 0,
    viteza: 0,
    animatieId: null,
    estePornita: false,
    resortRupt: false
};

// Inițializare simulări
function initSimulari() {
    actualizeazaFranghie();
    actualizeazaResort();
}

// Funcții simulare frânghie
function actualizeazaFranghie() {
    simulareFranghie.masa = parseFloat(document.getElementById('masa-franghie').value);
    simulareFranghie.lungime = parseFloat(document.getElementById('lungime-franghie').value);
    simulareFranghie.rigiditate = parseFloat(document.getElementById('rigiditate-franghie').value);
    simulareFranghie.franghiaRupta = false;
    
    actualizeazaVizualizareFranghie();
    actualizeazaRezultateFranghie();
}

function actualizeazaVizualizareFranghie() {
    const franghieSus = document.getElementById('franghie-sus');
    const franghieJos = document.getElementById('franghie-jos');
    const obiect = document.getElementById('obiect-franghie');
    
    const lungimeFranghiePixeli = simulareFranghie.lungime * pixeliPeMetru;
    const deplasarePixeli = simulareFranghie.pozitie * pixeliPeMetru;
    
    if (simulareFranghie.franghiaRupta) {
        // Frânghia este ruptă - arătăm doar jumătatea superioară
        franghieSus.style.height = `${lungimeFranghiePixeli/2}px`;
        franghieJos.style.display = 'none';
        obiect.style.display = 'none';
    } else {
        // Frânghia este intactă
        franghieSus.style.height = `${lungimeFranghiePixeli/2 + deplasarePixeli/2}px`;
        franghieJos.style.height = `${lungimeFranghiePixeli/2 + deplasarePixeli/2}px`;
        franghieJos.style.top = `${25 + lungimeFranghiePixeli/2 + deplasarePixeli/2}px`;
        franghieJos.style.display = 'block';
        obiect.style.top = `${25 + lungimeFranghiePixeli + deplasarePixeli}px`;
        obiect.style.display = 'block';
    }
}

function actualizeazaRezultateFranghie() {
    const greutate = simulareFranghie.masa * g;
    const tensiune = simulareFranghie.rigiditate * simulareFranghie.pozitie;
    const avertizare = document.getElementById('avertizare-franghie');
    
    document.getElementById('greutate-franghie').textContent = greutate.toFixed(2);
    document.getElementById('tensiune-franghie').textContent = tensiune.toFixed(2);
    document.getElementById('deplasare-franghie').textContent = simulareFranghie.pozitie.toFixed(3);
    document.getElementById('viteza-franghie').textContent = simulareFranghie.viteza.toFixed(3);
    
    if (simulareFranghie.masa > masaMaximaFaraRupere) {
        avertizare.textContent = "ATENȚIE: Masa depășește 50 kg - frânghia se va rupe!";
    } else {
        avertizare.textContent = "";
    }
}

function animatieFranghie(timestamp) {
    if (simulareFranghie.franghiaRupta) {
        return; // Nu facem nimic dacă frânghia este ruptă
    }
    
    const greutate = simulareFranghie.masa * g;
    const fortaElastica = simulareFranghie.rigiditate * simulareFranghie.pozitie;
    const fortaAmortizare = -simulareFranghie.viteza * simulareFranghie.amortizare * simulareFranghie.rigiditate;
    
    const fortaRezultanta = greutate - fortaElastica + fortaAmortizare;
    const acceleratie = fortaRezultanta / simulareFranghie.masa;
    
    simulareFranghie.viteza += acceleratie * 0.016;
    simulareFranghie.pozitie += simulareFranghie.viteza * 0.016;
    
    // Verificăm dacă frânghia trebuie să se rupă
    if (simulareFranghie.masa > masaMaximaFaraRupere && !simulareFranghie.franghiaRupta) {
        simulareFranghie.franghiaRupta = true;
        document.getElementById('avertizare-franghie').textContent = "FRÂNGHIA S-A RUPT!";
    }
    
    actualizeazaVizualizareFranghie();
    actualizeazaRezultateFranghie();
    
    if (simulareFranghie.estePornita && !simulareFranghie.franghiaRupta) {
        simulareFranghie.animatieId = requestAnimationFrame(animatieFranghie);
    }
}

// Funcții simulare resort
function actualizeazaResort() {
    simulareResort.masa = parseFloat(document.getElementById('masa-resort').value);
    simulareResort.lungime = parseFloat(document.getElementById('lungime-resort').value);
    simulareResort.rigiditate = parseFloat(document.getElementById('constanta-resort').value);
    simulareResort.resortRupt = false;
    
    actualizeazaVizualizareResort();
    actualizeazaRezultateResort();
}

function actualizeazaVizualizareResort() {
    const resort = document.getElementById('resort');
    const obiect = document.getElementById('obiect-resort');
    const spirala = document.querySelector('.spirala-resort');
    
    const lungimeResortPixeli = simulareResort.lungime * pixeliPeMetru;
    const deplasarePixeli = simulareResort.pozitie * pixeliPeMetru;
    
    if (simulareResort.resortRupt) {
        // Resortul este rupt - arătăm doar jumătatea superioară
        resort.style.height = `${lungimeResortPixeli/2}px`;
        spirala.style.height = `${lungimeResortPixeli/2}px`;
        obiect.style.display = 'none';
    } else {
        // Resortul este intact
        resort.style.height = `${lungimeResortPixeli + deplasarePixeli}px`;
        obiect.style.top = `${25 + lungimeResortPixeli + deplasarePixeli}px`;
        spirala.style.height = `${lungimeResortPixeli + deplasarePixeli}px`;
        obiect.style.display = 'block';
    }
}

function actualizeazaRezultateResort() {
    const greutate = simulareResort.masa * g;
    const fortaResort = simulareResort.rigiditate * simulareResort.pozitie;
    const avertizare = document.getElementById('avertizare-resort');
    
    document.getElementById('greutate-resort').textContent = greutate.toFixed(2);
    document.getElementById('forta-resort').textContent = fortaResort.toFixed(2);
    document.getElementById('deplasare-resort').textContent = simulareResort.pozitie.toFixed(3);
    document.getElementById('viteza-resort').textContent = simulareResort.viteza.toFixed(3);
    
    if (simulareResort.masa > masaMaximaFaraRupere) {
        avertizare.textContent = "ATENȚIE: Masa depășește 50 kg - resortul se va rupe!";
    } else {
        avertizare.textContent = "";
    }
}

function animatieResort(timestamp) {
    if (simulareResort.resortRupt) {
        return; // Nu facem nimic dacă resortul este rupt
    }
    
    const greutate = simulareResort.masa * g;
    const fortaElastica = simulareResort.rigiditate * simulareResort.pozitie;
    const fortaAmortizare = -simulareResort.viteza * simulareResort.amortizare * simulareResort.rigiditate;
    
    const fortaRezultanta = greutate - fortaElastica + fortaAmortizare;
    const acceleratie = fortaRezultanta / simulareResort.masa;
    
    simulareResort.viteza += acceleratie * 0.016;
    simulareResort.pozitie += simulareResort.viteza * 0.016;
    
    // Verificăm dacă resortul trebuie să se rupă
    if (simulareResort.masa > masaMaximaFaraRupere && !simulareResort.resortRupt) {
        simulareResort.resortRupt = true;
        document.getElementById('avertizare-resort').textContent = "RESORTUL S-A RUPT!";
    }
    
    actualizeazaVizualizareResort();
    actualizeazaRezultateResort();
    
    if (simulareResort.estePornita && !simulareResort.resortRupt) {
        simulareResort.animatieId = requestAnimationFrame(animatieResort);
    }
}

// Funcții de reset
function reseteazaFranghia() {
    // Oprește animația
    cancelAnimationFrame(simulareFranghie.animatieId);
    simulareFranghie.estePornita = false;
    
    // Resetează poziția și viteza
    simulareFranghie.pozitie = 0;
    simulareFranghie.viteza = 0;
    simulareFranghie.franghiaRupta = false;
    
    // Actualizează vizualizarea
    actualizeazaVizualizareFranghie();
    actualizeazaRezultateFranghie();
    document.getElementById('avertizare-franghie').textContent = "";
}

function reseteazaResortul() {
    // Oprește animația
    cancelAnimationFrame(simulareResort.animatieId);
    simulareResort.estePornita = false;
    
    // Resetează poziția și viteza
    simulareResort.pozitie = 0;
    simulareResort.viteza = 0;
    simulareResort.resortRupt = false;
    
    // Actualizează vizualizarea
    actualizeazaVizualizareResort();
    actualizeazaRezultateResort();
    document.getElementById('avertizare-resort').textContent = "";
}

// Ascultători de evenimente
document.getElementById('actualizeaza-franghie').addEventListener('click', function() {
    if (simulareFranghie.estePornita) {
        cancelAnimationFrame(simulareFranghie.animatieId);
        simulareFranghie.estePornita = false;
    }
    actualizeazaFranghie();
});

document.getElementById('porneste-franghie').addEventListener('click', function() {
    if (!simulareFranghie.estePornita) {
        simulareFranghie.estePornita = true;
        simulareFranghie.animatieId = requestAnimationFrame(animatieFranghie);
    }
});

document.getElementById('pauza-franghie').addEventListener('click', function() {
    if (simulareFranghie.estePornita) {
        cancelAnimationFrame(simulareFranghie.animatieId);
        simulareFranghie.estePornita = false;
    }
});

document.getElementById('reseteaza-franghie').addEventListener('click', function() {
    reseteazaFranghia();
});

document.getElementById('actualizeaza-resort').addEventListener('click', function() {
    if (simulareResort.estePornita) {
        cancelAnimationFrame(simulareResort.animatieId);
        simulareResort.estePornita = false;
    }
    actualizeazaResort();
});

document.getElementById('porneste-resort').addEventListener('click', function() {
    if (!simulareResort.estePornita) {
        simulareResort.estePornita = true;
        simulareResort.animatieId = requestAnimationFrame(animatieResort);
    }
});

document.getElementById('pauza-resort').addEventListener('click', function() {
    if (simulareResort.estePornita) {
        cancelAnimationFrame(simulareResort.animatieId);
        simulareResort.estePornita = false;
    }
});

document.getElementById('reseteaza-resort').addEventListener('click', function() {
    reseteazaResortul();
});

// Inițializare la încărcarea paginii
window.addEventListener('load', initSimulari);