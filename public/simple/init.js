var controller = new Controller();
var colorPicker = new ColorPicker($('canvas.color-palette'), controller.getCanvasColor);
colorPicker.buildColorPalette();
$(document).ready(controller.loadData);
$('#add-button').on('click', controller.showAddModalForm);