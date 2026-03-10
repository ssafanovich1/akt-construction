import { useState, useEffect } from 'react'
import { Lock, X, Trash2, ExternalLink, Plus, AlertCircle, Image, LogOut } from 'lucide-react'
import {
  supabase,
  getPortfolioImages,
  addPortfolioImage,
  deletePortfolioImage,
  clearAllPortfolioImages,
  uploadPortfolioFile,
  signInAdmin,
  signOutAdmin,
  getAdminSession,
} from '../lib/supabase'
import { PROJECT_TYPES, DEFAULT_PORTFOLIO } from '../lib/constants'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE_MB = 10

export default function AdminPanel({ isOpen, onClose }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Form fields
  const [imgUrl, setImgUrl] = useState('')
  const [imgCaption, setImgCaption] = useState('')
  const [imgType, setImgType] = useState(PROJECT_TYPES[0])
  const [imgFile, setImgFile] = useState(null)
  const [uploadMode, setUploadMode] = useState('url')

  // Check for existing Supabase Auth session on mount
  useEffect(() => {
    async function checkSession() {
      const session = await getAdminSession()
      setAuthenticated(!!session)
      setAuthLoading(false)
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (authenticated && isOpen) loadImages()
  }, [authenticated, isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function loadImages() {
    setLoading(true)
    const data = await getPortfolioImages()
    setImages(data)
    setLoading(false)
  }

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setAuthLoading(true)
    try {
      await signInAdmin(email, password)
      setAuthenticated(true)
      setPassword('')
    } catch {
      setError('Invalid email or password.')
      setTimeout(() => setError(''), 4000)
    }
    setAuthLoading(false)
  }

  async function handleLogout() {
    await signOutAdmin()
    setAuthenticated(false)
    setImages([])
    onClose()
  }

  async function handleAddImage(e) {
    e.preventDefault()
    setUploading(true)

    try {
      let finalUrl = imgUrl

      if (uploadMode === 'file' && imgFile) {
        if (!ALLOWED_MIME_TYPES.includes(imgFile.type)) {
          setError('Only JPEG, PNG, WebP, and GIF files are allowed.')
          setUploading(false)
          return
        }
        if (imgFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          setError(`File size must be under ${MAX_FILE_SIZE_MB} MB.`)
          setUploading(false)
          return
        }
        finalUrl = await uploadPortfolioFile(imgFile)
      }

      if (!finalUrl) {
        setError('Please provide an image URL or upload a file.')
        setUploading(false)
        return
      }

      if (uploadMode === 'url') {
        try {
          const parsed = new URL(finalUrl)
          if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error()
        } catch {
          setError('Please enter a valid https:// image URL.')
          setUploading(false)
          return
        }
      }

      await addPortfolioImage({
        url: finalUrl,
        caption: imgCaption.trim().slice(0, 200),
        project_type: imgType,
      })

      setImgUrl('')
      setImgCaption('')
      setImgFile(null)
      setImgType(PROJECT_TYPES[0])
      showSuccess('Image added successfully!')
      await loadImages()
      window.dispatchEvent(new Event('portfolio-updated'))
    } catch {
      setError('Failed to add image. Make sure you are signed in.')
      setTimeout(() => setError(''), 4000)
    }
    setUploading(false)
  }

  async function handleDelete(id) {
    try {
      await deletePortfolioImage(id)
      await loadImages()
      window.dispatchEvent(new Event('portfolio-updated'))
    } catch {
      setError('Failed to delete image.')
    }
  }

  async function handleClearAll() {
    if (!window.confirm('Remove all custom portfolio images? Default images will remain.')) return
    try {
      await clearAllPortfolioImages()
      await loadImages()
      window.dispatchEvent(new Event('portfolio-updated'))
      showSuccess('All custom images cleared.')
    } catch {
      setError('Failed to clear images.')
    }
  }

  function showSuccess(msg) {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-charcoal-deep/95 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">

        {/* Loading session check */}
        {authLoading ? (
          <div className="p-8 flex items-center justify-center min-h-[200px]">
            <div className="w-8 h-8 border-4 border-emerald/30 border-t-emerald rounded-full animate-spin" />
          </div>

        /* ========================
           LOGIN SCREEN
           ======================== */
        ) : !authenticated ? (
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-charcoal-deep rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-emerald" />
              </div>
              <h3 className="font-display text-2xl text-charcoal">Portfolio Admin</h3>
              <p className="text-gray-500 text-sm mt-1">
                Sign in to manage portfolio images
              </p>
            </div>

            <form onSubmit={handleLogin} className="max-w-xs mx-auto space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm"
                autoFocus
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm text-center"
              />
              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-charcoal-deep hover:bg-charcoal-light text-white font-bold py-3 rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full text-gray-500 hover:text-gray-700 text-sm py-2 transition-colors"
              >
                Cancel
              </button>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </form>
          </div>

        ) : (
          /* ========================
             ADMIN DASHBOARD
             ======================== */
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-2xl text-charcoal">Manage Portfolio</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Supabase connection warning */}
            {!supabase && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-800">Supabase Not Connected</p>
                  <p className="text-amber-700 mt-1">
                    Set <code className="bg-amber-100 px-1 rounded text-xs">VITE_SUPABASE_URL</code> and{' '}
                    <code className="bg-amber-100 px-1 rounded text-xs">VITE_SUPABASE_ANON_KEY</code> in your environment variables.
                  </p>
                </div>
              </div>
            )}

            {/* Add Image Form */}
            <div className="bg-cream rounded-xl p-6 mb-6">
              <h4 className="font-bold text-charcoal mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Image
              </h4>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setUploadMode('url')}
                  className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors ${
                    uploadMode === 'url'
                      ? 'bg-charcoal-deep text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Paste URL
                </button>
                <button
                  onClick={() => setUploadMode('file')}
                  className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors ${
                    uploadMode === 'file'
                      ? 'bg-charcoal-deep text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Upload File
                </button>
              </div>

              <form onSubmit={handleAddImage} className="space-y-4">
                {uploadMode === 'url' ? (
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Image URL <span className="text-emerald">*</span>
                    </label>
                    <input
                      type="url"
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Upload Image <span className="text-emerald">*</span>
                    </label>
                    <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-600">
                      <Image className="w-4 h-4" />
                      {imgFile ? imgFile.name : 'Choose file...'}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={(e) => setImgFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    <p className="text-gray-400 text-xs mt-1">JPEG, PNG, WebP or GIF · max {MAX_FILE_SIZE_MB} MB</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">Caption</label>
                  <input
                    type="text"
                    value={imgCaption}
                    onChange={(e) => setImgCaption(e.target.value)}
                    placeholder="e.g. Kitchen remodel in West Hollywood"
                    maxLength={200}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Project Type
                  </label>
                  <select
                    value={imgType}
                    onChange={(e) => setImgType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-charcoal text-sm"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={uploading || !supabase}
                  className="w-full bg-emerald hover:bg-emerald-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Add Image to Portfolio'
                  )}
                </button>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {successMsg && <p className="text-emerald text-sm text-center">{successMsg}</p>}
              </form>
            </div>

            {/* Current Images */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-charcoal">
                  Custom Images ({images.length})
                </h4>
                <div className="flex gap-3 text-sm">
                  <a
                    href="#portfolio"
                    onClick={onClose}
                    className="text-emerald hover:text-emerald-dark font-semibold transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live
                  </a>
                  {images.length > 0 && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={handleClearAll}
                        className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                      >
                        Clear All
                      </button>
                    </>
                  )}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-emerald/30 border-t-emerald rounded-full animate-spin mx-auto" />
                </div>
              ) : images.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6 bg-cream/50 rounded-xl">
                  No custom images yet. The portfolio is showing {DEFAULT_PORTFOLIO.length} default project photos.
                </p>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="flex items-center gap-3 bg-cream rounded-lg p-3"
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-16 h-12 object-cover rounded-md flex-shrink-0 bg-gray-200"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 48%22%3E%3Crect fill=%22%23ddd%22 width=%2264%22 height=%2248%22/%3E%3Ctext x=%2232%22 y=%2228%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2210%22%3EErr%3C/text%3E%3C/svg%3E'
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-charcoal text-sm font-semibold truncate">
                          {img.caption || 'No caption'}
                        </p>
                        <p className="text-gray-500 text-xs">{img.project_type || 'Uncategorized'}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="text-red-400 hover:text-red-600 p-1.5 flex-shrink-0 transition-colors rounded-lg hover:bg-red-50"
                        aria-label="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
