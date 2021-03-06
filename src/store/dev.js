
import Tool from './tool.js'
import LocalData from '@/localData/data.js'

/**
 * 本地开发代码
 * @ [调用本地数据]
 * @ [不请求接口]
 */
const Dev = {}

/**
 * [请求：指标]
 */
Dev.A_getCode = function (state, dispatch, that) {
  const asd = LocalData['进展汇总'] || []
  const { itemGanttSummary } = asd
  console.log('进展汇总 ----- ', asd, itemGanttSummary)
  //
  //
  //
  const res = LocalData['指标'] || []
  /* 返回：整理后的指标数组 */
  const selectNodeObj = JSON.parse(localStorage.getItem('NOVA_total_selectNodeObj')) || {} //   select 选中的节点对象 [通过 Tool.returnSearchData() 生成 searchData, searchVal, searchLabel]
  const { selectArr, asdObj } = Tool.returnSelectArr(res, selectNodeObj)
  state.selectArr = selectArr
  state.asdObj = asdObj
  /* 计算：表格高度 */
  that._countHeight()
  // console.log('指标 ----- ', selectArr)
}

/**
 * [请求：数据]
 */
Dev.A_getData = function (state, getters, dispatch, params) {
  const { operationType = 'search' } = params // 'export' 导出
  // const { pagenum, rownum, searchText, searchHeader, searchData, selectArr, colorArr, advancedQuery: advancedQueryArr } = state
  // const columncondition = JSON.stringify(Tool.columncondition(searchData))
  // const statisticsIndexNum = JSON.stringify(Tool.nameColor(selectArr, colorArr))
  // const itemname = searchText.trim()
  // const searchcontent = JSON.stringify(searchHeader)
  // const advancedQuery = JSON.stringify(advancedQueryArr)
  // const obj = {
  //   operationType, //      搜索 || 导出
  //   statisticsIndexNum, // 所有大类名字数组 && 所有颜色数组 [导出用]
  //   columncondition, //    选中的大类
  //   pagenum, //            页数
  //   rownum, //             每页条数
  //   itemname, //           项目名称
  //   searchcontent, //      表头搜索
  //   advancedQuery //       高级查询
  // }
  // console.log('数据 ----- obj:', obj)

  const res = LocalData['数据'] || {}
  // console.log('数据 ----- res:', res)
  const typeObj = { search: 'is_A_search', export: 'is_A_export' }
  //
  state[typeObj[operationType]] = true //               可以：搜索 / 导出
  state.isLoading = false //                            关闭：加载动画
  const { datalist, datanum = 0 } = res
  state.pageCount = datanum //                          赋值：总条数
  state.dataList = datalist === null ? [] : datalist // 赋值：表格数据
  state.countData = {} //                               重置：合计
}

/**
 * [请求：合计]
 */
Dev.A_count = function (state, getters, dispatch) {
  const res = LocalData['合计'] || {}
  state.is_A_count = true // 是否：可以合计
  state.countData = res //   赋值：合计数据
}

/**
 * [请求：删除文件]
 */
Dev.A_exportDelete = function () {
  const path = localStorage.getItem('NOVA_total_export_path') || ''
  if (path.length) {
    console.log('要删除的文件地址： ', path)
  }
}

export default Dev
