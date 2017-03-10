// JavaScript Document
(function($) {

    $.fn.pagination = function(options) {

        //默认配置
        var defaults = {
                total: 0, // 总数
                pageSize: 10, // 每页显示多少条
                pageNumLimit: 5, // 展示页码个数，默认显示5个 暂未实现
                firstText: '首页', // 首页按钮文本内容
                lastText: '末页', // 末页按钮文本内容
                prevText: '上一页', // 上一页按钮文本内容
                nextText: '下一页', // 下一页按钮文本内容
                showTotal: true,
                linkTo: 'javascript:;'
            },
            opts = $.extend({}, defaults, options), // 扩展配置项
            selfDom = this, // 外部容器dom
            pageNum = parseInt((opts.total / opts.pageSize).toFixed(0)), // 页数
            currentPageNum = 1; // 当前页

        // 链式操作
        this.each(function(i) {

            // 分页逻辑，第一页和最后一页显示， 当前页前面和后面最多显示3个
            function renderPage(currentPage, total) {
                var prevPageStr = '<a href="" class="btn-page btn-normal btn-prev ' + (currentPage === 1 ? 'btn-forbid' : '') + '" mark="prev">' + opts.prevText + '</a>', // 前一页
                    nextPageStr = '<a href="" class="btn-page btn-next ' + (currentPage === total ? 'btn-forbid' : '') + '" mark="next">' + opts.nextText + '</a>', // 下一页
                    homePageStr = '<a href="" class="btn-page btn-normal btn-first ' + (currentPage === 1 ? 'btn-forbid' : '') + '" mark="first">' + opts.firstText + '</a>', // 首页
                    endPageStr = '<a href="" class="btn-page btn-last ' + (currentPage === total ? 'btn-forbid' : '') + '" mark="last">' + opts.lastText + '</a>', // 末页
                    firstPageStr = '<a href="" class="btn-page btn-num" mark="1">1</a>', // 第一页
                    lastPageStr = '<a href="" class="btn-page btn-num" mark="' + total + '">' + total + '</a>', // 最后一页
                    currentPageStr = '<a href="" class="btn-page btn-num btn-current" mark="' + currentPage + '">' + currentPage + '</a>', // 当前页
                    dotPageStr = '<span class="ellipsis">...</span>',
                    str = currentPageStr;

                // 前后3个的显示逻辑
                for (var i = 1; i <= 3; i++) {

                    // 前面3个显示逻辑，从第3个开始处理，前面依次添加2...,第2页不需要处理，在下面已经添加了第一页了
                    if (currentPage >= i + 2) {
                        str = '<a href="" class="btn-page btn-num" mark="' + (currentPage - i) + '">' + (currentPage - i) + '</a>' + str;
                    }

                    // 后面3个显示逻辑，<total-3开始要显示全3个，后面依次需要-1
                    if (currentPage + i < total) {
                        str = str + ' ' + '<a href="" class="btn-page btn-num" mark="' + (currentPage + i) + '">' + (currentPage + i) + '</a>';
                    }
                }

                // 前面...逻辑,在第六个开始，例如总数100，第6个就要开始出现...了
                if (currentPage > 5) {
                    str = dotPageStr + str;
                };

                // 第一页显示逻辑
                if (currentPage > 1) {
                    str = firstPageStr + str;
                };

                // 后面...逻辑,在第total-4个开始,例如总数100，96已经不能出现...了
                if (currentPage + 4 < total) {
                    str = str + dotPageStr;
                };

                // 最后一页显示逻辑
                if (currentPage < total) {
                    str = str + lastPageStr;
                };

                // 首页和末页
                str = homePageStr + prevPageStr + str + nextPageStr + endPageStr;

                str = str.replace(/href=""/g, 'href="' + opts.linkTo + '"');
                selfDom.empty().append(str + '<br/>');
            }


            // 测试数据
            function testPage() {
                for (var i = 0; i < 30; i++) {
                    renderPage(i + 1, 30);
                }
            }

            // 事件处理
            function pageClickHandle() {
                var self = $(this),
                    mark = self.attr('mark'),
                    first = selfDom.find('.btn-first'),
                    prev = selfDom.find('.btn-prev'),
                    next = selfDom.find('.btn-next'),
                    last = selfDom.find('.btn-last'),
                    lastNum = pageNum;

                if (self.hasClass('btn-forbid')) {
                    return;
                };

                $('.btn-page').removeClass('btn-current');
                switch (mark) {
                    case 'first':
                        currentPageNum = 1;
                        break;

                    case 'prev':
                        currentPageNum--;
                        break;

                    case 'next':
                        currentPageNum++;
                        break;

                    case 'last':
                        currentPageNum = lastNum;
                        break;

                    default:
                        currentPageNum = mark;
                }

                renderPage(parseInt(currentPageNum), pageNum);
            }

            renderPage(1, pageNum);

            // 页码点击事件
            $(document).on('click', '.btn-page', pageClickHandle);

        });

    };

})(jQuery);
