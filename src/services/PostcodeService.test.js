import { fetchPostcodeData, validatePostcode } from "./PostcodeService";
import { BASE_URL } from "../configs";

global.fetch = jest.fn();

describe("fetchPostcodeData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch postcode data successfully", async () => {
    const mockResponse = { data: "mock postcode data" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const postcode = "SW1A 1AA";
    const data = await fetchPostcodeData(postcode);
    expect(data).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${postcode}`);
  });

  it("should throw an error when connection fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const postcode = "SW1A 1AA";
    await expect(fetchPostcodeData(postcode)).rejects.toThrow(
      "Problem connecting to external service"
    );

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${postcode}`);
  });
});

describe("validatePostcode", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate postcode successfully", async () => {
    const mockResponse = { valid: true };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const postcode = "SW1A 1AA";
    const data = await validatePostcode(postcode);
    expect(data).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${postcode}/validate`);
  });

  it("should throw an error when connection fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const postcode = "SW1A 1AA";
    await expect(validatePostcode(postcode)).rejects.toThrow(
      "Problem connecting to external service"
    );

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/${postcode}/validate`);
  });
});
