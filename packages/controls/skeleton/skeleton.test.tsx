import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Skeleton from './skeleton.vue'

const AXIOM = 'Rem is the best girl'

describe('skeleton.vue', () =>   {
  test('render test', () => {
    const wrapper = mount(() => <Skeleton>{AXIOM}</Skeleton>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
