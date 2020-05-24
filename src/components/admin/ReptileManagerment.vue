<template>
  <div id="reptileManager">
    <div class="reptileManager-middle">
      <div class="left">
        <el-menu
          @select="selectLoad"
          default-active="01"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="01">
            <svg class="icon" aria-hidden="true" style="font-size: 20px;margin-right: 5px;">
              <use xlink:href="#icon-shangchuan1" />
            </svg>
            <span slot="title">笔趣阁</span>
          </el-menu-item>
          <el-menu-item index="02">
            <i class="el-icon-document"></i>
            <span slot="title">世界名著网</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <div v-show="loadChange=='01'">
          <div class="form-father">
            <el-form ref="form" :model="BQFrom" label-width="80px">
              <el-form-item label="书籍分类">
                <el-select v-model="BQFrom.BQflag" placeholder="请选择类型">
                  <el-option
                    :label="item.type"
                    :value="item.url"
                    v-for="item in BQstyle"
                    :key="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="书籍数量">
                <el-input-number v-model="BQFrom.bookNum" :step="5" :min="5" :max="40"></el-input-number>
              </el-form-item>
              <el-form-item label="章节数量">
                <el-input-number v-model="BQFrom.chapterNum" :step="5" :min="0"></el-input-number>
              </el-form-item>
              <div class="importanted">(注：章节数量为0代表爬取所有章节)</div>
              <el-form-item>
                <el-button type="primary" @click="onSubmitBQ">立即爬取</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-show="loadChange=='02'">
          <div class="form-father">
            <el-form ref="form" :model="WDFrom" label-width="80px">
              <el-form-item label="书籍分类">
                <el-select v-model="WDFrom.WDflag" placeholder="请选择类型">
                  <el-option
                    :label="item.type"
                    :value="item.url"
                    v-for="item in WDstyle"
                    :key="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="书籍数量">
                <el-input-number v-model="WDFrom.bookNum" :step="5" :min="5" :max="40"></el-input-number>
              </el-form-item>
              <el-form-item label="章节数量">
                <el-input-number v-model="WDFrom.chapterNum" :step="5" :min="0"></el-input-number>
              </el-form-item>
              <div class="importanted">(注：章节数量为0代表爬取所有章节)</div>
              <el-form-item>
                <el-button type="primary" @click="onSubmitWD">立即爬取</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "reptileManager",
  created() {},
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      loadChange: "01",
      BQstyle: [
        { type: "玄幻", url: "xuanhuanxiaoshuo" },
        { type: "修真", url: "xiuzhenxiaoshuo" },
        { type: "都市", url: "dushixiaoshuo" },
        { type: "历史", url: "lishixiaoshuo" },
        { type: "网游", url: "wangyouxiaoshuo" },
        { type: "科幻", url: "kehuanxiaoshuo" },
        { type: "女频", url: "nvpinxiaoshuo" }
      ],
      WDstyle: [
        { type: "小说", url: "special_book1/小说" },
        { type: "散文", url: "special_book2/散文" },
        { type: "诗歌", url: "special_book3/诗歌" },
        { type: "史书", url: "special_book4/史书" },
        { type: "社科", url: "special_book5/社科" },
        { type: "传记", url: "special_book6/传记" },
        { type: "戏剧", url: "special_book7/戏剧" }
      ],
      BQFrom: {
        BQflag: "xuanhuanxiaoshuo",
        bookNum: 10,
        chapterNum: 20
      },
      WDFrom: {
        WDflag: "special_book1/小说",
        bookNum: 10,
        chapterNum: 20
      }
    };
  },
  methods: {
    selectLoad(index, indexPath) {
      console.log(index + "--" + indexPath);
      this.loadChange = index;
    },
    onSubmitBQ() {
      api.startBQ(this.BQFrom).then(res => {
        this.$message({
          message: res,
          type: "success"
        });
      });
    },
    onSubmitWD() {
      api.startWorld(this.WDFrom).then(res => {
        this.$message({
          message: res,
          type: "success"
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#reptileManager {
  width: 100%;
  height: 800px;
}
#reptileManager .reptileManager-middle {
  width: 1000px;
  height: 100%;
  margin: auto;
  border: 1px solid red;
}
#reptileManager .reptileManager-middle .left {
  width: 16%;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
}
#reptileManager .reptileManager-middle .left ul {
  margin-top: 100px;
}
#reptileManager .reptileManager-middle .right {
  width: 80%;
  height: 100%;
  float: right;
  /* border: 1px solid red; */
}
.form-father {
  width: 60%;
  margin: auto;
  margin-top: 50px;
}
.importanted {
  margin: 20px 0;
  font-size: 12px;
  margin-left: 80px;
}
</style>
