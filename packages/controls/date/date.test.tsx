import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Date from './date.vue'

const AXIOM = 'Rem is the best girl'

describe('Date.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Date>{AXIOM}</Date>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
