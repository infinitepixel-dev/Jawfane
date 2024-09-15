import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { XMLBuilder, XMLParser } from "fast-xml-parser";

const USPSRate = () => {
  const apiUrl = "https://vps.infinitepixel.dev:3050";

  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);
  //REVIEW will need this for production
  // eslint-disable-next-line no-unused-vars
  const [access_token, setAccess_token] = useState(null);

  const shippingRef = useRef(null);

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
  });
  const parser = new XMLParser({
    ignoreAttributes: false,
  });

  const requestBody = {
    RateV4Request: {
      "@_USERID": "LFip7DQALXd2DsHt1SkeEs7rxgR9l888", // Replace this with the correct sandbox User ID
      Revision: "2",
      Package: {
        "@_ID": "1",
        Service: "PRIORITY",
        ZipOrigination: "90210",
        ZipDestination: "30301",
        Pounds: "1",
        Ounces: "8",
        Container: "VARIABLE",
        Size: "REGULAR",
        Machinable: "true",
      },
    },
  };

  const getAccessToken = async () => {
    try {
      // Call your backend to get the access token
      const response = await axios.post(`${apiUrl}/api/usps/token`);
      // Store the access token
      // console.log("Access token response:", response.data);
      console.log("Response:", response);

      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw new Error("Unable to fetch access token");
    }
  };

  useEffect(() => {
    getAccessToken().then((token) => {
      // console.log("Access token:", token);
      setAccess_token(token);
    });
  }, []);

  useEffect(() => {
    if (shippingRef.current) {
      gsap.to(shippingRef.current, { x: 100, duration: 1 });
    } else {
      console.error("GSAP target not found.");
    }
  }, []);

  const getShippingRate = async () => {
    try {
      const xmlData = builder.build(requestBody);

      // Log the XML data being sent to USPS
      console.log("Requesting shipping rate with XML:", xmlData);

      const response = await axios.post(`${apiUrl}/api/usps/rate`, {
        xmlData, // Send only xmlData, no accessToken needed
      });

      const result = parser.parse(response.data);

      if (result.Error) {
        setError(`USPS API Error: ${result.Error.Description}`);
        return;
      }

      const shippingRate = result.RateV4Response.Package.Postage.Rate;
      setRate(shippingRate);
    } catch (err) {
      console.error(
        "Error fetching shipping rate:",
        err.response ? err.response.data : err.message
      );
      setError("Error fetching shipping rate");
    }
  };

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
