import fetch from 'node-fetch'
import { FetchRequest, Ranked } from './types'

export const mapTranslations = new Map<string, string>([
  ['Kings Canyon', 'キングスキャニオン'],
  ['World\'s Edge', 'ワールズエッジ'],
  ['Olympus', 'オリンパス'],
  ['Storm Point', 'ストームポイント'],
  ['Broken Moon', 'ブロークンムーン'],
])

export async function getMapRotation(request: FetchRequest): Promise<Ranked> {
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

export const judgeMap = (map: string): string => {
  return mapTranslations.get(map) || '不明'
}
