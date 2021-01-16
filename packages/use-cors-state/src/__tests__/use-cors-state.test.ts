import { useCorsState } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'
import postRobot from 'post-robot'

describe('useCorsState', () => {
  it('initial value is set correctly', () => {
    const { result } = renderHook(() =>
      useCorsState('test1', { window }, { value: 'initialValue' })
    )
    expect(result.current[0]).toStrictEqual({ value: 'initialValue' })
  })

  it('the value can be set with setState', () => {
    const { result } = renderHook(() =>
      useCorsState('test2', { window }, { value: 'initialValue' })
    )
    act(() => {
      result.current[1]({ value: 'updatedValue' })
    })
    expect(result.current[0]).toStrictEqual({ value: 'updatedValue' })
  })

  it('a message event fires when setState is executed', () => {
    const { result } = renderHook(() =>
      useCorsState('test3', { window }, { value: 'initialValue' })
    )

    act(() => {
      let counter = 0
      const example = ({ data }: MessageEvent) => {
        const parsedData: { [k: string]: { name: string; data: { value: string } } } = JSON.parse(data)
        if (Object.values(parsedData)[0].name !== 'test3') return
        if (counter === 0)
          expect(Object.values(parsedData)[0].data).toStrictEqual({ value: 'initialValue' })
        if (counter === 1)
          expect(Object.values(parsedData)[0].data).toStrictEqual({ value: 'updatedValue' })
        counter += 1
      }
      window.addEventListener('message', example)
      result.current[1]({ value: 'updatedValue' })
    })
  })

  it('synchronize when a message event is fired', () => {
    const { result } = renderHook(() =>
      useCorsState('test4', { window }, { value: 'initialValue' })
    )
    postRobot
      .send(window, 'test4', { value: 'updatedValue' })
      .then(() =>
        expect(result.current[0]).toStrictEqual({ value: 'updatedValue' })
      )
      .catch((e) => {
        throw e
      })
  })
})
