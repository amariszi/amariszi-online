var Datos = {
	procesos:[
		{id:1, tipo:"compra", fecha:"20/11/2015", itemsEntrada:[], itemsSalida:[]},
		{id:2, tipo:"fresado canaletas", fecha:"21/11/2015", itemsEntrada:[], itemsSalida:[]},
		{id:3, tipo:"pintado", fecha:"22/11/2015", itemsEntrada:[], itemsSalida:[]},
		{id:4, tipo:"venta", fecha:"23/11/2015", itemsEntrada:[], itemsSalida:[]}
	],
    itemsInventario:[
		{id:1, tipo:"tablero valija", cantidad:1, unidad:"un"},
		{id:2, tipo:"tablero lite A4", cantidad:1, unidad:"un"},
		{id:3, tipo:"tornillo negro corto", cantidad:100, unidad:"un"},
		{id:4, tipo:"pintura", cantidad:4, unidad:"litros"}
	]	
}

var Repositorio = {
	start: function(){
		var _this = this;
        var datos_ls = localStorage.getItem("DatosAMZ");
        if(datos_ls) Datos = JSON.parse(datos_ls);
        
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
			proceso = mensaje.proceso;
            localStorage.setItem("DatosAMZ", JSON.stringify(Datos));
		});	
        
        Vx.when({tipoDeMensaje: "amz.buscarItemsInventario"}, function(mensaje, req){
			req.send({
				items: Datos.itemsInventario
			});
		});	
		Vx.when({tipoDeMensaje: "amz.agregarItemInventario"}, function(mensaje, req){
			req.send({
				idItem: _this.agregarItemInventario(mensaje.item)
			});
		});	
		Vx.when({tipoDeMensaje: "amz.actualizarItemInventario"}, function(mensaje){
			var item = _.findWhere(Datos.itemsInventario, {id:mensaje.item.id});
			_.extend(item, mensaje.item);
            localStorage.setItem("DatosAMZ", JSON.stringify(Datos));
		});	
	},   
	agregarProceso: function(p){
		p.id=_.max(Datos.procesos, "id").id + 1;
		Datos.procesos.push(p);
        localStorage.setItem("DatosAMZ", JSON.stringify(Datos));
		return p.id;
	},
    agregarItemInventario: function(i){
		i.id=_.max(Datos.itemsInventario, "id").id + 1;
		Datos.itemsInventario.push(i);
        localStorage.setItem("DatosAMZ", JSON.stringify(Datos));
		return i.id;
	}
};

Repositorio.start();