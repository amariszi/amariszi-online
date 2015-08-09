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
	var rotacion_mouse_down = 0;
	var tablero = $("#tablero")[0];
	var circulo = Snap("#CIRCULO_PELADO");	
	var frente = Snap("#FRENTE");	
	var $circulo = $("#CIRCULO_PELADO");	

	var dist_al_centro;	
	var angulo_mouse_down;
	
	var centro_circulo = function(){
		var centro = {};
		centro.x = circulo.getBBox().cx;
		centro.y = circulo.getBBox().cy;
		return centro;		
	};
	
	var centro_frente = function(){
		var centro = {};
		centro.x = frente.getBBox().cx;
		centro.y = frente.getBBox().cy;
		return centro;		
	};

	var iap = function(punto){
		var pt = tablero.createSVGPoint();
		pt.x = punto.x; pt.y = punto.y;
  		pt = pt.matrixTransform(tablero.getScreenCTM().inverse());
		return {x: pt.x, y:pt.y};
	};
	
	var get_angulo_mouse = function(x_mouse, y_mouse){
		var dY = y_mouse - iap(centro_frente()).y;            //opposite
		var dX = x_mouse - iap(centro_frente()).x;            //adjacent
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
	$("#CIRCULO_PELADO").click(function(ev){
		var p = {x:ev.clientX, y:ev.clientY}
		console.log(p, iap(p));
	});
	
	$("#CIRCULO_PELADO").bind("mousedown touchstart", function(event){
		rotando = true;
		angulo_mouse_down = get_angulo_mouse(event.offsetX, event.offsetY);
		rotacion_mouse_down = rotacion;
		$("#CIRCULO_PELADO").attr("class", "rotando");
	});
	
	$("#tablero").bind("mousemove touchmove", function(event){
		if(rotando)
		{	
			rotacion = rotacion_mouse_down + get_angulo_mouse(event.offsetX, event.offsetY) - angulo_mouse_down;
			
			var t = new Snap.Matrix() 
			t.rotate(rotacion, centro_frente().x, centro_frente().y);
			circulo.transform(t);
			
		}		
	});
	
	
	$("#tablero").bind("mouseup touchend", function(){
		rotando = false;
		$("#CIRCULO_PELADO").attr("class","");
	});
});