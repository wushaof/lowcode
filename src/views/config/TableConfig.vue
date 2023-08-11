<template>
  <div>
    <el-form-item label="操作按钮">
      <el-switch
        v-model="data.__config__.useOperate"
        @change="onOperate"
      >
      </el-switch>
      <br/>
      <div class="btn-container" v-if="data.__config__.useOperate">

        <div class="title">
          <span class="name">按钮名称</span>
          <span class="icon">图标选择</span>
        </div>

        <template v-for="(item, index) in btnList">
          <div class="btn-list">
            <el-input
              v-model="item.__slot__.default"
              placeholder="请输入按钮名称"
              class="btn-name"
            />
            <el-input
              v-model="item.icon"
              placeholder="请输入图标"
              @click.native="clickIcon(item)"
            />
            <i class="el-icon-delete" @click="deleteBtn(index)"></i>
          </div>
        </template>

        <el-button type="text" icon="el-icon-plus" @click="addBtn">添加</el-button>
      </div>
    </el-form-item>

    <el-form-item label="使用分页">
      <el-switch
        v-model="data.__config__.usePagination"
      />
    </el-form-item>
    <!-- <el-form-item label="每页展示" v-if="data.__config__.usePagination">
      <el-input
        placeholder="请输入条数"
        style="width: 60px"
      />
      &nbsp;条
    </el-form-item> -->
    <el-form-item label="固定高度">
      <el-input
        v-model="data.height"
        placeholder="请输入高度"
      />
    </el-form-item>

    <icons-dialog :visible.sync="iconsVisible" :current="currentIcon['icon']" @select="setIcon" />
  </div>
</template>
<script>
  import { tableOperateList, tableOperateButton } from '@/components/generator/config'
  import { nanoid } from 'nanoid'
  import { deepClone } from '@/utils/index'
  import IconsDialog from '../index/IconsDialog'

  export default {
    props: {
      data: {
        type: Object
      }
    },
    components: {
      IconsDialog
    },
    data() {
      return {
        iconsVisible: false,
        currentIcon: {},
      }
    },
    computed: {
      // 操作列在表格数据中的索引
      operateIndex() {
        return this.data.__config__.children.findIndex(v => v.__config__.operate)
      },
      btnList() {
        if (this.operateIndex === -1) return []
        return this.data.__config__.children[this.operateIndex]?.__config__.children
      }
    },
    methods: {
      // 表格操作按钮
      onOperate(val) {
        const children = this.data.__config__.children
        if (this.operateIndex !== -1 && !val) {
          children.splice(this.operateIndex, 1)
        } else {
          children.push(tableOperateList)
        }
      },
      addBtn() {
        const operateList = this.data.__config__.children[this.operateIndex]
        if (operateList?.__config__.children) {
          const btnInfo = deepClone(tableOperateButton)
          operateList?.__config__.children.push({
            ...btnInfo,
            __config__: {
              ...btnInfo.__config__,
              renderKey: nanoid(5)
            }
          })
        }
      },
      deleteBtn(i) {
        this.btnList.splice(i, 1)
      },
      clickIcon(item) {
        this.iconsVisible = true
        this.currentIcon = item
      },
      setIcon(val) {
        console.log(this.currentIcon)
        this.currentIcon.icon = val
      }
    }
  }
</script>
<style scoped>
  .btn-container .title {
    display: flex;
  }
  .btn-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .btn-name {
    width: 55%;
    margin-right: 15px
  }
  .name {
    width: 110px;
  }
  .cursor-point, .el-icon-delete {
    cursor: pointer;
  }
  .el-icon-delete {
    margin-left: 5px;
  }
</style>