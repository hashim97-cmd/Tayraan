import { searchHotels } from '@/actions/hotel-actions';
import Section from '@/app/components/shared/section';
import Hotel from '@/app/components/website/hotel-search/Hotel';
import React from 'react';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
    const { CheckIn, CheckOut, CityCode, GuestNationality } =await searchParams;

    const hotelCodes = [
        1000003, 1000004, 1000005, 1000006, 1000007, 1000008, 1000009, 1000011,
        1000012, 1000013, 1000014, 1000016, 1000018, 1000019, 1000020, 1000025,
        1000026, 1000027, 1000028, 1000029, 1000030, 1000031, 1000032, 1000037,
        1000038, 1000040, 1000041, 1000042, 1000043, 1000044, 1000045, 1000046,
        1000051, 1000052, 1000053, 1000054, 1000055, 1000056, 1000057, 1000059,
        1000060, 1000061, 1000062, 1000063, 1000064, 1000065, 1000070, 1000071,
        1000072, 1000073, 1000074, 1000075, 1000079, 1000080, 1000081, 1000082,
        1000083, 1000084, 1000085, 1000089, 1000090, 1000091, 1000092, 1000093,
        1000094, 1000096, 1000097, 1000098, 1000099, 1000108, 1000109, 1000110,
        1000111, 1000112, 1000113, 1000114, 1000115, 1000116, 1000117, 1000127,
        1000132, 1000134, 1000150, 1000158, 1000159, 1000160, 1000161, 1000162,
        1000163, 1000164, 1000165, 1000166, 1000168, 1000169, 1000170, 1000171,
        1000172, 1000174, 1000175, 1000179, 1000180, 1000181, 1000192, 1000193,
        1000197, 1000198, 1000199, 1000200, 1000201, 1000202, 1000203,
    ].join(',');

    try {
        if (!CheckIn || !CheckOut || !CityCode) {
            return (
                <p className="text-center text-gray-500">
                    Please provide valid check-in, check-out, and city details.
                </p>
            );
        }

        const params = {
            CheckIn,
            CheckOut,
            HotelCodes: hotelCodes,
            CityCode,
            GuestNationality: GuestNationality || 'US',
            PreferredCurrencyCode: 'SAR',
            PaxRooms: [{ Adults: 1, Children: 0, ChildrenAges: [] }],
            IsDetailResponse: true,
            ResponseTime: 23,
            Filters: { MealType: 'All', Refundable: 'true', NoOfRooms: 0 },
        };

        const data = await searchHotels(params);
        const hotels = data?.HotelSearchResults || [];

        if (!hotels.length) {
            return (
                <p className="text-center text-gray-500">No hotels found for the provided criteria.</p>
            );
        }

        console.log(hotels)

        return (
            <Section>
                <Hotel hotels={hotels} />
            </Section>
        );
    } catch (error) {
        console.error('Error searching hotels:', error);
        return <p className="text-center text-red-500">Failed to fetch hotels. Please try again later.</p>;
    }
}
