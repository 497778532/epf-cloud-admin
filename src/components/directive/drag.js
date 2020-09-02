import Vue from 'vue'
const foucs = Vue.directive('drag', {
  bind (el, binding, vnode, oldVnode) {
    el.setAttribute('style', 'position: fixed;')
    const dialogHeaderEl = el.querySelector('.drag-title')
    const dragDom = el
    dialogHeaderEl.style.cursor = 'move'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      let width = el.offsetWidth
      let height = el.offsetHeight
      // 获取到的值带px 正则匹配替换
      let styL, styT
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        let top = styT + t
        let left = styL + l
        left = Math.min(left, document.body.clientWidth - width)
        left = Math.max(0, left)
        top = Math.min(top, document.body.clientHeight - height)
        top = Math.max(74, top)

        // console.log(top, left, e.clientX, e.clientY)
        // 移动当前元素
        // let top = styT + t

        dragDom.style.left = `${left}px`
        dragDom.style.top = `${top}px`
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
export { focus }
