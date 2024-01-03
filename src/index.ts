//必要なパッケージをインポートする
import { Client, GatewayIntentBits, Message, Partials } from 'discord.js'
import dotenv from 'dotenv'
import { createRankMessage } from './message'
import { getMapRotation } from './utils'

//.envファイルを読み込む
dotenv.config()

const url_map: string = `https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}&version=2`

//Botで使うGatewayIntents、partials
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  if (client.user && message.mentions.users.has(client.user.id)) {
    const rankedInfo = await getMapRotation({
      url: url_map,
      options: {},
    })
    const reply: string = createRankMessage(rankedInfo)
    message.channel.send(reply)
  }
})

//ボット作成時のトークンでDiscordと接続
client.login(process.env.BOT_TOKEN)
