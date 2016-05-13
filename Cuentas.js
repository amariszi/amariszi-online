$(function(){
	//$('#selector_producto').select2({placeholder:"Producto", data: Repositorio.productos().map(function(prod){return {id:prod.id, text:prod.nombre}})});
	//$('#selector_caja_origen').select2({placeholder:"Origen", data: Repositorio.cuentas().map(function(cuenta){return {id:cuenta.id, text:cuenta.nombre}})});
	//$('#selector_caja_destino').select2({placeholder:"Destino", data: Repositorio.cuentas().map(function(cuenta){return {id:cuenta.id, text:cuenta.nombre}})});
	//$("#btn_agregar_movimiento").click(function(){
//		Repositorio.agregarMovimiento({
//			producto: parseInt($('#selector_producto').val()),
//			cantidad: parseInt($('#txt_cantidad').val()),
//			origen: parseInt($('#selector_caja_origen').val()),
//			destino: parseInt($('#selector_caja_destino').val())
//		});
//		VistaMovimientos.dibujar();
//	});
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	VistaEventos.start();
});

var VistaEventos = {
	start: function(){
		this.dibujar();
	},
	dibujar: function(filtro){
		var _this = this;
		$("#eventos").empty();
		Vx.send({
			tipoDeMensaje: "buscarEventos",
			filtro: filtro
		}, function(respuesta){
			_.forEach(respuesta.eventos, function(evento){
				_this.dibujarEvento(evento);
			});
		});
	},
	dibujarEvento: function(evento){
		var vista_evento = $("#plantillas .evento").clone();
		var div_descripcion = vista_evento.find("#descripcion_evento");
		if(evento.nombre == "pedido")
		{
			div_descripcion.text(evento.cliente + " encargó " + evento.productosPedidos[0].cantidad + " " + evento.productosPedidos[0].nombre);
		}
		if(evento.nombre == "salida de compras"){
			div_descripcion.text(evento.realizadaPor + " salió de compras y compró en " + evento.compras[0].proveedor +	" " + evento.compras[0].detalle[0].cantidad + " " + evento.compras[0].detalle[0].producto);
		}
		$("#eventos").append(vista_evento);
	}
};