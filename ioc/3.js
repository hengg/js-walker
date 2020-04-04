class Rate {
    constructor(id) {
        this.id=id
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
    share() {
        if (checkWxId(this.id)) {
            console.log('分享至微信');
        } else {
            console.error('请先登录');
        }
    }
}

function checkId(id) {
    return typeof id === 'number';
}

function checkWxId(id) {
    return +id === 0
}

class Order {
    constructor(info, id) {
        this.rate = new Rate(id).rate;
        this.share = new Share(id).share;
        this.info = info;
        this.id = id;
    }
    getInfo() {
        console.log(this.info);
    }
}

let order = new Order('新订单', '0');
order.getInfo();
order.rate(5);
order.share();
