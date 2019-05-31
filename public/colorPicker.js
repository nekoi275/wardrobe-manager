function ColorPicker() {

    var canvas  = $('canvas.color-palette');
    var context = canvas[0].getContext('2d');
    var self = this;

    this.buildColorPalette = function() {
        var gradient = context.createLinearGradient(0, 0, canvas.width() * 0.9, 0);
        context.canvas.width = canvas.width()
        context.canvas.height = canvas.height()

        gradient.addColorStop(0,    "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");
        gradient.addColorStop(0.49, "rgb(0,   255, 255)");
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1, "rgb(255,   0,   0)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width() * 0.9, canvas.height());

        gradient = context.createLinearGradient(0, 0, 0, canvas.height());
        gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width(), canvas.height());

        gradient = context.createLinearGradient(0, 0, 0, canvas.height());
        gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.1,   "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.9,   "rgba(0,     0,   0, 1)");
        gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");
        context.fillStyle = gradient;
        context.fillRect(canvas.width() * 0.9, 0, canvas.width(), canvas.height());
    };

    canvas.click(function(e) {
        colorEventX = e.pageX - canvas.offset().left;
        colorEventY = e.pageY - canvas.offset().top;
        getColor();
        drawSelector();
    });

    function getColor(e)  {
        var imageData = context.getImageData(colorEventX, colorEventY, 1, 1);
        colorsArray = imageData.data;
        $('input[name="color"]').val(colorsArray[0] + ',' + colorsArray[1] + ',' + colorsArray[2]);
    };

    function drawSelector() {
        self.buildColorPalette();
        context.beginPath();
        context.arc(colorEventX, colorEventY, 10, 0, 2 * Math.PI);
        context.globalCompositeOperation = 'xor';
        context.lineWidth = 2;
        context.stroke();
    };
};