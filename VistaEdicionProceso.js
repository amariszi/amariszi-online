var VistaEdicionProceso = function(proceso, cb_cerrar){
    var _this = this;
    this.proceso = proceso;
    this.alCerrar = cb_cerrar;
    this.ui = $("#plantillas .vista_edicion_proceso").clone();		
    
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
            var item_entrada = {
                item: item,
                cantidad: 0
            };
            _this.proceso.itemsEntrada.push(item_entrada);
            var vista_item = new VistaItemEnProceso(item_entrada);
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
            var item_salida = {
                item: item,
                cantidad: 0
            };
            _this.proceso.itemsSalida.push(item_salida);
            var vista_item = new VistaItemEnProceso(item_salida);
            vista_item.dibujarEn(_this.ui.find("#contenedor_items_salida_proceso"));
            popEntrada.cerrar();  
            Vx.send({
                tipoDeMensaje:"amz.actualizarProceso", 
                proceso:_this.proceso
            });
        });
    });
    
    this.ui.find("#panel_entrada_proceso").append(this.ui.find("#btn_agregar_item_a_entrada_proceso")); //para que queden los botones arriba
    this.ui.find("#panel_salida_proceso").append(this.ui.find("#btn_agregar_item_a_salida_proceso"));
        
    this.ui.find("#contenedor_items_entrada_proceso").empty();
    this.ui.find("#contenedor_items_salida_proceso").empty();		
    this.txt_tipo_proceso.val(this.proceso.tipo);
    this.ctrl_fecha.val(this.proceso.fecha);
    _.forEach(this.proceso.itemsEntrada, function(item_entrada){
        var vista_item = new VistaItemEnProceso(item_entrada);
        vista_item.dibujarEn(_this.ui.find("#contenedor_items_entrada_proceso"));
    });
    _.forEach(this.proceso.itemsSalida, function(item_salida){
        var vista_item = new VistaItemEnProceso(item_salida);
        vista_item.dibujarEn(_this.ui.find("#contenedor_items_salida_proceso"));
    });
    this.ui.show();
    
};

VistaEdicionProceso.prototype.dibujarEn = function(contenedor){
    contenedor.append(this.ui);
};

