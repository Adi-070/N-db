
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uvlifhmdhakmuzqzavln.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2bGlmaG1kaGFrbXV6cXphdmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDA3MjYsImV4cCI6MjA1NzUxNjcyNn0.KB2MxpQwtzsehk_O-vvJ4YXygLXFPNheGfWOdUzk_vw'
export const supabase = createClient(supabaseUrl, supabaseKey)