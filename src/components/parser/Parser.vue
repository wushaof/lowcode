<script>
import { deepClone } from '@/utils/index'
import render from '@/components/render/render.js'
import { getStyles } from '@/components/generator/handleForm'
import { eventSystem }  from '@/events'
import { pagination } from '@/components/generator/config'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}

const layouts = {
  colFormItem(h, scheme) {
    const config = scheme.__config__
    const listeners = buildListeners.call(this, scheme, 'on')
    const nativeListeners = buildListeners.call(this, scheme, 'nativeOn')
    const child = renderChildren.apply(this, arguments)
    let styles = getStyles(config)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span}>
        <el-form-item
          style={{...styles}}
          label-width={labelWidth}
          prop={scheme.__vModel__}
          label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} nativeOn={nativeListeners}>
            {child}
          </render>
          {/* 表格使用分页 */}
          {config.usePagination &&
            <render key={pagination.renderKey} conf={pagination} onCurrentChange={ event => {
              console.log('------表格分页------') 
            }}/>
          }
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme, index, list) {
    let child = renderChildren.apply(this, arguments)
    const config = scheme.__config__
    let styles = getStyles(config)
    // 栅格布局
    if (config.compType === 'grid') {
      const ratio = config.ratio.split(':')
      return (
        <div class='grid-container' style={{...styles}}>
          <el-row gutter={config.gutter} >
            {ratio.map((_span, idx) => {

              const gridChild = renderChildren.call(this, h, config.children[idx])

              styles = getStyles(config.children[idx].__config__)

              return (
                <el-col span={_span*1} style={{...styles}}>
                  <draggable disabled={true} list={config.children[idx].__config__.children || []} animation={340}
                    group="componentsGroup" class={['drag-wrapper grid-item']}>
                    {gridChild}
                  </draggable>
                </el-col>
              )
            })}
          </el-row>
        </div>
      )
    }
    if (scheme.type === 'flex') {
      child = <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
              {child}
            </el-row>
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter}>
          {child}
        </el-row>
      </el-col>
    )
  },
  raw(h, scheme, index, list) {
    const config = scheme.__config__
    const child = renderChildren.apply(this, arguments)
    return <render key={config.renderKey} conf={scheme} onInput={ event => {
      this.$set(config, 'defaultValue', event)
    }}>
      {child}
    </render>
  }
}

function renderFrom(h) {
  const { formConfCopy } = this

  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  )
}

function formBtns(h) {
  return <el-col>
    <el-form-item size="large">
      <el-button type="primary" onClick={this.submitForm}>提交</el-button>
      <el-button onClick={this.resetForm}>重置</el-button>
    </el-form-item>
  </el-col>
}

function renderFormItem(h, elementList) {
  return elementList.map((scheme, index) => {
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme, index, elementList)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.__config__
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function setValue(event, config, scheme) {
  console.log('设置值---', config, this[this.formConf.formModel])
  this.$set(config, 'defaultValue', event)
  this.$set(this[this.formConf.formModel], scheme.__vModel__, event)
  // 数据改变时触发的事件
  eventSystem.call(this, 'change', scheme)

}

// 事件处理
function buildListeners(scheme, type) {
  const config = scheme.__config__
  const methods = this.formConf.__methods__ || {}
  const listeners = {}

  // 事件监听
  if (type === 'on') {
    // 给__methods__中的方法绑定this和event
    Object.keys(methods).forEach(key => {
      listeners[key] = event => methods[key].call(this, event)
    })
    // 响应 render.js 中的 vModel $emit('input', val)
    listeners.input = event => setValue.call(this, event, config, scheme)
  } else if (type === 'nativeOn') {
    // 仅用于组件，监听原生事件
    listeners.click = () => {
      eventSystem.call(this, 'click', scheme)
    }
  }
  return listeners
}

export default {
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    }
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    return data
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = { required: config.required, message: cur.placeholder }
            if (Array.isArray(config.defaultValue)) {
              required.type = 'array'
              required.message = `请至少选择一个${config.label}`
            }
            required.message === undefined && (required.message = `${config.label}不能为空`)
            config.regList.push(required)
          }
          rules[cur.__vModel__] = config.regList.map(item => {
            item.pattern && (item.pattern = eval(item.pattern))
            item.trigger = ruleTrigger && ruleTrigger[config.tag]
            return item
          })
        }
        if (config.children) this.buildRules(config.children, rules)
      })
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      this.$refs[this.formConf.formRef].validate(valid => {
        if (!valid) return false
        // 触发sumit事件
        this.$emit('submit', this[this.formConf.formModel])
        return true
      })
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>
<style scoped>
  ::v-deep .row-form {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .grid-item .el-form-item {
    margin-bottom: 0;
  }
  .grid-item::after {
    content: '';
    display: block;
    clear: both;
  }
  .el-form-item {
    margin-bottom: 0;
  }
</style>
