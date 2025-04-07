'use client';

import { useEffect, useState } from "react";
import BestOffer from "../components/website/home/best-offer";
import HeroSection from "../components/website/home/hero-section";
import TopHotels from "../components/website/home/top-hotels";
import TopDeals from "../components/website/home/top-deals";
import Footer from "../components/website/home/Footer";
import TopFlights from "../components/website/home/popular-fligts";
import MobileAppSection from "../components/website/home/mobile-app-section";
import Navbar from "../components/shared/navbar";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import HotelSearch from "../components/website/hotel-search/test-hotel";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function Home() {
  const t = useTranslations('HomePage');
  // for handle errors from translation files 
  const e = useTranslations('errors');

  const [searchedAirports, setSearchedAirports] = useState([])
  const [loading, setLoading] = useState(false)
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [fromError, setFromError] = useState<string | null>(null);
  const [toError, setToError] = useState<string | null>(null);
  const [flightFormData, setFlightFormData] = useState({
    from: "",
    to: "",
    departure: new Date(),
    return: new Date(),
    travelers: "",
    class: "",
    flightType: "round-trip",
  });
  const [hotelFormData, setHotelFormData] = useState({
    address: "",
    checkIn: "",
    checkOut: "",
    travelers: "",
  });

  // console.log("flight", flightFormData)
  const GetAirpports = async (keyword: string) => {
    try {
      setLoading(true)
      const data = await axios.get(`/api/airports?keyword=${keyword}`);
      console.log("airports", data.data)
      setSearchedAirports(data.data);

    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }



  const router = useRouter()
  const handleFlightChange = (name: string, value: any) => {
    setFlightFormData((prevData) => {
      let updatedData = { ...prevData, [name]: value };

      // Handle the case where "return" is being updated
      if (name === "return") {
        updatedData = {
          ...updatedData,
          flightType: "round-trip", // Always set flight type to round-trip when return date is selected
        };

        // If return date is set and it's earlier than the departure date, clear it
        if (updatedData.departure && new Date(updatedData.return) <= new Date(updatedData.departure)) {
          //@ts-ignore
          updatedData.return = null; // Reset return date
        }
      }

      return updatedData;
    });

    // Clear any specific error messages based on the field
    if (name === "from") setFromError(null);
    if (name === "to") setToError(null);
  };


  const handleHotelChange = (name: string, value: any) => {
    setHotelFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFlightSubmit = () => {
    setLoading(true);
    const { from, to, departure, return: returnDate, class: flightClass } = flightFormData;

    // Validation: Check if 'from' and 'to' fields are filled
    let hasError = false;
    if (!from) {
      setFromError(e('fromError'));
      hasError = true;
    }
    if (!to) {
      setToError(e('toError'));
      hasError = true;
    }
    if (hasError) {
      setLoading(false);
      return;
    }

    router.push(
      `/en/flight-search?origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&departureDate=${encodeURIComponent(departure.toISOString())}${returnDate ? `&returnDate=${encodeURIComponent(returnDate.toISOString())}` : ''}&class=${encodeURIComponent(flightClass)}&adult=${adults}&child=${children}&lapinfant=${infants}`
    );

    setLoading(false);
  };

  // Handle hotel form submission
  const handleHotelSubmit = () => {
    const { address, checkIn, checkOut, travelers } = hotelFormData;

    if (!address || !checkIn || !checkOut || !travelers) {
      alert(e('requiredFields'));
      return;
    }

    // console.log("Hotel Form Data Submitted:", hotelFormData);

    router.push(
      `/hotel-search?address=${encodeURIComponent("DEL")}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&travelers=${encodeURIComponent(travelers)}`
    );
  };
  const cityOptions = [
    { label: "Mumbai", value: "Mumbai" },
    { label: "Riyadh", value: "Riyadh" },
    { label: "New York", value: "New York" },
  ];

  const travelerOptions = [
    { label: "1 Traveler", value: "1" },
    { label: "2 Travelers", value: "2" },
    { label: "3 Travelers", value: "3" },
  ];

  return (
    <div>
      <Toaster />
      <div className="sticky top-0 left-0 z-50">
        <Navbar />
      </div>
      <HeroSection
        t={t}
        flightFormData={flightFormData}
        GetAirpports={GetAirpports}
        searchedAirports={searchedAirports}
        hotelFormData={hotelFormData}
        loading={loading}
        handleFlightChange={handleFlightChange}
        cityOptions={cityOptions}
        travelerOptions={travelerOptions}
        handleFlightSubmit={handleFlightSubmit}
        handleHotelChange={handleHotelChange}
        handleHotelSubmit={handleHotelSubmit}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        infants={infants}
        setInfants={setInfants}
        fromError={fromError}
        toError={toError}
      />
      {/* <HotelSearch/> */}
      <BestOffer t={t}/>
      <TopHotels t={t}/>
      <TopDeals t={t}/>
      <TopFlights t={t}/>
      <MobileAppSection t={t}/>
      <Footer />
    </div>
  );
}
