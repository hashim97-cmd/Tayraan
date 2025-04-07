"use client"
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { FiPlusCircle } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

interface TravelersProps {
    label?: string;
    adults: number;
    setAdults: (count: number) => void;
    children: number;
    setChildren: (count: number) => void;
    infants: number;
    setInfants: (count: number) => void;
}

const Travelers: React.FC<TravelersProps> = ({
    adults,
    setAdults,
    children,
    setChildren,
    infants,
    setInfants,
    label,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleCountChange = (setCount: (count: number) => void, count: number) => {
        setCount(Math.max(0, count));
    };

    const handleAdultChange = (count: number) => {
        handleCountChange(setAdults, adults + count);
    };

    const handleChildChange = (count: number) => {
        handleCountChange(setChildren, children + count);
    };

    const handleInfantChange = (count: number) => {
        handleCountChange(setInfants, infants + count);
    };

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            // Cleanup function to remove event listener on unmount
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div ref={ref} className="relative w-full">
            {label && <label className="block text-[#12121299]">{label}</label>}
            <button
                onClick={handleButtonClick}
                className=" py-3 px-2 w-full flex items-center justify-between"
            >
                <span>{adults + children + infants} passengers</span>
                <IoIosArrowDown className="text-lg" />
            </button>

            {isOpen && (
                <div className="absolute min-w-64 bg-white p-4 left-0 rounded-lg shadow-2xl z-10 mt-2">
                    <h2 className="text-lg font-semibold mb-4">Travelers</h2>
                    <div className="flex justify-between items-center mb-2">
                        <div className="mr-2 text-black">Adults <span className="text-grayText text-xs"> (12+ yrs)</span></div>
                        <div className="flex gap-1 items-center">
                            <button
                                onClick={() => handleAdultChange(-1)}
                                className=" text-green text-2xl font-bold py-2 rounded-l-lg"
                            >
                                <AiOutlineMinusCircle />
                            </button>
                            <span className="px-2">{adults}</span>
                            <button
                                onClick={() => handleAdultChange(1)}
                                className=" text-green text-2xl font-bold py-2 rounded-r-lg"
                            >
                                <FiPlusCircle />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                        <div className="mr-2 text-black">Children <span className="text-grayText text-xs"> (2-12 yrs)</span></div>
                        <div className="flex gap-1 items-center">
                            <button
                                onClick={() => handleChildChange(-1)}
                                className=" text-green text-2xl font-bold py-2 rounded-l-lg"
                            >
                                <AiOutlineMinusCircle />
                            </button>
                            <span className="px-2">{children}</span>
                            <button
                                onClick={() => handleChildChange(1)}
                                className=" text-green text-2xl font-bold py-2 rounded-r-lg"
                            >
                                <FiPlusCircle />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className=" text-black">Infants<span className="text-grayText text-xs"> (under 2 yrs)</span></div>
                        <div className="flex gap-1 items-center">
                            <button
                                onClick={() => handleInfantChange(-1)}
                                className=" text-green text-2xl font-bold py-2 rounded-l-lg"
                            >
                                <AiOutlineMinusCircle />
                            </button>
                            <span className="px-2">{infants}</span>
                            <button
                                onClick={() => handleInfantChange(1)}
                                className=" text-green text-2xl font-bold py-2 rounded-r-lg"
                            >
                                <FiPlusCircle />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Travelers;