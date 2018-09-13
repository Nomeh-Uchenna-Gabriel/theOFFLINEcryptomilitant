'use strict';

// For easy identification.
function id(e){
    return document.getElementById(e)
}

// When the window gets resized
window.onresize = function(){
    rsz()
}

//Declare variables not war;
var block_timer = 1500, rain = 0, move_hor_num, move_ver_num, speed, has_ended = 0, isKeyPressed = 0, is_big = false, is_on = 0, play_status = 0, rem_life_num = 1, add_life_num = 1, num_of_life = 100, time_dur = 90, time_dur2 = 165, time_dur_service = 85, time_dur_new = 15, is_marshal = 0, is_offline = 0;

;

// The direction functions: button_dir
function button_dir1(){
    var hj1 = setInterval(ty, 12)
    function ty(){
        if(isKeyPressed === 1 && is_on === 1){
            move('right')
            id('btn-right').style.backgroundColor = '#135';
            id('btn-right').style.color = '#fff';
            id('btn-right').style.boxShadow = '0px 0px 3px 2px grey';
        } else {
            clearInterval(hj1)
            id('btn-right').style.backgroundColor = '#fff';
            id('btn-right').style.color = '#135';
            id('btn-right').style.boxShadow = '0px 0px 3px 2px rgb(107, 123, 138)';
        }
    }
}

function button_dir2(){
    var hj1 = setInterval(ty, 12)
    function ty(){
        if(isKeyPressed === 1 && is_on === 1){
            move('left')
            id('btn-left').style.backgroundColor = '#135';
            id('btn-left').style.color = '#fff';
            id('btn-left').style.boxShadow = '0px 0px 3px 2px grey';
        } else {
            clearInterval(hj1)
            id('btn-left').style.backgroundColor = '#fff';
            id('btn-left').style.color = '#135';
            id('btn-left').style.boxShadow = '0px 0px 3px 2px rgb(107, 123, 138)';
        }
    }
}

function button_dir3(){
    var hj1 = setInterval(ty, 12)
    function ty(){
        if(isKeyPressed === 1 && is_on === 1){
            move('up')
            id('btn-top').style.backgroundColor = '#135';
            id('btn-top').style.color = '#fff';
            id('btn-top').style.boxShadow = '0px 0px 3px 2px grey';
        } else {
            clearInterval(hj1)
            id('btn-top').style.backgroundColor = '#fff';
            id('btn-top').style.color = '#135';
            id('btn-top').style.boxShadow = '0px 0px 3px 2px rgb(107, 123, 138)';
        }
    }
}

function button_dir4(){
    var hj1 = setInterval(ty, 12)
    function ty(){
        if(isKeyPressed === 1 && is_on === 1){
            move('down')
            id('btn-bottom').style.backgroundColor = '#135';
            id('btn-bottom').style.color = '#fff';
            id('btn-bottom').style.boxShadow = '0px 0px 3px 2px grey';
        } else {
            clearInterval(hj1)
            id('btn-bottom').style.backgroundColor = '#fff';
            id('btn-bottom').style.color = '#135';
            id('btn-bottom').style.boxShadow = '0px 0px 3px 2px rgb(107, 123, 138)';
        }
    }
}

//Do these when the page has loaded
window.onload = function(){  
    rsz()
    id('_progress').innerHTML = (rank+1)+'/'+rankings.length;
    id('play_pause').addEventListener('click', function(){
        play()
    })
    id('life').style.width = '100%';
    id('time').style.width = '100%';
    id('time').style.animationDuration = time_dur + 's';
    id('until-finish').style.animationDuration = time_dur2 + 's';
    id('until-finish').style.width = '100%';
    document.body.addEventListener('contextmenu', function(e){
        e.preventDefault()
        return false
    })
    id('icon-time').pauseAnimations();
    document.addEventListener('keyup', function(){
        isKeyPressed = 0;
    })
    
    //Say what should happen when an arrow key is pressed.
    document.addEventListener('keydown', function(ky){
        switch(ky.keyCode){
            case 39: isKeyPressed = 1; button_dir1();
            break;
            case 37: isKeyPressed = 1; button_dir2();
            break;
            case 38: isKeyPressed = 1; button_dir3();
            break;
            case 40: isKeyPressed = 1; button_dir4();
            break;
            default : //pass
        }
    })
    
    // centering the helicopter at the bottom
    move_hor_num = gc('bdy', 4)/2-gc('fig', 4)/2;
    id('fig').style.left = move_hor_num + 'px';

    move_ver_num = 5;
    id('fig').style.bottom = move_ver_num + 'px';
}

//gc+ is used to compute the absolute position of a particular part of an element in the body as a number for later use.
function gc(a,b){
    a = id(a)
    return b==0?a.getBoundingClientRect().left:b==1?a.getBoundingClientRect().top:b==2?a.getBoundingClientRect().right:b==3?a.getBoundingClientRect().bottom:b==4?a.getBoundingClientRect().width:a.getBoundingClientRect().height
}

function gc2(a,b){
    if(a && b){
        return b=='l'?a.getBoundingClientRect().left:b=='t'?a.getBoundingClientRect().top:b=='r'?a.getBoundingClientRect().right:b=='b'?a.getBoundingClientRect().bottom:b=='w'?a.getBoundingClientRect().width:a.getBoundingClientRect().height
    }
}

//generates a random number.
function rnd(e){
    var a = (Math.random()*e).toFixed(0);
    return a
}

//resizes the game board with respect to the window's inner and outer widths.
function rsz(){
    var iw=window.innerWidth;
    var cntCtr = id('cnt-ctrl');
    id('fig').style.left = gc('bdy', 4)/2-gc('fig', 4)/2 + 'px';
    id('fig').style.bottom = '5px';
    
    //checks if the window's width is less than 500 pixels so that it will be given the view of a phone.
    if(iw<=500){
        // The is_big variable lets us know when to let the helicopter move to the absolute top.
        is_big = false;
         // for phone
        id("sc").style.left = "0px";
        id("sc").style.width = "100%";
        id("sc").style.top = "0px";
        id("sc").style.height = "100%";
        
        id("tops").style.left = "0%";
        id("tops").style.width = "100%";
        id("tops").style.top = '0px';
        id("tops").style.height = "15%";

        id("bdy").style.width = "100%";
        id("bdy").style.left = "0%";
        id("bdy").style.top = '0%';
        id("bdy").style.height = "78%";

        id("ctrl-div").style.width = "100%";
        id("ctrl-div").style.left = "0%";
        id("ctrl-div").style.top = '78%';
        id("ctrl-div").style.height = "22%";

        cntCtr.style.width = gc('ctrl-div', 7)-10 + 'px';
        cntCtr.style.height = gc('ctrl-div', 7)-10 + 'px';
        cntCtr.style.left = gc('ctrl-div', 4)/2-(gc('cnt-ctrl', 4)/2 + 5) + 'px';
        cntCtr.style.fontSize = gc('cnt-ctrl', 4)/5 + 'px';
        cntCtr.style.top = '5px';

    } else {
        is_big = true;
        // for pc
        id("sc").style.left = "0px";
        id("sc").style.width = "100%";
        id("sc").style.top = '0px';
        id("sc").style.height = "100%";
        
        id("tops").style.left = "70%";
        id("tops").style.width = "30%";
        id("tops").style.top = '0px';
        id("tops").style.height = "30%";

        id("bdy").style.width = "70%";
        id("bdy").style.left = "0%";
        id("bdy").style.top = '0px';
        id("bdy").style.height = "100%";

        id("ctrl-div").style.width = "30%";
        id("ctrl-div").style.left = "70%";
        id("ctrl-div").style.top = '30%';
        id("ctrl-div").style.height = "70%";

        cntCtr.style.width = gc('ctrl-div', 4)/1.2 + 'px';
        cntCtr.style.height = gc('ctrl-div', 4)/1.2 + 'px';
        cntCtr.style.left = gc('ctrl-div', 4)/2-(gc('cnt-ctrl', 4)/2) + 'px';
        cntCtr.style.fontSize = gc('cnt-ctrl', 4)/5 + 'px';
        cntCtr.style.top = '13%';
    }
    
    // Used to know when to center the control bottons according to the height instead of the default width.
    if(!(gc('ctrl-div', 7) > (gc('ctrl-div', 4) + 100))){
        cntCtr.style.width = gc('ctrl-div', 7)/2 + 'px';
        cntCtr.style.height = gc('ctrl-div', 7)/2 + 'px';
        cntCtr.style.left = gc('ctrl-div', 4)/2-(gc('cnt-ctrl', 4)/2) + 'px';
        cntCtr.style.fontSize = gc('cnt-ctrl', 4)/5 + 'px';
        cntCtr.style.top = '13%';
        id('home').style.height = '30px';
        id('play_pause').style.height = '30px';
    } else {
        id('home').style.height = '40px';
        id('play_pause').style.height = '40px';
    }

}

//generates the falling blocks.
function generate_block(){
    if(is_on === 1){
        var block = document.createElement('div');
        block.setAttribute('class', 'block obj');
        //gives the block a random width
        block.style.width = rnd(5)*10 + '%';
        id('bdy').appendChild(block);
        /*gives the block a random top or just (-20px) if rain i.e the blocks are falling too fast, 
        never occurs: 
        !important since the css @keyframes is animating it already.*/
        block.style.top = rain == 0 ? rnd(4)*-20+'px' : '-20px';
        // leting the blocks speed increase overtime.
        block.style.animationDuration = block_timer/200+'s';
        //a binary-like tenary operator that gives a random value to the block's left or right side.
        rnd(7) >3 ? block.style.left = rnd(5)*20+'px' : block.style.right = rnd(5)*20 + 'px';
    }
} 

//generates life.
function generate_life(){
    var lf = document.createElement('div');
    lf.setAttribute('class', 'lfs');
    //gives an animated life to the created life container.
    lf.innerHTML = '<svg width="100%" height="100%" viewBox="0, 0, 30, 30"><circle r="12" cx="15" cy="15" stroke="rgb(0, 0, 0, 0.12)" stroke-width="2" fill="none"/><circle class="cir-lf" r="12" cx="15" cy="15" stroke="#090" stroke-width="2" fill="none" stroke-dasharray="75.398"/></svg><svg width="15px" height="15px" style="position: absolute; top: 7.5px; left: 7.5px"><path fill="tomato" d="M 7.5 15 C -7.5 0 7.5 0 7.5 3 C 7.5 0 22.5 0 7.5 15"/></svg>';
    id('bdy').appendChild(lf);
    //randomize only the left value since i want it to appear only at the top.
    lf.style.left = rnd(80) + '%';
    //remove the life after ten seconds.
    setTimeout(function(){
        for(var e=0; e<document.getElementsByClassName('lfs').length;e++){
            document.getElementsByClassName('lfs')[e].remove()
        }
        
        //making sure that the life is removed after 10.03 seconds.
        setTimeout(function(){
            for(var e=0; e<document.getElementsByClassName('lfs').length;e++){
                document.getElementsByClassName('lfs')[e].remove()
            }
            for(var e=0; e<document.getElementsByClassName('lfs').length;e++){
                document.getElementsByClassName('lfs')[e].remove()
            }
        }, 70)
    }, 10000)
}

// One of the functions which helps start the game: focus -> tells the blocks to/not to fall. 
function start(){
    var strt_set = setInterval(start1, 10);
    var gnrt_block_set = setInterval(generate_block, block_timer);
    var a = document.getElementsByClassName('obj'), i = 0;
    function start1(){
        if(is_on === 1){
            if(block_timer > 180){
                block_timer = block_timer - 0.1;
                rain = 0;
            } else {
                block_timer = block_timer;
                rain = 1;
            }
        } else {
            clearInterval(strt_set);
            clearInterval(gnrt_block_set)
            for(i; i<a.length; i++){
                a[i].style.animationPlayState = 'paused';
            }
        }
    }
}

//Does it's name: cannot be called when online.
function play(){
    if(play_status == 0){
        //start playing once on each game instance.
        is_on = 1;
        hide_offline_icon()
        start()
        continous()
        id('play_pause').innerHTML = 'pause';
        id('l1').style.animationDuration = '.3s';
        id('until-finish').style.animation = 'until-finish_anim ' + time_dur2 + 's linear 1 forwards paused';
        id('time').style.animation = 'time_anim ' + time_dur + 's linear 1 forwards paused';
        id('until-finish').style.animationPlayState = 'running';
        id('service_in').unpauseAnimations();
        id('icon-time').pauseAnimations()
        play_status = 2;
    } else if(play_status == 2){
        //Pauses the game.
        is_on = 0;
        id('play_pause').innerHTML = 'continue';
        id('l1').style.animationDuration = '3s';
        id('time').style.animationPlayState = 'paused';
        id('until-finish').style.animationPlayState = 'paused';
        id('service_in').pauseAnimations();

        play_status = 3;
    } else {
        //continues the game.
        is_on = 1;
        start()
        var a = document.getElementsByClassName('obj'), i = 0;
        for(i; i<a.length; i++){
            a[i].style.animationPlayState = 'running';
        }
        id('play_pause').innerHTML = 'pause';
        id('l1').style.animationDuration = '.3s';
        id('until-finish').style.animationPlayState = 'running';
        id('service_in').unpauseAnimations();
        if(is_offline === 1){
            id('time').style.animationPlayState = 'running';
        }
        play_status = 2;
    }
}

function move(e){
    speed = 3000/block_timer;
    switch(e){
        case 'right' : move_right();
        break;
        case 'left': move_left();
        break;
        case 'up' : move_up();
        break;
        case 'down': move_down();
        break;
        default: // window.location.reload(): Hope this never gets executed lol.
    }
}

//Beautiful calls to move that respects the borders.
function move_right(){
    if(move_hor_num >= (gc('bdy', 2)-gc('fig', 4) -5)){
        move_hor_num = move_hor_num;
    } else {
        move_hor_num+=speed;
    }
    id('fig').style.left = as_percent(move_hor_num, gc('bdy', 4)).toFixed(0)+ '%';
}

function move_left(){
    if(move_hor_num <= (gc('bdy', 0) + 5)){
        move_hor_num = move_hor_num;
    } else {
        move_hor_num-=speed;
    }
    id('fig').style.left = as_percent(move_hor_num, gc('bdy', 4)).toFixed(0)+ '%';
}

function move_up(){
    var max_move_ver_num = (is_big == true ? gc('bdy', 7)-(5 + gc('fig', 7)) : gc('bdy', 7)-(gc('tops', 7) + 5 + gc('fig', 7)));
    if(move_ver_num >= max_move_ver_num){
        move_ver_num = move_ver_num;
    } else {
        move_ver_num+= (speed/2);
    }
    id('fig').style.bottom = as_percent(move_ver_num, gc('bdy', 7)).toFixed(0) + '%';
}

function move_down(){
    if(move_ver_num <= 5){
        move_ver_num = move_ver_num;
    } else {
        move_ver_num-= (speed/4);
    }
    id('fig').style.bottom = as_percent(move_ver_num, gc('bdy', 7)).toFixed(0) + '%';
}

//computes a percentage value with its arguments.
function as_percent(a, b){
    return (a*100)/b;
}

// make the window appear in fullscreen mode. 
function enter_full_screen(){
    if(sc.requestFullscreen){
        sc.requestFullscreen();
    } else if(sc.mozRequestFullScreen){
        sc.mozRequestFullScreen();
    } else if(sc.webkitRequestFullScreen){
        sc.webkitRequestFullScreen();
    } else if(sc.msRequestFullScreen){
        sc.msRequestFullScreen()
    } else {
        // pass
    }
}

//Houses a crazy function but is called just once per game instance.
function continous(){
    var fig = id('fig'), bdy_c = id('bdy').getBoundingClientRect().bottom,  obj = document.getElementsByClassName('block'), obj_num = 0, lf_num, lf_name = document.getElementsByClassName('lfs'), a = setInterval(continous1, 10);

    //Gets continously executed once the game is being played: Continous1 -> The epicenter of lags on low RAM devices.
    function continous1(){
        if(is_on === 1){
            //loop through all instance of the falling meteor: loops & DOM -> eats memory.
            for(obj_num = 0; obj_num<obj.length; obj_num++){
                if(has_ended === 1){
                    obj[obj_num].remove()
                }
                //removing the blocks.
                if(obj[obj_num].getBoundingClientRect().top >= bdy_c+300){
                    obj[obj_num].remove()
                }

                //listening for kills to perform some actions.
                if(is_touching(obj[obj_num], fig) && (gc2(obj[obj_num], 'w') > 5)){
                    obj[obj_num].remove()
                    //sparing the high ranking officer!
                    if(is_marshal === 1){
                        remove_life(5)
                    } else {
                        remove_life(35)
                    }
                }
            }

            for(lf_num = 0; lf_num < lf_name.length; lf_num++){
                if(is_touching(lf_name[lf_num], fig)){
                    if(is_marshal === 1){
                        add_life(50)
                    } else {
                        add_life(35)
                    }
                    //trying to remove the life after its been taken.
                    document.getElementsByClassName('lfs')[lf_num].remove()
                }
            }
        }
        
        // coloring the life
        if(num_of_life >= 100){
            id('life').style.backgroundColor =  'rgba(80, 223, 80, 0.9)';
        } else if(num_of_life >= 50 && num_of_life < 99){
            id('life').style.backgroundColor =  'rgba(214, 148, 60, 0.9)';
        } else if(num_of_life < 50 && num_of_life > 1){
            id('life').style.backgroundColor =  'rgba(214, 70, 60, 0.9)';
        } else {
            //You died!
            completed(0)
            clearInterval(a)
        }
        
        if((id('until-finish').getBoundingClientRect().width) <= 0 && (id('time').getBoundingClientRect().width) >= 0) {
            //package explodes.
            completed(1)
            clearInterval(a)
        }
        
        if((id('time').getBoundingClientRect().width) <= 0 && (id('until-finish').getBoundingClientRect().width) > 0 && is_offline === 1){
            //you won
            completed(2)
            clearInterval(a)
        }
    }
}
//Just left the worst most important function in the entire game.

//Returns a promotion as you'ld guess.
function promote(){
    var a;
    if(rank < rankings.length-1){
        a = 'Congratulations! The bomb was succesfully defused before it\'s timer expires.<br><br> Because of your bravery and inteligence, the President is promoting your rank from \''+ rankings[rank] +'\' to \'' + rankings[rank+1] + '\'.';
        rank++;
    } else if(rank === rankings.length-1){
        a = 'Because of your bravery and inteligence, the President, inline with advice from the UN, Command Center and Armed Service Commitee, is promoting your rank from \''+ rankings[rank] +'\' to \'' + rankings[rank+1] + '\'.<br />As \''+ rankings[rank] +'\' you have special abilities, please make good use of them.<br /> You are now our only hope for survival Sir, please do not fail us';
        rank++;
        is_marshal = 1;
    } else if(rank === rankings.length){
        a = 'Divide and Conquer Sir!<br /><br>You\'re truly worthy of your rank.<br><br>May HERMES be with you.'
        rank = rank;
    }
    return a
}

//lol
function demote(){
    var a;
    if(rank === 0){
        a = 'You happened to die of plane crash due to excessive hits from enemy meteor rocks!<br />You must avoid the hits and get lifes to succeed \'Cadet\'.';
        rank = 0;
    } else if((rank >= 1) && (rank < rankings.length) ){
        a = 'You happened to die of plane crash due to excessive hits from enemy meteor rocks!<br /><br>As a result we have demoted you from \''+ rankings[rank] +'\' to \'' + rankings[rank-1] + '\'.<br /><br> You must avoid the hits and get lifes to succeed and also keep your eyes peeled to avoid further demotions.<br><br>Note that a cool feature awaits you as a \'Marshal Of The Air Force\'';
        rank--;
    } else if(rank === rankings.length){
        rank = 0;
        is_marshal = 0;
        a = 'This is outrageous Sir! You happened to die of plane crash due to excessive hits from enemy meteor rocks!<br /><br>As a result we are very sorry to let you know that your rank is no longer yours, the order for your demotion came from the president himself, you\'re now a \''+ rankings[rank] +'\'.<br /><br>As a field marshal, you have more than enough equips to facilitate your victory but you chose to loose, this is an act of treason but the Command Center considered your position.<br />Good luck \'Cadet\'';

    }
    return a
}

//lets leave this variable and object here! man: rankings -> an array of ranks.
var rank = 0, rankings = [
    'Flight Cadet',
    'Pilot Officer',
    'Flying Officer',
    'Flight Lieutenant',
    'Squadron leader',
    'Wing Commander',
    'Group Captain',
    'Air Commodore',
    'Air Vice-Marshal',
    'Air Marshal',
    'Air Chief Marshal',
    'Marshal Of The Air Force'
];

//Tells when an object touches another, called just twice only at continous
function is_touching(o, f){
    if((gc2(f, 'r') >= (gc2(o, 'l')) && (gc2(f, 'l') <= (gc2(o, 'r')) && gc2(f, 't') <= (gc2(o, 'b') ) && gc2(f, 'b') >= (gc2(o, 't'))))){
        return true
    } else {
        return false
    }
}

//removes your life and delay the hacking progress.
function remove_life(e){
    if(rem_life_num === 1){
        if(is_marshal === 1){
            if(num_of_life >= 5){
                num_of_life = num_of_life - 5;
            } else {
                num_of_life = 0;
            }
        } else {
            num_of_life = num_of_life >= 50 ? num_of_life-e : 0;
        }
        time_dur += is_marshal === 1 ? 5 : time_dur_new;
        id('time').style.animationDuration = time_dur + 's';
        id('life').style.width = num_of_life + '%';
        rem_life_num = 0;
    }
    //makes sure that only one life is removed per hit.
    setTimeout(function(){
        rem_life_num = 1;
    }, block_timer/2)
}

//,,+
function add_life(e){
    if(add_life_num === 1){
        num_of_life = num_of_life <= 50 ? num_of_life + e : 100;
        time_dur -= is_marshal === 1 ? time_dur_new*2 : time_dur_new;
        id('time').style.animationDuration = time_dur + 's';
        id('life').style.width = num_of_life + '%';
        add_life_num = 0;
    }
    //makes sure that only one life is added per hit.
    setTimeout(function(){
        add_life_num = 1;
    }, block_timer/2)
}

function completed(e){
    has_ended = 1;
    is_offline = 0;
    _interval()
    id('icon-time').pauseAnimations()
    is_on = 0;
    var notify = document.createElement('div'), notif_text;
    var cl_obj = document.getElementsByClassName('obj');
    for(var i=0;i<cl_obj.length;i++){
        cl_obj[i].style.opacity = 0;
        cl_obj[i].remove();
    }

    if(e === 0){
        //you died!
        notif_text = 'YOU DIED!';
        id('final_tops_a').innerHTML = rankings[rank] + ' We lost the war!';
        id('final_info').innerHTML = demote()
        id('final_downs').children[0].innerHTML = 'We can\'t just let them escape with this. <br>Start your engine now and REVENGE!';
        id('text_distort').innerHTML = 'REVENGE!';        
    } else if(e === 1){
        //bomb exploded!
        notif_text = 'YOU LOST!';
        id('final_tops_a').innerHTML = rankings[rank] + ' We lost the war!';
        id('final_info').innerHTML = 'You happened to die from explotion of the package due to your inability to detonate the bomb before it\'s timer reaches zero!<br /><br />You must get lifes to help increase your hacking speed.<br /><br />At least 2 untainted lives are needed to finish the detonation before the bomb explodes(so getting 5 lives and 3 hits is not bad).';
        id('final_downs').children[0].innerHTML = 'We cant just let them escape with this. <br>Start your engine now and RETRY!';
        id('text_distort').innerHTML = 'RETRY!';
    } else {
        //you won!.
        notif_text = 'YOU WON!';
        id('final_tops_a').innerHTML = rankings[rank] + ' Congrats we won';
        id('final_info').innerHTML = promote();
        id('final_downs').children[0].innerHTML = 'Another helicopter was attacked, let\'s DIVIDE AND RULE!';
        id('text_distort').innerHTML = 'DIVIDE AND RULE!';
    }
    
    // 1/12
    id('_progress').innerHTML = (rank+1)+'/'+rankings.length;
    notify.setAttribute('class', 'notify');
    notify.innerHTML = '<svg width="150px" height="150px"><circle class="notify_svg_circle" stroke-width="5" stroke-dasharray="472" stroke-linecap="round" cx="75" cy="75" r="70"/><text class="notify_svg_text" x="75" y="90" text-anchor="middle" textLength="120px" lengthAdjust="spacingAndGlyphs">'+ notif_text +'</text></svg>';
    document.body.appendChild(notify);
    setTimeout(function(){
        notify.remove()
        show_result()
    }, 5000)
}

function show_result(){
    id('final_sect').style.display = 'block';
    var cl_obj = document.getElementsByClassName('obj');
    for(var i=0;i<cl_obj.length;i++){
        cl_obj[i].style.opacity = 0;
        cl_obj[i].remove();
    }

    setTimeout(function(){
        id('final_sect').style.opacity = '1';
        setTimeout(function(){
            id('final_tops').style.transform = 'rotateX(0deg)';
            id('final_tops').style.top = '0%';
            id('final_downs').style.transform = 'rotateX(30deg)';
        }, 800)
    }, 500)    
}

//This function restores almost everything to it's initial value, making it possible for us to restart the game without having to reload the entire page.
function clean(){
    var cl_obj = document.getElementsByClassName('obj');
    for(var i=0;i<cl_obj.length;i++){
        cl_obj[i].style.opacity = 0;
        cl_obj[i].remove();
    }
    id('until-finish').style.animation = 'none';
    id('time').style.animation = 'none';
    id('play_pause').innerHTML = 'play';
    id('l1').style.animationDuration = '3s';
    play_status = 0;
    block_timer = 1500;
    has_ended = 0;
    add_life(100)
    num_of_life = 100;
    time_dur = 90;
    time_dur2 = 165;
    move_hor_num = gc('bdy', 4)/2-gc('fig', 4)/2;
    id('fig').style.left = move_hor_num + 'px';
    move_ver_num = 5;
    id('fig').style.bottom = move_ver_num + 'px';
    ;
    hide_offline_icon()
}

function try_again(){
    id('final_tops').style.transform = 'rotateX(180deg)';
    id('final_tops').style.top = '0%';
    id('final_downs').style.transform = 'rotateX(-180deg)';
    setTimeout(function(){
        id('final_sect').style.opacity = '0';
        setTimeout(function(){
            id('final_sect').style.display = 'none';
            clean()
            id('service').children[0].remove();
            id('play_pause').style.display = 'block';
        }, 800)
    }, 1000)
}

function display_offline_icon(){
    id('is_offline').style.display = 'block';
    id('service_in').pauseAnimations();
}

function hide_offline_icon(){
    id('is_offline').style.display = 'none';
    id('service').innerHTML = '<svg id="service_in" width="70px" height="30px"><path fill="none" stroke="white" stroke-width="2" d="m 4 2 h 16 l -8 9 v-8 v 24 M 4 2 l 8 9" stroke-linejoin="round" stroke-linecap="round"/><path style="fill: rgba(14, 26, 43, 0.534)" d="m 20 18 l 46 -18 v 26 l -46 0"/><defs><clipPath id="clips" clipPathUnits = "userSpaceOnUse" externalResourcesRequired = "true"><path fill="green" stroke="white" stroke-width="1" d="m 20 18 l 46 -18 v 26 l -46 0"/></clipPath></defs><rect class="rect_service" x="20" y="2" width="46" height="26" fill="whitesmoke" stroke="whitesmoke" stroke-linejoin="round" style="clip-path: url(#clips); -webkit-clip-path: url(#clips); -moz-clip-path: url(#clips);"><animate attributeName="width" from="46" to="0" dur="'+ time_dur_service +'s" fill="freeze" repeatCount="1" onend="display_offline_icon(); show_message()"/></rect></svg>';
    
    id('service_in').pauseAnimations();
}

function show_message(){
    is_offline = 1;
    id('show_msg').style.left = '0%';
    setTimeout(function(){
        id('show_msg').style.left = '-150%';
    }, 6000)
    id('play_pause').style.display = 'none';
    _interval()
    id('time').style.animationPlayState = 'running';
    id('icon-time').unpauseAnimations()
}

// Generates the lives.
function _interval(){
    var ef = setInterval(gen, block_timer*20);
    function gen(){
        if(is_on === 1 && is_offline === 1){
            generate_life()
        } else {
            clearInterval(ef)
        }
    }
}
