'use client'
import React, { useState } from "react";
import ParaHeading from "../../shared/para-heading";
import SubHeading from "../../shared/subHeading";
import { Location, LocationIcon } from "@/app/svg";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { BsShareFill } from "react-icons/bs";
import Button from "../../shared/Button";
import { useRouter } from "next/navigation";
import { FaStarHalf, FaStar } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { TiStarHalf } from "react-icons/ti";

type HotelHeaderProps = {
    data: {
        airline: string;
        location: string;
        reviews: string;
        rating: number;
        price: string;
    };
};

const HotelHeader = ({ data }: any) => {
    // const { airline, location, reviews, rating, price } = data;
    const [fav, setfav] = useState(false)
    const router = useRouter();

    return (
        <div className="flex items-center px-4 py-6 justify-between flex-wrap  rounded-lg">
            {/* Header Section */}
            <div className="w-full lg:w-1/2 mb-4 space-y-3">
                <ParaHeading className="!text-black !font-bold">{data.HotelName}</ParaHeading>
                <div className="flex items-center">
                    <div className="flex items-center gap-1 font-medium text-base text-grayText">
                        {/* Full stars */}
                        {[...Array(Math.floor(parseFloat(data?.HotelRating) || 0))].map((_, index) => (
                            <MdStar className='text-[#FF7300] text-xl' key={index} />
                        ))}
                      
                    </div>
                    <p className="text-primary text-xs ml-2 font-medium">{data.HotelRating} Star Hotel</p>
                </div>
                <div className="flex items-center gap-3">
                    <LocationIcon />
                    <SubHeading className="!text-black">{data.Address}</SubHeading>

                </div>
                {/* <div className="flex justify-start items-center mt-2">
                    <p className="text-black flex justify-center items-center px-3 py-2 text-lg font-medium border-2 border-Cgreen rounded-lg ">{data.toFixed(1)}</p>
                    <span className="text-black  font-semibold text-sm ml-2">{data.HotelRating}</span>
                </div> */}
            </div>

            {/* Price Section */}
            <div className="space-y-3  w-full  lg:w-1/5">
                {/* <ParaHeading className="!text-black !font-bold !text3xl">{price}</ParaHeading> */}
                <div className="flex items-center gap-5">
                    <button onClick={() => setfav(!fav)} className="text-green flex justify-center items-center p-2  text-2xl font-medium border-2 border-green  rounded-lg ">{fav ? <RiHeart3Fill /> : <RiHeart3Line />}</button>

                    <button className="text-green flex justify-center items-center p-2  text-2xl font-medium border-2 border-green  rounded-lg "> <BsShareFill /> </button>
                    {/* <Button onClick={() => router.push(`/book-now?id=`)} label="Book Now" style="!bg-greenGradient !text-center !min-w-32" /> */}

                </div>

            </div>
        </div>
    );
};

export default HotelHeader;
