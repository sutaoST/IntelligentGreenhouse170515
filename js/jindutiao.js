$(function(){

    var interval = setInterval(increment,100);
    var current = 0;

    function increment(){

        $('#counter').html(current+'m/s');
        if(current<0) {
            current++;
        }
        if(current>=0) {
            current=0;
            $(".load-bar-inner").css(
                "animation-play-state"," paused",
                "-moz-animation-play-state"," paused",
                "-o-animation-play-state"," paused",
                "-webkit--animation-play-state"," paused"
            );
            $("#counter").css(
                "animation-play-state"," paused",
                "-moz-animation-play-state"," paused",
                "-o-animation-play-state"," paused",
                "-webkit--animation-play-state"," paused"
            )
        }
    }

    $('.load-bar').mouseover(function(){
        clearInterval(interval);
    }).mouseout(function(){
        interval = setInterval(increment,100);
    });

});/**
 * Created by zonesion on 2017/3/3.
 */
