export interface Config {
  basicConfig: BasicConfig
}

export interface BasicConfig {
  serverPort: number
}

/**
 * Helper function getting env var.
 * Emit process exit event in case no env var / default value.
 * @param envName
 * @param defaultVal
 */
const getProcessEnv = (envName: string, defaultVal?: string): string => {
  const env = process.env[envName]

  if (env) {
    return env
  }

  // Imitating env var (-> string) behavior
  if (defaultVal !== undefined) {
    return defaultVal.toString()
  }

  process.stdout.write(`"${envName}" is missing in environment variable. Application close.\n`)
  return process.exit(1)
}

const basicConfig: BasicConfig = {
  serverPort: Number(getProcessEnv('SERVER_PORT', '3000')),
}

const config: Config = {
  basicConfig,
}

export default config
