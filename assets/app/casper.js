(function ($) {
  var loadFiles = {
    js: [],
    css: []
  };

  /**
   * 动态加载JS文件的方法
   * Load javascript file method
   *
   * @param {String}   fileName              JS文件名
   * @param {Function} [callback=function()] 加载成功后执行的回调函数
   * @param {String}   [into='head']         嵌入页面的位置
   */
  function loadScript(fileName, callback, into) {
    into = into || 'body';
    callback = callback || function () {
    };
    var script = null;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = fileName;
    script.onload = function () {
      loadFiles.js.push(fileName);
      callback();
    };
    if (into === 'head') {
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  }

  /**
   * 动态加载CSS文件的方法
   * Load css file method
   *
   * @param {String}   fileName              CSS文件名
   * @param {Function} [callback=function()] 加载成功后执行的回调函数
   * @param {String}   [into='head']         嵌入页面的位置
   */
  function loadCSS(fileName, callback, into) {
    into = into || 'head';
    callback = callback || function () {
    };

    var css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.onload = css.onreadystatechange = function () {
      loadFiles.css.push(fileName);
      callback();
    };
    css.href = fileName;
    if (into === 'head') {
      document.getElementsByTagName('head')[0].appendChild(css);
    } else {
      document.body.appendChild(css);
    }
  }

  $(document).ready(function () {
    //百度推送
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var bdPush = document.getElementsByTagName('script')[0];
    bdPush.parentNode.insertBefore(bp, bdPush);

    //百度统计
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?37d3bf3116f041cb10bd1d890e65bcfc';
    var bdhmt = document.getElementsByTagName('script')[0];
    bdhmt.parentNode.insertBefore(hm, bdhmt);

    //valine评论支持
    loadScript('//cdn.jsdelivr.net/npm/leancloud-storage/dist/av-min.js', function () {
      loadScript(
        'https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js',
        function () {
          if (document.getElementById('vcomments') !== null) {
            new Valine({
              el: '#vcomments',
              appId: 'rEDT0uBB2LEdndoJ4od2SlKf-gzGzoHsz',
              appKey: 'lmX57j7hrYGCHROA72tBUIXq',
              notify: true,
              verify: true,
              avatar: 'mm',
              visitor: true, // 文章访问量统计
              highlight: true, // 代码高亮
              recordIP: true, // 是否记录评论者IP
              placeholder: '请您理智发言，共建美好社会！'
            });
          }
        }
      );
    });

    // 配置搜索
    loadScript('//cdn.jsdelivr.net/npm/@tryghost/content-api/umd/content-api.min.js', function () {
      loadScript('//cdn.jsdelivr.net/npm/ghost-search/dist/ghost-search.min.js', function () {
        var ghostSearch = new GhostSearch({
          // key: '1c8b902ac09889962117d082e6',
          // host: 'http://localhost:2368'
          key: '99efee9603c92e5cd04501f069',
          host: 'https://iiong.com'
        });
        // 搜索事件执行
        $('#ghost-search-field').focus(function () {
          $('#ghost-search-results').fadeIn(500);
          $('.search-cover').fadeIn(500);
          $('html').css('overflow-y', 'hidden')
        }).blur(function () {
          $('#ghost-search-results').fadeOut(500);
          $('.search-cover').fadeOut(500);
          $('html').css('overflow-y', 'scroll')
        });
      });
    });

    // 监听点击链接时间，非本站链接进行新标签打开
    $(document).on("click", 'a', function (event) {
      var link = event.target.href; // 完整链接
      var host = event.target.hostname;
      if (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(link)) {
        if (host !== window.location.hostname) {
          event.preventDefault();
          window.open(event.target.href)
        }
      }
    });

    // Google 广告配置
    loadScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', function () {
      (adsbygoogle = window.adsbygoogle || []).push({});
      console.log('Google广告加载完毕。嘤嘤嘤，别把本站广告屏蔽了哟！');
      if (adsbygoogle.loaded || window.adsbygoogle.loaded) {
        // 当谷歌广告没有被屏蔽的时候 - 删除提示语
        $('.shielding-ads-tips').remove();
      }
    });
  });
})(jQuery);

window.onload = function () {
  console.log('已经动态加载资源：', loadFiles);
};
