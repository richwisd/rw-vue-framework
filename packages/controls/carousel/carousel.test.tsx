import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Carousel from './carousel.vue'

const AXIOM = 'Rem is the best girl'

describe('Carousel.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Carousel>{AXIOM}</Carousel>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
