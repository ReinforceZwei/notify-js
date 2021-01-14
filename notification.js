(function($,window){
    var t = {};
    var setting = {
        color:"#ffffffcc",
        fontColor:"#000000",
        darkMode:false,
        slideOut:true,
        animetionTime:400,
        dismissTime:4000,
        position:"top",
        dismiss:true,
        closeOnClick:true,
        onclickFunc:undefined
    };
    var totalBox = 0;
    var boxID = 0;
    var boxObject = {top:[],bottom:[]};
    
    t.showNotification = function(msg,option=undefined){
        let newSetting;
        if(typeof(option)=="object"){
            newSetting = $.extend({}, setting, option);
            //console.log(newSetting);
        }else{
            newSetting = setting;
        }
        let box = spawnNotificationBox(msg, newSetting.onclickFunc, newSetting.closeOnClick, option);
        if(newSetting.dismiss){
            setTimeout(function(){destoryNotificationBox(box)}, newSetting.dismissTime);
        }
        return box;
    };
    t.setStyle = setStyle;
    t.closeNotification = function(box){
        destoryNotificationBox(box);
        return;
    };
    t.toggleDarkMode = function(){
        if(setting.darkMode){
            setting.color = "#ffffffcc";
            setting.fontColor = "#000000";
            setting.darkMode = false;
        }else{
            setting.color = "#000000cc";
            setting.fontColor = "#ffffff";
            setting.darkMode = true;
        }
        setAllNotificationColor();
    };
    t.sortNotification = sortNotification;
    t.sortNotificationBottom = sortNotificationBottom;
    t.getSetting = function(){return setting};
    
    function spawnNotificationBox(msg,onclickFunc,closeOnClick,option){
        let newSetting;
        totalBox += 1;
        boxID += 1;
        if(typeof(onclickFunc)=="undefined"||onclickFunc===null){
            onclickFunc = function(){};
        }
        if(typeof(option)=="object"){
            newSetting = $.extend({}, setting, option);
        }else{
            newSetting = setting;
        }
        let code = `<div id="notibox-${boxID}" class="notification-box">${msg}</div>`;
        let box;
        if(!newSetting.slideOut){
            box = $(code).hide().appendTo("body").css("opacity",0).css("background",newSetting.color).css("color",newSetting.fontColor).show();//.fadeIn();
            box.css("opacity",1);
        }else{
            box = $(code).css("right",-300).appendTo("body").css("background",newSetting.color).css("color",newSetting.fontColor);//.css("right",0);
            setTimeout(function(){box.css("right",0)},newSetting.animetionTime-100);
        }
        //box.click({box:box},destoryNotificationBox_);
        if(closeOnClick){
            box.click({box:box},function(e){destoryNotificationBox(e.data.box);onclickFunc(e)});
        }else{
            box.click({box:box},onclickFunc(e));
        }
        // boxObject.push(box);
        box.setting = newSetting;
        if(newSetting.position=="bottom"){
            boxObject.bottom.push(box);
            sortNotificationBottom();
        }else{
            boxObject.top.push(box);
            sortNotification();
        }
        return box;
    }
    function destoryNotificationBox(box=undefined){
        if(typeof(box)=="undefined" || typeof(box)!="object"){
            if(!setting.slideOut){
                boxObject.top.forEach(function(e,i){
                    // e.fadeOut(500,function(){$(this).remove();});
                    e.css("opacity",0);
                    setTimeout(function(){e.remove();},setting.animetionTime);
                });
                boxObject.bottom.forEach(function(e,i){
                    // e.fadeOut(500,function(){$(this).remove();});
                    e.css("opacity",0);
                    setTimeout(function(){e.remove();},setting.animetionTime);
                });
            }else{
                boxObject.top.forEach(function(e,i){
                    e.css("right",-300);
                    setTimeout(function(){e.remove();},setting.animetionTime);
                });
                boxObject.bottom.forEach(function(e,i){
                    e.css("right",-300);
                    setTimeout(function(){e.remove();},setting.animetionTime);
                });
            }
            boxObject = [];
            totalBox = 0;
            boxID = 0;
        }else{
            totalBox -= 1;
            if(box.setting.position=="top"){
                let indexTop = boxObject.top.indexOf(box);
                if(indexTop != -1){
                    boxObject.top.splice(indexTop, 1);
                }
            }else{
                let indexBottom = boxObject.bottom.indexOf(box);
                if(indexBottom != -1){
                    boxObject.bottom.splice(indexBottom, 1);
                }
            }
            
            if(!box.setting.slideOut){
                // box.fadeOut(500,function(){$(box).remove();o.sortNotification();});
                box.css("opacity",0);
            }else{
                box.css("right",-300);
                // setTimeout(function(){box.remove();o.sortNotification();},400);
            }
            setTimeout(function(){box.remove();if(box.setting.position=="bottom"){sortNotificationBottom();}else{sortNotification();}},setting.animetionTime);
            if(totalBox===0){
                boxID = 0;
            }
        }
        return;
    }
    function sortNotification(){
        let a = boxObject.top.slice().reverse();
        let arr = [];
        a.forEach((e,i)=>{
            arr.push(e.height());
        });
        a.forEach((e,i)=>{
            let v = 0;
            for(let p = 0;p < i;p++){
                v += arr[p]+25;
            }
            let top = i===0?0:v;
            e.css("top",`${top}px`);
        });
    }
    function sortNotificationBottom(){
        let a = boxObject.bottom.slice().reverse();
        let arr = [];
        a.forEach((e,i)=>{
            arr.push(e.height());
        });
        a.forEach((e,i)=>{
            let v = 0;
            for(let p = 0;p < i;p++){
                v += arr[p]+25;
            }
            let top = v;
            e.css("bottom",`${top}px`);
        });
    }
    function setAllNotificationColor(){
        boxObject.top.forEach(function(e,i){
            e.css("background",setting.color).css("color",setting.fontColor);
        });
        boxObject.bottom.forEach(function(e,i){
            e.css("background",setting.color).css("color",setting.fontColor);
        });
    }
    function setStyle(){
        let style = $(`<style id="notification-style">.notification-box { position: fixed; padding: 10px;border-radius:10px;width: 250px;right: 0; background: ${setting.color}; color: ${setting.fontColor}; word-wrap: break-word; margin: 8px; text-align: center; transition: ${setting.animetionTime/1000.0}s;}</style>`);
        if($("#notification-style").length){
            $("#notification-style").remove();
        }
        $('html > head').append(style);
    }
    $.fn.notification = t;
    window.notify = t;
})(jQuery,window);
$(function(){
    let n = $.fn.notification;
    n.setStyle();
});