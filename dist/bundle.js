/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/***
	业务层：控制器
	*/

	var app = angular.module('app',['ngRoute','ionic'])


		//实现路由切换
	app.config(function($routeProvider) {
		//1.通过路由对象$routeProvider实现配置
		$routeProvider.when('/', {
				templateUrl: './view/template/_index.html',
				controller: 'home'
			})
			.when('/near', {
				templateUrl: './view/template/_near.html'
			})
			.when('/my', {
				templateUrl: './view/template/_my.html'
			}).when('/detail/:id', {
				templateUrl: './view/template/_detail.html',
				controller:'detail'
			}).when('/pay',{
				templateUrl:'./view/template/_pay.html',
				controller:'pay'
			}).when('/search',{
				templateUrl:'./view/template/_search.html',
				controller:'search'

			})
	}).controller('home', function($scope, $http,$timeout) {
		$scope.banner = ['http://p0.meituan.net/460.280/deal/4347a11ca551f8eb12dfe8f22d550872181989.jpg@PC',
			'http://p0.meituan.net/460.280/deal/89903f3284d09270ff8e58b5fec72c5b46401.jpg@PC_108_0_494_300a%7C388h_640w_2e_90Q',
			'http://p0.meituan.net/460.280/deal/03655cac8f99bf98faed2c7ad00f132447145.jpg@PC'];
		$timeout(function(){
			var swiper = new Swiper('.swiper-container',{
			autoplay:1000
		});
		},0);
		

		$http.get('http://127.0.0.1:3000/list?pageIndex=1&pageSize=3').success(function(res){
				console.log(res)
				$scope.items = res;
		});
		var pagesize=3,count=0;
		$scope.hasdata = true;
		$scope.doRefresh = function() {
			
			pagesize+=3;
			var _service = 'http://127.0.0.1:3000/list?pageIndex=1&pageSize='+pagesize;
			$http.get(_service) //注意改为自己本站的地址，不然会有跨域问题
			.success(function(res) {
				console.log(res)
				$scope.items = res;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
		$scope.loadmore = function(){
			pagesize+=3;
			var _service = 'http://127.0.0.1:3000/list?pageIndex=1&pageSize='+pagesize;
			$http.get(_service) //注意改为自己本站的地址，不然会有跨域问题
			.success(function(res) {
				console.log(res)
				if(res.length == count){
					$scope.hasdata = false;
				}
				$scope.items = res;
				count = res.length;
			})
			.finally(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
		
		
	}).controller('detail',function($scope,$http,$routeParams){
		//$routeParams是angularjs router自带的服务，作用获取不同路由之间传递
		console.log("afsfasdfasf")
		var s = $routeParams.id;
		console.log(s)
		var service = 'http://127.0.0.1:3000/detail?id='+s;
		$http.get(service).success(function(res){
			console.log(res)
			$scope.result = res;
			//
			$scope.getLocation = function(event){
				var _loc = event.target.getAttribute('title');
				console.log(res);
				$scope.isOpenMap = true;
				
				var map = new AMap.Map("container", {
				    resizeEnable: true,
				    center: [116.397428, 39.90923],//地图中心点
				    zoom: 13 //地图显示的缩放级别
				});
				//步行导航
				var walking = new AMap.Walking({
				    map: map,
				    panel: "panel"
				}); 
				walking.search([
				    {keyword: '北京市昌平区沙阳路18号'},
				    {keyword: _loc}
				]);
	        
				
			}
			$scope.closeMap = function(){
				$scope.isOpenMap = false;
			}
		})
		
	}).controller('search',function($scope,$http){
		
		$scope.change = function(){
				var _url = 'http://127.0.0.1:3000/search?selectId='+$scope.selectId;
				$http.get(_url).success(function(res){
					$scope.items = res;
			})
		}

	})



	app.directive('ngFocus',function(){
		return {
			restrict:'A',
			replace:true,
			link:function(scope,ele,attrs){
				if(attrs.ngFocus == 'true'){
					ele[0].focus();
				}
			}
		}
	})

/***/ }
/******/ ]);