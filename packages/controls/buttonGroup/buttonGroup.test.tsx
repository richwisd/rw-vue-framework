import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import ButtonGroyp from './buttonGroup.vue'

const AXIOM = 'Rem is the best girl'

describe('ButtonGroup.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ButtonGroyp>{AXIOM}</ButtonGroyp>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
