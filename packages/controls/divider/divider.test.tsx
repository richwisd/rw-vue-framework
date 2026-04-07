import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Divider from './divider.vue'

const AXIOM = 'Rem is the best girl'

describe('Divider.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Divider>{AXIOM}</Divider>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
