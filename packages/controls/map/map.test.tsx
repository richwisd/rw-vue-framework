import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Map from './map.vue'

const AXIOM = 'Rem is the best girl'

describe('Map.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Map>{AXIOM}</Map>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
