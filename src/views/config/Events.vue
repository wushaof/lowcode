<template>
  <div>
    <div v-if="compType === 'page'">

      <!-- 页面的事件 -->
      <el-collapse v-model="collapseActive" v-if="formConf.__config__.event">
        <el-collapse-item
          v-for="(events, key) of formConf.__config__.event"
          :key="key"
          :title="eventMap[key]"
          :name="key"
        >
          <div v-for="(item) in events" :key="item.id" class="event-container">
            <span>{{ item.eventName }}</span>

            <div>
              <i class="el-icon-edit cursor" @click="editEvent(item, key, events)"></i>
              <i class="el-icon-delete cursor" @click="deleteEvent(item.id, events)"></i>
            </div>
          </div>
          <el-button type="text" icon="el-icon-plus" @click="addEvent(key)">添加</el-button>
          
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else>
      <el-collapse v-model="collapseActive" v-if="collapseList">
        <el-collapse-item
          v-for="(events, key) of collapseList"
          :key="key"
          :title="eventMap[key]"
          :name="key"
        >
          <div v-for="(item) in events" :key="item.id" class="event-container">
            <span>{{ item.eventName }}</span>

            <div>
              <i class="el-icon-edit cursor" @click="editEvent(item, key, events)"></i>
              <i class="el-icon-delete cursor" @click="deleteEvent(item.id, events)"></i>
            </div>
          </div>
          <el-button type="text" icon="el-icon-plus" @click="addEvent(key)">添加</el-button>
          
        </el-collapse-item>
      </el-collapse>
      <div v-else style="text-align: center;">暂不支持</div>
    </div>

    <el-dialog
      custom-class="event-dialog"
      width="70%"
      :title="(eventStatus === 'add' ? '添加' : '编辑') + '事件'"
      @close="closeDialog"
      :visible.sync="visible"
      v-if="visible"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <EventAction
        :eventItem="currentEvent"
        :eventStatus="eventStatus"
        :data.sync="getEvent"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import EventAction from './EventAction.vue'
  import { deepClone } from '@/utils/index'
import { nanoid } from 'nanoid'
  export default {
    props: ['activeData', 'formConf'],
    components: {
      EventAction,
    },
    computed: {
      // target类型，组件or页面
      compType() {
        return this.activeData.__config__.compType
      },
      collapseList() {
        return this.activeData.__config__.event
      },
    },
    data() {
      return {
        visible: false,
        collapseActive: ['click', 'load', 'change'],
        eventMap: {
          click: '点击触发',
          load: '加载完触发',
          change: '数据改变触发'
        },
        currentEvent: {},
        eventStatus: 'add',
        eventIndex: '',
        getEvent: {},
        editIndex: 0,
      }
    },
    methods: {
      addEvent(key) {
        this.eventIndex = key
        this.eventStatus = 'add'
        this.currentEvent = {}
        this.visible = true
      },
      editEvent(event, key, events) {
        this.currentEvent = event
        this.eventStatus = 'edit'
        this.visible = true
        this.eventIndex = key
        this.editIndex = events.findIndex(v => event.id === v.id)
      },
      // 删除事件
      deleteEvent(id, events) {
        for(let i = 0; i < events.length; i++) {
          if (events[i].id === id) {
            events.splice(i, 1)
            break
          }
        }
      },
      confirm() {
        const event = this.collapseList[this.eventIndex]
        let eventItem = deepClone(this.getEvent) 
        if (eventItem.type ===  'custom') {
          eventItem.val.type = 'custom'
        }
        if (this.eventStatus === 'add') {
          event.push({
            ...eventItem.val,
            id: nanoid(5)
          })
        } else {
          Object.assign(event[this.editIndex], {
            ...eventItem.val
          })
        }
        this.currentEvent = {}
        this.visible = false
      },
      closeDialog() {
        this.visible = false
      },
    }
  }
</script>
<style scoped>
  .cursor {
    cursor: pointer;
  }
  .el-icon-edit {
    margin-right: 10px;
  }
  .event-container {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
  }
  ::v-deep .el-collapse-item__header {
    border-bottom-color: transparent;
    background: #F7F8FA;
    padding: 0 10px;
  }
  ::v-deep .event-dialog {
    margin-top: 10vh !important;
    height: 80%;
  }
  ::v-deep .el-dialog__header {
    border-bottom: 2px solid #E4E7ED;
  }
  ::v-deep .el-dialog__body {
    padding-top: 5px;
  }
</style>