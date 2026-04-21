import { type SFCWithInstall, withInstall } from '../../utils'

// import { i18n } from '../../locale'
// const { t } = i18n.global

import MergeInput from './mergeInput.vue'

export const Template: SFCWithInstall<typeof MergeInput> = withInstall(MergeInput)

// 导入子组件模块
import { RwInput } from '../input'
import { RwInputNumber } from '../inputNumber'
import { RwAutocomplete } from '../autocomplete'
import { RwInputTag } from '../inputTag'


export type checkT = 'email'|'number'|'idcard'|'mobile'|'url'|'tel'|'password'|'username'

// 定义输入类型枚举
export type InputTypeT = 'input' | 'inputNumber' | 'autocomplete' | 'inputTag'

// 为每种输入类型定义对应的属性类型
export type InputTypeProps = {
  input: RwInput.OptionT
  inputNumber: RwInputNumber.OptionT
  autocomplete: RwAutocomplete.OptionT
  inputTag: RwInputTag.OptionT
}

// 基础属性，所有类型共享
export type BaseOptionT = {
  inputType: InputTypeT
}

// 根据 inputType 条件类型，动态组合最终类型
export type OptionT<T extends InputTypeT = 'input'> = BaseOptionT & InputTypeProps[T]

// 根据 inputType 获取对应的值类型
export type InputValueType<T extends InputTypeT> =
  T extends 'input' ? string :
  T extends 'inputNumber' ? number :
  T extends 'autocomplete' ? string :
  T extends 'inputTag' ? string[] :
  never;

// 初始化函数，根据 inputType 返回对应的配置
export function init<T extends InputTypeT = 'input'>(
  moduleName: string,
  name: string,
  options: Partial<OptionT<T>> = {}
): Partial<OptionT<T>> {
  const { inputType, ...restOptions } = options;
  // 根据不同的输入类型，调用对应模块的 init 函数
  switch (inputType) {
    case 'inputNumber':
      return {
        inputType,
        ...RwInputNumber.init(moduleName, name, restOptions as Partial<RwInputNumber.OptionT>),
      } as Partial<OptionT<T>>;
    case 'autocomplete':
      return {
        inputType,
        ...RwAutocomplete.init(moduleName, name, restOptions as Partial<RwAutocomplete.OptionT>),
      } as Partial<OptionT<T>>;
    case 'inputTag':
      return {
        inputType,
        ...RwInputTag.init(moduleName, name, restOptions as Partial<RwInputTag.OptionT>),
      } as Partial<OptionT<T>>;
    case 'input':
    default:
      return {
        inputType,
        ...RwInput.init(moduleName, name, restOptions as Partial<RwInput.OptionT>),
      } as unknown as Partial<OptionT<T>>;
  }
}

