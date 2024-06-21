import {IncomingMessage, ServerResponse} from "http";

export const createResponse = (res: ServerResponse, status: number, message: string) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json')
    res.end(message)
}

export const parseRequestBody = (req: IncomingMessage) => new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        resolve(JSON.parse(body));
    });

    req.on('error', (error: Error) => {
        reject(error);
    });
});
