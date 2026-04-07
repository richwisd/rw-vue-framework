import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Drawer from './drawer.vue'

const AXIOM = 'Rem is the best girl'

describe('Drawer.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Drawer>{AXIOM}</Drawer>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
