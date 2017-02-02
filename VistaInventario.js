var VistaInventario = function(cb_cerrar){
    this.ui = $(".vista_inventario").clone();
    this.alCerrar = cb_cerrar || function(){};
    this.alSeleccionar_vEventos = [];
    this.dibujar();
    this.ui.find("#btn_agregar_item").click(function(){
        var item = {tipo:"nuevo"};
        Vx.send({
            tipoDeMensaje: "amz.agregarItemInventario",
            item: item
        }, function(respuesta){
            _this.dibujarItem(item);
            PantallaEdicionItemInventario.dibujar(item, function(){
                _this.dibujar();
            });
        });
    });
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
    var vista_item = $("#plantillas .vista_item_inventario").clone();
    vista_item.find("#tipo").text(item.tipo);
    this.ui.find("#listado_items_inventario").append(vista_item);
    vista_item.click(function(){
        _this.alSeleccionar(item);
    });
};

VistaInventario.prototype.dibujarEn = function(un_panel){
    un_panel.append(this.ui);
};
