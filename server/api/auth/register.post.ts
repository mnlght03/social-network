import { z } from 'zod'
import bcrypt from 'bcrypt'
import { db } from '~/db'

const usernameMinLength = 3
const usernameMaxLength = 10
const usernameLengthErrorMessage = `Username should be ${usernameMinLength} - ${usernameMaxLength} symbols long.`

const passwordMinLength = 6
const passwordMaxLength = 256
const passwordLengthErrorMessage = `Password should be ${passwordMinLength} - ${passwordMaxLength} symbols long.`

const schema = createValidationSchema(z.object({
  email: z.string().email('Invalid email.'),
  username: z.string()
    .min(usernameMinLength, usernameLengthErrorMessage)
    .max(usernameMaxLength, usernameLengthErrorMessage),
  name: z.string()
    .regex(/\w+( \w+)?/, 'Invalid name.')
    .optional(),
  password: z.string()
    .min(passwordMinLength, passwordLengthErrorMessage)
    .max(passwordMaxLength, passwordLengthErrorMessage),
  repeatPassword: z.string(),
  profileImage: z.string().optional(),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  message: 'Passwords don\'t match.',
  path: ['repeatPassword'],
}))

export type RegisterRequest = z.infer<typeof schema>

export default defineEventHandler(async (event) => {
  const {
    email,
    username,
    name,
    password,
  } = await readValidatedBody(event, schema.parse)

  const user = await db.user.create({
    data: {
      email,
      username,
      name,
      password: bcrypt.hashSync(password, 10),
    },
  })

  return {
    ...user,
    password: undefined,
  }
})
