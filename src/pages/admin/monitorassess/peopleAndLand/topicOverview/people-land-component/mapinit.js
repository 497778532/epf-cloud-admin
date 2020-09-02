import echarts from "echarts";
export default {

    data() {
        return {


        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        loadMap(id, option) {
            let chart = echarts.init(this.$refs[id]);

            chart.setOption(option);
        },
        initEchart(id) {
            window.addEventListener("resize", () => {
                let chart = echarts.init(this.$refs[id]);
                document.getElementById(id).style.width = 100 + "%";
                chart.resize(); // 直接加这句即可
            });
        },
        useDrawLine(id, option) {
            this.$nextTick(function() {
                setTimeout(() => {
                    this.loadMap(id, option);
                }, 1000);
            });
        }
    }
}