var PantallaInventario = {
	start: function(){
		var _this = this;
		this.dibujar();
		$("#btn_agregar_item").click(function(){
			var item = {tipo:"nuevo"};
			Vx.send({
				tipoDeMensaje: "amz.agregarItemInventario",
				item: item
			}, function(respuesta){
				_this.dibujarItem(item);
				PantallaEdicionItemInventario.dibujar(item, function(){
					_this.dibujar();
				});
			});
		});
	},
	dibujar: function(filtro){
		var _this = this;
		$("#listado_items_inventario").empty();
		Vx.send({
			tipoDeMensaje: "amz.buscarItemsInventario",
			filtro: filtro
		}, function(respuesta){
			_.forEach(respuesta.items, function(item){
				_this.dibujarItem(item);
			});
		});
	},
	dibujarItem: function(item){
        var _this = this;
		var vista_item = $("#plantillas .vista_item_inventario").clone();
		vista_item.find("#tipo").text(item.tipo);
		$("#listado_items_inventario").append(vista_item);
        vista_item.click(function(){
            PantallaEdicionItemInventario.dibujar(item, function(){
                _this.dibujar();
            });
        });
	}
};