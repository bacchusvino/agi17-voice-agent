create sequence "public"."hello_world_id_seq";

create table "public"."hello_world" (
    "id" integer not null default nextval('hello_world_id_seq'::regclass),
    "msg" text
);


alter sequence "public"."hello_world_id_seq" owned by "public"."hello_world"."id";

CREATE UNIQUE INDEX hello_world_pkey ON public.hello_world USING btree (id);

alter table "public"."hello_world" add constraint "hello_world_pkey" PRIMARY KEY using index "hello_world_pkey";

grant delete on table "public"."hello_world" to "anon";

grant insert on table "public"."hello_world" to "anon";

grant references on table "public"."hello_world" to "anon";

grant select on table "public"."hello_world" to "anon";

grant trigger on table "public"."hello_world" to "anon";

grant truncate on table "public"."hello_world" to "anon";

grant update on table "public"."hello_world" to "anon";

grant delete on table "public"."hello_world" to "authenticated";

grant insert on table "public"."hello_world" to "authenticated";

grant references on table "public"."hello_world" to "authenticated";

grant select on table "public"."hello_world" to "authenticated";

grant trigger on table "public"."hello_world" to "authenticated";

grant truncate on table "public"."hello_world" to "authenticated";

grant update on table "public"."hello_world" to "authenticated";

grant delete on table "public"."hello_world" to "service_role";

grant insert on table "public"."hello_world" to "service_role";

grant references on table "public"."hello_world" to "service_role";

grant select on table "public"."hello_world" to "service_role";

grant trigger on table "public"."hello_world" to "service_role";

grant truncate on table "public"."hello_world" to "service_role";

grant update on table "public"."hello_world" to "service_role";


