var Repositorio = {
	cuentas: function(){
		return [
			{id:1, nombre:"Caja Chica"},
			{id:2, nombre:"Cuenta MercadoPago"},
			{id:3, nombre:"Cuenta Banco Nacion"},
			{id:4, nombre:"Charles"},
			{id:5, nombre:"Jero"},
			{id:6, nombre:"May"},
			{id:7, nombre:"Bulonera GATA"},
			{id:8, nombre:"Easy"},
			{id:9, nombre:"Stock"}
		];
	},
	productos: function(){
		return [
			{id:1, nombre:"Peso Argentino"},
			{id:2, nombre:"Dolar"},
			{id:3, nombre:"Tablero Valija"},
			{id:4, nombre:"Tablero Lite A4"},
			{id:5, nombre:"Tira led 3528"},
			{id:5, nombre:"Tornillo Autoperforante Negro"}			
		];
	},
	_movimientos: [
		{id:1, fecha: "20/11", producto:1, cantidad: 150, origen: 1, destino: 7},
		{id:2, fecha: "20/11", producto:5, cantidad: 100, origen: 7, destino: 9}
	],
	movimientos: function(){
		var _this = this;
		return this._movimientos.map(function(mov){
			return {
				id:mov.id, 
				producto: _.findWhere(_this.productos(), {id: mov.producto}),
				cantidad: mov.cantidad,
				origen: _.findWhere(_this.cuentas(), {id: mov.origen}),
				destino: _.findWhere(_this.cuentas(), {id: mov.destino})				
			};
		});
	},
	agregarMovimiento: function(mov){
		mov.id=_.max(this._movimientos, "id");
		this._movimientos.push(mov);
	}
}