import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Between from './between.vue'

const AXIOM = 'Rem is the best girl'

describe('Between.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Between>{AXIOM}</Between>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
