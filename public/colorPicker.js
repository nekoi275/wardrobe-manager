function ColorPicker(selector, onSelectedColor) {

    var canvas  = selector;
    var context = canvas[0].getContext('2d');
    var self = this;

    this.buildColorPalette = function() {
        var gradient = context.createLinearGradient(0, 0, canvas.width() * 0.9, 0);
        context.canvas.width = canvas.width();
        context.canvas.height = canvas.height();

        gradient.addColorStop(0,    "rgb(255,   0,   0)");
        gradient.addColorStop(1 / 6, "rgb(255,   0, 255)");
        gradient.addColorStop(2 / 6, "rgb(0,     0, 255)");
        gradient.addColorStop(3 / 6, "rgb(0,   255, 255)");
        gradient.addColorStop(4 / 6, "rgb(0,   255,   0)");
        gradient.addColorStop(5 / 6, "rgb(255, 255,   0)");
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
        if (self.selectedColor) {
            self.setColor(self.selectedColor);
            self.selectedColor = null;
        }
    };

    var RGBgradients = [[1, 0, 0.5], [0.5, 0, 1], [0, 0.5, 1], [0, 1, 0.5], [0.5, 1, 0], [1, 0.5, 0]];

    function findSector(color) {
        return RGBgradients.indexOf(RGBgradients.filter(function(grad) {
            var max = color[grad.indexOf(1)];
            var min = color[grad.indexOf(0)];
            return (min == Math.min.apply(null, color)) && (max == Math.max.apply(null, color));
        })[0])
    }

    this.setColor = function (color) {
    };

    canvas.click(function(e) {
        colorEventX = e.pageX - canvas.offset().left;
        colorEventY = e.pageY - canvas.offset().top;
        var color = getColor(colorEventX, colorEventY);
        self.buildColorPalette();
        drawSelector(colorEventX, colorEventY);
        onSelectedColor(color);
    });

    function getColor(x, y) {
        var imageData = context.getImageData(x, y, 1, 1);
        var colorsArray = imageData.data;
        var color = colorsArray[0] + ',' + colorsArray[1] + ',' + colorsArray[2];
        return color;
    };

    function drawSelector(x, y) {
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.globalCompositeOperation = 'xor';
        context.lineWidth = 2;
        context.stroke();
    };
};