import type { User as PrismaUser, UserPost as PrismaUserPost } from '@prisma/client'

export type User = Omit<PrismaUser, 'password' | 'createdAt' | 'updatedAt'>

export type UserPost = Omit<PrismaUserPost, 'deleted'>
