<template>
  <div class="app-container">
    <Header></Header>
    <Goods v-for="item in list" :key="item.id" :id="item.id" :title="item.goods_name" :pic="item.goods_img" :price="item.goods_price" :state="item.goods_state" :count="item.goods_count" @new-state="stateChange"></Goods>

    <Footer :fullState="fullState" :allPrice="amt" :allC="allCount" @full-change="fullChange"></Footer>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'
// 导入需要用到的组件
import Header from '@/components/Header/Header.vue'
import Goods from '@/components/Goods/Goods.vue'
import Footer from '@/components/Footer/Footer.vue'
import bus from '@/components/eventBus.js'
export default {
  components: {
    Header,
    Goods,
    Footer,
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    // 定义请求数据列表方法
    async initCartList() {
      const { data: res } = await axios.get('https://www.escook.cn/api/cart')
      console.log(res)
      if (res.status === 200) {
        this.list = res.list
      }
    },
    // 接收子组件传递的自定义事件
    stateChange(e) {
      this.list.some(item => {
        if (item.id === e.id) {
          item.goods_state = e.val
          return true // 停止后面的循环
        }
      })
    },
    // 接收子组件传递的全选状态
    fullChange(e) {
      this.list.forEach(item => (item.goods_state = e))
    },
  },
  created() {
    this.initCartList()
    bus.$on('share', val => {
      this.list.some(item => {
        if (item.id === val.id) {
          item.goods_count = val.val
          return true
        }
      })
    })
  },
  computed: {
    // 计算属性，动态求全选状态的值
    fullState() {
      return this.list.every(item => item.goods_state)
    },
    // 求所有价格的总和
    // 1.先用 filter 过滤
    // 2.再用 reduce 求和
    amt() {
      return this.list.filter(item => item.goods_state).reduce((total, item) => (total += item.goods_price * item.goods_count), 0)
    },
    allCount() {
      return this.list.filter(item => item.goods_state).reduce((t, item) => t += item.goods_count, 0)
    }
  },
}
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
