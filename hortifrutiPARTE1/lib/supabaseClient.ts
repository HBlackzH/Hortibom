// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://muwqotdzzsiyuikqlocx.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11d3FvdGR6enNpeXVpa3Fsb2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNjQxMDQsImV4cCI6MjA2NDY0MDEwNH0.Qaoea4kT7PtypeOj5gY8CWEs1FArPbSSR4Gki-bq7IQ'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
