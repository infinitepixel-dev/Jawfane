// USPSApi.jsx

//INFO React Libraries
import { useState, useEffect, useRef } from "react";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO API Libraries
import axios from "axios";

const USPSRate = () => {
  const apiUrl = "https://vps.infinitepixel.dev:3050";

  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const shippingRef = useRef(null);

  //TODO figure out shipping methods for USPS
  /* method 1: "Priority Mail Nonmachinable Dimensional Rectangular"
    const requestBody = {
    originZIPCode: "90210",
    destinationZIPCode: "37087",
    weight: 5,
    length: 1,
    width: 1,
    height: 1,
    mailClass: "PRIORITY_MAIL",
    processingCategory: "NON_MACHINABLE",
    rateIndicator: "DR",
    destinationEntryFacilityType: "NONE",
    priceType: "RETAIL",
    mailingDate: "2024-09-22",
  };

  Method 2: "Priority Mail Machinable Dimensional Rectangular"
    const requestBody = {
    originZIPCode: "90210",
    destinationZIPCode: "37087",
    weight: 1, // Flat rate does not depend on weight as long as it's within the weight limit
    length: 12.5, // Dimensions for the envelope
    width: 9.5,
    height: 0.75,
    mailClass: "PRIORITY_MAIL",
    processingCategory: "MACHINABLE", // Flat Rate envelopes are typically machinable
    rateIndicator: "DR", // Flat Rate Envelope
    destinationEntryFacilityType: "NONE",
    priceType: "RETAIL",
    mailingDate: "2024-09-22",
  };

  Method 3: "Priority Mail Express Machinable Single-piece"
  const requestBody = {
    originZIPCode: "90210",
    destinationZIPCode: "37087",
    weight: 2.5,
    length: 10,
    width: 8,
    height: 5,
    mailClass: "PRIORITY_MAIL_EXPRESS",
    processingCategory: "MACHINABLE",
    rateIndicator: "PA", // Priority Mail Express Single Piece
    destinationEntryFacilityType: "NONE",
    priceType: "RETAIL",
    mailingDate: "2024-09-22",
  };

  METHOD 4: "USPS Ground Advantage Machinable Dimensional Rectangular"
    const requestBody = {
    originZIPCode: "90210",
    destinationZIPCode: "37087",
    weight: 0.8, // Weight must be less than or equal to 15.999 oz for First-Class Package
    length: 9,
    width: 6,
    height: 0.5,
    mailClass: "FIRST-CLASS_PACKAGE_SERVICE",
    processingCategory: "MACHINABLE",
    rateIndicator: "DR", // First-Class Package Retail
    destinationEntryFacilityType: "NONE",
    priceType: "RETAIL",
    mailingDate: "2024-09-22",
  };

  METHOD 5: "Priority Mail Express Machinable Dimensional Rectangular"
    const requestBody = {
    originZIPCode: "90210",
    destinationZIPCode: "37087",
    weight: 1, // Flat rate envelope, weight does not affect price
    length: 12.5, // Approximate dimensions for a flat rate envelope
    width: 9.5,
    height: 0.75,
    mailClass: "PRIORITY_MAIL_EXPRESS",
    processingCategory: "MACHINABLE",
    rateIndicator: "DR", // Priority Mail Express Flat Rate Envelope
    destinationEntryFacilityType: "NONE",
    priceType: "RETAIL",
    mailingDate: "2024-09-22",
  };
  */

  // Updated request body structure with correct enum values
  const requestBody = {
    originZIPCode: "90210",
    destinationZIPCode: "37087",
    weight: 1, // Flat rate envelope, weight does not affect price
    length: 12.5, // Approximate dimensions for a flat rate envelope
    width: 9.5,
    height: 0.75,
    mailClass: "PRIORITY_MAIL_EXPRESS",
    processingCategory: "MACHINABLE",
    rateIndicator: "DR", // Priority Mail Express Flat Rate Envelope
    destinationEntryFacilityType: "NONE",
    priceType: "RETAIL",
    // mailingDate: "2024-09-22",
  };

  const getAccessToken = async () => {
    try {
      // Call your backend to get the access token
      const response = await axios.post(`${apiUrl}/api/usps/token`);
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw new Error("Unable to fetch access token");
    }
  };

  useEffect(() => {
    getAccessToken().then((token) => {
      setAccessToken(token);
    });

    // setAccessToken(
    //   "eyJraWQiOiJIdWpzX2F6UnFJUzBpSE5YNEZIRk96eUwwdjE4RXJMdjNyZDBoalpNUnJFIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0MjAxMjY1NTUiLCJjcmlkIjoiNDg0ODUxMjMiLCJzdWJfaWQiOiI0MjAxMjY1NTUiLCJwYXltZW50X2FjY291bnRzIjoie30iLCJpc3MiOiJodHRwczpcL1wva2V5Yy51c3BzLmNvbVwvcmVhbG1zXC9VU1BTIiwiY29udHJhY3RzIjoie1wicGF5bWVudEFjY291bnRzXCI6e30sXCJwZXJtaXRzXCI6e1wicGVybWl0c1wiOlwiXCJ9fSIsImZhc3QiOiI0ODQ4NTEyMyIsImF6cCI6IkxGaXA3RFFBTFhkMkRzSHQxU2tlRXM3cnhnUjlsODg4IiwibWFpbF9vd25lcnMiOiJbe1wiY3JpZFwiOlwiNDg0ODUxMjNcIixcIm1pZHNcIjpcIjkwMzcxMzQ2MCwgOTAzNzEzNDU5XCJ9XSIsInNjb3BlIjoiYWRkcmVzc2VzIGludGVybmF0aW9uYWwtcHJpY2VzIHNlcnZpY2Utc3RhbmRhcmRzIGxvY2F0aW9ucyBwcmljZXMgc2hpcG1lbnRzIiwiY29tcGFueV9uYW1lIjoiSW5maW5pdGUgUGl4ZWwiLCJvcmdhbml6YXRpb25faWQiOiI0MjgwIiwiZXhwIjoxNzI2NDkyMzY4LCJpYXQiOjE3MjY0NjM1NjgsImp0aSI6ImYwYTUxYjQ0LWJiOTEtNDA4MC04YWQyLWQzMjQxN2ZlYmJiNyJ9.tzG-v3VW6wSdPr07eClRYAAJnctJcti6VgsnBdXgFBPExik4G747m6SJHikmlyGw0VfLQ75RR9pW_fohmP46LsbR6zuWbf1DgoGRSRO13jZ9fK7ENi2oZ98POTZll6w5Sj1GVlBT3DbRnocQgD3am_ujEN1qF3eiYsRQnZ4JQoYMHtssU8U8fn-Ukb8Xe6qhtrCQ4t7tdJOnExUCrcGI3wg1eClf53IratTFqomyv0N0aslOgHoWUyFU_blUV-8DDCPqXExM1833KofqZowsyLdbXgEFYFabpbJebbKCQqCAGnPZ3MUexVKy5LWKCGCEcOHJSc05pjYB8QhLkqZkzg"
    // );
  }, []);

  useEffect(() => {
    if (shippingRef.current) {
      gsap.to(shippingRef.current, { x: 100, duration: 1 });
    } else {
      console.error("GSAP target not found.");
    }
  }, []);

  const getShippingRate = async () => {
    console.log("Getting Shipping Rate...");

    try {
      const response = await axios.post(`${apiUrl}/api/usps/rate`, {
        requestBody,
        accessToken,
      });

      const data = response.data;
      console.log("USPS Shipping Rate Response:", data);

      setRate(data.totalBasePrice); // Adjust based on the actual response structure
    } catch (err) {
      console.error("Error fetching shipping rate:", err);
      setError("Error fetching shipping rate");
    }
  };

  // console.log("Access Token:", accessToken);

  return (
    <>
      <button
        ref={shippingRef}
        className="px-4 py-2 mr-4 font-bold text-black transition bg-yellow-600 rounded-lg shadow hover:bg-yellow-500"
        onClick={getShippingRate}
      >
        Get Shipping Rate
      </button>
      {rate && <p>Shipping Rate: ${rate}</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default USPSRate;
