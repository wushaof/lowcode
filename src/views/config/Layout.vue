<template>
  <div class="p-layout">
    <!-- 外边距容器 -->
    <div class="margin-container">
      <el-input
        v-model="layout.marginLeft"
        size="mini"
        class="card-layout-input left"
      />
      <el-input
        v-model="layout.marginTop"
        size="mini"
        class="card-layout-input top"
      />
      <el-input
        v-model="layout.marginBottom"
        size="mini"
        class="card-layout-input bottom"
      />
      <el-input
        v-model="layout.marginRight"
        size="mini"
        class="card-layout-input right"
      />
      <span class="p-layout-margin-label"> 外边距 </span>

      <!-- 内边距容器 -->
      <div v-if="showPadding" class="padding-container">
        <el-input
          v-model="layout.paddingLeft"
          size="mini"
          class="card-layout-input left"
        />
        <el-input
          v-model="layout.paddingTop"
          size="mini"
          class="card-layout-input top"
        />
        <el-input
          v-model="layout.paddingBottom"
          size="mini"
          class="card-layout-input bottom"
        />
        <el-input
          v-model="layout.paddingRight"
          size="mini"
          class="card-layout-input right"
        />
        <span class="p-layout-margin-label"> 内边距 </span>

        <!-- 盒子 -->
        <div class="box" />
      </div>
    </div>
  </div>
</template>

<script>
/*
 *
 * @description: 布局组件
 */
export default {
  props: {
    layout: {
      type: Object,
      default: () => ({
        marginTop: '10',
        marginLeft: '10'
      })
    },
    showPadding: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      bindValue: {
        marginRight: "0",
        marginLeft: "0",
        marginBottom: "0",
        marginTop: "0",
        paddingTop: "0",
        paddingBottom: "0",
        paddingLeft: "0",
        paddingRight: "0",
      },
    };
  },
  created() {
  },
  methods: {
    format(keyName, val) {
      this.bindValue[keyName] = val;
      const style = this.bindValue;
      style[keyName] = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-layout {
  .margin-container {
    border: 1px dashed #bfc3cb;
    padding: 26px 36px;
    position: relative;
    box-sizing: border-box;

    .padding-container {
      border: 1px dashed #bfc3cb;
      padding: 26px 36px;
      position: relative;
      box-sizing: border-box;
      .box {
        // border: 1px dashed silver;
        background: rgba(0, 109, 255, 0.15);
        height: 32px;
        border: 1px dashed #bfc3cb;
      }
    }
  }
}

.card-layout-input {
  position: absolute;
  height: 16px;
  line-height: 18px;
  font-size: 12px;
  line-height: 16px;
  opacity: 0.6;
  cursor: text;
  padding: 0;
  width: 34px;
  ::v-deep .el-input__inner {
    height: 16px;
  }
  &.top {
    top: 5px;
    left: calc(50% - 17px);
  }
  &.bottom {
    bottom: 5px;
    left: calc(50% - 17px);
  }
  &.left {
    bottom: calc(50% - 8px);
    left: 1px;
  }
  &.right {
    bottom: calc(50% - 8px);
    right: 1px;
  }
}
.p-layout-margin-label {
  position: absolute;
  left: 6px;
  bottom: 2px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}
::v-deep .el-input__inner {
  padding: 0;
  text-align: center;
}
</style>
