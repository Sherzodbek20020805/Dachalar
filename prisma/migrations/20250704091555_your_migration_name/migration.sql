-- CreateTable
CREATE TABLE "Dacha" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "avg_reytig" DOUBLE PRECISION DEFAULT 0,
    "price" INTEGER,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Dacha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reyting" (
    "id" SERIAL NOT NULL,
    "ball" INTEGER NOT NULL,
    "dacha_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Reyting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "chat_id" BIGINT,
    "is_bot" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bugun" (
    "id" SERIAL NOT NULL,
    "dachaId" INTEGER NOT NULL,

    CONSTRAINT "Bugun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reyting" ADD CONSTRAINT "Reyting_dacha_id_fkey" FOREIGN KEY ("dacha_id") REFERENCES "Dacha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reyting" ADD CONSTRAINT "Reyting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
