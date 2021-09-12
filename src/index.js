import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
  clearInput();

  let value = input.value.trim();

  fetchCountries(value)
    .then(data => updateContent(data))
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}
{
}
function itemMarkup(items) {
  return items
    .map(
      item =>
        `<li class="item"> <img src="${
          item.flag
        }" alt="Flag" class="flag" width="90" height="auto"></img><h1 class="title">${
          item.name
        }</h1></li>
                <li class="item"><h2>Capital:</h2> <span> ${item.capital}</span></li>
                <li class="item">
                    <h2>Population:</h2> <span>${item.population}</span>
                </li>
        <li class="item">
                    <h2> Languages: </h2>${
                      item.languages.length > 1
                        ? `<ul>
            ${item.languages
              .map(language => {
                return `<li class="item">${language.name}</li>`;
              })
              .join('')}
        </ul>`
                        : `${item.languages[0].name}`
                    }
             </li>    
</ul>`,
    )
    .join('');
}

function listMarkup(items) {
  return items
    .map(
      item =>
        `<li class="item"><img src="${item.flag}" alt="Flag" class="flag" width="50" height="auto"></img><span>${item.name}</span></li>`,
    )
    .join('');
}
function updateContent(data) {
  if (data.length === 1) {
    const countryItem = itemMarkup(data);
    countryInfo.insertAdjacentHTML('beforeend', countryItem);
  } else if (data.length >= 2 && data.length <= 10) {
    const itemsList = listMarkup(data);
    countriesList.insertAdjacentHTML('beforeend', itemsList);
    console.log(itemsList);
  } else if (data.length >= 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function clearInput() {
  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';
}