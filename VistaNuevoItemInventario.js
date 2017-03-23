var VistaNuevoItemInventario = function(){
    var _this = this;
    $.extend(this, new Vista("vista_nuevo_item_inventario"));
    this.nuevoEvento("alCrear");    
    
    var item = {};
    this.ctrl_tipo = new AtributoEditable(this.ui.find("#tipo"), function(valor_nuevo){
        item.tipo = valor_nuevo;
    }, {edicionRapida:1});
    this.ctrl_cantidad = new AtributoEditable(this.ui.find("#cantidad"), function(valor_nuevo){
        item.cantidad = valor_nuevo;
    }, {edicionRapida:1});
    this.ctrl_unidad = new AtributoEditable(this.ui.find("#unidad"), function(valor_nuevo){
        item.unidad = valor_nuevo;
    }, {edicionRapida:1});
    
    this.ui.find("#btn_ok").click(function(){
        Vx.send({
            tipoDeMensaje: "amz.agregarItemInventario",
            item: item
        }, function(respuesta){
            item.id = respuesta.idItem;
            _this.alCrear(item);
        });        
    });
};


