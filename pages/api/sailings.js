// pages/api/sailings.js

/**
 * @module api/sailings
 * @description Next.js API route to proxy requests to the CruiseBound Sailings API.
 * This helps to bypass CORS issues by making the cross-origin request from the server.
 */

/**
 * Handles GET requests to the /api/sailings endpoint.
 * @param {import('next').NextApiRequest} req - The Next.js API request object.
 * @param {import('next').NextApiResponse} res - The Next.js API response object.
 */
export default async function handler(req, res) {
  // Ensure only GET requests are allowed for this endpoint
  if (req.method !== 'GET') {
    // If the request method is not GET, return a 405 Method Not Allowed error
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Make the request to the external CruiseBound API
    const response = await fetch('https://sandbox.cruisebound-qa.com/sailings');

    // Check if the response from the external API was successful
    if (!response.ok) {
      // If not successful, log the error and return an appropriate status to the client
      console.error(`Error fetching from CruiseBound API: ${response.status} ${response.statusText}`);
      // Pass the status and status text from the external API to the client
      return res.status(response.status).json({ message: `Error from external API: ${response.statusText}` });
    }

    // Parse the JSON data from the external API response
    const data = await response.json();

    // Log the data structure for debugging purposes (server-side)
    console.log('Data structure from external API (server-side):', data);

    // Send the data back to the client that made the request to /api/sailings
    // The browser will see this as a same-origin request, thus no CORS error.
    res.status(200).json(data);

  } catch (error) {
    // Catch any network errors or other exceptions during the fetch operation
    console.error('Error in API route /api/sailings:', error);
    // Return a 500 Internal Server Error to the client
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
