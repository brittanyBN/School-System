"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(res, e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (e.code === 'P2002' && e.meta && e.meta.target && e.meta.target.includes('email', 'departmentHeadForClassId', 'slug')) {
            return res.status(400).json({
                message: `${e.meta.target} already exists.`
            });
        }
        if (e.code === 'P2003') {
            return res.status(404).json({
                message: 'Not found'
            });
        }
        if (e.code === 'P2025') {
            return res.status(400).json({
                message: 'Cant find what your are looking for'
            });
        }
        return res.status(500).json({
            message: 'Something went wrong'
        });
    });
}
exports.errorHandler = errorHandler;
