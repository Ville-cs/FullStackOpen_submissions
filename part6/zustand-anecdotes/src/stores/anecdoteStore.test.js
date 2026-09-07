import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"

vi.mock("../services/anecdoteService", () => ({
  getAllAnecdotes: vi.fn(),
  upvoteAnecdote: vi.fn(),
}))

import { getAllAnecdotes, upvoteAnecdote } from "../services/anecdoteService"
import useAnecdoteStore, {
  useAnecdotes,
  useFilter,
  useAnecdoteActions,
} from "./anecdoteStore"

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" })
  vi.clearAllMocks()
})

describe("useAnecdoteActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }]

    getAllAnecdotes.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it("component receives anecdotes from store sorted by votes", async () => {
    const mockAnecdotes = [
      { id: 3, content: "Test3", votes: 3 },
      { id: 2, content: "Test2", votes: 1 },
      { id: 2, content: "Test2", votes: 2 },
    ]

    getAllAnecdotes.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const votes = anecdotesResult.current.map((anecdote) => anecdote.votes)
    expect(votes).toEqual([...votes].sort((a, b) => b - a))
  })

  it("component receives filtered list", async () => {
    const mockAnecdotes = [
      { id: 3, content: "Test", votes: 3 },
      { id: 2, content: "filtered", votes: 1 },
      { id: 2, content: "a cool anecdote", votes: 2 },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })
    const { result: actionsResult } = renderHook(() => useAnecdoteActions())
    act(() => {
      actionsResult.current.addFilter("filtered")
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const { result: filterResult } = renderHook(() => useFilter())

    expect(filterResult.current).toStrictEqual("filtered")
    expect(anecdotesResult.current).toHaveLength(1)
  })

  it("voting increments votes of an anecdote by 1", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })

    const updatedAnecdote = { ...mockAnecdotes, votes: 1 }
    upvoteAnecdote.mockResolvedValue(updatedAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.upvote(mockAnecdotes[0].id)
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0].votes).toBe(updatedAnecdote.votes)
  })
})
