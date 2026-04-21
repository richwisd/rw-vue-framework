import { type langInfoI } from "../../../locale";

const lang: langInfoI = {
  "TITLE": "Personalization Configuration",
  "saveToServer": "Save to Remote",
  "getFromServer": "Retrieve from Remote",
  "resetDefault": "Restore to Default",

  // New messages
  "messages": {
    "gettingRemoteConfig": "Retrieving remote configuration...",
    "savingRemoteConfig": "Saving configuration to remote...",
    "remoteDataEmpty": "Remote data is empty",
    "remoteDataInvalid": "Invalid or empty remote data structure",
    "configMergeFailed": "Configuration merge failed",
    "getRemoteConfigSuccess": "Remote configuration retrieved successfully, {count} configuration modules updated",
    "getRemoteConfigFailed": "Failed to retrieve remote configuration",
    "saveRemoteConfigSuccess": "Remote configuration saved successfully",
    "saveRemoteConfigFailed": "Failed to save remote configuration",
    "unknownError": "Unknown error"
  },

  // Four sections
  "base": "Basic Settings",
  "pageTitle": "Global Page",
  "table": "Table Settings",
  "form": "Form Settings",
  // Separators
  "searchArea": "Search Area",
  "tableArea": "Table Area",
  "paginationArea": "Pagination Area",
  // Matching with stores/localSetting
  "systemTitle": "Global Basics",
  "messageTitle": "Message Box",
  "buttonType": "Button Style",
  "checkBoxTitle": "Single/Checkbox Style",
  "linkTitle": "Link Style",

  // System configuration
  "system": {
    "dark": "Dark Mode",
    "locale": "Display Language",
    "langLable": "Language Display Style",
    "size": "Text Size",
    "message": {
      "max": "Maximum Quantity",
      "grouping": "Group Similar Messages",
      "duration": "Display Duration",
      "showClose": "Close Button",
      "offset": "Offset",
      "plain": "Show Background"
    },
    "button": {
      "type": "Style",
      "autoInsertSpace": "Auto Spacing",
      "plain": "Plain",
      "round": "Rounded"
    },
    "checkBox": "Single/Checkbox Style",
    "link": {
      "type": "Style",
      "underline": "Underline"
    },
    "maxOpenPage": "Maximum Cached Pages"
  },

  // Global page
  "widgetsSwitch": "Page Widgets",
  "pageResult": "Page Effect",
  "layout": {
    "layout": "Layout Style",
    "fullScreen": "Enable Full Screen",
    "backTop": "Back to Top"
  },
  "smallComponents": {
    "dark": "Dark Mode",
    "lang": "Language Selector",
    "fullScreen": "Full Screen Button",
    "size": "Size Control",
    "tabs": "Tabs"
  },
  "page": {
    "process": "Loading Progress",
    "transition": "Page Transition Animation",
    "waterType": "Watermark Display Effect",
    "dialogType": "Drawer Effect"
  },

  // Table settings
  "pageTableTitle": "Table Header",
  "searchTitle": "Search Area",
  "tableTitle": "Table Area",
  "buttonTitle": "Operation Area",
  "paginationTitle": "Pagination",
  "pageTable": {
    "showTitle": "Title",
    "margin": "Margin",
    "search": {
      "oneLineControl": "Single Line Controls",
      "mergeStringControl": "Merge String Search Box",
      "stringControlLocation": "Merge Search Box Location",
      "labelPosition": "Search Label Position",
      "buttonStyle": "Button Style"
    },
    "table": {
      "deleteConfirmStyle": "Delete Confirmation Style",
      "showHeader": "Show Header",
      "showHeadBgColor": "Show Header Background",
      "verticalLine": "Vertical Lines",
      "horizontalLine": "Horizontal Lines",
      "stripe": "Striped",
      "highlightCurrentRow": "Highlight Current Row",
      "height": "Table Height",
      "buttonStyle": "Button Style",
      "showIndex":"Show Index",
      "fit": "Column Width Auto-fit",
      "fixed": "Fixed Function Area",
      "showMenu": "Function Buttons",
      "multiLangShowType": "Multi-language Display Type",
      "maxButtons": "Button Display Limit"
    },
    "buttons": {
      "groupType": "Button Grouping",
      "location": "Button Position",
      "buttonStyle": "Button Style"
    },
    "pagination": {
      "location": "Pagination Position",
      "footerFollow": "Footer Follow",
      "showBgColor": "Show Background"
    }
  },

  // Form settings
  "pageForm": {
    "showTitle": "Title",
    "margin": "Margin",
    "form": {
      "gutter": "Control Margin",
      "labelPosition": "Label Position",
      "formItemwidth": "Label Width",
      "oneLineControl": "Single Line Controls"
    },
    "buttons": {
      "groupType": "Button Grouping",
      "location": "Horizontal Button Position",
      "verticalLocation": "Vertical Button Position",
      "buttonStyle": "Button Style"
    },
    "autoSaveLocal": "Auto-save to Local"
  },
  "pageFormDialogTitle": "Dialog Configuration",
  "pageFormDialog": {
    "showTitle": "Title",
    "margin": "Margin",
    "form": {
      "gutter": "Control Margin",
      "formItemwidth": "Label Width",
      "labelPosition": "Label Position",
      "oneLineControl": "Single Line Controls"
    },
    "buttons": {
      "location": "Horizontal Button Position",
      "verticalLocation": "Vertical Button Position",
      "buttonStyle": "Button Style"
    }
  }
};

export default lang;
