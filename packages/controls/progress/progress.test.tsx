import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Progress from './progress.vue'

const AXIOM = 'Rem is the best girl'

describe('progress.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Progress>{AXIOM}</Progress>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
