'use client'
import Section from '@/app/components/shared/section';
import HotelHeader from '@/app/components/website/hotel-details/HotelHeader'
import Tabs from '@/app/components/website/hotel-details/Tabs';
import React from 'react'
import i1 from "/public/assets/hotels/hd1.png";
import i2 from "/public/assets/hotels/hd2.png";
import i3 from "/public/assets/hotels/hd3.png";
import i4 from "/public/assets/hotels/hd4.png";
import i5 from "/public/assets/hotels/hd5.png";
import Image from 'next/image';
import RoomChoices from '@/app/components/website/hotel-details/RoomChoices'
import WeekendDeals from '@/app/components/website/flight-details/WeekendDeals';
import AminitiesSection from '@/app/components/website/hotel-details/AminitiesSection';
import Reviews from '@/app/components/website/hotel-details/Reviews';
import PhotosSection from './PhotoSection';
// import FAQs from '@/app/components/website/hotel-details/FAQs';


const HotelDetails = ({ hotel, AvailableRooms }: { hotel: any, AvailableRooms: any }) => {

    const data = {
        airline: "Ramada Plaza by Wyndham Istanbul City Center Adults Only",
        location: "Halaskargazi Cad No 63",
        reviews: "Very Good 54 reviews",
        rating: 4.2,
        price: "$240",
        images: [i1, i2, i3, i4, i5],
        // featureImages: [f1, f2, f3, f4, f5, f6, f1, f2, f3, f4, f5, f6, f1, f2, f3, f4, f5, f6, f1, f2, f3, f4, f5, f6],
    };

    const tabs = [
        { id: "photos", label: "Photos" },
        { id: "room-choices", label: "Room Choices" },
        { id: "reviews", label: "Reviews" },
        { id: "amenities", label: "Amenities" },
        { id: "faqs", label: "FAQs" },
        { id: "attractions", label: "Attractions" },
        { id: "about-property", label: "About The Property" },
        { id: "similar-properties", label: "Similar Properties" },
    ];

    const amenities = [
        'Outdoor pool',
        'Indoor pool',
        'Spa and wellness center',
        'Restaurant',
        'Room service',
        'Fitness center',
        'Bar/Lounge',
        'Free Wi-Fi',
        'Tea/coffee machine',
        'Outdoor pool',
        'Indoor pool',
        'Spa and wellness center',
        'Restaurant',
        'Room service',
        'Fitness center',
        'Bar/Lounge',
        'Free Wi-Fi',
        'Tea/coffee machine'
    ];

    console.log('----👩‍💻👨‍🎤', AvailableRooms)
    console.log('----👩‍💻👨‍🎤',hotel)
    return (
        <Section>
            <HotelHeader data={hotel} />
            <div className='my-5'>
                <Tabs tabs={tabs} />
            </div>

            {/* photos */}
            <PhotosSection images={hotel.Images} />

            {/* <div id='photos' className='grid my-10 sm:grid-cols-2 grid-cols-1 gap-3'>
                <div>
                    <div className="rounded-lg shadow-sm h-full ">
                        <Image src={hotel.Images[0]} alt='' width={500} height={600} className="object-cover h-full rounded-lg w-full" />
                    </div>
                </div>
                <div className=" [column-fill:_balance] sm:columns-2 sm:gap-3  ">
                    {hotel.images?.map((item:any, i: number) => (
                        <div key={i} className="mb-3 sm:break-inside-avoid">
                            <blockquote className="rounded-lg shadow-sm ">
                                <Image src={item} alt='' width={500} height={600} className="object-cover w-full" />
                            </blockquote>
                        </div>
                    ))}

                </div>
            </div> */}

            <div className="mt-8 w-full">
                <RoomChoices />
            </div>

            <div className="mt-8 ">
                <AminitiesSection aminities={amenities} count={14} />
            </div>

            <div className="mt-8 ">
                <WeekendDeals />
            </div>

            <div className="mt-8 ">
                <Reviews />
            </div>

            <div className="mt-8 ">
                {/* <FAQs /> */}
            </div>

        </Section>
    )
}

export default HotelDetails
