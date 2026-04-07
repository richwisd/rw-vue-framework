import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Steps from './steps.vue'

const AXIOM = 'Rem is the best girl'

describe('Steps.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Steps>{AXIOM}</Steps>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
