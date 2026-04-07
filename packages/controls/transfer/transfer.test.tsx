import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Transfer from './transfer.vue'

const AXIOM = 'Rem is the best girl'

describe('Transfer.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Transfer>{AXIOM}</Transfer>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
