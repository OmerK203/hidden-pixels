import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zrrsbcczhpixsruwbzrc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycnNiY2N6aHBpeHNydXdienJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2ODA4NTYsImV4cCI6MjA2MDI1Njg1Nn0.tI8zbG5y5qNKW-PnP6jDM2a89JcPU1E_hJVUl6S-bvI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
