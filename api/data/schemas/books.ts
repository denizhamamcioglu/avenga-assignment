import { JSONSchemaType } from "ajv"

interface BooksResponse {
    id: number;
    title?: string | null;
    description?: string | null;
    pageCount: number;
    excerpt?: string | null;
    publishDate: string;
}

export const allBooksResponseSchema: JSONSchemaType<BooksResponse[]> = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: { type: "integer" },
            title: { type: "string", nullable: true },
            description: { type: "string", nullable: true },
            pageCount: { type: "integer" },
            excerpt: { type: "string", nullable: true },
            publishDate: { type: "string", format: "date-time" }
        },
        required: ["id", "pageCount", "publishDate"],
        additionalProperties: false
    }
}

export const booksResponseSchema: JSONSchemaType<BooksResponse> = {
    type: "object",
    properties: {
        id: { type: "integer" },
        title: { type: "string", nullable: true },
        description: { type: "string", nullable: true },
        pageCount: { type: "integer" },
        excerpt: { type: "string", nullable: true },
        publishDate: { type: "string", format: "date-time" }
    },
    required: ["id", "pageCount", "publishDate"],
    additionalProperties: false
}