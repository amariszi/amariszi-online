var PantallaProcesos = {
	start: function(){
		var _this = this;
		this.dibujar();
		$("#btn_agregar_proceso").click(function(){
			var proceso = {
                tipo:"nuevo",
                itemsEntrada:[]    
            };
			Vx.send({
				tipoDeMensaje: "amz.agregarProceso",
				proceso: proceso
			}, function(respuesta){
				_this.dibujarProceso(proceso);
				PantallaEdicionProceso.dibujar(proceso, function(){
					_this.dibujar();
				});
			});
		});
	},
	dibujar: function(filtro){
		var _this = this;
		$("#listado_procesos").empty();
		Vx.send({
			tipoDeMensaje: "amz.buscarProcesos",
			filtro: filtro
		}, function(respuesta){
			_.forEach(respuesta.procesos, function(proceso){
				_this.dibujarProceso(proceso);
			});
		});
	},
	dibujarProceso: function(proceso){
        var _this = this;
		var vista_proceso = $("#plantillas .vista_proceso").clone();
		vista_proceso.find("#tipo").text(proceso.tipo);
		vista_proceso.find("#fecha").text(proceso.fecha);
		$("#listado_procesos").append(vista_proceso);
        vista_proceso.click(function(){
            PantallaEdicionProceso.dibujar(proceso, function(){
                _this.dibujar();
            });
        });
	}
};