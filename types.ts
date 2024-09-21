import type { User as PrismaUser, UserPost as PrismaUserPost } from '@prisma/client'

export type UserView = Omit<PrismaUser, 'password' | 'createdAt' | 'updatedAt'>

export type UserPostView = Omit<PrismaUserPost, 'deleted' | 'authorId' | 'replyToId' | 'createdAt' | 'updatedAt'> & {
  author: {
    id: string
    username: string
    profileImage?: string | null
  }
  createdAt: string | Date
  updatedAt: string | Date
  replies?: UserPostView[]
}
