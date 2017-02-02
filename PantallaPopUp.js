var PantallaPopUp = function(elemento_dibujable){
    var _this = this;
    this.elementoDibujable = elemento_dibujable;
    this.ui = $("#plantillas .pop_up").clone();
    this.ui.find("#btn_cerrar").click(function(){
        _this.cerrar();
    });
    var vista_inventario = new VistaInventario();
    elemento_dibujable.dibujarEn(this.ui.find("#contenido"));    
    $("body").append(this.ui);
};

PantallaPopUp.prototype.cerrar = function(){
    this.elementoDibujable.alCerrar();
    this.ui.remove();       
};