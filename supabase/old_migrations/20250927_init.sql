-- sanity migration: creates a tiny table we can drop later
create table if not exists public.ci_healthcheck (
  id bigserial primary key,
  note text not null default 'init',
  created_at timestamptz not null default now()
);

-- leads table for capturing form submissions
create table if not exists public.leads (
  id bigserial primary key,
  name text not null,
  email text not null,
  phone text,
  source text default 'landing_page',
  status text default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- enable RLS (Row Level Security)
alter table public.leads enable row level security;

-- create policy to allow inserts from authenticated users
create policy "Allow public inserts" on public.leads
  for insert with check (true);

-- create policy to allow reads for authenticated users
create policy "Allow authenticated reads" on public.leads
  for select using (auth.role() = 'authenticated');

-- create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_leads_updated_at
  before update on public.leads
  for each row execute procedure public.handle_updated_at();
