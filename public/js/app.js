$(function () {

	var markSeat = function(seat, row, col) {
		data[row][col] = 'x';
		var taken = 'taken';
        var $seat = $(seat);
		var value = null;
        if ( $seat.hasClass('filled') ) {
			value = 'nottaken'; 
		} else {
			value = 'taken';
		}
 
        $.get('/update/row/'+row+'/col/'+col+'/mark/'+ value +'/', updateFromServer);
	
	};

	var rows = 17;
	var cols = 21;
	var i, j;
	var tr, td, data;


	for (i = 0; i < rows; i++) {
		tr = $('<tr></tr>');
		for (j = 0; j < cols; j++) {

			td = $('<td></td>').click( (function (x, y) { return function () { markSeat(this, x,y);  }; }(i, j)) );
			if (j === 10) {
				td.addClass('isle');
			} else {
                td.addClass('seat');
            }

			tr.append(td);
		}

		$('#openseats').append(tr);
	}



	var displayData = function (data) {
		console.log('receiving update');
		var i, j;
		var td;
		for (i = 0; i < rows; i++) {
			tr = $('<tr></tr>');
			for (j = 0; j < cols; j++) {
				td = $('table tr').eq(i).find('td').eq(j);
				if (data[i][j]) {
					td.addClass('filled');
					if (td.find('img').length === 0) {
						td.append('<img>');
					}
					td.find('img').attr('src', 'https://api.twitter.com/1/users/profile_image/' + data[i][j]);	
				} else {
					td.removeClass('filled').find('img').remove();
				}
			}

		}
	};

	var updateFromServer = function () {
		console.log('asking server for update');
		
		$.getJSON('/seats.json', function (d) { data = d; displayData(d); });
	};
	
	
	updateFromServer();
	//setInterval( updateFromServer, 10000);





});

