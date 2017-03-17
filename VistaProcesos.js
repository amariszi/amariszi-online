var VistaProcesos = function(cb_cerrar){
    $.extend(this, new Vista("vista_procesos"));
    var _this = this;
    this.alCerrar = cb_cerrar || function(){};
    this.alSeleccionar_vEventos = [];
    this.dibujar();
    
    this.ui.find("#btn_agregar_proceso").click(function(){
        var proceso = {
            tipo:"nuevo",
            itemsEntrada:[]    
        };
        Vx.send({
            tipoDeMensaje: "amz.agregarProceso",
            proceso: proceso
        }, function(respuesta){
            _this.dibujarProceso(proceso);
            var vista_edicion_proceso = new VistaEdicionProceso(proceso,function(){
                _this.dibujar();
            } );
        });
    });
};

VistaProcesos.prototype.alSeleccionar = function(param){
    if(typeof param == "function"){
        this.alSeleccionar_vEventos.push(param);
    }else{
        _.each(this.alSeleccionar_vEventos, function(evento){
            evento(param);
        });
    }
};    

VistaProcesos.prototype.dibujar = function(filtro){
    var _this = this;
    this.ui.find("#listado_procesos").empty();
    Vx.send({
        tipoDeMensaje: "amz.buscarProcesos",
        filtro: filtro
    }, function(respuesta){
        _.forEach(respuesta.procesos, function(proceso){
            _this.dibujarProceso(proceso);
        });
    });
};

VistaProcesos.prototype.dibujarProceso = function(proceso){
    var _this = this;
    var vista_proceso = $("#plantillas .vista_proceso").clone();
    vista_proceso.find("#tipo").text(proceso.tipo);
    vista_proceso.find("#fecha").text(proceso.fecha);
    this.ui.find("#listado_procesos").append(vista_proceso);
    vista_proceso.click(function(){
        _this.alSeleccionar(proceso);
    });
};