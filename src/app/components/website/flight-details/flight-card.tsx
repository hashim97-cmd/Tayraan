"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Food, Plane, Seat, Time, Wifi } from "@/app/svg/flight-feature-svg";
import {
  getAirportByIATA,
  calculateTotalDuration,
  getFlightNames,
  calculateTotalDurationShort,
  getCityCountryByIATA,
  calculateTotalDurationShortNew,
  calculateDurationSimple,
} from "@/utils/airports-helper";
import logo from "/public/assets/flights/companyName.png";
import route from "/public/assets/planeRoute.png";
import { IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { LuClock8 } from "react-icons/lu";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setData } from "@/redux/store";
import { AirlinesData } from "@/app/data/airlines";
import axios from "axios";
import { addFlightData } from "@/redux/flightSlice";
import { scrollToTop } from "@/utils";

const FlightCard = ({
  flight,
  airlineName,
  isFlightSelected,
  setIsFlightSelected,
  from,
  SetReturnFlight,
  setIsSideMenuOpen,
  returnFlights,
}: any) => {
  const feature = [<Plane />, <Wifi />, <Time />, <Food />, <Seat />];
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const travelersParam = searchParams.get("adult") || "1";
  const dispatch = useDispatch();


  useEffect(()=>{
    if(from==="selection")
    {
      setIsOpenDetails(true)
    }
  },[from])

  function formatDateToDayMonth(isoString: string) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  }
  const filteredAirline = AirlinesData.find(
    (airline) => airline.name.toLowerCase() === airlineName?.toLowerCase()
  );

  function getNumberOfStops(itinerary: any) {
    // Total number of stops is the sum of stops from each segment
    const stopCount = itinerary.segments.length;

    if (stopCount === 1) {
      return "Direct";
    } else if (stopCount === 2) {
      return `${"1 Stop"}`;
    }
  }

  function calculateWaitingTime(
    arrivalTime: string,
    departureTime: string
  ): string {
    // Parse the datetime strings into Date objects
    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);

    // Calculate the difference in milliseconds
    const differenceInMs = departure.getTime() - arrival.getTime();

    // Convert the difference to hours and minutes
    const totalMinutes = Math.floor(differenceInMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `Waiting time ${hours}h and ${minutes}m`;
  }

  // Function to generate stop details for tooltip
  function getStopDetails(itinerary: any) {
    // Filter out segments with no stops
    //const stops = itinerary.segments.flatMap((segment: any) => segment || []);
    const stops = itinerary.segments.length;

    if (stops.length === 1) {
      return (
        <div className="p-2  whitespace-nowrap">
          <p>Flight has no stop</p>
        </div>
      );
    } else {
      const arrival = itinerary.segments[0]?.arrival.at;
      const departure = itinerary.segments[1]?.departure.at;
      const waitingIata = itinerary.segments[0]?.arrival.iataCode;

      return (
        <p>
          {calculateWaitingTime(arrival, departure)} in{" "}
          {getAirportByIATA(waitingIata)}
        </p>
      );
    }

    // return itinerary.segments.map((stop: any, index: number) => (
    //     <div key={index} className="p-2 whitespace-nowrap">
    //         <p><strong>Stop {index + 1}</strong></p>
    //         <p>Departure: {new Date(stop.departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
    //         <p>Departure from: {getAirportByIATA(stop.departure.iataCode)}</p>
    //         <p>Arrival: {new Date(stop.arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
    //         <p>Arrival At: {getAirportByIATA(stop.arrival.iataCode)}</p>
    //         <p>Duration: {calculateDurationSimple(stop?.duration)}</p>
    //     </div>
    // ));
  }

  const FlightOfferSearch = async (flightData: any) => {
    if (!isFlightSelected && returnFlights.length!==0) {
      scrollToTop();
      SetReturnFlight();
      setIsFlightSelected(true);
    } else if(!isFlightSelected && returnFlights.length===0)
    {
      setIsSideMenuOpen(true);
    }
     else {
      setIsSideMenuOpen(true);
    }

    dispatch(addFlightData(flightData));
  };

  function calculateSimpleDayDifference(
    departureDate: string,
    arrivalDate: string
  ) {
    // Convert the date strings into Date objects
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);

    // Calculate the time difference in milliseconds
    const timeDifference = arrival.getTime() - departure.getTime();

    // Convert the time difference from milliseconds to days
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.round(dayDifference); // Return the difference in days (rounding to ensure it's an integer)
  }

  const ShowBookNowText = () => {
    if(loading)
    {
      return "Checking..."
    }
    else if(isFlightSelected)
    {
      return "Book Now"
    }
    else if(!isFlightSelected)
    {
      return "Select"
    }
    
  };

  // console.log(filteredAirline);
  return (
    <div>
      <div className="border bg-white p-5 font-cairo text-black border-[#C0C0C0] flex flex-col justify-between  gap-5 rounded-xl ">
        <div className="flex justify-between w-full items-center flex-wrap gap-4">
          <div className="flex gap-2 items-center">
            <Image
              src={filteredAirline ? filteredAirline?.logo : logo}
              alt=""
              width={40}
              height={30}
              unoptimized
              className="rounded-full object-contain"
            />
            <h2 className="text-lg lg:text-xl font-semibold">{airlineName}</h2>
          </div>
          {/* <h2 className="text-base lg:text-lg ">Travel Class: <span className="font-bold text-xl">Economy</span></h2> */}
        </div>

        <div className="flex justify-between items-center text-sm lg:text-base gap-5 flex-wrap">
          {/* <div className="lg:w-3/4 w-full bg-[#98FFC80A] p-5">
                        <p className="py-2">Sun, 29 Jan 2023</p>

                        <div className="grid lg:grid-cols-3 justify-between grid-cols-1 gap-5">
                            <div className="flex flex-col ">
                                <p className="py-2">14.50</p>
                                <p className="py-2">Moi Intl, Mombasa</p>
                                <p className="py-2">Kenya</p>

                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <p className="py-2">9hr 50min</p>
                                <Image src={route} alt='' className='' />


                            </div>
                            <div className="flex flex-col lg:justify-center lg:items-center">
                                <p className="py-2">14.50</p>
                                <p className="py-2">JFK Terminal, Nairobi,</p>
                                <p className="py-2">Kenya</p>

                            </div>
                        </div>

                    </div> */}
          <div className="lg:w-3/4 w-full bg-[#98FFC80A] p-5">
            {flight?.itineraries.map((itinerary: any, index: number) => (
              <div
                key={index}
                className="grid lg:grid-cols-3 justify-between grid-cols-1 gap-5"
              >
                <div className="flex flex-col">
                  <div className="py-1">
                    <p className="text-sm">
                      {new Date(
                        itinerary.segments[0].departure.at
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <span className="text-sm text-grayDark">
                      {itinerary.segments[0].departure.at?.split("T")[0]}
                    </span>
                  </div>
                  <div>
                    <p className="">
                      {getAirportByIATA(
                        itinerary.segments[0].departure.iataCode
                      )}
                    </p>
                    <span className="text-sm text-grayDark">
                      {itinerary.segments[0].departure.iataCode}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center relative">
                  <p className="py-0">
                    {calculateTotalDurationShortNew(itinerary.segments)}
                  </p>
                  <Image src={route} alt="Flight Route" />
                  {/* Number of stops and hover effect for stop details */}
                  <div className="py-0  group">
                    <p>{getNumberOfStops(itinerary)}</p>

                    {getStopDetails(itinerary) && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full p-2 bg-[#333030] text-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        {getStopDetails(itinerary)}
                      </div>
                    )}
                  </div>
                  {/* <p className="py-0">{itinerary?.segments[0]?.numberOfStops == 0 ? 'Direct' : itinerary?.segments[0]?.numberOfStops + ' Stops'}</p> */}
                </div>

                <div className="flex flex-col lg:justify-center lg:items-center">
                  <div className="py-1">
                    <span className="flex items-center gap-2">
                      <p className="text-sm">
                        {new Date(
                          itinerary.segments[
                            itinerary.segments.length - 1
                          ].arrival.at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <span className="text-sm text-grayDark">
                        +
                        {calculateSimpleDayDifference(
                          itinerary.segments[0].departure.at.split("T")[0],
                          itinerary.segments[
                            itinerary.segments.length - 1
                          ].arrival.at.split("T")[0]
                        )}
                      </span>
                    </span>
                    <span className="text-sm text-grayDark">
                      {
                        itinerary.segments[
                          itinerary.segments.length - 1
                        ].arrival.at?.split("T")[0]
                      }
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="">
                      {getAirportByIATA(
                        itinerary.segments[itinerary.segments.length - 1]
                          .arrival.iataCode
                      )}
                    </p>
                    <span className="text-sm text-grayDark text-center ">
                      {
                        itinerary.segments[itinerary.segments.length - 1]
                          .arrival.iataCode
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex lg:w-1/5 w-full items-center gap-5 flex-col">
            <p className="py-2">
              {" "}
              {flight?.price.currency} {flight?.price.total}
            </p>
            {/* <p className="py-2">$18,500</p> */}
            {from === "card" && (
              <button
                onClick={() => {
                  FlightOfferSearch(flight);
                }}
                className="py-3 px-6 text-center text-white rounded-lg bg-green"
              >
                {ShowBookNowText()}
              </button>
            )}

            <div
              className="flex items-center justify-end gap-2 px-5 cursor-pointer"
              onClick={() => setIsOpenDetails(!isOpenDetails)}
            >
              <div
                className={`transform transition-transform duration-300 ${
                  isOpenDetails ? "rotate-180" : ""
                }`}
              >
                <IoIosArrowDown size={20} color="green" />
              </div>
              <button className="text-green text-xl font-semibold">
                Flight Details
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between font-medium items-center gap-5 flex-wrap ">
          <p className="py-2">{flight.numberOfBookableSeats} seats remaining</p>
          {/* <p className="py-2 text-orange">Partially Refundable</p> */}
          <div className="flex items-center gap-4">
            {feature.map((item, i) => (
              <div key={i} className="py-2 px-4 border-r-2 border-[#D7E2EE]">
                {item}
              </div>
            ))}
          </div>
        </div>

        {isOpenDetails && (
          <div className="p-5 bg-[#f7f7f8] space-y-5">
            {flight.itineraries.map((itinerary: any, index: number) => (
              <div key={index} className="flex gap-5 flex-col">
                {/* top */}
                <div className=" flex gap-14">
                  <div className="flex flex-col gap-5 justify-between">
                    <div className="flex flex-col text-center">
                      <p className=" font-semibold">
                        {new Date(
                          itinerary.segments[0].departure.at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <p className=" text-slate-500">
                        {formatDateToDayMonth(
                          itinerary.segments[0].departure.at
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="py-0 relative group">
                        <p>{getNumberOfStops(itinerary)}</p>

                        {getStopDetails(itinerary) && (
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 p-2 bg-[#333030] text-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            {getStopDetails(itinerary)}
                          </div>
                        )}
                      </div>
                      {/* <p className="py-0 text-slate-500">{itinerary?.segments[0]?.numberOfStops == 0 ? 'Direct' : itinerary?.segments[0]?.numberOfStops + ' Stops'}</p> */}
                      <LuClock8 size={20} />
                      <p className="text-slate-500">
                        {calculateTotalDurationShort(itinerary.segments)}
                      </p>
                      {/* <p className="text-slate-500">{formatDateToDayMonth(itinerary.segments[itinerary.segments.length - 1].arrival.at)}</p> */}
                    </div>
                    <div className="flex flex-col items-center">
                      <p className=" font-semibold">
                        {new Date(
                          itinerary.segments[
                            itinerary.segments.length - 1
                          ].arrival.at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <p className="text-slate-500">
                        {formatDateToDayMonth(
                          itinerary.segments[itinerary.segments.length - 1]
                            .arrival.at
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center justify-between">
                      <FaLocationCrosshairs size={20} color="green" />
                      <div className="w-[2px] bg-slate-200 absolute h-[75%] top-[20px]"></div>
                      <CiLocationOn size={20} />
                    </div>
                    <div className="flex flex-col gap-5 justify-between">
                      <div>
                        <p className=" font-bold text-xl">
                          {getAirportByIATA(
                            itinerary.segments[0].departure.iataCode
                          )}{" "}
                          ({itinerary.segments[0].departure.iataCode})
                        </p>
                        <p className=" text-slate-500">
                          {getCityCountryByIATA(
                            itinerary.segments[0].departure.iataCode
                          )}
                        </p>
                      </div>
                      <div className=" flex items-center">
                        <Image
                          src={filteredAirline ? filteredAirline?.logo : logo}
                          alt=""
                          width={40}
                          height={30}
                          unoptimized
                          className="rounded-full mr-2 object-contain"
                        />

                        {/* <Image src={logo} alt='' className='' /> */}
                        <div className=" flex flex-col ">
                          <p className="font-semibold">{airlineName}</p>
                          <p className="text-slate-500">
                            AIRBUS({itinerary.segments[0].aircraft.code})
                          </p>
                          <p className="text-slate-500">
                            {
                              flight.travelerPricings[0].fareDetailsBySegment[0]
                                .cabin
                            }
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" text-xl font-bold">
                          {getAirportByIATA(
                            itinerary.segments[itinerary.segments.length - 1]
                              .arrival.iataCode
                          )}{" "}
                          (
                          {
                            itinerary.segments[itinerary.segments.length - 1]
                              .arrival.iataCode
                          }
                          )
                        </p>
                        <p className=" text-slate-500">
                          {getCityCountryByIATA(
                            itinerary.segments[0].departure.iataCode
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* bottom */}
                <div className=" border-slate-400 p-5 border rounded-xl flex flex-col gap-3">
                  <p>Baggage Allowance</p>
                  <p className=" font-bold">Adult</p>
                  <div className=" flex  flex-col gap-3">
                    <div className=" flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-lightGreen flex items-center justify-center">
                        <TiTick color="green" />
                      </div>
                      <div className=" flex flex-col">
                        <p className=" leading-3">Cabin Baggage</p>
                        <p className=" text-slate-400 text-sm">
                          7 kg / 1 piece
                        </p>
                      </div>
                    </div>
                    <div className=" flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-lightGreen flex items-center justify-center">
                        <TiTick color="green" />
                      </div>
                      <div className=" flex flex-col">
                        <p className=" leading-3">Checked Baggage</p>
                        <p className="text-slate-400 text-sm">
                          {
                            flight.travelerPricings[0].fareDetailsBySegment[0]
                              .includedCheckedBags.weight
                          }{" "}
                          {flight?.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weightUnit?.toLowerCase()}{" "}
                          / 1 piece
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
