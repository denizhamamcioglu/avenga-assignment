import { faker } from "@faker-js/faker"
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

export class DataGenerator {
    public static generateRandomString(length: number, prefix: string = "") {
        return `${prefix}${faker.string.alpha(length)}`
    }

    public static generateRandomEmail(length: number, prefix: string = "") {
        return `${this.generateRandomString(length, prefix)}@mail.com`
    }

    public static generateRandomPhone() {
        return faker.phone.number()
    }

    public static generateRandomName() {
        return faker.person.fullName()
    }

    public static getTimeDeltaSecondsFromCurrentTime(deltaInSeconds: number, format: string) {
        const currentTime = dayjs();
        return currentTime.add(deltaInSeconds, "second").format(format);
    }

    public static getTimeDeltaDaysFromCurrentTime(deltaInDays: number, format: string) {
        const currentTime = dayjs();
        return currentTime.add(deltaInDays, "day").format(format);
    }

    public static generateRandomNumber(length: number) {
        let generatedNumber = '';
        const possible = '0123456789';
        for (let i = 0; i < length; i++) {
            generatedNumber += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }

        return parseInt(generatedNumber);
    }

    public static generateRandomDate(format: string) {
        return dayjs(faker.date.anytime()).format(format)
    }

    public static generateTimestamp() {
        return Date.now() / 1000;
    }

    public static getTodaysDate(format: string) {
        dayjs.extend(advancedFormat)
        return dayjs().format(format)
    }

    public static getMeaningfulTimestamp(includeYear: boolean) {
        if (includeYear) {
            return dayjs().format("DD/MM/YYYY_HHmm")
        } else {
            return dayjs().format("DD/MM_HHmm")
        }
    }

    public static generatePastDate(subtractAmount: number, timeUnit: dayjs.ManipulateType, format: string) {
        return dayjs().subtract(subtractAmount, timeUnit).format(format)
    }

    public static generateFutureDate(addAmount: number, timeUnit: dayjs.ManipulateType, format: string) {
        return dayjs().add(addAmount, timeUnit).format(format)
    }

    public static calculateTimeDifferenceInSeconds(startDate: string, endDate: string) {
        const parsedStartDate = dayjs(startDate)
        const parsedEndDate = dayjs(endDate)

        return parsedEndDate.diff(parsedStartDate) / 1000
    }

    public static convertDateToFormat(dateToBeConverted: string, targetFormat: string) {
        return dayjs(dateToBeConverted).format(targetFormat)
    }

    public static generateUuid() {
        return uuidv4();
    }
}