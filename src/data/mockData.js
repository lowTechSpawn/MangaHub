// ─── Series ────────────────────────────────────────────────────────────────
export const INITIAL_SERIES = [
  {
    id: 1,
    title: 'Shattered Sky',
    genre: 'Action / Sci-Fi',
    publicationType: 'Weekly',
    mangakaId: 1,
    editorId: null,
    status: 'proposed',
    synopsis:
      'A fallen pilot discovers he can manipulate gravity after a catastrophic crash into an alien megastructure. Now hunted by both sides of an interstellar war, he must master his power before it consumes him.',
    createdAt: '2026-05-10',
    rankingScore: null,
  },
  {
    id: 2,
    title: 'Moonpetal',
    genre: 'Romance / Slice of Life',
    publicationType: 'Monthly',
    mangakaId: 2,
    editorId: null,
    status: 'proposed',
    synopsis:
      'A florist and a marine biologist form an unlikely bond through anonymous letters left in flower deliveries across a coastal town. Neither knows the other\'s identity — until one stormy evening.',
    createdAt: '2026-05-12',
    rankingScore: null,
  },
  {
    id: 3,
    title: 'Kage no Otoko',
    genre: 'Thriller / Mystery',
    publicationType: 'Weekly',
    mangakaId: 3,
    editorId: null,
    status: 'deferred',
    synopsis:
      'A detective who loses his memory must solve a case he started before the incident — starring himself as the prime suspect. Every clue he uncovers rewrites who he thought he was.',
    createdAt: '2026-05-08',
    rankingScore: null,
  },
  {
    id: 4,
    title: 'Dendro',
    genre: 'Fantasy / Adventure',
    publicationType: 'Bi-weekly',
    mangakaId: 4,
    editorId: 2,
    status: 'approved',
    synopsis:
      'A botanist mage tends to carnivorous plants that are actually imprisoned war criminals. When one escapes, she must choose between her duty to the state and her bond with her garden.',
    createdAt: '2026-05-01',
    rankingScore: 78,
  },
  {
    id: 5,
    title: 'Circuit Breaker',
    genre: 'Mecha / Drama',
    publicationType: 'Weekly',
    mangakaId: 5,
    editorId: null,
    status: 'rejected',
    rejectReason: 'Concept overlaps heavily with existing contracted series. Please revisit the core conflict and resubmit.',
    synopsis:
      'The last of humanity\'s mech pilots refuses to fight after discovering the enemy pilots are uploaded human consciousnesses — soldiers from a war that ended two centuries ago.',
    createdAt: '2026-04-28',
    rankingScore: null,
  },
]

// ─── Mangaka ────────────────────────────────────────────────────────────────
export const MANGAKA_LIST = [
  { id: 1, name: 'Tanaka Yuki',   initials: 'TY' },
  { id: 2, name: 'Aoki Sora',     initials: 'AS' },
  { id: 3, name: 'Ishida Ren',    initials: 'IR' },
  { id: 4, name: 'Fujimoto Hana', initials: 'FH' },
  { id: 5, name: 'Kuroda Shin',   initials: 'KS' },
]

// ─── Editorial Board Members ─────────────────────────────────────────────────
// editingSeries: series IDs they are Tantou Editor for → BR-01 conflict of interest
export const BOARD_MEMBERS = [
  {
    id: 1,
    name: 'Nakamura Akio',
    initials: 'NA',
    role: 'Chief Editor',
    color: '#534AB7',
    bgColor: '#EEEDFE',
    editingSeries: [4],   // managing Dendro → conflict if Dendro goes to vote
  },
  {
    id: 2,
    name: 'Sato Keiko',
    initials: 'SK',
    role: 'Senior Editor',
    color: '#3B6D11',
    bgColor: '#EAF3DE',
    editingSeries: [],
  },
  {
    id: 3,
    name: 'Yamamoto Ryu',
    initials: 'YR',
    role: 'Board Member',
    color: '#854F0B',
    bgColor: '#FAEEDA',
    editingSeries: [],
  },
  {
    id: 4,
    name: 'Hayashi Mei',
    initials: 'HM',
    role: 'Board Member',
    color: '#185FA5',
    bgColor: '#E6F1FB',
    editingSeries: [3],   // managing Kage no Otoko
  },
  {
    id: 5,
    name: 'Kimura Taro',
    initials: 'KT',
    role: 'Board Member',
    color: '#993556',
    bgColor: '#FBEAF0',
    editingSeries: [],
  },
]

// ─── Editors (for assignment after approval) ─────────────────────────────────
export const EDITOR_LIST = [
  { id: 1, name: 'Nakamura Akio' },
  { id: 2, name: 'Sato Keiko' },
  { id: 3, name: 'Yamamoto Ryu' },
  { id: 4, name: 'Hayashi Mei' },
]

// ─── Genres & Publication Types ──────────────────────────────────────────────
export const GENRES = [
  'Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Mystery',
  'Thriller', 'Slice of Life', 'Horror', 'Sports',
  'Mecha', 'Drama', 'Comedy', 'Isekai', 'Historical',
]

export const PUBLICATION_TYPES = ['Weekly', 'Bi-weekly', 'Monthly', 'One-shot']

// ─── Business Rules ──────────────────────────────────────────────────────────
export const QUORUM_REQUIRED = 3   // BR-05: minimum votes to make a decision
