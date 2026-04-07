import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Badge from './badge.vue'

const AXIOM = 'Rem is the best girl'

describe('badge.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Badge>{AXIOM}</Badge>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
