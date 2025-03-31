-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "cloudinary_url" TEXT NOT NULL,
    "cloudinary_public_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_title_key" ON "File"("title");
