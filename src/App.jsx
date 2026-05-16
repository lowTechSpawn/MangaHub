import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import SeriesListPage from './pages/SeriesListPage'
import ProposeSeriesPage from './pages/ProposeSeriesPage'
import SeriesDetailPage from './pages/SeriesDetailPage'
import VotingPage from './pages/VotingPage'
import { useSeriesStore } from './hooks/useSeriesStore'
import { useToast } from './hooks/useToast'
import { BOARD_MEMBERS } from './data/mockData'

export default function App() {
  const { state, getVotes, getVoteCounts, addSeries, castVote, finalize } = useSeriesStore()
  const { toast, showToast, dismissToast } = useToast()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        {/* Series list */}
        <Route
          path="/"
          element={<SeriesListPage series={state.series} />}
        />

        {/* New proposal */}
        <Route
          path="/propose"
          element={
            <ProposeSeriesPage
              onSubmit={s => {
                addSeries(s)
                showToast('Đề xuất đã gửi thành công! Board đã được thông báo.')
              }}
            />
          }
        />

        {/* Series detail */}
        <Route
          path="/series/:id"
          element={
            <SeriesDetailWrapper
              series={state.series}
              getVoteCounts={getVoteCounts}
            />
          }
        />

        {/* Voting */}
        <Route
          path="/series/:id/vote"
          element={
            <VotingWrapper
              series={state.series}
              getVotes={getVotes}
              getVoteCounts={getVoteCounts}
              castVote={castVote}
              finalize={finalize}
              showToast={showToast}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  )
}

// ─── Route wrappers (extract ID param) ───────────────────────────────────────

function SeriesDetailWrapper({ series, getVoteCounts }) {
  const { id } = useParams()
  const s = series.find(x => x.id === Number(id))
  if (!s) return <Navigate to="/" replace />
  const counts = getVoteCounts(s.id, BOARD_MEMBERS)
  return <SeriesDetailPage series={s} voteCounts={counts} />
}

function VotingWrapper({ series, getVotes, getVoteCounts, castVote, finalize, showToast }) {
  const { id } = useParams()
  const s = series.find(x => x.id === Number(id))
  if (!s) return <Navigate to="/" replace />
  const votes  = getVotes(s.id)
  const counts = getVoteCounts(s.id, BOARD_MEMBERS)
  return (
    <VotingPage
      series={s}
      votes={votes}
      counts={counts}
      onCastVote={castVote}
      onFinalize={finalize}
      showToast={showToast}
    />
  )
}
