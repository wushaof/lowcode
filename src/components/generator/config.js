import { nanoid } from 'nanoid'
// 页面属性【右面板】
export const formConf = {
  __config__: {
    compType: 'page',
  },
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: false,
}

// 栅格子元素，分栏
export const gridItem = {
  __config__: {
    layout: 'rowFormItem',
    tagIcon: 'row',
    compType: 'gridItem',
    show: true,
    children: [],
  }
}
// 分页
export const pagination = {
  __config__: {
    layout: 'colFormItem',
    tag: 'el-pagination',
    span: 24,
    formId: 101,
    renderKey: nanoid(5),
    compType: 'pagination',
    componentName: 'pagination',
    showLabel: false,
    labelWidth: null,
  },
  layout: 'total, sizes, prev, pager, next, jumper',
  total: 400,
  on: {
    'current-change': function(){}
  }
}
// 列表操作列按钮
export const tableOperateButton = {
  __config__: {
    tag: 'el-button',
    tagIcon: 'button',
    layout: 'raw',
    renderKey: nanoid(5)
  },
  __slot__: {
    default: '按钮',
  },
  type: 'text',
  icon: 'el-icon-edit',
  round: false,
  size: 'medium'
}
// 列表操作列
export const tableOperateList = {
  __config__: {
    layout: 'raw',
    tag: 'el-table-column',
    compType: 'tableColumn',
    renderKey: nanoid(5),
    operate: true, // 标识为操作列
    children: [
      tableOperateButton
    ]
  },
  label: '操作'
}

// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: '单行文本',
      compType: 'text',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      show: true,
      span: 24,
      // 正则校验规则
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    // 组件的插槽属性
    __slot__: {
      prepend: '',
      append: ''
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      show: true,
      tag: 'el-input',
      compType: 'textarea',
      tagIcon: 'textarea',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '密码',
      showLabel: true,
      labelWidth: null,
      compType: 'text',
      tag: 'el-input',
      show: true,
      tagIcon: 'password',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    'show-password': true,
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '计数器',
      showLabel: true,
      compType: 'number',
      labelWidth: null,
      tag: 'el-input-number',
      show: true,
      tagIcon: 'number',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    placeholder: '',
    min: undefined,
    max: undefined,
    step: 1,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
    disabled: false
  },
  {
    __config__: {
      label: '编辑器',
      showLabel: true,
      compType: 'richText',
      labelWidth: null,
      show: true,
      tag: 'tinymce',
      tagIcon: 'rich-text',
      defaultValue: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    placeholder: '请输入',
    height: 300, // 编辑器高度
    branding: false // 隐藏右下角品牌烙印
  }
]

// 选择型组件 【左面板】
export const selectComponents = [
  {
    __config__: {
      label: '下拉选择',
      showLabel: true,
      labelWidth: null,
      compType: 'select',
      tag: 'el-select',
      show: true,
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    placeholder: '请选择',
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },
  {
    __config__: {
      label: '级联选择',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'options',
      showLabel: true,
      compType: 'cascader',
      show: true,
      labelWidth: null,
      tag: 'el-cascader',
      tagIcon: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 24,
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    options: [{
      id: 1,
      value: 1,
      label: '选项1',
      children: [{
        id: 2,
        value: 2,
        label: '选项1-1'
      }]
    }],
    placeholder: '请选择',
    style: { width: '100%' },
    props: {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: '/'
  },
  {
    __config__: {
      label: '单选框组',
      labelWidth: null,
      compType: 'radioGroup',
      show: true,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: 'medium',
    disabled: false
  },
  {
    __config__: {
      label: '多选框组',
      tag: 'el-checkbox-group',
      compType: 'checkGroup',
      tagIcon: 'checkbox',
      defaultValue: [],
      span: 24,
      show: true,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      required: true,
      regList: [],
      border: false,
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: 'medium',
    min: null,
    max: null,
    disabled: false
  },
  {
    __config__: {
      label: '开关',
      tag: 'el-switch',
      compType: 'switch',
      tagIcon: 'switch',
      show: true,
      defaultValue: false,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    style: {},
    disabled: false,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': true,
    'inactive-value': false
  },
  {
    __config__: {
      label: '滑块',
      tag: 'el-slider',
      compType: 'slider',
      tagIcon: 'slider',
      defaultValue: null,
      span: 24,
      showLabel: true,
      show: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      event: {
        click: [],
        load: [],
        change: []
      },
      regList: [],
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    'show-stops': false,
    range: false
  },
  {
    __config__: {
      label: '时间选择',
      tag: 'el-time-picker',
      compType: 'timePicker',
      tagIcon: 'time',
      show: true,
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    __config__: {
      label: '时间范围',
      tag: 'el-time-picker',
      compType: 'timeRange',
      tagIcon: 'time-range',
      show: true,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      defaultValue: null,
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    __config__: {
      label: '日期选择',
      tag: 'el-date-picker',
      compType: 'datePicker',
      tagIcon: 'date',
      defaultValue: null,
      showLabel: true,
      show: true,
      labelWidth: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    placeholder: '请选择',
    type: 'date',
    style: { width: '100%' },
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  {
    __config__: {
      label: '日期范围',
      tag: 'el-date-picker',
      compType: 'dateRange',
      tagIcon: 'date-range',
      defaultValue: null,
      span: 24,
      showLabel: true,
      show: true,
      labelWidth: null,
      required: true,
      layout: 'colFormItem',
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    style: { width: '100%' },
    type: 'daterange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    disabled: false,
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false
  },
  {
    __config__: {
      label: '评分',
      tag: 'el-rate',
      tagIcon: 'rate',
      compType: 'rate',
      defaultValue: 0,
      show: true,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
    disabled: false
  },
  {
    __config__: {
      label: '颜色选择',
      tag: 'el-color-picker',
      compType: 'color',
      tagIcon: 'color',
      span: 24,
      show: true,
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      event: {
        click: [],
        load: [],
        change: []
      },
    },
    'show-alpha': false,
    'color-format': '',
    disabled: false,
    size: 'medium'
  },
  {
    __config__: {
      label: '上传',
      tag: 'el-upload',
      show: true,
      tagIcon: 'upload',
      compType: 'upload',
      layout: 'colFormItem',
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      required: true,
      span: 24,
      showTip: false,
      buttonText: '点击上传',
      regList: [],
      fileSize: 2,
      sizeUnit: 'MB',
      event: {
        click: [],
        load: [],
      },
    },
    __slot__: {
      'list-type': true
    },
    action: 'https://jsonplaceholder.typicode.com/posts/',
    disabled: false,
    accept: '',
    name: 'file',
    'auto-upload': true,
    'list-type': 'text',
    multiple: false
  }
]

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      show: true,
      compType: 'row',
      label: '行容器',
      layoutTree: true,
    },
    type: 'default',
    justify: 'start',
    align: 'top'
  },
  {
    __config__: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      show: true,
      compType: 'grid',
      label: '栅格',
      ratio: '12:12',
      gutter: 0,
      layoutTree: true,
      children: [
        gridItem,
        gridItem
      ]
    },
  },
  {
    __config__: {
      label: '按钮',
      showLabel: true,
      compType: 'button',
      show: true,
      labelWidth: null,
      tag: 'el-button',
      tagIcon: 'button',
      span: 24,
      layout: 'colFormItem',
      event: {
        click: [],
        load: [],
      },
    },
    __slot__: {
      default: '主要按钮'
    },
    type: 'primary',
    icon: 'el-icon-search',
    round: false,
    size: 'medium',
    plain: false,
    circle: false,
    disabled: false
  },
  {
    __config__: {
      layout: 'colFormItem',
      tagIcon: 'table',
      tag: 'el-table',
      span: 24,
      show: true,
      formId: 101,
      renderKey: nanoid(5),
      compType: 'table',
      componentName: 'row101',
      showLabel: false,
      labelWidth: null,
      label: '列表',
      useOperate: true,
      usePagination: true,
      dataType: 'dynamic',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'data',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/tableData',
      children: [{
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: nanoid(5)
        },
        prop: 'date',
        label: '日期（示例）'
      }, {
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: nanoid(5)
        },
        prop: 'address',
        label: '地址（示例）'
      }, {
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: nanoid(5)
        },
        prop: 'name',
        label: '名称（示例）'
      }, tableOperateList]
    },
    data: [],
    directives: [{
      name: 'loading',
      value: true
    }],
    border: true,
    type: 'default',
    justify: 'start',
    align: 'top'
  },
]
