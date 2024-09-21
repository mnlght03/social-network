export const selectUserPostForView = {
  id: true,
  text: true,
  author: {
    select: {
      id: true,
      username: true,
      profileImage: true,
    },
  },
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
}
