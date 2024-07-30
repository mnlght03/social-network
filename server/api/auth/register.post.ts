import { z } from 'zod'

const usernameMinLength = 3
const usernameMaxLength = 10
const usernameLengthErrorMessage = `Username should be ${usernameMinLength} - ${usernameMaxLength} symbols long.`

const passwordMinLength = 6
const passwordMaxLength = 256
const passwordLengthErrorMessage = `Password should be ${passwordMinLength} - ${passwordMaxLength} symbols long.`

const schema = z.object({
  email: z.string().email('Invalid email.'),
  username: z.string()
    .min(usernameMinLength, usernameLengthErrorMessage)
    .max(usernameMaxLength, usernameLengthErrorMessage),
  name: z.string().regex(/\w+( \w+)?/, 'Invalid name.'),
  password: z.string()
    .min(passwordMinLength, passwordLengthErrorMessage)
    .max(passwordMaxLength, passwordLengthErrorMessage),
  repeatPassword: z.string(),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  message: 'Passwords don\'t match.',
  path: ['repeatPassword'],
}).catch(({ error }) => {
  throw createError({
    statusCode: 400,
    statusMessage: 'Bad Request',
    data: error.flatten().fieldErrors,
  })
})

export default defineEventHandler(async (event) => {
  const { email, username, name, password } = schema.parse(await readBody(event))

  return 'Hi!'
})
