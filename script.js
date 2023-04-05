const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".search-filter-container");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");

let allCountriesData;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

//   new URLSearchParams(location.search).get("name");

filterByRegion.addEventListener("change", (e) => {
  console.log(e.target.value);
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    // console.log(country);
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}" />
      <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b> Population: </b> ${country.population.toLocaleString(
              "en-IN"
            )}</p>
             <p><b>Region: </b>${country.region}</p>
             <p><b>Capital: </b>${country.capital}</p>
      </div>
      `;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
