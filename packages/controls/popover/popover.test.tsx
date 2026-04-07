import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Popover from './popover.vue'

const AXIOM = 'Rem is the best girl'

describe('Popover.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Popover>{AXIOM}</Popover>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
