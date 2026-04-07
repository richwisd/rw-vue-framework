import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Breadcrumb from './breadcrumb.vue'

const AXIOM = 'Rem is the best girl'

describe('breadcrumb.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Breadcrumb>{AXIOM}</Breadcrumb>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
