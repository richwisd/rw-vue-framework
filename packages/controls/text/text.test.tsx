import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Text from './text.vue'

const AXIOM = 'Rem is the best girl'

describe('Text.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Text>{AXIOM}</Text>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
