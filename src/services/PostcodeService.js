import { BASE_URL } from "../configs";

const CONNECTION_ERROR = "Problem connecting to external service";

const fetchPostcodeData = async (postcode) => {
  try {
    const response = await fetch(`${BASE_URL}/${postcode}`);
    if (!response.ok) {
      throw new Error(CONNECTION_ERROR);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching postcode data:", error);
    throw error;
  }
};

const validatePostcode = async (postcode) => {
  try {
    const response = await fetch(`${BASE_URL}/${postcode}/validate`);
    if (!response.ok) {
      throw new Error(CONNECTION_ERROR);
    }
    return await response.json();
  } catch (error) {
    console.error("Error validating postcode:", error);
    throw error;
  }
};

export { fetchPostcodeData, validatePostcode };
