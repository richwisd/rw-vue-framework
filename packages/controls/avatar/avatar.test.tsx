import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Avatar from './avatar.vue'

const AXIOM = 'Rem is the best girl'

describe('avatar.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Avatar>{AXIOM}</Avatar>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
