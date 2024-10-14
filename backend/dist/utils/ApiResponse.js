"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(props) {
        this.statusCode = props.statusCode;
        this.message = props.message;
        this.data = props.data;
        this.success = props.statusCode < 400;
    }
}
exports.ApiResponse = ApiResponse;
