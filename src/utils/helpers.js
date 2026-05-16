import { MANGAKA_LIST, EDITOR_LIST } from '../data/mockData'

export function getMangakaName(id) {
  return MANGAKA_LIST.find(m => m.id === id)?.name ?? '—'
}

export function getEditorName(id) {
  return EDITOR_LIST.find(e => e.id === id)?.name ?? '—'
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

export function generateId() {
  return Date.now()
}

export const STATUS_LABEL = {
  proposed: 'Proposed',
  approved: 'Approved',
  rejected: 'Rejected',
  deferred: 'Deferred',
  active:   'Active',
}

export const STATUS_COLORS = {
  proposed: 'badge-proposed',
  approved: 'badge-approved',
  rejected: 'badge-rejected',
  deferred: 'badge-deferred',
  active:   'badge-active',
}
