import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CounterDeatils = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await axios.get(
                    `https://restcountries.com/v3.1/alpha/${code}`
                );
                setCountry(res.data[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCountry();
    }, [code]);

    if (!country) return <h2>Loading...</h2>;

    return (
        <div className="details-container">
            <div className="container">
                <div className="container-row">

                    <div className="details-img-col">
                        {/* Flag */}
                        <img src={country?.flags?.png} alt={country?.name?.common} />
                    </div>

                    <div className="details-content-col">
                        {/* Name */}
                        <h2>{country?.name?.common}</h2>

                        <div className="details-info">

                            <div className="info-row">
                                <strong>Population :</strong>
                                <span>{country?.population}</span>
                            </div>

                            <div className="info-row">
                                <strong>Capital :</strong>
                                <span>{country?.capital?.[0] || "N/A"}</span>
                            </div>

                            <div className="info-row">
                                <strong>Country Code :</strong>
                                <span>{country?.cca2}</span>
                            </div>

                            <div className="info-row">
                                <strong>Region :</strong>
                                <span>{country?.region}</span>
                            </div>

                            <div className="info-row">
                                <strong>Languages :</strong>
                                <span>
                                    {country?.languages
                                        ? Object.values(country.languages).join(", ")
                                        : "N/A"}
                                </span>
                            </div>

                            <div className="info-row">
                                <strong>Sub Region :</strong>
                                <span>{country?.subregion || "N/A"}</span>
                            </div>

                            <div className="info-row">
                                <strong>Area :</strong>
                                <span>{country?.area} km²</span>
                            </div>

                            <div className="info-row">
                                <strong>Currencies :</strong>
                                <span>
                                    {country?.currencies
                                        ? Object.values(country.currencies)
                                            .map((c) => c.name)
                                            .join(", ")
                                        : "N/A"}
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Go Back */}
                <button className="back-btn button-64" onClick={() => navigate(-1)}>
                    <span>⬅ Go Back</span>
                </button>
            </div>
        </div>
    );
};

export default CounterDeatils;
