// import React, { useState, useRef, useEffect } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { fcairports } from "@/app/data/fc-airports"; // Ensure correct import
// import Image, { StaticImageData } from "next/image";
// import Loading from "../loading";

// type Airport = {
//     id: number;
//     airport_code: string;
//     name_en: string;
//     name_ar: string;
//     airport_city_en: string;
//     airport_city_ar: string;
//     airport_country_code: string;
// };

// type HighlightTextProps = {
//     text: string;
//     query: string;
// };

// const HighlightText: React.FC<HighlightTextProps> = ({ text, query }) => {
//     if (!query) return <>{text}</>;
//     const regex = new RegExp(`(${query})`, "gi");
//     return (
//         <>
//             {text.split(regex).map((part, index) =>
//                 part.toLowerCase() === query.toLowerCase() ? (
//                     <span key={index} className="bg-yellow-200">{part}</span>
//                 ) : (
//                     part
//                 )
//             )}
//         </>
//     );
// };

// type Props = {
//     label?: string;
//     placeholder?: string;
//     className?: string;
//     filterItem?: string;
//     defaultValue?: string;
//     icon?: StaticImageData;
//     onSelect: (selectedIataCode: string) => void;
//     error?: string;
// };

// const AirportSearchField: React.FC<Props> = ({
//     label,
//     placeholder = "Search airports...",
//     className = "",
//     onSelect,
//     icon,
//     defaultValue,
//     filterItem,
//     error
// }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState<Airport | null>(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredOptions, setFilteredOptions] = useState<Airport[]>([]);
//     const [loading, setLoading] = useState(false);

//     const inputRef = useRef<HTMLInputElement | null>(null);
//     const selectRef = useRef<HTMLDivElement | null>(null);

//     // Detect if the query is in Arabic
//     const isArabic = (text: string) => {
//         const arabicRegex = /[\u0600-\u06FF]/;
//         return arabicRegex.test(text);
//     };

//     // Filter airports based on search term and language
//     const filterAirports = () => {
//         if (searchTerm.trim()) {
//             setLoading(true);
//             const isQueryArabic = isArabic(searchTerm);
//             const filtered = fcairports.filter(
//                 (airport:any) =>
//                     (isQueryArabic
//                         ? airport.name_ar.includes(searchTerm) ||
//                         airport.airport_city_ar.includes(searchTerm) ||
//                         airport.airport_code.includes(searchTerm)
//                         : airport.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         airport.airport_city_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         airport.airport_code.toLowerCase().includes(searchTerm.toLowerCase())
//                     ) &&
//                     (!filterItem || airport.airport_code.toLowerCase() !== filterItem.toLowerCase())
//             );
//             setFilteredOptions(filtered);
//             setLoading(false);
//         } else {
//             // Show Saudi Arabia (SA) airports by default when no search term is entered
//             const saAirports = fcairports.filter(
//                 (airport:any) => airport.airport_country_code === "SA"
//             );
//             setFilteredOptions(saAirports);
//         }
//     };

//     useEffect(() => {
//         const debounceTimeout = setTimeout(() => {
//             filterAirports();
//         }, 300); // 300ms debounce time

//         return () => clearTimeout(debounceTimeout);
//     }, [searchTerm, filterItem]);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const handleSelect = (item: Airport) => {
//         onSelect(item.airport_code);
//         setSelectedItem(item);
//         setIsOpen(false);
//         setSearchTerm("");
//     };

//     return (
//         <div>
//             <div ref={selectRef} className="flex flex-col w-full">
//                 {label && <label className="block text-[#12121299]">{label}</label>}
//                 <div className="relative">
//                     <div
//                         className={`cursor-pointer text-grey1 text-md bg-transparent outline-none w-full py-1.5 px-2 flex justify-between items-center ${className} ${isOpen ? "border-green" : ""}`}
//                     >
//                         <input
//                             type="text"
//                             ref={inputRef}
//                             value={
//                                 selectedItem && !searchTerm
//                                     ? isArabic(selectedItem.airport_city_ar)
//                                         ? `${selectedItem.airport_city_ar}, ${selectedItem.airport_country_code}`
//                                         : `${selectedItem.airport_city_en}, ${selectedItem.airport_country_code}`
//                                     : searchTerm
//                             }
//                             onChange={(e) => {
//                                 const value = e.target.value;
//                                 setSearchTerm(value);
//                                 if (value === "") setSelectedItem(null);
//                             }}
//                             placeholder={defaultValue ? defaultValue : placeholder}
//                             className="w-full outline-none placeholder:text-black"
//                             onFocus={() => setIsOpen(true)}
//                         />
//                         {icon && (
//                               loading ? (
//                                 <Loading />
//                             ) : (
//                                 <Image src={icon} alt="icon" width={25} height={25} />
//                             )
//                         ) }
//                     </div>

//                     {isOpen && (
//                         <div className="absolute z-10 p-1 w-full max-h-[300px] overflow-auto bg-white border border-gray shadow-lg rounded-lg mt-1">
//                             {loading ? (
//                                 <div className="text-center py-2">Loading...</div>
//                             ) : filteredOptions.length > 0 ? (
//                                 filteredOptions.map((option) => (
//                                     <div
//                                         key={option.id}
//                                         onClick={() => handleSelect(option)}
//                                         className="cursor-pointer px-2 py-1 hover:bg-greenGradient hover:text-white  transition-colors"
//                                     >
//                                         <div className="flex justify-between">
//                                             <div className="text-sm">
//                                                 <HighlightText
//                                                     text={
//                                                         isArabic(searchTerm)
//                                                             ? `${option.airport_city_ar}, ${option.airport_country_code}`
//                                                             : `${option.airport_city_en}, ${option.airport_country_code}`
//                                                     }
//                                                     query={searchTerm}
//                                                 />
//                                                 <p className="text-gray-500 text-xs">
//                                                     {isArabic(searchTerm) ? option.name_ar : option.name_en}
//                                                 </p>
//                                             </div>
//                                             <p className="bg-gray-200 text-xs rounded-sm font-semibold p-1 h-5">
//                                                 {option.airport_code}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="text-center py-2">No results found</div>
//                             )}
//                         </div>
//                     )}
//                     {error && <span className="text-sm text-red-500">{error}</span>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AirportSearchField;


import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image, { StaticImageData } from "next/image";
import { getAirports } from "@/actions/airport-search-actions";
import Loading from "../loading";
import { existingAirports } from "@/app/data/airports";
import { getAmadeusToken } from "@/utils/amadeus-token";

interface Airport {
    name: string;
    city: string;
    country: string;
    iata_code: string;
    _geoloc: {
        lat: number;
        lng: number;
    };
    links_count: number;
    id: string;
}


type HighlightTextProps = {
    text: string;
    query: string;
};

const HighlightText: React.FC<HighlightTextProps> = ({ text, query }) => {
    if (!query) return <>{text}</>;

    const regex = new RegExp(`(${query})`, "gi");
    return (
        <>
            {text?.split(regex).map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={index} className="bg-yellow-200">{part}</span>
                ) : (
                    part
                )
            )}
        </>
    );
};

type Props = {
    label?: string;
    placeholder?: string;
    className?: string;
    filterItem?: string;
    defaultValue?: string;
    icon?: StaticImageData;
    onSelect: (selectedIataCode: string) => void;
    error?: any;
};

const AirportSearchField: React.FC<Props> = ({
    label,
    placeholder = "Search airports...",
    className = "",
    onSelect,
    icon,
    defaultValue,
    filterItem,
    error
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Airport | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [airports, setAirports] = useState<Airport[]>([]);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const selectRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Fetch default airports when the component loads
        const loadDefaultAirports = async () => {
            try {
                const fetchedAirports = await getAirports(""); // Fetch all airports

                if (!Array.isArray(fetchedAirports)) {
                    console.error("Invalid API response: expected an array", fetchedAirports);
                    return;
                }

                // ✅ Ensure filtering logic is correct
                // const filteredAirports = existingAirports.filter((airport: { iata_code: any; }) =>
                //     fetchedAirports.some((fetched) => fetched.id === airport.iata_code)
                // );
                setAirports(fetchedAirports);
            } catch (error) {
                console.error("Error fetching default airports:", error);
            }
        };

        loadDefaultAirports();
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    useEffect(() => {
        const fetchData = async () => {
            if (!searchTerm.trim()) return;
            setLoading(true);
            // Fetch airports from Amadeus API
            const fetchedAirports = await getAirports(searchTerm);
            console.log("🔹 Fetched Airports:", fetchedAirports);
    
            // Compare fetched airports with existing ones using IATA code
            // const filteredAirports = existingAirports.filter(
            //     (airport: { iata_code: string }) =>
            //         fetchedAirports?.some(
            //             (fetched: { id: string }) => fetched.id === airport.iata_code
            //         )
            // );

            // console.log("✅ Matched Airports:", filteredAirports);
    
            // Update state with Arabic names from Amadeus response
            // setAirports(prev => {
            //     const newAirports = filteredAirports.map(airport => {
            //         const matchedAirport = fetchedAirports.find(
            //             (fetched: { id: string }) => fetched.id === airport.iata_code
            //         );
    
            //         return {
            //             ...airport,
            //             arabic_info: matchedAirport|| "nothing", // Get Arabic name if available
            //         };
            //     });
    
            // });
            
            setLoading(false);
            setAirports(fetchedAirports)
            return fetchedAirports;
        };
    
        const delayDebounceFn = setTimeout(() => {
            fetchData();
        }, 500); // Debounce to prevent excessive API calls
    
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);
    

    console.log(airports,"final result")

    const handleSelect = (item: Airport) => {
        onSelect(item.id);
        setSelectedItem(item);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <div ref={selectRef} className="flex flex-col w-full">
                {label && <label className="block text-[#12121299]">{label}</label>}
                <div className="relative">
                    <div className={`cursor-pointer text-grey1 text-md bg-transparent outline-none w-full py-1.5 px-2 flex justify-between items-center ${className} ${isOpen ? "border-green" : ""}`}>
                        <input
                            // lang="en"
                            type="text"
                            ref={inputRef}
                            value={selectedItem && !searchTerm ? ` ${selectedItem.name}` : searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                if (e.target.value === "") setSelectedItem(null);
                            }}
                            placeholder={defaultValue ? defaultValue : placeholder}
                            className="w-full outline-none placeholder:text-black notranslate"
                            onFocus={handleFocus}
                        />
                        {icon ? (
                            loading ? (
                                <Loading />
                            ) : (
                                <Image src={icon} alt="icon" width={25} height={25} />
                            )
                        ) : (
                            <IoIosArrowDown className="text-lg" />
                        )}
                    </div>

                    {isOpen && (
                        <div className="absolute z-10 w-full max-h-[500px] customScrollbar p-2 overflow-auto bg-white border border-bordered shadow-lg rounded-lg mt-0.5">
                            {airports?.length > 0 ? (
                                airports.map((option, i) => (
                                    <div
                                        key={option.iata_code}
                                        onClick={() => handleSelect(option)}
                                        className={`cursor-pointer px-2 py-1 ${i === 0 ? "rounded-t-lg" : ""} ${i === airports.length - 1 ? "rounded-b-lg" : ""} hover:bg-greenGradient hover:text-white transition-colors`}
                                    >
                                        <div className="flex justify-between group">
                                            <div className="text-[12px] leading-4">
                                                <HighlightText text={option?.name} query={searchTerm} />
                                                <p className="text-gray2 group-hover:text-white text-[10px]">{option?.name} ,{option?.city} ,{option?.country}</p>
                                            </div>
                                            <p className="bg-slate-200 group-hover:text-black text-[8px] rounded-sm font-semibold p-1 h-5">
                                                {option.iata_code}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-2">No results found</div>
                            )}
                        </div>
                    )}
                    {error && <span className="text-sm text-red-500">{error}</span>}
                </div>
            </div>
        </div>
    );
};

export default AirportSearchField;

















