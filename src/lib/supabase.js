import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create Supabase client - will be null if env vars not configured
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// ============================
// PORTFOLIO IMAGE OPERATIONS
// ============================

/**
 * Fetch all portfolio images, ordered newest first
 */
export async function getPortfolioImages() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('portfolio_images')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching portfolio images:', error)
    return []
  }
  return data || []
}

/**
 * Add a new portfolio image
 */
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

/**
 * Delete a portfolio image by ID
 */
export async function deletePortfolioImage(id) {
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('portfolio_images')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * Delete all portfolio images
 */
export async function clearAllPortfolioImages() {
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('portfolio_images')
    .delete()
    .neq('id', 0) // delete all rows

  if (error) throw error
}

/**
 * Upload an image file to Supabase Storage bucket "portfolio"
 */
export async function uploadPortfolioFile(file) {
  if (!supabase) throw new Error('Supabase not configured')

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(fileName, file)

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from('portfolio')
    .getPublicUrl(data.path)

  return urlData.publicUrl
}
