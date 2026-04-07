import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Switch from 'packages/controls/switch/switch.vue'

const AXIOM = 'So long and thanks for all the fish!'

describe('Switch', () => {
  test('create', () => {
    const wrapper = mount(() => <Switch>{AXIOM}</Switch> )

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
