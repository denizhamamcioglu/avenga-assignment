import { APIResponse, expect } from "@playwright/test";
import { JSONSchemaType } from "ajv";
import { SchemaValidator } from "../utils/SchemaValidator";

export class ResponseValidator {
    public static async performBasicResponseChecks (response: APIResponse, schema: JSONSchemaType<T>) {
        console.info(`Response Validator: Performing basic response checks.`)
        const responseJson = await response.json()
        const isResponseValid = SchemaValidator.validateJsonSchema(schema, responseJson)

        expect(response.ok()).toBeTruthy()
        expect(isResponseValid).toBeTruthy()
        console.info(`Response Validator: Basic response checks have been successfully completed.`)
        return
    }
}