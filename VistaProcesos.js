var VistaProcesos = function(cb_cerrar){
    $.extend(this, new Vista("vista_procesos"));
    var _this = this;
    this.alCerrar = cb_cerrar || function(){};
    this.alSeleccionar_vEventos = [];
    this.dibujar();
    
    this.ui.find("#btn_agregar_proceso").click(function(){
        var proceso = {
            tipo:"",
            itemsEntrada:[],
            itemsSalida:[] 
        };
        Vx.send({
            tipoDeMensaje: "amz.agregarProceso",
            proceso: proceso
        }, function(respuesta){
            proceso.id = respuesta.idProceso;
            _this.dibujarProceso(proceso);
            _this.alSeleccionar(proceso);
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
    Vx.send({
        tipoDeMensaje: "amz.buscarProcesos",
        filtro: filtro
    }, function(respuesta){
        _this.ui.find("#listado_procesos").empty();
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