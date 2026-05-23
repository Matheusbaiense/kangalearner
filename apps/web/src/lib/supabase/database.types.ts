// Auto-generated via Supabase MCP — project: kangalearner-prod (olgogtaeifyxwzencilo)
// Last regenerated: 2026-05-22 (Sprint 11 — welcome_sent_at on profiles; full schema retained)
// Regenerate: npx supabase gen types typescript --project-id olgogtaeifyxwzencilo --schema public

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      mock_sessions: {
        Row: {
          answers: Json;
          completed_at: string;
          country: string;
          id: string;
          mode: string;
          passed: boolean;
          percent: number | null;
          score: number;
          source: string;
          state: string;
          time_seconds: number | null;
          total: number;
          user_id: string;
          weak_categories: Json | null;
        };
        Insert: {
          answers?: Json;
          completed_at?: string;
          country?: string;
          id?: number;
          mode: string;
          passed: boolean;
          percent?: number | null;
          score: number;
          source?: string;
          state: string;
          time_seconds?: number | null;
          total: number;
          user_id: string;
          weak_categories?: Json | null;
        };
        Update: {
          answers?: Json;
          completed_at?: string;
          country?: string;
          id?: number;
          mode?: string;
          passed?: boolean;
          percent?: number | null;
          score?: number;
          source?: string;
          state?: string;
          time_seconds?: number | null;
          total?: number;
          user_id?: string;
          weak_categories?: Json | null;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          email: string;
          id: string;
          source: string | null;
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          email: string;
          id?: string;
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          email?: string;
          id?: string;
          source?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          country: string;
          created_at: string;
          deleted_at: string | null;
          display_name: string | null;
          email: string | null;
          id: string;
          lang: string;
          name: string | null;
          onboarding_done: boolean;
          preferred_lang: string;
          preferred_state: string;
          role: string;
          stripe_customer_id: string | null;
          updated_at: string;
          welcome_sent_at: string | null;
          last_sign_in_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          country?: string;
          created_at?: string;
          deleted_at?: string | null;
          display_name?: string | null;
          email?: string | null;
          id: string;
          lang?: string;
          name?: string | null;
          onboarding_done?: boolean;
          preferred_lang?: string;
          preferred_state?: string;
          role?: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
          welcome_sent_at?: string | null;
          last_sign_in_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          country?: string;
          created_at?: string;
          deleted_at?: string | null;
          display_name?: string | null;
          email?: string | null;
          id?: string;
          lang?: string;
          name?: string | null;
          onboarding_done?: boolean;
          preferred_lang?: string;
          preferred_state?: string;
          role?: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
          welcome_sent_at?: string | null;
          last_sign_in_at?: string | null;
        };
        Relationships: [];
      };
      question_attempts: {
        Row: {
          answered_at: string;
          attempt_id: string;
          category: string | null;
          chosen: string | null;
          country: string;
          id: string;
          is_correct: boolean;
          question_id: string;
          source: string;
          state: string;
          user_id: string;
        };
        Insert: {
          answered_at?: string;
          attempt_id: string;
          category?: string | null;
          chosen?: string | null;
          country?: string;
          id?: string;
          is_correct: boolean;
          question_id: string;
          source?: string;
          state: string;
          user_id: string;
        };
        Update: {
          answered_at?: string;
          attempt_id?: string;
          category?: string | null;
          chosen?: string | null;
          country?: string;
          id?: string;
          is_correct?: boolean;
          question_id?: string;
          source?: string;
          state?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          student_id: string | null;
          instructor_id: string | null;
          country: string;
          state: string;
          scheduled_at: string;
          duration_minutes: number;
          status: string;
          amount_cents: number | null;
          currency: string;
          stripe_payment_intent_id: string | null;
          stripe_transfer_id: string | null;
          notes_student: string | null;
          notes_instructor: string | null;
          cancelled_by: string | null;
          cancel_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id?: string | null;
          instructor_id?: string | null;
          country: string;
          state: string;
          scheduled_at: string;
          duration_minutes?: number;
          status?: string;
          amount_cents?: number | null;
          currency?: string;
          stripe_payment_intent_id?: string | null;
          stripe_transfer_id?: string | null;
          notes_student?: string | null;
          notes_instructor?: string | null;
          cancelled_by?: string | null;
          cancel_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          student_id?: string | null;
          instructor_id?: string | null;
          country?: string;
          state?: string;
          scheduled_at?: string;
          duration_minutes?: number;
          status?: string;
          amount_cents?: number | null;
          currency?: string;
          stripe_payment_intent_id?: string | null;
          stripe_transfer_id?: string | null;
          notes_student?: string | null;
          notes_instructor?: string | null;
          cancelled_by?: string | null;
          cancel_reason?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      instructor_reviews: {
        Row: {
          id: string;
          booking_id: string | null;
          student_id: string | null;
          instructor_id: string | null;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id?: string | null;
          student_id?: string | null;
          instructor_id?: string | null;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          booking_id?: string | null;
          student_id?: string | null;
          instructor_id?: string | null;
          rating?: number;
          comment?: string | null;
        };
        Relationships: [];
      };
      instructors: {
        Row: {
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
        Insert: {
          id?: string;
          user_id: string;
          country: string;
          state: string;
          license_number?: string | null;
          license_verified?: boolean;
          background_check_passed?: boolean;
          bio?: Json | null;
          specialties?: Json | null;
          languages_spoken?: Json | null;
          hourly_rate_cents?: number | null;
          currency?: string;
          stripe_account_id?: string | null;
          is_active?: boolean;
          rating_avg?: number | null;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          country?: string;
          state?: string;
          license_number?: string | null;
          license_verified?: boolean;
          background_check_passed?: boolean;
          bio?: Json | null;
          specialties?: Json | null;
          languages_spoken?: Json | null;
          hourly_rate_cents?: number | null;
          currency?: string;
          stripe_account_id?: string | null;
          is_active?: boolean;
          rating_avg?: number | null;
          rating_count?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      marketplace_waitlist: {
        Row: {
          id: string;
          email: string;
          country: string;
          state: string | null;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          country?: string;
          state?: string | null;
          role?: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          country?: string;
          state?: string | null;
          role?: string;
        };
        Relationships: [];
      };
      saved_questions: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          country: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          country?: string;
          created_at?: string;
        };
        Update: {
          question_id?: string;
          country?: string;
        };
        Relationships: [];
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_key: string;
          earned_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_key: string;
          earned_at?: string;
        };
        Update: {
          badge_key?: string;
          earned_at?: string;
        };
        Relationships: [];
      };
      user_category_stats: {
        Row: {
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
        Insert: {
          id?: string;
          user_id: string;
          country?: string;
          state: string;
          category: string;
          total_attempts?: number;
          correct_attempts?: number;
          last_attempt_at?: string | null;
          updated_at?: string;
        };
        Update: {
          total_attempts?: number;
          correct_attempts?: number;
          last_attempt_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_xp: {
        Row: {
          id: string;
          user_id: string;
          total_xp: number;
          level: string;
          streak_days: number;
          last_activity_date: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_xp?: number;
          level?: string;
          streak_days?: number;
          last_activity_date?: string | null;
          updated_at?: string;
        };
        Update: {
          total_xp?: number;
          level?: string;
          streak_days?: number;
          last_activity_date?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      xp_events: {
        Row: {
          id: string;
          user_id: string;
          event_type: string;
          xp_earned: number;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type: string;
          xp_earned: number;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          event_type?: string;
          xp_earned?: number;
          metadata?: Json | null;
        };
        Relationships: [];
      };
      user_settings: {
        Row: {
          created_at: string;
          daily_goal: number;
          notifications_enabled: boolean;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          daily_goal?: number;
          notifications_enabled?: boolean;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          daily_goal?: number;
          notifications_enabled?: boolean;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_active_users_count: { Args: { since_ts: string }; Returns: number };
      get_country_breakdown: {
        Args: { limit_n?: number };
        Returns: {
          cnt: number;
          country: string;
        }[];
      };
      get_pass_rate: { Args: { since_ts: string }; Returns: number };
      get_role_breakdown: {
        Args: never;
        Returns: {
          cnt: number;
          role: string;
        }[];
      };
      get_signups_per_day: {
        Args: { since_ts: string };
        Returns: {
          cnt: number;
          day: string;
        }[];
      };
      get_top_categories: {
        Args: { limit_n?: number; since_ts: string };
        Returns: {
          category: string;
          cnt: number;
        }[];
      };
      is_admin: { Args: never; Returns: boolean };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {}
  }
} as const;
