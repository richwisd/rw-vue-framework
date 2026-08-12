import { RwPageTable } from "./index"

export type OptionT = {
  mTablePage: RwPageTable.OptionT
  tablePage:  RwPageTable.OptionT
}

export function init(options: OptionT) {
  const mTablePage = RwPageTable.init(options.mTablePage.struct)
  const tablePage = RwPageTable.init(options.tablePage.struct)
  return {
    mTablePage,
    tablePage,
  }
}

