<template>
  <div>
    <el-row class="elRows">
      <span>语料详情</span>
      <el-button type="primary" class="els" @click="goBack" size="small">
        <i class="el-icon-back"></i>&nbsp;返回
      </el-button>
    </el-row>
    <div class="lines"></div>
    <div class="demo-image__placeholder">
      <div class="block" @click="dialogVisible=true">
        <span class="demonstration">{{corpus_name}}</span>
        <el-image :src="require(`@/assets/corpusdetail.png`)"></el-image>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="80%">
      <el-form ref="form" :model="form" status-icon label-width="10%" class="demo-ruleForm">
        <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="文本">
              <el-col>
                <el-input v-model="form.text" span="5" size="medium" value="123" style="width:35%"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="标注类型" prop="is_increase">
              <el-radio-group v-model="form.gpu_id" style="margin-left:2%">
                <el-radio v-model="form.gpu_id" label="主语" border>主语</el-radio>
                <el-radio v-model="form.gpu_id" label="谓语" style border>谓语</el-radio>
                <el-radio v-model="form.gpu_id" label="宾语" style border>宾语</el-radio>
                <el-radio v-model="form.gpu_id" label="时间" style border>时间</el-radio>
                <el-radio v-model="form.gpu_id" label="地点" style border>地点</el-radio>
                <el-radio v-model="form.gpu_id" label="否定词" style border>否定词</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="属性">
              <el-col>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col>
            <el-form-item label="备注">
              <el-col>
                <el-input type="textarea" v-model="form.log_batch_num" span="5" size="medium" style="width:35%"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-button type="primary" style="float:right;" @click="dialogVisible=false">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      corpus_name: "",
      desc: "",
      srcList: [],
      dialogVisible: false,
      form: {
        is_gpu: "",
        text:"朝鲜火箭"
      },
      options: [
        {
          value: "发生情况：正在发生",
          label: "发生情况：正在发生"
        },
        {
          value: "发生情况：可能发生",
          label: "发生情况：可能发生"
        },
        {
          value: "发生情况：已发生",
          label: "发生情况：已发生"
        }
      ],
      value: []
    };
  },
  created() {
    this.corpus_name = this.$Base64.decode(this.$route.query.corpus_name);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.el-row {
  height: 64px;
  line-height: 64px;
  width: 100%;
}

.searchData {
  margin-bottom: 4px;
}

.elRows {
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.el-icon-coin,
.el-row span {
  color: #2196f3;
  font-size: 18px;
}

.lines {
  margin-top: 4px;
  width: 100%;
  min-height: 1px;
  background: #dddddd;
  margin-bottom: 15px;
}
.els {
  float: right;
  margin-top: 3px;
}
</style>
