import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Result from './result.vue'

const AXIOM = 'Rem is the best girl'

describe('result.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Result>{AXIOM}</Result>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
