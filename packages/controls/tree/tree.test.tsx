import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tree from './tree.vue'

const AXIOM = 'Rem is the best girl'

describe('Tree.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Tree>{AXIOM}</Tree>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
