<template>
  <div>
    <div id="editorVal" class="editor-custom" />
  </div>
</template>
<script>
  import { beautifierConf } from '@/utils/index'
  import loadMonaco from '@/utils/loadMonaco'
  import loadBeautifier from '@/utils/loadBeautifier'

  let beautifier
  let monaco

  export default {
    props: ['strVal', 'language'],
    data() {
      return {}
    },
    created() {
    },
    mounted() {
      loadBeautifier(btf => {
        let str = this.strVal
        if (typeof str !== 'string') {
          str = ''
        }
        beautifier = btf
        this.beautifierJson = beautifier.js(str, beautifierConf.js)

        loadMonaco(val => {
          monaco = val
          this.setEditorValue('editorVal', this.beautifierJson)
        })
      })
    },
    methods: {
      setEditorValue(id, codeStr) {
        if (this.jsonEditor) {
          this.jsonEditor.setValue(codeStr)
        } else {
          this.jsonEditor = monaco.editor.create(document.getElementById(id), {
            value: codeStr,
            theme: 'vs-dark',
            language: this.language,
            automaticLayout: true
          })
          this.jsonEditor.onDidChangeModelContent(e => {
            this.$emit('update:data', this.jsonEditor.getValue())
          })
          // ctrl + s 刷新
          this.jsonEditor.onKeyDown(e => {
            if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
              this.refresh()
            }
          })
        }
      },
      refresh() {
        try {
          this.$emit('refresh', JSON.parse(this.jsonEditor.getValue()))
        } catch (error) {
          this.$notify({
            title: '错误',
            message: '格式错误，请检查',
            type: 'error'
          })
        }
      }
    }
  }
</script>
<style scoped>
  .editor-custom {
    height: 480px;
  }
</style>