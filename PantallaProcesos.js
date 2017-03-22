var PantallaProcesos = {
	start: function(){
		var _this = this;
        this.ui = $("#pantalla_procesos");
        var vista_procesos = new VistaProcesos();
        vista_procesos.dibujarEn(this.ui);
        vista_procesos.alSeleccionar(function(proceso){
            var vista_edicion_proceso = new VistaEdicionProceso(proceso);
            vista_edicion_proceso.alCerrar(function(){
                vista_procesos.dibujar();
            });
            var pop = new PantallaPopUp(vista_edicion_proceso);
        });
	}
};