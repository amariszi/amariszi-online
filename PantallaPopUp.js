var PantallaPopUp = function(elemento_dibujable){
    var _this = this;
    this.elementoDibujable = elemento_dibujable;
    this.ui = $("#plantillas .pop_up").clone();    
    var vista_inventario = new VistaInventario();
    elemento_dibujable.dibujarEn(this.ui.find("#contenido"));  
    this.ui.find("#btn_cerrar").click(function(){
        _this.cerrar();
    });
    this.ui.find("#contenido").append(this.ui.find("#btn_cerrar"));
    $("body").append(this.ui);
    
    $(document).keyup(function(e) {
        if (e.keyCode == 27 && _this.id_pop==PantallaPopUp.popsAbiertos) { // escape key maps to keycode `27`
            setTimeout(function(){_this.cerrar();}, 1);
        }
    });
    PantallaPopUp.popsAbiertos = PantallaPopUp.popsAbiertos + 1;
    this.id_pop = PantallaPopUp.popsAbiertos;
};

PantallaPopUp.popsAbiertos = 0;

PantallaPopUp.prototype.cerrar = function(){
    PantallaPopUp.popsAbiertos = PantallaPopUp.popsAbiertos - 1;
    this.elementoDibujable.alCerrar();
    this.ui.remove();    
    this.id_pop = -1000;    
};