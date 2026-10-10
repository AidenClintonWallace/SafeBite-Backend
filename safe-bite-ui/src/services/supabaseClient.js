import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace these with your actual Supabase URL and Anon Key from your Supabase Project Settings
const SUPABASE_URL = 'https://eenjfjjanblhdrqtwfab.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbmpmamphbmJsaGRycXR3ZmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MzE2NDQsImV4cCI6MjEwNjAwNzY0NH0.IDnAdFImJSC6r39lG4nLuTQPfHUwGxD7XfZyHgVR6iI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});