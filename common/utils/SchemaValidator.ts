import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv({allErrors: true})
addFormats(ajv)

export class SchemaValidator {
    public static validateJsonSchema<T>(schema: JSONSchemaType<T>, data: unknown): boolean {
        console.info(`Schema Validator: Validating the data ${JSON.stringify(data)} according to the schema: ${JSON.stringify(schema)}.`)
        const validate = ajv.compile(schema)
        const isValid = validate(data)

        if (!isValid && validate.errors) {
            console.error(`Schema Validator: Validation failed for data: ${JSON.stringify(data).slice(0, 2000)} against schema: ${JSON.stringify(schema)}. Details:`)
            for (const err of validate.errors) {
                console.error(`Schema Validator: Path -> ${err.instancePath || "/"} | Error: ${err.message} | Schema: ${err.keyword}.`)
            }

        }

        console.info(`Schema Validator: Validation completed. Valid: ${isValid}.`)
        return isValid
    }
}