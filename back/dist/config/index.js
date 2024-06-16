"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
var config = {
    app_name: (_a = process.env['APP_NAME']) !== null && _a !== void 0 ? _a : 'Sample',
    app_port: (_b = process.env['PORT']) !== null && _b !== void 0 ? _b : 3000,
    aws: {
        bucket: process.env['AWS_S3_BUCKET'],
        region: process.env['AWS_REGION'],
        access_key: process.env['AWS_ACCESS_KEY_ID'],
        secret_key: process.env['AWS_SECRET_ACCESS_KEY'],
    }
};
exports.default = config;
//# sourceMappingURL=index.js.map