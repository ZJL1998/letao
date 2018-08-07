// // 开启进度条
// NProgress.start();

// // 关闭进度条
// setTimeout(function(){
//   NProgress.done();
// },1000)




// ajax全局事件
// 1 ajaxComplete() 每个ajax请求完成时调用 （不管成功还是失败 都会调用）
// 2 ajaxError() 每个ajax发送失败时 调用
// 3 ajaxSend() 每个ajax发送前调用
// 4 ajaxStart() 页面中第一个ajax请求被发送时调用
// 5 ajaxStop() 全部ajax请求完成时 调用
// 6 ajaxSuccess() 每个ajax成功时调用

// 在发送第一个ajax请求时 开启进度条 
// 在最后一个ajax请求回来时 关闭进度条

$(document).ajaxStart(function(){
  // 开启进度条
  NProgress.start();
})

$(document).ajaxStop(function(){
  // 关闭进度条
  NProgress.done();
})