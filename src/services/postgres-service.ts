import pg from 'pg'
const { Pool } = pg

const connect = (host: string, port: number, user: string, password: string, database: string) => {
  const pool = new Pool({
    host,
    user,
    password,
    port,
    database,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
  return pool
}

export { connect }
