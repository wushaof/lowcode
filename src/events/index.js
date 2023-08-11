// 事件处理
export const eventSystem = function(type, formItem, e) {
  const event = formItem.__config__.event
  if (!event || event[type].length === 0) {
    return
  }
  console.log(`${type}事件---`)
  const eventList = event[type]
  const funcList = getFunction(eventList, this)
  for (let func of funcList) {
    if (func) {
      func()
    }
  }
}

// 通过配置信息获取对应的函数方法
function getFunction(eventList, self) {
  console.log('当前组件', self.currentItem)
  console.log('表单配置', self.formConf)
  return eventList.map(event => {
    // 提交表单
    if (event.type === 'submitForm') {
      return self.$refs[self.formConf.formRef]?.validate(valid => {
        if (!valid) return false
        // 触发sumit事件
        self.$emit('submit', self[self.formConf.formModel])
        return true
      })
    }
  })
}