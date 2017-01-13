var VistaItemEnProceso = function(item_proceso){
    var _this = this;
    this.ui = $("#plantillas .vista_item_en_proceso").clone();		
    this.ui.find("#tipo").text(item_proceso.item.tipo);
    this.ui.find("#cantidad").text(item_proceso.cantidad);
};
    
VistaItemEnProceso.prototype.dibujarEn = function(un_panel){
    un_panel.append(this.ui);
};