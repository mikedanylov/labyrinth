window.onload = function() {

    var box = document.getElementById('box');
    var playground = document.getElementById('playground');
    var labyrinth = document.getElementById('labyrinth');
    var btn_mode_1 = document.createElement('button');
    var btn_mode_2 = document.createElement('button');
    var lion_img = document.getElementById('lion');
    var finish_line = document.createElement('img');
    var instructions = document.createElement('span');
    var game_title = document.createElement('h2');
    var brake = document.createElement('br');
    
    game_title.innerHTML = 'Labyrinth Game'; 
    box.insertBefore(game_title, playground);
    box.insertBefore(instructions, playground);
    create_button(btn_mode_1, 'btn-mode-1', 'Start first mode');
    create_button(btn_mode_2, 'btn-mode-2', 'Start second mode');
    box.insertBefore(brake, playground);
    box.insertBefore(brake.cloneNode(true), playground);
    reset_lion();
    create_walls();
    create_finish_line();
    var walls = document.getElementsByClassName('wall');
    instructions.style.display = 'block';
    instructions.style.width = '400px';
    instructions.style.height = 'auto';
    instructions.innerHTML = '<br>Once you press Start button the lion will turn into small mouse which you should navigate using mouse pointer to the finish through the labyrinth.<br><br>But beware, because none of the labyrinth walls should be touched by mouse!<br><br>'
    btn_mode_1.addEventListener('click', start);
    btn_mode_2.addEventListener('click', start_random_walk);


    // # TESTING ################################

    // var clone = lion_img.cloneNode(true);
    // clone.style.position = 'absolute';
    // clone.setAttribute('id', 'clone');
    // playground.appendChild(clone);

    // START and STOP game ##################################################### 
    function start_game(){
        lion_img.src = "http://iconbug.com/data/66/300/197360e06b3a07dedf956f35ab5bfcbc.png";
        img_set_size(lion_img);
        playground.addEventListener('mouseover', playground_mouseover);
        playground.addEventListener('mousemove', playground_mousemove);
        playground.addEventListener('mouseout', playground_mouseout);
        labyrinth.addEventListener('mouseover', labyrinth_mouseover);
        finish_line.addEventListener('mouseover', finish_mouseover);
    }

    function stop_game(){
        reset_lion();
        btn_mode_1.removeAttribute('class', 'game-started');
        btn_mode_1.setAttribute('class', 'game-not-started');
        btn_mode_1.innerHTML = 'Start first mode';
        playground.removeEventListener('mouseover', playground_mouseover);
        playground.removeEventListener('mousemove', playground_mousemove);
        finish_line.removeEventListener("mouseover", finish_mouseover);
    }

    var interval;
    function start_random_walk_game(){
        interval = setInterval(function(){
            make_step();
            if(is_overlapping(lion_img, finish_line)){
                clearInterval(interval);
                alert('Congratulations! You won!\n\n Press Start to try again :)');
                stop_random_walk_game();
            }
        }, 200);
    }

    function stop_random_walk_game(){
        clearInterval(interval);
        reset_lion();
        btn_mode_2.removeAttribute('class', 'game-started');
        btn_mode_2.setAttribute('class', 'game-not-started');
        btn_mode_2.innerHTML = 'Start second mode';
    }

    // #########################################################################

    // EVENT HANDLERS ##########################################################
    
    // detect when lion enters labyrinth
    function labyrinth_mouseover(e){
        e.target.removeEventListener(e.type, arguments.callee);
    }

    // stop the game when cursor reaches finish line
    function finish_mouseover(e){
        alert('Congratulations! You won!\n\n Press Start to try again :)');
        e.target.removeEventListener(e.type, arguments.callee);
        stop_game();
    }

    // change cursor when on playground and game started
    function playground_mouseover(){
        if (btn_mode_1.getAttribute('class') == 'game-started')
            playground.style.cursor = 'none';
        else
            playground.style.cursor = 'auto';   
    };

    // change picture position to cursor position
    function playground_mousemove(event) {
        if (btn_mode_1.getAttribute('class') == 'game-started'){
            lion_set_position(event.pageX, event.pageY);

            // stop the game when mouse moved over any wall
            // check if lion img overlapping any wall after it have moved
            for (var i = 0; i < walls.length; i++){
                // console.log(walls[i]);
                if (is_overlapping(lion_img, walls[i])){
                    btn_mode_1.removeAttribute('class', 'game-started');
                    btn_mode_1.setAttribute('class', 'game-not-started');
                    stop_game();
                    alert("Game Over! :(\nPress Start button to try again.\n\nNotice: you are not supposed to touch walls of the labyrinth");
                    btn_mode_1.innerHTML = 'Start first mode';
                }
            }
        }
    };

    // change to cursor outside of playground
    function playground_mouseout(){
        playground.style.cursor = 'auto';
    };

    // Start/Stop button click
    function start(){
        if (btn_mode_1.getAttribute('class') == 'game-not-started'){
            btn_mode_1.removeAttribute('class', 'game-not-started');
            btn_mode_1.setAttribute('class', 'game-started');
            stop_random_walk_game();
            start_game();
            btn_mode_1.innerHTML = 'Stop first mode';
        }
        else
            stop_game();
    };

    function start_random_walk(){
        stop_game();
        lion_img.src = "http://iconbug.com/data/66/300/197360e06b3a07dedf956f35ab5bfcbc.png";
        img_set_size(lion_img);

        if (btn_mode_2.getAttribute('class') == 'game-not-started'){
            btn_mode_2.removeAttribute('class', 'game-not-started');
            btn_mode_2.setAttribute('class', 'game-started');
            start_random_walk_game();
            btn_mode_2.innerHTML = 'Stop second mode';
        }
        else
            stop_random_walk_game();
    }
    // END EVENT HANDLERS ######################################################

    // OTHER SUBRUTINES ########################################################

    function make_step(){

        var directions_list = ['left', 'up', 'right', 'down'];
        var step_size = 10;
        var selection;
        var left;
        var top;
        var walls_overlap = false;
        var playground_overlap = true;

        do{
            selection = directions_list[Math.floor(Math.random() * directions_list.length)];
            console.log('selection: ' + selection);
            left = parseFloat(lion_img.style.left);
            top = parseFloat(lion_img.style.top);
            switch(selection){
                case 'left':
                    // make it move left less
                    left = left - step_size + 5;
                    lion_img.style.left = left + 'px';
                    break;
                case 'up':
                    top = top - step_size;
                    lion_img.style.top = top + 'px';
                    break;
                case 'right':
                    // make it move right more
                    left = left + step_size  + 7;
                    lion_img.style.left = left + 'px';
                    break;
                case 'down':
                    top = top + step_size;
                    lion_img.style.top = top + 'px';
                    break;
            }
            walls_overlap = false;
            // console.log(walls);
            for(var i = 0; i < 6; i++){
                // console.log(walls[i]);
                if (is_overlapping(lion_img, walls[i])){
                    walls_overlap = true;
                    break;
                }
            }
            if (is_overlapping(lion_img, playground))
                playground_overlap = true;
            else
                playground_overlap = false;
            console.log('playground_overlap: ' + playground_overlap);
            console.log('walls_overlap: ' + walls_overlap);

            if (playground_overlap == false || walls_overlap == true){
                switch(selection){
                    case 'left':
                        // make it move left less
                        left = left + step_size - 5;
                        lion_img.style.left = left + 'px';
                        break;
                    case 'up':
                        top = top + step_size;
                        lion_img.style.top = top + 'px';
                        break;
                    case 'right':
                        // make it move right more
                        left = left - step_size - 7;
                        lion_img.style.left = left + 'px';
                        break;
                    case 'down':
                        top = top - step_size;
                        lion_img.style.top = top + 'px';
                        break;
                }
            }
        }while(walls_overlap == true || playground_overlap == false);
    }

    function create_button(btn, id, text){
        btn.setAttribute("id", id);
        btn.setAttribute("type", "button");
        btn.setAttribute('class', 'game-not-started');
        btn.innerHTML = text;
        btn.style.display = 'inline-block';
        box.insertBefore(btn, playground);
        btn.style.marginLeft = "30px";
    }

    // set initial size of the lion img
    function img_set_size(obj){
        obj.style.zIndex = 10;
        obj.style.width = '10px';
        obj.style.height = "auto";
    };
    // resize lion img to increase difficulty level
    function lion_increase_size(multiplier){
        lion_img.style.width = lion_img.width * multiplier + 'px';
    };
    // set lion img coordinates
    function lion_set_position(x, y){
        lion_img.style.left = x + 'px';
        lion_img.style.top = y + 'px';
    };

    function reset_lion(){
        lion_img.src = 'img/lion_colored.png';
        lion_img.style.width = '180px';
        lion_img.style.height = 'auto';
        lion.style.top=(playground.offsetTop+playground.offsetHeight*0.3)+"px";
        lion.style.left=(playground.offsetLeft+playground.offsetWidth*0.01)+"px";
    }

    // create virtual labyrinth walls
    function create_walls(){

        labyrinth.style.position = 'absolute';
        
        // create container for simulated labyrinth
        var walls = document.createElement('div');
        walls.setAttribute('class', 'walls');
        walls.style.position = 'absolute';
        playground.insertBefore(walls, playground.lastChild);

        // create container for top walls
        var top_walls = document.createElement('div');
        top_walls.setAttribute('class', 'top-walls');
        top_walls.style.position = 'absolute';
        walls.appendChild(top_walls);

        // create container for bottom walls
        var bottom_walls = document.createElement('div');
        bottom_walls.setAttribute('class', 'bottom-walls');
        walls.appendChild(bottom_walls);

        // setting top left wall
        var wall_top_left = document.createElement('div');
        wall_top_left.setAttribute('class', 'wall');
        wall_top_left.style.marginLeft = '213px';   
        wall_top_left.style.height = '152px';
        wall_top_left.style.width = '191px';
        wall_top_left.style.position = 'absolute';
        top_walls.appendChild(wall_top_left);

        // setting top middle wall
        var wall_top_mid = document.createElement('div');
        wall_top_mid.setAttribute('class', 'wall');
        wall_top_mid.style.marginLeft = '404px';    
        wall_top_mid.style.height = '347px';
        wall_top_mid.style.width = '212px';
        wall_top_mid.style.position = 'absolute';
        top_walls.appendChild(wall_top_mid);

        // setting top right wall
        var wall_top_right = document.createElement('div');
        wall_top_right.setAttribute('class', 'wall');
        wall_top_right.style.marginLeft = '616px';  
        wall_top_right.style.height = '50px';
        wall_top_right.style.width = '234px';
        wall_top_right.style.position = 'absolute';
        wall_top_right.style.borderTopRightRadius = '73px';
        top_walls.appendChild(wall_top_right);

        // setting bottom left wall
        var wall_bot_left = document.createElement('div');
        wall_bot_left.setAttribute('class', 'wall');
        wall_bot_left.style.marginLeft = '213px';
        wall_bot_left.style.marginTop = '193px';    
        wall_bot_left.style.height = '287px';
        wall_bot_left.style.width = '159px';
        wall_bot_left.style.position = 'absolute';
        bottom_walls.appendChild(wall_bot_left);

        // setting bottom middle wall
        var wall_bot_mid = document.createElement('div');
        wall_bot_mid.setAttribute('class', 'wall');
        wall_bot_mid.style.marginLeft = '372px';
        wall_bot_mid.style.marginTop = '376px'; 
        wall_bot_mid.style.height = '104px';
        wall_bot_mid.style.width = '289px';
        wall_bot_mid.style.position = 'absolute';
        bottom_walls.appendChild(wall_bot_mid);

        // setting bottom right wall
        var wall_bot_right = document.createElement('div');
        wall_bot_right.setAttribute('class', 'wall');
        wall_bot_right.style.marginLeft = '661px';
        wall_bot_right.style.marginTop = '124px';   
        wall_bot_right.style.height = '356px';
        wall_bot_right.style.width = '193px';
        wall_bot_right.style.position = 'absolute';
        bottom_walls.appendChild(wall_bot_right);
    }

    function create_finish_line(){
        finish_line.src = "http://zaglara.com/wp-content/uploads/2015/06/wavy-checkered-flag-md.png";
        finish_line.setAttribute("id", "finish");
        finish_line.style.marginLeft = '800px';
        finish_line.style.marginTop = '57px';   
        finish_line.style.height = '55px';
        finish_line.style.width = 'auto';
        finish_line.style.position = 'absolute';
        finish_line.style.zIndex = '10';
        playground.appendChild(finish_line);
    }

    function get_position(element) {
        var x_coordinate = 0;
        var y_coordinate = 0;
        while(element) {
            x_coordinate += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            y_coordinate += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return { x: x_coordinate, y: y_coordinate };
    }

    function is_overlapping(obj1, obj2){

        var rect1 = obj1.getBoundingClientRect();
        var rect2 = obj2.getBoundingClientRect();
        var overlapping = false;

        if (rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom)
            overlapping = false;
        else
            overlapping = true;
        // console.log(overlapping);
        return overlapping;
    }
}

// ##############################################################################