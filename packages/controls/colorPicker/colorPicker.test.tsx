import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ColorPicker from './colorPicker.vue'

const AXIOM = 'Rem is the best girl'

describe('colorPicker.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ColorPicker>{AXIOM}</ColorPicker>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
