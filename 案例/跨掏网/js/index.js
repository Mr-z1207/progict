$(function() {
	//**************************************************************************************************
	function loadHtmlOnce($elem,callback){
		var url = $elem.data('load');
		//如果没有地址则无需加载数据
		if(!url) return;
		//判断数据如果没有被加载则发送请求
		if(!$elem.data('isLoaded')){
			$.getJSON(url,function(data){
				typeof callback == 'function' && callback($elem,data);
			})
		}
	}
	//**************************************************************************************************

	//**************************************************************************************************
	var $TopDropdown = $('.top .dropdown');
	$TopDropdown.dropdown({
		mode:'slide',
		delay:300,
		evName:''
	})
	$TopDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if (ev.type == 'dropdown-show') {
			loadHtmlOnce($(this),buildTopLayer)
		}
	})
	function buildTopLayer($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		//生成HTML
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>';
		}
		//将HTML插入到下拉层中
		//模拟网络延迟
		setTimeout(function(){
			$layer.html(html);
			//数据已经加载
			$elem.data('isLoaded',true);
		},1000);
	}
	//**************************************************************************************************

	//**************************************************************************************************
	var $search = $('.search')
	$search.search({
		// autocomplete:true,
		// url:'https://suggest.taobao.com/sug?q='
	})
	$search.on('getOk',function(ev,data) {
		var data = data.result;
		var html = createSearchLayer(data,10);
		$search.search('appendHTML',html)
		if(html == ''){
			$search.search('Layerhide');
		}else{
			$search.search('Layershow');
		}
	})
	//获取数据失败处理
	$search.on('getNoData',function(ev){
		$elem.search('appendHTML','');
		$elem.search('hideLayer');
	});

	$search.search({});
	//生成搜索下拉列表html结构并且可以控制数据条目
	function createSearchLayer(data,max){
		var html = '';
		for(var i = 0 ;i<data.length;i++){
			if(i >= max) break;
			html += '<li class="search-cont">'+data[i][0]+'</li>'
		}
		return html;
	}
	//**************************************************************************************************

	//**************************************************************************************************
	var $categoryDropdown = $('.foucrs .dropdown');
	$categoryDropdown.dropdown({
		mode:'slideRow',
		delay:300,
		evName:''
	});
	$categoryDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if (ev.type == 'dropdown-show') {
			loadHtmlOnce($(this),buildCategoryLayer);
		}
	})
	function buildCategoryLayer($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		//生成HTML
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<dl class="category-details">';
			html +=	'	<dt class="category-details-title fl">';
			html +=	'		<a href="#" class="category-details-title-link">'+data[i].title+'</a>';
			html +=	'	</dt>';
			html +=	'	<dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html +=	'<a href="#" class="link">'+data[i].items[j]+'</a>';
			}
			html +=	'	</dd>';
			html +=	'</dl>';
		}
		//将HTML插入到下拉层中
		//模拟网络延迟
		setTimeout(function(){
			$layer.html(html);
			//数据已经加载
			$elem.data('isLoaded',true);
		},1000);
	}
	//**************************************************************************************************
})