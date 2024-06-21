import {describe} from "node:test";
import {PublicHolidayShort} from "../types";
import * as phService from "../services/public-holidays.service"

describe('Get list of public holidays', () => {
    test('should return array of public holidays', async () => {
        const returnedHolidays = await phService.getListOfPublicHolidays(new Date().getFullYear(), "GB");

        expect(Array.isArray(returnedHolidays)).toBeTruthy();
        expect(returnedHolidays.length).toBeGreaterThan(0);
        expect(returnedHolidays.every((holiday: PublicHolidayShort) => typeof holiday === 'object')).toBeTruthy();
    });
})

describe('Check if today is public holiday', () => {
    test('should be truthy if holiday today', async () => {
        const returnedHolidays = await phService.getListOfPublicHolidays(new Date().getFullYear(), "GB");
        const returnedDates = extractDates(returnedHolidays);
        const formattedTodayDate = formatDate(new Date());


        const expectedResult = returnedDates.some((date: string) => date === formattedTodayDate);
        const isHolidayToday = await phService.checkIfTodayIsPublicHoliday('GB');

        expect(isHolidayToday).toEqual(expectedResult);
    });

})


describe('Check getting next public holiday', () => {
    test('should return array of public holidays', async () => {
        const currentYearHolidays = await phService.getListOfPublicHolidays(new Date().getFullYear(), 'GB');

        const nextPublicHolidays = await phService.getNextPublicHolidays('GB');
        expect(nextPublicHolidays.length).toEqual(currentYearHolidays.length);

    });

})

const extractDates = (holidays: PublicHolidayShort[]): string[] => {
    return holidays.map((holiday) => holiday.date);
};

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const mergeHolidays = (firstHolidaysArray: PublicHolidayShort[], secondHolidaysArray: PublicHolidayShort []): PublicHolidayShort[] => {
    return Array.from(new Set(firstHolidaysArray.concat(secondHolidaysArray)));
}


