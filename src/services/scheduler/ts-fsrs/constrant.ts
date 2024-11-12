import { FSRSVersion, generatorParameters } from 'ts-fsrs';

export const project = {
  name: 'ts-fsrs',
  version: FSRSVersion,
  repo: 'https://github.com/open-spaced-repetition/ts-fsrs',
  npm: 'https://www.npmjs.com/package/ts-fsrs',
  codecov: 'https://app.codecov.io/gh/open-spaced-repetition/ts-fsrs',
  default: generatorParameters()
} as const
