"use strict";
document.addEventListener("DOMContentLoaded", function(event)
{
    nav.init();    
});

(function()
{
    var _this;
    
    var nav =
    {
        timer1 : null,
        timer2 : null,
        speed : 75,
        interval : 5,
        moveCount : 0,
        marginLeft : 0,
        
        init : function()
        {        
            _this = this;
            
            document.getElementById("nav-left").addEventListener('click', this.eventMove, false);
            document.getElementById("nav-left").addEventListener('mousedown', this.eventMove, false);
            document.getElementById("nav-left").addEventListener('mouseup', this.eventMove, false);

            document.getElementById("nav-right").addEventListener('click', this.eventMove, false);
            document.getElementById("nav-right").addEventListener('mousedown', this.eventMove, false);
            document.getElementById("nav-right").addEventListener('mouseup', this.eventMove, false);

            document.getElementById("nav-prev").addEventListener('click', this.eventMoveFast, false);
            document.getElementById("nav-prev").addEventListener('mousedown', this.eventMoveFast, false);
            document.getElementById("nav-prev").addEventListener('mouseup', this.eventMoveFast, false);

            document.getElementById("nav-next").addEventListener('click', this.eventMoveFast, false);
            document.getElementById("nav-next").addEventListener('mousedown', this.eventMoveFast, false);
            document.getElementById("nav-next").addEventListener('mouseup', this.eventMoveFast, false);            
        },
        
        eventMove : function(e)
        {
            e = e || window.event;
            var dir = this.id == "nav-left" ? -1 : 1;

            switch (e.type)
            {
                case "click":
                 _this.interval = 5;
                 if (_this.timer1 == null) _this.move(dir);
                break;
                case "mousedown":
                 _this.interval = 10;
                 _this.timer2 = setInterval("nav.move("+dir+")", 0);
                break;
                case "mouseup":
                 clearInterval(_this.timer2);
                 _this.timer2 = null;
                break;
            }
        },
        
        eventMoveFast : function(e)
        {
            e = e || window.event;
                
            if (_this.timer2 != null) return; // move in progress

            _this.interval = 50; // move faster
            _this.moveCount = 0; // reset

            e = e || window.event;
            var dir = this.id == "nav-prev" ? -1 : 1;

            var nodes = document.querySelectorAll('#nav > ul > li');
            var first = parseInt(nodes[0].getAttribute("data-code"));
            var last = parseInt(nodes[nodes.length - 1].getAttribute("data-code"));

            console.log(e.type);

            switch (e.type)
            {
                case "click":
                 _this.timer2 = setInterval(function(){ nav.move(dir, 17); }, 0); // 17 is 8 + 1 + 8 = number of images shown in the nav
                break;
                case "mousedown":                
                 _this.timer3 = setInterval(function(){ nav.move(dir); }, 0);                 
                break;
                case "mouseup":
                 clearInterval(_this.timer3);
                 _this.timer3 = null;
                break;
            }

        },
        
        move : function(dir, loop)
        {
            if (_this.timer1 != null) return; // Slide in action

            console.log('loop : ', loop);

            if (loop && _this.moveCount == loop)
            {
                clearInterval(_this.timer2);
                _this.timer2 = null;
                _this.moveCount = 0;
                return;
            }

            console.log('_this.timer2 : ', _this.timer2);
            
            var nodes = document.querySelectorAll("#nav > ul > li");
            var first = parseInt(nodes[0].getAttribute("data-code"));
            var last = parseInt(nodes[nodes.length - 1].getAttribute("data-code"));

            console.log('first : ', first);
            console.log('last  : ', last);
            
            if ((first == 0 && dir == -1) || (last == 50 && dir == 1)) // Dont move - boundary values                
            {
                clearInterval(_this.timer2);
                _this.timer2 = null;
                _this.moveCount = 0;                
                return;
            }

            switch(dir)
            {
                case 1:
                 _this.marginLeft = 5;
                 li = document.createElement("li");
                 li.setAttribute('data-code', last + 1);
                 li.innerHTML = '<img src="images/nature/100x100/' + (last + 1) + '.jpg" />';
                 document.querySelector("#nav > ul").appendChild(li);
                 _this.timer1 = setInterval("nav.slide("+dir+",0,-55)", 10);
                break;

                case -1:
                 _this.marginLeft = -50;
                 var li = document.createElement("li");
                 li.setAttribute('data-code', first - 1);
                 li.innerHTML = '<img src="images/nature/100x100/' + (first - 1) + '.jpg" />';                 
                 var theParent = document.querySelector("#nav > ul");
                 document.querySelector("#nav > ul").insertBefore(li, theParent.firstChild);                 
                 _this.timer1 = setInterval("nav.slide("+dir+",0,0)", 10);                 
                break;
            }

            _this.moveCount++;
        },

        slide : function(dir, start, stop)
        {
            var marginLeft = _this.marginLeft;
            if (marginLeft === undefined) return;
            if (marginLeft == stop)
            {
                clearInterval(_this.timer1);
                _this.timer1 = null;
                _this.marginLeft = 0;

                var nodes = document.querySelectorAll("#nav > ul > li"),
                index = -1 == dir ? nodes.length - 1 : 0;
                nodes[index].parentElement.removeChild(nodes[index]);
                
                return;
            }

            var newLeft = Math[dir == -1 ? "min" : "max"](marginLeft + -dir * _this.interval, stop);
            var li = document.querySelectorAll("#nav > ul > li");
            var li_first = li[0];
            li_first.style.marginLeft = newLeft;
            _this.marginLeft = newLeft;
        }        
    }
    
    window.nav = nav;    
})();