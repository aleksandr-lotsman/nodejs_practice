import {PUBLIC_HOLIDAYS_API_URL} from "../config";
import request from 'supertest';

const countryCode = 'GB'
const year = 2024

test('should return country info', async () => {
    const {status, body} = await request(PUBLIC_HOLIDAYS_API_URL).get(`/CountryInfo/${countryCode}`);

    expect(status).toEqual(200);
    expect(body).toEqual({
        commonName: expect.any(String),
        officialName: expect.any(String),
        countryCode: expect.any(String),
        region: expect.any(String),
        borders: expect.any(Array),
    })
});

test('should return long weekdays', async () => {
    const {status, body} = await request(PUBLIC_HOLIDAYS_API_URL).get(`/LongWeekend/${year}/${countryCode}`);

    expect(status).toEqual(200);
    expect(body.length).toBeGreaterThan(0);
});