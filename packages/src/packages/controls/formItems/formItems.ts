import { type baseT } from '../../constants'
import { type Mutable } from '../../utils'
import { RwInput } from '../input'
import { RwSelect } from '../select'
import { RwInputTag } from '../inputTag'
import { RwAutocomplete } from '../autocomplete'
import { RwInputNumber } from '../inputNumber'
import { RwRadio } from '../radio'
import { RwMergeInput } from '../mergeInput'
import { RwMergeSelect } from '../mergeSelect'
import { RwSwitch } from '../switch'
import { RwSlider } from '../slider'
import { RwMap } from '../map'
import { RwUpload } from '../uploadNew'
import { RwTree } from '../tree'
import { RwText } from '../text'
import { RwTable } from '../table'
import { RwSegmented } from '../segmented'
import { RwTagComp } from '../tagComp'

import * as controls from '../index'

import type { FormItemProps, ColProps, RowProps } from 'element-plus'
import { type Component, markRaw } from 'vue'
import { pageStruct, tableStruct } from '../'

import { type complexT } from '../../constants'

// 定义控件类型联合
export type ControlOptionT =
  | RwInput.OptionT
  | RwSelect.OptionT
  | RwInputTag.OptionT
  | RwAutocomplete.OptionT
  | RwInputNumber.OptionT
  | RwRadio.OptionT
  | RwMergeInput.OptionT
  | RwMergeSelect.OptionT
  | RwSwitch.OptionT
  | RwSlider.OptionT
  | RwMap.OptionT
  | RwUpload.OptionT
  | RwTree.OptionT
  | RwText.OptionT
  | RwTable.OptionT
  | RwSegmented.OptionT
  | RwTagComp.OptionT

// 扩展控件选项类型
export type ExtendedControlOptionT = ControlOptionT & {
  labelShow?: boolean
  hideLabel?: boolean
  labelWidth?: string | number
  colProps?: Partial<Mutable<ColProps>>
  formItemProps: Partial<Mutable<FormItemProps>>
  /* 常用新增 */
  required: boolean
  disabled: boolean
  hide: boolean
  span: number
  check: CheckT
  complex: complexT
  defaultValue: string | number | boolean
  // 表格组件特有属性
  allForm?: boolean
  // 其他可能的扩展属性
  [key: string]: any
}
export type CheckT = 'email' | 'phone' | 'idCard' | 'url'
// 定义表单项类型
export type FormItemT<T extends ControlOptionT = ControlOptionT> = baseT & {
  moduleName: string
  formItemProps: Partial<Mutable<FormItemProps>>
  colProps: Partial<Mutable<ColProps>>
  Template: Component
  init: Partial<T> // 修复：改为 Partial<T> 类型
  field: tableStruct.OptionT
  labelShow?: boolean
  hideLabel?: boolean
  labelWidth?: string | number
  value: any
  complex: complexT
  required: boolean
  disabled: boolean
  hide: boolean
  span: number
  vid: string
}

// 主选项类型
// 在 OptionT 类型中添加 model 相关属性
export type OptionT = baseT & {
  id: string
  type: 'form' | 'search' // | 'formDialog'
  inDialog: boolean
  labelWidth: string | number
  formItems: FormItemT[]
  rowProps: Partial<Mutable<RowProps>>

  change: (value: any, changeName: string, data: any) => void

  findItem: (name: string) => FormItemT | null
  add: (
    type: string,
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addText: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addInput: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addInputTag: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addTag: (
    name: string,
    optionFrom: RwTagComp.optionFromT,
    optionValues: any,
    options?: Partial<TagExtendedOptionT>,
  ) => FormItemT | null
  addSwitch: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addDivider: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addSelect: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  /** 多用途下拉选择
   * @param name 组件名称
   * @param optionFrom 获取选项的来源
   * @param optionValues 选项值
   */
  addMergeSelect: (
    name: string,
    optionFrom: RwMergeSelect.optionFromT,
    optionValues: RwMergeSelect.optionValuesT | string,
    options?: Partial<MergeSelectExtendedOptionT>,
  ) => FormItemT | null
  addSlider: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addDate: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addMap: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addUpload: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addTree: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addComponent: (
    name: string,
    component: Component,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  /*表格*/
  addTable: (
    name: string,
    tableForm: RwTable.OptionT,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addTextMultiLang: (
    name: string,
    options?: Partial<ExtendedControlOptionT>,
  ) => FormItemT | null
  addNull: ( span: number ) => FormItemT | null

  // 新增：支持独立数据绑定
  model?: Record<string, any> // 可选的数据模型
  'onUpdate:model'?: (value: Record<string, any>) => void // 更新事件
}

// 创建默认 FormItemProps 的辅助函数
function createFormItemProps(
  moduleName: string,
  name: string,
  options: Partial<ExtendedControlOptionT>,
): Partial<Mutable<FormItemProps>> {
  // const shouldShowLabel = options.labelShow !== false

  return {
    // label: shouldShowLabel ? ( options?.label ?? t(`${moduleName}.${name}`)) : undefined,
    required: options?.required,
    labelWidth: options?.labelWidth,
    prop: name,
    ...options?.formItemProps,
  }
}

// 初始化函数
export const init = (
  struct: pageStruct.OptionT,
  options: Partial<OptionT> = {},
): OptionT => {
  const formItems: FormItemT[] = []
  const rowProps: Partial<RowProps> = {
    ...options?.rowProps,
  }
  const labelWidth = options.labelWidth
  const instance = {
    id: `formItems-${struct.name}-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    formItems,
    type: 'form',
    inDialog: false,
    ...options,
    controlType: 'formItems',
    rowProps,
    findItem: (name: string) => {
      return formItems.find((item) => item.name === name)
    },
    add: (type, name, options) =>
      createComponent(
        type,
        struct,
        name,
        { labelWidth, ...options },
        formItems,
      ),
    addText: (name, options) =>
      createComponent(
        'Text',
        struct,
        name,
        { labelWidth, ...options },
        formItems,
      ),
    addInput: (name, options) =>
      createComponent(
        'Input',
        struct,
        name,
        { labelWidth, ...options },
        formItems,
      ),
    addInputTag: (name, options) =>
      createComponent(
        'InputTag',
        struct,
        name,
        { labelWidth, ...options },
        formItems,
      ),
    addSwitch: (name, options) =>
      createComponent(
        'Switch',
        struct,
        name,
        { labelWidth, ...options },
        formItems,
      ),
    addDivider: (name, options) =>
      createComponent(
        'Divider',
        struct,
        name,
        { labelShow: false, labelWidth, ...options },
        formItems,
      ),
    addSelect: (name, options) =>
      createComponent(
        'Select',
        struct,
        name,
        { labelWidth, ...options },
        formItems,
      ),
    addTag: (name, optionFrom, optionValues, options) =>
      createTagComponent(
        struct,
        name,
        optionFrom,
        optionValues,
        { labelWidth, showAddNewTag:true,  ...options },
        formItems,
      ),
    addMergeSelect: (name, optionFrom, optionValues, options) =>
      createMergeSelectComponent(
        struct,
        name,
        optionFrom,
        optionValues,
        { labelWidth, ...options },
        formItems,
      ),
    addSlider: (name, options) =>
      createComponent('Slider', struct, name, options, formItems),
    addDate: (name, options) =>
      createComponent('Date', struct, name, options, formItems),
    addMap: (name, options) =>
      createComponent('Map', struct, name, options, formItems),
    addUpload: (name, options) =>
      createComponent('Upload', struct, name, options, formItems),
    addTree: (name, options) =>
      createComponent('Tree', struct, name, options, formItems),
    addTable: (name, tableForm, options) =>
      createComponent(
        'Table',
        struct,
        name,
        { allForm: true, ...tableForm, ...options, name},
        formItems,
      ),
    addTextMultiLang: (name, options) => createComponent('Text', struct, name, {...options, multiLang: true}, formItems),
    addNull: (span) => createComponent('Text', struct, '', { default: 'null', hideLabel: true, span }, formItems),

    addComponent: (
      name: string,
      component: Component,
      options?: Partial<ExtendedControlOptionT>,
    ) => addCustomComponent(component, struct, name, options, formItems),
  } as OptionT

  return instance
}

// 创建通用组件的函数
function createComponent(
  controlType: string,
  struct: pageStruct.OptionT,
  name: string,
  options: Partial<ExtendedControlOptionT> = {},
  items?: FormItemT[],
): FormItemT | null {
  const ctrl = (controls as any)[`Rw${controlType}`]
  if (!ctrl || typeof ctrl.init !== 'function') {
    console.warn(`Control "${controlType}" not found or invalid`)
    return null
  }

  const newFormItemProps = createFormItemProps(struct.name, name, options)
  const { colProps, formItemProps, ...mergeSelectOptions } = options
  const controlConfig = {
    moduleName: struct.name,
    name,
    Template: markRaw(ctrl.Template),
    init: controlType === 'Table'? ctrl.init(struct, options) : ctrl.init(struct.name, name, options), // 现在类型匹配了
    formItemProps: newFormItemProps,
    colProps: { span: options?.span, ...colProps },
    hide: false,
    ...mergeSelectOptions,
    field: struct.fieldsMap.get(name),
    complex: options.complex,
    controlType,
    vid: `${controlType}-${struct.name}-${name}-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  } as FormItemT

  if (items) {
    items.push(controlConfig)
  }

  return controlConfig
}

// 创建 MergeSelect 组件的专用函数
export type MergeSelectExtendedOptionT = RwMergeSelect.OptionT & {
  colProps?: Partial<Mutable<ColProps>>
  labelShow?: boolean
  hideLabel?: boolean
  formItemProps: Partial<Mutable<FormItemProps>>

  /* 常用新增 */
  span: number
  check: CheckT

  value: any
  complex: complexT
  hide: boolean
  required: boolean
  disabled: boolean
  labelWidth: string | number
}

// 创建 MergeSelect 组件的专用函数
export type TagExtendedOptionT = RwTagComp.OptionT & {
  colProps?: Partial<Mutable<ColProps>>
  labelShow?: boolean
  hideLabel?: boolean
  formItemProps: Partial<Mutable<FormItemProps>>

  /* 常用新增 */
  span: number
  check: CheckT

  value: any
  complex: complexT
  hide: boolean
  required: boolean
  disabled: boolean
  labelWidth: string | number
}

function createMergeSelectComponent(
  struct: pageStruct.OptionT,
  name: string,
  optionFrom: RwMergeSelect.optionFromT,
  optionValues: RwMergeSelect.optionValuesT | string,
  options: Partial<MergeSelectExtendedOptionT> = {},
  items?: FormItemT[],
): FormItemT | null {
  const newFormItemProps = createFormItemProps(struct.name, name, options)
  const { colProps, formItemProps, ...mergeSelectOptions } = options

  const controlConfig = {
    moduleName: struct.name,
    name,
    ...mergeSelectOptions,
    Template: markRaw(RwMergeSelect.Template),
    init: RwMergeSelect.init(
      struct.name,
      name,
      optionFrom,
      optionValues,
      mergeSelectOptions,
    ),
    formItemProps: newFormItemProps,
    colProps: { span: options.span, ...colProps },
    controlType: 'MergeSelect',
    field: struct?.fieldsMap.get(name),
    value: options?.value,
    complex: options?.complex,
    hide: options?.hide,
    required: options?.required,
    disabled: options?.disabled,
    span: options.span,
    vid: `${'MergeSelect'}-${struct.name}-${name}-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  } as FormItemT

  if (items) {
    items.push(controlConfig)
  }

  return controlConfig
}

function createTagComponent(
  struct: pageStruct.OptionT,
  name: string,
  optionFrom: RwTagComp.optionFromT,
  optionValues: any,
  options: Partial<TagExtendedOptionT> = {},
  items?: FormItemT[],
): FormItemT | null {
  const newFormItemProps = createFormItemProps(struct.name, name, options)
  const { colProps, formItemProps, ...tagOptions } = options

  const controlConfig = {
    moduleName: struct.name,
    name,
    ...tagOptions,
    Template: markRaw(RwTagComp.Template),
    init: RwTagComp.init(
      struct.name,
      name,
      { optionFrom, optionValues, ...tagOptions },
    ),
    formItemProps: newFormItemProps,
    colProps: { span: options.span, ...colProps },
    controlType: 'TagComp',
    field: struct?.fieldsMap.get(name),
    value: options?.value,
    complex: options?.complex,
    hide: options?.hide,
    required: options?.required,
    disabled: options?.disabled,
    span: options.span,
    vid: `${'TagComp'}-${struct.name}-${name}-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  } as FormItemT

  if (items) {
    items.push(controlConfig)
  }

  return controlConfig
}

// 添加用户自定义的组件
function addCustomComponent(
  component: Component,
  struct: pageStruct.OptionT,
  name: string,
  options: Partial<ExtendedControlOptionT> = {},
  items?: FormItemT[],
): FormItemT | null {
  const newFormItemProps = createFormItemProps(struct.name, name, options)
  const { colProps, ...mergeSelectOptions } = options
  const controlConfig = {
    moduleName: struct.name,
    name,
    Template: markRaw(component),
    init: { name, ...options }, // 现在类型匹配了
    formItemProps: newFormItemProps,
    colProps: { span: options?.span, ...colProps },
    hide: false,
    ...mergeSelectOptions,
    field: struct.fieldsMap.get(name),
    complex: options.complex,
    controlType: 'Custom',
  } as FormItemT

  if (items) {
    items.push(controlConfig)
  }

  return controlConfig
}
