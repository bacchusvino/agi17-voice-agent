-- sanity migration: creates a tiny table we can drop later
create table if not exists public.ci_healthcheck (
  id bigserial primary key,
  note text not null default 'init',
  created_at timestamptz not null default now()
);
