<template>
  <div class="p-layout">
    <!-- 外边距容器 -->
    <div class="margin-container">
      <el-input
        v-model="styles.marginLeft"
        type="number"
        size="mini"
        class="card-layout-input left"
      />
      <el-input
        v-model="styles.marginTop"
        type="number"
        size="mini"
        class="card-layout-input top"
      />
      <el-input
        v-model="styles.marginBottom"
        type="number"
        size="mini"
        class="card-layout-input bottom"
      />
      <el-input
        v-model="styles.marginRight"
        size="mini"
        class="card-layout-input right"
      />
      <span class="p-layout-margin-label"> 外边距 </span>

      <!-- 内边距容器 -->
      <div v-if="showPadding" class="padding-container">
        <el-input
          v-model="styles.paddingLeft"
          type="number"
          size="mini"
          class="card-layout-input left"
        />
        <el-input
          v-model="styles.paddingTop"
          type="number"
          size="mini"
          class="card-layout-input top"
        />
        <el-input
          v-model="styles.paddingBottom"
          type="number"
          size="mini"
          class="card-layout-input bottom"
        />
        <el-input
          v-model="styles.paddingRight"
          type="number"
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
    styles: {
      type: Object,
      default: () => ({})
    },
    showPadding: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type='number'] {
  -moz-appearance: textfield !important;
}
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
