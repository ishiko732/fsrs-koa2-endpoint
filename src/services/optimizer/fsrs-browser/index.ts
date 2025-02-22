import { readFileSync } from 'fs'
import init, { Fsrs, InitOutput, ItemState } from 'fsrs-browser/fsrs_browser.js'
import { FSRSItem } from '../types'
let initOutput: InitOutput | null = null

export class FSRSBrowserService {
  constructor() {}

  async init() {
    if (!initOutput) {
      const wasmBuffer = readFileSync(
        new URL('fsrs_browser_bg.wasm', import.meta.url)
      )
      initOutput = await init(wasmBuffer)
    }
    return this
  }

  next(d: number, s: number, r: number) {
    const fsrs = new Fsrs()
    const result = fsrs.nextInterval(s, d, r)
    fsrs.free()
    return +result.toFixed(4)
  }

  state(d: number, s: number, r: number, interval: number) {
    const fsrs = new Fsrs()
    const result = fsrs.nextStates(s || undefined, d || undefined, r, interval)

    const dataset = {
      again: this._getState(result.again),
      hard: this._getState(result.hard),
      good: this._getState(result.good),
      easy: this._getState(result.easy)
    }

    fsrs.free()
    return dataset
  }

  _getState(info: ItemState) {
    return {
      memoryState: {
        stability: +info.memory.stability.toFixed(4),
        difficulty: +info.memory.difficulty.toFixed(4)
      }
    }
  }

  async train(enableShortTerm: boolean, fsrsItems: FSRSItem[]) {
    // create FSRS instance and optimize
    const fsrs = new Fsrs()
    const ratings = new Uint32Array(
      fsrsItems.flatMap((item) => item.map((review) => review.rating))
    )
    const deltaTs = new Uint32Array(
      fsrsItems.flatMap((item) => item.map((review) => review.deltaT))
    )
    const lengths = new Uint32Array(fsrsItems.map((item) => item.length))
    return fsrs.computeParameters(
      ratings,
      deltaTs,
      lengths,
      null,
      enableShortTerm
    )
  }
}
