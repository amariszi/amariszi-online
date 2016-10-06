var PantallaEdicionProceso = {
	start:function(){
		var _this = this;
		this.ui = $("#pantalla_edicion_proceso");		
		this.ui.find("#btn_cerrar").click(function(){
			_this.ui.hide();
			_this.cb_cerrar();
		});
		this.txt_tipo_proceso = this.ui.find("#txt_tipo_proceso");
		this.txt_tipo_proceso.change(function(){
			_this.proceso.tipo = _this.txt_tipo_proceso.val();	
			Vx.send({
				tipoDeMensaje:"amz.actualizarProceso", 
					 proceso:{
						 id:_this.proceso.id, 
						 tipo:_this.txt_tipo_proceso.val()
					 }
			});
		});
        
        this.ctrl_fecha = new AtributoEditable(this.ui.find("#fecha"), function(valor_nuevo){
            Vx.send({
				tipoDeMensaje:"amz.actualizarProceso", 
					 proceso:{
						 id: _this.proceso.id, 
						 fecha: valor_nuevo
					 }
			});
        }, "fecha");
        
        this.ui.find("#btn_agregar_item_a_entrada_proceso").click(function(){
            var popUp = $(".pop_up").clone();
            $("body").append(popUp);
            popUp.find("#btn_cerrar").click(function(){
                popUp.remove();
            });
            popUp.find("#contenido_popup").append();
        });
        
        this.ui.find("#btn_agregar_item_a_salida_proceso").click(function(){
            
            
        });
	},
	dibujar: function(proceso, cb_cerrar){
		this.proceso = proceso;
		this.cb_cerrar = cb_cerrar;
		var _this = this;
		this.ui.show();
		this.txt_tipo_proceso.val(proceso.tipo);
        this.ctrl_fecha.val(proceso.fecha);
	}
};