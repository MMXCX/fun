import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Fingerprint from 'express-fingerprint'
import router from './router'

const app = express()
const port = process.env.API_PORT
const host = process.env.API_HOST

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(Fingerprint())
app.use(process.env.API_PREFIX!, router)

app.get('/', (req, res) => {
  if (!req.cookies.refreshToken) {
    res.cookie('refreshToken', 'val543', {
      httpOnly: true,
      maxAge: 1296e6
    })
  }
  // res.clearCookie('refreshToken')

  // res.json({ message: captcha_store.get() })
  res.status(200).json({
    cookies: req.cookies,
    fingerprint: req.fingerprint,
    headers: req.headers
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${host}:${port}`)
})
