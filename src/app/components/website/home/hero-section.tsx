import React, { useEffect, useState } from "react";
import CustomSelect from "../../shared/customSelect";
import { AiroplanIcon, ArrowCircleIcon, BedIcon } from "@/app/svg";
import { LuSearch } from "react-icons/lu";
import Section from "../../shared/section";
import CustomInput from "../../shared/CustomInput";
import CustomInputSelect from "../../shared/CustomInputSelect";
import AirportSearchField from "../../shared/airport-search-field";

import fromImg from "/public/assets/from.png";
import toImg from "/public/assets/to.png";
import Travelers from "../../shared/traveller-field";
import CustomDatePicker from "../../shared/custom-date-picker";
import { LoaderPinwheel, Search } from "lucide-react";
import RoomSelection from "../../shared/room-selection";
import HotelSearch from "./components/hotel-search-form";
type HeroSectionProps = {
  flightFormData: {
    from: string;
    to: string;
    departure: Date;
    return: Date;
    travelers: string;
    class: string;
    flightType: string;
  };
  t: (key: string) => string;
  hotelFormData: {
    address: string;
    checkIn: string;
    checkOut: string;
    travelers: string;
  };
  loading: boolean;
  searchedAirports: any,
  fromError: any,
  toError: any,
  handleFlightChange: (name: string, value: any) => void;
  handleHotelChange: (name: string, value: any) => void;
  cityOptions: { label: string; value: string }[];
  travelerOptions: { label: string; value: string }[];
  handleFlightSubmit: () => void;
  handleHotelSubmit: () => void;
  GetAirpports: (keyword: string) => Promise<void>;
  adults: number;
  setAdults: (count: number) => void;
  children: number;
  setChildren: (count: number) => void;
  infants: number;
  setInfants: (count: number) => void;

};
interface Room {
  id: number;
  adults: number;
  children: number;
}
const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  flightFormData,
  hotelFormData,
  handleFlightChange,
  handleHotelChange,
  cityOptions,
  travelerOptions,
  handleFlightSubmit,
  handleHotelSubmit,
  GetAirpports,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  searchedAirports,
  loading,
  fromError,
  toError
}) => {
  const [isHotel, setIsHotel] = useState(false); // State to control flex row reverse
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [searchTermTo, setSearchTermTo] = useState("");
    const [rooms, setRooms] = useState<Room[]>([{ id: 1, adults: 1, children: 0 }]);
// console.log(rooms)
  // Function to toggle row-reverse
  const toggleHotlFlight = () => {
    setIsHotel(!isHotel);
  };

  const flightClassOptions = [
    { label: "Economy", value: "ECONOMY" },
    { label: "Premium Economy", value: "PREMIUM_ECONOMY" },
    { label: "Business", value: "BUSINESS" },
    { label: "First Class", value: "FIRST" },
  ];

  useEffect(() => {

    if (searchTermFrom) {
      GetAirpports(searchTermFrom)
    }
    else if (searchTermTo) {
      GetAirpports(searchTermTo)
    }

  }, [searchTermFrom, searchTermTo])

  return (
    <div className="w-full bg-heroBanner min-h-screen 2xl:min-h-auto py-20 lg:py-32 items-center bg-bottom bg-no-repeat bg-cover">
      <Section>
        <div className="gap-8 flex xl:flex-row flex-col ju items-center">
          <div className="xl:w-1/2 w-full text-white flex flex-col gap-6">
            <h1 className="font-cairo font-bold lg:text-7xl text-5xl">
              {t('heroSection.mainHeading')}

            </h1>
            <p className="font-montserrat font-bold text-lg">
              {t('heroSection.subHeading')}
            </p>
          </div>

          <div className="relative bg-white rounded-2xl py-10 lg:py-0 bg-top-right lg:h-full px-5 h-auto bg-no-repeat lg:w-1/2 w-full bg-contain">
            {/* Section to toggle row reverse */}
            <div
              className={`flex justify-between gap-4 w-full py-2 ${isHotel ? "flex-row-reverse" : ""
                }`}
            >
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-2">
                  {isHotel ? (
                    <BedIcon color={"#000"} />
                  ) : (
                    <AiroplanIcon color={"#121212"} />
                  )}
                  <h1 className="text-2xl font-[400]">
                    {isHotel ? t('heroSection.searchForm.formTypeHotels') : t('heroSection.searchForm.formTypeFlights')}
                  </h1>
                </div>
                <div className="cursor-pointer" onClick={toggleHotlFlight}>
                  <ArrowCircleIcon />
                </div>
              </div>

              <button
                className="py-4 px-5 md:text-xl text-base font-semibold rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                onClick={toggleHotlFlight}
              >
                
                {isHotel ? <AiroplanIcon color={"#fff"} /> : <BedIcon color={"#fff"} />}
                {isHotel ? t('heroSection.searchForm.formTypeFlights') : t('heroSection.searchForm.formTypeHotels')}
                </button>
            </div>

            {!isHotel ? (
              // Flight form
              <div className="pb-5" >

                {/* Flight type and form fields */}
                {/* Flight type and form fields */}
                <div className="flex items-center flex-wrap lg:gap-7 gap-4 py-3 lg:py-3 px-6">
                  {["round-trip", "one-way", "multi-city"].map((type) => (
                    <div className="flex items-center gap-2" key={type}>
                      <input
                        type="radio"
                        name="flightType"
                        value={type}  // Use 'type' here for each radio button value
                        className="h-[17px] w-[17px] custom-input-color"
                        checked={flightFormData.flightType === type}  // Keep the checked logic the same
                        onChange={() => handleFlightChange("flightType", type)}  // Handle change as before
                      />
                      <p>{type.replace("-", " ")}</p>  {/* Use 'type' to display the flight type label */}
                    </div>
                  ))}
                </div>


                {/* Form fields */}
                <div className="border-t border-bordered gap-4 py-4 mt-2 grid lg:grid-cols-2 px-4">

                  <AirportSearchField error={fromError} label={t('heroSection.searchForm.fromFieldLabel')} placeholder={t('heroSection.searchForm.fromFieldLabel')} className="border-b py-2 !border-borderColor" onSelect={(value) => handleFlightChange("from", value)} icon={fromImg} />
                  <AirportSearchField error={toError}   label={t('heroSection.searchForm.toFieldLabel')} placeholder={t('heroSection.searchForm.toFieldLabel')} className="border-b py-2 !border-borderColor" onSelect={(value) => handleFlightChange("to", value)} icon={toImg} filterItem={flightFormData.from} />


                  <CustomDatePicker
                    label={t('heroSection.searchForm.DatePicker')}
                    placeholder={t('heroSection.searchForm.DatePicker')}
                    value={flightFormData.departure ? new Date(flightFormData.departure) : null} // Ensure value is Date
                    className="border-b py-2 border-bordered"
                    minDate={new Date()} // Current date as min (Date object)
                    onChange={(date: Date | null) => {
                      handleFlightChange("departure", date);

                      // Ensure return date is updated if it's less than departure date
                      if (date && flightFormData.return && new Date(flightFormData.return) <= date) {
                        handleFlightChange("return", null); // Clear return date
                      }
                    }}
                  />



                  {flightFormData.flightType !== "one-way" &&
                    <CustomDatePicker
                      label={t('heroSection.searchForm.returnDate')}
                      placeholder={t('heroSection.searchForm.returnDate')}
                      className="border-b py-2 border-bordered"
                      value={flightFormData.return ? new Date(flightFormData.return) : null} // Ensure value is Date
                      minDate={flightFormData.departure ? new Date(flightFormData.departure) : undefined} // Min date for return based on departure
                      onChange={(date: Date | null) => handleFlightChange("return", date)} // Handle Date object
                    />}
                  <Travelers
                    label={t('heroSection.searchForm.travelersLabel')}
                    adults={adults}
                    setAdults={setAdults}
                    children={children}
                    setChildren={setChildren}
                    infants={infants}
                    setInfants={setInfants}
                  />

                  <CustomSelect
                    options={flightClassOptions}
                    placeholder={t('heroSection.searchForm.classLabel')}
                    label={t('heroSection.searchForm.classLabel')}
                    name="class"
                    value={flightFormData.class}
                    onChange={(value) => handleFlightChange("class", value)}
                  />

                </div>
                <button
                  disabled={loading}
                  onClick={handleFlightSubmit}
                  className="py-3 px-5 w-full md:text-xl mt-2 justify-center text-base rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                >
                  {loading ? (
                    <>
                      <LoaderPinwheel /> {t('heroSection.searchForm.searchButtonLoading')}
                    </>
                  ) : (
                    <>
                      <LuSearch /> {t('heroSection.searchForm.searchButton')}
                    </>
                  )}
                </button>
              </div>
            ) : (
              // Hotel form
              <div  >
                  <HotelSearch/>
                {/* <div className="border-t border-bordered gap-4 py-4 mt-2 grid lg:grid-cols-2 px-4">
                  <div className="col-span-2">
                    <CustomSelect
                      options={cityOptions}
                      placeholder="City, Property name or Locations"
                      label="City, Property name or Locations"
                      name="address"
                      value={hotelFormData.address}
                      onChange={(value) => handleHotelChange("address", value)}
                    />
                  </div>



                  <div className="flex flex-col gap-4">
                    <label htmlFor="">Check-In</label>
                    <input type="date"
                      placeholder="Check-In "
                      name="checkIn"
                      value={hotelFormData.checkIn}
                      min={new Date().toISOString().split("T")[0]} // Current date as min
                      onChange={(e) => {
                        const value = e.target.value;
                        handleHotelChange("checkIn", value);

                        if (new Date(hotelFormData.checkOut) <= new Date(value)) {
                          handleHotelChange("checkOut", ""); // Clear check-out
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="">Check-Out </label>
                    <input type="date"

                      placeholder="Return Date"

                      name="checkOut"
                      value={hotelFormData.checkOut}
                      min={hotelFormData.checkIn || new Date().toISOString().split("T")[0]} // Use check-in as min if set
                      onChange={(e) => handleHotelChange("checkOut", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                  
                      <RoomSelection rooms={rooms} setRooms={setRooms}/>

                  </div>

                  <button
                    onClick={handleHotelSubmit}
                    className="py-4 px-5 w-full md:text-xl mt-2 justify-center text-base rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                  >
                    <LuSearch />
                    Search
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HeroSection;
