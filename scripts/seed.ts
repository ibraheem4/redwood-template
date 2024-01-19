import {
  randSentence,
  randFullName,
  randParagraph,
  randEmail,
} from '@ngneat/falso'
import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()

const ADMIN_PASSWORD = 'AdminPassword'
const USER_PASSWORD = 'UserPassword'
const MODERATOR_PASSWORD = 'ModeratorPassword'

const USER_COUNT = 50
const POST_COUNT = 20
const COMMENT_COUNT = 50
const CONTACT_COUNT = 8

// https://github.com/redwoodjs/redwood/issues/5793
// https://github.com/redwoodjs/redwood/blob/main/packages/api/src/functions/dbAuth/DbAuthHandler.ts#L1288
const _hashPassword = (text: string, salt?: string) => {
  const useSalt = salt || CryptoJS.lib.WordArray.random(128 / 8).toString()

  return [
    CryptoJS.PBKDF2(text, useSalt, { keySize: 256 / 32 }).toString(),
    useSalt,
  ]
}

const seedAdminUser = async () => {
  const [hashedPassword, salt] = _hashPassword(ADMIN_PASSWORD)

  // Check if the admin user already exists
  const existingAdminUser = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' },
  })

  if (existingAdminUser) {
    // Update the existing admin user
    await prisma.user.update({
      where: { id: existingAdminUser.id },
      data: {
        hashedPassword,
        salt,
        roles: ['admin'],
      },
    })
  } else {
    // Create a new admin user
    await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        name: 'Admin',
        hashedPassword,
        salt,
        roles: ['admin'],
      },
    })
  }

  console.info(`- Created admin user with email: admin@admin.com`)
}

const seedModeratorUser = async () => {
  const [hashedPassword, salt] = _hashPassword(MODERATOR_PASSWORD)

  // Check if the moderator user already exists
  const existingModeratorUser = await prisma.user.findUnique({
    where: { email: 'moderator@moderator.com' },
  })

  if (existingModeratorUser) {
    // Update the existing moderator user
    await prisma.user.update({
      where: { id: existingModeratorUser.id },
      data: {
        hashedPassword,
        salt,
        roles: ['moderator'],
      },
    })
  } else {
    // Create a new moderator user
    await prisma.user.create({
      data: {
        email: 'moderator@moderator.com',
        name: 'Moderator',
        hashedPassword,
        salt,
        roles: ['moderator'],
      },
    })
  }

  console.info(`- Created moderator user with email: moderator@moderator.com`)
}

const seedRegularUser = async () => {
  const [hashedPassword, salt] = _hashPassword(USER_PASSWORD)
  const email = 'user@user.com'

  // Check if the regular user already exists
  const existingRegularUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingRegularUser) {
    // Update the existing regular user
    await prisma.user.update({
      where: { id: existingRegularUser.id },
      data: {
        hashedPassword,
        salt,
        roles: ['user'],
      },
    })
  } else {
    // Create a new regular user
    await prisma.user.create({
      data: {
        email,
        name: 'Regular User',
        hashedPassword,
        salt,
        roles: ['user'],
      },
    })
  }

  console.info(`- Created regular user with email: ${email}`)
}

const seedUsers = async (n = USER_COUNT) => {
  const [hashedPassword, salt] = _hashPassword(USER_PASSWORD)

  for (let i = 0; i < n; i++) {
    const name = randFullName()
    const email = randEmail()

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      // Update the existing user
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          hashedPassword,
          salt,
          roles: ['user'],
        },
      })
    } else {
      // Create a new user
      await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          salt,
          roles: ['user'],
        },
      })
    }
  }

  console.info(`- Created ${n} users`)
}

const seedPosts = async (n = POST_COUNT) => {
  // Fetch all users.
  const allUsers = await prisma.user.findMany()

  // Filter out only admins.
  const users = allUsers.filter((user) => user.roles.includes('admin'))

  for (let i = 0; i < n; i++) {
    const title = randSentence()
    const body = randParagraph()
    const userId = users[i % users.length].id // Get a user id in a round-robin fashion.

    await prisma.post.create({
      data: {
        title,
        body,
        userId,
      },
    })
  }

  console.info(`- Created ${n} posts`)
}

const seedComments = async (n = COMMENT_COUNT) => {
  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()

  for (let i = 0; i < n; i++) {
    const name = users[i % users.length].name || 'Anonymous'
    const body = randSentence()
    const postId = posts[i % posts.length].id

    await prisma.comment.create({
      data: {
        name,
        body,
        postId,
      },
    })
  }

  console.info(`- Created ${n} comments`)
}

const seedContacts = async (n = CONTACT_COUNT) => {
  for (let i = 0; i < n; i++) {
    const name = randFullName()
    const email = randEmail()
    const message = randParagraph()

    await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    })
  }

  console.info(`- Created ${n} contacts`)
}

export default async () => {
  try {
    await seedAdminUser()
    await seedModeratorUser()
    await seedRegularUser()
    await seedUsers()
    await seedPosts()
    await seedComments()
    await seedContacts()
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
