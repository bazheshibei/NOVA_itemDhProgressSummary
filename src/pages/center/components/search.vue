
<!-- 搜索模块 -->
<template>
  <div class="comBox">

    <!-- 项目名称 -->
    <div class="searchBox">
      <div class="searchName">项目名称：</div>
      <el-input class="nameInput" size="mini" v-model="projectName" placeholder="多个查询空格分隔" @input="inputProjectName"></el-input>
    </div>

    <!-- 按钮组 -->
    <div class="searchBtnBox">
      <!-- 查询 -->
      <el-button type="primary" size="mini" @click="submit({ operationType: 'search' })">
        查询 <i class="el-icon-search"></i>
      </el-button>
      <!-- 高级查询 -->
      <el-button type="primary" size="mini" @click="showAdvancedQuery">
        高级查询 <i class="el-icon-s-tools"></i>
      </el-button>
      <!-- 导出 -->
      <el-button type="success" size="mini" plain @click="submit({ operationType: 'export' })">
        导出 <i class="el-icon-download" v-if="is_A_export"></i><i class="el-icon-loading" v-else></i>
      </el-button>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ComTree from './comTree.vue'
export default {
  components: { ComTree },
  data() {
    return {
      selectNodeObj: {}, //  select 选中的节点对象
      projectName: '' //     项目名称
    }
  },
  created() {
    /* 提取上次的数据 */
    const searchText = localStorage.getItem('NOVA_total_searchText') || '' // 项目名称
    this.$store.commit('saveData', { name: 'searchText', obj: searchText })
    /* 赋值 */
    this.projectName = searchText
  },
  computed: {
    ...mapState(['is_A_search', 'is_A_export', 'is_A_count']),
    ...mapGetters(['isSearch', 'deleteType', 'isChooseSelect', 'isChoose3'])
  },
  methods: {
    /**
     * [显示：高级查询]
     */
    showAdvancedQuery() {
      this.$store.commit('saveData', { name: 'isDialog', obj: true })
    },
    /**
     * [项目名称：输入搜索文字]
     */
    inputProjectName(event) {
      this.$store.commit('saveData', { name: 'searchText', obj: event })
    },
    /**
     * [查询 / 导出]
     * @param {[String]}  operationType 搜索 / 导出
     * @param {[Boolean]} isLoading     是否显示加载动画
     */
    submit(params = {}) {
      const { operationType = 'search', isLoading = true } = params
      /** 查询 / 导出 **/
      this.$store.dispatch('search', { operationType, isLoading })
    }
    //
  }
}
</script>

<style scoped>
.comBox { /* 表单容器 */
  margin-right: 40px;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}

.searchBox { /* 单个组件块 */
  width: 290px;
  font-size: 12px;
  margin: 5px 0px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.searchBtnBox {
  font-size: 12px;
  margin: 5px 10px 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex: 1;
}
.searchName { /* 单个 label */
  white-space: nowrap;
  margin-left: 10px;
}
</style>
