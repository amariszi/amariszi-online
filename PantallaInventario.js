var PantallaInventario = {
	start: function(){
        var _this = this;
        this.ui = $("#pantalla_inventario");
        var vista_inventario = new VistaInventario();
        vista_inventario.dibujarEn(this.ui);
	}
};