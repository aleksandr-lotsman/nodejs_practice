"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var phService = __importStar(require("../services/public-holidays.service"));
(0, node_test_1.describe)('Get list of public holidays', function () {
    test('should return array of public holidays', function () { return __awaiter(void 0, void 0, void 0, function () {
        var returnedHolidays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phService.getListOfPublicHolidays(new Date().getFullYear(), "GB")];
                case 1:
                    returnedHolidays = _a.sent();
                    expect(Array.isArray(returnedHolidays)).toBeTruthy();
                    expect(returnedHolidays.length).toBeGreaterThan(0);
                    expect(returnedHolidays.every(function (holiday) { return typeof holiday === 'object'; })).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
// describe('Check if today is public holiday', () => {
//     test('should be truthy if holiday today', async () => {
//         jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
//         const isHolidayToday = await phService.checkIfTodayIsPublicHoliday('GB');
//
//         expect(isHolidayToday).toBeTruthy();
//     });
//
//     test('should return false on error', async () => {
//         jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Failed to fetch data')));
//
//         const isHolidayToday = await phService.checkIfTodayIsPublicHoliday('GB');
//
//         expect(isHolidayToday).toBeFalsy();
//     })
//
//     afterEach(() => {
//         jest.clearAllMocks()
//     })
// })
//
// describe('Check getting next public holiday', () => {
//     test('should return array of public holidays', async () => {
//         jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [HOLIDAY] }));
//         const returnedHolidays = await phService.getListOfPublicHolidays(2024, "GB");
//
//         expect(returnedHolidays).toEqual([SHORT_HOLIDAY]);
//     });
//
//     test('should return an empty array on error', async () => {
//         jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Failed to fetch data')));
//
//         const returnedHolidays = await phService.getListOfPublicHolidays(2024, "GB");
//
//         expect(returnedHolidays).toEqual([]);
//     })
//
//     afterEach(() => {
//         jest.clearAllMocks()
//     })
// })
