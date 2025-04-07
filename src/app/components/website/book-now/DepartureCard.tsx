import React from 'react';
import jazeeraLogo from '@/../public/assets/images/jazeeraLogo.png'
import Image from 'next/image';
import { BaggageIcon } from '@/app/svg';
import { calculateDurationSimple, calculateTotalDurationShortNew, getAirportByIATA } from '@/utils/airports-helper';


const FlightCard = ({flightData}:any) => {

    function getNumberOfStops(itinerary: any) {
        // Total number of stops is the sum of stops from each segment
        const stopCount = itinerary.segments.reduce((totalStops: number, segment: any) => {
            return totalStops + segment.numberOfStops;
        }, 0);

        if (stopCount === 0) {
            return 'Direct';
        } else {
            return `${stopCount} ${stopCount === 1 ? 'Stop' : 'Stops'}`;
        }
    }

      function getStopDetails(itinerary: any) {
            // Filter out segments with no stops
            const stops = itinerary.segments.flatMap((segment: any) => segment.stops || []);
    
            if (stops.length === 0) return <div className="p-2  whitespace-nowrap"><p>Flight has no stop</p></div>
    
            return stops.map((stop: any, index: number) => (
                <div key={index} className="p-2 whitespace-nowrap">
                    <p><strong>Stop {index + 1}</strong></p>
                    <p>Arrival: {new Date(stop.arrivalAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                    <p>Airport: {getAirportByIATA(stop.iataCode)}</p>
                    <p>Duration: {calculateDurationSimple(stop?.duration)}</p>
                    <p>Departure: {new Date(stop.departureAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                </div>
            ));
        }
    console.log("F",flightData)

    return (
        <>
        {flightData?.itineraries?.map((itinerary: any, index: number) => (
        <div className="bg-white p-4 border rounded-xl shadow-md  border-bordered">
            <div className="flex justify-between gap-2 w-full flex-wrap items-center">
                <h2 className="text-xl font-semibold">Departure</h2>
                    <p className="text-grayDark text-sm">{(itinerary.segments[0].departure.at)?.split('T')[0]}</p>
                    <p className="">Flight Details</p>
            </div>

            <div className="mt-4 gap-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Image src={jazeeraLogo} alt="Jazeera Airways" className="" />
                </div>

                <div className='flex flex-col gap-2  items-start w-full'>
                    <div className='flex pb-1 items-center w-full justify-between border-b-2 border-dashed border-grayDark'>
                        <p className="text-sm font-semibold">{new Date(itinerary.segments[0].departure.at).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}</p>
                        <div>
                        <p>{getNumberOfStops(itinerary)}</p>

                            {getStopDetails(itinerary) && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 p-2 bg-[#333030] text-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    {getStopDetails(itinerary)}
                                </div>
                            )}
                        </div>
                        <p className="text-sm font-semibold">{new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })}</p>
                    </div>
                    <div className='flex items-center w-full text-grayDark justify-between '>
                        <p className="text-xs ">{itinerary.segments[0].departure.iataCode}</p>
                        <p className="text-xs ">{calculateTotalDurationShortNew(itinerary.segments)}</p>
                        <p className="text-xs ">{itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}</p>
                    </div>
                </div>

            </div>

            <div className="bg-secondary text-white mt-6 p-2 rounded-lg flex justify-between items-center">
                <p className="text-sm">{getAirportByIATA(itinerary.segments[itinerary.segments.length - 1].arrival.iataCode)}</p>
                <div className="flex items-center space-x-2">
                    <BaggageIcon />
                    <p className='text-sm'>Baggage Included</p>
                </div>
            </div>
        </div>
        
        ))
    }
        </>
    );
};

export default FlightCard;
