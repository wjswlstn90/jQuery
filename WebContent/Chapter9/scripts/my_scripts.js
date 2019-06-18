$(document).ready(function(){

	var FREQ = 10000 ;
	var repeat = true;
	
	function showFrequency(){
		$("#freq").html( "Page refreshes every " + FREQ/1000 + " second(s).");
	}
	
	function startAJAXcalls(){
	
		if(repeat){
			setTimeout( function() {
					getJsonRacers();
					startAJAXcalls();
				}, 	
				FREQ
			);
		}
	}
	
	function getJsonRacers(){
		$.getJSON("finishers.json", function(json){
			if(json.runners.length > 0){
				$('#finishers_m').empty();
				$('#finishers_f').empty();
				$('#finishers_all').empty();	
				
				$.each(json.runners, function(i, v){
					var info = '<li>Name:' + v.fname + '' + v.lname + '.Time:' + v.time + '</li>';
					if(v.gender == 'm'){
						$('#finishers_m').append( info );
					}else if(v.gender == 'f'){
						$('#finishers_f').append( info );
					}else{}
					$('#finishers_all').append( info );
				});
			}
			getTimeAjax();
		});
	}

	function getTimeAjax(){
	$('#updatedTime').load("time.php");
		/*
		var time = "";
		$.ajax({
			url: "time.php",
			cache: false,
			success: function(data){
				$('#updatedTime').html(data);
			}
		});
		*/
	}
	
	$("#btnStop").click(function(){
		repeat = false;
		$("#freq").html( "Updates paused." );
	});

	$("#btnStart").click(function(){
		repeat = true;
		startAJAXcalls();
		showFrequency();
	});	

	showFrequency();
	getJsonRacers();
	startAJAXcalls();
});
