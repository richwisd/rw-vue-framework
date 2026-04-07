import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Segmented from './segmented.vue'

const AXIOM = 'Rem is the best girl'

describe('Segmented.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Segmented>{AXIOM}</Segmented>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
