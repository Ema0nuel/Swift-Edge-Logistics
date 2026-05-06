import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pyslfvzwcmigrryoakpc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5c2xmdnp3Y21pZ3JyeW9ha3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjYzOTAsImV4cCI6MjA2ODUwMjM5MH0.Jlb4N79HMFRgnuWcsp7FtgTNB0WQ1Lzb4NIEh79jnJs";
export const supabase = createClient(supabaseUrl, supabaseKey);