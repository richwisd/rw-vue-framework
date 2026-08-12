<script lang="ts" setup>
import { RwForm, RwFormItems, RwTabs } from 'rw-vue-framework/controls'
import struct from './index'
import { ref, reactive } from 'vue'
import { ElButton } from 'rw-vue-framework/element-plus'

const formDate = {
  username:'秦彻',
  password:'123456',
  inputC:'123456',
  inputD:'',
  inputE:'',
  inputF: ['2025-07-08T16:00:00.000Z', '2025-08-06T16:00:00.000Z'],
}

const formC = reactive(RwForm.init(struct)) // 创建一个form结构，其下的contents为空数组

const formItems = RwFormItems.init(struct)
formItems.add('Input', 'username', { mutiLang: true })
formItems.add('Input', 'password')
formItems.add('Input', 'inputC')
formItems.add('Segmented', 'inputP', { options: ['1','2','3']})
formItems.add('Select', 'inputD', { multiple:true, lists: [{label: 1, value: 1},{label: 2, value: 2}] })

formItems.addDate('inputF', { placeholder: '请输入1111111111', type:'datetimerange',
  change: changeData })

const formItems1 = RwFormItems.init(struct)
formItems1.add('Input', 'inputE', { change: changeData })
formItems1.addMap('inputE')
formItems1.addUpload('inputE')
formItems1.addTree('inputG', { showCheckbox:true, data: [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]})

const tab = RwTabs.init({defaultValue: 'base'})
tab.addTabPane(struct.name, 'base', [formItems])
tab.addTabPane(struct.name, 'pageTitle', formItems1 )



formC.addTabs(tab)


formC.onLoad = () => formDate
/*
存在的问题：拼装的深层嵌套对象，reactive之后，对象方法可能失效的问题；修改深层属性可能无法触发响应式的问题
reactive() 虽然能让对象变成响应式，但对于 已经存在的深层嵌套对象 ，特别是通过 addFormItems 动态添加的内容，Vue无法自动追踪到所有深层属性的变化。
*/
function changeData(val: any) {
  // // TODO: 加到form里：changeItem，findItem
  // formC.loading=true
  // const item = formC.findItem('username')
  const item1 = formC.findItem('password')
  // console.log('item1', item1)
  // formC.changeItem('username', {
  //   hide: !item.hide,
  // })
  formC.changeItem('password', {
    disabled: !item1.disabled,
    required: !item1.required,
  })
  // console.log(formC.contents[0])
  return true
}

const formRef = ref<InstanceType<typeof RwForm.Template>>()

/*
1、可以先创建一个的form结构，再逐步填充其下的contents数组。其他结构类似

2、也可以直接创建一个完整的form对象
**/

// console.log(rwDecode('KmYTNth2tALmXL7RYaX/mgMW1KTKAnM0Jlqz2oOsdNGMUyE3lWXnbCgVod/+0cag3sO/1EAbvufK5MDytJi5RAOekdDcA9RFJyw8u9jHjM1T3YbaTcRCeMFgmWH8OXmVOvHGm8b41gEeFEmgfdI1s6cLGTdZiAkoyNM9LpDkqCzxcXtz6EepG95ZyJS4aSet+9DrWtGC61zU8aY0mWD/NvSxulz6rhflIBCn+BObc/QGOpfSs/h8iCGa8OsxQd4Ziqoz6TaKsxlbYkmEHEFANopganvFPByxj+RShQlJVkiRv94yAP3KgOg/TPUJg2IeNyK9PbM1yclcT8gInSCrrunyqo6KRfEpG7HJAKyscm191IRpFP+5bc1asXi/uKwy0huZrJl0ZX+LzxJtfXd+gH3UhGkU/7ltzVqxeL+4rDKOZOGMW/3tCZgvJ996KBPInwi1XWWtEdcKPOAB/+aZ51+SZTcLJUt5o4NSSkc9KefHTWW96AVYUMiXwJMHn82HG6Ly9l56P3iBAhS3sXOwegud2EzrplRUrL5yuRdjzsvYUblvnDyXesCl9U2T97Oo2PoU1de7BGS15IhcS9baMGJHXQQmMclUVIP1VSEg4myxuZHxO0TL06LJrrTVSk1ha9GhQaWHzV3RcVdyRmryYUnOIsC25PUfPFOL74MR1imkjJSwBJf8/WFGXODUVwvaeeVhqQ3pMs/eOon/tK0gu3OOpZ+5gbGPlKwUv5U9ZA7GxMKNkt0uLOavcXXZcfdcEeunZSLzlqsmx6CuC8rETfCvSETNDMjg2+bXbjt37f/sS0OGPIZKygPqpO/wCY4q3JUmqQLVIn2mhHX/F6Dzhfc7PFd/I6wlCfLyrQD7lgMx/iTfoUdALv692gvr3m5ZEif7X6wNruOsUjALNc7/krTt2rb1q9oH/3SxMVUi7fMSJ/tfrA2u46xSMAs1zv+S3J9XJ+yLMX1yOtVKVWQyuIcMCM3QyZsWwDg1b4uPggDZcW0WVjEULhAdC+ltVP6xMgZi4Wq2TaSR1zwnfH/IG0wbbeR+Mc9yMXNkB8XfofiBFdX2QpT/ZOy7pKsH6uae9PonJpymI2jGi9aIR6i5Nf2/b/W+xG3oqiNMIHVi1GjXKfTwqIyg9211DurA4mevosmutNVKTWF17LU2d7SNdw==', '9IUYGv58'))

</script>

<template>
  <RwForm.Template :control="formC" ref="formRef"></RwForm.Template>
  <br />
  <br />
  <br />
  <ElButton disabled>提交</ElButton>
</template>

