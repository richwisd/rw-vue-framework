import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Form from './form.vue'

const AXIOM = 'Rem is the best girl'

describe('Form.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Form>{AXIOM}</Form>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
