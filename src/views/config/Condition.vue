<template>
  <div>
    <section v-for="(item, index) in event.val.conditions" :key="index">
      <div class="el-form-item el-form-item--small el-form--label-left">
        <label class="el-form-item__label" style="width: 70px;">
          条件名称
        </label>
        <el-input v-model="item.name" style="width: 85%" size="small" />
      </div>

      <div class="el-form-item el-form-item--small el-form--label-left">
        <label class="el-form-item__label" style="width: 70px;">
          条件规则
        </label>
        <div v-for="(rule, idx) in item.rules" :key="idx">

          <el-select v-model="rule.formId" placeholder="请选择" @change="changeFields($event, index)" size="small" class="option">
            <el-option
              v-for="item in fieldsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="rule.symbol" size="small" class="option">
            <el-option
              v-for="item in identifier"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="rule.opt" size="small" class="option">
            <el-option
              v-for="item in optionValType"
              :key="item.value"
              :label="item.label" 
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="rule.val" size="small" class="option"></el-input>
          <el-button type="text" icon="el-icon-plus" disabled></el-button>
        </div>
      </div>
      
      <el-row>
        <div class="el-form-item el-form-item--small el-form--label-left">
          <label class="el-form-item__label" style="width: 70px;">
            目标组件
          </label>
          <el-select v-model="item.fields" multiple placeholder="请选择" @change="changeFields($event, index)" size="small" style="width: 85%">
            <el-option
              v-for="item in fieldsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>


        <slot :name="'condition' + index"></slot>
      </el-row>

      <div class="delete-btn-con">
        <el-button type="text" icon="el-icon-delete" @click="deleteCondition(index)">删除条件</el-button>
      </div>


      <el-divider></el-divider>
    </section>
    <el-button type="text" icon="el-icon-plus" :disabled="event.val.conditions.length >= 1" @click="addCondition">添加条件</el-button>

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { identifier } from './const'

  export default {
    props: ['event'],
    computed: {
      ...mapState('formDesign', ['formData']),
      fieldsOptions() {
        return this.formData.map(v => ({
          value: v.__config__.formId,
          label: v.__config__.label
        }))
      },
    },
    data() {
      return {
        identifier,
        optionValType: [
          {
            label: '值',
            value: 'val'
          },
          {
            label: '选项',
            value: 'option',
          }
        ]
      }
    },
    methods: {
      addCondition() {
        console.log(this.event)
        this.event.val.conditions.push({
          name: '',
          fields: [],
          actions: {},
          rules: [{
            formId: '',
            symbol: '',
            val: '',
            opt: 'val'
          }],
        })
      },
      deleteCondition(i) {
        this.event.val.conditions.splice(i, 1)
      },
      changeFields(_, index) {
        this.$emit('change-fields', index)
      }
    }
  }
</script>
<style scoped>
  .delete-btn-con {
    overflow: hidden;
    margin-top: 15px;
    padding-right: 20px;
  }
  .delete-btn-con button {
    float: right;
  }
  .option {
    width: 100px;
    margin-right: 10px;
  }
</style>