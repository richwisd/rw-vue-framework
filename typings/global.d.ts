declare module 'vue' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    RwText: typeof import('rw-element-admin')['RwText']
    RwButton: typeof import('rw-element-admin')['RwButton']
    RwDivider: typeof import('rw-element-admin')['RwDivider']
    RwPopConfirm: typeof import('rw-element-admin')['RwPopConfirm']
    RwDropdown: typeof import('rw-element-admin')['RwDropdown']
    RwButtonGroup: typeof import('rw-element-admin')['RwButtonGroup']
    RwBetween: typeof import('rw-element-admin')['RwBetween']
    RwInput: typeof import('rw-element-admin')['RwInput']
    RwInputNumber: typeof import('rw-element-admin')['RwInputNumber']
    RwCard: typeof import('rw-element-admin')['RwCard']
  }

  interface ComponentCustomProperties {}
}
export {}
