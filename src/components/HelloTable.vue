<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(item, idx) in tableHeader" :key="idx" :prop="item" :label="item"></el-table-column>
      <el-table-column label="Operations" v-if="canEdit || canDelete">
        <template slot-scope="scope">
          <el-button v-if="canEdit" type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-if="canDelete" type="danger" size="mini" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="editDialogVisible">
      <el-form :model="editedData" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="editedData.name"></el-input>
        </el-form-item>
        <el-form-item label="Age">
          <el-input v-model="editedData.age"></el-input>
        </el-form-item>
        <el-form-item label="Gender">
          <el-input v-model="editedData.gender"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="editedData.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSave">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloTable',
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    },
    initTableData: {
      type: Array,
      default: () => ([])
    },
    canEdit: {
      type: Boolean,
      default: () => false
    },
    canDelete: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      tableData: this.initTableData,
      editDialogVisible: false,
      editedData: {},
    }
  },
  methods: {
    handleEdit(index, row) {
      this.editedData = Object.assign({}, row)
      this.editDialogVisible = true
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    handleSave() {
      const index = this.tableData.indexOf(this.editedData)
      if (index > -1) {
        Object.assign(this.tableData[index], this.editedData)
      } else {
        this.tableData.push(this.editedData)
      }
      this.editDialogVisible = false
    }
  }
}
</script>