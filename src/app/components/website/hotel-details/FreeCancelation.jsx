'use client'
import { HotelBedIcon, HotelPoolIcon, HoteSizeIcon, PeopleIcon, RulesTickIcon } from '@/app/svg'
import React, { useState } from 'react'
import MidHeading from '../../shared/MidHeading'
import { HotelData } from '@/data/index'
import Image from 'next/image'
import SubHeading from '../../shared/subHeading'
import RoomFacilities from './RoomFacilities'
import RoomOffers from './RoomOffers'
import Aminities from './Aminities'
import Heading from '../../shared/heading'
import Button from '../../shared/Button'
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri'
import { BsShareFill } from 'react-icons/bs'


const FreeCancelation = ({ data }) => {

    const [fav, setfav] = useState(false)

    return (
        <div className='w-full flex flex-col gap-14'>
            {
                HotelData.map((e, i) => (
                    <div key={i} className='w-full border bg-[#FAFAFA] border-grayBorder rounded-3xl'>

                        <div className='px-8 py-3 flex items-center gap-2' >
                            <HotelBedIcon />
                            <Heading>
                                <span className='font-bold'>
                                    {e.roomType}
                                </span>
                            </Heading>
                        </div>
                        <div className='bg-white flex items-center lg:flex-row flex-col gap-6 sm:px-8 px-4 py-6 border border-l-0 border-r-0 border-t-grayBorder border-b-grayBorder' >
                            <div className='lg:w-[20%]'>
                                <Image alt='' src={e.hotelImg} className='h-full w-full object-cover' />
                            </div>
                            <div className='w-full flex-1 md:flex-row flex-col flex justify-between gap-4 items-start' >
                                <div className='lg:w-[50%]'>
                                    <h1 className='xl:text-3xl text-2xl mb-4  text-start font-medium'>
                                        {e.roomType}
                                    </h1>
                                    <RoomFacilities facilities={e.roomFacilities} />
                                </div>
                                <div className=''>
                                    <h1 className='xl:text-3xl text-2xl mb-4 text-start font-medium'>
                                        Amenities
                                    </h1>
                                    <Aminities aminities={e.aminities} />
                                </div>
                            </div>
                        </div>

                        <div className='sm:p-8 p-4 flex flex-col gap-8'>
                            <div className='bg-secondary p-4 font-bold lg:flex hidden lg:text-2xl px-8 text-xl rounded-full text-white  items-center justify-between' >
                                <div className='w-[45%] text-start' >
                                    <p>Select an option</p>
                                </div>
                                <div className='w-[55%] grid grid-cols-3 ' >
                                    <p className=''>Guests</p>
                                    <p>Total for 1 rooms</p>
                                </div>
                            </div>
                            {
                                e.roomOptions.map((item, idx) => (
                                    <div key={idx} className='flex items-center lg:flex-row flex-col h-full bg-white border border-grayBorder rounded-2xl' >
                                        <div className='lg:w-[45%] w-full lg:border-r-[1px] p-4 border-0 h-full border-grayBorder'>
                                            <div className='flex items-center justify-between'>
                                                <h1 className='lg:text-2xl text-xl font-medium'>{item.type}</h1>
                                                <button className='bg-orange text-white text-xs px-3 rounded-full py-1' >Lowest price!</button>
                                            </div>
                                            <RoomOffers offers={item.offers} />
                                            <p className='w-full text-start mt-2'>{item.rooms}</p>
                                        </div>
                                        <div className='grid lg:w-[55%] w-full sm:grid-cols-3 grid-cols-1 h-full'>
                                            <div className='px-8  p-4  flex items-center gap-2 h-full'>
                                                <PeopleIcon />
                                                <p>{item.guests}</p>
                                            </div>
                                            <div className=' p-4  flex-col flex items-start h-full gap-2'>
                                                <h1 className='lg:text-2xl text-xl font-medium'>{item.totalPrice}</h1>
                                                <p className='text-start'>{item.totalPriceFor}</p>
                                            </div>
                                            <div className='w-full flex sm:flex-col flex-row sm:justify-normal justify-between sm:items-center lg:p-0 p-4'>
                                                <Button label="Book Now" style="!bg-greenGradient !text-center !min-w-32" />
                                                <div className='flex items-center gap-2'>
                                                    <button onClick={() => setfav(!fav)} className="text-green flex justify-center items-center p-2  text-2xl font-medium border-2 border-green  rounded-lg ">{fav ? <RiHeart3Fill /> : <RiHeart3Line />}</button>
                                                    <button className="text-green flex justify-center items-center p-2  text-2xl font-medium border-2 border-green  rounded-lg "> <BsShareFill /> </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default FreeCancelation
