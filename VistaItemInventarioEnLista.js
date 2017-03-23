var VistaItemInventarioEnLista = function(item, on_click_handler){
    $.extend(this, new Vista("vista_item_inventario_en_lista"));
    this.ui.find("#tipo").text(item.tipo);
    this.ui.find("#cantidad").text(item.cantidad);
    this.ui.click(on_click_handler);
}