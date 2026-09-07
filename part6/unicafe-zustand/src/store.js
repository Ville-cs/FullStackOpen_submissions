import { create } from "zustand"

const useFeedbackStore = create((set) => ({
  statistics: {
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  },
  actions: {
    incrementGood: () =>
      set((state) => ({
        statistics: {
          ...state.statistics,
          good: state.statistics.good + 1,
        },
      })),
    incrementNeutral: () =>
      set((state) => ({
        statistics: {
          ...state.statistics,
          neutral: state.statistics.neutral + 1,
        },
      })),
    incrementBad: () =>
      set((state) => ({
        statistics: {
          ...state.statistics,
          bad: state.statistics.bad + 1,
        },
      })),
    incrementAll: () =>
      set((state) => ({
        statistics: {
          ...state.statistics,
          all:
            state.statistics.good +
            state.statistics.neutral +
            state.statistics.bad,
        },
      })),
    calculateAverage: () =>
      set((state) => ({
        statistics: {
          ...state.statistics,
          average:
            (state.statistics.good + -1 * state.statistics.bad) /
            state.statistics.all,
        },
      })),
    calculatePositive: () =>
      set((state) => ({
        statistics: {
          ...state.statistics,
          positive: (state.statistics.good / state.statistics.all) * 100,
        },
      })),
  },
}))

export const useStatistics = () => useFeedbackStore((state) => state.statistics)

export const useFeedback = () => useFeedbackStore((state) => state.actions)
