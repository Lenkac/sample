<template>
  <div class="full-form">
    <!-- <h3>{{initParams.title}}</h3> -->
    <el-form
      :ref="initParams.formName"
      class="formStyle"
      :rules="initParams.rules"
      :model="initParams.model"
      label-position="left"
      label-width="80px"
      :style="initParams.formStyle"
    >
      <el-form-item
        v-for="efi in items"
        :key="efi.key"
        :label="efi.label"
        :prop="efi.prop"
        :style="efi.itemStyle"
      >
        <el-input
          v-if="efi.type == 'input'"
          size="medium"
          v-model="initParams.model[efi.prop]"
          :placeholder="efi.ph"
          :style="efi.selfStyle"
        />
        <el-select
          v-if="efi.type == 'select'"
          v-model="initParams.model[efi.prop]"
          :placeholder="efi.ph"
          :style="efi.selfStyle"
        >
          <el-option
            v-for="lds in initParams.dataSources[efi.prop]"
            :key="lds.key"
            :label="lds.label"
            :value="lds.value"
          />
        </el-select>
        <el-tree
            v-if="efi.type == 'tree'"
            ref="tree"
            :check-strictly="checkStrictly"
            :data="initParams.model[efi.prop]"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        <el-checkbox-group v-if="efi.type == 'checkbox'" v-model="initParams.model[efi.prop]">
          <el-checkbox v-for="r in initParams.dataSources[efi.prop]" :key="r.key" :label="r.label"></el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="efi.type == 'radio'" v-model="initParams.model[efi.prop]">
          <el-radio v-for="r in initParams.dataSources[efi.prop]" :key="r.key" :label="r.label"></el-radio>
        </el-radio-group>
        <el-input
          v-if="efi.type == undefined"
          v-model="temp[efi.prop]"
          :placeholder="efi.ph"
          :style="efi.style"
        />
      </el-form-item>
        <el-button style="margin-left:33px;" :icon="initParams.icon" type="primary" @click="submitForm()">{{initParams.submitButton}}</el-button>
        <el-button  @click="resetForm()">{{initParams.resetButton}}</el-button>
        <a v-if="items.length>initParams.expand" class="drop-down" @click="dropDown">
          {{dropDownContent}}
          <Icon :type="dropDownIcon"></Icon>
        </a>
        <span>{{loading}}</span>
    </el-form>
  </div>
</template>

<script>
import {
  getObj,
  getMockObj,
  listAll,
  removeObj,
  createObj,
  validateRes
} from "@/api/commonData";
export default {
  name: "DynamicForm",
  props: {
    formData: Object,
    kind: "",
    onOK: Function
  },
  computed: {
    items: function() {
      return this.initParams.items.filter(function(item) {
        return item.drop;
      });
    }
  },

  data() {
    return {
      initParams: {},
      loading: "",
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      drop: false,
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    this.initParams = this.formData;
    console.log(this.initParams);
    if (!this.initParams.title || this.initParams.title == "") {
      this.initParams.title = "标签";
    }
    if (!this.initParams.submitButton || this.initParams.submitButton == "") {
      this.initParams.submitButton = "提交";
    }
    if (!this.initParams.resetButton || this.initParams.resetButton == "") {
      this.initParams.resetButton = "重置";
    }
    for (var i = 0; i < this.initParams.items.length; i++) {
      if (
        this.initParams.items[i].type == "select" ||
        this.initParams.items[i].type == "radio" ||
        this.initParams.items[i].type == "checkbox"
      ) {
        this.promiseDataSource(this.initParams.items[i].prop);
      }
    }
  },
  watch: {
    formData(newVal) {
      this.initParams = newVal;
    }
  },
  methods: {
    submitForm() {
      this.$refs[this.initParams.formName].validate(valid => {
        if (valid) {
          this.$emit("watchSearch", this.formData.model)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs[this.initParams.formName].resetFields();
    },
    dropDown() {
      if (this.drop) {
          this.dropDownContent = "展开";
          this.dropDownIcon = "ios-arrow-down";
        } else {
          this.dropDownContent = "收起";
          this.dropDownIcon = "ios-arrow-up";
        }
        for (let i = this.initParams.expand; i < this.initParams.items.length; i++) {  
          this.initParams.items[i].drop = !this.drop;
        }
        console.log(this.items)
        this.drop = !this.drop
      
    },
    promiseDataSource(itemName) {
      this.loading = "start" + itemName;
      getMockObj(
        {
          kind: "Frontend",
          name: this.name + "-" + this.initParams.formName + "-" + itemName
        },
        "/ds/" + itemName
      ).then(response => {
        if (validateRes(response)) {
          this.initParams.dataSources[itemName] = response.data.spec.data;
          console.log("change loading");
          this.loading = itemName;
        } else {
        }
      });
    }
  }
};
</script>

<style>
.full-form {
  min-width: 100%;
  min-height: 100%;
  height: auto;
  overflow: hidden;
  background: white;
  border-radius: 3px;
}

.permission-tree {
    margin-bottom: 30px;
  }

.full-form .el-form-item__label {
    font-weight: 400;
}

.full-form .el-form-item--medium .el-form-item__label {
    line-height: 32px;
}

.full-form .el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
}
.full-form .el-form-item__content {
  margin-left: 10px;
}

.full-form .el-button--medium {
    padding: 1px 15px;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
}

</style>