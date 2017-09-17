/**
 * Created by cherry on 2017/7/20.
 */
//360站长平台
(function(){
    var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?940223423bbed5ceb474bec1058bc6fb":"https://jspassport.ssl.qhimg.com/11.0.1.js?940223423bbed5ceb474bec1058bc6fb";
    document.write('<script src="' + src + '" id="sozz"><\/script>');
})();

//百度站长
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https'){
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else{
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();