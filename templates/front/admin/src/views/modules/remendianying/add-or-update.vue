<template>
	<div class="addEdit-block" :style='{"width":"100%","padding":"30px","margin":"0","background":"rgba(0,0,0,0.5)"}'>
		<el-form
			:style='{"padding":"30px","boxShadow":"none","borderRadius":"6px","alignItems":"flex-start","flexWrap":"wrap","display":"flex"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="180px"
		>
			<template >
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="电影名称" prop="dianyingmingcheng">
					<el-input v-model="ruleForm.dianyingmingcheng" placeholder="电影名称" clearable  :readonly="ro.dianyingmingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else class="input" label="电影名称" prop="dianyingmingcheng">
					<el-input v-model="ruleForm.dianyingmingcheng" placeholder="电影名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="电影类型" prop="dianyingleixing">
					<el-select :disabled="ro.dianyingleixing" v-model="ruleForm.dianyingleixing" placeholder="请选择电影类型" >
						<el-option
							v-for="(item,index) in dianyingleixingOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else class="input" label="电影类型" prop="dianyingleixing">
					<el-input v-model="ruleForm.dianyingleixing"
						placeholder="电影类型" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="upload" v-if="type!='info' && !ro.fengmian" label="封面" prop="fengmian">
					<file-upload
						tip="点击上传封面"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.fengmian?ruleForm.fengmian:''"
						@change="fengmianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="upload" v-else-if="ruleForm.fengmian" label="封面" prop="fengmian">
					<img v-if="ruleForm.fengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.fengmian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.fengmian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="导演" prop="daoyan">
					<el-input v-model="ruleForm.daoyan" placeholder="导演" clearable  :readonly="ro.daoyan"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else class="input" label="导演" prop="daoyan">
					<el-input v-model="ruleForm.daoyan" placeholder="导演" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="主演" prop="zhuyan">
					<el-input v-model="ruleForm.zhuyan" placeholder="主演" clearable  :readonly="ro.zhuyan"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else class="input" label="主演" prop="zhuyan">
					<el-input v-model="ruleForm.zhuyan" placeholder="主演" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="链接" prop="lianjie">
					<el-input v-model="ruleForm.lianjie" placeholder="链接" clearable  :readonly="ro.lianjie"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else class="input" label="链接" prop="lianjie">
					<el-input v-model="ruleForm.lianjie" placeholder="链接" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="制片地区" prop="zhipiandiqu">
					<el-input v-model="ruleForm.zhipiandiqu" placeholder="制片地区" clearable  :readonly="ro.zhipiandiqu"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else class="input" label="制片地区" prop="zhipiandiqu">
					<el-input v-model="ruleForm.zhipiandiqu" placeholder="制片地区" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="语言" prop="yuyan">
					<el-input v-model="ruleForm.yuyan" placeholder="语言" clearable  :readonly="ro.yuyan"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else class="input" label="语言" prop="yuyan">
					<el-input v-model="ruleForm.yuyan" placeholder="语言" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="date" v-if="type!='info'" label="上映时间" prop="shangyingshijian">
					<el-date-picker
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.shangyingshijian" 
						type="date"
						:readonly="ro.shangyingshijian"
						placeholder="上映时间"
					></el-date-picker> 
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' class="input" v-else-if="ruleForm.shangyingshijian" label="上映时间" prop="shangyingshijian">
					<el-input v-model="ruleForm.shangyingshijian" placeholder="上映时间" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-if="type!='info'"  label="电影介绍" prop="dianyingjieshao">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.dianyingjieshao" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"width":"49%","margin":"0 0 20px 0"}' v-else-if="ruleForm.dianyingjieshao" label="电影介绍" prop="dianyingjieshao">
                    <span :style='{"border":"1px solid rgba(0,0,0,0.3)","padding":"0 10px","boxShadow":"0 0 6px rgba(0,0,0,0.3)","borderRadius":"4px","color":"#fff","background":"rgba(0,0,0,0.4)","display":"inline-block","fontSize":"14px","lineHeight":"40px","fontWeight":"500"}' v-html="ruleForm.dianyingjieshao"></span>
                </el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}' class="btn">
				<el-button class="btn3"  v-if="type!='info'" type="success" @click="onSubmit">
					<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					提交
				</el-button>
				<el-button class="btn4" v-if="type!='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					取消
				</el-button>
				<el-button class="btn5" v-if="type=='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					返回
				</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				dianyingmingcheng : false,
				dianyingleixing : false,
				fengmian : false,
				daoyan : false,
				zhuyan : false,
				lianjie : false,
				zhipiandiqu : false,
				dianyingjieshao : false,
				yuyan : false,
				shangyingshijian : false,
				thumbsupnum : false,
				crazilynum : false,
				clicktime : false,
				clicknum : false,
				discussnum : false,
				storeupnum : false,
			},
			
			
			ruleForm: {
				dianyingmingcheng: '',
				dianyingleixing: '',
				fengmian: '',
				daoyan: '',
				zhuyan: '',
				lianjie: '',
				zhipiandiqu: '',
				dianyingjieshao: '',
				yuyan: '',
				shangyingshijian: '',
				clicktime: '',
			},
		
			dianyingleixingOptions: [],

			
			rules: {
				dianyingmingcheng: [
					{ required: true, message: '电影名称不能为空', trigger: 'blur' },
				],
				dianyingleixing: [
					{ required: true, message: '电影类型不能为空', trigger: 'blur' },
				],
				fengmian: [
				],
				daoyan: [
				],
				zhuyan: [
				],
				lianjie: [
					{ validator: validateUrl, trigger: 'blur' },
				],
				zhipiandiqu: [
				],
				dianyingjieshao: [
				],
				yuyan: [
				],
				shangyingshijian: [
				],
				thumbsupnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				crazilynum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				clicktime: [
				],
				clicknum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				discussnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				storeupnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
    components: {
    },
	created() {
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='dianyingmingcheng'){
							this.ruleForm.dianyingmingcheng = obj[o];
							this.ro.dianyingmingcheng = true;
							continue;
						}
						if(o=='dianyingleixing'){
							this.ruleForm.dianyingleixing = obj[o];
							this.ro.dianyingleixing = true;
							continue;
						}
						if(o=='fengmian'){
							this.ruleForm.fengmian = obj[o];
							this.ro.fengmian = true;
							continue;
						}
						if(o=='daoyan'){
							this.ruleForm.daoyan = obj[o];
							this.ro.daoyan = true;
							continue;
						}
						if(o=='zhuyan'){
							this.ruleForm.zhuyan = obj[o];
							this.ro.zhuyan = true;
							continue;
						}
						if(o=='lianjie'){
							this.ruleForm.lianjie = obj[o];
							this.ro.lianjie = true;
							continue;
						}
						if(o=='zhipiandiqu'){
							this.ruleForm.zhipiandiqu = obj[o];
							this.ro.zhipiandiqu = true;
							continue;
						}
						if(o=='dianyingjieshao'){
							this.ruleForm.dianyingjieshao = obj[o];
							this.ro.dianyingjieshao = true;
							continue;
						}
						if(o=='yuyan'){
							this.ruleForm.yuyan = obj[o];
							this.ro.yuyan = true;
							continue;
						}
						if(o=='shangyingshijian'){
							this.ruleForm.shangyingshijian = obj[o];
							this.ro.shangyingshijian = true;
							continue;
						}
						if(o=='thumbsupnum'){
							this.ruleForm.thumbsupnum = obj[o];
							this.ro.thumbsupnum = true;
							continue;
						}
						if(o=='crazilynum'){
							this.ruleForm.crazilynum = obj[o];
							this.ro.crazilynum = true;
							continue;
						}
						if(o=='clicktime'){
							this.ruleForm.clicktime = obj[o];
							this.ro.clicktime = true;
							continue;
						}
						if(o=='clicknum'){
							this.ruleForm.clicknum = obj[o];
							this.ro.clicknum = true;
							continue;
						}
						if(o=='discussnum'){
							this.ruleForm.discussnum = obj[o];
							this.ro.discussnum = true;
							continue;
						}
						if(o=='storeupnum'){
							this.ruleForm.storeupnum = obj[o];
							this.ro.storeupnum = true;
							continue;
						}
				}
				
















			}
			
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.$http({
				url: `option/dianyingleixing/dianyingleixing`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.dianyingleixingOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `remendianying/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.dianyingjieshao = this.ruleForm.dianyingjieshao.replace(reg,'../../../djangoty10908c/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {



	if(this.ruleForm.fengmian!=null) {
		this.ruleForm.fengmian = this.ruleForm.fengmian.replace(new RegExp(this.$base.url,"g"),"");
	}














var objcross = this.$storage.getObj('crossObj');
      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
		this.$refs["ruleForm"].validate(valid => {
			if (valid) {
				if(crossrefid && crossuserid) {
					this.ruleForm.crossuserid = crossuserid;
					this.ruleForm.crossrefid = crossrefid;
					let params = { 
						page: 1, 
						limit: 10, 
						crossuserid:this.ruleForm.crossuserid,
						crossrefid:this.ruleForm.crossrefid,
					} 
				this.$http({ 
					url: "remendianying/page", 
					method: "get", 
					params: params 
				}).then(({ 
					data 
				}) => { 
					if (data && data.code === 0) { 
						if(data.data.total>=crossoptnum) {
							this.$message.error(this.$storage.get('tips'));
							return false;
						} else {
							this.$http({
								url: `remendianying/${!this.ruleForm.id ? "save" : "update"}`,
								method: "post",
								data: this.ruleForm
							}).then(({ data }) => {
								if (data && data.code === 0) {
									this.$message({
										message: "操作成功",
										type: "success",
										duration: 1500,
										onClose: () => {
											this.parent.showFlag = true;
											this.parent.addOrUpdateFlag = false;
											this.parent.remendianyingCrossAddOrUpdateFlag = false;
											this.parent.search();
											this.parent.contentStyleChange();
										}
									});
								} else {
									this.$message.error(data.msg);
								}
							});

						}
					} else { 
				} 
			});
		} else {
			this.$http({
				url: `remendianying/${!this.ruleForm.id ? "save" : "update"}`,
				method: "post",
			   data: this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.parent.showFlag = true;
							this.parent.addOrUpdateFlag = false;
							this.parent.remendianyingCrossAddOrUpdateFlag = false;
							this.parent.search();
							this.parent.contentStyleChange();
						}
					});
				} else {
					this.$message.error(data.msg);
			   }
			});
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.remendianyingCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    fengmianUploadChange(fileUrls) {
	    this.ruleForm.fengmian = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #fff;
	  	  font-weight: 500;
	  	  width: 180px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 180px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 1px solid rgba(0,0,0,0.3);
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  	  border: 1px solid rgba(0,0,0,0.3);
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  outline: none;
	  	  color: #000;
	  	  background: #fff;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  outline: none;
	  	  background: #fff;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 120px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 120px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 120px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  outline: none;
	  	  background: #fff;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
	
	.add-update-preview .btn .btn1 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn1:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn2 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn2:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn3 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn3:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn4 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn4:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn5 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn5:hover {
				opacity: 0.8;
			}
</style>
