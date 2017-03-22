var VistaEdicionProceso = function(proceso, cb_cerrar){
    $.extend(this, new Vista("vista_edicion_proceso"));
    var _this = this;
    this.proceso = proceso;
    this.nuevoEvento("alCerrar");
    
    this.alCerrar(cb_cerrar);
    
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
        var vista_nuevo_item = new VistaNuevoItemInventario();
        var popEntrada = new PantallaPopUp(vista_nuevo_item);
        vista_nuevo_item.alCrear(function(item){
            _this.proceso.itemsSalida.push(item);
            var vista_item = new VistaItemInventarioEnLista(item);
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
    _.forEach(this.proceso.itemsEntrada, function(item){
        var vista_item = new VistaItemInventarioEnLista(item);
        vista_item.dibujarEn(_this.ui.find("#contenedor_items_entrada_proceso"));
    });
    _.forEach(this.proceso.itemsSalida, function(item){
        var vista_item = new VistaItemInventarioEnLista(item);
        vista_item.dibujarEn(_this.ui.find("#contenedor_items_salida_proceso"));
    });
    this.ui.show();
    
};
