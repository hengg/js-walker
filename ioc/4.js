class Rate {
    constructor(id) {
        this.id = id;
    }
    rate(stars) {
        if (checkId(this.id)) {
            console.log(`评分为${stars}星`);
        } else {
            console.error('这不是您的订单，无法评价');
        }
    }
}

class Share {
    constructor(id) {
        this.id = id;
    }
    share(platform) {
        if (checkWxId(this.id)) {
            switch (platform) {
                case 'wxfriend':
                    console.log('分享至微信好友');
                    break;
                case 'wxposts':
                    console.log('分享至微信朋友圈');
                    break;
                case 'weibo':
                    console.log('分享至微博');
                    break;
                default:
                    console.error('分享失败，请检查platform');
                    break;
            }
        } else {
            console.error('请先登录');
        }
    }
}

function checkId(id) {
    return typeof id === 'number';
}

function checkWxId(id) {
    return +id === 0;
}

class Order {
    constructor(info, id, options) {
        this.rate = options.Rate.rate;
        this.share = options.Share.share;
        this.info = info;
        this.id = id;
    }
    getInfo() {
        console.log(this.info);
    }
}

const id = '0';
const info = '新订单';
let order = new Order(info, id, {
    Rate: new Rate(id),
    Share: new Share(id),
});

order.getInfo();
order.rate(5);
order.share('facebook');
