class Rate {
    rate(stars) {
        console.log(`评分为${stars}星`);
    }
}

class Share {
    share() {
        console.log('分享至微信');
    }
}

class Order {
    constructor(info) {
        this.rate = new Rate().rate;
        this.share = new Share().share;
        this.info = info;
    }
    getInfo() {
        console.log(this.info);
    }
}

let order = new Order('新订单');
order.getInfo();
order.rate(5);
order.share();
