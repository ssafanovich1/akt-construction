import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// ============================
// AUTH
// ============================

export async function signInAdmin(email, password) {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOutAdmin() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getAdminSession() {
  if (!supabase) return null
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// ============================
// PORTFOLIO IMAGE OPERATIONS
// ============================

export async function getPortfolioImages() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('portfolio_images')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

export async function addPortfolioImage({ url, caption, project_type }) {
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('portfolio_images')
    .insert([{ url, caption, project_type }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePortfolioImage(id) {
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('portfolio_images')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function clearAllPortfolioImages() {
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('portfolio_images')
    .delete()
    .neq('id', 0)

  if (error) throw error
}

export async function uploadPortfolioFile(file) {
  if (!supabase) throw new Error('Supabase not configured')

  const ext = file.name.split('.').pop().toLowerCase()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(fileName, file, { contentType: file.type })

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from('portfolio')
    .getPublicUrl(data.path)

  return urlData.publicUrl
}

// ============================
// CONTACT LEADS
// ============================

export async function saveContactLead({ name, phone, email, projectType, message }) {
  if (!supabase) return
  await supabase
    .from('contact_leads')
    .insert([{ name, phone, email, project_type: projectType, message }])
}
