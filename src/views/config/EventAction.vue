<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="event-tabs">
      <el-tab-pane label="内置事件" name="internal" class="internal">
        <el-tabs tab-position="left" type="border-card" style="height: 500px;">
          <el-tab-pane
            v-for="(item, index) in internalEvent"
            :key="index"
            :label="item.label">
            <!-- 提交表单 -->
            <div v-if="item.type === 'submitForm'">
              <el-select v-model="formIds" multiple size="mini" @change="changeForm">
                <el-option
                  v-for="(item, index) in formList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="自定义事件" name="custom">

        <el-tabs tab-position="left" type="border-card" style="height: 500px;">
          <el-tab-pane
            v-for="(item, index) in internalEvent"
            :key="index"
            :label="item.label">
            <!-- 提交表单 -->
            <div v-if="item.type === 'submitForm'">
              <el-select v-model="formIds" multiple size="mini" @change="changeForm">
                <el-option
                  v-for="(item, index) in formList"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-tab-pane>
        </el-tabs>
        
      </el-tab-pane>
    </el-tabs>
    <div class="event-name">
      事件名称：
      <el-input v-model="event.eventName" style="width: 200px" size="medium"/>
    </div>
  </div>
</template>
<script>
  import { nanoid } from 'nanoid'
  import { mapState } from 'vuex'
  import { deepClone } from '@/utils/index'
  import { internalEvent } from './const'

  export default {
    props: {
      eventItem: {
        type: Object,
        default: () => {}
      },
      data: {
        type: Object
      }
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
      }
    },
    watch: {
      event: {
        handler(v) {
          this.$emit('update:data', v)
        },
        deep: true
      }
    },
    data() {
      return {
        activeName: 'internal',
        eventName: '',
        internalEvent,
        formIds: [],
        event: {},
      }
    },
    created() {
      this.event = deepClone(this.eventItem)
      // this.internalEvent.
      if (this.event.type === 'submitForm') {
        this.formIds = this.event.val
      }
    },
    methods: {
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
</style>