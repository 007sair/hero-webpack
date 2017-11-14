/**
 * 弹层插件 显示/隐藏/触发事件
 */

function POP(config) {

    this.opts = $.extend(true, {
        pre: 'pop',
        zIndex: 1000,
        html: '这是弹层的正文部分',
        wrap: '',
        height: 'auto',
        isShowCancel: true,
        isShowMask: true,
        mode: '',
        event: { //触发事件
            show: function () {
                // console.log('show event');
            },
            hide: function () {
                // console.log('hide event');
            }
        },
    }, config)

    this.mask = this.opts.pre + '-mask';
    this.cont = this.opts.pre + '-cont';

    this.show();
}

POP.prototype = {
    show: function () {

        //保证当前弹层只有1个
        var $prevCont = $('.' + this.cont);
        $prevCont.length && $prevCont.remove()

        this.render();
        this.bindEvent();

        this.opts.event.show.call(this);
    },
    hide: function () {

        if (this.opts.isShowMask) {
            this.$mask.remove();
        }

        this.$cont.remove();

        this.opts.event.hide.call(this);
    },
    render: function () {

        switch (this.opts.mode) {
            case 'loading':
                this.opts.isShowCancel = false;
                this.$mask = $('<div class="' + this.mask + '">').css({
                    'z-index': this.opts.zIndex,
                    'background': 'transparent'
                }).appendTo(document.body);
                break;
            default:
                if (this.opts.isShowMask) {
                    this.$mask = $('<div class="' + this.mask + '">').css({
                        'z-index': this.opts.zIndex
                    }).appendTo(document.body);
                }
                break;
        }

        this.$cont = $('<div class="' + this.cont + ' ' + this.opts.wrap + '">').css({
            'z-index': +this.opts.zIndex + 5
        }).appendTo(document.body);

        this.$cont.append(this.opts.html).height(this.opts.height);

        if (this.opts.isShowCancel) {
            this.$cancelButton = $('<i class="close"></i>').prependTo(this.$cont);
        }
    },
    bindEvent: function () {
        var me = this;
        this.opts.isShowCancel && this.$cancelButton.on('click', function () {
            me.hide();
        });
    }
};


if (typeof module != 'undefined' && module.exports) {
    module.exports = POP;
}