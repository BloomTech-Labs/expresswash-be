--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: cahaug
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO cahaug;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: cahaug
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO cahaug;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cahaug
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: cahaug
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO cahaug;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: cahaug
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO cahaug;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cahaug
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: users; Type: TABLE; Schema: public; Owner: cahaug
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "accountType" text,
    email text,
    password text,
    "firstName" text,
    "lastName" text,
    "phoneNumber" text,
    "stripeUUID" text,
    "streetAddress" text,
    "streetAddress2" text,
    city text,
    state text,
    zip text,
    "workStatus" text,
    "profilePicture" text,
    "creationDate" text
);


ALTER TABLE public.users OWNER TO cahaug;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: cahaug
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO cahaug;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cahaug
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: cahaug
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: cahaug
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: cahaug
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: cahaug
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
2	20191217191729_create-users-table-pg.js	1	2019-12-17 19:44:02.652-07
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: cahaug
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cahaug
--

COPY public.users (id, "accountType", email, password, "firstName", "lastName", "phoneNumber", "stripeUUID", "streetAddress", "streetAddress2", city, state, zip, "workStatus", "profilePicture", "creationDate") FROM stdin;
1	client	testClient@test.com	1234	Test	Client	123-456-7890	asdfghjkl01234	1051 Test St	APT 2	San Francisco	California	94103	false	fake1.jpg	Born Yesterday
2	washer	testWasher@test.com	1234	Test	Washer	123-456-7891	asdfghjkl01234	1052 Test St	APT 3	San Francisco	California	94103	true	fake2.jpg	Born Yesterday
3	client	testClient@test.com	$2a$10$Tp9U0wzR01Sr/VIxlSK00.NXV5jToehmOu2OTywX8ndx0FxB0I7n2	Test	Client	123-456-7890	\N	1051 Test St	APT 2	San Francisco	California	94103	\N	\N	2019-12-18T13:20:27.300-07:00
4	client	testClient@test.comm	$2a$10$hDOT8pqTETTCAx.dfa3rweum8EJrj.mFLNySmZfsGcVxSQ0Q660XK	Test	Client	123-456-7890	\N	1051 Test St	APT 2	San Francisco	California	94103	\N	\N	2019-12-18T13:20:47.067-07:00
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cahaug
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 2, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: cahaug
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cahaug
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: cahaug
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: cahaug
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cahaug
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

