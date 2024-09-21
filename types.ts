import type { User as PrismaUser, UserPost as PrismaUserPost } from '@prisma/client'

export type User = Omit<PrismaUser, 'password' | 'createdAt' | 'updatedAt'>

export type UserPost = Omit<PrismaUserPost, 'deleted' | 'authorId' | 'replyToId' | 'createdAt' | 'updatedAt'> & {
  author: {
    id: string
    username: string
    profileImage?: string | null
  }
  createdAt: string
  updatedAt: string
  replies?: UserPost[]
}
