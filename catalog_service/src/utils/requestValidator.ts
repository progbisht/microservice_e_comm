import { ValidationError, validate } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";


// This function validates the input and returns a Promise that resolves to either an array of ValidationError objects or false
const validationError = async( input: any ) : Promise<ValidationError[] | false> => {

    // validation configuration object "validationError: { target: true }" specifies that the target property of validation errors should be included in the result.
    const errors = await validate(input, {
        validationError: {target: true},
    })

    if(errors.length){
        return errors
    }

    return false
}


// The function returns a Promise that resolves to an object with two properties:
// errors: This can be either false (indicating no errors) or a string containing error messages.
// input: An instance of type T representing the validated input.

export const RequestValidator = async <T> ( type: ClassConstructor<T>, body: any ): Promise<{errors: boolean | string; input: T}> => {
    
    // This function converts the plain object body into an instance of the class specified by type.
    const input = plainToClass(type, body)

    const errors = await validationError(input)

    if(errors){

        // This maps over the errors array and extracts the values of the constraints property from each ValidationError object. 
        // The constraints property contains the actual error messages and joins the extracted error messages into a single string, separated by commas.
        const errorMessage = errors
                                .map((error: ValidationError) => (Object as any).values(error.constraints))
                                .join(", ")
        return { errors: errorMessage, input }
    }

    return { errors: false, input }

}