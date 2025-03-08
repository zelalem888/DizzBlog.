-- CreateTable
CREATE TABLE "vlog" (
    "id" SERIAL NOT NULL,
    "autor" VARCHAR(255),
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "created_at" VARCHAR(255),

    CONSTRAINT "id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vlog_table" (
    "ID" SERIAL NOT NULL,
    "autor" VARCHAR(255),
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "created_at" VARCHAR(255),

    CONSTRAINT "ID" PRIMARY KEY ("ID")
);
