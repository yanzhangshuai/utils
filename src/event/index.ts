import { assert } from '../error/index'
import { isFunc, isUnDef } from '../is/index'

interface EventHandlerType {
  eventId: number
  func: Fn
  once: boolean
}

export class EventEmitter {
  private static eventId = 100000

  private static events: Recordable<EventHandlerType[]> = {}

  /**
   * add event listener to the event
   * @param key event name
   * @param handler event handler
   * @param once  if true, remove the event after emit
   * @returns event id
   */
  private static add(key: string, handler: Fn, once: boolean): number {
    assert(isFunc(handler), 'handler must be a function') //  handler must be a function

    const eventId = this.eventId++
    // 判断 type 事件对应的队列是否存在
    !this.events[key] && (this.events[key] = [])

    this.events[key]!.push({ eventId, func: handler, once })

    return eventId
  }

  /**
   * add event listener to the event
   */
  static on(key: string, handler: Fn): number {
    return this.add(key, handler, false)
  }

  /**
   * add event listener to the event only once
   */
  static once(key: string, handler: Fn): number {
    return this.add(key, handler, true)
  }

  /**
   * emit event to the event
   */
  static emit(key: string, ...params: any) {
    const handlers = this.events[key]

    handlers && handlers.forEach(({ func: handler, once }) => {
      handler(...params)

      // if once, remove the event
      once && this.off(key, handler)
    })
  }

  /**
   * remove event listener from the event
   */
  static off(key: string, handler: Function): boolean

  /**
   * remove  event listener from the eventId
   */
  static off(key: string, eventId: number): boolean

  /**
   * remove all event listeners from the event
   */
  static off(key: string): boolean

  static off(key: string, h?: number | Function) {
    const handlers = this.events[key]

    if (!handlers)
      return false

    if (isUnDef(h)) {
      //  remove all event listeners
      delete this.events[key]
      return true
    }

    const index = handlers.findIndex(item => typeof h === 'number' ? item.eventId === h : item.func === h)

    //  not found
    if (!~index)
      return false

    handlers.splice(index, 1)

    // remove the event if no event listener
    !handlers.length && delete this.events[key]

    return true
  }
}
