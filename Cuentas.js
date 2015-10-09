$(function(){
	$('#selector_producto').select2({placeholder:"Producto", data: Repositorio.productos().map(function(prod){return {id:prod.id, text:prod.nombre}})});
	$('#selector_caja').select2({placeholder:"Destino", data: Repositorio.cajas().map(function(caja){return {id:caja.id, text:caja.owner.nombre + " - " + caja.nombre}})});
	$("#btn_agregar_movimiento").click(function(){
		Repositorio.agregarMovimiento({
			producto: parseInt($('#selector_producto').val()),
			cantidad: parseInt($('#txt_cantidad').val()),
			origen: parseInt($('#selector_caja').val()),
		});
		VistaMovimientos.dibujar();
	});
	VistaMovimientos.dibujar();
});

var VistaMovimientos = {
	dibujar: function(){
		$("#movimientos").empty();
		_.forEach(Repositorio.buscarMovimientos(), function(mov){
			var vista_mov = $("#plantillas .vista_movimiento").clone();
			vista_mov.find("#producto").text(mov.producto.nombre);
			vista_mov.find("#cantidad").text(mov.cantidad);
			vista_mov.find("#caja").text(mov.caja.owner.nombre + " - "  + mov.caja.nombre);
			$("#movimientos").append(vista_mov);
		});
	}
};