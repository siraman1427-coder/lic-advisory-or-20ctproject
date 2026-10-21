export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18";
  };
  public: {
    Tables: {
      inquiries: {
        Row: {
          communication_channel: string | null;
          created_at: string;
          email: string | null;
          full_name: string;
          id: string;
          metadata: Json | null;
          notes: string | null;
          objective: string | null;
          phone: string;
          source_page: string | null;
          status: string;
        };
        Insert: {
          communication_channel?: string | null;
          created_at?: string;
          email?: string | null;
          full_name: string;
          id?: string;
          metadata?: Json | null;
          notes?: string | null;
          objective?: string | null;
          phone: string;
          source_page?: string | null;
          status?: string;
        };
        Update: {
          communication_channel?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string;
          id?: string;
          metadata?: Json | null;
          notes?: string | null;
          objective?: string | null;
          phone?: string;
          source_page?: string | null;
          status?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];
export type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];
