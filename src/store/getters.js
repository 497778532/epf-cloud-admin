const getters = {
  getScreenshotState: state => state.onemap.screenshotState,
  getLayerUrl: state => state.onemap.layerUrl,
  getLayerId: state => {
    return {
      layerId: state.onemap.layerId,
      drawType: state.onemap.drawType,
      radius: state.onemap.radius
    }
  },
  getRightSelectLayerId: state => state.onemap.rightSelectLayerId,
  getCJFKServiceType: state => state.jcpgyj.CJFKServiceType
}
export default getters
