import { nanoid } from 'nanoid'

// 动态添加组件
export const createIdAndKey = (item) => {
  const config = item.__config__
  const id = nanoid(5)
  config.formId = (config.compType || '') + id
  config.renderKey = `${id}${+new Date()}` // 改变renderKey后可以实现强制更新组件

  // 不加默认样式的组件
  const noDefaultStyle = ['gridItem']
  if (!noDefaultStyle.includes(config.compType) && JSON.stringify(config.styles) === '{}') {
    Object.assign(config.styles, {
      // marginLeft,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 12,
      paddingBottom: 12,
    })
  }
  if (config.layout === 'colFormItem') {
    item.__vModel__ = `field${id}`
  } else if (config.layout === 'rowFormItem') {
    config.componentName = `${config.compType}${id}`
    !Array.isArray(config.children) && (config.children = [])

    if (config.ratio) {
      const ratio = config.ratio.split(':')
      ratio.map((_span, idx) => {
        // 栅格增加默认分栏
        if (!config.children[idx]) {
          config.children[idx] = gridItem
        }
      })
    }

    delete config.label // rowFormItem无需配置label属性
  }
  if (Array.isArray(config.children)) {
    config.children = config.children.map(childItem => createIdAndKey(childItem))
  }
  return item
}

// 获取布局样式
export const getStyles = (config) => {
  const _style = config.styles || {}
  let styles = {}
  Object.keys(_style).map(k => {
    const num = (config.styles)[k] || 0
    styles[k] = num + 'px'
  })
  return styles
}