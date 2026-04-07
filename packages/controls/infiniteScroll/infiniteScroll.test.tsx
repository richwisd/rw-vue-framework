import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InfiniteScroll from './infiniteScroll.vue'

const AXIOM = 'Rem is the best girl'

describe('InfiniteScroll.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <InfiniteScroll>{AXIOM}</InfiniteScroll>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
