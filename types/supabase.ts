export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      CollaboratorWatchlist: {
        Row: {
          user_id: string
          watchlist_id: string
        }
        Insert: {
          user_id: string
          watchlist_id: string
        }
        Update: {
          user_id?: string
          watchlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_CollaboratorWatchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["auth_user_id"]
          },
          {
            foreignKeyName: "public_CollaboratorWatchlist_watchlist_id_fkey"
            columns: ["watchlist_id"]
            isOneToOne: false
            referencedRelation: "Watchlists"
            referencedColumns: ["id"]
          },
        ]
      }
      FollowerWatchlist: {
        Row: {
          user_id: string
          watchlist_id: string
        }
        Insert: {
          user_id: string
          watchlist_id: string
        }
        Update: {
          user_id?: string
          watchlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_UserFollowWatchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["auth_user_id"]
          },
          {
            foreignKeyName: "public_UserFollowWatchlist_watchlist_id_fkey"
            columns: ["watchlist_id"]
            isOneToOne: false
            referencedRelation: "Watchlists"
            referencedColumns: ["id"]
          },
        ]
      }
      Medias: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      Users: {
        Row: {
          auth_user_id: string
          profilePic: string | null
          username: string
        }
        Insert: {
          auth_user_id: string
          profilePic?: string | null
          username: string
        }
        Update: {
          auth_user_id?: string
          profilePic?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Users_auth_user_id_fkey"
            columns: ["auth_user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      WatchedMedia: {
        Row: {
          media_id: string
          user_id: string
        }
        Insert: {
          media_id: string
          user_id: string
        }
        Update: {
          media_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_WatchedMedia_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "Medias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_WatchedMedia_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["auth_user_id"]
          },
        ]
      }
      WatchlistMedia: {
        Row: {
          media_id: string
          watchlist_id: string
        }
        Insert: {
          media_id: string
          watchlist_id: string
        }
        Update: {
          media_id?: string
          watchlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_WatchlistMedia_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "Medias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_WatchlistMedia_watchlist_id_fkey"
            columns: ["watchlist_id"]
            isOneToOne: false
            referencedRelation: "Watchlists"
            referencedColumns: ["id"]
          },
        ]
      }
      Watchlists: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          picture: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          picture: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          picture?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Watchlists_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["auth_user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
