import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Popconfirm from './popconfirm.vue'

const AXIOM = 'Rem is the best girl'

describe('Popconfirm.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Popconfirm>{AXIOM}</Popconfirm>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
