import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Search from './search.vue'

const AXIOM = 'Rem is the best girl'

describe('Search.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Search>{AXIOM}</Search>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
