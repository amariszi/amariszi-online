var PantallaInventario = {
	start: function(){
        var _this = this;
        this.ui = $("#pantalla_procesos");
        var vista_procesos = new VistaProcesos();
        vista_procesos.dibujarEn(this.ui);
        vista_procesos.alSeleccionar(function(item){
            var vista_edicion_item_inventario = new VistaEdicionItemInventario(item,function(){
                vista_procesos.dibujar();
            } );
            var pop = new PantallaPopUp(vista_edicion_item_inventario);
        });
	}
};