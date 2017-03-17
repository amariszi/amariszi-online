var VistaInventario = function(cb_cerrar){
    $.extend(this, new Vista("vista_inventario"));
    var _this = this;
    this.alCerrar = cb_cerrar || function(){};
    this.alSeleccionar_vEventos = [];
    this.dibujar();
};

VistaInventario.prototype.alSeleccionar = function(param){
    if(typeof param == "function"){
        this.alSeleccionar_vEventos.push(param);
    }else{
        _.each(this.alSeleccionar_vEventos, function(evento){
            evento(param);
        });
    }
};    

VistaInventario.prototype.dibujar = function(filtro){
    var _this = this;
    this.ui.find("#listado_items_inventario").empty();
    Vx.send({
        tipoDeMensaje: "amz.buscarItemsInventario",
        filtro: filtro
    }, function(respuesta){
        _.forEach(respuesta.items, function(item){
            _this.dibujarItem(item);
        });
    });
};

VistaInventario.prototype.dibujarItem = function(item){
    var _this = this;
    
    var vista_item = new VistaItemInventarioEnLista(item, function(){
        _this.alSeleccionar(item);
    });
    vista_item.dibujarEn(this.ui.find("#listado_items_inventario"));
};
