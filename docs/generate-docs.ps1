# 批量生成组件文档脚本
# 定义组件映射表：组件名 → 分类、中文名、说明、demo文件名（无则$null）

$components = @(
    # 基础组件
    @{name='buttonGroup'; cat='basic'; cn='ButtonGroup 按钮组'; desc='按钮组容器，扩展自 Element Plus 的 ElButtonGroup。'; demo='buttonGroupDemo.vue'}
    @{name='text'; cat='basic'; cn='Text 文本'; desc='文本显示组件，支持多语言、复制等功能。'; demo='textDemo.vue'}
    @{name='divider'; cat='basic'; cn='Divider 分割线'; desc='分割线组件，扩展自 Element Plus 的 ElDivider。'; demo='dividerDemo.vue'}
    @{name='tag'; cat='basic'; cn='Tag 标签'; desc='标签组件，扩展自 Element Plus 的 ElTag。'; demo=$null}
    @{name='tagComp'; cat='basic'; cn='TagComp 标签组件'; desc='标签组件，支持动态标签管理。'; demo=$null}
    @{name='smallComp'; cat='basic'; cn='SmallComp 小组件'; desc='小型组件容器，用于紧凑布局。'; demo=$null}

    # 表单输入
    @{name='inputNumber'; cat='form'; cn='InputNumber 数字输入'; desc='数字输入框，扩展自 Element Plus 的 ElInputNumber。'; demo='inputNumberDemo.vue'}
    @{name='inputTag'; cat='form'; cn='InputTag 输入标签'; desc='输入标签组件，扩展自 Element Plus 的 ElInputTag。'; demo='inputTagDemo.vue'}
    @{name='autocomplete'; cat='form'; cn='Autocomplete 自动补全'; desc='自动补全输入框，扩展自 Element Plus 的 ElAutocomplete。'; demo=$null}
    @{name='mergeSelect'; cat='form'; cn='MergeSelect 合并选择器'; desc='合并选择器，支持多选、树形选择。'; demo='mergeSelectDemo.vue'}
    @{name='mergeInput'; cat='form'; cn='MergeInput 合并输入'; desc='合并输入组件，支持多种输入类型组合。'; demo=$null}
    @{name='checkbox'; cat='form'; cn='Checkbox 多选框'; desc='多选框组件，扩展自 Element Plus 的 ElCheckbox。'; demo='checkboxDemo.vue'}
    @{name='radio'; cat='form'; cn='Radio 单选框'; desc='单选框组件，扩展自 Element Plus 的 ElRadio。'; demo='radioDemo.vue'}
    @{name='switch'; cat='form'; cn='Switch 开关'; desc='开关组件，扩展自 Element Plus 的 ElSwitch。'; demo='switchDemo.vue'}
    @{name='colorPicker'; cat='form'; cn='ColorPicker 颜色选择器'; desc='颜色选择器，扩展自 Element Plus 的 ElColorPicker。'; demo='colorPickerDemo.vue'}
    @{name='date'; cat='form'; cn='DatePicker 日期选择'; desc='日期选择器，扩展自 Element Plus 的 ElDatePicker。'; demo=$null}
    @{name='between'; cat='form'; cn='Between 范围选择'; desc='范围选择组件，用于选择区间值。'; demo=$null}
    @{name='slider'; cat='form'; cn='Slider 滑块'; desc='滑块组件，扩展自 Element Plus 的 ElSlider。'; demo='sliderDemo.vue'}
    @{name='rate'; cat='form'; cn='Rate 评分'; desc='评分组件，扩展自 Element Plus 的 ElRate。'; demo='rateDemo.vue'}
    @{name='transfer'; cat='form'; cn='Transfer 穿梭框'; desc='穿梭框组件，扩展自 Element Plus 的 ElTransfer。'; demo='transferDemo.vue'}
    @{name='uploadNew'; cat='form'; cn='UploadNew 上传'; desc='上传组件，扩展自 Element Plus 的 ElUpload。'; demo=$null}
    @{name='map'; cat='form'; cn='Map 地图'; desc='地图组件，用于地理位置选择。'; demo=$null}

    # 表单容器
    @{name='form'; cat='form-container'; cn='Form 表单'; desc='表单容器组件，扩展自 Element Plus 的 ElForm，支持配置驱动。'; demo='formDemo.vue'}
    @{name='formItems'; cat='form-container'; cn='FormItems 表单项'; desc='表单项容器，用于管理多个表单控件。'; demo=$null}
    @{name='search'; cat='form-container'; cn='Search 搜索区'; desc='搜索区组件，用于列表页面的搜索条件区域。'; demo='searchDemo.vue'}

    # 反馈组件
    @{name='alert'; cat='feedback'; cn='Alert 警告'; desc='警告提示组件，扩展自 Element Plus 的 ElAlert。'; demo='alertDemo.vue'}
    @{name='message'; cat='feedback'; cn='Message 消息提示'; desc='消息提示组件，扩展自 Element Plus 的 ElMessage。'; demo='messageDemo.vue'}
    @{name='messageBox'; cat='feedback'; cn='MessageBox 弹框'; desc='弹框组件，扩展自 Element Plus 的 ElMessageBox。'; demo='messageBoxDemo.vue'}
    @{name='notification'; cat='feedback'; cn='Notification 通知'; desc='通知组件，扩展自 Element Plus 的 ElNotification。'; demo='notificationDemo.vue'}
    @{name='drawer'; cat='feedback'; cn='Drawer 抽屉'; desc='抽屉组件，扩展自 Element Plus 的 ElDrawer。'; demo='drawerDemo.vue'}
    @{name='dialog'; cat='feedback'; cn='Dialog 对话框'; desc='对话框组件，扩展自 Element Plus 的 ElDialog，支持配置驱动。'; demo=$null}
    @{name='popconfirm'; cat='feedback'; cn='Popconfirm 气泡确认框'; desc='气泡确认框，扩展自 Element Plus 的 ElPopconfirm。'; demo='popconfirmDemo.vue'}
    @{name='popover'; cat='feedback'; cn='Popover 气泡卡片'; desc='气泡卡片组件，扩展自 Element Plus 的 ElPopover。'; demo='popoverDemo.vue'}
    @{name='tooltip'; cat='feedback'; cn='Tooltip 文字提示'; desc='文字提示组件，扩展自 Element Plus 的 ElTooltip。'; demo='tooltipDemo.vue'}
    @{name='progress'; cat='feedback'; cn='Progress 进度条'; desc='进度条组件，扩展自 Element Plus 的 ElProgress。'; demo='progressDemo.vue'}
    @{name='result'; cat='feedback'; cn='Result 结果'; desc='结果组件，扩展自 Element Plus 的 ElResult。'; demo='resultDemo.vue'}
    @{name='empty'; cat='feedback'; cn='Empty 空状态'; desc='空状态组件，扩展自 Element Plus 的 ElEmpty。'; demo='emptyDemo.vue'}
    @{name='skeleton'; cat='feedback'; cn='Skeleton 骨架屏'; desc='骨架屏组件，扩展自 Element Plus 的 ElSkeleton。'; demo='seletonDemo.vue'}

    # 导航组件
    @{name='breadcrumb'; cat='navigation'; cn='Breadcrumb 面包屑'; desc='面包屑导航组件，扩展自 Element Plus 的 ElBreadcrumb。'; demo='breadcrumbDemo.vue'}
    @{name='dropdown'; cat='navigation'; cn='Dropdown 下拉菜单'; desc='下拉菜单组件，扩展自 Element Plus 的 ElDropdown。'; demo='dropdownDemo.vue'}
    @{name='tabs'; cat='navigation'; cn='Tabs 标签页'; desc='标签页组件，扩展自 Element Plus 的 ElTabs。'; demo=$null}
    @{name='tabPane'; cat='navigation'; cn='TabPane 标签面板'; desc='标签面板项，扩展自 Element Plus 的 ElTabPane。'; demo=$null}
    @{name='steps'; cat='navigation'; cn='Steps 步骤条'; desc='步骤条组件，扩展自 Element Plus 的 ElSteps。'; demo='stepsDemo.vue'}
    @{name='backtop'; cat='navigation'; cn='Backtop 回到顶部'; desc='回到顶部组件，扩展自 Element Plus 的 ElBacktop。'; demo='backtopDemo.vue'}
    @{name='affix'; cat='navigation'; cn='Affix 固钉'; desc='固钉组件，扩展自 Element Plus 的 ElAffix。'; demo='affixDemo.vue'}
    @{name='pagination'; cat='navigation'; cn='Pagination 分页'; desc='分页组件，扩展自 Element Plus 的 ElPagination。'; demo=$null}

    # 数据展示
    @{name='table'; cat='data-display'; cn='Table 表格'; desc='表格组件，扩展自 Element Plus 的 ElTable，支持配置驱动。'; demo='tableDemo.vue'}
    @{name='descriptions'; cat='data-display'; cn='Descriptions 描述列表'; desc='描述列表组件，扩展自 Element Plus 的 ElDescriptions。'; demo='descriptionsDemo.vue'}
    @{name='badge'; cat='data-display'; cn='Badge 徽章'; desc='徽章组件，扩展自 Element Plus 的 ElBadge。'; demo='badgeDemo.vue'}
    @{name='avatar'; cat='data-display'; cn='Avatar 头像'; desc='头像组件，扩展自 Element Plus 的 ElAvatar。'; demo='avatarDemo.vue'}
    @{name='card'; cat='data-display'; cn='Card 卡片'; desc='卡片组件，扩展自 Element Plus 的 ElCard。'; demo='cardDemo.vue'}
    @{name='carousel'; cat='data-display'; cn='Carousel 走马灯'; desc='走马灯组件，扩展自 Element Plus 的 ElCarousel。'; demo='carouselDemo.vue'}
    @{name='collapse'; cat='data-display'; cn='Collapse 折叠面板'; desc='折叠面板组件，扩展自 Element Plus 的 ElCollapse。'; demo='collapseDemo.vue'}
    @{name='image'; cat='data-display'; cn='Image 图片'; desc='图片组件，扩展自 Element Plus 的 ElImage。'; demo=$null}
    @{name='timeline'; cat='data-display'; cn='Timeline 时间线'; desc='时间线组件，扩展自 Element Plus 的 ElTimeline。'; demo='timelineDemo.vue'}
    @{name='watermark'; cat='data-display'; cn='Watermark 水印'; desc='水印组件，扩展自 Element Plus 的 ElWatermark。'; demo='watermarkDemo.vue'}
    @{name='tree'; cat='data-display'; cn='Tree 树形控件'; desc='树形控件，扩展自 Element Plus 的 ElTree。'; demo=$null}
    @{name='calendar'; cat='data-display'; cn='Calendar 日历'; desc='日历组件，扩展自 Element Plus 的 ElCalendar。'; demo='calendarDemo.vue'}
    @{name='segmented'; cat='data-display'; cn='Segmented 分段控制器'; desc='分段控制器，扩展自 Element Plus 的 ElSegmented。'; demo='segmentedDemo.vue'}
    @{name='infiniteScroll'; cat='data-display'; cn='InfiniteScroll 无限滚动'; desc='无限滚动指令组件，扩展自 Element Plus 的 ElInfiniteScroll。'; demo='infiniteScrollDemo.vue'}

    # 页面组件
    @{name='pageBase'; cat='page'; cn='PageBase 页面基础'; desc='页面基础组件，提供列表页面基础布局。'; demo='../../pages/pageBase/index.vue'}
    @{name='pageForm'; cat='page'; cn='PageForm 页面表单'; desc='页面表单组件，提供完整表单页面方案。'; demo='pageFormDialog.vue'}
    @{name='pageTable'; cat='page'; cn='PageTable 页面表格'; desc='页面表格组件，提供完整列表页面方案。'; demo='../../pages/pageTable/index.vue'}
    @{name='pageStruct'; cat='page'; cn='PageStruct 页面结构'; desc='页面结构组件，用于组织页面区域。'; demo=$null}
)

$baseDir = "d:\www\clogcn.com\rw-vue-framework\docs\src\components"

# PascalCase 转换函数
function To-PascalCase($name) {
    return ($name -split '-' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ''
}

foreach ($comp in $components) {
    $name = $comp.name
    $cat = $comp.cat
    $cn = $comp.cn
    $desc = $comp.desc
    $demo = $comp.demo

    $pascalName = To-PascalCase $name
    $rwName = "Rw$pascalName"

    # 确定目录
    $dir = "$baseDir\$cat"
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    $filePath = "$dir\$name.md"

    # 构建 demo 引入路径
    $demoImport = ""
    $demoSource = ""
    if ($demo) {
        if ($demo -like "../*") {
            # 页面级 demo
            $demoPath = "../../../../demos/src/pages/$demo"
            $demoImport = @"
<script setup>
import Demo from '$demoPath'
</script>

<Demo />
"@
        } else {
            $demoPath = "../../../../demos/src/pages/controls/$demo"
            $demoImport = @"
<script setup>
import Demo from '$demoPath'
</script>

<Demo />
"@
        }
        $demoSource = "`n## 源码`n`n<<< $demoPath{vue}`n"
    }

    # 生成文档内容
    $content = @"
---
outline: deep
title: $cn
---

# $cn

$desc

## 引入

``````ts
import { $rwName } from 'rw-vue-framework/controls'
``````

## 基础用法

$demoImport
$demoSource
## API

### init 参数

``````ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): Partial<OptionT>
``````

| 参数       | 说明           | 类型               | 默认值 |
| ---------- | -------------- | ------------------ | ------ |
| moduleName | 模块名         | string             | -      |
| name       | 控件名         | string             | -      |
| options    | 选项对象       | Partial\<OptionT\> | -      |

### Template Props

| 名称    | 说明         | 类型               | 默认值 |
| ------- | ------------ | ------------------ | ------ |
| control | 控件描述对象 | Partial\<OptionT\> | -      |

### OptionT 类型

OptionT 继承自 Element Plus 对应组件的 Props 类型，并扩展了框架基础属性（`baseT`），具体属性请参考源码 `src/packages/controls/$name/$name.ts`。
"@

    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Host "Created: $cat/$name.md" -ForegroundColor Green
}

Write-Host "`n总共生成 $($components.Count) 个组件文档" -ForegroundColor Cyan
