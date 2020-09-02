import { request } from '@/utils/http'
import qs from 'qs'

// 获取评价分析页面数据-通用接口
export function getPaEvaluationAnalysisByEvaluationType (param) {
  return request({
    url: '/api/epf-planning-analysis/paevaluationanalysis/getPaEvaluationAnalysisByEvaluationType',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 获取选择分析数据列表接口
export function getAnalysisDataList (param) {
  return request({
    url: '/api/epf-planning-analysis/paevaluationanalysis/getAnalysisDataList',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 获取模型库信息数据列表接口
export function getImModelLibraryList () {
  return request({
    url: '/api/epf-planning-analysis/paevaluationanalysis/getImModelLibraryList',
    method: 'post'
  })
}

// 获取分析计算后的结果信息接口
export function getAnalysisCalculationDate (param) {
  return request({
    url: '/api/epf-planning-analysis/paevaluationanalysis/getAnalysisCalculationDate',
    method: 'post',
    data: qs.stringify(param)
  })
}
