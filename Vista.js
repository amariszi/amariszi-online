var Vista = function(clase_plantilla){
    this.ui = $("#plantillas ." + clase_plantilla).clone();
};

Vista.prototype.dibujarEn = function(un_panel){
    un_panel.append(this.ui);
};