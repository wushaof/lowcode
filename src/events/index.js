// 事件处理
export const eventSystem = function(type, formItem, e) {
  const event = formItem.__config__.event
  if (!event || !event[type].length) {
    return
  }
  console.log(`${type}--事件触发`)
  const eventList = event[type]
  getFunction(eventList, this)
}

// 通过配置信息获取对应的函数方法
function getFunction(eventList, self) {
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
        const params = event
        eval(event.val)
        break
      case 'compShowHide':
        // console.log(self)
        // console.log(event, self.drawingList)
        const formFields = self.drawingList
        const formModel = self.formConf.formModel + 'TEST'
        const formData = self.formConf[formModel]
        console.log('显隐----', event.val)
        // const self
        const conditions = event.val.conditions
        conditions.map(condition => {
          const rules = condition.rules
          // 遍历所有规则，是否都满足
          const isAllRulesOk = rules.some(rule => {
            const field = formFields.find(v => v.__config__.formId === rule.formId)
            const value = formData[field.__vModel__]
            
            const isRuleOk = eval(`rule.val${rule.symbol}value`)
            return isRuleOk
          })
          const actions = condition.actions
          Object.keys(actions).map(formId => {
            const field = formFields.find(v => v.__config__.formId === formId)
            // 满足规则后开始执行目标行为
            field.__config__.show = isAllRulesOk ? actions[formId] : !actions[formId]
          })

        })
        break
    }
  })
}