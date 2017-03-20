var PantallaEdicionProceso = {
	start:function(){
		var _this = this;
		this.ui = $("#pantalla_edicion_proceso");		
		this.ui.find("#btn_cerrar").click(function(){
			_this.ui.hide();
			_this.cb_cerrar();
		});
		this.txt_tipo_proceso = this.ui.find("#txt_tipo_proceso");
		this.txt_tipo_proceso.change(function(){
			_this.proceso.tipo = _this.txt_tipo_proceso.val();	
			Vx.send({
				tipoDeMensaje:"amz.actualizarProceso", 
                proceso:_this.proceso
			});
		});
        
        this.ctrl_fecha = new AtributoEditable(this.ui.find("#fecha"), function(valor_nuevo){
            _this.proceso.fecha = valor_nuevo;	
            Vx.send({
				tipoDeMensaje:"amz.actualizarProceso", 
                proceso:_this.proceso
			});
        }, "fecha");
        
        this.ui.find("#btn_agregar_item_a_entrada_proceso").click(function(){
            var vista_inventario = new VistaInventario();
            var popEntrada = new PantallaPopUp(vista_inventario);
            vista_inventario.alSeleccionar(function(item){
                _this.proceso.itemsEntrada.push(item);
                var vista_item = new VistaItemInventarioEnLista(item);
                vista_item.dibujarEn(_this.ui.find("#contenedor_items_entrada_proceso"));
                popEntrada.cerrar();  
                Vx.send({
                    tipoDeMensaje:"amz.actualizarProceso", 
                    proceso:_this.proceso
                });
            });
        });
        
        this.ui.find("#btn_agregar_item_a_salida_proceso").click(function(){
            var vista_inventario = new VistaInventario();
            var popEntrada = new PantallaPopUp(vista_inventario);
            vista_inventario.alSeleccionar(function(item){
                _this.proceso.itemsSalida.push(item);
                var vista_item = new VistaItemEnProceso(item);
                vista_item.dibujarEn(_this.ui.find("#contenedor_items_salida_proceso"));
                popEntrada.cerrar();  
                Vx.send({
                    tipoDeMensaje:"amz.actualizarProceso", 
                    proceso:_this.proceso
                });
            });
        });
	},
	dibujar: function(proceso, cb_cerrar){
		this.proceso = proceso;
		this.cb_cerrar = cb_cerrar;
		var _this = this;
        this.ui.find("#contenedor_items_entrada_proceso").empty();
        this.ui.find("#contenedor_items_salida_proceso").empty();		
		this.txt_tipo_proceso.val(proceso.tipo);
        this.ctrl_fecha.val(proceso.fecha);
        _.forEach(proceso.itemsEntrada, function(item_entrada){
            var vista_item = new VistaItemEnProceso(item_entrada);
            vista_item.dibujarEn(_this.ui.find("#contenedor_items_entrada_proceso"));
        });
        _.forEach(proceso.itemsSalida, function(item_salida){
            var vista_item = new VistaItemEnProceso(item_salida);
            vista_item.dibujarEn(_this.ui.find("#contenedor_items_salida_proceso"));
        });
        this.ui.show();
	}
};