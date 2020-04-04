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

function checkId(id) {
    return typeof id === "number";
}

class Order {
    constructor(info,id) {
        this.Rate = new Rate();
        this.share = new Share().share;
        this.info = info;
        this.id = id;
    }
    getInfo() {
        console.log(this.info);
    }
    rate(stars) {
        if (checkId(this.id)) {
            this.Rate.rate(stars);
        } else {
            console.error('校验失败');
        }
    }
}

let order = new Order('新订单','0');
order.getInfo();
order.rate(5);
order.share();
