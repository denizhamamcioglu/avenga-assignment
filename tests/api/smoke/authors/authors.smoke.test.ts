import test, { APIResponse, expect } from "@playwright/test";
import { AuthorsRequests } from "../../../../api/data/requests/authors/AuthorsRequests";
import { allAuthorsResponseSchema, authorsResponseSchema } from "../../../../api/data/schemas/author";
import { AuthorsApi } from "../../../../api/services/AuthorsApi";
import { ResponseValidator } from "../../../../common/api/ResponseValidator";

let allAuthorsResponse: APIResponse | undefined
const authorsToBeDeleted: number[] = []

test.describe("Test happy path flows of Authors API", () => {
    test.beforeAll(async () => {
        allAuthorsResponse = await AuthorsApi.getAllAuthors()
    })

    test.afterAll(async () => {
        let currentAuthorId

        try {
            for (const authorId of authorsToBeDeleted) {
                currentAuthorId = authorId
                await AuthorsApi.deleteAuthorWithId(authorId)
            }
        } catch (error: any) {
            console.warn(`Test Cleanup: Unable to delete the author with ID: ${currentAuthorId}. Error: ${error}.`)
        }
    })

    test("TC-AUTHORS-01 - Validate GET /Authors endpoint", async () => {
        await ResponseValidator.performBasicResponseChecks(allAuthorsResponse!, allAuthorsResponseSchema)
        const authorsJson = await allAuthorsResponse?.json()
        expect(authorsJson[0]['id']).toBe(1)
    })

    test("TC-AUTHORS-02 - Validate GET /Authors/<id> endpoint", async () => {
        // In order to provide isolated tests which are independent from each other and the available data, it is better to create a new author from scratch in beforeAll() block of this test file.
        // However, since the fake Authors API does not permanently save the newly created author even if we call the POST /authors endpoint, this test first gets all available authors and uses the first one.
        const authorIdToGet = await (await allAuthorsResponse?.json())[0]['id']
        const singleAuthorResponse = await AuthorsApi.getAuthorWithId(authorIdToGet)
        await ResponseValidator.performBasicResponseChecks(singleAuthorResponse!, authorsResponseSchema)

        const singleAuthorJson = await singleAuthorResponse?.json()
        expect(singleAuthorJson['id']).toEqual(authorIdToGet)

        const allAuthorsJson = await allAuthorsResponse?.json()
        expect(singleAuthorJson).toEqual(allAuthorsJson[0])
    })

    test("TC-AUTHORS-03 - Validate POST /authors endpoint", async () => {
        const createAuthorResponse = await AuthorsApi.createNewAuthor()
        await ResponseValidator.performBasicResponseChecks(createAuthorResponse!, authorsResponseSchema)

        const createAuthorJson = await createAuthorResponse?.json()
        expect(createAuthorJson).toEqual(AuthorsRequests.NEW_AUTHOR)
        authorsToBeDeleted.push(createAuthorJson['id'])
    })

    test("TC-AUTHORS-04 - Validate PUT /Authors/<id> endpoint", async () => {
        // In order to provide isolated tests which are independent from each other and the available data, it is better to create a new author from scratch in beforeAll() block of this test file.
        // However, since the fake Authors API does not permanently save the newly created author even if we call the POST /authors endpoint, this test first gets all available authors and uses the first one.
        const authorIdToUpdate = await (await allAuthorsResponse?.json())[0]['id']
        const updateAuthorResponse = await AuthorsApi.updateAuthor(authorIdToUpdate, AuthorsRequests.NEW_AUTHOR)
        await ResponseValidator.performBasicResponseChecks(updateAuthorResponse!, authorsResponseSchema)

        const updateAuthorJson = await updateAuthorResponse?.json()
        expect(updateAuthorJson).toEqual(AuthorsRequests.NEW_AUTHOR)
    })

    test("TC-AUTHORS-05 - Validate DELETE /authors/<id> endpoint", async () => {
        // In order to provide isolated tests which are independent from each other and the available data, it is better to create a new author from scratch in beforeAll() block of this test file.
        // However, since the fake Authors API does not permanently save the newly created author even if we call the POST /authors endpoint, this test first gets all available authors and uses the first one.
        const authorIdToDelete = await (await allAuthorsResponse?.json())[0]['id']
        const deleteAuthorResponse = await AuthorsApi.deleteAuthorWithId(authorIdToDelete)
        expect(deleteAuthorResponse?.ok).toBeTruthy()
    })

    test("TC-AUTHORS-06 - Validate GET /Authors/authors/books/<idBook> endpoint", async () => {
        const authorInfoJson = await (await allAuthorsResponse?.json())[0]
        const authorBookId = authorInfoJson['idBook']
        const authorsOfBookResponse = await AuthorsApi.getAuthorOfBookWithId(authorBookId)
        const authorsOfBookJson = await authorsOfBookResponse?.json()

        await ResponseValidator.performBasicResponseChecks(authorsOfBookResponse!, allAuthorsResponseSchema)
        expect(authorsOfBookJson).toContainEqual(authorInfoJson)
    })
})