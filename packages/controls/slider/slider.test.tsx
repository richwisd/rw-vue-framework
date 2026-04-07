import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Slider from 'packages/controls/slider/slider.vue'

const AXIOM = 'So long and thanks for all the fish!'

describe('Slider', () => {
  test('create', () => {
    const wrapper = mount(() => <Slider>{AXIOM}</Slider> )

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
