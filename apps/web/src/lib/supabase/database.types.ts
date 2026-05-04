// Regenerate when schema changes (Dashboard → Settings → General → Project ID):
//   npx supabase gen types typescript --project-id <PROJECT_REF> --schema public \
//     > apps/web/src/lib/supabase/database.types.ts
//
// Manual types aligned with supabase/migrations/*.sql

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type UserRole = "student" | "instructor" | "admin";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "disputed";
export type MockMode = "practice" | "exam";

export type ProfilesRow = {
  id: string;
  role: UserRole;
  display_name: string | null;
  avatar_url: string | null;
  country: string;
  state: string | null;
  lang: string;
  stripe_customer_id: string | null;
  onboarding_done: boolean;
  created_at: string;
  updated_at: string;
};

export type ProfilesInsert = {
  id: string;
  role?: UserRole;
  display_name?: string | null;
  avatar_url?: string | null;
  country?: string;
  state?: string | null;
  lang?: string;
  stripe_customer_id?: string | null;
  onboarding_done?: boolean;
};

/** Campos mutáveis em `profiles` (alinha com tipos gerados do Supabase). */
export type ProfilesUpdate = Partial<
  Omit<ProfilesRow, "id" | "created_at" | "updated_at">
> & { id?: string };

export type QuestionAttemptsRow = {
  id: string;
  attempt_id: string;
  user_id: string;
  question_id: string;
  country: string;
  state: string;
  category: string | null;
  is_correct: boolean;
  chosen: string | null;
  source: string | null;
  created_at: string;
};

export type QuestionAttemptsInsert = {
  attempt_id: string;
  user_id: string;
  question_id: string;
  country?: string;
  state: string;
  category?: string | null;
  is_correct: boolean;
  chosen?: string | null;
  source?: string | null;
};

export type QuestionAttemptsUpdate = Partial<QuestionAttemptsInsert>;

export type MockSessionsRow = {
  id: string;
  user_id: string;
  country: string;
  state: string;
  mode: MockMode;
  score: number;
  total: number;
  pct: number;
  passed: boolean;
  time_seconds: number | null;
  answers: Json;
  weak_categories: Json | null;
  source: string | null;
  created_at: string;
};

export type MockSessionsInsert = {
  user_id: string;
  country?: string;
  state: string;
  mode: MockMode;
  score: number;
  total: number;
  passed: boolean;
  time_seconds?: number | null;
  answers?: Json;
  weak_categories?: Json | null;
  source?: string | null;
};

export type UserCategoryStatsRow = {
  id: string;
  user_id: string;
  country: string;
  state: string;
  category: string;
  total_attempts: number;
  correct_attempts: number;
  last_attempt_at: string | null;
  updated_at: string;
};

export type UserCategoryStatsInsert = {
  user_id: string;
  country?: string;
  state: string;
  category: string;
  total_attempts?: number;
  correct_attempts?: number;
  last_attempt_at?: string | null;
};

export type UserCategoryStatsUpdate = Partial<Omit<UserCategoryStatsInsert, "user_id">>;

export type UserXpRow = {
  id: string;
  user_id: string;
  total_xp: number;
  level: string;
  streak_days: number;
  last_activity_date: string | null;
  updated_at: string;
};

export type UserXpInsert = {
  user_id: string;
  total_xp?: number;
  level?: string;
  streak_days?: number;
  last_activity_date?: string | null;
};

export type UserXpUpdate = Partial<Omit<UserXpInsert, "user_id">>;

export type XpEventsRow = {
  id: string;
  user_id: string;
  event_type: string;
  xp_earned: number;
  metadata: Json | null;
  created_at: string;
};

export type XpEventsInsert = {
  user_id: string;
  event_type: string;
  xp_earned: number;
  metadata?: Json | null;
};

export type UserBadgesRow = {
  id: string;
  user_id: string;
  badge_key: string;
  earned_at: string;
};

export type UserBadgesInsert = {
  user_id: string;
  badge_key: string;
};

export type SavedQuestionsRow = {
  id: string;
  user_id: string;
  question_id: string;
  country: string;
  created_at: string;
};

export type SavedQuestionsInsert = {
  user_id: string;
  question_id: string;
  country?: string;
};

export type MarketplaceWaitlistRow = {
  id: string;
  email: string;
  country: string;
  state: string | null;
  role: "student" | "instructor";
  created_at: string;
};

export type MarketplaceWaitlistInsert = {
  email: string;
  country?: string;
  state?: string | null;
  role?: "student" | "instructor";
};

export type InstructorsRow = {
  id: string;
  user_id: string;
  country: string;
  state: string;
  license_number: string | null;
  license_verified: boolean;
  background_check_passed: boolean;
  bio: Json | null;
  specialties: Json | null;
  languages_spoken: Json | null;
  hourly_rate_cents: number | null;
  currency: string;
  stripe_account_id: string | null;
  is_active: boolean;
  rating_avg: number | null;
  rating_count: number;
  created_at: string;
  updated_at: string;
};

export type BookingsRow = {
  id: string;
  student_id: string | null;
  instructor_id: string | null;
  country: string;
  state: string;
  scheduled_at: string;
  duration_minutes: number;
  status: BookingStatus;
  amount_cents: number | null;
  currency: string;
  stripe_payment_intent_id: string | null;
  stripe_transfer_id: string | null;
  notes_student: string | null;
  notes_instructor: string | null;
  cancelled_by: "student" | "instructor" | "admin" | null;
  cancel_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type InstructorReviewsRow = {
  id: string;
  booking_id: string | null;
  student_id: string | null;
  instructor_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfilesRow;
        Insert: ProfilesInsert;
        Update: ProfilesUpdate;
        Relationships: [];
      };
      question_attempts: {
        Row: QuestionAttemptsRow;
        Insert: QuestionAttemptsInsert;
        Update: QuestionAttemptsUpdate;
        Relationships: [];
      };
      mock_sessions: {
        Row: MockSessionsRow;
        Insert: MockSessionsInsert;
        Update: never;
        Relationships: [];
      };
      user_category_stats: {
        Row: UserCategoryStatsRow;
        Insert: UserCategoryStatsInsert;
        Update: UserCategoryStatsUpdate;
        Relationships: [];
      };
      user_xp: {
        Row: UserXpRow;
        Insert: UserXpInsert;
        Update: UserXpUpdate;
        Relationships: [];
      };
      xp_events: {
        Row: XpEventsRow;
        Insert: XpEventsInsert;
        Update: Partial<XpEventsInsert>;
        Relationships: [];
      };
      user_badges: {
        Row: UserBadgesRow;
        Insert: UserBadgesInsert;
        Update: never;
        Relationships: [];
      };
      saved_questions: {
        Row: SavedQuestionsRow;
        Insert: SavedQuestionsInsert;
        Update: never;
        Relationships: [];
      };
      marketplace_waitlist: {
        Row: MarketplaceWaitlistRow;
        Insert: MarketplaceWaitlistInsert;
        Update: never;
        Relationships: [];
      };
      instructors: {
        Row: InstructorsRow;
        Insert: Partial<InstructorsRow> & { user_id: string; country: string; state: string };
        Update: Partial<Omit<InstructorsRow, "id" | "user_id">>;
        Relationships: [];
      };
      bookings: {
        Row: BookingsRow;
        Insert: Partial<BookingsRow> & { country: string; state: string; scheduled_at: string };
        Update: Partial<Omit<BookingsRow, "id">>;
        Relationships: [];
      };
      instructor_reviews: {
        Row: InstructorReviewsRow;
        Insert: Partial<InstructorReviewsRow> & { rating: number };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      upsert_category_stat: {
        Args: {
          p_user_id: string;
          p_country: string;
          p_state: string;
          p_category: string;
          p_is_correct: boolean;
        };
        Returns: void;
      };
      xp_to_level: {
        Args: { p_xp: number };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
