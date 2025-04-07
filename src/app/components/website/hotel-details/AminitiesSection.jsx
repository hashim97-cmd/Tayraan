'use client'
import { useState } from 'react';
import { HotelPoolIcon } from '@/app/svg';

const AminitiesSection = ({ aminities, count }) => {
    const [showMore, setShowMore] = useState(false);

    // Show up to 5 aminities if not expanded  
    const visibleAminities = showMore ? aminities : aminities.slice(0, count || 5);

    return ( 

        <div className='flex flex-col items-center my-10'>
            <h2 className="lg:text-5xl md:text-3xl tet-2xl text-center my-10 font-bold">Amenities</h2>
            <div className='grid w-[90%] sm:grid-cols-3 grid-cols-2 gap-10'>
                {/* Display only visible amenities */}
                {visibleAminities.map((item, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <HotelPoolIcon />
                        <p className='sm:text-base text-sm'>{item}</p>
                    </div>
                ))}

                {/* Show More / Show Less button */}
                {aminities.length > (count || 5) && !showMore && (
                    <button
                        className='text-blue-500 text-start font-bold underline ml-2 mt-2'
                        onClick={() => setShowMore(true)}
                    >
                        +{aminities.length} more
                    </button>
                )}

                {/* Show Less button */}
                {showMore && (
                    <button
                        className='text-blue-500 text-start font-bold underline ml-2 mt-2'
                        onClick={() => setShowMore(false)}
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default AminitiesSection;
