import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(etag(), logger())
app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

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

app.get('/', (c) => {
  return new Response('Good morning!')
})

app.get('/admin', (c) => {
  return c.text('Your are authorized!')
})


export default app
