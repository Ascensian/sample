"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload_controller_1 = require("../controllers/upload.controller");
var routes = express_1.default.Router();
routes.get('/ping', function (req, res) {
    console.log('OK!');
    res.status(200).json({
        message: 'OK!'
    });
});
routes.post('/upload-sound', upload_controller_1.uploadSound);
routes.use(function (req, res) {
    var error = new Error('Not found!');
    console.error(error);
    return res.status(404).json({ message: error.message });
});
exports.default = routes;
//# sourceMappingURL=index.js.map