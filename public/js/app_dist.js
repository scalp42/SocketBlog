(function(a){function e(a){var b=Array.prototype.slice.call(arguments,1);return a.replace(/%s/g,function(){return b.shift().toString()||"%s"})}function c(a){return e("(%s)(%s)",function(a){self.onmessage=function(b){self.postMessage({control:b.data.control,resp:a.apply(a,b.data.args)})}},a)}var b=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder,d=a.URL||a.webkitURL,i={assign:function(a){var c;c=new b;c.append(a);a=c.getBlob();return d.createObjectURL(a)},revoke:d.revokeObjectURL},g=function(a){var b=
g.Worker(a),c={},d=0;return function(){var a=Array.prototype.slice.call(arguments,0);c[d]=a.pop();b.onmessage=function(a){c[a.data.control](a.data.resp)};b.postMessage({control:d,args:a});d++}};g.Worker=function(b){var b="function"===typeof b?c(b):b.toString(),b=i.assign(b),d=new a.Worker(b);i.revoke(b);d.on=d.addEventListener;return d};a.wob=g;a.wobtest&&(a.urlref=i,a.format=e,a.wrap=c)})(this);
(function(a){var e=a.event,c,b={_:0},d=0,i,g;c=e.special.throttledresize={setup:function(){a(this).on("resize",c.handler)},teardown:function(){a(this).off("resize",c.handler)},handler:function(n,j){var o=this,r=arguments;i=!0;g||(a(b).animate(b,{duration:Infinity,step:function(){d++;if(d>c.threshold&&i||j)n.type="throttledresize",e.dispatch.apply(o,r),i=!1,d=0;9<d&&(a(b).stop(),g=!1,d=0)}}),g=!0)},threshold:0}})(jQuery);
(function(){for(var a=0,e=["ms","moz","webkit","o"],c=0;c<e.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[e[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[c]+"CancelAnimationFrame"]||window[e[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),e=Math.max(0,16-(c-a)),g=window.setTimeout(function(){b(c+e)},e);a=c+e;return g});window.cancelAnimationFrame||(window.cancelAnimationFrame=
function(a){clearTimeout(a)})})();
(function(a){function e(c,b){var d;function e(b){d=t?b.pageX:b.pageY;b=parseInt(h.obj.css(p));o="auto"==b?0:b;a(document).bind("mousemove",j);document.ontouchmove=function(b){a(document).unbind("mousemove");j(b.touches[0])};a(document).bind("mouseup",n);h.obj.bind("mouseup",n);h.obj[0].ontouchend=document.ontouchend=function(b){a(document).unbind("mouseup");h.obj.unbind("mouseup");n(b.touches[0])};return!1}function g(c){if(!(1<=f.ratio)&&(c=c||window.event,!(0===c.wheelDeltaY||1===c.axis))){k-=(c.wheelDelta?
c.wheelDelta/120:-c.detail/3)*b.wheel;k=Math.min(f[b.axis]-l[b.axis],Math.max(0,k));h.obj.css(p,k/q);f.obj.css(p,-k);c=a.event.fix(c);c.preventDefault();var e=-1*f.obj.position().top,d=e+v;_.each(w,function(a){var b=a.offsetTop;b+200<e?a.classList.add("past"):b>d?a.classList.add("future"):(a.classList.remove("past"),a.classList.remove("future"))})}}function n(){a(document).unbind("mousemove",j);a(document).unbind("mouseup",n);h.obj.unbind("mouseup",n);document.ontouchmove=h.obj[0].ontouchend=document.ontouchend=
null;return!1}function j(a){if(!(1<=f.ratio)){r=Math.min(m[b.axis]-h[b.axis],Math.max(0,o+((t?a.pageX:a.pageY)-d)));k=r*q;f.obj.css(p,-k);h.obj.css(p,r);var c=-1*f.obj.position().top,e=c+v;_.each(w,function(a){var b=a.offsetTop;b+40<c?a.classList.add("past"):b>e?a.classList.add("future"):(a.classList.remove("past"),a.classList.remove("future"))})}return!1}var o,r,q,s,l={obj:a(".viewport",c)},f={obj:a(".overview",c)};s=a(".scrollbar",c);q=void 0;var m={obj:a(".track",s)},h={obj:a(".thumb",s)},t="x"==
b.axis,p=t?"left":"top",u=t?"Width":"Height",k;r=o=0;d=void 0;var w=[],v=0;this.update=function(a){l[b.axis]=l.obj[0]["offset"+u];f[b.axis]=f.obj[0]["scroll"+u];f.ratio=l[b.axis]/f[b.axis];s.toggleClass("disable",1<=f.ratio);m[b.axis]="auto"==b.size?l[b.axis]:b.size;h[b.axis]=Math.min(m[b.axis],Math.max(0,"auto"==b.sizethumb?m[b.axis]*f.ratio:b.sizethumb));q="auto"==b.sizethumb?f[b.axis]/m[b.axis]:(f[b.axis]-l[b.axis])/(m[b.axis]-h[b.axis]);k="relative"==a&&1>=f.ratio?Math.min(f[b.axis]-l[b.axis],
Math.max(0,k)):0;k="bottom"==a&&1>=f.ratio?f[b.axis]-l[b.axis]:isNaN(parseInt(a))?k:parseInt(a);w=f.obj.children("ul").children("li");v=l.obj.height();h.obj.css(p,k/q);f.obj.css(p,-k);d=h.obj.offset()[p];a=u.toLowerCase();s.css(a,m[b.axis]);m.obj.css(a,m[b.axis]);h.obj.css(a,h[b.axis])};this.update();(function(){h.obj.bind("mousedown",e);h.obj[0].ontouchstart=function(a){a.preventDefault();h.obj.unbind("mousedown");e(a.touches[0]);return!1};m.obj.bind("mouseup",j);b.scroll&&this.addEventListener?
(c[0].addEventListener("DOMMouseScroll",g,!1),c[0].addEventListener("mousewheel",g,!1)):b.scroll&&(c[0].onmousewheel=g)})();return this}a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:!0,size:"auto",sizethumb:"auto"}};a.fn.tinyscrollbar=function(c){c=a.extend({},a.tiny.scrollbar.options,c);this.each(function(){a(this).data("tsb",new e(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)}})(jQuery);
(function(a){var e={};a.subscribe=function(c,b,d){var i,g={},d=d||{};if("string"!==a.type(c)||!a.isFunction(b))return null;i=c.split(" ");a.each(i,function(a,c){if(""===c||g[c])return!0;g[c]=!0;e[c]||(e[c]=[]);e[c].push([b,d])});return{topics:c,callback:b}};a.unsubscribe=function(c,b){var d,i={};if(!c||"string"!==a.type(c)&&(!c.topics||"string"!==a.type(c.topics)))return a;c.topics&&(b=b||c.callback,c=c.topics);d=c.split(" ");a.each(d,function(c,d){var j=e[d];if(""===d||!j||i[d])return!0;i[d]=!0;
!b||!a.isFunction(b)?delete e[d]:a.each(j,function(a,c){if(c[0]===b)return j.splice(a,1),!1})});return a};a.publish=function(c,b){if(!c||"string"!==a.type(c))return a;var d=c.split(" ");a.each(d,function(c,d){if(""===d)return!0;e[d]&&a.each(e[d],function(a,c){c[0].call(c[1],d,b)})});return a}})(jQuery);
function linkify(a){return a.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,"<a href='$1' target='_blank'>$1</a>").replace(/([@])([A-Z0-9_]+)/ig,"<a href='http://twitter.com/$2' target='_blank'>$1$2</a>").replace(/\#([A-Z0-9_]+)/ig,"<a href='http://twitter.com/#!/search/%23$1' target='_blank'>#$1</a>")}Function.prototype.delay=function(a){setTimeout(this,1E3*a)};
head.ready(function(){function a(){var a=r.width()-g.width();600>a&&(a=600);j.css({width:a+"px"});j.tinyscrollbar_update("relative");a=_(i).reduce(function(a,b){return a+$(b).width()},1);b.css({width:a+"px"})}function e(){c({})}function c(a){var b={_id:!1,title:"Title",date:new Date,tags:["tags"],body:"HTML goes here",subtitle:"Subtitle"};_.extend(b,a);var c=$(t({post:b,admin:l}));d.append(c);c.on("click",".cancel",function(){c.fadeOut(200,c.remove)}).on("click",".submit",function(){b.title=c.find("#title").first().val();
b.subtitle=c.find("#subtitle").first().val();b.tags=c.find("#tags").first().val().replace(" ","").split(",");b.body=c.find("#body").first().val();now.editPosts(b);c.fadeOut(200,c.remove)}).fadeIn().tinyscrollbar({axis:"y",sizethumb:80})}var b=$(".content").first(),d=$("body").first(),i=$(".column"),g=$(".blog").first(),n=$(".lifestream").first(),j=$(".article").first(),o={},r=$(window),q,s,l=!1;$(".flip");var f=_.template("<li class='hidden'><% if(admin) { %><div class='admin-list'><i class='icon-remove'></i><i class='icon-edit'></i></div><% } %><date><% print((post.date.getMonth() + 1)+'/'+post.date.getDate()+'/'+post.date.getFullYear()) %></date><h3><a href='/blag/<%= post._id %>'><%= post.title %></a></h3><p><i><% ((post.subtitle && post.subtitle+'' !== 'undefined') ? print(post.subtitle) : print('')) %></i></p></li>"),
m=_.template("<li class='hidden'><p><date><% print((post.date.getMonth() + 1)+'/'+post.date.getDate()+'/'+post.date.getFullYear()) %></date><i><% print(post.html) %></i></p></li>"),h=_.template("<div class='_article'><date><% print((post.date.getMonth() + 1)+'/'+post.date.getDate()+'/'+post.date.getFullYear()) %></date><h1><% print(post.title) %></h1><h3><% if(post.subtitle && post.subtitle !== 'undefined') print(post.subtitle) %></h3><div><% print(post.body) %></div><div class='hr comment'></div></div>"),
t=_.template("<div class='modal'><p><label>Title</label><input type='text' id='title' value='<% print(post.title) %>'></p><p><label>Subtitle</label><input type='text' id='subtitle' value='<% print(post.subtitle) %>'></p><p><label>Tags</label><input type='text' id='tags' value='<% print(post.tags.join(', ')) %>'></p><p><label>HTML</label><textarea id='body'><% print(post.body) %></textarea></p><div class='align-right'><a class='btn cancel' href='#'><i class='icon-remove'></i> Cancel</a> <a class='btn submit' href='#'><i class='icon-upload'></i> Submit</a></div></div>"),
p=new MM.StamenTileLayer("watercolor");(new MM.Map("map",p,null,null)).setCenterZoom(new MM.Location(29.76542,-95.446129),12);$(window).on("throttledresize",a);window.onorientationchange=a;$(function(){i.tinyscrollbar({axis:"y",sizethumb:80})});now.setAdmin=function(a){if(l=!!a)g.off("click",e).on("click","h2",e)};var u=!1;now.getPosts=function(b){var c=g.find("ul").first();_(b.posts).each(function(b){b.date=new Date(Date.parse(b.date));var d=$(f({post:b,admin:l}));d.data({_id:b._id});o[b._id]?c.children("li").filter(function(){return $(this).data("_id")===
b._id}).after(d).fadeOut(300,function(){$(this).remove()}):c.append(d);o[b._id]=b;d.fadeIn(200,function(){g.tinyscrollbar_update("relative");a()})});u||(u=!0,g.animate({opacity:1},400),c.children("li").first().trigger("click",[!0]))};g.on("click","a",function(a){a.preventDefault()}).on("click",".icon-edit",function(a){a.stopPropagation();a.preventDefault();c(o[$(this).parent().parent().data("_id")])}).on("click",".icon-remove",function(a){a.stopPropagation();a.preventDefault();confirm("Delete?")&&
now.removePosts($(this).parent().parent().data("_id"))}).on("click","li",function(b,c){var d=$(this),e=d.data("_id"),f=$(h({post:o[e]}));if(c||s!==e){q&&q.removeClass("active");d.addClass("active");s=e;q=d;var i=j.find(".overview");i.fadeOut(300,function(){i.empty().append(f).fadeIn(300,function(){var b=$(window).width()-g.width();600>b&&(b=600);j.css({width:b+"px"}).animate({opacity:1},600,function(){j.tinyscrollbar_update("relative");a(!1)})})});j.find("a").attr({target:"_blank",title:"Opens in a new window"})}});
j.on("click","a",function(a){a.preventDefault();window.open($(this).attr("href"))});now.core.on("connect",function(){console.log("Socket.IO has connected.")});now.core.on("disconnect",function(){console.log("Socket.IO has disconnected sporadically, attempting reconnection.");now.core.socketio.$events.reconnect()});now.ready(function(){now._setAdmin();now._getPosts()});$.getJSON("https://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=matthiasak&include_rts=1",function(a){var b=
n.find("ul"),c=200;_(a).each(function(a){a.date=new Date(Date.parse(a.created_at));a.html=linkify(a.text);var d=$(m({post:a}));b.append(d);setTimeout(function(){d.fadeIn(200);n.tinyscrollbar_update("relative")},c);c+=100});(function(){n.animate({opacity:1},400)}).delay(1)});$.getJSON("/valid",function(a){a.success&&(l=!0)})});var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-22086632"]);_gaq.push(["_trackPageview"]);
(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)})();