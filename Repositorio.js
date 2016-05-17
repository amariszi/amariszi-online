var Repositorio = {
	start: function(){
		var _this = this;
		Vx.when({tipoDeMensaje: "buscarEventos"}, function(mensaje){
			Vx.send({
				responseTo: mensaje.idRequest,
				eventos: _this.buscarEventos(mensaje.filtro)
			});
		});	
		Vx.when({tipoDeMensaje: "agregarEvento"}, function(mensaje){
			Vx.send({
				responseTo: mensaje.idRequest,
				idEvento: _this.agregarEvento(mensaje.evento)
			});
		});	
	},
    _cajas: [
        {id:1, owner: 1, nombre:"Caja Chica"},
        {id:2, owner: 1, nombre:"MercadoPago"},
        {id:3, owner: 1, nombre:"Banco Nacion"},
        {id:4, owner: 2, nombre:"Stock"},
        {id:5, owner: 3, nombre:"Stock"},
        {id:6, owner: 4, nombre:"Stock"},
        {id:7, owner: 5, nombre:"Stock"},
        {id:8, owner: 6, nombre:"Stock"},
        {id:9, owner: 1, nombre:"Stock"}
    ],
	cajas: function(){
		var _this = this;
		return this._cajas.map(function(c){
            var caja = _.clone(c);
            caja.owner = _.findWhere(_this.entes(), {id: c.owner});            
			return caja;
		});
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
    entes: function(){
		return [
			{id:1, nombre:"AmariSzi"},
			{id:2, nombre:"Charles"},
			{id:3, nombre:"Jero"},
			{id:4, nombre:"Mayra"},
			{id:5, nombre:"Bulonera GATA"},
			{id:5, nombre:"Easy"}			
		];
	},	
	tiposDeEvento: function(){
		return [
			{id:1, nombre:"AmariSzi"},
			{id:2, nombre:"Charles"},
			{id:3, nombre:"Jero"},
			{id:4, nombre:"Mayra"},
			{id:5, nombre:"Bulonera GATA"},
			{id:5, nombre:"Easy"}			
		];
	},
	_eventos: [
		{id:1, fecha: "20/11/2015", nombre: "nuevoPedido", pedido: {producto:"valija", cantidad: 1, cliente: {nombre:"anibal", apellido: "polari"}},
	],
	buscarEventos: function(filtro){
		return _.findWhere(this._eventos, filtro);
	},
	agregarEvento: function(ev){
		ev.id=_.max(this._eventos, "id");
		this._eventos.push(ev);
	}
}