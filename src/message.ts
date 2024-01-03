import { Ranked } from './types'
import { judgeMap } from './utils'

export function createRankMessage(rankedInfo: Ranked): string {
  const currentMap: string = rankedInfo.ranked.current.map
  const nextMap: string = rankedInfo.ranked.next.map
  const duration: string = rankedInfo.ranked.current.remainingTimer
  const currentMapJP: string = judgeMap(currentMap)
  const nextMapJP: string = judgeMap(nextMap)
  return `現在のランクマップ：**${currentMapJP}**\n次のランクマップ：**${nextMapJP}**\n残り時間：**${duration}**`
}
