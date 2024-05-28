export interface Config {
  basicConfig: BasicConfig
  dbConfig: DBConfig
}

export interface BasicConfig {
  serverHost: string
  serverPort: number
}

export interface DBConfig {
  user: string
  password: string
  database: string
  host: string
  port: number
  ssl: boolean
  max: number
  idleTimeoutMillis: number
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
  serverHost: getProcessEnv('SERVER_HOST', 'http://localhost'),
  serverPort: Number(getProcessEnv('SERVER_PORT', '3000')),
}

const dbConfig: DBConfig = {
  user: getProcessEnv('POSTGRES_USER'),
  password: getProcessEnv('POSTGRES_PASSWORD'),
  database: getProcessEnv('POSTGRES_DB'),
  host: getProcessEnv('POSTGRES_HOST', 'localhost'),
  port: Number(getProcessEnv('POSTGRES_PORT', '5432')),
  ssl: Boolean(getProcessEnv('POSTGRES_SSL', 'false')),
  max: Number(getProcessEnv('POSTGRES_MAX', '20')),
  idleTimeoutMillis: Number(getProcessEnv('POSTGRESDB_IDLET_IMEOUT', '10000')),
}

const config: Config = {
  basicConfig,
  dbConfig,
}

export default config
