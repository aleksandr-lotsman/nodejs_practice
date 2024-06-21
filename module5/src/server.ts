import http from "http";
import * as userController from "./controllers/userController";

const server = http.createServer((req, res) => {
    userController.handleRequest(req, res)
});

server.listen(8000, () => {
    console.log('Server running on http://localhost:5000/');
});