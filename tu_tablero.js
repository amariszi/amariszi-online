$(function(){
	$("#ACRILICO_PRENDIDO").hide();
	$("#BOTON_PRESIONADO").hide();
	$("#BOTON").click(function(){
		$("#ACRILICO_PRENDIDO").show();
		$("#BOTON_PRESIONADO").show();
		$("#ACRILICO_APAGADO").hide();
		$("#BOTON").hide();
	});
	$("#BOTON_PRESIONADO").click(function(){
		$("#ACRILICO_PRENDIDO").hide();
		$("#BOTON_PRESIONADO").hide();
		$("#ACRILICO_APAGADO").show();
		$("#BOTON").show();
	});
	var rotacion = 0;
	var x_centro = 354.33;
	var y_centro = 354.33;	
	var dist_al_centro;	
	var angulo_mouse_down;
	
	var get_angulo_mouse = function(x_mouse, y_mouse){
		var dY = y_mouse - y_centro;            //opposite
		var dX = x_mouse - y_centro;            //adjacent
		var dist = Math.sqrt((dY*dY)+(dX*dX));  //hypotenuse
		var sin = dY/dist;                      //opposite over hypotenuse
		var radians = Math.asin(sin);
		var degrees = radians*(180/Math.PI);    //convert from radians to degrees
		
		if (dX>=0 && dY>=0)
		{//quadrant 1
		//no transformation, do nothing
		}
		if (dX>=0 && dY<0) 
		{ //quadrant 4
			degrees=360+degrees;
		}
		if (dX<0 && dY<0) 
		{ //quadrant 3
			degrees=180-degrees;
		}
		if (dX<0 && dY>0) 
		{ //quadrant 2
			degrees=180-degrees;
		}
		return degrees;   
	};
	
	var rotando= false;
	$("#CIRCULO_PELADO, #ACRILICO_PRENDIDO, #ACRILICO_APAGADO").mousedown(function(event){
		rotando = true;
		angulo_mouse_down = get_angulo_mouse(event.clientX, event.clientY);
		$("#CIRCULO_PELADO, #ACRILICO_PRENDIDO, #ACRILICO_APAGADO").attr("class", "rotando");
	});
	
	$("#tablero").mousemove(function(event){
		if(rotando)
		{	
			rotacion = get_angulo_mouse(event.clientX, event.clientY) - angulo_mouse_down;
			console.log(rotacion);
			$("#ACRILICO_APAGADO").attr("transform", "rotate("+ rotacion +" 354.33 354.33)");
			$("#ACRILICO_PRENDIDO").attr("transform", "rotate("+ rotacion +" 354.33 354.33)");
	//		$("#agueritos").attr("transform", "rotate("+ rotacion +" 354.33 354.33)");
			$("#CIRCULO_PELADO").attr("transform", "rotate("+ rotacion +" 354.33 354.33)");
		}		
	});
	
	
	$("#tablero").mouseup(function(){
		rotando = false;
		$("#CIRCULO_PELADO, #ACRILICO_PRENDIDO, #ACRILICO_APAGADO").attr("class","");
	});
});