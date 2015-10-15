window.onload = function() {

	var box = document.getElementById('box');
	var playground = document.getElementById('playground');
	var labirinth = document.getElementById('labyrinth');
	var btn_start = document.createElement('button');
	var lion_img = document.getElementById('lion');
	btn_start.setAttribute("id", "btn-start");
	btn_start.setAttribute("type", "button");
	btn_start.setAttribute('class', 'game-not-started');
	btn_start.innerHTML = 'Start';
	box.insertBefore(btn_start, playground);

	btn_start.addEventListener('click', function(){
		if (this.getAttribute('class') == 'game-not-started'){
			start_game();
			this.removeAttribute('class', 'game-not-started');
			this.setAttribute('class', 'game-started');
			this.innerHTML = 'Stop';
		}
		else{
			stop_game();
			this.removeAttribute('class', 'game-started');
			this.setAttribute('class', 'game-not-started');
			this.innerHTML = 'Start';
		}
	});

	function start_game(){
		lion_img.src = "img/mouse2.gif";
		lion_set_size();
		create_walls();
		// track mouse movements inside div
		playground.onmouseover = function playground_mouseover_event(){
			if (btn_start.getAttribute('class') == 'game-started')
				playground.style.cursor = 'none';		
		};
		// change picture position to cursor position
		playground.onmousemove = function playground_mousemove_event(event) {
			lion_set_position(event.pageX, event.pageY);
		};
		// change to cursor outside of playground
		playground.onmouseout = function remove_event(){
			playground.style.cursor = 'auto';
		};
		// mousover event for labirinth
		labirinth.onmouseover = function labirinth_mouseover_event(){
			// track mouse movements inside labirinth
			console.log('mouse on labirinth!');
		};
		
	}

	function stop_game(){
		reset_lion();
		playground.onmousemove = remove_event();
		playground.onmousemove = remove_event();
		labirinth.onmouseover = remove_event();
	}

	// set initial size of the lion img
	function lion_set_size(){
		lion_img.style.width = '20px';
		lion_img.style.height = "auto";
	};
	// resize lion img when lvl increases
	function lion_increase_size(multiplier){
		lion_img.style.width = lion_img.width * multiplier + 'px';
	};
	// set lion img coordinates
	function lion_set_position(x, y){
		lion_img.style.left = x + 'px';
		lion_img.style.top = y + 'px';
		// debugging
		// console.log(lion_img.style.left + ' ' + lion_img.width);
		// console.log(lion_img.style.top + ' ' + lion_img.height);
	};

	function playground_mousemove_event(event) {
		lion_set_position(event.pageX, event.pageY);
	};
	// change to cursor outside of playground
	function remove_event(){
		playground.style.cursor = 'auto';
	};
	// mousover event for labirinth
	function labirinth_mouseover_event(){
		// track mouse movements inside labirinth
		console.log('mouse on labirinth!');
	};

	function reset_lion(){
		lion_img.src = 'img/lion_colored.png';
		lion_img.style.width = '180px';
		lion_img.style.height = 'auto';
		lion.style.top=(playground.offsetTop+playground.offsetHeight*0.22)+"px";
		lion.style.left=(playground.offsetLeft+playground.offsetWidth*0.010416667)+"px";
	}

	// create virtual labyrinth walls
	function create_walls(){
		
		var walls = document.createElement('div');
		walls.setAttribute('class', 'walls');
		// walls.style.display = 'inline';
		walls.style.position = 'absolute';
		playground.insertBefore(walls, playground.lastChild);

		var top_walls = document.createElement('div');
		top_walls.setAttribute('class', 'top-walls');
		top_walls.style.position = 'absolute';
		top_walls.style.zIndex = '2';
		walls.appendChild(top_walls);

		var bottom_walls = document.createElement('div');
		bottom_walls.setAttribute('class', 'bottom-walls');
		bottom_walls.style.zIndex = '1';
		walls.appendChild(bottom_walls);
		

		
		labirinth.style.position = 'absolute';
		labirinth.style.zIndex = '0';

		// setting top left wall
		var wall_top_left = document.createElement('div');
		wall_top_left.setAttribute('class', 'wall');
		wall_top_left.style.marginLeft = '213px';	
		wall_top_left.style.height = '152px';
		wall_top_left.style.width = '191px';
		wall_top_left.style.zIndex = '2';
		wall_top_left.style.backgroundColor = 'olive';
		wall_top_left.style.display = 'inline-block';
		wall_top_left.style.position = 'absolute';
		top_walls.appendChild(wall_top_left);

		// setting top middle wall
		var wall_top_mid = document.createElement('div');
		wall_top_mid.setAttribute('class', 'wall');
		wall_top_mid.style.marginLeft = '404px';	
		wall_top_mid.style.height = '347px';
		wall_top_mid.style.width = '212px';
		wall_top_mid.style.zIndex = '2';
		wall_top_mid.style.backgroundColor = 'olive';
		wall_top_mid.style.display = 'inline-block';
		wall_top_mid.style.position = 'absolute';
		top_walls.appendChild(wall_top_mid);

		// setting top right wall
		var wall_top_right = document.createElement('div');
		wall_top_right.setAttribute('class', 'wall');
		wall_top_right.style.marginLeft = '616px';	
		wall_top_right.style.height = '50px';
		wall_top_right.style.width = '234px';
		wall_top_right.style.zIndex = '2';
		wall_top_right.style.backgroundColor = 'olive';
		wall_top_right.style.display = 'inline-block';
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
		wall_bot_left.style.zIndex = '1';
		wall_bot_left.style.backgroundColor = 'olive';
		wall_bot_left.style.display = 'inline-block';
		wall_bot_left.style.position = 'absolute';
		bottom_walls.appendChild(wall_bot_left);

		// setting bottom middle wall
		var wall_bot_mid = document.createElement('div');
		wall_bot_mid.setAttribute('class', 'wall');
		wall_bot_mid.style.marginLeft = '372px';
		wall_bot_mid.style.marginTop = '376px';	
		wall_bot_mid.style.height = '104px';
		wall_bot_mid.style.width = '289px';
		wall_bot_mid.style.zIndex = '1';
		wall_bot_mid.style.backgroundColor = 'olive';
		wall_bot_mid.style.display = 'inline-block';
		wall_bot_mid.style.position = 'absolute';
		bottom_walls.appendChild(wall_bot_mid);

		// setting bottom bottom wall
		var wall_bot_mid = document.createElement('div');
		wall_bot_mid.setAttribute('class', 'wall');
		wall_bot_mid.style.marginLeft = '661px';
		wall_bot_mid.style.marginTop = '124px';	
		wall_bot_mid.style.height = '356px';
		wall_bot_mid.style.width = '193px';
		wall_bot_mid.style.zIndex = '1';
		wall_bot_mid.style.backgroundColor = 'olive';
		wall_bot_mid.style.display = 'inline-block';
		wall_bot_mid.style.position = 'absolute';
		bottom_walls.appendChild(wall_bot_mid);


	}

	function getPosition(element) {
    	var x_coordinate = 0;
    	var y_coordinate = 0;
    	while(element) {
	        x_coordinate += (element.offsetLeft - element.scrollLeft + element.clientLeft);
	        y_coordinate += (element.offsetTop - element.scrollTop + element.clientTop);
	        element = element.offsetParent;
    	}
    	return { x: x_coordinate, y: y_coordinate };
	}
}
