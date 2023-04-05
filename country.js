const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector("h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const tld = document.querySelector(".tld");
const language = document.querySelector(".language");
const currency = document.querySelector(".currency");
const borderCountries = document.querySelector(".border-countries");
const themeChanger = document.querySelector(".theme-changer");
const themeText = document.querySelector(".theme-text");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country);
    flagImg.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;

    //native name
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    // population
    population.innerText = country.population.toLocaleString("en-IN");
    // region
    region.innerText = country.region;
    // subregion if empty make sure nothing is displayed
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    // capital if empty make sure nothing is displayed
    if (country.capital) {
      capital.innerText = country.capital;
    }
    //top level domain
    tld.innerText = country.tld;
    //currencies if many separate with comma
    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(",");
    }
    //languages if many separate with comma
    if (country.languages) {
      language.innerText = Object.values(country.languages).join(",");
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        // console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });
// console.log();
themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  let pageTheme;
  if (themeChanger.firstElementChild.classList.contains("fa-moon")) {
    themeChanger.firstElementChild.classList.replace("fa-moon", "fa-sun");
    themeText.innerText = "Light Mode";
    pageTheme = "Dark";
  } else {
    themeChanger.firstElementChild.classList.replace("fa-sun", "fa-moon");
    pageTheme = "Light";
    themeText.innerText = "Dark Mode";
  }
  localStorage.setItem("Theme", JSON.stringify(pageTheme));
});

let getTheme = JSON.parse(localStorage.getItem("Theme"));

if (getTheme === "Dark") {
  document.body.classList = "dark";
}
