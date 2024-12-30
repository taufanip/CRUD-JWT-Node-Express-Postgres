-- Table Definition
CREATE TABLE "public"."banners" (
    "id" int4 NOT NULL DEFAULT nextval('banners_id_seq'::regclass),
    "banner_name" varchar(30) NOT NULL,
    "banner_image" varchar(100) NOT NULL,
    "description" varchar(50) NOT NULL,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."services" (
    "serviceid" int4 NOT NULL DEFAULT nextval('services_serviceid_seq'::regclass),
    "service_code" varchar(30) NOT NULL,
    "service_name" varchar(50) NOT NULL,
    "service_icon" varchar(100) NOT NULL,
    "service_fee" int4 NOT NULL,
    PRIMARY KEY ("serviceid")
);

-- Table Definition
CREATE TABLE "public"."transaction" (
    "transid" int4 NOT NULL DEFAULT nextval('transaction_transid_seq'::regclass),
    "invoice_number" varchar(30) NOT NULL,
    "service_code" varchar(50),
    "service_name" varchar(50),
    "transaction_type" varchar(50) NOT NULL,
    "total_amount" int4 NOT NULL,
    "created_on" timestamp NOT NULL,
    PRIMARY KEY ("transid")
);

-- Table Definition
CREATE TABLE "public"."transaction_history" (
    "id" int4 NOT NULL DEFAULT nextval('transaction_history_id_seq'::regclass),
    "email" varchar(50) NOT NULL,
    "invoice_number" varchar(30) NOT NULL,
    "description" varchar(100) NOT NULL,
    "transaction_type" varchar(50) NOT NULL,
    "total_amount" int4 NOT NULL,
    "created_on" varchar(100) NOT NULL,
    PRIMARY KEY ("id")
);

-- Table Definition
CREATE TABLE "public"."users" (
    "userid" int4 NOT NULL DEFAULT nextval('users_userid_seq'::regclass),
    "email" varchar(30) NOT NULL,
    "password" varchar(255) NOT NULL,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(30) NOT NULL,
    "profile_image" varchar(50),
    "balance" int4 NOT NULL DEFAULT 0,
    "registered_at" varchar(100) NOT NULL,
    PRIMARY KEY ("userid")
);

INSERT INTO "public"."users" ("userid", "email", "password", "first_name", "last_name", "profile_image", "balance", "registered_at") VALUES
(40, 'testuser2@gmail.com', '$2a$10$PnI5iwYFRr.Ya3KVHspUFOMxYWDgPdcqF/PuO6SFjt71GSL9C2/CC', 'User', 'Dua', NULL, 0, '2024-12-30T11:16:47.156Z');
INSERT INTO "public"."users" ("userid", "email", "password", "first_name", "last_name", "profile_image", "balance", "registered_at") VALUES
(41, 'testuser2gmail.com', '$2a$10$kOeBv84gVR1iE.okEPnhruhNofCoFfA3jXJeGVx/aFc7LCn0oEQ3e', 'User', 'Dua', NULL, 0, '2024-12-30T11:17:40.303Z');
INSERT INTO "public"."users" ("userid", "email", "password", "first_name", "last_name", "profile_image", "balance", "registered_at") VALUES
(39, 'testuser1@gmail.com', '$2a$10$IGgXmHUPkC5xlFCSh6SH.OGpQMT11zQhl93YF9h/UbdKbuzGA/.Xa', 'Bang', 'Soto', NULL, 330000, '2024-12-30T11:14:44.933Z');


