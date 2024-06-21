import {describe} from "node:test";
import * as helpers from "./helpers";
import {PublicHoliday, PublicHolidayShort} from "./types";

type TestInput = {
    year?: number;
    country?: string;
}

const publicHoliday: PublicHoliday = {
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

const shortenPublicHoliday: PublicHolidayShort = {
    name: publicHoliday.name,
    date: publicHoliday.date,
    localName: publicHoliday.localName
}

describe('Validate input', () => {
   test('should pass validation of input', () => {
       const input: TestInput = {
           year: 2024,
           country: 'GB'
       }
       expect(helpers.validateInput(input)).toBeTruthy();
   });

    test('should throw error invalid year', () => {
        const input: TestInput = {
            year: 2,
            country: 'GB'
        }
        expect(() => helpers.validateInput(input)).toThrowError(`Year provided not the current, received: 2`);
    });

    test('should throw error invalid country', () => {
        const input: TestInput = {
            year: 2024,
            country: 'UA'
        }
        expect(() => helpers.validateInput(input)).toThrowError(`Country provided is not supported, received: UA`);
    });

    test('should return true if country and year are missing', () => {
        const input: TestInput = {
        };
        expect(helpers.validateInput(input)).toBeTruthy();
    });
});

describe('Apply shorten public holidays', () => {
    test('should return shorten public holiday', () => {
        expect(helpers.shortenPublicHoliday(publicHoliday)).toStrictEqual(shortenPublicHoliday);
    })
});