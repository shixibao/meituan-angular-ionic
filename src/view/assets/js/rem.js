document.documentElement.style.fontSize=document.documentElement.clientWidth/6.4+'px';
//2.在用户企图改变浏览器窗口大小的时候,动态计算rem值
window.addEventListener('resize',function(){
	document.documentElement.style.fontSize=
    document.documentElement.clientWidth/6.4+'px';
})