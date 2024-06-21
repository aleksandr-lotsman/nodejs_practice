import {UserRepositoryImpl} from "../dao/userRepository";
import {IncomingMessage, ServerResponse} from "http";
import {ApiRequest} from "../types/apiRequest";
import * as helper from "../helpers/CommonHelper";
import {User} from "../types/users";
import {createResponse} from "../helpers/CommonHelper";

const userRepo = new UserRepositoryImpl();

const ENDPOINTS: Map<ApiRequest, Function> = new Map ([
    [{method: 'POST', path: '/api/users'}, createUser]
])

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) {
        helper.createResponse(res, 404, 'Path can not be empty');
        return;
    }
    let request: ApiRequest = {method: req.method, path: req.url}
    execFunction(request, req, res);
}

function isRequestSame(request1: ApiRequest, request2: ApiRequest): boolean {
    return request1.method === request2.method && request1.path === request2.path;
}
function execFunction(request: ApiRequest, req: IncomingMessage, res: ServerResponse) {
    const apiRequest = Array.from(ENDPOINTS.keys()).find(key => isRequestSame(key, request));

    if (apiRequest) {
        const func = ENDPOINTS.get(apiRequest);
        func && func(req, res);
    } else {
        helper.createResponse(res, 404, 'Path not found')
    }
}

async function createUser(req: IncomingMessage, res: ServerResponse) {
    const user = await helper.parseRequestBody(req) as User;
    const savedUser = userRepo.save(user);
    helper.createResponse(res, 201, 'User is successfully added')
}