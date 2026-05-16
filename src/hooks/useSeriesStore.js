import { useReducer, useCallback } from 'react'
import { INITIAL_SERIES } from '../data/mockData'

// ─── Action Types ─────────────────────────────────────────────────────────────
export const ACTIONS = {
  ADD_SERIES:    'ADD_SERIES',
  UPDATE_SERIES: 'UPDATE_SERIES',
  CAST_VOTE:     'CAST_VOTE',
  FINALIZE:      'FINALIZE',       // approve / reject / defer
}

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  series: INITIAL_SERIES,
  // voteRecords: { [seriesId]: { [memberId]: 'approve' | 'reject' | 'abstain' } }
  voteRecords: {},
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case ACTIONS.ADD_SERIES:
      return {
        ...state,
        series: [action.payload, ...state.series],
      }

    case ACTIONS.UPDATE_SERIES:
      return {
        ...state,
        series: state.series.map(s =>
          s.id === action.payload.id ? { ...s, ...action.payload } : s
        ),
      }

    case ACTIONS.CAST_VOTE: {
      const { seriesId, memberId, vote } = action.payload
      const prev = state.voteRecords[seriesId] ?? {}
      const memberPrev = prev[memberId]

      // Toggle off if clicking the same option
      const updated =
        memberPrev === vote
          ? Object.fromEntries(Object.entries(prev).filter(([k]) => k !== String(memberId)))
          : { ...prev, [memberId]: vote }

      return {
        ...state,
        voteRecords: { ...state.voteRecords, [seriesId]: updated },
      }
    }

    case ACTIONS.FINALIZE: {
      const { seriesId, newStatus, editorId, rejectReason } = action.payload
      return {
        ...state,
        series: state.series.map(s => {
          if (s.id !== seriesId) return s
          return {
            ...s,
            status: newStatus,
            editorId: editorId ?? s.editorId,
            rejectReason: rejectReason ?? s.rejectReason,
          }
        }),
      }
    }

    default:
      return state
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useSeriesStore() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Helper: get vote record for a series
  const getVotes = useCallback(
    (seriesId) => state.voteRecords[seriesId] ?? {},
    [state.voteRecords]
  )

  // Helper: compute valid vote counts (excluding conflict-of-interest members)
  const getVoteCounts = useCallback(
    (seriesId, boardMembers) => {
      const votes = getVotes(seriesId)
      let approve = 0, reject = 0, abstain = 0, total = 0

      for (const member of boardMembers) {
        const hasConflict = member.editingSeries.includes(seriesId)
        if (hasConflict) continue
        const v = votes[member.id]
        if (!v) continue
        total++
        if (v === 'approve') approve++
        else if (v === 'reject') reject++
        else if (v === 'abstain') abstain++
      }

      return { approve, reject, abstain, total }
    },
    [getVotes]
  )

  const addSeries = useCallback((series) =>
    dispatch({ type: ACTIONS.ADD_SERIES, payload: series }), [])

  const castVote = useCallback((seriesId, memberId, vote) =>
    dispatch({ type: ACTIONS.CAST_VOTE, payload: { seriesId, memberId, vote } }), [])

  const finalize = useCallback((seriesId, newStatus, extras = {}) =>
    dispatch({ type: ACTIONS.FINALIZE, payload: { seriesId, newStatus, ...extras } }), [])

  return { state, getVotes, getVoteCounts, addSeries, castVote, finalize }
}
