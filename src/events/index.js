// 事件处理
export const eventSystem = function(type, formItem, e) {
  const event = formItem.__config__.event
  if (!event || !event[type].length) {
    return
  }
  console.log(`${type}事件---`)
  const eventList = event[type]
  getFunction(eventList, this)
}

// 通过配置信息获取对应的函数方法
function getFunction(eventList, self) {
  console.log(self)
  console.log('当前组件', self.currentItem)
  console.log('事件', eventList)
  return eventList.map(event => {
    // 提交表单
    switch(event.type) {
      case 'submitForm':
        return self.$refs[self.formConf.formRef]?.validate(valid => {
          if (!valid) return false
          // 触发sumit事件
          self.$emit('submit', self[self.formConf.formModel])
          return true
        })
      // 自定义代码
      case 'custom':
        // 暴露部分变量
        const context = self
        eval(event.val)
        break
    }
  })
}