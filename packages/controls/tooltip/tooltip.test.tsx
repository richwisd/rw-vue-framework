import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tooltip from './tooltip.vue'

const AXIOM = 'Rem is the best girl'

describe('Tooltip.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Tooltip>{AXIOM}</Tooltip>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
