'use strict';

const searchField = document.querySelector('.search');
let allCountryData = [];

//Card Render Function
function renderCard({
  flags: { svg },
  name: { common },
  population,
  region,
  capital,
}) {
  document.querySelector('.country-cards_container').innerHTML += `
  <div class="card">
    <div class='card-image'>
      <img
        src= ${svg}
        alt='${"The country's Flag"}'
      />
    </div>
    <div class="card-content">
      <h3 class="country-name">${common}</h3>
      <p>Population: 
        <span class="population">${population}</span>
      </p>
      <p>Region: 
        <span class="region">${region}</span>
      </p>
      <p>Capital: 
        <span class="capital">${capital}</span>
      </p>
    </div>
  </div>
`;
}

//Filter Card on Search Function
function filterCard() {
  const searchFieldVal = searchField.value;

  allCountryData.forEach(countryData => {
    if (
      countryData.name.common
        .toLowerCase()
        .includes(searchFieldVal.toLowerCase())
    )
      renderCard(countryData);
  });
}

//Fetching REST API and rendering the country cards
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(countries => {
    countries.forEach(country => {
      allCountryData.push(country);
      renderCard(country);
    });
  });

//Search inputs needs the fully loaded data
window.addEventListener('load', function () {
  console.log(allCountryData);
  searchField.addEventListener('keyup', filterCard);
});
