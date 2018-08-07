$(function () {
  /* 
    1.进行 表单校验
  
  
  */

  // 校验插件初始化
  $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },


    // 配置字段 (不要忘记给input加name)
    fields: {
      // 用户名
      username: {

        // 校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 配置提示信息
            message: "用户名不能为空！"
          },
          //长度校验
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须是2-6位！"
          },
          callback:{
            message:"用户名不存在",
          }
        }
      },

      // 用户名
      password: {

        // 校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 配置提示信息
            message: "密码不能为空！"
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6-12位！"
          },
          callback:{
            message:"密码错误",
          }
        }
      }
    }
  })


  /*   
  
    2. 实现登录功能  
  
    submit 按钮 默认点击事 会进行提交表单 插件会在表单提交时进行校验
    
    如果校验成功了 页面会跳转 我们需要阻止这次跳转 通过ajax提交请求
    如果校验失败 在事件中阻止默认行为 通过ajax进行提交请求
    
    */

    $('#form').on("success.form.bv",function(e){
      e.preventDefault();

      // 通过ajax进行提交请求
      $.ajax({
        type:"post",
        url:'/employee/employeeLogin',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
          // 处理响应
          if (info.success) {
            // 跳转到首页
            location.href = 'index.html';
          }

          if (info.error === 1000) {
            // alert('用户名不存在');
            // 如果用户名不存在 需要将表单校验状态置成校验失败状态 并提示用户
            // 插件方法 updateStatus()
            // 参数1 字段名称
            // 参数2 校验状态 VALID成功的 INVALID 失败的 NOT_VALIDTED未校验的
            // 参数3 指定校验规则 可以设置提示信息
            $('#form').data('bootstrapValidator').updateStatus("username","INVALID","callback");
     
          }

          if (info.error === 1001) {
            // alert('密码错误');
            $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback");
          }
        }
      })

    })


    /*
      3. 解决重置按钮的bug

    */ 

    $('[type="reset"]').click(function(){
      // 需要调用插件方法 进行重置表单校验状态
      // 不传true 只重置 校验状态 传true 文本内容 和校验状态都进行重置
      $('#form').data("bootstrapValidator").resetForm();
    })
})