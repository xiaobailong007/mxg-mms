<template>
  <div>
    <!-- 行内表单 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top:20px"
    >
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="商品名称"
          style="width:200px"
        ></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input
          v-model="searchMap.code"
          placeholder="商品编号"
          style="width:200px"
        ></el-input>
      </el-form-item>

      <el-form-item prop="supplierName">
        <el-input
          readonly
          @click.native="dialogSupplierVisible = true"
          v-model="searchMap.supplierName"
          placeholder="选择供应商"
          style="width:200px"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <!-- <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button> -->
      </el-form-item>
    </el-form>

    <!-- 数据列表 -->
    <el-table :data="list" height="380" border style="width: 100%">
      <!-- type="index"获取索引值-->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="code" label="商品编码"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 选择供应商对话框 -->
    <el-dialog
      title="选择供应商"
      :visible.sync="dialogSupplierVisible"
      width="500px"
    >
      <supplier :isDialog="true"></supplier>
    </el-dialog>
  </div>
</template>

<script>
import goodsApi from "@/api/goods";
import Supplier from "@/views/supplier";
export default {
  //注册Supplier作为子组件
  components: { Supplier },
  data() {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchMap: {},
      dialogSupplierVisible: false //弹出选择供应商对话框
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      goodsApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const data = response.data.data;
          this.list = data.rows;
          this.total = data.total;
          //console.log(this.list);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    }
  }
};
</script>
