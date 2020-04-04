class Order{
    constructor(info){
        this.info = info;
    }
    getInfo(){
        console.log(this.info)
    }
}

let order = new Order('新订单');
order.getInfo()