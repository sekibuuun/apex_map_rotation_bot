export interface FetchRequest {
  url: string
  options: object
}

export interface Ranked {
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
