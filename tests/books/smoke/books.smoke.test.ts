import test, { expect } from "@playwright/test";
import { BooksRequests } from "../../../api/data/requests/books/BooksRequests";
import { allBooksResponseSchema, booksResponseSchema } from "../../../api/data/schemas/books";
import { BooksApi } from "../../../api/data/services/BooksApi";
import { ResponseValidator } from "../../../common/api/ResponseValidator";
import { SchemaValidator } from "../../../common/utils/SchemaValidator"

test.describe("Test books endpoints", () => {
    test.only("Validate GET /books endpoint", async () => {
        const booksResponse = await BooksApi.getAllBooks()
        await ResponseValidator.performBasicResponseChecks(booksResponse!, allBooksResponseSchema)

        const booksJson = await booksResponse?.json()
        expect(booksJson[0]['id']).toBe(1)
    })

    test.only("Validate POST /books endpoint", async () => {
        const createBookResponse = await BooksApi.createNewBook()
        await ResponseValidator.performBasicResponseChecks(createBookResponse!, booksResponseSchema)

        const createBookJson = await createBookResponse?.json()        
        expect(createBookJson['id']).toEqual(BooksRequests.CREATE_NEW_BOOK.id)
        expect(createBookJson['description']).toEqual(BooksRequests.CREATE_NEW_BOOK.description)
        expect(createBookJson['excerpt']).toEqual(BooksRequests.CREATE_NEW_BOOK.excerpt)
        expect(createBookJson['pageCount']).toEqual(BooksRequests.CREATE_NEW_BOOK.pageCount)
        expect(createBookJson['title']).toEqual(BooksRequests.CREATE_NEW_BOOK.title)
    })

    test("Validate PUT /books/<id> endpoint", async () => {
        // In order to provide isolated tests which are independent from each other and the available data, it is better to create a new book from scratch in beforeAll() block of this test file.
        // However, since the fake Books API does not permanently save the newly created book even if we call the POST /books endpoint, this test first gets all available books and uses the first one.

        // Get all the books
        const allBooksResponse = await BooksApi.getAllBooks()
        const bookIdToUpdate = await (await allBooksResponse?.json())[0]['id']

        const updateBookResponse = await BooksApi.updateBook(0, {})
        const updateBookJson = await updateBookResponse?.json()
        expect(updateBookResponse?.ok()).toBeTruthy()
        
        const isUpdateBooksJsonValid = SchemaValidator.validateJsonSchema(booksResponseSchema, updateBookJson)
        expect(isUpdateBooksJsonValid).toBeTruthy()
    })
})