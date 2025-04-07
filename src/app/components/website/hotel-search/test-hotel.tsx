"use client";

import { getCountries, getCities, searchHotels, getHotelCode } from "@/actions/hotel-actions";
import { useEffect, useState } from "react";

const HotelSearch = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const [hotelcodes, setHotelCodes] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [hotels, setHotels] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getCountries();
                // console.log(data)
            setCountries(data.CountryList || []);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);
    useEffect(() => {
        const fetchHotelCode = async () => {
            try {
                const data = await getHotelCode();
                // console.log(data)
                setHotelCodes(data || []);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchHotelCode();
    }, []);
    console.log(hotelcodes.slice(0,99).join(","))
    useEffect(() => {
        if (!selectedCountry) return;
        const fetchCities = async () => {
            try {
                const data = await getCities(selectedCountry);
                setCities(data?.CityList || []);
                
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchCities();
    }, [selectedCountry]);
    // const hotelCodes = [
    //     1000003, 1000004, 1000005, 1000006, 1000007, 1000008, 1000009, 1000011,
    //     1000012, 1000013, 1000014, 1000016, 1000018, 1000019, 1000020, 1000025,
    //     1000026, 1000027, 1000028, 1000029, 1000030, 1000031, 1000032, 1000037,
    //     1000038, 1000040, 1000041, 1000042, 1000043, 1000044, 1000045, 1000046,
    //     1000051, 1000052, 1000053, 1000054, 1000055, 1000056, 1000057, 1000059,
    //     1000060, 1000061, 1000062, 1000063, 1000064, 1000065, 1000070, 1000071,
    //     1000072, 1000073, 1000074, 1000075, 1000079, 1000080, 1000081, 1000082,
    //     1000083, 1000084, 1000085, 1000089, 1000090, 1000091, 1000092, 1000093,
    //     1000094, 1000096, 1000097, 1000098, 1000099, 1000108, 1000109, 1000110,
    //     1000111, 1000112, 1000113, 1000114, 1000115, 1000116, 1000117, 1000127,
    //     1000132, 1000134, 1000150, 1000158, 1000159, 1000160, 1000161, 1000162,
    //     1000163, 1000164, 1000165, 1000166, 1000168, 1000169, 1000170, 1000171,
    //     1000172, 1000174, 1000175, 1000179, 1000180, 1000181, 1000192, 1000193,
    //     1000197, 1000198, 1000199, 1000200, 1000201, 1000202, 1000203,
    // ].join(",");

console.log(hotels)
    const handleSearch = async () => {
        if (!selectedCity || !checkIn || !checkOut) {
            alert("Please select city, check-in, and check-out dates.");
            return;
        }

        setLoading(true);
        try {
            const searchParams = {
                CheckIn: checkIn,
                CheckOut: checkOut,
                HotelCodes: hotelcodes.slice(0, 99).join(","), // Fetch all hotels in the city
                CityCode: selectedCity,
                GuestNationality: selectedCountry,
                PreferredCurrencyCode: "AED",
                PaxRooms: [{ Adults: 1, Children: 0, ChildrenAges: [] }],
                IsDetailResponse: true,
                ResponseTime: 23,
                Filters: { MealType: "All", Refundable: "true", NoOfRooms: 0 },
            };

            const data = await searchHotels(searchParams);
            setHotels(data?.HotelSearchResults || []);
        } catch (error) {
            console.error("Error searching hotels:", error);
        }
        setLoading(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Search Hotels</h2>

            {/* Country Selection */}
            <div className="mb-4">
                <label className="block mb-2">Select Country</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                        <option key={country.Code} value={country.Code}>
                            {country.Name}
                        </option>
                    ))}
                </select>
            </div>

            {/* City Selection */}
            {selectedCountry && (
                <div className="mb-4">
                    <label className="block mb-2">Select City</label>
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city.Code} value={city.Code}>
                                {city.Name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Check-In & Check-Out Dates */}
            <div className="mb-4">
                <label className="block mb-2">Check-In Date</label>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Check-Out Date</label>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                disabled={loading}
            >
                {loading ? "Searching..." : "Search Hotels"}
            </button>

            {/* Hotel Results */}
            <div className="mt-4">
                {hotels.length > 0 ? (
                    hotels.map((hotel: any) => (
                        <div key={hotel.HotelCode} className="border p-4 mb-2">
                            <h3 className="text-lg font-bold">{hotel.HotelName}</h3>
                            <p>City: {hotel.CityName}</p>
                            <p>Price: {hotel.MinPrice} {hotel.Currency}</p>
                        </div>
                    ))
                ) : (
                    <p>No hotels found</p>
                )}
            </div>
        </div>
    );
};

export default HotelSearch;
