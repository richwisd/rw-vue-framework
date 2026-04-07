import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Empty from './empty.vue'

const AXIOM = 'Rem is the best girl'

describe('empty.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Empty>{AXIOM}</Empty>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
