var AtributoEditable = function(ui_original, al_modificar, opt){
    var self = this;
	self.alModificar = al_modificar;
	self.ui = $('#plantilla_AtributoEditable')
					.clone()
					.attr('id', ui_original.attr('id'));
					
					
	self.ui.find('.nombre_atributo').text(ui_original.text());
	
    ui_original.replaceWith(self.ui);
	
	
	self.lbl = self.ui.find(".lbl_valor_atributo");
    self.txt = self.ui.find(".txt_valor_atributo");
    
    if(opt.tipo == "fecha"){
        self.txt.pickadate({
            format: 'dd/mm/yyyy',
            formatSubmit: 'dd/mm/yyyy'
        });
        self.txt.change('keypress', function(e) {
            self.terminarEdicion();
        });
        new Hammer(self.ui[0]).on('press', function(ev) {
            self.lbl.hide();
            self.txt.show();
        });
    }
    else
    {
        self.txt.bind('keypress', function(e) {
            var code = e.keyCode || e.which;
            if(code==13){
                self.terminarEdicion();     
            }
        });
        self.txt.blur(function(){
            self.terminarEdicion();
        });
        
        var modo_edicion = 'press';
        if(opt.edicionRapida) modo_edicion = 'tap';
            
        new Hammer(self.ui[0]).on(modo_edicion, function(ev) {
            self.lbl.hide();
            self.txt.show();
            self.txt.focus();
        });
    }
        
};

AtributoEditable.prototype = {
    terminarEdicion: function(){
        this.lbl.show();
        this.txt.hide();
        this.lbl.text(this.txt.val());
        this.alModificar(this.txt.val());        
    },
	val: function(valor){
		this.lbl.text(valor);
		this.txt.val(valor);
	}
};