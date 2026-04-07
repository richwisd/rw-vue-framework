import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InputTag from './inputTag.vue'

const AXIOM = 'Rem is the best girl'

describe('inputTag.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <InputTag>{AXIOM}</InputTag>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
