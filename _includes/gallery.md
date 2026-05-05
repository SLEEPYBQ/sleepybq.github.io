
<div class="photo-gallery-container">
  <div id="justified-gallery">
    {% for image in site.static_files %}
      {% if image.path contains 'images/gallery' %}
        <a href="{{ site.baseurl }}{{ image.path }}" class="gallery-item">
          <img src="{{ site.baseurl }}{{ image.path }}" alt="{{ image.name | remove: '.jpg' | remove: '.png' | remove: '.jpeg' | capitalize }}"/>
        </a>
      {% endif %}
    {% endfor %}
  </div>
</div>

<!-- PhotoSwipe UI 容器 -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="pswp__bg"></div>
  <div class="pswp__scroll-wrap">
    <div class="pswp__container">
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
    </div>
    <div class="pswp__ui pswp__ui--hidden">
      <div class="pswp__top-bar">
        <div class="pswp__counter"></div>
        <button class="pswp__button pswp__button--close" title="关闭 (Esc)"></button>
        <button class="pswp__button pswp__button--share" title="分享"></button>
        <button class="pswp__button pswp__button--fs" title="全屏"></button>
        <button class="pswp__button pswp__button--zoom" title="放大/缩小"></button>
        <div class="pswp__preloader">
          <div class="pswp__preloader__icn">
            <div class="pswp__preloader__cut">
              <div class="pswp__preloader__donut"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
        <div class="pswp__share-tooltip"></div>
      </div>
      <button class="pswp__button pswp__button--arrow--left" title="上一张"></button>
      <button class="pswp__button pswp__button--arrow--right" title="下一张"></button>
      <div class="pswp__caption">
        <div class="pswp__caption__center"></div>
      </div>
    </div>
  </div>
</div>

<!-- 引入所需的库 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/justifiedGallery@3.8.1/dist/css/justifiedGallery.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/default-skin/default-skin.min.css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/justifiedGallery@3.8.1/dist/js/jquery.justifiedGallery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.3/photoswipe-ui-default.min.js"></script>

<script>
  $(document).ready(function() {
    // 初始化 Justified Gallery
    $("#justified-gallery").justifiedGallery({
      rowHeight: 200,
      margins: 5,
      lastRow: 'justify',
      border: 0,
      randomize: false,
      waitThumbnailsLoad: true
    }).on('jg.complete', function() {
      // JustifiedGallery 加载完成后再初始化 PhotoSwipe
      initPhotoSwipeFromDOM('#justified-gallery');
    });
  });

  // 初始化 PhotoSwipe
  function initPhotoSwipeFromDOM(gallerySelector) {
    // 解析图片尺寸等信息
    var parseThumbnailElements = function(el) {
      var thumbElements = $(el).find('a:not(.justified-gallery-label)').get();
      var items = [];
      var figureEl, linkEl, size, item;

      for(var i = 0; i < thumbElements.length; i++) {
        figureEl = thumbElements[i]; // <a> element
        
        // 创建幻灯片对象
        linkEl = figureEl;
        size = [0, 0]; // 初始化大小，稍后会动态设置

        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10) || 1200, // 设置一个默认宽度
          h: parseInt(size[1], 10) || 900,  // 设置一个默认高度
          el: figureEl,
          title: $(figureEl).find('img').attr('alt') || ''
        };
        
        items.push(item);
      }
      
      return items;
    };

    // 查找最近的父元素
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // 当点击打开图片时的处理函数
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      
      var eTarget = e.target || e.srcElement;
      
      var clickedListItem = closest(eTarget, function(el) {
        return (el.tagName && el.tagName.toUpperCase() === 'A');
      });
      
      if(!clickedListItem) {
        return;
      }
      
      var clickedGallery = clickedListItem.parentNode;
      var childNodes = $(clickedListItem.parentNode).find('a:not(.justified-gallery-label)').get();
      var numChildNodes = childNodes.length;
      var nodeIndex = 0;

      for (var i = 0; i < numChildNodes; i++) {
        if(childNodes[i].nodeType !== 1) { 
          continue; 
        }

        if(childNodes[i] === clickedListItem) {
          nodeIndex = i;
          break;
        }
      }
      
      if(nodeIndex >= 0) {
        openPhotoSwipe(nodeIndex, clickedGallery);
      }
      return false;
    };

    // 打开 PhotoSwipe
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          options,
          items;

      items = parseThumbnailElements(galleryElement);
      
      // 定义选项
      options = {
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        getThumbBoundsFn: function(index) {
          var thumbnail = items[index].el.getElementsByTagName('img')[0];
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var rect = thumbnail.getBoundingClientRect(); 
          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        },
        showAnimationDuration: 300,
        hideAnimationDuration: 300,
        history: false,
        focus: false,
        showHideOpacity: true,
        shareEl: false,
        closeOnScroll: false,
        pinchToClose: true,
        closeOnVerticalDrag: true,
        maxSpreadZoom: 4,
        errorMsg: '<div class="pswp__error-msg">图片无法加载</div>'
      };
      
      // 如果由URL打开
      if(fromURL) {
        if(options.galleryPIDs) {
          for(var j = 0; j < items.length; j++) {
            if(items[j].pid === index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }
      
      // 如果该索引无效则退出
      if(isNaN(options.index)) {
        return;
      }
      
      if(disableAnimation) {
        options.showAnimationDuration = 0;
      }
      
      // 创建并初始化 PhotoSwipe
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      
      // 创建并初始化 PhotoSwipe
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      
      // 动态更新图片大小
      gallery.listen('gettingData', function(index, item) {
        var img = new Image();
        img.src = item.src;
        
        img.onload = function() {
          item.w = this.width;
          item.h = this.height;
          gallery.updateSize(true);
        };
      });
      
      gallery.init();
    };

    // 遍历所有图库元素并绑定事件
    var galleryElements = document.querySelectorAll(gallerySelector);
    
    for(var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i+1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
  };
</script>