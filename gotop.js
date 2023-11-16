//使用JQUERY網頁載入時, 插入<IMG>標記程式, 並且先隱藏
(function ($) {
    $("body").append("<img id='goTopButton' style='display: none; z-index: 5; cursor: pointer; top:100px; right:100px; position:fixed; width:100px' title='回到頂端'/>");
    var img = "./bntop01.png",          //用以控制使用哪張圖片
        location = 0.2,               //按鈕出現在螢幕
        right = 20,                  //按鈕與螢幕距離
        opacity = 0.8,                //按鈕透明度
        speed = 1000,                 //回到TOP速度 1000=1s
        $button = $("#goTopButton"),     //選擇goTopButton件
        $body = $(document),           //選擇目前網頁
        $win = $(window);             //選擇目前游覽器chrom
    $button.attr("src", img);        //將圖片設定到goTopButton

    //撰寫目前游覽器的自訂JS函數
    window.goTopMove = function () {
        var scrollH = $body.scrollTop(),        //取得距離TOP, 75-165PX數
            winH = $win.height(),          //取得目前游覽器高度
            css = { "top": winH * location + "px", "position": "fixed", "right": right, "opacity": opacity };
        if (scrollH > 20) {
            $button.css(css);
            $button.fadeIn("slow");
        }
        else {
            $button.fadeOut("slow");
            css = { "transform": "none", "transition": "none" };
            $button.css(css);
            $button.attr("src", img);
        }
    };

    //註冊游覽器監聽兩個動作1.scroll捲動 2.游覽器大小有變化時
    $win.on({
        scroll: function () { goTopMove(); },
        resize: function () { goTopMove(); }
    });

    //設定圖片監聽三個動作監, 分別為1.滑鼠滑過去2.滑鼠滑過去3.按下動作
    $button.on({
        mouseover: function () { $button.css("opacity", 1); },
        mouseout: function () { $button.css("opacity", opacity); },
        click: function () {
            $button.attr("src", img);
            css = { "transform": "scale(50%,50%) translate(-50px,-100px)", "transition": "transform 1s ease 0s" };
            $button.css(css);
            $("html,body").animate({ scrollTop: 0 }, speed);
        }
    });

})(jQuery);