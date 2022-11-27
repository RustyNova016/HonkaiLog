create table "public"."Materials" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null default ''::text,
    "createdAt" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "updatedAt" timestamp with time zone default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."Materials" enable row level security;

CREATE UNIQUE INDEX "Materials_pkey" ON public."Materials" USING btree (id);

alter table "public"."Materials" add constraint "Materials_pkey" PRIMARY KEY using index "Materials_pkey";


