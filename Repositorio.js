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
		Vx.when({tipoDeMensaje: "buscarProcesos"}, function(mensaje, req){
			req.send({
				procesos: Datos.procesos
			});
		});	
		Vx.when({tipoDeMensaje: "agregarProceso"}, function(mensaje, req){
			req.send({
				idProceso: _this.agregarProceso(mensaje.proceso)
			});
		});	
	},   
	agregarProceso: function(p){
		p.id=_.max(Datos.procesos, "id")+1;
		Datos.procesos.push(p);
		return p.id;
	}
};

Repositorio.start();