var PantallaInventario = {
	start: function(){
        var _this = this;
        this.ui = $("#pantalla_inventario");
        this.vistaInventario = new VistaInventario();
        this.vistaInventario.dibujarEn(this.ui);
	},
    dibujar: function(){
        this.vistaInventario.dibujar();
    }
};