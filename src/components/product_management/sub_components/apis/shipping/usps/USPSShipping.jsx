// USPSShipping.jsx

import { useState, useEffect } from "react";
import propTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
function USPSShipping({ storeId, shippingOptions, setShippingOptions }) {
  //   console.log("USPSShipping:", storeId, shippingOptions, setShippingOptions);

  const apiURL = "http://66.128.253.47:3001";

  const [credentials, setCredentials] = useState({
    service_name: "USPS",
    account_number: "",
    meter_number: "",
    access_token: "",
    api_key: "",
    api_secret: "",
    environment: "production",
    updated_at: new Date().toISOString(),
    service_enabled: false,
  });

  // Fetch USPS credentials for the store
  const fetchUSPSCredentials = async () => {
    try {
      const response = await fetch(
        `${apiURL}/api/store/${storeId}/credentials/${credentials.service_name}`
      );
      if (response.ok) {
        const data = await response.json();

        console.log("USPS credentials:", data);

        setCredentials(data);

        if (data.service_enabled) {
          setShippingOptions((prev) => ({
            ...prev,
            usps: true,
          }));
        }
      } else if (response.status === 404) {
        console.log("No existing credentials found for USPS.");
      } else {
        console.error("Error fetching USPS credentials:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching USPS credentials:", err);
    }
  };

  // Save USPS credentials
  const saveUSPSCredentials = async () => {
    try {
      await fetch(
        `${apiURL}/api/store/${storeId}/credentials/${credentials.service_name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      console.log("USPS credentials saved successfully.");
    } catch (err) {
      console.error("Error saving USPS credentials:", err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
      ["updated_at"]: new Date().toISOString(),
      service_enabled: true,
    }));
  };

  // Fetch credentials on component mount
  useEffect(() => {
    fetchUSPSCredentials();
  }, [storeId]);

  return (
    <>
      <div className="usps-shipping p-4 bg-gray-700 rounded-lg mt-4">
        <h2 className="text-xl font-semibold mb-4">
          USPS Shipping Credentials
        </h2>
        <div className="space-y-2">
          <div>
            <label className="block text-sm">Account Number</label>
            <input
              type="text"
              name="account_number"
              value={credentials.account_number ?? ""}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Meter Number</label>
            <input
              type="text"
              name="meter_number"
              value={credentials.meter_number ?? ""}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Access Token</label>
            <input
              type="text"
              name="access_token"
              value={credentials.access_token ?? ""}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">API Key</label>
            <input
              type="text"
              name="api_key"
              value={credentials.api_key ?? ""}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">API Secret</label>
            <input
              type="text"
              name="api_secret"
              value={credentials.api_secret ?? ""}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Environment</label>
            <select
              name="environment"
              value={credentials.environment ?? "production"}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            >
              <option value="production">Production</option>
              <option value="sandbox">Sandbox</option>
            </select>
          </div>
          <button
            onClick={saveUSPSCredentials}
            className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Save Credentials
          </button>
        </div>
      </div>
    </>
  );
}

USPSShipping.propTypes = {
  storeId: propTypes.number.isRequired,
  // shipping options can be an object or an array
  shippingOptions: propTypes.oneOfType([propTypes.object, propTypes.array])
    .isRequired,
  setShippingOptions: propTypes.func.isRequired,
};

export default USPSShipping;
