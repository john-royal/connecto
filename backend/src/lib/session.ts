import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { type RequestHandler } from 'express'
import expressSession from 'express-session'
import prisma, { type User } from './prisma'

export const session = expressSession({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production'
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {})
})

export const helpers: RequestHandler = async (req, res, next) => {
  req.logIn = async (user: User) => {
    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((error?: Error) => {
        if (error != null) {
          reject(error)
        } else {
          req.session.userId = user.id
          resolve()
        }
      })
    })
  }

  req.logOut = async () => {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((error?: Error) => {
        if (error != null) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  if (req.session.userId != null) {
    req.user = await prisma.user.findUnique({
      where: { id: req.session.userId }
    })
  }

  next()
}
