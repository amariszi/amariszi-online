$(function(){
	$.ajax({
	  type: "POST",
	  url: "https://script.google.com/macros/s/AKfycbxeqpT8Y2w1YLC4oLh43tTQ91FJeRECnZjY6XrCbORCB8koyY8/exec",
	  data: {},
	  success: function(respuesta){
		console.log(respuesta);
	  }
	});
});