//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Container results
const result = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;


//Events
document.addEventListener('DOMContentLoaded', () => {
    showCars(autos); //Show the cars

    //Fill the options of years
    fillSelect();
})


//Event listener for search select
marca.addEventListener('change', e => {
    dataSearch.marca = e.target.value;

    filterSearch();
});

year.addEventListener('change', e => {
    dataSearch.year = parseInt(e.target.value);

    filterSearch();
});

minimo.addEventListener('change', e => {
    dataSearch.minimo = e.target.value;

    filterSearch();
});

maximo.addEventListener('change', e => {
    dataSearch.maximo = e.target.value;

    filterSearch();
});

puertas.addEventListener('change', e => {
    dataSearch.puertas = parseInt( e.target.value );

    filterSearch();
});

transmision.addEventListener('change', e => {
    dataSearch.transmision = e.target.value;

    filterSearch();
});

color.addEventListener('change', e => {
    dataSearch.color = e.target.value;

    filterSearch();
});


//Generate object to search
const dataSearch = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}


//Functions
function showCars(autos) {

    cleanHTML(); //Delete previous HTML

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        //Insert result in the HTML
        result.appendChild(autoHTML);
    })
}



//Clean HTML 
function cleanHTML() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}





//Generate the years to select
function fillSelect() {

    for ( let i = max; i >= min; i-- ) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option); //add year option to select
    }

}




//Function that filters the search
function filterSearch() {
    const result = autos.filter( filterBrand ).filter( filterYear ).filter( filterMin ).filter( filterMax ).filter( filterPuertas).filter( filterTransmision ).filter( filterColor );

    if(result.length) {
        showCars(result);
    } else {
        notResult();
    }
}


function notResult() {

    cleanHTML();

    const notResult = document.createElement('div');
    notResult.classList.add('alerta', 'error');
    notResult.textContent = 'No hay resultados, Intenta con otros términos de búsqueda';
    result.appendChild(notResult);
}



function filterBrand(auto) {
    const { marca } = dataSearch;
    if ( marca ) {
        return auto.marca === marca;
    }
    return auto;
}

function filterYear(auto) {
    const { year } = dataSearch;
    if ( year ) {
        return auto.year === year;
    }
    return auto;
}

function filterMin(auto) {
    const { minimo } = dataSearch;
    if ( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filterMax(auto) {
    const { maximo } = dataSearch;
    if ( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filterPuertas(auto) {
    const { puertas } = dataSearch;
    if ( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filterTransmision(auto) {
    const { transmision } = dataSearch;
    if ( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filterColor(auto) {
    const { color } = dataSearch;
    if ( color ) {
        return auto.color === color;
    }
    return auto;
}