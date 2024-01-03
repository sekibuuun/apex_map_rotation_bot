//必要なパッケージをインポートする
import { Client, GatewayIntentBits, Message, Partials } from 'discord.js'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

//.envファイルを読み込む
dotenv.config()

interface FetchRequest {
  url: string
  options: object
}

interface Ranked {
  ranked: {
    current: {
      map: string
      remainingTimer: string
    }
    next: {
      map: string
    }
  }
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

async function getMapRotation(request: FetchRequest): Promise<Ranked> {
  return await fetch(request.url, request.options)
    .then(res => res.json())
    .then(json => {
      if (!json.ranked) {
        throw new Error('Ranked data is missing in the response')
      }
      return { ranked: json.ranked }
    })
    .catch(err => {
      throw new Error(err)
    })
}

const judgeMap = (map: string): string => {
  switch (map) {
    case 'Kings Canyon':
      return 'キングスキャニオン'
    case 'Worlds Edge':
      return 'ワールズエッジ'
    case 'Olympus':
      return 'オリンパス'
    case 'Storm Point':
      return 'ストームポイント'
    case 'Broken Moon':
      return 'ブロークンムーン'
    default:
      return '不明'
  }
}

//Botがきちんと起動したか確認
client.once('ready', () => {
  console.log('Ready!')
  if (client.user) {
    console.log(client.user.tag)
  }
})

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  if (client.user && message.mentions.users.has(client.user.id)) {
    const rankedInfo: Ranked = await getMapRotation({
      url: url_map,
      options: {},
    })
    const currentMap: string = rankedInfo.ranked.current.map
    const nextMap: string = rankedInfo.ranked.next.map
    const duration: string = rankedInfo.ranked.current.remainingTimer
    const currentMapJP: string = judgeMap(currentMap)
    const nextMapJP: string = judgeMap(nextMap)
    const reply: string = `現在のランクマップ：**${currentMapJP}**\n次のランクマップ：**${nextMapJP}**\n残り時間：**${duration}**`
    message.channel.send(reply)
  }
})

//ボット作成時のトークンでDiscordと接続
client.login(process.env.BOT_TOKEN)
