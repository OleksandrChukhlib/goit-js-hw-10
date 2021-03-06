import './css/styles.css';
import Notiflix from 'notiflix';
import createCountriesListTmp  from './templates/countries_template.hbs';
import createCountryCardTmp from './templates/countries_info_template.hbs';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(entryCountryName, DEBOUNCE_DELAY));

function entryCountryName() {
    const countryName = inputCountry.value.trim();
    if (countryName) {
        fetchCountries(countryName)
            .then(renderCountryesList)       
            .catch(onFetchError)
    }
}

function renderCountryesList(countries)
{
      clearInput();
    if (countries.length > 10) { 
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }
    if (countries.length >= 2 && countries.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', createCountriesListTmp(countries));
    }
    if (countries.length === 1) { 
        countryInfo.innerHTML = createCountryCardTmp(countries);
        countryList.innerHTML = '';
    }
}

function onFetchError() { 
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function clearInput() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}