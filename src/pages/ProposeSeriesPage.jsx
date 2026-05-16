import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GENRES, PUBLICATION_TYPES } from '../data/mockData'
import { generateId } from '../utils/helpers'

const CURRENT_MANGAKA_ID = 1  // simulated logged-in user

function validate(form) {
  const errors = {}
  if (!form.title.trim())         errors.title = 'Tiêu đề không được để trống'
  if (!form.genre)                errors.genre = 'Vui lòng chọn thể loại'
  if (!form.publicationType)      errors.publicationType = 'Vui lòng chọn loại xuất bản'
  if (!form.synopsis.trim())      errors.synopsis = 'Mô tả không được để trống'
  if (form.synopsis.trim().length < 30)
    errors.synopsis = 'Mô tả tối thiểu 30 ký tự'
  return errors
}

export default function ProposeSeriesPage({ onSubmit }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', genre: '', publicationType: '', synopsis: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  async function handleSubmit() {
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    // Simulate network delay (replace with real API call)
    await new Promise(r => setTimeout(r, 600))

    const newSeries = {
      id: generateId(),
      title: form.title.trim(),
      genre: form.genre,
      publicationType: form.publicationType,
      synopsis: form.synopsis.trim(),
      mangakaId: CURRENT_MANGAKA_ID,
      editorId: null,
      status: 'proposed',
      createdAt: new Date().toISOString().slice(0, 10),
      rankingScore: null,
    }

    onSubmit(newSeries)
    setSubmitting(false)
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-gray-600 transition-colors">
          Series
        </button>
        <span>/</span>
        <span className="text-gray-700 font-medium">Đề xuất mới</span>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Đề xuất series mới</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Điền đầy đủ thông tin. Editorial Board sẽ được thông báo để xét duyệt.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Title */}
        <div className="card">
          <p className="section-label">Thông tin cơ bản</p>

          <div className="space-y-4">
            <div>
              <label className="form-label">
                Tiêu đề series <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="Nhập tên series..."
                className={`form-input ${errors.title ? 'form-input-error' : ''}`}
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Thể loại <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.genre}
                  onChange={e => set('genre', e.target.value)}
                  className={`form-input ${errors.genre ? 'form-input-error' : ''}`}
                >
                  <option value="">Chọn thể loại...</option>
                  {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.genre && (
                  <p className="text-xs text-red-500 mt-1">{errors.genre}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  Loại xuất bản <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.publicationType}
                  onChange={e => set('publicationType', e.target.value)}
                  className={`form-input ${errors.publicationType ? 'form-input-error' : ''}`}
                >
                  <option value="">Chọn loại...</option>
                  {PUBLICATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.publicationType && (
                  <p className="text-xs text-red-500 mt-1">{errors.publicationType}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="card">
          <p className="section-label">Tóm tắt nội dung</p>
          <label className="form-label">
            Mô tả series <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.synopsis}
            onChange={e => set('synopsis', e.target.value)}
            placeholder="Mô tả ngắn gọn về nội dung, nhân vật chính, thế giới quan, điểm nổi bật..."
            rows={5}
            className={`form-input resize-none leading-relaxed ${errors.synopsis ? 'form-input-error' : ''}`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.synopsis
              ? <p className="text-xs text-red-500">{errors.synopsis}</p>
              : <span />}
            <p className={`text-xs ${form.synopsis.length < 30 ? 'text-amber-500' : 'text-gray-400'}`}>
              {form.synopsis.length} ký tự
            </p>
          </div>
        </div>

        {/* Info box */}
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs
                        text-blue-700 leading-relaxed">
          <span className="text-base flex-shrink-0">ℹ</span>
          <span>
            Sau khi gửi, series sẽ chuyển sang trạng thái <strong>Proposed</strong> và
            Editorial Board sẽ nhận được thông báo. Cần tối thiểu{' '}
            <strong>3 phiếu hợp lệ</strong> (quorum) để ra quyết định cuối cùng (BR-05).
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button className="btn" onClick={() => navigate('/')}>Huỷ</button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Đang gửi...' : 'Gửi đề xuất →'}
          </button>
        </div>
      </div>
    </div>
  )
}
