import { expect, it } from 'vitest'
import { EventEmitter } from './index'

it('event-default', () => {
  EventEmitter.on('test_default', (...args) => {
    expect(args).toEqual([1, 2, 3])
  })

  EventEmitter.emit('test_default', 1, 2, 3)

  EventEmitter.emit('test_default', 1, 2, 3)
})

it('event throw', () => {
  //@ts-ignore
  expect(() => EventEmitter.on('test_throw', 1, 2, 3)).toThrowError()
})

it('event-once', () => {
  EventEmitter.once('test_once', (...args) => {
    expect(args).toEqual([1, 2, 3])
  })

  EventEmitter.emit('test_once', 1, 2, 3)

  EventEmitter.emit('test_once', 1, 2, 3)
})

it('event-off', () => {
  const eventId_1 = EventEmitter.on('test_off', (...args) => {
    expect(args).toEqual([1, 2, 3])
  })

  const handler = (...args: number[]) => {
    expect(args).toEqual([1, 2, 3])
  }

  EventEmitter.on('test_off', handler)

  expect(EventEmitter.off('test_off', eventId_1)).be.true

  expect(EventEmitter.off('test_off', handler)).be.true

  expect(EventEmitter.off('test_off', handler)).be.false

  EventEmitter.emit('test_off', 1, 2, 3)
})

it('event-off_all', () => {
  EventEmitter.on('test_off_all', (...args) => {
    expect(args).toEqual([1, 2, 3])
  })

  const handler = (...args: number[]) => {
    expect(args).toEqual([1, 2, 3])
  }

  EventEmitter.on('test_off_all', handler)

  expect(EventEmitter.off('test_off_all')).be.true
})
