<script lang="ts" setup>
import { RwTimeline } from 'rw-vue-framework/controls';
import { moduleName } from './langs';
import { Search,Eleme } from 'rw-vue-framework/element-plus'
// import { listT } from 'rw-element-admin/timeline/timeline';



const list = [
  // {value: '2022-01-01', type:'primary',} as listT,
  // {value: '2022-02-01',size:'large'}as listT,
  // {value: '2022-03-01',hollow:true,type:'success'}as listT,
  {value: '2022-04-01',icon:Eleme,color:'blue',},
]

const timeline1 = RwTimeline.init(moduleName, 'timeline1', list,{
  default:'<card><h4>Update Github template</h4><p>Tom committed 2018/4/12 20:46</p></card>',
  // placement:'top',
  center:true,
})
const timeline2 = RwTimeline.init(moduleName, 'timeline2',list, {
  default:'<span>End</span>',
  placement:'top'
})
</script>

<template>
  <RwTimeline.Template :control="timeline1" />
<p />
  <RwTimeline.Template :control="timeline2" />
</template>
