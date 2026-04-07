import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Dropdown from './dropdown.vue'

const AXIOM = 'Rem is the best girl'

describe('Dropdown.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Dropdown>{AXIOM}</Dropdown>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
