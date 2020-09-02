<template>
  <div style="width:100%;padding:25px">
    <editortable :data="tableData"
                 :canMore="false"></editortable>
  </div>
</template>

<script>
import editortable from './editortable'
export default {
  data () {
    return {

      tableData: [
        {
          number: 1,
          name: '深圳市',
          key: '深圳市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '5',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 2,
          name: '广州市',
          key: '广州市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '12',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 3,
          name: '河源市',
          key: '河源市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 4,
          name: '揭阳市',
          key: '揭阳市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '8',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 5,
          name: '清远市',
          key: '清远市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '9',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 6,
          name: '韶关市',
          key: '韶关市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 7,
          name: '云浮市',
          key: '云浮市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '6',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 8,
          name: '江门市',
          key: '江门市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '4',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 9,
          name: '佛山市 ',
          key: '佛山市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '3',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 10,
          name: '肇庆市',
          key: '肇庆市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '5',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        }
      ]

    }
  },
  components: {
    editortable
  }
}
</script>

<style scoped>
</style>
