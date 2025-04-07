import { AvailableHotelRooms, HotelDetailAction } from '@/actions/hotel-actions';
import Section from '@/app/components/shared/section';
import HotelDetails from '@/app/components/website/hotel-details';
import React from 'react';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
    const { HotelCode, HotelBookingCode } = await searchParams;
    console.log(HotelBookingCode, HotelCode)
    if (!HotelCode) {
        return <p className="text-center text-gray-500">Invalid Hotel Code .</p>;
    }

    try {
        const data = await HotelDetailAction(HotelCode);
        const AvailableRooms = await AvailableHotelRooms(HotelBookingCode);
        const hotel = data || null;


        console.log("---", AvailableRooms)
        return (
            <Section>
                <HotelDetails hotel={hotel} AvailableRooms={AvailableRooms} />
            </Section>
        );
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        return <p className="text-center text-red-500">Failed to fetch hotel details. Please try again later.</p>;
    }
}
