'use client';
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ArrowUp, DayFilter } from '@/app/svg';
import PriceRange from '../../shared/filter/price-range';
import CheckboxGroup from '../../shared/filter/filter-checkbox-group';

interface FlightFilterProps {
    filterPrice: number;
    filterStops: string[];
    airlines: string[];
    filterDepartureTime: string;
    filterAirlines: string[];
    filterBaggage: string[];
    onPriceChange: (price: number) => void;
    onStopsChange: (stops: string[]) => void;
    onDepartureTimeChange: (departureTime: string) => void;
    onAirlinesChange: (airlines: string[]) => void;
    onBaggageChange: (baggage: string[]) => void;
}

// Define the possible keys for the isExpanded state
type IsExpanded = {
    price: boolean;
    stops: boolean;
    departureTime: boolean;
    airlines: boolean;
    baggage: boolean;
};

const FlightFilter: React.FC<FlightFilterProps> = ({
    filterPrice,
    airlines,
    filterStops,
    filterDepartureTime,
    filterAirlines,
    filterBaggage,
    onPriceChange,
    onStopsChange,
    onDepartureTimeChange,
    onAirlinesChange,
    onBaggageChange,
}) => {
    const [isExpanded, setIsExpanded] = useState<IsExpanded>({
        price: true,
        stops: true,
        departureTime: true,
        airlines: true,
        baggage: true,
    });

    const [priceRange, setPriceRange] = useState<[number, number]>([50, 10000]);

    const toggleSection = (section: keyof IsExpanded) => {
        setIsExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const departureTimeOptions = [
        { key: "before_morning", label: "Before 06:00AM" },
        { key: "morning", label: "06:00AM - 12:00PM" },
        { key: "afternoon", label: "12:00PM - 06:00PM" },
        { key: "evening", label: "After 06:00PM" },
    ];


    const stopsOptions = [
        "Any number of stops",
        "Direct flights only",
        "1 stop",
        "2 stops or more",
    ];

    const airlinesOptions = ["Emirates", "Qatar Airways", "Air India", "Indigo"];
    console.log('airline', airlines)
    const baggageOptions = [
        "All baggage options",
        "Checked baggage included",
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">

            {/* Departure Time Filter */}
            <div className="py-3">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection('departureTime')}
                >
                    <h4 className="text-base py-2 font-semibold">Departure Time</h4>
                    <span>
                        {isExpanded.departureTime ? (
                            <ArrowUp />
                        ) : (
                            <MdKeyboardArrowDown className="text-2xl" />
                        )}
                    </span>
                </div>

                {isExpanded.departureTime && (
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {departureTimeOptions.map((time) => (
                            <div
                                key={time.key}
                                className={`border px-2 py-4 rounded-md flex flex-col items-center cursor-pointer hover:shadow transition ${filterDepartureTime === time.key ? 'bg-[#98FFC80A]' : ''
                                    }`}
                                onClick={() => onDepartureTimeChange(time.key)}
                            >
                                <DayFilter />
                                <span className="text-sm text-center">{time.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Filter */}
            <div className="py-3">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('price')}>
                    <h4 className="text-base py-2 font-semibold">Price Range</h4>
                    <span>{isExpanded.price ? <ArrowUp /> : <MdKeyboardArrowDown className="text-2xl" />}</span>
                </div>
                {isExpanded.price && (
                    <PriceRange
                        title=""
                        min={50}
                        max={1000}
                        unit="SAR"
                        value={priceRange}
                        onChange={(newValue) => {
                            setPriceRange(newValue);
                            onPriceChange(newValue[1]); // Pass max value to the parent component
                        }}
                    />
                )}
            </div>

            {/* Stops Filter */}
            <CheckboxGroup
                title="Stops"
                options={stopsOptions.map((label) => ({ label }))}
                selectedOptions={filterStops}
                onChange={onStopsChange}
            />

            {/* Airlines Filter */}
            {airlines && <CheckboxGroup
                title="Airlines"
                options={airlines?.map((label: any) => ({ label }))}
                selectedOptions={filterAirlines}
                onChange={onAirlinesChange}
            />}

            {/* Baggage Filter */}
            {/* <CheckboxGroup
                title="Baggage"
                options={baggageOptions.map((label) => ({ label }))}
                selectedOptions={filterBaggage}
                onChange={onBaggageChange}
            /> */}
        </div>
    );
};

export default FlightFilter;
