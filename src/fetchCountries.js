export default function fetchCountries(name) {
    const fields = ["name", "capital", "population", "flags", "languages"].join(",");

    return fetch(`https://restcountries.com/v3.1/name/${name.toLowerCase()}?fields=${fields}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            
            return response.json();
        });
}