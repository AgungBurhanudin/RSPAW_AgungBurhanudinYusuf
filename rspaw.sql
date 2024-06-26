/*
 Navicat Premium Data Transfer

 Source Server         : Postres Local
 Source Server Type    : PostgreSQL
 Source Server Version : 130008
 Source Host           : localhost:5432
 Source Catalog        : rspaw
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130008
 File Encoding         : 65001

 Date: 26/06/2024 11:23:15
*/


-- ----------------------------
-- Table structure for ref_pasien
-- ----------------------------
DROP TABLE IF EXISTS "public"."ref_pasien";
CREATE TABLE "public"."ref_pasien" (
  "id" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT uuid(),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "nik" varchar(255) COLLATE "pg_catalog"."default",
  "kota" varchar(255) COLLATE "pg_catalog"."default",
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "bpjs" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "updated_at" timestamp(6)
)
;
ALTER TABLE "public"."ref_pasien" OWNER TO "postgres";

-- ----------------------------
-- Records of ref_pasien
-- ----------------------------
BEGIN;
INSERT INTO "public"."ref_pasien" VALUES ('5efbb202-c49e-454e-bb86-d2ac6a5d930e', 'OK', 'oko', 'kok', 'dsa', 'UMUM', '12', NULL, NULL);
INSERT INTO "public"."ref_pasien" VALUES ('6b19e03f-96ff-4d81-a7b6-80f1f7cc3434', 'KK Edit', 'Kk', 'KK', NULL, 'UMUM', '3213', NULL, NULL);
COMMIT;

-- ----------------------------
-- Function structure for uuid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid"();
CREATE OR REPLACE FUNCTION "public"."uuid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;
ALTER FUNCTION "public"."uuid"() OWNER TO "postgres";

-- ----------------------------
-- Primary Key structure for table ref_pasien
-- ----------------------------
ALTER TABLE "public"."ref_pasien" ADD CONSTRAINT "ref_pasien_pkey" PRIMARY KEY ("id");
