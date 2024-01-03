"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRankMessage = void 0;
const utils_1 = require("./utils");
function createRankMessage(rankedInfo) {
    const currentMap = rankedInfo.ranked.current.map;
    const nextMap = rankedInfo.ranked.next.map;
    const duration = rankedInfo.ranked.current.remainingTimer;
    const currentMapJP = (0, utils_1.judgeMap)(currentMap);
    const nextMapJP = (0, utils_1.judgeMap)(nextMap);
    return `現在のランクマップ：**${currentMapJP}**\n次のランクマップ：**${nextMapJP}**\n残り時間：**${duration}**`;
}
exports.createRankMessage = createRankMessage;
