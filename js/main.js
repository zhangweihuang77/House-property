$(function(){
	main.loaded();
})

var main = {
	start: function() {
		this.ewmResize();
		this.floats();
		this.index();
	},
	loaded: function() {
		document.onreadystatechange = subSomething; //当页面加载状态改变的时候执行这个方法.
		var self = this;
		function subSomething() {
			if (document.readyState == "complete") {
				self.start();
			}
		}
	},
	floats: function() {
		var name = $('.ewm');
		function scrollAd() {
			//定义位移为floatdiv的高度加上滚动条的顶部距离
			var offset = $(name).height() + $(document).scrollTop();
			//为floatdiv添加动画为TOP位移offset的高度，持续0.8秒。
			$(name).stop().animate({
				top: offset - 400,
			}, 800);
		}
		$(window).scroll(scrollAd);
	},
	ewmResize:function(){
		var ewmResize = $(".ewmResize");
		var Width = $(window).width();
		var content = "";
		content += "<div class='ewm ewm-lf'>";
		content += "<img src='img/ewm-left.png' height='484' width='160'/>";
		content += "</div>";
		content += '<div class="ewm ewm-rt">';
		content += '<img src="img/ewm-right.png" height="484" width="155">';
		content += '<ul>';
		content += '<li><input class="name" type="text" maxlength="11" placeholder="姓名"/></li>';
		content += '<li><input class="tel" type="text" maxlength="11" placeholder="电话"/></li>';
		content += '<li><button>预约报名</button></li>';
		content += '</ul>';
		content +='</div>';
		if(Width > 768){
			ewmResize.html(content);
		}
	},
	index:function(){
		var mask = $(".mask");
		var pc_btn = $(".ewm button");
		pc_btn.click(function(){
			var pc_name = $(".ewm .name").val();
			var pc_tel = $(".ewm .tel").val();
			$.post('bin/save.php', {"name":pc_name,"phone":pc_tel,"type":"PC"}, function(data, textStatus, xhr) {
				if(data.hycode == 0){
					mask.css("display","block");
					$(".box-correct").css("display","block");
				}else{
					// alert(data.msg);
					$(".box-error em").html(data.msg);
					mask.css("display","block");
					$(".box-error").css("display","block");
				}
			},"json");
		})


		var app_btn = $(".sign-right span");
		app_btn.click(function(){
			var app_name = $(".sign-left .name").val();
			var app_tel = $(".sign-left .tel").val();
			$.post('bin/save.php', {"name":app_name,"phone":app_tel,"type":"APP"}, function(data, textStatus, xhr) {
				if(data.hycode == 0){
					mask.css("display","block");
					$(".box-correct").css("display","block");
				}else{
					$(".box-error em").html(data.msg);
					mask.css("display","block");
					$(".box-error").css("display","block")
				}
			},"json");
		})
	}
}