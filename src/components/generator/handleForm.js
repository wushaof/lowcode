import { nanoid } from 'nanoid'

export const createIdAndKey = (item) => {
  const config = item.__config__
  const id = nanoid(5)
  config.formId = (config.compType || '') + id
  config.renderKey = `${id}${+new Date()}` // 改变renderKey后可以实现强制更新组件
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