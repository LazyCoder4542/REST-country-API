'use strict';

let searchField = document.querySelector('.search');

//Card Render Function
function renderCard(country) {
  document.querySelector('.country-cards_container').innerHTML += `
  <div class="card">
    <div class='card-image'>
      <img
        src= ${country.flags.svg}
        lt='${"The country's Flag"}'
      />
    </div>
    <div class="card-content">
      <h3 class="country-name">${country.name.common}</h3>
      <p>Population: 
        <span class="population">${country.population}</span>
      </p>
      <p>Region: 
        <span class="region">${country.region}</span>
      </p>
      <p>Capital: 
        <span class="capital">${country.capital}</span>
      </p>
    </div>
  </div>
`;
}

let allCountryName = [];
//Fetching REST API and rendering the country cards
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(countries => {
    countries.forEach(country => {
      allCountryName.push(country.name.common);

      renderCard(country);
    });

    //Filter Card on Search Function
    function filterCard() {
      const searchFieldVal = searchField.value;

      allCountryName.forEach(countryName => {
        if (countryName.toLowerCase().includes(searchFieldVal.toLowerCase()))
          renderCard();
      });
    }

    //Event Listerer for the search input
    searchField.addEventListener('keyup', filterCard);
  });
