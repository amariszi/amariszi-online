var VistaEdicionItemInventario = function(item, cb_cerrar){
    var _this = this;
    this.item = item;
    this.alCerrar = cb_cerrar;
    this.ui = $("#plantillas .vista_edicion_item_inventario").clone();		
    this.txt_tipo_item = this.ui.find("#txt_tipo_item_inventario");
    this.txt_tipo_item.change(function(){
        _this.item.tipo = _this.txt_tipo_item.val();	
        Vx.send({
            tipoDeMensaje:"amz.actualizarItemInventario", 
                 item:{
                     id:_this.item.id, 
                     tipo:_this.txt_tipo_item.val()
                 }
        });
    });
    
    this.ctrl_cantidad = new AtributoEditable(this.ui.find("#cantidad"), function(valor_nuevo){
        Vx.send({
            tipoDeMensaje:"amz.actualizarItemInventario", 
                 item:{
                     id: _this.item.id, 
                     cantidad: valor_nuevo
                 }
        });
    });
  
    this.ctrl_unidad = new AtributoEditable(this.ui.find("#unidad"), function(valor_nuevo){
        Vx.send({
            tipoDeMensaje:"amz.actualizarItemInventario", 
                 item:{
                     id: _this.item.id, 
                     unidad: valor_nuevo
                 }
        });
    });     

    this.txt_tipo_item.val(item.tipo);
    this.ctrl_cantidad.val(item.cantidad);
    this.ctrl_unidad.val(item.unidad);
};
    
VistaEdicionItemInventario.prototype.dibujar = function(proceso, cb_cerrar){
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
};

VistaEdicionItemInventario.prototype.dibujarEn = function(contenedor){
    contenedor.append(this.ui);
};