// Bad Request Error (400)
export class BadRequestError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 400;
        this.name = "BadRequestError";
    }
}

// errors

// Unauthorized Error (401 )
export class UnAuthorizedError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 401;
        this.name = "UnAuthorizedError";
    }
}

// Forbidden Error (403)
export class ForbiddenError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 403;
        this.name = "ForbiddenError";
    }
}

// Not Found Error (404)
export class NotFoundError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 404;
        this.name = "NotFoundError";
    }
}

// Method Not Allowed Error (405)
export class MethodNotAllowedError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 405;
        this.name = "MethodNotAllowedError";
    }
}

// Internal Server Error (500)
export class InternalServerError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 500;
        this.name = "InternalServerError";
    }
}

// Service Unavailable Error (503)
export class ServiceUnavailableError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 503;
        this.name = "ServiceUnavailableError";
    }
}

// Conflict Error (409)
export class ConflictError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 409;
        this.name = "ConflictError";
    }
}

// Not Implemented Error (501)
export class NotImplementedError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 501;
        this.name = "NotImplementedError";
    }
}

// Gateway Timeout Error (504)
export class GatewayTimeoutError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 504;
        this.name = "GatewayTimeoutError";
    }
}

// Payload Too Large Error (413)
export class PayloadTooLargeError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 413;
        this.name = "PayloadTooLargeError";
    }
}

// Unsupported Media Type Error (415)
export class UnsupportedMediaTypeError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 415;
        this.name = "UnsupportedMediaTypeError";
    }
}

// Empty request body error
export class EmptyRequestBodyError extends Error {
    status: number;
    constructor() {
        super("Please provide the required information");
        this.status = 400; // Bad Request
        this.name = "Please provide the required information";
    }
}

export class ResourceGoneError extends Error {
    status: number;
    constructor(message: string = "The requested resource is no longer available") {
        super(message);
        this.status = 410; // Gone
        this.name = "ResourceGoneError";
    }
}

export const BodyValidator = (schema: any, body: any) => {
    const { error } = schema.validate(body, { abortEarly: false });

    if (error && error.details) {
        const messages = error.details.map(
            (obj: any) => obj.message.replace(/\"/g, "") // remove quotes from each message
        );
        const errorMessage = messages.join(", "); // join all messages into one string
        throw new BadRequestError(errorMessage);
    }
};
