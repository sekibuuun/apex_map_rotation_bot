//必要なパッケージをインポートする
import { GatewayIntentBits, Client, Partials, Message } from 'discord.js'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

//.envファイルを読み込む
dotenv.config()

interface FetchRequest {
  url: string
  options: object
}

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

async function getMapRotation(request: FetchRequest): Promise<string> {
  return await fetch(request.url, request.options)
  .then((res) => res.json())
  .then((json) => JSON.stringify(json))
  .catch((err) => {
    throw new Error(err)
  })
}

//Botがきちんと起動したか確認
client.once('ready', () => {
    console.log('Ready!')
    if(client.user){
        console.log(client.user.tag)
    }
})

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return
    if (client.user && message.mentions.users.has(client.user.id)) {
      const data = await getMapRotation({
        url: url_map,
        options: {},
      })
      console.log(data);
    }
})

//ボット作成時のトークンでDiscordと接続
client.login(process.env.BOT_TOKEN)
