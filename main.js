window.onload = function() {
	var lion_img = document.getElementById('lion');
	console.log();

	lion_set_size();
	
	// track mouse movements
	document.onmousemove = function(event) {
        lion_set_position(event.pageX, event.pageY);
    };

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
		lion_img.style.left = x + lion_img.width / 2 + 'px';
		lion_img.style.top = y + lion_img.height / 2 + 'px';
	};

}
