<script lang="ts" setup>

import { RwForm, RwFormItem } from 'rw-vue-framework/controls';
import struct from './index';

const formC = RwForm.init(struct, { tabForm: true });

</script>

<template>
  <RwForm.Template :control="formC"></RwForm.Template>
</template>
