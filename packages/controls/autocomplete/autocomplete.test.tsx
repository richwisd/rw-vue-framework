import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Autocomplete from './autocomplete.vue'

const AXIOM = 'Rem is the best girl'

describe('Autocomplete.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Autocomplete>{AXIOM}</Autocomplete>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
