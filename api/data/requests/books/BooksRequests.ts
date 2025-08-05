import { DataGenerator } from "../../../../common/utils/DataGenerator"

export class BooksRequests {
    static NEW_BOOK = {
        id: DataGenerator.generateRandomNumber(5),
        description: DataGenerator.generateRandomString(5, "automation_books_description_"),
        excerpt: DataGenerator.generateRandomString(5, "automation_books_excerpt"),
        pageCount: DataGenerator.generateRandomNumber(3),
        publishDate: DataGenerator.getTodaysDate("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        title: DataGenerator.generateRandomString(5, "automation_books_title_")
    }
}