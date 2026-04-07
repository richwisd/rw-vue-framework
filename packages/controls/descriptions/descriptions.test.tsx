import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Descriptions from './descriptions.vue'

const AXIOM = 'Rem is the best girl'

describe('Descriptions.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Descriptions>{AXIOM}</Descriptions>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
