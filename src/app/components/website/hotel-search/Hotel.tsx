'use client'
import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdStar } from 'react-icons/md';
import { TiStarHalf } from 'react-icons/ti';
import emptyImg from '@/public/assets/emptyImg.png'
import Image from 'next/image';
import HotelSearch from '../home/components/hotel-search-form';
import Link from 'next/link';
import Filters from './Filters';
import Pagination from '../../shared/Pagination';

interface Props {
    hotels: any[],
}

const starRatingMap: { [key: string]: number } = {
    "OneStar": 1,
    "TwoStar": 2,
    "ThreeStar": 3,
    "FourStar": 4,
    "FiveStar": 5,
    "SixStar": 6,
    "SevenStar": 7
};

const starRatingMapFiltering: { [key: string]: string } = {
    "1 stars": "OneStar",
    "2 stars": "TwoStar",
    "3 stars": "ThreeStar",
    "4 stars": "FourStar",
    "5 stars": "FiveStar",
    "6 stars": "SixStar",
    "7 stars": "SevenStar",
};

const filterHotels = (
    hotels: any[],
    priceRange: [number, number],
    selectedStarRatingOptions: string[],
    selectedGuestRatingOptions: string[],
) => {
    return hotels.filter((hotel) => {

        // Filter by price range (only if price range is not the default)
        const price = hotel.MinHotelPrice?.OriginalPrice || 0;
        const isInPriceRange =
            priceRange[0] === 10 && priceRange[1] === 1000 ? true : price >= priceRange[0] && price <= priceRange[1];

        // rating
        const isStarRatingMatch =
            selectedStarRatingOptions.length === 0 ||
            selectedStarRatingOptions.some((option) => {
                const ratingKey = starRatingMap[option]; // Map "5 stars" to "FiveStar"
                return ratingKey === hotel.HotelInfo?.Rating;
            });

        // Filter by guest rating (if any options are selected)
        const guestRating = parseFloat(hotel.HotelInfo?.TripAdvisorRating || "0");
        const isGuestRatingMatch =
            selectedGuestRatingOptions.length === 0 ||
            selectedGuestRatingOptions.some((option) => {
                const minRating = parseFloat(option.split("+")[0]);
                return guestRating >= minRating;
            });

        // Return true only if all applied filters are satisfied
        return (
            isInPriceRange &&
            isStarRatingMatch &&
            isGuestRatingMatch
        );
    });
};

const Hotel = ({ hotels }: Props) => {
    const [priceRange, setPriceRange] = useState<[number, number]>([10, 1000]);
    const [selectedHotelOptions, setSelectedHotelOptions] = useState<string[]>([]);
    const [selectedStarRatingOptions, setSelectedStarRatingOptions] = useState<string[]>([]);
    const [selectedGuestRatingOptions, setSelectedGuestRatingOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hotelsPerPage] = useState(10); // Number of hotels per page

    const filteredHotels = filterHotels(
        hotels,
        priceRange,
        selectedStarRatingOptions,
        selectedGuestRatingOptions,
    );

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

    // Get hotels for the current page
    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

    if (!hotels.length) {
        return <p className="text-center text-gray-500">No hotels found for the provided criteria.</p>;
    }



    return (
        <>
            <div className='py-20'>
                <HotelSearch className={"lg:grid-cols-4 grid-cols-2"} />

                <div className='w-full flex items-start gap-6 my-8'>
                    {/* Filters */}
                    <Filters
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        selectedHotelOptions={selectedHotelOptions}
                        onHotelOptionsChange={setSelectedHotelOptions}
                        selectedStarRatingOptions={selectedStarRatingOptions}
                        onStarRatingOptionsChange={setSelectedStarRatingOptions}
                        selectedGuestRatingOptions={selectedGuestRatingOptions}
                        onGuestRatingOptionsChange={setSelectedGuestRatingOptions}
                    />

                    {/* HOTELS */}
                    <div className='w-[75%]'>
                        <div className='flex flex-col gap-5'>
                            <span className='font-medium'>
                                Showing <span className='text-orange'>{filteredHotels.length} places</span>
                            </span>

                            {currentHotels.map((e: any, i: any) => (
                                <div key={i} className='flex items-start gap-4 w-full rounded-lg' style={{ boxShadow: '0px 4px 16px 0px #1122110D' }}>
                                    <div className='w-[35%] h-60'>
                                        {e?.HotelInfo?.HotelPicture ? (
                                            <img src={e?.HotelInfo?.HotelPicture} className='w-full h-full object-cover' alt="" />
                                        ) : (
                                            <Image alt='' src={emptyImg} className='w-full h-full object-cover' />
                                        )}
                                    </div>
                                    <div className='w-full flex-1 flex flex-col p-2 items-center justify-center'>
                                        <div className='flex items-start gap-3 justify-between w-full'>
                                            <div>
                                                <h1 className='text-xl font-bold mb-3'>{e?.HotelInfo?.HotelName}</h1>
                                                <div>
                                                    <div className='flex items-center gap-1 mb-3'>
                                                        <FaLocationDot />
                                                        <p className='text-xs'>{e?.HotelInfo?.HotelAddress}</p>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='flex items-center gap-2'>
                                                            <div className="flex items-center gap-1 font-medium text-base text-grayText">
                                                                {/* Full stars */}
                                                                {[...Array(Math.floor(parseFloat(e?.HotelInfo?.TripAdvisorRating) || 0))].map((_, index) => (
                                                                    <MdStar className='text-[#FF7300] text-xl' key={index} />
                                                                ))}
                                                                {/* Half star if needed */}
                                                                {parseFloat(e?.HotelInfo?.TripAdvisorRating) % 1 !== 0 && (
                                                                    <TiStarHalf className='text-[#FF7300] text-xl' />
                                                                )}
                                                            </div>
                                                            <p className='text-sm font-medium'>{starRatingMap[e?.HotelInfo?.Rating] || 0} Star Hotel</p>
                                                        </div>
                                                        <div>20+ Aminities</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p>starting from</p>
                                                <h1 className='text-2xl font-bold gap-1 flex'>
                                                    <span>{e?.MinHotelPrice?.Currency}{' '}{e?.MinHotelPrice?.OriginalPrice}</span>/Night
                                                </h1>
                                                <p className='text-[10px] text-end mt-1'>excl. tax</p>
                                            </div>
                                        </div>
                                        <div className='w-full border-[#112211] flex justify-center border-t py-3'>
                                            <div className='justify-end w-full pt-5'>
                                                <Link
                                                    href={`/hotel-details?HotelCode=${e.HotelInfo.HotelCode}&HotelBookingCode=${e.HotelBookingCode}`}
                                                    className='text-white bg-greenGradient w-full py-3 px-10 rounded-full'
                                                >
                                                    View Place
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hotel;