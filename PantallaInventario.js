var PantallaInventario = {
	start: function(){
        var _this = this;
        this.ui = $("#pantalla_inventario");
        var vista_inventario = new VistaInventario();
        vista_inventario.dibujarEn(this.ui);
        vista_inventario.alSeleccionar(function(item){
            var vista_edicion_item_inventario = new VistaEdicionItemInventario(item,function(){
                vista_inventario.dibujar();
            } );
            var pop = new PantallaPopUp(vista_edicion_item_inventario);
        });
	}
};