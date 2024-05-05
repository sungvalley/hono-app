import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { env } from 'hono/adapter'
import { logger } from 'hono/logger'


// https://hono.dev/getting-started/cloudflare-workers#using-variables-in-middleware
type Bindings = {
  BASIC_AUTH_USER: string
  BASIC_AUTH_PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>()

// bhttps://hono.dev/getting-started/basic#using-middleware
// https://841-biboroku.info/entry/cloudflare-pages-function-basic-auth/
app.all(
  '/basic/*',
  async (c, next) => {
    const auth = basicAuth({
      username: c.env.BASIC_AUTH_USER,
      password: c.env.BASIC_AUTH_PASSWORD,
    })
    return auth(c, next)
  }
)

// https://hono.dev/middleware/builtin/logger
export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}
app.use(logger(customLogger))

// https://hono.dev/getting-started/basic#return-json
app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

// https://hono.dev/getting-started/basic#request-and-response
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})
app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted!`))

// https://hono.dev/getting-started/basic#request-and-response
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}

app.get('/page', (c) => {
  return c.html(<View />)
})

app.get('/basic', (c) => {
  return c.text('Your are authorized! basic')
})

export default app
