-- CreateTable
CREATE TABLE "UserPost" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" UUID NOT NULL,
    "replyToId" UUID,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "UserPost"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
