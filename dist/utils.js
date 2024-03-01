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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.judgeMap = exports.getMapRotation = exports.mapTranslations = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.mapTranslations = new Map([
    ['Kings Canyon', 'キングスキャニオン'],
    ['World\'s Edge', 'ワールズエッジ'],
    ['Olympus', 'オリンパス'],
    ['Storm Point', 'ストームポイント'],
    ['Broken Moon', 'ブロークンムーン'],
]);
function getMapRotation(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, node_fetch_1.default)(request.url, request.options)
            .then(res => res.json())
            .then(json => {
            if (!json.ranked) {
                throw new Error('Ranked data is missing in the response');
            }
            return { ranked: json.ranked };
        })
            .catch(err => {
            throw new Error(err);
        });
    });
}
exports.getMapRotation = getMapRotation;
const judgeMap = (map) => {
    return exports.mapTranslations.get(map) || '不明';
};
exports.judgeMap = judgeMap;
