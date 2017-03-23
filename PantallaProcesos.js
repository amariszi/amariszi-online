var PantallaProcesos = {
	start: function(){
		var _this = this;
        this.ui = $("#pantalla_procesos");
        this.vistaProcesos = new VistaProcesos();
        this.vistaProcesos.dibujarEn(this.ui);
        this.vistaProcesos.alSeleccionar(function(proceso){
            var vista_edicion_proceso = new VistaEdicionProceso(proceso);
            vista_edicion_proceso.alCerrar(function(){
                _this.vistaProcesos.dibujar();
            });
            var pop = new PantallaPopUp(vista_edicion_proceso);
        });
	},
    dibujar: function(){
        this.vistaProcesos.dibujar();
    }
};