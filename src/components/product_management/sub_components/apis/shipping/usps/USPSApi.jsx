import { useState, useEffect } from "react";
import axios from "axios";
import { Builder, parseStringPromise } from "xml2js";

const USPSRate = () => {
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);
  const [access_token, setAccess_token] = useState(null);

  const getAccessToken = async () => {
    const clientID = "LFip7DQALXd2DsHt1SkeEs7rxgR9l888";
    const clientSecret = "bHLAHgX1CKwAE9Dw";

    // const tokenUrl = "https://oauth.usps.com/oauth/token";
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

      return response.data.access_token; // Return the access token
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw new Error("Unable to fetch access token");
    }
  };

  useEffect(() => {
    getAccessToken().then((token) => {
      setAccess_token(token);
    });
  }, []);

  const getShippingRate = async () => {
    try {
      const apiUrl = "https://stg-secure.shippingapis.com/ShippingAPI.dll";
      const userID = "your_user_id"; // Replace with the correct USPS USERID

      const builder = new Builder();
      const requestBody = {
        RateV4Request: {
          $: { USERID: userID },
          Revision: "2",
          Package: {
            $: { ID: "1ST" },
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

      const xmlData = builder.buildObject(requestBody);

      const response = await axios.get(apiUrl, {
        params: {
          API: "RateV4",
          XML: xmlData,
        },
        headers: {
          Authorization: `Bearer ${access_token}`, // Use the OAuth 2.0 token
        },
      });

      if (response.data.includes("<Error>")) {
        const errorResult = await parseStringPromise(response.data);
        setError(`USPS API Error: ${errorResult.Error.Description[0]}`);
        return;
      }

      const result = await parseStringPromise(response.data);
      const shippingRate = result.RateV4Response.Package[0].Postage[0].Rate[0];
      setRate(shippingRate);
    } catch (err) {
      console.error("Error:", err);
      setError("Error fetching shipping rate");
    }
  };

  return (
    <>
      <button
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
