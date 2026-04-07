import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Affix from './affix.vue'

const AXIOM = 'Rem is the best girl'

describe('Affix.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Affix>{AXIOM}</Affix>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
