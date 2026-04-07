import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InputNumber from './inputNumber.vue'

const AXIOM = 'Rem is the best girl'

describe('InputNumber.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <InputNumber>{AXIOM}</InputNumber>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
