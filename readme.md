# Infra project used to be a base for application



## 为什么infra-client

### 我们的问题
软件的核心价值在于它可以帮助人们解决现实的问题。对于应用软件而言，它主要的价值在于满足业务须求。
换而言之作为一个应用开发者我们就是要写一些应用相关的代码来创造价值，这也是应用开发者最终的目标。
但是如果你是一个程序员，有一定的工作经验你就会发现现实不是我们所想象的好你简单和容易。至今没有一门语言或者是框架可以直接运行业务代码不须要一行非业务相关的
代码。这样的一门语言或框架是众多有志程序员的一个梦想。为了这一梦想所以出现的众多高级语言和框架从一定程度上部分解决这一问题。


### 特定问题的解决方案
如web中间件让web开发者从痛苦的通传信层解放了出来，一个web应用一定依赖客户端和服务端的通信，但是我们只须要用现成的web中间件，我们就不用写任何一行通信的代码。再如*DBC, 让我们
不用关心怎么连到数据库。再如JMS让我们不用关心怎么把一个消息发到其它地方。有很多的“再如”已经存在在的这个软件世界，并且会越来越多。


### infra-client 一切为了轻
infra-client 也是一个解决方案。既然是一个解决方案，一定也它要解决的问题，infra-client要解决是轻应用中“重”的问题。
历史总是在循环中前进。随着web的发展，为了高响应和更好的客户体验，时间宝贵的用户们不愿意看着整个页面的提交而无所事事的等待，用户想要在提交东西的时候
还可以看看页面的其它内容或做其它的操作。作为网站的作者也不希望为了页面的一小部分的更新而内刷新整个页面，因为这种不合理对于追求完美的程序员们也是不可
接受的。为了这些种种原因客户端又从“瘦”走向了“胖”。infra-client希望这样的客户端“胖”而不“重”。



## 什么是infra-client

infra-client 是一个前端的集成开发流程和MVC框架的平台。在项目管理上你可以忽略复杂的开发环境搭建，包管理，项目构建，优化，部署，测试。
开发上你可以更好的分离前端的代码，省略复杂的DOM刷新代码，后台通信代码。

infra-client 框架在web系统中的位置（浅蓝色部分）：

![InfraSketch][InfraSketch]

### infra-client组成


#### web 服务器
集成开箱可用的NodeJS Web服务器。Web开发者不用再下载，安装，配置其它的服务器。

#### 依赖包管理器
开发中所依赖的第三方的JS，CSS等全部交由集成的Bower管理。开发人员不用再去各个网站上搜索下载第三方的库。只须要给出库的名称和版本号，平台会自动帮你把相关的所有文件和他所依赖的其它的库一同下载到本地。

依赖的包被指定在bower.json里：

	{
	  "name": "gng-client",
	  "version": "0.1.0",
	  "dependencies": {
	    "infra-client": "*"
	  },
	  "devDependencies": {},
	  "resolutions": {
	    "angular": "1.2.14",
	    "angular-animate": "1.2.14",
	    "jquery-ui": "~1.10.3",
	    "animate.css": "~3.1.0",
	    "outlayer": ">=1.1.2 <2.0",
	    "jquery": "~2.1.0"
	  }
	}

所有相关的库自动下载：

![BowerPKG][BowerPKG]


#### 项目优化器
优化包括以下几方面：

* 多个JS、CSS合并成一个JS、CSS。从而减少不必要的请求数。
* JS、CSS、图片、SVG、HTML压缩，以减少文件大小。
* 自动加入浏览器特定的CSS属性，以提高应用的浏览器兼容性。
* 自动引入浏览器新特性的Polyfill。
* 对变化的文件进行重命名以防止缓存掩盖更新


初始HTML片段:

	<!DOCTYPE html>
	<html class="no-js" ng-controller="GPlatformCtrl">
	<head>
		<script src="http://192.168.2.5:8085/target/target-script-min.js"></script>
	    <meta charset="UTF-8">
	    <meta http-equiv="Cache-Control" content="no-cache">
	    <meta http-equiv="Pragma" content="no-cache" />
	    <meta http-equiv="Expires" content="-1">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <title>Give & Gain</title>
	
		<!-- build:js({app,.tmp}) scripts/require.js -->
	    <script type="text/javascript" src="bower_components/requirejs/require.js"></script>
	    <script type="text/javascript" src="bower_components/infra-client/app/scripts/requirejs.config.js"></script>
	    <script type="text/javascript" src="scripts/requirejs.config.js"></script>
		<!-- endbuild -->
	
	
		<!-- Refer to Output of Requirejs Build/Optimize Flow (Go through requirejs optimize flow, NO need to go through webapp-generator build flow) -->
	    <script type="text/javascript" src="requirejs.optimized.js"></script>
	    <link type="text/css" href="requirejs.optimized.css" rel="stylesheet">
	
	    <!-- build:js scripts/main.js -->
	    <script type="text/javascript" src="angular_comp/GPlatform/GPlatformApp.js"></script>
	    <script type="text/javascript" src="angular_comp/GPlatform/GPlatformCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/Menu/MenuCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/Home/HomeCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/Showcase/ShowcaseCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/ItemDetails/ItemDetailsCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/Account/AccountCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/AccountInfo/AccountInfoCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/LoginForm/LoginFormCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/AddItem/AddItemCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/Uploader/UploaderCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/RegisterForm/RegisterFormCtrl.js"></script>
	    <script type="text/javascript" src="angular_comp/Setting/SettingCtrl.js"></script>
	    <!-- endbuild -->
	
	</head>
	<body class="g-bs2-bg">
	<div ng-include="'angular_comp/Menu/Menu.html'"></div>
	<div class="views" ng-view></div>
	</body>
	</html>


优化后的HTML片段:

	<!DOCTYPE html>
	<html class=no-js ng-controller=GPlatformCtrl>
	<head>
	<script src=http://192.168.2.5:8085/target/target-script-min.js></script>
	<meta charset=UTF-8>
	<meta http-equiv=Cache-Control content=no-cache>
	<meta http-equiv=Pragma content=no-cache>
	<meta http-equiv=Expires content=-1>
	<meta name=viewport content="width=device-width, initial-scale=1.0">
	<meta http-equiv=X-UA-Compatible content="IE=edge">
	<title>Give & Gain</title>
	<script src=scripts/c6de1ee4.require.js></script>
	<!-- Refer to Output of Requirejs Build/Optimize Flow (Go through requirejs optimize flow, NO need to go through webapp-generator build flow) -->
	<script type=text/javascript src=d487e284.requirejs.optimized.js></script>
	<link type=text/css href=9a7a4aa7.requirejs.optimized.css rel=stylesheet>
	<script src=scripts/079ae320.main.js></script>
	<body class=g-bs2-bg>
		<div ng-include="'angular_comp/Menu/Menu.html'"></div>
		<div class=views ng-view=""></div>

优化后的HTML外部资源引用为原始的1/4 (下面的例子：18 vs 4)。
在这个例子当中仔细的人会发现优化过后的JS和CSS文件名变成了 `${hash} + name`， 正是这一优化引入了Cache Bust。





初始JS片段:

	'use strict';
	function AccountInfoCtrl($scope, $http) {
	
		$scope.logout = function() {
			require(['infra-client/app/scripts/models/server'], function(server){
				var promise = server.logout();
	
				promise.then(function(data) {
					$scope.$apply();
				});
			});
	
		};
	}
	AccountInfoCtrl.$inject = [ '$scope', '$http' ];

优化后的JS片段:

	function AccountInfoCtrl(a){a.logout=function(){require(["infra-client/app/scripts/models/server"],function(b){var c=b.logout();c.then(function(){a.$apply()})})}}

优化后的JS大小为原始的一半 (下面的例子：345 bytes vs  162 bytes)
CSS和JS类似乎，在此不再举例。

#### 部署测试器
自动部署修改的文件到服务器并刷新页面（你不用担心你的F5不是钛合金的了）。

修改文件前：

![DeployBeforeChangeC][DeployBeforeChangeC]
![DeployBeforeChangeB][DeployBeforeChangeB]



修改文件并保存：

![DeployAfterChangeC][DeployAfterChangeC]
![DeployAfterChangeB][DeployAfterChangeB]


#### 依赖包注入器
一些复杂的库，包含了多个JS、CSS，传统的做法是去加入多个标签来分别引入这些文件。使用包注入器，开发人员只要指定库名，相关的JS，CSS将会在第一次使用的时候全部加载进来。
同时你不用担心标签的顺序问题，被依赖的包会自动被先注入。

须要引入Bootstrap只要一行代码：
	
	require(['bootstrap/dist/js/bootstrap'], function () { /* any code  here */});
	

Bootstrap 依赖的 JQuery，CSS，JS被依次注入：

	<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery" src="bower_components/jquery/dist/jquery.js"></script>
	<link type="text/css" rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
	<link type="text/css" rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.css">
	<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="bootstrap/dist/js/bootstrap" src="bower_components/bootstrap/dist/js/bootstrap.js"></script>

#### MVC框架
MVC，我们可以将前端的代码象后台一样作分层处理，提高代码的可重用性。

#### 模板引擎
在这个框架里，AngularJS的模板引擎被引入以实现模板和数据的合成，从而将显示层的渲染全部放到前端。开发人员不用为了更新页面而写大量的代码去操作DOM。
使用模型和模板的绑定，模型的更新可以促发即时的DOM更新。
这些为SPA（单页面应用）提供了必要的前提。

模板：

	<div ng-controller="AccountInfoCtrl" class="container">
		<div class="jumbotron">
			Welcome {{server.getSession().inspect().value.user.name}}! 
		</div>
	</div>

模型：

	function AccountInfoCtrl($scope) {
		require(['infra-client/app/scripts/models/server'], function(server) {
			server.config.serverURL = 'http://localhost:8080/gng-server-1.0';
			//server.config.serverURL = 'http://192.168.2.5:8080/gng-server-1.0';
			//server.config.serverURL = 'http://server.gplatform.net/gng-server-1.0';
	
	        //User server in template directly
	        $scope.server = server;
		});
	}

结果：

	<div ng-controller="AccountInfoCtrl" class="container">
		<div class="jumbotron">
			Welcome Shark! 
		</div>
	</div>


#### 数据通信API
以往为了和后台交互数据，开发人员要写大量的ajax请求和大量的回调函数。现在使用数据通信API，开发人员不用写代码去发送请求，直接修改对象的属性，最后调用 API:saveChanges()。数据自动同步到后台。



## 使用infra-client

### 必要软件：

* NodeJS
* Git


### 软件配置(命令)：

	#This will install Grunt and Bower automatically	
	npm install yo -g
	npm install generator-webapp -g
	
	
### 引入client-infra:

1. 修改 `bower.json`  在dependencies里加入 `"infra-client": "*"`
2. 运行： `bower install`


### 使用数据通信API:

	require(['infra-client/app/scripts/models/server'], function (server) { /* use server to query & store data */});
	
查询数据的代码：

	server.getDb().then(function (instance) {
		var itemPromise = instance.Items.take(50).toArray();
	});


发送数据的代码：

	server.getDb().then(function (instance) {
		instance.Items.add({Id:1, Name:'Test'});
		var deferred = instance.Items.saveChanges();
	});
	
	
### 注入第三方库:

	require(['xxxxxxxxxx'], function () { /* any code  here */});
	
将	`xxxxxxxxxx`替换成库名，你可以在文件：`infra-client/app/scripts/requirejs.config.js` 里查看支持的库。
当然你也可以调用 `require.config()` 注册你自己的库。详细的使用请参考 [RequireJS]


### 模板语法和MVC的使用:

模板和MVC在client-infra里没有任何十月封装，请真接参考[AngularJS]


### 部署并起动服务器(命令):

	grunt serve


### 构建(命令):

	grunt dist


### 示例项目：

网站：[GPlatform]

代码：[GnGClient]

[InfraSketch]: readme/InfraSketch.png
[BowerPKG]: readme/BowerPKG.png
[DeployBeforeChangeB]: readme/DeployBeforeChangeB.png
[DeployBeforeChangeC]: readme/DeployBeforeChangeC.png
[DeployAfterChangeB]: readme/DeployAfterChangeB.png
[DeployAfterChangeC]: readme/DeployAfterChangeC.png
[RequireJS]: http://requirejs.org
[AngularJS]: http://angularjs.org
[GPlatform]: http://www.gplatform.net
[GnGClient]: https://github.com/xfcjscn/gng-client