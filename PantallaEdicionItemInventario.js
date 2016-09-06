var PantallaEdicionItemInventario = {
  start:function(){
		var _this = this;
		this.ui = $("#pantalla_edicion_item_inventario");		
		this.ui.find("#btn_cerrar").click(function(){
			_this.ui.hide();
			_this.cb_cerrar();
		});
		this.txt_tipo_item = this.ui.find("#txt_tipo_item_inventario");
		this.txt_tipo_item.change(function(){
			_this.item.tipo = _this.txt_tipo_item.val();	
			Vx.send({
				tipoDeMensaje:"amz.actualizarItemInventario", 
					 item:{
						 id:_this.item.id, 
						 tipo:_this.txt_tipo_item.val()
					 }
			});
		});
        
        this.ctrl_cantidad = new AtributoEditable(this.ui.find("#cantidad"), function(valor_nuevo){
            Vx.send({
				tipoDeMensaje:"amz.actualizarItemInventario", 
					 item:{
						 id: _this.item.id, 
						 cantidad: valor_nuevo
					 }
			});
        });
      
        this.ctrl_unidad = new AtributoEditable(this.ui.find("#unidad"), function(valor_nuevo){
            Vx.send({
				tipoDeMensaje:"amz.actualizarItemInventario", 
					 item:{
						 id: _this.item.id, 
						 unidad: valor_nuevo
					 }
			});
        });
      
	},
	dibujar: function(item, cb_cerrar){
		this.item = item;
		this.cb_cerrar = cb_cerrar;
		var _this = this;
		this.ui.show();
		this.txt_tipo_item.val(item.tipo);
        this.ctrl_cantidad.val(item.cantidad);
        this.ctrl_unidad.val(item.unidad);
	}    
};