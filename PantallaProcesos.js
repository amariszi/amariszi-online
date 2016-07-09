var PantallaProcesos = {
	start: function(){
		var _this = this;
		this.dibujar();
		$("#btn_agregar_proceso").click(function(){
			var proceso = {tipo:"nuevo"};
			Vx.send({
				tipoDeMensaje: "agregarProceso",
				proceso:proceso
			}, function(respuesta){
				_this.dibujarProceso(proceso);
			});
		});
	},
	dibujar: function(filtro){
		var _this = this;
		$("#listado_procesos").empty();
		Vx.send({
			tipoDeMensaje: "buscarProcesos",
			filtro: filtro
		}, function(respuesta){
			_.forEach(respuesta.procesos, function(proceso){
				_this.dibujarProceso(proceso);
			});
		});
	},
	dibujarProceso: function(proceso){
		var vista_proceso = $("#plantillas .vista_proceso").clone();
		vista_proceso.find("#tipo").text(proceso.tipo);
		$("#listado_procesos").append(vista_proceso);
	}
};