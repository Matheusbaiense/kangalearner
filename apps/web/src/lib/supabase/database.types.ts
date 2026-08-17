// Auto-generated from the Supabase schema (public).
// Intended schema is migrations 001–033. Apply 031–033 on staging before prod.
// Regenerate (project id from env, never hardcoded — see SEC-1):
//   supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" > src/lib/supabase/database.types.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      blog_reactions: {
        Row: {
          created_at: string;
          id: string;
          reaction: string;
          slug: string;
          visitor_hash: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          reaction: string;
          slug: string;
          visitor_hash: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          reaction?: string;
          slug?: string;
          visitor_hash?: string;
        };
        Relationships: [];
      };
      mock_sessions: {
        Row: {
          answers: Json;
          completed_at: string;
          country: string;
          id: number;
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
          last_sign_in_at: string | null;
          name: string | null;
          onboarding_done: boolean;
          preferred_lang: string;
          preferred_state: string;
          role: string;
          stripe_customer_id: string | null;
          updated_at: string;
          welcome_sent_at: string | null;
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
          last_sign_in_at?: string | null;
          name?: string | null;
          onboarding_done?: boolean;
          preferred_lang?: string;
          preferred_state?: string;
          role?: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
          welcome_sent_at?: string | null;
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
          last_sign_in_at?: string | null;
          name?: string | null;
          onboarding_done?: boolean;
          preferred_lang?: string;
          preferred_state?: string;
          role?: string;
          stripe_customer_id?: string | null;
          updated_at?: string;
          welcome_sent_at?: string | null;
        };
        Relationships: [];
      };
      question_attempts: {
        Row: {
          answered_at: string;
          attempt_id: string;
          category: string | null;
          chosen: string | null;
          id: number;
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
          id?: number;
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
          id?: number;
          is_correct?: boolean;
          question_id?: string;
          source?: string;
          state?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      saved_questions: {
        Row: {
          country: string;
          created_at: string;
          id: string;
          question_id: string;
          user_id: string;
        };
        Insert: {
          country?: string;
          created_at?: string;
          id?: string;
          question_id: string;
          user_id: string;
        };
        Update: {
          country?: string;
          created_at?: string;
          id?: string;
          question_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      stripe_webhook_events: {
        Row: {
          event_id: string;
          event_type: string;
          processed_at: string;
        };
        Insert: {
          event_id: string;
          event_type: string;
          processed_at?: string;
        };
        Update: {
          event_id?: string;
          event_type?: string;
          processed_at?: string;
        };
        Relationships: [];
      };
      user_category_stats: {
        Row: {
          category: string;
          correct_attempts: number;
          country: string;
          id: string;
          last_attempt_at: string | null;
          state: string;
          total_attempts: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category: string;
          correct_attempts?: number;
          country?: string;
          id?: string;
          last_attempt_at?: string | null;
          state: string;
          total_attempts?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category?: string;
          correct_attempts?: number;
          country?: string;
          id?: string;
          last_attempt_at?: string | null;
          state?: string;
          total_attempts?: number;
          updated_at?: string;
          user_id?: string;
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
      upsert_category_stat: {
        Args: {
          p_category: string;
          p_country: string;
          p_is_correct: boolean;
          p_state: string;
          p_user_id: string;
        };
        Returns: undefined;
      };
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
