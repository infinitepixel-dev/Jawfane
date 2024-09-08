// USPSApi.jsx

/*
A component that fetches the shipping rate from the USPS API using the access token.
*/

//INFO React Libraries
import { useState, useEffect, useRef } from "react";

//INFO Animation Libraries
import { gsap } from "gsap";

//INFO API Libraries
import axios from "axios";

//INFO XML Libraries
import { XMLBuilder, XMLParser } from "fast-xml-parser";

const USPSRate = () => {
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);
  const [access_token, setAccess_token] = useState(null);

  //reference to the shipping rate
  const shippingRef = useRef(null);

  //Function to get the access token from the USPS API
  const getAccessToken = async () => {
    const clientID = "LFip7DQALXd2DsHt1SkeEs7rxgR9l888";
    const clientSecret = "bHLAHgX1CKwAE9Dw";
    const tokenUrl = "https://api.usps.com/oauth2/v3/token";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    try {
      const response = await axios.post(tokenUrl, params, {
        auth: {
          username: clientID,
          password: clientSecret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw new Error("Unable to fetch access token");
    }
  };

  //Fetch access token when component is mounted
  useEffect(() => {
    getAccessToken().then((token) => {
      setAccess_token(token);
    });
  }, []);

  //Run GSAP animation after the component has been mounted
  useEffect(() => {
    if (shippingRef.current) {
      // Perform GSAP animation only if the element is available
      gsap.to(shippingRef.current, { x: 100, duration: 1 });
    } else {
      console.error("GSAP target not found.");
    }
  }, []); // Only run once after mounting

  //Function to get shipping rate from USPS API
  const getShippingRate = async () => {
    try {
      const apiUrl = "https://stg-secure.shippingapis.com/ShippingAPI.dll";
      const userID = "your_user_id"; // Replace with the correct USPS USERID

      const builder = new XMLBuilder();
      const requestBody = {
        RateV4Request: {
          "@_USERID": userID,
          Revision: "2",
          Package: {
            "@_ID": "1ST",
            Service: "GROUND ADVANTAGE",
            ZipOrigination: "30677",
            ZipDestination: "46750",
            Pounds: "0",
            Ounces: "10",
            Container: "VARIABLE",
            Width: "",
            Length: "",
            Height: "",
            ShipDate: "2023-08-08",
          },
        },
      };

      const xmlData = builder.build(requestBody);

      const response = await axios.get(apiUrl, {
        params: {
          API: "RateV4",
          XML: xmlData,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const parser = new XMLParser();
      const result = parser.parse(response.data);

      if (result.Error) {
        setError(`USPS API Error: ${result.Error.Description}`);
        return;
      }

      const shippingRate = result.RateV4Response.Package.Postage.Rate;
      setRate(shippingRate);
    } catch (err) {
      console.error("Error:", err);
      setError("Error fetching shipping rate");
    }
  };

  return (
    <>
      <button
        ref={shippingRef}
        className="px-4 py-2 mr-4 text-black font-bold transition bg-yellow-600 rounded-lg shadow hover:bg-yellow-500"
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
