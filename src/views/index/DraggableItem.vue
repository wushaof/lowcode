<script>
import draggable from 'vuedraggable'
import render from '@/components/render/render'
import { pagination } from '@/components/generator/config'
import { eventSystem }  from '@/events'

const components = {
  itemBtns(h, currentItem, index, list) {
    const { copyItem, deleteItem } = this.$listeners
    return [
      <span class="drawing-item-copy" title="复制" onClick={event => {
        copyItem(currentItem, list); event.stopPropagation()
      }}>
        <i class="el-icon-copy-document" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem(index, list); event.stopPropagation()
      }}>
        <i class="el-icon-delete" />
      </span>
    ]
  }
}
const layouts = {
  colFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__

    // 表单赋值，模拟表单渲染时的数据，配置页面调试使用
    function setValue(event, config, item) {
      const formModel = this.formConf.formModel + 'TEST'
      if (!this.formConf[formModel]) {
        this.$set(this.formConf, formModel, {})
      }
      console.log('表单数据---', this.formConf[formModel])

      this.$set(this.formConf[formModel], item.__vModel__, event)
    }

    // 表格使用分页逻辑
    if (config.usePagination) {
      
    }
    const child = renderChildren.apply(this, arguments)
    let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span} class={[className, 'row-form']}
        nativeOnClick={event => { activeItem(currentItem); event.stopPropagation(); }}>
        <el-form-item label-width={labelWidth}
          label={config.showLabel ? config.label : ''} required={config.required}>
          <render key={config.renderKey} conf={currentItem} onInput={ event => {
            this.$set(config, 'defaultValue', event)
            setValue.call(this, event, config, currentItem)
            eventSystem.call(this, 'change', currentItem, event)

          }} nativeOnClick={event => {
            eventSystem.call(this, 'click', currentItem, event)
          }}>
            {child}
          </render>
          {/* 表格使用分页 */}
          {config.usePagination &&
            <render key={pagination.renderKey} conf={pagination} onCurrentChange={ event => {
              console.log('------表格分页------') 
            }}/>
          }

        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__
    const className = this.activeId === config.formId
      ? 'drawing-row-item active-from-item'
      : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)

    //  栅格布局
    if (config.compType === 'grid') {
      const ratio = config.ratio.split(':')

      return (
        <div class={[className, 'grid-container']} onClick={event => { activeItem(currentItem); event.stopPropagation() }}>
          <el-row gutter={config.gutter} >
            {ratio.map((_span, idx) => {

              const gridChild = renderChildren.call(this, h, config.children[idx])

              const className1 = this.activeId === config.children[idx].__config__.formId
              ? 'grid-item active-grid-item'
              : 'grid-item'

              return (
                <el-col span={_span*1} nativeOnClick={event => { activeItem(config.children[idx]); event.stopPropagation() }}>
                  <draggable list={config.children[idx].__config__.children || []} animation={340}
                    group="componentsGroup" class={['drag-wrapper drawing-row-item border-none', className1]}>
                    {gridChild}
                  </draggable>
                </el-col>
              )
            })}
          </el-row>
          {components.itemBtns.call(this, h, config, index, list)}
        </div>
      )
    }

    // 行容器使用
    if (currentItem.type === 'flex') {
      child = <el-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
              {child}
            </el-row>
    }

    return (
      <el-col span={config.span}>
        <el-row gutter={config.gutter} class={className}
          nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
          <draggable list={config.children || []} animation={340}
            group="componentsGroup" class="drag-wrapper">
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
  raw(h, currentItem, index, list) {
    const config = currentItem.__config__
    const child = renderChildren.apply(this, arguments)
    return <render key={config.renderKey} conf={currentItem} onInput={ event => {
      this.$set(config, 'defaultValue', event)
    }}>
      {child}
    </render>
  }
}

function renderChildren(h, currentItem, index, list) {
  const config = currentItem.__config__
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, config.children)
    }
    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`)
}

export default {
  components: {
    render,
    draggable
  },
  props: [
    'currentItem',
    'index',
    'drawingList',
    'activeId',
    'formConf'
  ],
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      // 组件加载完成触发的事件
      eventSystem.call(this, 'load', this.currentItem)
    })
  },
  render(h) {
    const layout = layouts[this.currentItem.__config__.layout]
    
    // 动作隐藏组件
    if (!this.currentItem.__config__.show) {
      return null
    }
    if (layout) {
      return layout.call(this, h, this.currentItem, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  }
}
</script>
<style scoped>
  ::v-deep .row-form {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .border-none {
    border: none;
  }
  .active-grid-item.grid-item {
    border: 1px dashed #409EFF;
  }
  .grid-item {
    border: 1px dashed #ccc;
  }
  .grid-item::after {
    content: '';
    display: block;
    clear: both;
  }
</style>
