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
        <el-button type="primary" @click="handleAdd"
          >新增</el-button
        >
        <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
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
      <supplier
        title="编辑商品"
        :isDialog="true"
        @option-supplier="optionSupplier"
        width="500px"
      >
        <el-form
          :rules="rules"
          ref="pojoForm"
          label-width="100px"
          label-position="right"
          style="width:400px"
          :model="pojo"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="pojo.name"></el-input>
          </el-form-item>

          <el-form-item label="商品编码" prop="code">
            <el-input v-model="pojo.code"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="mobile">
            <el-input v-model="pojo.mobile"></el-input>
          </el-form-item>

          <el-form-item label="零售价" prop="spec">
            <el-input v-model="pojo.spec"></el-input>
          </el-form-item>

          <el-form-item label="进货价" prop="retailPrice">
            <el-input v-model="pojo.retailPrice"></el-input>
          </el-form-item>

          <el-form-item label="库存数量" prop="purchaesPrice">
            <el-input v-model="pojo.purchaesPrice"></el-input>
          </el-form-item>

          <el-form-item label="供应商" prop="supplierName">
            <el-input v-model="pojo.supplierName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              pojo.id === null ? addData('pojoForm') : updateDate('pojoForm')
            "
            >确 定
          </el-button>

          <el-button type="primary" @click="addData('pojoForm')"
            >确 定
          </el-button>
        </div>
      </supplier>
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
      searchMap: {
        name: "",
        code: "",
        supplierName: ""
      },
      dialogSupplierVisible: false, //弹出选择供应商对话框
      dialogFormVisible: false, //编辑窗口
      rules: {},
      pojo: {}
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
    },
    optionSupplier(currentRow) {
      console.log("parent", currentRow);
      this.searchMap.supplierName = currentRow.name; //供应商名称
      this.searchMap.supplierId = currentRow.id; //供应商ID
      this.dialogSupplierVisible = false; //关闭窗口
    },

    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    }
  }
};
</script>
