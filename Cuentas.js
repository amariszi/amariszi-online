$(function(){
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	Vx.verbose = true;
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	PantallaProcesos.start();	
	PantallaEdicionProceso.start();
});