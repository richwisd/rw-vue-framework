import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Image from './image.vue'

const AXIOM = 'Rem is the best girl'

describe('Image.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Image>{AXIOM}</Image>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
