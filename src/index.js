import { debounce, trim } from 'lodash';
import { Notify } from 'notiflix';
import fetchCountries from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchBox.addEventListener("input", debounce(search, DEBOUNCE_DELAY));

function search() {
    const searchValue = trim(searchBox.value);

    if (!searchValue) {
        clearMarkup();
        return;
    }

    fetchCountries(searchValue)
        .then((countries) => processCountries(countries))
        .catch((error) => Notify.failure("Oops, there is no country with that name"));
}

function processCountries(countries) {
    clearMarkup();

    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length > 1) {
        renderCountryList(countries);
    } else {
        renderCountryInfo(countries[0]);
    }
}

function renderCountryInfo({ flags, name, capital, population, languages }) {
    const markup = `
        <div class="country-title"><img class="country-img" src="${flags.svg}" />${name.official}</div>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Languages:</strong> ${Object.values(languages).join(", ")}</p>
    `;
    
    countryInfo.innerHTML = markup;
}

function renderCountryList(countries) {
    const markup = countries
        .map(({ flags, name }) => {
            return `<li>
                <img class="country-img" src="${flags.svg}"/>
                <p>${name.official}</p>
                </li>`;
            })
        .join("");
    
    countryList.innerHTML = markup;
}

function clearMarkup() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}
