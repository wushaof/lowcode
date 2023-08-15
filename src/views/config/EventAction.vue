<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="event-tabs">
      <el-tab-pane label="内置事件" name="internal" class="internal">
        <el-tabs tab-position="left" type="border-card" v-model="internalActive" @tab-click="handleInternal" style="height: 500px;">
          <el-tab-pane
            v-for="(item, index) in internalEvent"
            :key="index"
            :name="item.type"
            :label="item.label">
            <!-- 提交表单 -->
            <template v-if="internalActive === 'submitForm'">
              <el-select v-model="formIds" multiple size="mini" @change="changeForm">
                <el-option
                  v-for="(item, index) in formList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
            <!-- 组件显隐 -->

            <Condition :event="event" v-if="internalActive === 'compShowHide'" @change-fields="changeFields">
              <div :slot="'condition' + index" v-for="(condition, index) in event.val.conditions" :key="index">
  
                <el-row v-for="(item, idx) in getSelectedFields(index)" :key="item.formId">
                  <el-col :span="8">
                    <span>
                      {{ item.label }}
                    </span>
                  </el-col>
                  <el-col :span="10">
                    <el-radio v-model="condition.actions[item.formId]" :label="true">显示</el-radio>
                    <el-radio v-model="condition.actions[item.formId]" :label="false">隐藏</el-radio>
                  </el-col>
                  <el-col :span="6">
                    <i class="el-icon-delete cursor" @click="deleteComp(idx, index)"></i>
                  </el-col>
                </el-row>

              </div>
            </Condition>


          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane label="自定义事件" name="custom">

        <div class="el-tabs el-tabs--left el-tabs--border-card" style="height: 500px;">
          <div class="el-tabs__header is-left">
            <div class="el-tabs__nav-wrap is-left">
              <div class="el-tabs__nav-scroll">
                <div role="tablist" class="el-tabs__nav is-left" style="transform: translateY(0px);">
                  <div
                    class="el-tabs__item is-left"
                    v-for="(item, index) in customEvent"
                    :key="index"
                    @click="copyEvent(item)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="el-tabs__content">
            <EditorMonaco
              v-if="activeName === 'custom'"
              :str-val="event.val"
              :data.sync="event.val"
              language="javascript"
            />
          </div>
        </div>

      </el-tab-pane>
    </el-tabs>
    <div class="event-name">
      事件名称：
      <el-input v-model="event.eventName" style="width: 200px" size="medium"/>
      <div id="eventCopyData" ref="eventCopyData" :data-clipboard-text="copyData" style="opacity: 0;"></div>
    </div>
  </div>
</template>
<script>
  import { nanoid } from 'nanoid'
  import { mapState } from 'vuex'
  import { deepClone } from '@/utils/index'
  import { internalEvent, customEvent } from './const'
  import ClipboardJS from 'clipboard'
  import EditorMonaco from './EditorMonaco'
  import Condition from './Condition.vue'

  export default {
    props: {
      eventItem: {
        type: Object,
        default: () => {}
      },
    },
    components: {
      EditorMonaco,
      Condition,
    },
    computed: {
      ...mapState('formDesign', ['formData']),
      formList() {
        // return this.formData.filter(v => )
        return [{
          compType: 'all',
          name: '所有数据',
          value: 'all'
        }]
      },
      fieldsOptions() {
        return this.formData.map(v => ({
          formId: v.__config__.formId,
          label: v.__config__.label
        }))
      },
    },
    watch: {
      event: {
        handler(val) {
          this.$emit('update:data', {
            type: this.activeName,
            val
          })
        },
        deep: true
      }
    },
    data() {
      return {
        activeName: 'internal',
        eventName: '',
        internalEvent,
        customEvent,
        formIds: [],
        event: {},
        customEventIndex: '',
        editorVal: '',
        copyData: '',
        internalActive: '',
      }
    },
    created() {
      this.event = deepClone(this.eventItem)
      if (this.event.type !== 'custom') {
        this.internalActive = this.event.type || 'submitForm'
      }
      // this.internalEvent.
      switch(this.event.type) {
        case 'submitForm':
          this.formIds = this.event.val
          break
        case 'custom':
          this.activeName = 'custom'
          break
      }
    },
    mounted() {
    },
    methods: {
      // 选择组件时触发，增加默认配置数据
      changeFields(index) {
        const condition = this.event.val.conditions[index]
        condition.fields.map(v => {
          if (!condition.hasOwnProperty(v)) {
            this.$set(condition.actions, v, true)
          }
        })
      },
      // 获取当前条件的字段
      getSelectedFields(i) {
        const fields = this.event?.val?.conditions[i]?.fields || []

        return this.fieldsOptions.filter(v => fields.includes(v.formId))
      },
      handleInternal() {
        if (!this.event.id) {
          let val = []
          // 不同的事件类型保存不同类型的值
          switch(this.internalActive) {
            case 'compShowHide':
              val = { conditions: [] }
              break
          }
          this.$set(this.event, 'val', val)
          Object.assign(this.event, {
            id: nanoid(5),
            type: this.internalActive,
          })
        }
      },
      deleteComp(i, idx) {
        const fields = this.event.val?.conditions[idx].fields
        fields.splice(i, 1)
      },
      copyEvent(item) {
        this.copyData = item.type
        const clipboard = new ClipboardJS('#eventCopyData', {
          text: () => {
            this.$message.success('复制成功')
            clipboard.destroy()
            return this.copyData
          }
        })
        this.$refs.eventCopyData.click()
      },
      // 提交表单
      changeForm(v) {
        Object.assign(this.event, {
          id: nanoid(5),
          type: 'submitForm',
          val: v,
        })
      },
      // 切换事件类型
      handleClick(v) {
        console.log(v)
      }
    }
  }
</script>
<style scoped>
  ::v-deep .event-tabs .el-tabs__nav-wrap {
    width: 200px;
  }
  ::v-deep .el-tabs__content .el-tabs__content {
    height: 450px;
    overflow-y: scroll;
  }
  ::v-deep .is-top .el-tabs__item {
    font-size: 16px;
  }
  ::v-deep .el-tabs__nav .is-left {
    text-align: left;
  }
  .event-name {
    position: absolute;
    top: 66px;
    left: 240px;
    font-size: 16px;
  }
  .cursor {
    cursor: pointer;
  }
</style>