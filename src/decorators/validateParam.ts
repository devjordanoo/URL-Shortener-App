import { ValidationClassContract } from "../contracts/Validations";

export function ValidateParam(paramName: string, Validation: ValidationClassContract): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const event = args[0];
      let body = {};

      try {
        body = JSON.parse(event.body);
      } catch {
        return {
          statusCode: 400,
          body: JSON.stringify({ 
            message: "Body inválido (JSON malformado)", 
            content: event.body
          }),
        };
      }

      const value = body[paramName];
      const result = Validation.validate(value);

      if (!result.success) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: result.error }),
        };
      }

      event.body = body;

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}