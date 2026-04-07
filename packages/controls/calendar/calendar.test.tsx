import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Calendar from './calendar.vue'

const AXIOM = 'Rem is the best girl'

describe('calendar.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Calendar>{AXIOM}</Calendar>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
