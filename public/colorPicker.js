var colorPicker = {};

colorPicker.canvas  = $('canvas.color-palette');
colorPicker.buildColorPalette = function() {
    colorPicker.context = colorPicker.canvas[0].getContext('2d');
    var gradient = colorPicker.context.createLinearGradient(0, 0, colorPicker.canvas.width() * 0.9, 0);
    colorPicker.context.canvas.width = colorPicker.canvas.width()
    colorPicker.context.canvas.height = colorPicker.canvas.height()

    gradient.addColorStop(0,    "rgb(255,   0,   0)");
    gradient.addColorStop(0.15, "rgb(255,   0, 255)");
    gradient.addColorStop(0.33, "rgb(0,     0, 255)");
    gradient.addColorStop(0.49, "rgb(0,   255, 255)");
    gradient.addColorStop(0.67, "rgb(0,   255,   0)");
    gradient.addColorStop(0.84, "rgb(255, 255,   0)");
    gradient.addColorStop(1, "rgb(255,   0,   0)");

    colorPicker.context.fillStyle = gradient;
    colorPicker.context.fillRect(0, 0, colorPicker.canvas.width() * 0.9, colorPicker.canvas.height());

    gradient = colorPicker.context.createLinearGradient(0, 0, 0, colorPicker.canvas.height());
    gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
    gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

    colorPicker.context.fillStyle = gradient;
    colorPicker.context.fillRect(0, 0, colorPicker.canvas.width(), colorPicker.canvas.height());

    gradient = colorPicker.context.createLinearGradient(0, 0, 0, colorPicker.canvas.height());
    gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.1,   "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.9,   "rgba(0,     0,   0, 1)");
    gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");
    colorPicker.context.fillStyle = gradient;
    colorPicker.context.fillRect(colorPicker.canvas.width() * 0.9, 0, colorPicker.canvas.width(), colorPicker.canvas.height());
};

colorPicker.canvas.click(function(e) {
    colorPicker.colorEventX = e.pageX - colorPicker.canvas.offset().left;
    colorPicker.colorEventY = e.pageY - colorPicker.canvas.offset().top;
    colorPicker.getColor();
    colorPicker.drawSelector();
});

colorPicker.getColor = function(e) {
    var imageData = colorPicker.context.getImageData(colorPicker.colorEventX, colorPicker.colorEventY, 1, 1);
    colorsArray = imageData.data;
    $('#color').val(colorsArray[0] + ',' + colorsArray[1] + ',' + colorsArray[2]);
};

colorPicker.drawSelector = function() {
    colorPicker.buildColorPalette();
    colorPicker.context.beginPath();
    colorPicker.context.arc(colorPicker.colorEventX, colorPicker.colorEventY, 5, 0, 2 * Math.PI);
    colorPicker.context.stroke();
};