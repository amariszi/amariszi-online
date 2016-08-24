var Datos = {
	procesos:[
		{id:1, tipo:"compra"},
		{id:2, tipo:"fresado canaletas"},
		{id:3, tipo:"pintado"},
		{id:4, tipo:"venta"}
	]	
}

var Repositorio = {
	start: function(){
		var _this = this;
		Vx.when({tipoDeMensaje: "amz.buscarProcesos"}, function(mensaje, req){
			req.send({
				procesos: Datos.procesos
			});
		});	
		Vx.when({tipoDeMensaje: "amz.agregarProceso"}, function(mensaje, req){
			req.send({
				idProceso: _this.agregarProceso(mensaje.proceso)
			});
		});	
		Vx.when({tipoDeMensaje: "amz.actualizarProceso"}, function(mensaje){
			var proceso = _.findWhere(Datos.procesos, {id:mensaje.proceso.id});
			_.extend(proceso, mensaje.proceso);
		});	
	},   
	agregarProceso: function(p){
		p.id=_.max(Datos.procesos, "id").id + 1;
		Datos.procesos.push(p);
		return p.id;
	}
};

Repositorio.start();