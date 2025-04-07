import axios from 'axios';
import { getAmadeusToken } from '../../../utils/amadeus-token';

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { traveler, flightOffers } = requestBody;

        // Validate request body
        if (!traveler || !flightOffers || !Array.isArray(flightOffers)) {
            return new Response(
                JSON.stringify({
                    error: 'Invalid request body. "traveler" and "flightOffers" must be provided.',
                }),
                { status: 400 }
            );
        }

        const accessToken = await getAmadeusToken();

        const apiUrl = `https://test.api.amadeus.com/v1/booking/flight-orders`;

        // Make the API call
        const response = await axios.post(
            apiUrl,
            {
                data: {
                    type: 'flight-order',
                    flightOffers: flightOffers,
                    travelers: traveler,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const flightOrderData = response.data;

        return new Response(JSON.stringify(flightOrderData), { status: 200 });
    } catch (error) {
        console.error('Error creating flight order:', error);

        const statusCode = error.response?.status || 500;
        const message = error.response?.data || { error: error.message };

        return new Response(JSON.stringify(message), { status: statusCode });
    }
}
