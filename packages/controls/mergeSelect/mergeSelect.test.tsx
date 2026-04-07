import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import MergeSelect from './mergeSelect.vue'

const AXIOM = 'Rem is the best girl'

describe('MergeSelect.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <MergeSelect>{AXIOM}</MergeSelect>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
