<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
      <el-table-column prop="gender" label="Gender"></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
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
  name: 'HelloWorld',
  props: {
    param: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableData: [
        { name: 'John', age: 18, gender: 'Male', address: 'New York' },
        { name: 'Jane', age: 22, gender: 'Female', address: 'London' },
        { name: 'Bob', age: 32, gender: 'Male', address: 'Paris' },
        { name: 'Tom', age: 24, gender: 'Male', address: 'Tokyo' }
      ],
      dialogVisible: false,
      editedData: {}
    }
  },
  methods: {
    handleEdit(index, row) {
      this.editedData = Object.assign({}, row)
      this.dialogVisible = true
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
      this.dialogVisible = false
    }
  }
}
</script>