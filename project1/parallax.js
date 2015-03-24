function Layer(s, x, y) {
    this.img = new Image();
    this.img.src = s;
    this.x = x;
    this.y = y;
}

function ParallaxScrolling(ctx, imgdata) {
    var self = this;
    if( typeof imgdata === 'undefined' ) imgdata = [];
    this.ctx = ctx;

    // Initialize the layers
    this.layers = new Array(imgdata.length);
    for(i=0; i<imgdata.length; i++) {
        this.layers[i] = new Layer(imgdata[i], 0, 0);  // including layer 0
    }

    // Function: Move all layer except the first one
    this.Move = function() {
        for(var i=0; i<self.layers.length; i++) {
            if( self.layers[i].y > self.layers[i].img.width )
                self.layers[i].y = 0; // reset
            if(i === 0)
                self.layers[i].y += 0.5;
            else
                self.layers[i].y += 1;
        }
    };

    // Function: Draw all layer in the canvas
    this.Draw = function() {
        self.Move();
        for(var i=0; i<self.layers.length; i++) {
            if(i === 0)
                ctx.globalAlpha = 1;
            else
                ctx.globalAlpha = 0.5;

            var y1 = (self.layers[i].y-self.layers[i].img.height);
            self.ctx.drawImage(self.layers[i].img, 0, 0, self.layers[i].img.width, self.layers[i].img.height,
                0, self.layers[i].y, self.layers[i].img.width, self.layers[i].img.height);
            self.ctx.drawImage(self.layers[i].img, 0, 0, self.layers[i].img.width, self.layers[i].img.height,
                0, y1, self.layers[i].img.width, self.layers[i].img.height);
        }
    }
}