import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Backtop from './backtop.vue'

const AXIOM = 'Rem is the best girl'

describe('backtop.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Backtop>{AXIOM}</Backtop>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
