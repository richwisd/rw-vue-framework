#! /bin/bash

NAME=$(echo $1 | sed -E "s/([A-Z])/-\1/g" | sed -E "s/^-//g" | sed -E "s/_/-/g" | tr "A-Z" "a-z")

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm gen \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/controls/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi

NAME=$(echo $NAME | awk -F'-' '{ for(i=1; i<=NF; i++) { $i = toupper(substr($i,1,1)) tolower(substr($i,2)) } print $0 }' OFS='')
PROP_NAME=$(echo "${NAME:0:1}" | tr '[:upper:]' '[:lower:]')${NAME:1}

mkdir -p "$DIRNAME"

cat > $DIRNAME/$INPUT_NAME.vue <<EOF
<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>

  //import {  }  from 'element-plus'

  import { computed } from 'vue'

  import { Rw$NAME } from '@rw-vue-framework/controls'

  defineOptions({
    name: 'Rw$NAME',
  })

  const props = defineProps<{control: Rw$NAME.${INPUT_NAME}C}>()

</script>
EOF
# 转换为CRLF格式
sed -i 's/$/\r/' $DIRNAME/$INPUT_NAME.vue

cat > $DIRNAME/$INPUT_NAME.ts <<EOF
import { base } from '@rw-vue-framework/controls'
//import { controlBaseTypeT } from '@rw-vue-framework/constants'
import { withInstall,type SFCWithInstall } from '@rw-vue-framework/utils'
import $NAME from './$INPUT_NAME.vue'

export const Template: SFCWithInstall<typeof $NAME> = withInstall($NAME)

export interface ${INPUT_NAME}I extends base.controlBaseOptionsI {

}

export function init(name: string, options:${INPUT_NAME}I = {}){
  return new ${INPUT_NAME}C(name,options);
}

export class ${INPUT_NAME}C extends base.controlBaseC{

  constructor(name: string, options:${INPUT_NAME}I = {}) {
    super(name, '$INPUT_NAME', options)
  }
}

EOF
# 转换为CRLF格式
sed -i 's/$/\r/' $DIRNAME/$INPUT_NAME.ts


cat <<EOF >"$DIRNAME/index.ts"
export * as Rw$NAME from './$PROP_NAME'
EOF
# 转换为CRLF格式
sed -i 's/$/\r/' $DIRNAME/index.ts

cat > $DIRNAME/$INPUT_NAME.test.tsx <<EOF
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import $NAME from './$INPUT_NAME.vue'

const AXIOM = 'Rem is the best girl'

describe('$NAME.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <$NAME>{AXIOM}</$NAME>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
EOF
# 转换为CRLF格式
sed -i 's/$/\r/' $DIRNAME/$INPUT_NAME.test.tsx

cat > $DIRNAME/$INPUT_NAME.scss <<EOF

EOF
# 转换为CRLF格式
sed -i 's/$/\r/' $DIRNAME/$INPUT_NAME.scss

perl -0777 -pi -e "s/\r\n\r\n/\nexport * from '.\/$INPUT_NAME'\r\n\r\n/" $FILE_PATH/controls/index.ts

TYPE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../typings" && pwd)

perl -0777 -pi -e "s/\r\n\s+}/\n    Rw$NAME: typeof import('rw-vue-framework')['Rw$NAME']\n  }/" $TYPE_PATH/global.d.ts
