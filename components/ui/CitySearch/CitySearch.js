import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CitySearch = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            if (query.length < 3) {
                setResults([]);
                return; // Exit early if query is too short
            }

            try {
                const response = await axios.get('http://geodb-free-service.wirefreethought.com/v1/geo/cities', {
                    params: {
                        namePrefix: query,
                    },
                });

                setResults(response.data.data);
            } catch (error) {
                setError('Failed to fetch data. Please try again.');
            }
        };

        const debounceFetch = setTimeout(fetchCities, 300); // Debounce to limit API calls

        return () => clearTimeout(debounceFetch); // Clean up timeout on component unmount
    }, [query]);

    const handleCityClick = (city) => {
        const selectedCity = {
            city: city.name,
            state: city.region,
        };
        setSelectedCity(selectedCity);
        if (onCitySelect) {
            onCitySelect(selectedCity);  // Pass the selected city to the parent component
        }
        setQuery(''); // Optionally clear the input field
        setResults([]); // Clear the results
    };

    return (
        <div className=" mt-8 p-4 border border-gray-700 rounded-lg bg-gray-800 text-white">
            <input
                type="text"
                placeholder="Enter city name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            {error && <p className="text-red-500">{error}</p>}
            {results.length > 0 && (
                <ul className="list-disc pl-5">
                    {results.map((city) => (
                        <li
                            key={city.id}
                            className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => handleCityClick(city)}
                        >
                            <strong>{city.name}</strong>, {city.region}
                        </li>
                    ))}
                </ul>
            )}
            {selectedCity && (
                <div className="mt-4 p-2 border border-gray-600 rounded bg-gray-700">
                    <h3 className="text-lg font-bold">Selected City</h3>
                    <p><strong>City:</strong> {selectedCity.city}</p>
                    <p><strong>State:</strong> {selectedCity.state}</p>
                </div>
            )}
        </div>
    );
};

export default CitySearch;
