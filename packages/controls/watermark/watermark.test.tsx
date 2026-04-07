import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Watermark from './watermark.vue'

const AXIOM = 'Rem is the best girl'

describe('Watermark.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Watermark>{AXIOM}</Watermark>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
