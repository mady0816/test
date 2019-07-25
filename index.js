$(function(){
	$(document).ready(function(){
		searchEffect();
		timeEffect();
		bannerEffect();
	});

	//搜索框背景渐变
	function searchEffect (){
		var banner = $(".jd_banner");
		var banHei = banner.height();
		$(window).scroll(function(){
			var scrollPos = $(window).scrollTop(); 
			var rgbaScal = scrollPos/banHei;
			if(scrollPos < banHei) {
				$(".jd_search").css({"backgroundColor":"rgba(228, 49, 48 , "+rgbaScal+")"});
			}
			else {	
			}
		})
	}

	//制作倒计时
	function timeEffect (){
		var totalTime = 5;
		var timeId = setInterval(function(){
			totalTime --;
			if(totalTime < 0) {
				clearInterval(timeId);
				return;
			}
			var hover = Math.floor(totalTime/3600);
			var minite = Math.floor(totalTime%3600/60);
			var second = Math.floor(totalTime%60);
			if(hover<10){
				$(".msTime>span:eq(0)").html("0"+hover);
			}else {
				$(".msTime>span:eq(0)").html(hover);
			}
			if(minite<10){
				$(".msTime>span:eq(2)").html("0"+minite);
			}else {
				$(".msTime>span:eq(2)").html(minite);
			}
			if(second<10){
				$(".msTime>span:eq(4)").html("0"+second);
			}else {
				$(".msTime>span:eq(4)").html(second);
			}
		}, 1000);
	}

	//制作轮播图
	function bannerEffect (){
		// 克隆图片
		var cloneFirst = $(".jd_banU li:first").clone(true);
		var cloneLast = $(".jd_banU li:last").clone(true);
		$(".jd_banU").append(cloneFirst).prepend(cloneLast);
		var index = 1

		var bannerWidth = $(".jd_banner").width();
		var lisLen = $(".jd_banU").children().length;
		//设置ul和li的宽度
		$(".jd_banU").css("width",bannerWidth * lisLen);
		$(".jd_banU li").each(function(){
			$(".jd_banU li").css("width",100/lisLen+"%");
		});
		//让ul偏移一个li的宽度
		$(".jd_banU").css("left","-100%");

		//当页面发生变化 重新计算宽度
		$(window).resize(function(){
			var bannerWidth = $(".jd_banner").width();
			var lisLen = $(".jd_banU").children().length;
			//设置ul和li的宽度
			$(".jd_banU").css("width",bannerWidth * lisLen);
			$(".jd_banU li").each(function(){
				$(".jd_banU li").css("width",100/lisLen+"%");
			});
			//让ul偏移一个li的宽度
			$(".jd_banU").css("left","-100%");
		});

		//动态生成点标记
		for (var i = 0; i < lisLen; i++) {
			var span = document.createElement('span');
			$(".dots").append(span);
			if (i === 0) {
				$(".dots span").addClass("active");
			}
	  }
    
    $(".dots span").click(function(){
      $(this).siblings().removeClass("active");
			$(this).addClass("active");
    }) 
				  
		//实现自动轮播
		var timeId;
		var automatic = function () {

			timeId = setInterval(function(){
				index ++;
				
				// 实现过度
				$(".jd_banU").animate({"left":-index * 100 +"%","transition":"left 0.5s"});

				// 因为过渡效果与判断是同时进行的，所以要延迟0.5秒，过渡完了再偏移
				setTimeout(function(){
					if(index == lisLen - 1) {
						index = 1;
						// 清除过渡
						$(".jd_banU").css({"left":-index * 100 +"%","transition":"none"});
					}
				}, 500);
			}, 2000);
		}
		automatic();
		
		//实现手动轮播
		// 手指按下
		var startX, moveX, distanceX;
		$(".jd_banU").bind("touchstart", function (e) {
			//清除自动轮播
			clearInterval(timeId);
			startX =  e.originalEvent.changedTouches[0].clientX;
		});

		//手指移动
		$(".jd_banU").bind("touchmove", function (e) {
			moveX =  e.originalEvent.changedTouches[0].clientX;
			//图片需要滚动的距离
			distanceX = moveX - startX;

		  // 让图片滚动  并且清除浮动
			$(".jd_banU").css({"left":-index * bannerWidth + distanceX + "px", "transition":"none"});		
		});

		//手指触摸结束
		$(".jd_banU").bind("touchend", function(e){
			//判断滑动距离是否超过100Px
			if(Math.abs(distanceX) > 100) {

				if(distanceX > 0) {//上一张
					index --;
					$(".jd_banU").css({"left":-index * bannerWidth + "px", "transition":"none"});

				}else if(distanceX < 0) {//下一张

					index ++;
					$(".jd_banU").css({"left":-index * bannerWidth + "px", "transition":"none"});
		
				}
			}else if (Math.abs(distanceX) > 0) {
				// 让图片滚动  并且清除浮动
				$(".jd_banU").css({"left":-index * bannerWidth + "px", "transition":"none"});	
			}

			// 重新启动自动轮播
			automatic();
		});

		$(".jd_banU").bind("webkittransitionEnd", function () {
			console.log(111);
			if(index == lisLen -1) {//最后一张
				index = 1;
				// $(".jd_banU").animate({"left":-index * bannerWidth},0);
				$(".jd_banU").css({"left":-index * bannerWidth + "px", "transition":"none"});	

			}else if (index == 0) {//第一张
				index = lisLen - 2;
				// $(".jd_banU").animate({"left":-index * bannerWidth},0);
				$(".jd_banU").css({"left":-index * bannerWidth + "px", "transition":"none"});	
			}
		});
	}
})