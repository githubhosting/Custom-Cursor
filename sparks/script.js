var particles = [];

var Particle = function (x, y) {
  this.x = x + random(-10, 10);
  this.y = y + random(-10, 10);
  this.vx = random(-2.5, 2.5);
  this.vy = random(-5, 5);
  this.radius = random() > 0.75 ? random(25, 50) : 1 + random(1, 20);
  this.lifespan = random(25, 50);
  this.charge = this.lifespan;
  this.color = {
    r: round(random(255)),
    g: round(random(75)),
    b: round(random(50)),
  };
};

Particle.prototype = {
  update: function () {
    this.charge--;
    this.radius--;
    this.x += this.vx;
    this.y += this.vy;
  },

  draw: function (ctx) {
    var gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(
      0,
      "rgba(" +
        this.color.r +
        ", " +
        this.color.g +
        ", " +
        this.color.b +
        ", " +
        this.opacity +
        ")"
    );
    gradient.addColorStop(
      0.5,
      "rgba(" +
        this.color.r +
        ", " +
        this.color.g +
        ", " +
        this.color.b +
        ", " +
        this.opacity +
        ")"
    );
    gradient.addColorStop(
      1,
      "rgba(" +
        this.color.r +
        ", " +
        this.color.g +
        ", " +
        this.color.b +
        ", 0)"
    );

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, TWO_PI, false);
    ctx.fill();
  },
};

Sketch.create({
  center: {},
  setup: function () {
    this.resize();

    for (var i = 0; i < 100; i++) {
      particles.push(new Particle(this.center.x, this.center.y));
    }
  },

  resize: function () {
    this.center.x = this.width * 0.5;
    this.center.y = this.height * 0.5;
  },

  draw: function () {
    this.globalCompositeOperation = "source-over";
    this.fillStyle = "#0A0B1F";
    this.fillRect(0, 0, this.width, this.height);
    this.globalCompositeOperation = "lighter";

    var p,
      i = particles.length;

    while (i--) {
      p = particles[i];
      p.opacity = round((p.charge / p.lifespan) * 100) / 100;
      p.draw(this);
      p.update();
      if (p.charge < 0 || p.radius < 0) {
        particles[i] = new Particle(
          this.mouse.x || this.center.x,
          this.mouse.y || this.center.y
        );
      }
    }
  },
});
