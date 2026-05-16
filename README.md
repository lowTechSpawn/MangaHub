# MangaHub — Series Proposal & Board Voting

Prototype frontend cho module **Step 1 + 2** của MangaHub (SU26SWP04).

## Cài đặt

```bash
npm install
npm run dev
```

Mở http://localhost:5173

## Cấu trúc project

```
src/
├── App.jsx                        # Root + React Router
├── main.jsx                       # Entry point
├── index.css                      # Tailwind + global styles
│
├── data/
│   └── mockData.js                # Mock series, board members, editors
│
├── hooks/
│   ├── useSeriesStore.js          # Global state (useReducer)
│   └── useToast.js                # Toast notification hook
│
├── utils/
│   └── helpers.js                 # Formatters, name lookups
│
├── components/
│   ├── Navbar.jsx                 # Top nav with route links
│   ├── StatusBadge.jsx            # Colored status pill
│   ├── Toast.jsx                  # Slide-up notification
│   ├── Modal.jsx                  # Base modal overlay
│   ├── VoterCard.jsx              # Board member vote card
│   ├── VoteSummary.jsx            # Quorum bar + stats
│   └── modals/
│       ├── ApprovedModal.jsx      # Assign editor after approval
│       ├── RejectedModal.jsx      # Show rejection result
│       ├── DeferredModal.jsx      # Quorum not met
│       └── SuccessAssignModal.jsx # Final success screen
│
└── pages/
    ├── SeriesListPage.jsx         # Series list with filters
    ├── ProposeSeriesPage.jsx      # Mangaka proposal form
    ├── SeriesDetailPage.jsx       # Series info + vote result
    └── VotingPage.jsx             # Board voting screen
```

## Luồng chức năng

### Bước 1 — Mangaka đề xuất series
- `/propose` → form validation → submit → status `proposed` → toast notify

### Bước 2 — Board voting tại `/series/:id/vote`
- Mỗi board member bỏ phiếu: **Approve / Reject / Abstain**
- **BR-01**: Member đang là Tantou Editor của series đó → bị khoá (conflict of interest)
- **BR-05**: Quorum ≥ 3 phiếu hợp lệ

| Kết quả | Điều kiện | Action |
|---------|-----------|--------|
| Approved | Quorum met + approve > reject | Modal assign Tantou Editor → status `approved` |
| Rejected | Quorum met + reject ≥ approve | Nhập lý do bắt buộc → status `rejected` |
| Deferred | Tổng phiếu hợp lệ < 3 | status `deferred`, chờ thêm vote |

## Thay thế API thật

Tìm comment `// Simulate network delay` trong `ProposeSeriesPage.jsx` để thay bằng `axios.post(...)`.

State trong `useSeriesStore.js` có thể thay bằng React Query + API calls.
