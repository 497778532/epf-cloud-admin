/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable spaced-comment */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/*
自定义echar工具类
时间：2019-09-23 09:44:10
author：Dbing
*/
// import Vue from 'vue'
// import echarts from 'echarts'
const commonecharts = {};

// 点
commonecharts.dot =
  "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB0VBMVEX///9AQEBRUVFQUFBRUVNQUFNQUFNQUFRQUFRQUFNKSlFNTU1VVVVQUFRQUFRQUFNQUFNRUVNPT1NJSUkAAABPT1RQUFNRUVNRUVRQUFNPT1JPT1NRUVRRUVRQUFMAAABJSUlOTlNQUFNRUVRRUVNRUVNNTU0zMzNVVVVQUFRQUFNQUFRQUFJERFVPT1NQUFNRUVJQUFNERERPT1JQUFNMTFFPT1NOTlJPT1NQUFNNTVVQUFNRUVRRUVNJSVBQUFRRUVRQUFNOTlJQUFJRUVNQUFRAQEA5OTlRUVRJSVVRUVRQUFJQUFBNTVFOTlJQUFJNTU1RUVRQUFVPT1RQUFNPT1RQUFRQUFRPT1NRUVNRUVRLS0tQUFRMTExPT1JQUFNRUVJMTFJQUFNQUFJQUFRQUFNQUFNOTlNRUVNQUFNQUFNQUFJQUFRAQEBRUVRRUVRGRlFRUVFRUVNQUFNRUVNPT1NNTVJQUFRPT1JPT1FRUVFQUFNRUVJRUVROTk5RUVNRUVNJSVJRUVRQUFNQUFRVVVVQUFRPT09RUVNOTlNPT1NPT1JQUFJPT1NOTk5RUVVPT1JPT1JQUFBPT1NQUFRPT1NRUVNPT1NQUFNRUVT///8Bgf/9AAAAmXRSTlMABBMjZaPK8cyZJhQGRo/O+NFKBwE6s+n9yKSXxuq5Ag51/vPjkTgFA4zi9H0PN7WnUA9UuznXTkfQP/L6xCO8+fM7hn7YDAn3Fbp/ID9BwArwM3Sfd+7Obt3gEdUbhY2IMmx2cKb1NObL+3PGCJukFhbNxdCaOOGhdyaWhdEN59QcT1PrCbo6x3K7sXx+Fz9EpxCHQITBxM90dZ2MAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+MJGRETIUxnIWMAAAK5SURBVDjLjVX7WxJBFB1Q3EpdFllkQVNcVHwEauKjFgU1FUwNE01LM8uktEzTSMtMM9Pykb07/20s+u3OKsvX+WV3zpy5c/feszOE0DAYs7JNOQzAXLiYfSnXQPSQl8+aOSjgLGyBNa2QtxXaBVnicBYVOYvlN+Fyia30vNJVxkB0l1dUek7GVZXVNbUimCvesyF9dckd6xuualY3mpL5+H28RtrULMDS4j23VasFwrXrdMwmCYG29nRf0B4MoaNTjetrhrvLlb4sxhtudPuUbeqEQFePXgl7u8JCXeR0+zKgzUV0EekDbp6kYGNgaScZ0G+GNJDqUSG4FpIRgxxu5SWf+XaxXlslq8tr1dQyWi8O5RPiYQV3A83fHo71BWMjPpprHBVZKzHeQTnVI8PYeEhuf+DuGGWVexNwTJIsDhWU8r7qrCmPyj8AN00eApUqNQYKj1TeBsyQx5hVV8fHaemTuLobECNP4VAXD4do6dy8OvMMZsLAqYyfx6DBQlSZegGJAEXK2OXXSv2LyhQLaKTeoFYaXNJIMyUQ69Ek8BLFypgfCWg+a0Rt7zJWyCt0VClE4jUttSfoYq2SbP0WrFHeklvwhkM1ZaopVfmWMsE6uDjJfYeaDZXzrL2fS+VpX6OUrk3kbKVM+IE2XHx+wZ80YYLmtlMmJAUfRZOL5kl0calHY+0dk8AUyOl9AtdKMmKXw14qnf//DUnpZ+CLUV9p3AcOTg9Er18IHfbqKfMOw6L/SGmSBe71iE7Mw+RBpJaD/1qLcEl/2jz3w5g9puvR2S3APBg9K9zZNUPsPtZwfEI+ir9tf6fJje3UUZzgzwSIDEsQRyd+7J5eK4afvzZHBUgHR+Qc+IHfQ6Lc/mUnyzr/yG8iszeQ5tqQy9LKOujLKEfvMpJhnZyeif2VAGlldSa+pRX+A6ZEDu7OBxwOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA5LTI1VDA5OjE5OjMzKzA4OjAwZOkGcAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wOS0yNVQwOToxOTozMyswODowMBW0vswAAAAASUVORK5CYII=";
commonecharts.round =
  "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABklBMVEX///8AAABOTk5KSlJPT1JRUVJQUFNPT1NQUFNQUFNQUFNQUFNRUVFQUFBQUFBPT1NPT1RQUFNQUFRQUFRRUVNQUFBSUlJPT1NQUFRRUVRQUFNPT1NMTExAQFVQUFNQUFNQUFNRUVNNTVNQUFNQUFNQUFNRUVFQUFNQUFNRUVRPT1ROTlJRUVFQUFRRUVNLS1FAQEBQUFNHR0dQUFBRUVRRUVFQUFNSUlJPT1RQUFNPT1JQUFRQUFNOTlIzMzNQUFNJSUlQUFBQUFRRUVFRUVRPT09RUVNQUFJRUVRPT1RQUFJQUFRQUFNQUFJQUFNQUFNRUVRQUFRQUFRQUFNPT1JQUFNOTlFQUFJERFVRUVNGRlFVVVVQUFRPT1NRUVMAAABQUFNNTU1RUVNOTk5QUFRPT1NLS0tRUVRRUVNOTk5SUlJQUFNRUVQAAABMTFJQUFJNTVJRUVFRUVNOTlNHR1VQUFJRUVNQUFRPT09PT1JQUFJQUFRQUFJRUVNRUVRRUVNLS1JQUFRQUFJPT1JRUVT///92MI4RAAAAhHRSTlMAAg0fZJ671/LzvKBiIDB+t+zrtnszGZHh+uKXGwxZ4+FiK6n+rybL+/w9OyzM1CwMqBJT/V/fH6GjROjvQQWTBxDAFu0tZXCrscPG4Nz29fDS1baYn1VgD74WA4lH6QOwK+0ugoQRwMEaMs/XATLrNSnRMRJm420dm6J5qtqqeCJGxqHNKI+zAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+MJGREWIEYX5bAAAAGASURBVDjLjdX5NwJRFAfwW1S2olFS9owlS8QQSUTInl3Ikn3JmmSJ5P3hjPY5s9zvz59z3nvnnfu9ALmRyQsKFUpVUbGqpLRMLZeBYDTlFVqSCVWp0wvAKkO1keTFaKqp5YF19Q2EJ41Ncq40N9OEN3SLOV+2trUTgVjaNLmygyIi0XZmZVc3EY21Jy17bRZxarH1pWg/QyTCDCSlelBKEmKy/3/mkLQkZJiljhEMdY4CuMYkb8qGNoyDewIjCSmZBLsHRz1TMI2ThMyAF0tnYQ5L52EBSxdhCUuXwYmlPljB0lVYw1IlrGPpBmzSOElvQQGFoyNm2PYjr7oDu3sM6vw9F0BgH0N9gb8pODjEUP8BOzFHPmkZPE6O7Ik0PU31wNm5xMuYi8t0vVxdi9ObbCWHbu/EpOc+lFOFD1bB2mIenzhVbKMFpJdTxQDh5wifjLyEebZB9JXiVHe79i0qsGP07x+xjDbGPr+ElhHbiu7495ciQQUTPzpH3J2/4n4BmA63E2iY/SgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDktMjVUMDk6MjI6MzIrMDg6MDCjnJAyAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA5LTI1VDA5OjIyOjMyKzA4OjAw0sEojgAAAABJRU5ErkJggg==";
commonecharts.startPoint =
  "image://data:image/png;base64,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";
commonecharts.endPoint =
  "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAABACAYAAAC6CT8CAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4wkZACggGjY3igAADRNJREFUaN7dmn9wXNV1xz/nvrer35K1kiwb7BiDiWE0+Ke8Wv0ycRKYhpQQwjgmaRgPlEwGCClpE8+UJvwcwG2Shk6GplN+pUML1KaFqUvcEDpOLVmWhPwLI0ywM6I2WJZlrSRLsn7tu6d/SLv64d3VrpHsmX5n3szufffce77nnHfuufc9UVX+v8Gd9RHLyvx92YVLh11ZKGhAMEWoZgOoiFVsGLG9WKc9c9CeyD205/RsqyCz5alwsKoKx9mEsB4oFCRb0UxRMlXEB4CqKgyBjCA6INCHlT+IsmPIO/fawpaWM5eWlIhzbm3t/CHH3oTIgxi58tMooqrnRPm1GO+xSG9vW0lra/9FJdWzpnqJzeA2xNwFspxZDWPtRvmNWvts0emTDbS1Dc05qXCo+kaM8wiwGsicPTLTueknqrzhjww+kpdmWKZMqru8vEB9Wd9H5OE5IxKPG/Ydhp3NRft3f4iqN2uk2svLP5Phz/oZyFeZi4w5M7rFet/r6jq9fdnRo8MzdTYzdehZU70kw5f9iihfuUSEQHUexvnbouKFd6XSPamn+tesKRnJyNmNyDWJuqDqB3yIyAyKKdAH4oD6EHEAJ22Clo2Bprp/I4niCT3Vu6K2cDgj9yeILIuvJEexIxWq9m5V/h7VRlRHEpNijzPAFY61n7OWO1X1GVUdTJuU4R+7gpW3jBslLhKGk83RexDZlKiPos8XNTa+D7yPyMvhYM3X1PBPCd2ldkvBu3u6gRagJVxRk4WR9MNZdZ44zsNnKypa8+FofN5x0B2qqVExT0iClK1oJ+L986SJPDFyi4hkxVFCRXXXOUcPTm4WY76CyADQk+hStA9VO2U8EQFZ5YnvkUQhf94z1RkMLnCcjNcRCSW2Fr8KjJ67j5aWcwBd66qC+Nz/iWsE1TDoPYHGPdtJc1HsDFavchzndYQr4qrhRW4tamp4I7mnRFzX9d+BsDIxIT2r2B1RQpSV+cVxn5aEC7E0mqGBt9IllArEcbb2Vly/NCmpntVVl6PmWxAnjGIjcVKHaYz+PZNbcCOG1UAP6CdTkoXqqFV9aN6BAz2TDOckuh4VmXGJmabMVZ6xm2VaGE55UD2/WS/otZA4O1tPXyjeX38SIBwK5YtxN6Gagdo7/IPsHs52bjPKHwNBC39X3Fi3L2aANTWXmYrqb6qRonhj3+eNvAh8GP3viJYCeUlYuQqfO1NZ+SzwSVxSIvwZ0W1CHKjVD92RgWdj/T3/dbh6g6jUFXad3sHRo8O58MueYPXeiJHN2ud7eoq8O2KRzA0CN50fAFqH522NNZSV+ckPbAItTGZkIGg8WTWZVMzd/cGaMkTWJhH2XOyDsVASEXX1UUSK1A7dy+TyxbDEi9gXSlp3Tdk+lDQ3n0Lt49PXM1GOGcv3C1taeqNt4dzALYjcyQwhKSJZKnLz5LaYwLAjdyQVhv/08H4bm7Si4nKQHmN5rH1gILZe9KxePW/U0+OlLQ2HY8JXX50R/RlorG/E6n1AO4Aqp1B+/FZT/cHYGBW1KzHyS1KEinx1n5THImyMVHm5T5Da5JL6XqAp61xMuY6OM6PnejfPa9z9eFlra8zyNiP3Z0YmFtXOYHBBd/GCx3rWVC+JyTbVP4faB0R1p1W78e2muu0bxyvwcCi0SA2PIxSRIkSkdEkwM5axXYAuv/8qURYm5QRrP1rVk3vF2MIIbW1DpdP6dK2rCuI6t4trqjrXVt1csq/hmM/4b7ciW2yG+RKwIkZsb/02YBvAxika+h9W4WbShHG4ibFqZcxTVs1SFXKTm4OKXL9/fvRve3l59uTb4VAoH9fcL5AFco3rd5/rDtXe6xmzddya13VVrv9Fd3l5QbzhO8vKcsOV659FuDtdQgCqUj7FU0alWEQzk2cZKRTjfzgcqhU1ZGW6WW8Dz8QGtWadOHJDtHRR4XpgnUCGwrBYmhyN/HekP9PGGz2SlWVdq7vU6GVgrkfISYeUMFF4j5ESLlMke0ZBkW8iIGhYGb1/8j3jOD9QkdJpAtlq9SVvVH5aur/usCapKhaOVSgvAy93rKxY6ma6fyrG3JZk2zNNOc35eHFV1qITDYMugI6VOCntbRSGsfrTokikI9oWDlXfiXH+KNbJ6guI/oYzkf8qOtp4dlxuCgZCodIBa67y7MjBhdGSaxylh5ragB8BP+qoqFjqM+4XEfPXIIUJ9VLxZ8zncuBY2qW/qB707MiLtLSMAnSGQlc74pt2bqGvBvbW/zbuAGVl/nB+4a2I7wHH5UqX7IPdFbW/KOwPv8WkLBoj2NTU1hWs6TKu5KVaPKZZa4GNDG0uaW4+BfA72eC66tsMLFbVfVbt86g+isift5aV+afL9lZUf76rILAHMa8iEhJkPnCjOrKjK69oZ0+welXcSR15RNM4ShBVpbtq/Q8VniSZoOqIVdlc3Lj71QlpMR0rVmSVHjo0EG0KB4OLcTKbLfoNc2Z0vw24n3WNqfTQAlEWY2SJKiUiOg9lATL1WVbVfQa7TTwaI3b4qCtZy61Pds1MRY97veGyktbWfhfAqteJOENC4rSuIupaPTKNqC2FgclNYvxLFJ3vwEO2xD1r1Kyw6KJIxK4pfWfPex0rV+YYN2eh8TtFonax4JSAXqcqyzG6TETWKs5aXO00ZB+2aCAl96gMRE91xxOF+UiUfpKsVQIZ1tGvAYeSjW1FrxMxRmGDjKVKVGU/I/1tAONePTZ+NU2X7wwGFxjH/xPEfAv4/AzF7MS8at+N/h4LN8tJcfTcTAOoldt7Vq/++bDfX+jDXaDG5KB2gTHOYmttnogsFcy15xvEnvLn5FzZXV5+vHDfvrPJNowl1naFHZNFmhA1U0l19Ic/WlhQ+DEkP+QXI5/VzNyXfFCssFggD+PkKyAmcc5RTDUqL4kv+3/DodrTWll7TNQewI4eCTQ3n5jct8NxFvmEz6RLytrIzgmC40brrqx5QsU8mO5g09TvRjkCDCLyhfhdVBHxVHVUhFGUbkV3GOQtTg/u9uZnrRbhXwS5LOVZ0dNFe+sXRCNgItsZfQWrW5CEx1b9qHYiDICcFuizqr8X5Q8RtYeVyKnSpqY2gK6q2qcEvmCt9w1Xjd+KLkOkDJiPEM16eUA+Qr4g31X4LqXZGNUwSH56tuS1ySEdI1C4Z8974cr1B4B18f2r21D7HCpnnaHekwWHD/ckejZEdYEK7fTIm/M+qOuLtg+EQqXDnlvs4S12XSegVpap0eVG5VpFlyOSjUhq2W6C0aB47JjcMsUraiNPiuO+HldW6A90nd5PCgf048R2d3sdI8WT2nIaGztyoANoBdgu4qxetszNy852B3w+t9jJqBk1plLQ1Yi5KZV5QBpsZCLznUdqxDP7Mxw9CLLqPHvAwjNOqb8Y4pLaLuLcsGpV3qBkF2RkmAKBo1mBQC4io+cdSI5jfGPoMTHmm+MXnWUbct38yLsqspQEENURC7/bdWBPx8ap7ZMiSDa4PSHvHis8yfSFWLXJZ0e+nNfU1AXQu2JFoWTnLx8VvUYxVzjIVaDFIPMVXYbQA3IE5RRqjxsjB7wR70hRb2dbKt4OB2vKcM1Bklc575uhyJfnHdj70TSyUx+L9vLyYr+btVPMxKZr3FUnrLVPGMNyRG5EZRHgiuACTsLabCzbWYVRIDKeYPYJ9tcZnuzOba5vjSd2pqrmhwbzN8mIW7W3FO+t/484Hjz/We+qrPyiiG8bUMgcQ6Efa5sNpknFHrIqx2zE9rg+8ytEahIYygJvBPbW3RbvdsL3U2dCNT9wRJ7UJOeAc0JS9TTwMSJlAhkJ+uxn1PuTopaGD+LdT1gGaF/3P2B5LtFDPlcQkfkisiYRIVTPWasPFO/b+/tEYyQkVdLa2j/k6Vag4WKSSgrVMKp/VdJUX6cX8iYRYGFL/XFXvDtR3cklhkAnyl8GGuufnqnvjDvf/IaGY2bY3gNad8kIqY6o6ta2yOCLKfZPbeffVV51jfjc5xGqLiqjsZB7PBUPRZHyGUVRS8MHrkQ2X8xQTCfkLogUXNxQTDfkpsmm/9YyHKwpE9e8pGPfJ80F+sTapwob65+6EOG0j8gAAs31rQ6Rr6P69myzEejE6o8vlNAFk4KxUHTV3DvboaiqW9v7wim/m4prmE/70nysmpbXIMUz78Tow9qnA431D31aw1ywp6IINNe3jo54X4epH3+kBdWwqD4xG4RmhRRAaUvDYRf5Dhr/s5oU8MTJs+Gfz4YuMIsfBgN0r6v5kvrM85D8rWQUCp2q9u54e6JPg1nxVBSF79TvtJ73bVGOpUCoXVTun21Cs04KoLhpz5vGet9B9UTSjpYtgdGBf5/t+WGWw28yuipqbxVHnmF6KCpdFnvXXHgoiln3VBRFTXWvW8/7NkrbBB/aFfsXc0loTknBWChaq9+LhaJlS9HZ7lfmck6Yw/CbjHBlzSaAwN76f53zyS4WqYuNOQ2/S4X/AyX39gq7cr7iAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA5LTI0VDE2OjQwOjMyKzA4OjAwW8svngAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wOS0yNFQxNjo0MDozMiswODowMCqWlyIAAAAASUVORK5CYII=";

// 线
commonecharts.linesInage1 =
  "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313zpath://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
commonecharts.linesInage2 =
  "image://data:image/png;base64,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";

// 动态获取底图数据（geoJson格式数据）
commonecharts.getEcharMap = function(code) {
  var mapFile = "../../../../../static/map/json/province/" + code + ".json";
  return mapFile;
};

// 分段设色图
commonecharts.makeColor = function(jsonData, name, centerId) {
  var option = {
    tooltip: {
      show: true,
      formatter: function(params) {
        if (params.data) return params.name + "：" + params.data["value"];
      }
    },
    backgroundColor: "", // 背景色
    title: {
      text: name,
      left: "center",
      top: "10",
      textStyle: {
        color: "#c70102",
        fontSize: 24
      }
    },
    visualMap: {
      // 颜色的设置  dataRange
      itemWidth: 14,
      itemHeight: 14,
      bottom: 60,
      left: 10,
      inverse: "true", // 控制高低的位置
      // orient: "horizontal", //控制导航的方向
      x: "left",
      y: "bottom",
      splitList: jsonData.mapColorData
      //  min: 0,
      //  max: 2500,
      //  calculable : true,//颜色呈条状
      // text: ["高", "低"] // 文本，默认为数值文本
    },
    series: [
      {
        name: "MAP",
        type: "map",
        aspectScale: 1,
        mapType: name,
        selectedMode: false, // 是否允许选中多个区域
        zoom: 1,
        roam: true, // 是否开启平游或缩放
        center: centerId, // 中心点
        scaleLimit: {
          min: 1,
          max: 5
        },
        top: "13%", // 组件距离容器的距离
        label: {
          // 鼠标选中显示与描述数据重叠
          // normal: {
          //     show: true,
          //     formatter: function(params) {
          //         if (params.data && jsonData.isShow) {
          //             return params.name + '\n' + params.data['value']
          //         } else {
          //             return params.name
          //         }
          //     }
          // },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            borderColor: jsonData.borderColor,
            borderWidth: jsonData.borderWidth
          } // 正常样式
        },
        data: jsonData.allData
      }
    ]
  };
  return option;
};

// 等级符号图
commonecharts.makeGrade = function(jsonData, name, centerId) {
  var option = {
    tooltip: {
      show: true,
      formatter: function(params) {
        if (params.data) return params.name + "：" + params.value[2];
      }
    },
    backgroundColor: "", // 背景色
    title: {
      text: name,
      left: "center",
      top: "10",
      textStyle: {
        color: "#c70102",
        fontSize: 24
      }
    },
    visualMap: {
      // 颜色的设置  dataRange
      itemWidth: 14,
      itemHeight: 14,
      bottom: 60,
      left: 10,
      inverse: "true", // 控制高低的位置
      // orient: "horizontal", //控制导航的方向
      x: "left",
      y: "bottom",
      splitList: jsonData.mapColorData
      //  min: 0,
      //  max: 2500,
      //  calculable : true,//颜色呈条状
      // text: ["高", "低"] // 文本，默认为数值文本
    },

    geo: {
      map: name,
      show: true,
      zoom: 1,
      aspectScale: 1,

      center: centerId, // 中心点
      scaleLimit: {
        min: 1,
        max: 5
      },
      // top: "13%", //组件距离容器的距离
      // label: {
      //   normal: {
      //     show: false
      //   },
      //   emphasis: {
      //     show: false,
      //   }
      // },
      label: {
        normal: {
          show: jsonData.levelShow,
          formatter: function(params) {
            if (params.data && jsonData.isShow) {
              return params.name + "\n" + params.data["value"];
            } else {
              return params.name;
            }
          }
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          borderColor: jsonData.borderColor,
          borderWidth: jsonData.borderWidth
        } // 正常样式
      },
      roam: true
    },
    series: [
      {
        name: "MAP",
        type: "map",
        mapType: name,
        aspectScale: 1,
        selectedMode: false, // 是否允许选中多个区域
        zoom: 1,
        geoIndex: 0,
        roam: true, // 是否开启平游或缩放
        center: centerId, // 中心点
        scaleLimit: {
          min: 1,
          max: 5
        },
        top: "13%", // 组件距离容器的距离
        label: {
          normal: {
            show: jsonData.levelShow,
            formatter: function(params) {
              if (params.data && jsonData.isShow) {
                return params.name + "\n" + params.data["value"];
              } else {
                return params.name;
              }
            }
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            borderColor: jsonData.borderColor,
            borderWidth: jsonData.borderWidth
          } // 正常样式
        },
        data: []
      },
      {
        type: "effectScatter",
        effectType: "ripple", // 特效类型，目前只支持涟漪特效'ripple'
        coordinateSystem: "geo", // 'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
        data: jsonData.geoCoordMapData,
        symbolSize: function(val) {
          return Math.round(20 + (val[2] * 30) / jsonData.maxGradeData);
        },
        showEffectOn: "render", // 配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
        rippleEffect: {
          // period: 2.5, //波纹秒数
          brushType: "stroke" // stroke(涟漪)和fill(扩散)，两种效果
          // scale: 4 //波纹范围
        },
        hoverAnimation: true, // 是否开启鼠标 hover 的提示动画效果。
        label: {
          normal: {
            show: true,
            formatter: function(params) {
              if (params.data && jsonData.isShow) {
                return params.name + "\n" + params.value[2];
              } else {
                return params.name;
              }
            },
            textStyle: {
              color: "#000",
              fontSize: 10,
              margintop: 10
            }
          }
        },
        //   itemStyle: {
        //       normal: {
        //           color: 'red',
        //           shadowBlur: 0,
        //           shadowColor: 'red'
        //       }
        //   },
        zlevel: 1
      }
    ]
  };
  return option;
};

// 饼状统计图
commonecharts.makePie = function(jsonData, name, centerId) {
  var pData = [];
  var pielegendMsgData = jsonData.pielegendMsgData; // 添加的数据
  var pieLegendMsg = jsonData.pieLegendData; // legendName数据
  var pieColorMsg = jsonData.pieColorData; // legendColor数据

  function convertPie(pielegendMsgData) {
    var res = [];
    for (var i = 0; i < pielegendMsgData.length; i++) {
      var legendCoord = pielegendMsgData[i];
      for (var key in pielegendMsgData[i]) {
        if (legendCoord) {
          res.push({
            name: pieLegendMsg[key],
            value: pielegendMsgData[i][key],
            color: pieColorMsg[key]
          });
        }
      }
    }
    return res;
  }

  var legendCoordMapData = convertPie(pielegendMsgData);

  var allData = []; // 用来装处理完的数组
  var currData = []; // 子数组用来存分割完的数据
  var lengthPieLegend = jsonData.pieLegendData.length;
  // 循环需要处理的数组
  for (var i = 0; i < legendCoordMapData.length; i++) {
    // 将legendCoordMapData[i]添加到子数组
    currData.push(legendCoordMapData[i]);
    // 在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
    if ((i + 1) % lengthPieLegend === 0) {
      // 把currData加到allData里
      allData.push(currData);
      // 在这里清空currData
      currData = [];
    }
  }

  var nameList = [];

  for (let key in jsonData.cityNameData) {
    nameList.push(jsonData.cityNameData[key]);
  }

  for (let key in allData) {
    pData.push({
      name: nameList[key],
      color: pieColorMsg,
      value: allData[key]
    });
  }

  for (let key in pData) {
    let value = pData[key].value;
    for (let i in value) {
      let elem = value[i].name;
      let arr = jsonData.pieSelectData;
      if (arr.indexOf(elem) !== -1) {
        var index = i;
        pData[key].value[index].value = "";
        pData[key].value[index].color = "";
      }
    }
  }
  console.log(pData);
  var option = {
    title: {
      text: name,
      left: "center",
      top: "10",
      textStyle: {
        color: "#c70102",
        fontSize: 24
      }
    },
    tooltip: {
      show: jsonData.isShow,
      trigger: "item",
      formatter: function(params) {
        if (params.value) {
          return params.name + ": " + params.value;
        }
      }
    },
    series: [
      {
        name: "MAP",
        type: "map",
        mapType: name,
        aspectScale: 1,
        selectedMode: false, // 是否允许选中多个区域
        zoom: 1,
        geoIndex: 0,
        roam: false, // 是否开启平游或缩放
        center: centerId, // 中心点
        scaleLimit: {
          min: 1,
          max: 5
        },
        top: "13%", // 组件距离容器的距离
        // 遮挡问题
        // label: {
        //     normal: {
        //         show: true
        //     },
        //     emphasis: {
        //         show: true
        //     }
        // },
        itemStyle: {
          normal: {
            borderColor: jsonData.borderColor,
            borderWidth: jsonData.borderWidth
          } // 正常样式
        },
        data: pData
        /* zlevel:3 */
      }
    ]
  };
  return option;
};

commonecharts.addPie = function(chart, option, jsonData, mapCenter) {
  var pData = [];
  var pielegendMsgData = jsonData.pielegendMsgData; // 添加的数据
  var pieLegendMsg = jsonData.pieLegendData; // legendName数据
  var pieColorMsg = jsonData.pieColorData; // legendColor数据

  function convertPie(pielegendMsgData) {
    var res = [];
    for (var i = 0; i < pielegendMsgData.length; i++) {
      var legendCoord = pielegendMsgData[i];
      for (var key in pielegendMsgData[i]) {
        if (legendCoord) {
          res.push({
            name: pieLegendMsg[key],
            value: pielegendMsgData[i][key],
            color: pieColorMsg[key]
          });
        }
      }
    }
    return res;
  }

  var legendCoordMapData = convertPie(pielegendMsgData);

  var allData = []; // 用来装处理完的数组
  var currData = []; // 子数组用来存分割完的数据
  var lengthPieLegend = jsonData.pieLegendData.length;
  // 循环需要处理的数组
  for (var i = 0; i < legendCoordMapData.length; i++) {
    // 将legendCoordMapData[i]添加到子数组
    currData.push(legendCoordMapData[i]);
    // 在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
    if ((i + 1) % lengthPieLegend === 0) {
      // 把currData加到allData里
      allData.push(currData);
      // 在这里清空currData
      currData = [];
    }
  }

  var nameList = [];

  for (let key in jsonData.cityNameData) {
    nameList.push(jsonData.cityNameData[key]);
  }

  for (let key in allData) {
    pData.push({
      name: nameList[key],
      color: pieColorMsg,
      value: allData[key]
    });
  }

  // function isInArray (elem, arr) {
  //   for (var i = 0; i < arr.length; ++i) {
  //     if (arr[i] === elem) {
  //       return true
  //     }
  //   }
  //   return false
  // }
  // (arr.indexOf(elem) !== -1)
  for (let key in pData) {
    let value = pData[key].value;
    for (let i in value) {
      let elem = value[i].name;
      let arr = jsonData.pieSelectData;
      if (arr.indexOf(elem) !== -1) {
        var index = i;
        pData[key].value[index].value = "";
        pData[key].value[index].color = "";
      }
    }
  }

  // var op = chart.getOption()
  var sd = option.series;
  for (i = 0; i < pData.length; i++) {
    //  var randomValue = Math.round(Math.random() * 30);
    //   var radius = randomValue <= 10 ? 10 : randomValue;
    var radius = 25;
    var geoCoord = mapCenter[pData[i].name];
    console.log(pData[i]);

    if (geoCoord) {
      var vr = [];
      pData[i].value.map(function(v, j) {
        vr.push({
          name: v.name,
          value: v.value
        });
      });
      console.log(vr);
      var p = chart.convertToPixel({ seriesIndex: 0 }, geoCoord);

      sd.push({
        name: pData[i].name,
        type: "pie",
        tooltip: {
          formatter: function(params) {
            // console.log(params)

            return (
              params.seriesName + "<br/>" + params.name + " : " + params.value
            );
          }
        },
        radius: radius,
        center: p,
        data: vr,
        zlevel: 4,
        color: pData[i].color,

        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          mormal: {
            opacity: 1
          }
        }
      });
    }
  }
  return sd;
};

// 柱状统计图
commonecharts.makeColumnar = function(jsonData, name, centerId) {
  var pData = [];
  var pielegendMsgData = jsonData.pielegendMsgData; // 添加的数据
  var pieLegendMsg = jsonData.pieLegendData; // legendName数据
  var pieColorMsg = jsonData.pieColorData; // legendcolor数据

  function convertPie(pielegendMsgData) {
    var res = [];
    for (var i = 0; i < pielegendMsgData.length; i++) {
      var legendCoord = pielegendMsgData[i];
      for (var key in pielegendMsgData[i]) {
        if (legendCoord) {
          res.push({
            name: pieLegendMsg[key],
            value: pielegendMsgData[i][key],
            color: pieColorMsg[key]
          });
        }
      }
    }
    return res;
  }

  var legendCoordMapData = convertPie(pielegendMsgData);

  var allData = []; // 用来装处理完的数组
  var currData = []; // 子数组用来存分割完的数据
  var lengthPieLegend = jsonData.pieLegendData.length;
  // 循环需要处理的数组
  for (var i = 0; i < legendCoordMapData.length; i++) {
    // 将legendCoordMapData[i]添加到子数组
    currData.push(legendCoordMapData[i]);
    // 在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
    if ((i + 1) % lengthPieLegend === 0) {
      // 把currData加到allData里
      allData.push(currData);
      // 在这里清空currData
      currData = [];
    }
  }

  var nameList = [];

  for (let key in jsonData.cityNameData) {
    nameList.push(jsonData.cityNameData[key]);
  }

  for (let key in allData) {
    pData.push({
      name: nameList[key],
      color: pieColorMsg,
      barLegendMsg: pieLegendMsg,
      value: allData[key]
    });
  }

  function isInArray(elem, arr) {
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === elem) {
        return true;
      }
    }
    return false;
  }
  for (let key in pData) {
    let value = pData[key].value;
    for (let i in value) {
      let elem = value[i].name;
      let arr = jsonData.pieSelectData;
      if (isInArray(elem, arr)) {
        var index = i;
        pData[key].value[index].value = "";
        pData[key].value[index].color = "";
      }
    }
  }

  var option = {
    title: {
      text: name,
      left: "center",
      top: "10",
      textStyle: {
        color: "#c70102",
        fontSize: 24
      }
    },
    tooltip: {
      show: jsonData.isShow,
      trigger: "item",
      formatter: function(params) {
        if (params.value) {
          return params.name + ": " + params.value;
        }
      }
    },
    // visualMap: {
    //  min: 0,
    //  max: 120,
    //  left: 'right',
    //  top: 'bottom',
    //  seriesIndex:0,
    //  text: ["高", "低"],
    //  calculable: true,
    //  color: ['#c05050','#e5cf0d','#5ab1ef'],
    //     },
    // xAxis:{
    // type: 'category',
    // data: ['鲜花', '星星', '香蕉', '嫌弃']
    //   },
    // yAxis: {
    // type: 'value'
    // },
    grid: [],
    yAxis: [],
    xAxis: [],
    series: [
      {
        name: "MAP",
        type: "map",
        mapType: name,
        aspectScale: 1,
        selectedMode: false, // 是否允许选中多个区域
        zoom: 1,
        geoIndex: 0,
        roam: false, // 是否开启平游或缩放
        center: centerId, // 中心点
        scaleLimit: {
          min: 1,
          max: 5
        },
        top: "13%", // 组件距离容器的距离
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            borderColor: jsonData.borderColor,
            borderWidth: jsonData.borderWidth
          } // 正常样式
        },
        data: pData
        /* zlevel:3 */
      }
    ]
  };
  return option;
};

commonecharts.addColumnar = function(chart, option, jsonData, mapCenter) {
  var pData = [];
  var pielegendMsgData = jsonData.pielegendMsgData; // 添加的数据
  var pieLegendMsg = jsonData.pieLegendData; // legendName数据
  var pieColorMsg = jsonData.pieColorData; // legendcolor数据

  function convertPie(pielegendMsgData) {
    var res = [];
    for (var i = 0; i < pielegendMsgData.length; i++) {
      var legendCoord = pielegendMsgData[i];
      for (var key in pielegendMsgData[i]) {
        if (legendCoord) {
          res.push({
            name: pieLegendMsg[key],
            value: pielegendMsgData[i][key],
            color: pieColorMsg[key]
          });
        }
      }
    }
    return res;
  }

  var legendCoordMapData = convertPie(pielegendMsgData);

  var allData = []; // 用来装处理完的数组
  var currData = []; // 子数组用来存分割完的数据
  var lengthPieLegend = jsonData.pieLegendData.length;
  // 循环需要处理的数组
  for (var i = 0; i < legendCoordMapData.length; i++) {
    // 将legendCoordMapData[i]添加到子数组
    currData.push(legendCoordMapData[i]);
    // 在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
    if ((i + 1) % lengthPieLegend === 0) {
      // 把currData加到allData里
      allData.push(currData);
      // 在这里清空currData
      currData = [];
    }
  }

  var nameList = [];

  for (var key in jsonData.cityNameData) {
    nameList.push(jsonData.cityNameData[key]);
  }

  for (let key in allData) {
    pData.push({
      name: nameList[key],
      color: pieColorMsg,
      barLegendMsg: pieLegendMsg,
      value: allData[key]
    });
  }

  function isInArray(elem, arr) {
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === elem) {
        return true;
      }
    }
    return false;
  }
  for (let key in pData) {
    let value = pData[key].value;
    for (let i in value) {
      let elem = value[i].name;
      let arr = jsonData.pieSelectData;
      if (isInArray(elem, arr)) {
        var index = i;
        pData[key].value[index].value = "";
        pData[key].value[index].color = "";
      }
    }
  }

  // var op = chart.getOption()
  var sd = option.series;
  var gd = option.grid;
  for (i = 0; i < pData.length; i++) {
    // //  var randomValue = Math.round(Math.random() * 30);
    // //   var radius = randomValue <= 10 ? 10 : randomValue;
    // var radius = 20;
    var geoCoord = mapCenter[pData[i].name];
    if (geoCoord) {
      var vr = [];
      pData[i].value.map(function(v, j) {
        // vr.push(v.value);
        vr.push({
          name: v.name,
          value: v.value
        });
      });
      var p = chart.convertToPixel(
        {
          seriesIndex: 0
        },
        geoCoord
      );

      gd.push({
        width: 10 * pData[0].barLegendMsg.length,
        height: 30,
        left: p[0],
        top: p[1],
        z: 5
      });

      option.yAxis.push({
        gridIndex: i,
        type: "value",
        show: false,
        axisLabel: {
          show: false
        },
        z: 5
      });
      option.xAxis.push({
        type: "category",
        data: pData[0].barLegendMsg,
        show: false,
        gridIndex: i
      });

      sd.push({
        name: pData[i].name,
        type: "bar",
        tooltip: {
          formatter: function(params) {
            return (
              params.seriesName + "<br/>" + params.name + " : " + params.value
            );
          }
        },
        data: vr,

        yAxisIndex: i,
        xAxisIndex: i,

        zlevel: 4,
        // itemStyle: {
        //   color: data[i].color
        // },
        // barWidth: 10
        itemStyle: {
          normal: {
            // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function(params) {
              var colorList = jsonData.pieColorData;
              return colorList[params.dataIndex];
            }
          },
          // 鼠标悬停时：
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        // 设置柱子的宽度
        // barWidth: 6, // 柱形的宽度
        // barMaxWidth: 8, // 柱形的宽度
        // barCategoryGap: '50%',  // 柱形的间距
        barMinHeight: 0, // 最小高度改为0
        // barMaxWidth: 8, // 柱形的宽度
        // barMaxnWidth: 1, // 柱形的宽度
        // barWidth: null,        // 默认自适应
        barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
        barCategoryGap: "20%" // 类目间柱形距离，默认为类目间距的20%，可设固定值
      });
    }
  }

  function FilterByName(data, Name) {
    // data是json对象，Name是根据什么字段去重
    var dest = [];
    for (var i = 0; i < data.length; i++) {
      var ai = data[i];
      if (i === 0) {
        dest.push(ai);
      } else {
        var filterData = dest.filter(function(e) {
          return e[Name] === ai[Name];
        });
        if (filterData.length === 0) {
          dest.push(ai);
        }
      }
    }
    return dest;
  }
  option.series = FilterByName(option.series, "name");

  console.log(option);

  return option;
};

// 流向图
commonecharts.makeFlow = function(jsonData, name, mapCenter) {
  // 流向图标
  var linkSymbol = [
    "roundRect",
    commonecharts.linesInage1,
    commonecharts.linesInage2
  ];
  // 流向图标大小
  var linkSymbolSize = function(data) {
    if (data === "0") {
      return 5;
    } else {
      return 20;
    }
  };
  // 虚线
  var dottedLine = {
    type: "dashed",
    width: jsonData.lineProgram, // 尾迹线条宽度
    opacity: 0.6, // 尾迹线条透明度
    curveness: 0.3 // 尾迹线条曲直度
  };
  // 实线
  var solidLine = {
    width: jsonData.lineProgram, // 尾迹线条宽度
    opacity: 0.06, // 尾迹线条透明度
    curveness: 0.3 // 尾迹线条曲直度
  };
  var LineList = [solidLine, solidLine, dottedLine];

  // 起点图标
  var startSymbol = [
    "circle",
    commonecharts.dot,
    commonecharts.round,
    commonecharts.startPoint
  ];
  // 起点类型
  var startType = function(data) {
    if (data === "0") {
      return "effectScatter";
    } else {
      return "scatter";
    }
  };

  // 终点图标
  var endSymbol = [
    "pin",
    commonecharts.dot,
    commonecharts.round,
    commonecharts.endPoint
  ];

  // 图例颜色
  var colorProgram = [];
  if (jsonData.colorProgram !== "") {
    var splitArry = jsonData.colorProgram.split(",");
    splitArry.forEach(element => {
      colorProgram.push(element);
    });
  } else {
    colorProgram = ["#5ca7b0", "#a8b76e", "#e9c437", "#e38f46", "#dc5b55"];
  }

  // 起点-终点数据1
  var SEData = [
    // 例子
    // [{name:'揭阳市'}, {name:'广州市',value:'95'}],
    // [{name:'河源市'}, {name:'深圳市',value:'190'}]
  ];
  for (let key in jsonData.SEList) {
    var SE = jsonData.SEList[key];
    if (SE.start !== "" && SE.end !== "" && SE.message !== "") {
      SEData.push([
        {
          name: SE.start
        },
        {
          name: SE.end,
          value: SE.message
        }
      ]);
    }
  }
  console.log("SEData:", SEData);

  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      // 起始点
      var fromCoord = mapCenter[dataItem[0].name];
      // 终点
      var toCoord = mapCenter[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value
        });
      }
    }
    return res;
  };

  var series = [
    {
      type: "lines",
      aspectScale: 1,
      zlevel: 2,
      coordinateSystem: "geo",
      //  symbol: ['none', 'arrow'],
      effect: {
        show: true,
        loop: jsonData.checked,
        period: 4, // 箭头指向速度，值越小速度越快
        trailLength: 0.5, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: linkSymbol[jsonData.flowLine], // 箭头图标
        symbolSize: linkSymbolSize(jsonData.flowLine) // 图标大小
      },
      lineStyle: {
        normal: LineList[jsonData.flowLine]
        //    normal: {
        //        type:'dashed',
        //        width: jsonData.lineProgram, //尾迹线条宽度
        //        opacity: 0.6, //尾迹线条透明度
        //        curveness: 0.3 //尾迹线条曲直度

        //    }
      },
      data: convertData(SEData)
    },
    {
      type: startType(jsonData.flowStart),
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        // 涟漪特效
        period: 4, // 动画时间，值越小速度越快
        brushType: "stroke", // 波纹绘制方式 stroke, fill
        scale: 4 // 波纹圆环最大限制，值越大波纹越大
      },
      label: {
        normal: {
          show: true,
          position: "bottom", // 显示位置
          //  offset: [5, 0], //偏移设置
          formatter: function(params) {
            // 圆环显示文字
            if (jsonData.showData === "1" && params.data) {
              return params.data.name + "\n" + params.data.value[2];
            } else {
              return params.data.name;
            }
          },
          fontSize: 13
        },
        emphasis: {
          show: true
        }
      },
      symbol: startSymbol[jsonData.flowStart],
      symbolSize: function(val) {
        if (jsonData.flowStart === "0") {
          return 3 + val[2] / 50; // 圆环大小
        } else {
          return 15;
        }
      },
      itemStyle: {
        normal: {
          show: false,
          color: "#f00"
        }
      },
      data: SEData.map(function(dataItem) {
        return {
          name: dataItem[0].name,
          value: mapCenter[dataItem[0].name].concat([dataItem[1].value])
        };
      })
    },
    {
      // 被攻击点
      type: "scatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        period: 4,
        brushType: "stroke",
        scale: 4
      },
      label: {
        normal: {
          show: true,
          position: "top",
          // offset:[20, 0],
          color: "#0f0",
          formatter: "{b}",
          textStyle: {
            color: "#0f0"
          }
        },
        emphasis: {
          show: true,
          color: "#f60"
        }
      },
      symbol: endSymbol[jsonData.flowEnd],
      symbolSize: 15,
      data: SEData.map(function(dataItem) {
        return {
          name: dataItem[1].name,
          value: mapCenter[dataItem[1].name].concat([dataItem[1].value])
        };
      })
    }
    //  ,{
    //     type: 'custom',//配置显示方式为用户自定义
    //     coordinateSystem: 'geo',
    //     itemStyle: {
    //         normal: {
    //             color: '#46bee9'
    //         }
    //     },
    //     renderItem: function (params, api) {//具体实现自定义图标的方法
    //         return {
    //             type: 'image',
    //             symbolSize : 10,
    //             style: {
    //               image: require("../../../../assets/images/endCircle3.png"),
    //               x: api.coord(convertData(SEData)[params.dataIndex].coords[1])[0],
    //               y: api.coord(convertData(SEData)[params.dataIndex].coords[1])[1]
    //             }
    //         }
    //     },
    //    data: convertData(SEData)
    // }
  ];
  console.log("series:", series);

  var option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(166, 200, 76, 0.82)",
      borderColor: "#FFFFCC",
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: "z-index:100",
      formatter: function(params, ticket, callback) {
        // 根据业务自己拓展要显示的内容
        if (
          params.seriesType === "effectScatter" ||
          params.seriesType === "scatter"
        ) {
          return "线路：" + params.data.name + "" + params.data.value[2];
        } else if (params.seriesType === "lines") {
          return (
            params.data.fromName +
            ">" +
            params.data.toName +
            "<br />" +
            params.data.value
          );
        } else {
          return params.name;
        }
        // return res;
      }
    },
    backgroundColor: "#013954", // 背景色
    visualMap: {
      // 图例值控制
      min: 0,
      max: 500,
      calculable: true,
      show: true,
      color: colorProgram, // 图例色带
      textStyle: {
        color: "#fff"
      }
    },
    geo: {
      map: name,
      zoom: 1.2,
      // center: [104.2978515625, 35.8544921875],
      label: {
        emphasis: {
          show: false
        }
      },
      aspectScale: 1,
      roam: true, // 是否允许缩放
      // center: centerId, // 中心点
      scaleLimit: {
        //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        min: 1.2, //最小的缩放值
        max: 3 //最大的缩放值
      },
      itemStyle: {
        normal: {
          color: "rgba(51, 69, 89, .5)", // 地图背景色
          borderColor: "#516a89", // 省市边界线00fcff 516a89
          borderWidth: 1
        },
        emphasis: {
          color: "rgba(37, 43, 61, .5)" // 悬浮背景
        }
      }
    },
    series: series
  };
  console.log("option:", option);
  return option;
};

// 热力图
commonecharts.makeHot = function(jsonData, name, mapCenter) {
  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = mapCenter[data[i].rowName];
      var value = data[i].rowMessage;
      if (geoCoord !== "" && value !== "") {
        res.push([geoCoord[0], geoCoord[1], value]);
      }
    }
    return res;
  };

  // 图例颜色
  var colorProgram = [];
  if (jsonData.colorProgram !== "") {
    var splitArry = jsonData.colorProgram.split(",");
    splitArry.forEach(element => {
      colorProgram.push(element);
    });
  } else {
    colorProgram = ["#5ca7b0", "#a8b76e", "#e9c437", "#e38f46", "#dc5b55"];
  }

  // 起点-终点数据1
  var SEData = [
    // 例子
    // [{name:'揭阳市'}, {name:'广州市',value:'95'}],
    // [{name:'河源市'}, {name:'深圳市',value:'190'}]
  ];
  for (let key in jsonData.SEList) {
    var SE = jsonData.SEList[key];
    if (SE.start !== "" && SE.end !== "" && SE.message !== "") {
      SEData.push([
        {
          name: SE.start
        },
        {
          name: SE.end,
          value: SE.message
        }
      ]);
    }
  }
  console.log("SEData:", SEData);

  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      // 起始点
      var fromCoord = mapCenter[dataItem[0].name];
      // 终点
      var toCoord = mapCenter[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value
        });
      }
    }
    return res;
  };

  var series = [
    {
      type: "lines",
      zlevel: 2,
      coordinateSystem: "geo",
      //  symbol: ['none', 'arrow'],
      effect: {
        show: true,
        loop: jsonData.checked,
        period: 4, // 箭头指向速度，值越小速度越快
        trailLength: 0.5, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: linkSymbol[jsonData.flowLine], // 箭头图标
        symbolSize: linkSymbolSize(jsonData.flowLine) // 图标大小
      },
      lineStyle: {
        normal: LineList[jsonData.flowLine]
        //    normal: {
        //        type:'dashed',
        //        width: jsonData.lineProgram, //尾迹线条宽度
        //        opacity: 0.6, //尾迹线条透明度
        //        curveness: 0.3 //尾迹线条曲直度

        //    }
      },
      data: convertData(SEData)
    },
    {
      type: startType(jsonData.flowStart),
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        // 涟漪特效
        period: 4, // 动画时间，值越小速度越快
        brushType: "stroke", // 波纹绘制方式 stroke, fill
        scale: 4 // 波纹圆环最大限制，值越大波纹越大
      },
      label: {
        normal: {
          show: true,
          position: "insideTopLeft", // 显示位置
          //  offset: [5, 0], //偏移设置
          formatter: function(params) {
            // 圆环显示文字
            if (jsonData.showData === "1" && params.data) {
              return params.data.name + "\n" + params.data.value[2];
            } else {
              return params.data.name;
            }
          },
          fontSize: 13
        },
        emphasis: {
          show: true
        }
      },
      symbol: startSymbol[jsonData.flowStart],
      symbolSize: function(val) {
        if (jsonData.flowStart === "0") {
          return 3 + val[2] / 50; // 圆环大小
        } else {
          return 15;
        }
      },
      itemStyle: {
        normal: {
          show: false,
          color: "#f00"
        }
      },
      data: SEData.map(function(dataItem) {
        return {
          name: dataItem[0].name,
          value: mapCenter[dataItem[0].name].concat([dataItem[1].value])
        };
      })
    },
    {
      // 被攻击点
      type: "scatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        period: 4,
        brushType: "stroke",
        scale: 4
      },
      label: {
        normal: {
          show: true,
          position: "right",
          // offset:[20, 0],
          color: "#0f0",
          formatter: "{b}",
          textStyle: {
            color: "#0f0"
          }
        },
        emphasis: {
          show: true,
          color: "#f60"
        }
      },
      symbol: endSymbol[jsonData.flowEnd],
      symbolSize: 15,
      data: SEData.map(function(dataItem) {
        return {
          name: dataItem[1].name,
          value: mapCenter[dataItem[1].name].concat([dataItem[1].value])
        };
      })
    }
    //  ,{
    //     type: 'custom',//配置显示方式为用户自定义
    //     coordinateSystem: 'geo',
    //     itemStyle: {
    //         normal: {
    //             color: '#46bee9'
    //         }
    //     },
    //     renderItem: function (params, api) {//具体实现自定义图标的方法
    //         return {
    //             type: 'image',
    //             symbolSize : 10,
    //             style: {
    //               image: require("../../../../assets/images/endCircle3.png"),
    //               x: api.coord(convertData(SEData)[params.dataIndex].coords[1])[0],
    //               y: api.coord(convertData(SEData)[params.dataIndex].coords[1])[1]
    //             }
    //         }
    //     },
    //    data: convertData(SEData)
    // }
  ];
  console.log("series:", series);

  var option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(166, 200, 76, 0.82)",
      borderColor: "#FFFFCC",
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: "z-index:100",
      formatter: function(params, ticket, callback) {
        // 根据业务自己拓展要显示的内容
        if (
          params.seriesType === "effectScatter" ||
          params.seriesType === "scatter"
        ) {
          return "线路：" + params.data.name + "" + params.data.value[2];
        } else if (params.seriesType === "lines") {
          return (
            params.data.fromName +
            ">" +
            params.data.toName +
            "<br />" +
            params.data.value
          );
        } else {
          return params.name;
        }
        // return res;
      }
    },
    backgroundColor: "#013954", // 背景色
    visualMap: {
      // 图例值控制
      min: 0,
      max: 500,
      calculable: true,
      show: true,
      color: colorProgram, // 图例色带
      textStyle: {
        color: "#fff"
      }
    },
    geo: {
      map: name,
      zoom: 1.2,
      // center: [104.2978515625, 35.8544921875],
      label: {
        emphasis: {
          show: false
        }
      },
      roam: true, // 是否允许缩放
      scaleLimit: {
        //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        min: 1.2, //最小的缩放值
        max: 3 //最大的缩放值
      },
      itemStyle: {
        normal: {
          color: "rgba(51, 69, 89, .5)", // 地图背景色
          borderColor: "#516a89", // 省市边界线00fcff 516a89
          borderWidth: 1
        },
        emphasis: {
          color: "rgba(37, 43, 61, .5)" // 悬浮背景
        }
      }
    },
    series: series
  };
  console.log("option:", option);
  return option;
};

// 热力图
commonecharts.makeHot = function(jsonData, name, mapCenter) {
  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = mapCenter[data[i].rowName];
      var value = data[i].rowMessage;
      if (geoCoord !== "" && value !== "") {
        res.push([geoCoord[0], geoCoord[1], value]);
      }
    }
    return res;
  };

  // 图例颜色
  var colorProgram = [];
  if (jsonData.colorProgram !== "") {
    var splitArry = jsonData.colorProgram.split(",");
    splitArry.forEach(element => {
      colorProgram.push(element);
    });
  } else {
    colorProgram = ["#5ca7b0", "#a8b76e", "#e9c437", "#e38f46", "#dc5b55"];
  }

  var series = [
    {
      name: name,
      type: "heatmap",
      pointSize: jsonData.radius, // 设置 热力图 点 的大小
      blurSize: jsonData.blur, // 设置点的 阴影半径
      coordinateSystem: "geo",
      label: {
        normal: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: "skyblue"
        }
      },
      data: convertData(jsonData.cantonList)
    }
  ];
  if (jsonData.showData === "1") {
    series.push({
      type: "scatter",
      coordinateSystem: "geo",
      symbol: "pin", // 气泡
      symbolSize: 50,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: 9
          },
          formatter: function(params) {
            // 显示文字与数值
            console.log(params);
            return params.name + "\n" + params.data[2];
          }
        }
      },
      itemStyle: {
        normal: {
          color: "#F62157"
        }
      },
      zlevel: 6,
      data: convertData(jsonData.cantonList)
    });
  }

  var option = {
    title: {
      text: name + "_热力图",
      left: "center",
      textStyle: {
        color: "#fff"
      }
    },
    backgroundColor: "#013954",
    visualMap: {
      show: true,
      top: "top",
      min: 0,
      max: 500,
      // seriesIndex: 0,
      calculable: true,
      inRange: {
        // color: ['blue', 'blue', 'green', 'yellow', 'red']
        color: colorProgram
      },

      textStyle: {
        color: "#fff"
      }
    },
    geo: {
      map: name,
      zoom: 1.2,
      aspectScale: 1,
      label: {
        emphasis: {
          show: true,
          color: "#fff",
          fontSize: 14
        }
        // 遮挡问题
        // normal: { // 显示地图区域名称
        //     show: true,
        //     color: 'rgba(242,242,242,0.5)',
        //     fontSize: 12
        // }
      },
      roam: true, // 是否允许缩放
      scaleLimit: {
        //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        min: 1.2, //最小的缩放值
        max: 3 //最大的缩放值
      },
      itemStyle: {
        normal: {
          color: "rgba(51, 69, 89, .5)", // 地图背景色
          borderColor: "#516a89", // 省市边界线00fcff 516a89
          borderWidth: 1
        },
        emphasis: {
          color: "rgba(37, 43, 61, .5)" // 悬浮背景
        }
      },
      emphasis: {
        itemStyle: {
          color: "rgba(37, 43, 61, .5)" // 悬浮背景
        },
        label: {
          show: true,
          color: "#fff",
          fontSize: 14
        }
      }
    },
    series: series
  };
  console.log("option:", option);
  return option;
};

commonecharts.test = function() {
  alert("22");
};

commonecharts.monitor = function(jsonData, name, mapCenter, centerId) {
  //流向图标
  var linkSymbol = [
    "roundRect",
    commonecharts.linesInage1,
    commonecharts.linesInage2
  ];
  //流向图标大小
  var linkSymbolSize = function(data) {
    if (data == "0") {
      return 5;
    } else {
      return 20;
    }
  };
  //虚线
  var dottedLine = {
    type: "dashed",
    width: jsonData.lineProgram, //尾迹线条宽度
    opacity: 0.6, //尾迹线条透明度
    curveness: 0.3 //尾迹线条曲直度
  };
  //实线
  var solidLine = {
    width: jsonData.lineProgram, //尾迹线条宽度
    opacity: 0.6, //尾迹线条透明度
    curveness: 0.3 //尾迹线条曲直度
  };
  var LineList = [solidLine, solidLine, dottedLine];

  //起点图标
  var startSymbol = [
    "circle",
    commonecharts.dot,
    commonecharts.round,
    commonecharts.startPoint
  ];
  //起点类型
  var startType = function(data) {
    if (data == "0") {
      return "effectScatter";
    } else {
      return "scatter";
    }
  };

  //终点图标
  var endSymbol = [
    "pin",
    commonecharts.dot,
    commonecharts.round,
    commonecharts.endPoint
  ];

  //图例颜色
  var colorProgram = [];
  if (jsonData.colorProgram != "") {
    var splitArry = jsonData.colorProgram.split(",");
    splitArry.forEach(element => {
      colorProgram.push(element);
    });
  } else {
    colorProgram = ["#5ca7b0", "#a8b76e", "#e9c437", "#e38f46", "#dc5b55"];
  }

  //起点-终点数据1
  var SEData = [
    //例子
    // [{name:'揭阳市'}, {name:'广州市',value:'95'}],
    // [{name:'河源市'}, {name:'深圳市',value:'190'}]
  ];
  for (let key in jsonData.SEList) {
    var SE = jsonData.SEList[key];
    if (SE.start != "" && SE.end != "" && SE.message != "") {
      SEData.push([
        {
          name: SE.start
        },
        {
          name: SE.end,
          value: SE.message
        }
      ]);
    }
  }
  console.log("SEData:", SEData);

  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      //起始点
      var fromCoord = mapCenter[dataItem[0].name];
      //终点
      var toCoord = mapCenter[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value
        });
      }
    }
    return res;
  };
  var series = [
    {
      type: "lines",
      zlevel: 2,
      coordinateSystem: "geo",
      //  symbol: ['none', 'arrow'],
      effect: {
        show: true,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.001, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: linkSymbol[jsonData.flowLine], //箭头图标
        symbolSize: linkSymbolSize(jsonData.flowLine) //图标大小
      },
      // lineStyle: {
      //   normal: LineList[jsonData.flowLine]
      //   //    normal: {
      //   //        type:'dashed',
      //   //        width: jsonData.lineProgram, //尾迹线条宽度
      //   //        opacity: 0.6, //尾迹线条透明度
      //   //        curveness: 0.3 //尾迹线条曲直度

      //   //    }
      // },
      lineStyle: {
        normal: {
          color: "#0ebbf1",
          width: 1,
          opacity: 0.4,
          curveness: 0.2
        }
      },
      data: convertData(SEData)
    },
    {
      type: startType(jsonData.flowStart),
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        //涟漪特效
        period: 4, //动画时间，值越小速度越快
        brushType: "stroke", //波纹绘制方式 stroke, fill
        scale: 4 //波纹圆环最大限制，值越大波纹越大
      },
      label: {
        normal: {
          color: "#f2934c",
          show: true,
          position: "right", //显示位置
          offset: [10, 0], //偏移设置
          formatter: function(params) {
            //圆环显示文字
            if (jsonData.showData == "1" && params.data) {
              return params.data.name + "\n" + params.data.value[2];
            } else {
              return params.data.name;
            }
          },
          fontSize: 13
        },
        emphasis: {
          show: true
        }
      },
      symbol: startSymbol[jsonData.flowStart],
      symbolSize: function(val) {
        if (jsonData.flowStart == "0") {
          return 3 + val[2] / 50; //圆环大小
        } else {
          return 15;
        }
      },
      itemStyle: {
        normal: {
          show: false,
          color: "#0ebbf1"
        }
      },
      data: SEData.map(function(dataItem) {
        return {
          name: dataItem[0].name,
          value: mapCenter[dataItem[0].name].concat([dataItem[1].value])
        };
      })
    },
    {
      //被攻击点
      type: "scatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        period: 4,
        brushType: "stroke",
        scale: 4
      },
      label: {
        normal: {
          show: true,
          position: "right",
          offset: [15, 0],
          color: "#c23531",
          formatter: "{b}",
          textStyle: {
            color: "#f2934c"
          }
        },
        emphasis: {
          show: true,
          color: "#f60"
        }
      },
      symbol: endSymbol[jsonData.flowEnd],
      symbolSize: 15,
      data: SEData.map(function(dataItem) {
        return {
          name: dataItem[1].name,
          value: mapCenter[dataItem[1].name].concat([dataItem[1].value])
        };
      })
    }
    // {
    //   name: "map",
    //   type: 'map',
    //   mapType: name,
    //   geoIndex: 0,
    //   label: {
    //     normal: {
    //       show: true
    //     },
    //     emphasis: {
    //       show: true
    //     }
    //   },
    //   data: jsonData.allData,
    //   tooltip: {
    //     trigger: "item",
    //     triggerOn: "mousemove",
    //     backgroundColor: "rgba(0,0,0,.8)",
    //     borderColor: "#3574c8",
    //     borderWidth: "2",
    //     extraCssText: "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
    //     show: true,
    //     formatter: function (params) {
    //       console.log(params)
    //       return params.name + "<br/>成果汇交：" + params.data.value + "次 <br/> 成果汇交：" + params.data.value2 + "次 "

    //       // var res;
    //       // if (params.value > 0) {
    //       //     res = params.data.value2 + "<br/>";
    //       //     res += params.data.value3;
    //       // } else {
    //       //     res = "";
    //       // }
    //       // return res;
    //     }
    //   }
    // }
    //  ,{
    //     type: 'custom',//配置显示方式为用户自定义
    //     coordinateSystem: 'geo',
    //     itemStyle: {
    //         normal: {
    //             color: '#46bee9'
    //         }
    //     },
    //     renderItem: function (params, api) {//具体实现自定义图标的方法
    //     renderItem: function (params, api) {//具体实现自定义图标的方法
    //     renderItem: function (params, api) {//具体实现自定义图标的方法
    //         return {
    //             type: 'image',
    //             symbolSize : 10,
    //             style: {
    //               image: require("../../../../assets/images/endCircle3.png"),
    //               x: api.coord(convertData(SEData)[params.dataIndex].coords[1])[0],
    //               y: api.coord(convertData(SEData)[params.dataIndex].coords[1])[1]
    //             }
    //         }
    //     },
    //    data: convertData(SEData)
    // }
  ];
  console.log("series:", series);

  var option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(166, 200, 76, 0.82)",
      borderColor: "#FFFFCC",
      showDelay: 0,
      hideDelay: 0,
      enterable: true,
      transitionDuration: 0,
      extraCssText: "z-index:100",
      formatter: function(params, ticket, callback) {
        //根据业务自己拓展要显示的内容
        if (
          params.seriesType == "effectScatter" ||
          params.seriesType == "scatter"
        ) {
          return "线路：" + params.data.name + "" + params.data.value[2];
        } else if (params.seriesType == "lines") {
          return (
            params.data.fromName +
            ">" +
            params.data.toName +
            "<br />" +
            params.data.value
          );
        } else {
          return params.name;
        }
        // return res;
      }
    },
    // backgroundColor: "#fff", //背景色
    // visualMap: { //图例值控制
    //   min: 0,
    //   max: 500,
    //   calculable: true,
    //   show: false,
    //   color: ['#0ebbf1', '#66c693', '#ead409'], //图例色带
    //   textStyle: {
    //     color: '#fff'
    //   }
    // },
    visualMap: {
      // 颜色的设置  dataRange
      show: false,
      itemWidth: 14,
      itemHeight: 14,
      bottom: 60,
      left: 10,
      inverse: "true", // 控制高低的位置
      orient: "horizontal", // 控制导航的方向
      splitList: [
        {
          start: 1000,
          end: 2000,
          color: "#f0525b"
        },
        {
          start: 500,
          end: 1000,
          color: "#f2934c"
        },
        { end: 100, color: "#f9f7dc" }
      ],
      // splitList: [
      //   {
      //     start: Math.ceil((valueAllDataMax / 3) * 2),
      //     end: Math.ceil((valueAllDataMax / 3) * 3),
      //     color: "#f0525b"
      //   },
      //   {
      //     start: Math.ceil((valueAllDataMax / 3) * 1),
      //     end: Math.ceil((valueAllDataMax / 3) * 2),
      //     color: "#f2934c"
      //   },
      //   { end: Math.ceil((valueAllDataMax / 3) * 1), color: "#f9f7dc" }
      // ],
      text: ["高", "低"] // 文本，默认为数值文本
    },
    geo: {
      map: name,
      zoom: 1.1,
      aspectScale: 1,
      // center: [104.2978515625, 35.8544921875],
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false, //是否允许缩放
      itemStyle: {
        normal: {
          color: "rgba(51, 69, 89, .5)", // 地图背景色
          borderColor: "#516a89", // 省市边界线00fcff 516a89
          borderWidth: 1
        },
        emphasis: {
          color: "rgba(37, 43, 61, .5)" // 悬浮背景
        }
      }
    },
    series: series.concat({
      name: "guangdong",
      type: "map",
      aspectScale: 1,
      mapType: name,
      geoIndex: 0,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: jsonData.allData,
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: "rgba(0,0,0,.8)",
        borderColor: "#3574c8",
        borderWidth: "2",
        extraCssText: "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
        show: true,
        formatter: function(params) {
          console.log(params);
          return (
            params.name +
            "<br/>成果汇交：" +
            params.data.value +
            "次 <br/> 成果汇交：" +
            params.data.value2 +
            "次 "
          );

          // var res;
          // if (params.value > 0) {
          //     res = params.data.value2 + "<br/>";
          //     res += params.data.value3;
          // } else {
          //     res = "";
          // }
          // return res;
        }
      }
    })
  };
  return option;
};

export default commonecharts;
