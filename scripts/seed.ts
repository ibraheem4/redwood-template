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
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' },
  })

  if (adminUser) {
    // Delete the admin user.
    await prisma.user.delete({ where: { id: adminUser.id } })
  }

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
  console.info(`- Created admin user with email: admin@admin.com`)
}

const seedModeratorUser = async () => {
  const [hashedPassword, salt] = _hashPassword(MODERATOR_PASSWORD)

  // Check if the moderator user already exists
  const moderatorUser = await prisma.user.findUnique({
    where: { email: 'moderator@moderator.com' },
  })

  if (moderatorUser) {
    // Delete the moderator user.
    await prisma.user.delete({ where: { id: moderatorUser.id } })
  }

  // Create a new admin user
  await prisma.user.create({
    data: {
      email: 'moderator@moderator.com',
      name: 'Moderator',
      hashedPassword,
      salt,
      roles: ['moderator'],
    },
  })
  console.info(`- Created moderator user with email: moderator@moderator.com`)
}

const seedRegularUser = async () => {
  const [hashedPassword, salt] = _hashPassword(USER_PASSWORD)

  // Check if the moderator user already exists
  const regularUser = await prisma.user.findUnique({
    where: { email: 'regular@regular.com' },
  })

  if (regularUser) {
    // Delete the regular user.
    await prisma.user.delete({ where: { id: regularUser.id } })
  }

  // Create a new admin user
  await prisma.user.create({
    data: {
      email: 'user@user.com',
      name: 'Regular User',
      hashedPassword,
      salt,
      roles: ['user'],
    },
  })
  console.info(`- Created regular user with email: user@user.com`)
}

const seedUsers = async (n = USER_COUNT) => {
  const [hashedPassword, salt] = _hashPassword(USER_PASSWORD)

  for (let i = 0; i < n; i++) {
    const name = randFullName()
    const email = randEmail()

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
