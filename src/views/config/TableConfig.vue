<template>
  <div>
    <el-form-item label="操作按钮">
      <el-switch
        v-model="data.__config__.useOperate">
      </el-switch>
      <br/>
      <el-radio-group v-model="data.dataType" size="small">
        <el-radio-button label="dynamic">
          动态数据
        </el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="固定高度">
      <el-input
        v-model="data.height"
        placeholder="请输入高度"
      />
    </el-form-item>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Object
      }
    }
  }
</script>