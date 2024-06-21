import axios from 'axios';
import * as helpers from '../helpers';
import {describe} from "node:test";
import {PublicHoliday, PublicHolidayShort} from "../types";
import * as phService from "../services/public-holidays.service"


const HOLIDAY: PublicHoliday = {
    date: "2024-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"]
}

const SHORT_HOLIDAY: PublicHolidayShort = {
    name: HOLIDAY.name,
    date: HOLIDAY.date,
    localName: HOLIDAY.localName
}

beforeAll(() => {
    jest.spyOn(helpers, 'validateInput').mockImplementation(() => true);
    jest.spyOn(helpers, 'shortenPublicHoliday').mockImplementation(() => SHORT_HOLIDAY);
})

describe('Get list of public holidays', () => {
    test('should return array of public holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [HOLIDAY] }));
        const returnedHolidays = await phService.getListOfPublicHolidays(2024, "GB");

        expect(returnedHolidays).toEqual([SHORT_HOLIDAY]);
    });

    test('should return an empty array on error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Failed to fetch data')));

        const returnedHolidays = await phService.getListOfPublicHolidays(2024, "GB");

        expect(returnedHolidays).toEqual([]);
    })

    afterEach(() => {
      jest.clearAllMocks()
    })
})

describe('Check if today is public holiday', () => {
    test('should be truthy if holiday today', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
        const isHolidayToday = await phService.checkIfTodayIsPublicHoliday('GB');

        expect(isHolidayToday).toBeTruthy();
    });

    test('should return false on error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Failed to fetch data')));

        const isHolidayToday = await phService.checkIfTodayIsPublicHoliday('GB');

        expect(isHolidayToday).toBeFalsy();
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})

describe('Check getting next public holiday', () => {
    test('should return array of public holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [HOLIDAY] }));
        const returnedHolidays = await phService.getNextPublicHolidays( 'GB');

        expect(returnedHolidays).toEqual([SHORT_HOLIDAY]);
    });

    test('should return an empty array on error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Failed to fetch data')));

        const returnedHolidays = await phService.getNextPublicHolidays('GB');

        expect(returnedHolidays).toEqual([]);
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})


