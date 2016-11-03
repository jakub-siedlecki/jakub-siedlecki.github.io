$(document).ready(function() {
    var completed = 0,
        imgHeight = 1200;
        posArr = [
            10, // banana
            110, // orange
            210, // cherry
            310, // watermelon
            410, // banana
            510, // orange
            610, // cherry
            710, // watermelon
            810, // banana
            910, // orange
            1010, // cherry
            1110 // watermelon
        ];

    /* constructor */
    function Slot(el, step) {
        this.speed = 0; //speed of the slot at any point of time
        this.step = step; //speed will increase at this rate
        this.si = null; //holds setInterval object for the given slot
        this.el = el; //dom element of the slot
        this.pos = null; //final position of the slot

        $(el).pan({
            fps:50,
            dir:'down' // direction
        });
        $(el).spStop();
    }

    /* Start proto */
    Slot.prototype.start = function() {
        var _this = this;
        $(_this.el).spStart();
        _this.si = window.setInterval(function() {
            if(_this.speed < 90) {
                _this.speed += _this.step;
                $(_this.el).spSpeed(_this.speed);
            }
        }, 100);
    };

    /* Stop proto*/
    Slot.prototype.stop = function() {
        var _this = this,
        limit = 30;
        clearInterval(_this.si);
        _this.si = window.setInterval(function() {
            if(_this.speed > limit) {
                _this.speed -= _this.step;
                $(_this.el).spSpeed(_this.speed);
            }
            if(_this.speed <= limit) {
                _this.finalPos(_this.el);
                $(_this.el).spStop();
                clearInterval(_this.si);
                _this.speed = 0;
            }
        }, 100);
    };

    /* final pos proto */
    Slot.prototype.finalPos = function() {
        var el = this.el,
            el_id,
            pos,
            posMin = 9999,
            best,
            bgPos,
            k;

        el_id = $(el).attr('id');
        pos = document.getElementById(el_id).style.backgroundPosition;
        pos = pos.split(' ')[1];
        pos = parseInt(pos, 10);

        for(var i = 0; i < posArr.length; i++) {
            for(var j = 0;;j++) {
                k = posArr[i] + (imgHeight * j);
                if(k > pos) {
                    if((k - pos) < posMin) {
                        posMin = k - pos;
                        best = k;
                        this.pos = posArr[i];
                    }
                    break;
                }
            }
        }

        best += imgHeight - 10;
        bgPos = "0 " + best + "px";
        $(el).animate({
            // 'background-position-x': "center",
            backgroundPosition:"(" + bgPos + ")"
        }, {
            duration: 200,
            complete: function() {
                completed ++;
            }
        });
    };

/* creating objects */
    var firstSlot = new Slot('#slot1', 2),
        secondSlot = new Slot('#slot2', 4),
        thirdSlot = new Slot('#slot3', 5);

/* buttons */
    $('#start').click(function() {
        firstSlot.start();
        secondSlot.start();
        thirdSlot.start();

        $("#stop").attr("disabled", true);
        setTimeout(function() {$("#stop").removeAttr("disabled"); }, 2000);
        });

    $('#stop').click(function() {
        firstSlot.stop();
        secondSlot.stop();
        thirdSlot.stop();

        $("#stop").attr("disabled", true);
        });
});
