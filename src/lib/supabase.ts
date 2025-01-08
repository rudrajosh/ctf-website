import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || 'https://qxqzqzbijhutfgppuavd.supabase.co',
  supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cXpxemJpamh1dGZncHB1YXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMzkxODcsImV4cCI6MjA1MTkxNTE4N30.iR9wriq-ZxVUzOxq4JhlJZPJTzmvb-65-X88jFCyxcE'
);