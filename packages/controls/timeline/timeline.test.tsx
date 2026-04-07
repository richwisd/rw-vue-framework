import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Timeline from './timeline.vue'

const AXIOM = 'Rem is the best girl'

describe('Timeline.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Timeline>{AXIOM}</Timeline>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
