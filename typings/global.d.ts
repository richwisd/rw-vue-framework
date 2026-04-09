declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    RwText: typeof import('rw-vue-framework')['RwText']
    RwButton: typeof import('rw-vue-framework')['RwButton']
    RwDivider: typeof import('rw-vue-framework')['RwDivider']
    RwPopConfirm: typeof import('rw-vue-framework')['RwPopConfirm']
    RwDropdown: typeof import('rw-vue-framework')['RwDropdown']
    RwButtonGroup: typeof import('rw-vue-framework')['RwButtonGroup']
    RwBetween: typeof import('rw-vue-framework')['RwBetween']
    RwInput: typeof import('rw-vue-framework')['RwInput']
    RwInputNumber: typeof import('rw-vue-framework')['RwInputNumber']
    RwCard: typeof import('rw-vue-framework')['RwCard']
  }

  interface ComponentCustomProperties {}
}
export {}
