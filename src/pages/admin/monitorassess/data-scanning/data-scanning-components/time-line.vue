<template>
    <!--时间线-->
    <div class="timeLine" style="overflow: hidden;">
        <div class="my_timeline_prev" @click="moveLeft">
            <span class="el-icon-arrow-left"></span>
            <div class="my_timeline_item_line" style="margin-top: -18px;"></div>
            <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">上</div>
        </div>
        <div class="ul_box">
            <ul class="my_timeline" ref="mytimeline" style="margin-left: 10px;">
                <li class="my_timeline_item" v-for="(item,index) in timeLineList" :key="index">
                    <!--圈圈节点-->
                    <div class="my_timeline_node" :style = " {backgroundColor: item.bgcolor, width: item.size + 'px', height: item.size + 'px'}" @click="changeActive(index)" :class="{active: index == timeIndex}"></div>
                    <!--线-->
                    <div class="my_timeline_item_line"></div>
                    <!--标注-->
                    <div class="my_timeline_item_content" :style="{color: item.color, fontSize: item.fontsize + 'px'}">
                        {{item.timestamp}}
                    </div>
                </li>
            </ul>
        </div>
        <div class="my_timeline_next" @click="moveRight">
            <span class="el-icon-arrow-right"></span>
            <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">下</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'timeLine',
    data() {
        return {
            timeIndex: 2,
            timeLineList: [{
                  timestamp: '2012年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  icon: 'el-iconprev',
                  year: '2012',
                  info: 'chengli'
                }, {
                  timestamp: '2013年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2013'
                }, {
                  timestamp: '2014年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2014'
                }, {
                  timestamp: '2015年',
                  color: '#999',
                  fontsize: 18,
                  year: '2015',
                  size: '28',
                  bgcolor: '#e4e7ed'
                }, {
                  timestamp: '2016年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  year: '2016',
                  bgcolor: '#e4e7ed'
                }]
        }
    },
    methods: {
        changeActive(index) {
            this.timeIndex = index;
        },
        moveLeft()  {
            let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
            let listNum = 0;
            if(marginLeft <= 10 && (marginLeft >= -650)){
                this.$refs.mytimeline.style.marginLeft = marginLeft - 220 + 'px';
            }
        },
        moveRight() {
            let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
            if(marginLeft < (-200)){
                this.$refs.mytimeline.style.marginLeft = marginLeft + 220 + 'px';
            }
        }
    }
}
</script>

<style scoped>
.my_timeline_prev, .my_timeline_next {
    float: left;
    display: inline-block;
    background-color: #fff;
    cursor: pointer;
}
.my_timeline_prev {
    width: 34px;
    float: left;
}
.my_timeline_next {
    width: 34px;
    margin-left: -22px;
}
.ul_box {
    width: 540px;
    height: 60px;
    display: inline-block;
    float: left;
    margin-top: 2px;
    overflow: hidden;
}
.my_timeline_item {
    display: inline-block;
    width: 100px;
}
.my_timeline_node {
    box-sizing: border-box;
    border-radius: 50%;
    cursor: pointer;
}
.my_timeline_node.active {
    background-color: #fff !important;
    border: 6px solid #f68720;
}
.my_timeline_item_line {
    width: 100%;
    height: 10px;
    margin: -14px 0 0 28px;
    border-top: 2px solid #E4E7ED;
    border-left: none;
}
.my_timeline_item_content {
    margin: 10px 0 0 -10px;
}
</style>