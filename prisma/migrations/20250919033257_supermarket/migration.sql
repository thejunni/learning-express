-- CreateTable
CREATE TABLE "public"."Supermarket" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "is_open" BOOLEAN NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supermarket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Supermarket" ADD CONSTRAINT "Supermarket_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
