class Rate {
    init(order) {
        order.rate = this.rate;
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
    init(order) {
        order.share = this.share;
    }
    share(platform) {
        // ⚠️这里的 this 是 Order 对象⚠️
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

class Aftermarket {
    init(order) {
        order.repair = this.repair;
    }
    repair() {
        console.log('马上为您安排维修');
    }
}

function checkId(id) {
    return typeof id === 'number';
}

function checkWxId(id) {
    return +id === 0;
}

class Order {
    static modules = new Map();
    constructor(info, id) {
        this.info = info;
        this.id = id;
        this.initModules();
    }
    static inject(module) {
        Order.modules.set(module.constructor.name, module);
    }
    getInfo() {
        console.log(this.info);
    }
    initModules() {
        for (let module of Order.modules.values()) {
            module.init(this);
        }
    }
}

const id = '0';
const info = '新订单';

const aftermarker = new Aftermarket();
const share = new Share();
const rate = new Rate();

Order.inject(aftermarker);
Order.inject(share);
Order.inject(rate);

const order = new Order(info, id);

order.getInfo();
order.rate(5);
order.share('facebook');
order.repair()


const anotherOrder = new Order('第二个订单', '101');
anotherOrder.getInfo();