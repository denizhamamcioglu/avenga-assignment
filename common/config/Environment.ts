export class Environment {
    static API_ENDPOINTS = {
        base: `${process.env.TEST_URL}/api/v1`,
        authors: '/Authors',
        books: '/Books'
    }
}