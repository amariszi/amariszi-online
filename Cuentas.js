$(function(){
	$('#selector_producto').select2({placeholder:"Producto", data: Repositorio.productos().map(function(prod){return {id:prod.id, text:prod.nombre}})});
	$('#selector_caja_origen').select2({placeholder:"Origen", data: Repositorio.cuentas().map(function(cuenta){return {id:cuenta.id, text:cuenta.nombre}})});
	$('#selector_caja_destino').select2({placeholder:"Destino", data: Repositorio.cuentas().map(function(cuenta){return {id:cuenta.id, text:cuenta.nombre}})});
	$("#btn_agregar_movimiento").click(function(){
		Repositorio.agregarMovimiento({
			producto: parseInt($('#selector_producto').val()),
			cantidad: parseInt($('#txt_cantidad').val()),
			origen: parseInt($('#selector_caja_origen').val()),
			destino: parseInt($('#selector_caja_destino').val())
		});
		VistaMovimientos.dibujar();
	});
	VistaMovimientos.dibujar();
});

var VistaMovimientos = {
	dibujar: function(){
		$("#movimientos").empty();
		_.forEach(Repositorio.movimientos(), function(mov){
			var vista_mov = $("#plantillas .vista_movimiento").clone();
			vista_mov.find("#producto").text(mov.producto.nombre);
			vista_mov.find("#cantidad").text(mov.cantidad);
			vista_mov.find("#origen").text(mov.origen.nombre);
			vista_mov.find("#destino").text(mov.destino.nombre);
			$("#movimientos").append(vista_mov);
		});
	}
};