const wl = new (class {
  constructor() {
    (this.canvas = document.createElement("canvas")),
      document.getElementById("background").append(this.canvas),
      (this.color = null),
      this.initBackground(this);
  }
  initBackground(e) {
    const t = e.canvas,
      i = ajax.smoke_mouse_settings;
    (t.width = t.clientWidth), (t.height = t.clientHeight);
    let n = {
      SIM_RESOLUTION: 256,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: i.density_dissipation || 0.98,
      VELOCITY_DISSIPATION: i.velocity_dissipation || 0.9,
      PRESSURE_DISSIPATION: i.pressure_dissipation || 0.1,
      PRESSURE_ITERATIONS: i.pressure_iterations || 20,
      CURL: i.curl || 0,
      SPLAT_RADIUS: i.splat_radius || 0.3,
      SHADING: i.shading || !1,
      COLORFUL: i.colorful || !0,
      PAUSED: !1,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: i.transparent || !0,
    };
    let r = [],
      s = [];
    r.push(
      new (function () {
        (this.id = -1),
          (this.x = 0),
          (this.y = 0),
          (this.dx = 0),
          (this.dy = 0),
          (this.down = !1),
          (this.moved = !1),
          (this.color = [30, 0, 300]);
      })()
    ),
      (r[0].down = !0),
      (r[0].color = Z());
    const { gl: a, ext: o } = (function (e) {
      const t = {
        alpha: !0,
        depth: !1,
        stencil: !1,
        antialias: !1,
        preserveDrawingBuffer: !1,
      };
      let i = e.getContext("webgl2", t);
      const n = !!i;
      n ||
        (i = e.getContext("webgl", t) || e.getContext("experimental-webgl", t));
      let r, s;
      n
        ? (i.getExtension("EXT_color_buffer_float"),
          (s = i.getExtension("OES_texture_float_linear")))
        : ((r = i.getExtension("OES_texture_half_float")),
          (s = i.getExtension("OES_texture_half_float_linear")));
      i.clearColor(0, 0, 0, 1);
      const a = n ? i.HALF_FLOAT : r.HALF_FLOAT_OES;
      let o, c, u;
      n
        ? ((o = l(i, i.RGBA16F, i.RGBA, a)),
          (c = l(i, i.RG16F, i.RG, a)),
          (u = l(i, i.R16F, i.RED, a)))
        : ((o = l(i, i.RGBA, i.RGBA, a)),
          (c = l(i, i.RGBA, i.RGBA, a)),
          (u = l(i, i.RGBA, i.RGBA, a)));
      return {
        gl: i,
        ext: {
          formatRGBA: o,
          formatRG: c,
          formatR: u,
          halfFloatTexType: a,
          supportLinearFiltering: s,
        },
      };
    })(t);
    function l(e, t, i, n) {
      if (
        !(function (e, t, i, n) {
          let r = e.createTexture();
          e.bindTexture(e.TEXTURE_2D, r),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
            e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, i, n, null);
          let s = e.createFramebuffer();
          e.bindFramebuffer(e.FRAMEBUFFER, s),
            e.framebufferTexture2D(
              e.FRAMEBUFFER,
              e.COLOR_ATTACHMENT0,
              e.TEXTURE_2D,
              r,
              0
            );
          return (
            e.checkFramebufferStatus(e.FRAMEBUFFER) == e.FRAMEBUFFER_COMPLETE
          );
        })(e, t, i, n)
      )
        switch (t) {
          case e.R16F:
            return l(e, e.RG16F, e.RG, n);
          case e.RG16F:
            return l(e, e.RGBA16F, e.RGBA, n);
          default:
            return null;
        }
      return { internalFormat: t, format: i };
    }
    /Mobi|Android/i.test(navigator.userAgent) && (n.SHADING = !1),
      o.supportLinearFiltering || (n.SHADING = !1);
    class c {
      constructor(e, t) {
        if (
          ((this.uniforms = {}),
          (this.program = a.createProgram()),
          a.attachShader(this.program, e),
          a.attachShader(this.program, t),
          a.linkProgram(this.program),
          !a.getProgramParameter(this.program, a.LINK_STATUS))
        )
          throw a.getProgramInfoLog(this.program);
        const i = a.getProgramParameter(this.program, a.ACTIVE_UNIFORMS);
        for (let e = 0; e < i; e++) {
          const t = a.getActiveUniform(this.program, e).name;
          this.uniforms[t] = a.getUniformLocation(this.program, t);
        }
      }
      bind() {
        a.useProgram(this.program);
      }
    }
    function u(e, t) {
      const i = a.createShader(e);
      if (
        (a.shaderSource(i, t),
        a.compileShader(i),
        !a.getShaderParameter(i, a.COMPILE_STATUS))
      )
        throw a.getShaderInfoLog(i);
      return i;
    }
    const d = u(
        a.VERTEX_SHADER,
        "\n    precision highp float;\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"
      ),
      h = u(
        a.FRAGMENT_SHADER,
        "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n"
      ),
      p = u(
        a.FRAGMENT_SHADER,
        "\n    precision mediump float;\n    uniform vec4 color;\n    void main () {\n        gl_FragColor = color;\n    }\n"
      ),
      f = u(
        a.FRAGMENT_SHADER,
        "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float aspectRatio;\n    #define SCALE 125.0\n    void main () {\n        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));\n        float v = mod(uv.x + uv.y, 2.0);\n        v = v * 0.1 + 0.8;\n        gl_FragColor = vec4(vec3(v), 1.0);\n    }\n"
      ),
      m = u(
        a.FRAGMENT_SHADER,
        "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    void main () {\n        vec3 C = texture2D(uTexture, vUv).rgb;\n        float a = max(C.r, max(C.g, C.b));\n        gl_FragColor = vec4(C, a);\n    }\n"
      ),
      g = u(
        a.FRAGMENT_SHADER,
        "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform vec2 texelSize;\n    void main () {\n        vec3 L = texture2D(uTexture, vL).rgb;\n        vec3 R = texture2D(uTexture, vR).rgb;\n        vec3 T = texture2D(uTexture, vT).rgb;\n        vec3 B = texture2D(uTexture, vB).rgb;\n        vec3 C = texture2D(uTexture, vUv).rgb;\n        float dx = length(R) - length(L);\n        float dy = length(T) - length(B);\n        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n        vec3 l = vec3(0.0, 0.0, 1.0);\n        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n        C.rgb *= diffuse;\n        float a = max(C.r, max(C.g, C.b));\n        gl_FragColor = vec4(C, a);\n    }\n"
      ),
      v = u(
        a.FRAGMENT_SHADER,
        "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n"
      ),
      y = u(
        a.FRAGMENT_SHADER,
        "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n    void main () {\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);\n        gl_FragColor.a = 1.0;\n    }\n"
      ),
      b = u(
        a.FRAGMENT_SHADER,
        "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform float dt;\n    uniform float dissipation;\n    void main () {\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        gl_FragColor = dissipation * texture2D(uSource, coord);\n        gl_FragColor.a = 1.0;\n    }\n"
      ),
      w = u(
        a.FRAGMENT_SHADER,
        "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n"
      ),
      _ = u(
        a.FRAGMENT_SHADER,
        "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n"
      ),
      x = u(
        a.FRAGMENT_SHADER,
        "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n        vec2 vel = texture2D(uVelocity, vUv).xy;\n        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n    }\n"
      ),
      T = u(
        a.FRAGMENT_SHADER,
        "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n    vec2 boundary (vec2 uv) {\n        return uv;\n        // uncomment if you use wrap or repeat texture mode\n        // uv = min(max(uv, 0.0), 1.0);\n        // return uv;\n    }\n    void main () {\n        float L = texture2D(uPressure, boundary(vL)).x;\n        float R = texture2D(uPressure, boundary(vR)).x;\n        float T = texture2D(uPressure, boundary(vT)).x;\n        float B = texture2D(uPressure, boundary(vB)).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n"
      ),
      E = u(
        a.FRAGMENT_SHADER,
        "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n    vec2 boundary (vec2 uv) {\n        return uv;\n        // uv = min(max(uv, 0.0), 1.0);\n        // return uv;\n    }\n    void main () {\n        float L = texture2D(uPressure, boundary(vL)).x;\n        float R = texture2D(uPressure, boundary(vR)).x;\n        float T = texture2D(uPressure, boundary(vT)).x;\n        float B = texture2D(uPressure, boundary(vB)).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"
      ),
      S =
        (a.bindBuffer(a.ARRAY_BUFFER, a.createBuffer()),
        a.bufferData(
          a.ARRAY_BUFFER,
          new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
          a.STATIC_DRAW
        ),
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, a.createBuffer()),
        a.bufferData(
          a.ELEMENT_ARRAY_BUFFER,
          new Uint16Array([0, 1, 2, 0, 2, 3]),
          a.STATIC_DRAW
        ),
        a.vertexAttribPointer(0, 2, a.FLOAT, !1, 0, 0),
        a.enableVertexAttribArray(0),
        (e) => {
          a.bindFramebuffer(a.FRAMEBUFFER, e),
            a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0);
        });
    let C, M, O, D, A, L, P, k, $;
    const R = new c(d, h),
      z = new c(d, p),
      I = (new c(d, f), new c(d, m)),
      F = new c(d, g),
      B = new c(d, v),
      N = new c(d, o.supportLinearFiltering ? b : y),
      q = new c(d, w),
      X = new c(d, _),
      Y = new c(d, x),
      G = new c(d, T),
      H = new c(d, E);
    function j() {
      let e = J(n.SIM_RESOLUTION),
        t = J(n.DYE_RESOLUTION);
      (C = e.width), (M = e.height), (O = t.width), (D = t.height);
      const i = o.halfFloatTexType,
        r = o.formatRGBA,
        s = o.formatRG,
        l = o.formatR,
        c = o.supportLinearFiltering ? a.LINEAR : a.NEAREST;
      (A =
        null == A
          ? U(O, D, r.internalFormat, r.format, i, c)
          : W(A, O, D, r.internalFormat, r.format, i, c)),
        (L =
          null == L
            ? U(C, M, s.internalFormat, s.format, i, c)
            : W(L, C, M, s.internalFormat, s.format, i, c)),
        (P = V(C, M, l.internalFormat, l.format, i, a.NEAREST)),
        (k = V(C, M, l.internalFormat, l.format, i, a.NEAREST)),
        ($ = U(C, M, l.internalFormat, l.format, i, a.NEAREST));
    }
    function V(e, t, i, n, r, s) {
      a.activeTexture(a.TEXTURE0);
      let o = a.createTexture();
      a.bindTexture(a.TEXTURE_2D, o),
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, s),
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, s),
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
        a.texImage2D(a.TEXTURE_2D, 0, i, e, t, 0, n, r, null);
      let l = a.createFramebuffer();
      return (
        a.bindFramebuffer(a.FRAMEBUFFER, l),
        a.framebufferTexture2D(
          a.FRAMEBUFFER,
          a.COLOR_ATTACHMENT0,
          a.TEXTURE_2D,
          o,
          0
        ),
        a.viewport(0, 0, e, t),
        a.clear(a.COLOR_BUFFER_BIT),
        {
          texture: o,
          fbo: l,
          width: e,
          height: t,
          attach: (e) => (
            a.activeTexture(a.TEXTURE0 + e), a.bindTexture(a.TEXTURE_2D, o), e
          ),
        }
      );
    }
    function U(e, t, i, n, r, s) {
      let a = V(e, t, i, n, r, s),
        o = V(e, t, i, n, r, s);
      return {
        get read() {
          return a;
        },
        set read(e) {
          a = e;
        },
        get write() {
          return o;
        },
        set write(e) {
          o = e;
        },
        swap() {
          let e = a;
          (a = o), (o = e);
        },
      };
    }
    function W(e, t, i, n, r, s, o) {
      return (
        (e.read = (function (e, t, i, n, r, s, o) {
          let l = V(t, i, n, r, s, o);
          return (
            R.bind(),
            a.uniform1i(R.uniforms.uTexture, e.attach(0)),
            a.uniform1f(R.uniforms.value, 1),
            S(l.fbo),
            l
          );
        })(e.read, t, i, n, r, s, o)),
        (e.write = V(t, i, n, r, s, o)),
        e
      );
    }
    j();
    let Q = Date.now();
    function K(e, i, r, s, o) {
      a.viewport(0, 0, C, M),
        B.bind(),
        a.uniform1i(B.uniforms.uTarget, L.read.attach(0)),
        a.uniform1f(B.uniforms.aspectRatio, t.width / t.height),
        a.uniform2f(B.uniforms.point, e / t.width, 1 - i / t.height),
        a.uniform3f(B.uniforms.color, r, -s, 1),
        a.uniform1f(B.uniforms.radius, n.SPLAT_RADIUS / 100),
        S(L.write.fbo),
        L.swap(),
        a.viewport(0, 0, O, D),
        a.uniform1i(B.uniforms.uTarget, A.read.attach(0)),
        a.uniform3f(B.uniforms.color, o.r, o.g, o.b),
        S(A.write.fbo),
        A.swap();
    }
    function Z() {
      if (e.color) return e.color;
      let t = (function (e, t, i) {
        let n, r, s, a, o, l, c, u;
        switch (
          ((a = Math.floor(6 * e)),
          (o = 6 * e - a),
          (l = i * (1 - t)),
          (c = i * (1 - o * t)),
          (u = i * (1 - (1 - o) * t)),
          a % 6)
        ) {
          case 0:
            (n = i), (r = u), (s = l);
            break;
          case 1:
            (n = c), (r = i), (s = l);
            break;
          case 2:
            (n = l), (r = i), (s = u);
            break;
          case 3:
            (n = l), (r = c), (s = i);
            break;
          case 4:
            (n = u), (r = l), (s = i);
            break;
          case 5:
            (n = i), (r = l), (s = c);
        }
        return { r: n, g: r, b: s };
      })(Math.random(), 1, 1);
      return (t.r *= 0.15), (t.g *= 0.15), (t.b *= 0.15), t;
    }
    function J(e) {
      let t = a.drawingBufferWidth / a.drawingBufferHeight;
      t < 1 && (t = 1 / t);
      let i = Math.round(e * t),
        n = Math.round(e);
      return a.drawingBufferWidth > a.drawingBufferHeight
        ? { width: i, height: n }
        : { width: n, height: i };
    }
    !(function e() {
      (t.width == t.clientWidth && t.height == t.clientHeight) ||
        ((t.width = t.clientWidth), (t.height = t.clientHeight), j()),
        (function () {
          s.length > 0 &&
            (function (e) {
              for (let i = 0; i < e; i++) {
                const e = Z();
                (e.r *= 10), (e.g *= 10), (e.b *= 10);
                K(
                  t.width * Math.random(),
                  t.height * Math.random(),
                  1e3 * (Math.random() - 0.5),
                  1e3 * (Math.random() - 0.5),
                  e
                );
              }
            })(s.pop());
          for (let e = 0; e < r.length; e++) {
            const t = r[e];
            t.moved && (K(t.x, t.y, t.dx, t.dy, t.color), (t.moved = !1));
          }
          if (!n.COLORFUL) return;
          if (Q + 100 < Date.now()) {
            Q = Date.now();
            for (let e = 0; e < r.length; e++) {
              r[e].color = Z();
            }
          }
        })(),
        n.PAUSED ||
          (function (e) {
            a.disable(a.BLEND),
              a.viewport(0, 0, C, M),
              X.bind(),
              a.uniform2f(X.uniforms.texelSize, 1 / C, 1 / M),
              a.uniform1i(X.uniforms.uVelocity, L.read.attach(0)),
              S(k.fbo),
              Y.bind(),
              a.uniform2f(Y.uniforms.texelSize, 1 / C, 1 / M),
              a.uniform1i(Y.uniforms.uVelocity, L.read.attach(0)),
              a.uniform1i(Y.uniforms.uCurl, k.attach(1)),
              a.uniform1f(Y.uniforms.curl, n.CURL),
              a.uniform1f(Y.uniforms.dt, e),
              S(L.write.fbo),
              L.swap(),
              q.bind(),
              a.uniform2f(q.uniforms.texelSize, 1 / C, 1 / M),
              a.uniform1i(q.uniforms.uVelocity, L.read.attach(0)),
              S(P.fbo),
              R.bind(),
              a.uniform1i(R.uniforms.uTexture, $.read.attach(0)),
              a.uniform1f(R.uniforms.value, n.PRESSURE_DISSIPATION),
              S($.write.fbo),
              $.swap(),
              G.bind(),
              a.uniform2f(G.uniforms.texelSize, 1 / C, 1 / M),
              a.uniform1i(G.uniforms.uDivergence, P.attach(0));
            for (let e = 0; e < n.PRESSURE_ITERATIONS; e++)
              a.uniform1i(G.uniforms.uPressure, $.read.attach(1)),
                S($.write.fbo),
                $.swap();
            H.bind(),
              a.uniform2f(H.uniforms.texelSize, 1 / C, 1 / M),
              a.uniform1i(H.uniforms.uPressure, $.read.attach(0)),
              a.uniform1i(H.uniforms.uVelocity, L.read.attach(1)),
              S(L.write.fbo),
              L.swap(),
              N.bind(),
              a.uniform2f(N.uniforms.texelSize, 1 / C, 1 / M),
              o.supportLinearFiltering ||
                a.uniform2f(N.uniforms.dyeTexelSize, 1 / C, 1 / M);
            let t = L.read.attach(0);
            a.uniform1i(N.uniforms.uVelocity, t),
              a.uniform1i(N.uniforms.uSource, t),
              a.uniform1f(N.uniforms.dt, e),
              a.uniform1f(N.uniforms.dissipation, n.VELOCITY_DISSIPATION),
              S(L.write.fbo),
              L.swap(),
              a.viewport(0, 0, O, D),
              o.supportLinearFiltering ||
                a.uniform2f(N.uniforms.dyeTexelSize, 1 / O, 1 / D);
            a.uniform1i(N.uniforms.uVelocity, L.read.attach(0)),
              a.uniform1i(N.uniforms.uSource, A.read.attach(1)),
              a.uniform1f(N.uniforms.dissipation, n.DENSITY_DISSIPATION),
              S(A.write.fbo),
              A.swap();
          })(0.016);
      (function (e) {
        null != e && n.TRANSPARENT
          ? a.disable(a.BLEND)
          : (a.blendFunc(a.ONE, a.ONE_MINUS_SRC_ALPHA), a.enable(a.BLEND));
        let t = null == e ? a.drawingBufferWidth : O,
          i = null == e ? a.drawingBufferHeight : D;
        if ((a.viewport(0, 0, t, i), !n.TRANSPARENT)) {
          z.bind();
          let t = n.BACK_COLOR;
          a.uniform4f(z.uniforms.color, t.r / 255, t.g / 255, t.b / 255, 1),
            S(e);
        }
        if (n.SHADING) {
          let e = F;
          e.bind(),
            a.uniform2f(e.uniforms.texelSize, 1 / t, 1 / i),
            a.uniform1i(e.uniforms.uTexture, A.read.attach(0));
        } else {
          let e = I;
          e.bind(), a.uniform1i(e.uniforms.uTexture, A.read.attach(0));
        }
        S(e);
      })(null),
        requestAnimationFrame(e);
    })(),
      window.addEventListener("mousemove", (e) => {
        const t = e.target.tagName.toLowerCase();
        "img" !== t &&
          "a" !== t &&
          "canvas" !== t &&
          ((r[0].moved = r[0].down),
          (r[0].dx = 5 * (e.clientX - r[0].x)),
          (r[0].dy = 5 * (e.clientY - r[0].y)),
          (r[0].x = e.clientX),
          (r[0].y = e.clientY));
      }),
      window.addEventListener(
        "touchmove",
        (e) => {
          const t = e.targetTouches;
          let i = r[0];
          (i.moved = i.down),
            (i.dx = 8 * (t[0].pageX - window.scrollX - i.x)),
            (i.dy = 8 * (t[0].pageY - window.scrollY - i.y)),
            (i.x = t[0].pageX - window.scrollX),
            (i.y = t[0].pageY - window.scrollY);
        },
        !1
      ),
      window.addEventListener("touchstart", (e) => {
        const t = e.targetTouches;
        (r[0].id = t[0].identifier),
          (r[0].down = !0),
          (r[0].x = t[0].pageX - window.scrollX),
          (r[0].y = t[0].pageY - window.scrollY),
          (r[0].color = Z());
      });
  }
})();
