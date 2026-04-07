import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Rate from 'packages/controls/rate/rate.vue'

const AXIOM = 'So long and thanks for all the fish!'

describe('Rate', () => {
  test('create', () => {
    const wrapper = mount(() => <Rate>{AXIOM}</Rate> )

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
