new Vue({
  el:'#editor',
  data:{
    input:'hello vue.js'
  },
  computed:{
    textMarkdown:function () {
      return marked(this.input,{sanitize:true})
    }
  },
  methods:{
    update:_.debounce ( function (e) {
      this.input = e.target.value
    },300)
  }
})
