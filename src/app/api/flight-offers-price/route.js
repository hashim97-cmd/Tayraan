import axios from 'axios';
import { getAmadeusToken } from '../../../utils/amadeus-token';

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { flightOffers } = requestBody;

        if (!flightOffers || !Array.isArray(flightOffers)) {
            return new Response(
                JSON.stringify({
                    error: 'Invalid request body. "flightOffers" must be an array.',
                }),
                { status: 400 }
            );
        }

        const accessToken = await getAmadeusToken();

        const apiUrl = `https://test.api.amadeus.com/v1/shopping/flight-offers/pricing`;

        // Make the API call
        const response = await axios.post(
            apiUrl,
            {
                data: {
                    type: 'flight-offers-pricing',
                    flightOffers: flightOffers,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const pricingData = response.data;

        return new Response(JSON.stringify(pricingData), { status: 200 });
    } catch (error) {
        console.error('Error fetching flight pricing:', error);

        const statusCode = error.response?.status || 500;
        const message = error.response?.data || { error: error.message };

        return new Response(JSON.stringify(message), { status: statusCode });
    }
}
