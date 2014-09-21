
//子弹类
function Bullet(x, y, direct, speed) {
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed = speed;
    this.timer = null;
    this.isLive = true;
    this.run = function () {
        if (this.x < 0 || this.x > 800 || this.y < 0 || this.y > 500) {
            window.clearInterval(this.timer);
            this.isLive = false;
        } else {

            switch (this.direct) {
                case 0:
                    this.y -= this.speed;
                    break;
                case 1:
                    this.x += this.speed;
                    break;
                case 2:
                    this.y += this.speed;
                    break;
                case 3:
                    this.x -= this.speed;
                    break;
            }
        }

        document.getElementById("span").innerText = "Bullet X=" + this.x + "BUllet Y=" + this.y;
    }
}



//父类 Tank,，javascript通过对象冒充来继承
function Tank(x, y, direct, speed, color) {
    this.x = x;
    this.y = y;
    this.direct = direct;
    this.speed = speed;
    this.color = color;//一个坦克需要两个颜色
    //上移
    this.moveUp = function () {
        this.y -= this.speed;
        this.direct = 0;
    }
    //右移
    this.moveRight = function () {
        this.x += this.speed;
        this.direct = 1;
    }
    //下移
    this.moveDown = function () {
        this.y += this.speed;
        this.direct = 2;
    }
    //左移
    this.moveLeft = function () {
        this.x -= this.speed;
        this.direct = 3;
    }
}


//Hero类,x表示坦克的横坐标，yb表示纵坐标，direct表示方向
function Hero(x, y, direct, speed, color) {
    //下面两句话的作用是通过对象冒充达到继承的效果
    this.tank = Tank;
    this.tank(x, y, direct, speed, color);
    this.shotEnemy = function () {
        //chuangjianzidan
        switch (this.direct) {
            case 0:
                heroBullet = new Bullet(this.x + 18, this.y, 0, 5);
                break;
            case 1:
                heroBullet = new Bullet(this.x + 40, this.y + 18, 1, 5);
                break;
            case 2:
                heroBullet = new Bullet(this.x + 18, this.y + 40, 2, 5);
                break;
            case 3:
                heroBullet = new Bullet(this.x, this.y + 18, 3, 5);
                break;
        }
        ////////////////////////////////////Push To Array
        heroBullets.push(heroBullet);

        var timer = window.setInterval("heroBullets[" + (heroBullets.length-1)+"].run()", 50);
        heroBullets[heroBullets.length-1].timer = timer;
    };
}

//
function drawHeroBullet() {
    for (var i = 0; i < heroBullets.length; i++) {
        var heroBullet = heroBullets[i];
        if (heroBullet != null && heroBullet.isLive == true) {
            cxt.fillStyle = "#FF55CC";
            cxt.fillRect(heroBullet.x, heroBullet.y, 4, 4);
        }
    }
}


//定义一个EnemyTank
function EnemyTank(x, y, direct, speed, color) {
    this.tank = Tank;
    this.tank(x, y, direct, speed, color);
}




//把绘制坦克封装成一个函数，将来可以作为成员函数
//讲来这个函数可以画自己的坦克或者别人的坦克
function drawTank(tank) {
    //考虑方向
    switch (tank.direct) {
        case 0:
        case 2:
            //画出自己的坦克
            cxt.fillStyle = tank.color[0];
            //画出一侧履带
            cxt.fillRect(tank.x, tank.y, 10, 40);
            //画出另一侧履带
            cxt.fillRect(tank.x + 30, tank.y, 10, 40);
            //画出机身
            cxt.fillRect(tank.x + 12, tank.y + 10, 16, 20);
            //画出盖子
            cxt.fillStyle = tank.color[1];
            cxt.arc(tank.x + 20, tank.y + 20, 7, 0, Math.PI * 2, true);
            cxt.fill();
            //画出炮筒
            cxt.beginPath();
            cxt.strokeStyle = tank.color[1];
            cxt.lineWidth = "2";
            cxt.moveTo(tank.x + 20, tank.y + 20);
            if (tank.direct == 0) {
                cxt.lineTo(tank.x + 20, tank.y);
            } else {
                cxt.lineTo(tank.x + 20, tank.y + 40);
            }
            cxt.closePath();
            cxt.stroke();
            break;
        case 1:
        case 3:
            //画出自己的坦克
            cxt.fillStyle = tank.color[0];
            //画出一侧履带
            cxt.fillRect(tank.x, tank.y, 40, 10);
            //画出另一侧履带
            cxt.fillRect(tank.x, tank.y + 30, 40, 10);
            //画出机身
            cxt.fillRect(tank.x + 10, tank.y + 12, 20, 16);
            //画出盖子
            cxt.fillStyle = tank.color[1];
            cxt.arc(tank.x + 20, tank.y + 20, 7, 0, Math.PI * 2, true);
            cxt.fill();
            //画出炮筒
            cxt.beginPath();
            cxt.strokeStyle = tank.color[1];
            cxt.lineWidth = "2";
            cxt.moveTo(tank.x + 20, tank.y + 20);
            if (tank.direct == 1) {//向右
                cxt.lineTo(tank.x + 20 + 20, tank.y + 20);
            } else {//向左
                cxt.lineTo(tank.x, tank.y + 20);
            }
            cxt.closePath();
            cxt.stroke();
            break;
    }
}