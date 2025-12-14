import { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState(""); // <-- region state

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,population,capital,languages,cca2,flags,region"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <BeatLoader />;

  // ⭐ Combined filtering (Search + Region)
  const filteredCountries = data.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesRegion = region ? country.region === region : true;

    return matchesSearch && matchesRegion;
  });



  return (
    <>
      <div className="country-container">
        <div className="container">

          {/* Search & Filter */}
          <div className="search-bar-container">

            {/* Search Input */}
            <div className="search-input">
              <input
                type="text"
                placeholder="Search country..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

            </div>

            {/* Region Filter */}
            <div className="filter-dropdown">
              <select
                name="region"
                id="region-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

          </div>

          {/* Countries Grid */}
          <div className="grid-container">
            {filteredCountries.map((country, index) => (
              <div key={index} className="country-card" onClick={() => navigate(`/details/${country.cca2}`)}>
                <img
                  src={country.flags?.png}
                  alt={country.name?.common}
                  width="80"
                  style={{ borderRadius: "4px" }}
                />

                <h2>
                  {country.name?.common.length > 12
                    ? country.name.common.slice(0, 12) + "..."
                    : country.name?.common}
                </h2>


                <div className="info-container">
                  <div className="info-row">
                    <strong>Population :</strong>
                    <span>{country.population}</span>
                  </div>
                  <div className="info-row">
                    <strong>Capital :</strong>
                    <span>{country.capital?.[0]}</span>
                  </div>

                  <div className="info-row">
                    <strong>Country Code :</strong>
                    <span>{country.cca2}</span>
                  </div>

                  <div className="info-row">
                    <strong>Region :</strong>
                    <span>{country.region}</span>
                  </div>

                  <div className="info-row">
                    <strong>Languages:</strong>
                    <span>
                      {country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A"}
                    </span>
                  </div>
                </div>


              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
