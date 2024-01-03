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
//必要なパッケージをインポートする
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
//.envファイルを読み込む
dotenv_1.default.config();
const url_map = `https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}&version=2`;
//Botで使うGatewayIntents、partials
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel],
});
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
const judgeMap = (map) => {
    switch (map) {
        case 'Kings Canyon':
            return 'キングスキャニオン';
        case 'Worlds Edge':
            return 'ワールズエッジ';
        case 'Olympus':
            return 'オリンパス';
        case 'Storm Point':
            return 'ストームポイント';
        case 'Broken Moon':
            return 'ブロークンムーン';
        default:
            return '不明';
    }
};
//Botがきちんと起動したか確認
client.once('ready', () => {
    console.log('Ready!');
    if (client.user) {
        console.log(client.user.tag);
    }
});
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    if (client.user && message.mentions.users.has(client.user.id)) {
        const rankedInfo = yield getMapRotation({
            url: url_map,
            options: {},
        });
        const currentMap = rankedInfo.ranked.current.map;
        const nextMap = rankedInfo.ranked.next.map;
        const duration = rankedInfo.ranked.current.remainingTimer;
        const currentMapJP = judgeMap(currentMap);
        const nextMapJP = judgeMap(nextMap);
        const reply = `現在のランクマップ：**${currentMapJP}**\n次のランクマップ：**${nextMapJP}**\n残り時間：**${duration}**`;
        message.channel.send(reply);
    }
}));
//ボット作成時のトークンでDiscordと接続
client.login(process.env.BOT_TOKEN);
