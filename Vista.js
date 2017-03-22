var Vista = function(clase_plantilla){
    this.ui = $("#plantillas ." + clase_plantilla).clone();
};

Vista.prototype.dibujarEn = function(un_panel){
    un_panel.append(this.ui);
};

Vista.prototype.nuevoEvento = function(nombre_evento){
    this[nombre_evento + "_callbacks"] = [];
    this[nombre_evento] = function(param){
        if(typeof param == "function"){
            this[nombre_evento + "_callbacks"].push(param);
        }else{
            _.each(this[nombre_evento + "_callbacks"], function(evento){
                evento(param);
            });
        }   
    };
};