var controller = new Controller();
var colorPicker = new ColorPicker($('canvas.color-palette'), controller.getCanvasColor);
$(document).ready(controller.loadData);
$('#cancel-button').click(controller.view.clearForm);
$('#modal-form').on('hide.bs.modal', controller.view.clearForm);
$('#modal-form').on('shown.bs.modal', colorPicker.buildColorPalette);
$('#add-button').on('click', controller.showAddModalForm);
controller.initSearch();