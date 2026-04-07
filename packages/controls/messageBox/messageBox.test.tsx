import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MessageBox from './messageBox.vue'

const AXIOM = 'Rem is the best girl'

describe('MessageBox.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MessageBox>{AXIOM}</MessageBox>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
