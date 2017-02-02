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
    
VistaEdicionItemInventario.prototype.dibujarEn = function(contenedor){
    contenedor.append(this.ui);
};