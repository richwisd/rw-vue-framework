import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Collapse from './collapse.vue'

const AXIOM = 'Rem is the best girl'

describe('Collapse.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Collapse>{AXIOM}</Collapse>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
