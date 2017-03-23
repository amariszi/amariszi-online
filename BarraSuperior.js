var BarraSuperior = {
    start: function(){
        var ui = $("#barra_superior");        
        ui.find("#titulo_procesos").click(function(){
            ui.find(".titulo").removeClass("seleccionado");
            ui.find("#titulo_procesos").addClass("seleccionado");
            $(".pantalla").hide();
            $("#pantalla_procesos").show();
            PantallaProcesos.dibujar();
        });
        ui.find("#titulo_inventario").click(function(){
            ui.find(".titulo").removeClass("seleccionado");
            ui.find("#titulo_inventario").addClass("seleccionado");      
            $(".pantalla").hide();
            $("#pantalla_inventario").show();
            PantallaInventario.dibujar();
        });
        $(ui.find(".titulo")[0]).click();
    }
};