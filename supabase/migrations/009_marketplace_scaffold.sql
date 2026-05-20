-- Migration 009: marketplace scaffold (schema only — no UI yet)

create table if not exists instructors (
  id                       uuid        primary key default gen_random_uuid(),
  user_id                  uuid        unique not null references auth.users(id) on delete cascade,
  country                  varchar(2)  not null,
  state                    varchar(10) not null,
  license_number           varchar(100),
  license_verified         boolean     not null default false,
  background_check_passed  boolean     not null default false,
  bio                      jsonb,
  specialties              jsonb,
  languages_spoken         jsonb,
  hourly_rate_cents        int,
  currency                 varchar(3)  not null default 'AUD',
  stripe_account_id        varchar(100),
  is_active                boolean     not null default false,
  rating_avg               numeric(3, 2),
  rating_count             int         not null default 0,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

drop trigger if exists instructors_updated_at on instructors;
create trigger instructors_updated_at
  before update on instructors
  for each row execute function update_updated_at();

create index if not exists idx_instructors_country_state
  on instructors(country, state)
  where is_active = true;

create table if not exists bookings (
  id                       uuid        primary key default gen_random_uuid(),
  student_id               uuid        references auth.users(id),
  instructor_id            uuid        references instructors(id),
  country                  varchar(2)  not null,
  state                    varchar(10) not null,
  scheduled_at             timestamptz not null,
  duration_minutes         int         not null default 60,
  status                   varchar(20) not null default 'pending'
                             check (status in
                               ('pending', 'confirmed', 'cancelled', 'completed', 'disputed')),
  amount_cents             int,
  currency                 varchar(3)  not null default 'AUD',
  stripe_payment_intent_id varchar(100),
  stripe_transfer_id       varchar(100),
  notes_student            text,
  notes_instructor         text,
  cancelled_by             varchar(20)
                             check (cancelled_by in ('student', 'instructor', 'admin')),
  cancel_reason            text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

drop trigger if exists bookings_updated_at on bookings;
create trigger bookings_updated_at
  before update on bookings
  for each row execute function update_updated_at();

create index if not exists idx_bookings_student
  on bookings(student_id, scheduled_at desc);
create index if not exists idx_bookings_instructor
  on bookings(instructor_id, scheduled_at desc);

create table if not exists instructor_reviews (
  id            uuid        primary key default gen_random_uuid(),
  booking_id    uuid        unique references bookings(id),
  student_id    uuid        references auth.users(id),
  instructor_id uuid        references instructors(id),
  rating        int         not null check (rating between 1 and 5),
  comment       text,
  created_at    timestamptz not null default now()
);

create index if not exists idx_reviews_instructor
  on instructor_reviews(instructor_id, created_at desc);

create table if not exists marketplace_waitlist (
  id         uuid        primary key default gen_random_uuid(),
  email      varchar(255) not null,
  country    varchar(2)  not null default 'AU',
  state      varchar(10),
  role       varchar(20)  not null default 'student'
               check (role in ('student', 'instructor')),
  created_at timestamptz not null default now(),
  unique(email, role)
);

alter table instructors          enable row level security;
alter table bookings             enable row level security;
alter table instructor_reviews   enable row level security;
alter table marketplace_waitlist enable row level security;

drop policy if exists "instructors: read active" on instructors;
drop policy if exists "instructors: own write" on instructors;
drop policy if exists "bookings: student own" on bookings;
drop policy if exists "bookings: instructor own" on bookings;
drop policy if exists "reviews: read all" on instructor_reviews;
drop policy if exists "reviews: student insert" on instructor_reviews;
drop policy if exists "waitlist: insert" on marketplace_waitlist;

create policy "instructors: read active"
  on instructors for select
  using (is_active = true);

create policy "instructors: own write"
  on instructors for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "bookings: student own"
  on bookings for all
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

create policy "bookings: instructor own"
  on bookings for select
  using (
    auth.uid() = (select i.user_id from instructors i where i.id = instructor_id)
  );

create policy "reviews: read all"
  on instructor_reviews for select using (true);

create policy "reviews: student insert"
  on instructor_reviews for insert
  with check (auth.uid() = student_id);

create policy "waitlist: insert"
  on marketplace_waitlist for insert
  with check (
    email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
