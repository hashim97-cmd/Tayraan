import React, { useState } from 'react';
import Image from 'next/image';

const PhotosSection = ({ images }: { images: string[] }) => {
    const [showAll, setShowAll] = useState(false);

    // Slice the images array to show only the first 5 images initially
    const displayedImages = showAll ? images : images?.slice(0, 5);

    // console.log(displayedImages)

    return (
        <div id='photos' className='grid my-10 sm:grid-cols-2 grid-cols-1 gap-3'>
            {/* First Image (Large) */}
            <div>
                <div className="rounded-lg shadow-sm h-full">
                    <Image
                        src={images[0]}
                        alt=''
                        width={500}
                        height={600}
                        className="object-cover h-full rounded-lg w-full"
                    />
                </div>
            </div>

            {/* Remaining Images */}
            <div className="[column-fill:_balance] sm:columns-2 sm:gap-3">
                {displayedImages.slice(1).map((item, i) => (
                    <div key={i} className="mb-3 sm:break-inside-avoid">
                        <blockquote className="rounded-lg shadow-sm">
                            <Image
                                src={item}
                                alt=''
                                width={500}
                                height={600}
                                className="object-cover w-full"
                            />
                        </blockquote>
                    </div>
                ))}
            </div>

            {/* Show All Button */}
            {images.length > 5 && (
                <div className="col-span-full flex justify-center mt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotosSection;