! function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e)
            for (var a in e) n.d(r, a, function (t) {
                return e[t]
            }.bind(null, a));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 47)
}([function (e, t, n) { }, function (e, t, n) {
    THREE.GPUParticleSystem = function (e) {
        THREE.Object3D.apply(this, arguments), e = e || {}, this.PARTICLE_COUNT = e.maxParticles || 1e6, this.PARTICLE_CONTAINERS = e.containerCount || 1, this.PARTICLE_NOISE_TEXTURE = e.particleNoiseTex || null, this.PARTICLE_SPRITE_TEXTURE = e.particleSpriteTex || null, this.PARTICLES_PER_CONTAINER = Math.ceil(this.PARTICLE_COUNT / this.PARTICLE_CONTAINERS), this.PARTICLE_CURSOR = 0, this.time = 0, this.particleContainers = [], this.rand = [];
        var t, r = {
            vertexShader: ["uniform float uTime;", "uniform float uScale;", "uniform sampler2D tNoise;", "attribute vec3 positionStart;", "attribute float startTime;", "attribute vec3 velocity;", "attribute float turbulence;", "attribute vec3 color;", "attribute float size;", "attribute float lifeTime;", "varying vec4 vColor;", "varying float lifeLeft;", "void main() {", "\tvColor = vec4( color, 1.0 );", "\tvec3 newPosition;", "\tvec3 v;", "\tfloat timeElapsed = uTime - startTime;", "\tlifeLeft = 1.0 - ( timeElapsed / lifeTime );", "\tgl_PointSize = ( uScale * size ) * lifeLeft;", "\tv.x = ( velocity.x - 0.5 ) * 3.0;", "\tv.y = ( velocity.y - 0.5 ) * 3.0;", "\tv.z = ( velocity.z - 0.5 ) * 3.0;", "\tnewPosition = positionStart + ( v * 10.0 ) * ( uTime - startTime );", "\tvec3 noise = texture2D( tNoise, vec2( newPosition.x * 0.015 + ( uTime * 0.05 ), newPosition.y * 0.02 + ( uTime * 0.015 ) ) ).rgb;", "\tvec3 noiseVel = ( noise.rgb - 0.5 ) * 30.0;", "\tnewPosition = mix( newPosition, newPosition + vec3( noiseVel * ( turbulence * 5.0 ) ), ( timeElapsed / lifeTime ) );", "\tif( v.y > 0. && v.y < .05 ) {", "\t\tlifeLeft = 0.0;", "\t}", "\tif( v.x < - 1.45 ) {", "\t\tlifeLeft = 0.0;", "\t}", "\tif( timeElapsed > 0.0 ) {", "\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );", "\t} else {", "\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "\t\tlifeLeft = 0.0;", "\t\tgl_PointSize = 0.;", "\t}", "}"].join("\n"),
            fragmentShader: ["float scaleLinear( float value, vec2 valueDomain ) {", "\treturn ( value - valueDomain.x ) / ( valueDomain.y - valueDomain.x );", "}", "float scaleLinear( float value, vec2 valueDomain, vec2 valueRange ) {", "\treturn mix( valueRange.x, valueRange.y, scaleLinear( value, valueDomain ) );", "}", "varying vec4 vColor;", "varying float lifeLeft;", "uniform sampler2D tSprite;", "void main() {", "\tfloat alpha = 0.;", "\tif( lifeLeft > 0.995 ) {", "\t\talpha = scaleLinear( lifeLeft, vec2( 1.0, 0.995 ), vec2( 0.0, 1.0 ) );", "\t} else {", "\t\talpha = lifeLeft * 0.75;", "\t}", "\tvec4 tex = texture2D( tSprite, gl_PointCoord );", "\tgl_FragColor = vec4( vColor.rgb * tex.a, alpha * tex.a );", "}"].join("\n")
        };
        for (t = 1e5; t > 0; t--) this.rand.push(Math.random() - .5);
        this.random = function () {
            return ++t >= this.rand.length ? this.rand[t = 1] : this.rand[t]
        };
        var a = new THREE.TextureLoader;
        this.particleNoiseTex = this.PARTICLE_NOISE_TEXTURE || a.load(n(2)), this.particleNoiseTex.wrapS = this.particleNoiseTex.wrapT = THREE.RepeatWrapping, this.particleSpriteTex = this.PARTICLE_SPRITE_TEXTURE || a.load(n(3)), this.particleSpriteTex.wrapS = this.particleSpriteTex.wrapT = THREE.RepeatWrapping, this.particleShaderMat = new THREE.ShaderMaterial({
            transparent: !0,
            depthWrite: !1,
            uniforms: {
                uTime: {
                    value: 0
                },
                uScale: {
                    value: 1
                },
                tNoise: {
                    value: this.particleNoiseTex
                },
                tSprite: {
                    value: this.particleSpriteTex
                }
            },
            blending: THREE.AdditiveBlending,
            vertexShader: r.vertexShader,
            fragmentShader: r.fragmentShader
        }), this.particleShaderMat.defaultAttributeValues.particlePositionsStartTime = [0, 0, 0, 0], this.particleShaderMat.defaultAttributeValues.particleVelColSizeLife = [0, 0, 0, 0], this.init = function () {
            for (var e = 0; e < this.PARTICLE_CONTAINERS; e++) {
                var t = new THREE.GPUParticleContainer(this.PARTICLES_PER_CONTAINER, this);
                this.particleContainers.push(t), this.add(t)
            }
        }, this.spawnParticle = function (e) {
            this.PARTICLE_CURSOR++, this.PARTICLE_CURSOR >= this.PARTICLE_COUNT && (this.PARTICLE_CURSOR = 1), this.particleContainers[Math.floor(this.PARTICLE_CURSOR / this.PARTICLES_PER_CONTAINER)].spawnParticle(e)
        }, this.update = function (e) {
            for (var t = 0; t < this.PARTICLE_CONTAINERS; t++) this.particleContainers[t].update(e)
        }, this.dispose = function () {
            this.particleShaderMat.dispose(), this.particleNoiseTex.dispose(), this.particleSpriteTex.dispose();
            for (var e = 0; e < this.PARTICLE_CONTAINERS; e++) this.particleContainers[e].dispose()
        }, this.init()
    }, THREE.GPUParticleSystem.prototype = Object.create(THREE.Object3D.prototype), THREE.GPUParticleSystem.prototype.constructor = THREE.GPUParticleSystem, THREE.GPUParticleContainer = function (e, t) {
        THREE.Object3D.apply(this, arguments), this.PARTICLE_COUNT = e || 1e5, this.PARTICLE_CURSOR = 0, this.time = 0, this.offset = 0, this.count = 0, this.DPR = window.devicePixelRatio, this.GPUParticleSystem = t, this.particleUpdate = !1, this.particleShaderGeo = new THREE.BufferGeometry, this.particleShaderGeo.addAttribute("position", new THREE.BufferAttribute(new Float32Array(3 * this.PARTICLE_COUNT), 3).setDynamic(!0)), this.particleShaderGeo.addAttribute("positionStart", new THREE.BufferAttribute(new Float32Array(3 * this.PARTICLE_COUNT), 3).setDynamic(!0)), this.particleShaderGeo.addAttribute("startTime", new THREE.BufferAttribute(new Float32Array(this.PARTICLE_COUNT), 1).setDynamic(!0)), this.particleShaderGeo.addAttribute("velocity", new THREE.BufferAttribute(new Float32Array(3 * this.PARTICLE_COUNT), 3).setDynamic(!0)), this.particleShaderGeo.addAttribute("turbulence", new THREE.BufferAttribute(new Float32Array(this.PARTICLE_COUNT), 1).setDynamic(!0)), this.particleShaderGeo.addAttribute("color", new THREE.BufferAttribute(new Float32Array(3 * this.PARTICLE_COUNT), 3).setDynamic(!0)), this.particleShaderGeo.addAttribute("size", new THREE.BufferAttribute(new Float32Array(this.PARTICLE_COUNT), 1).setDynamic(!0)), this.particleShaderGeo.addAttribute("lifeTime", new THREE.BufferAttribute(new Float32Array(this.PARTICLE_COUNT), 1).setDynamic(!0)), this.particleShaderMat = this.GPUParticleSystem.particleShaderMat;
        var n = new THREE.Vector3,
            r = new THREE.Vector3,
            a = new THREE.Color;
        this.spawnParticle = function (e) {
            var o = this.particleShaderGeo.getAttribute("positionStart"),
                s = this.particleShaderGeo.getAttribute("startTime"),
                c = this.particleShaderGeo.getAttribute("velocity"),
                u = this.particleShaderGeo.getAttribute("turbulence"),
                l = this.particleShaderGeo.getAttribute("color"),
                p = this.particleShaderGeo.getAttribute("size"),
                d = this.particleShaderGeo.getAttribute("lifeTime");
            n = void 0 !== (e = e || {}).position ? n.copy(e.position) : n.set(0, 0, 0), r = void 0 !== e.velocity ? r.copy(e.velocity) : r.set(0, 0, 0), a = void 0 !== e.color ? a.set(e.color) : a.set(16777215);
            var f = void 0 !== e.positionRandomness ? e.positionRandomness : 0,
                h = void 0 !== e.velocityRandomness ? e.velocityRandomness : 0,
                m = void 0 !== e.colorRandomness ? e.colorRandomness : 1,
                g = void 0 !== e.turbulence ? e.turbulence : 1,
                b = void 0 !== e.lifetime ? e.lifetime : 5,
                v = void 0 !== e.size ? e.size : 10,
                E = void 0 !== e.sizeRandomness ? e.sizeRandomness : 0,
                y = void 0 !== e.smoothPosition && e.smoothPosition;
            void 0 !== this.DPR && (v *= this.DPR), i = this.PARTICLE_CURSOR, o.array[3 * i + 0] = n.x + t.random() * f, o.array[3 * i + 1] = n.y + t.random() * f, o.array[3 * i + 2] = n.z + t.random() * f, !0 === y && (o.array[3 * i + 0] += -r.x * t.random(), o.array[3 * i + 1] += -r.y * t.random(), o.array[3 * i + 2] += -r.z * t.random());
            var R = r.x + t.random() * h,
                T = r.y + t.random() * h,
                w = r.z + t.random() * h;
            R = THREE.Math.clamp((R - -2) / 4, 0, 1), T = THREE.Math.clamp((T - -2) / 4, 0, 1), w = THREE.Math.clamp((w - -2) / 4, 0, 1), c.array[3 * i + 0] = R, c.array[3 * i + 1] = T, c.array[3 * i + 2] = w, a.r = THREE.Math.clamp(a.r + t.random() * m, 0, 1), a.g = THREE.Math.clamp(a.g + t.random() * m, 0, 1), a.b = THREE.Math.clamp(a.b + t.random() * m, 0, 1), l.array[3 * i + 0] = a.r, l.array[3 * i + 1] = a.g, l.array[3 * i + 2] = a.b, u.array[i] = g, p.array[i] = v + t.random() * E, d.array[i] = b, s.array[i] = this.time + .02 * t.random(), 0 === this.offset && (this.offset = this.PARTICLE_CURSOR), this.count++, this.PARTICLE_CURSOR++, this.PARTICLE_CURSOR >= this.PARTICLE_COUNT && (this.PARTICLE_CURSOR = 0), this.particleUpdate = !0
        }, this.init = function () {
            this.particleSystem = new THREE.Points(this.particleShaderGeo, this.particleShaderMat), this.particleSystem.frustumCulled = !1, this.add(this.particleSystem)
        }, this.update = function (e) {
            this.time = e, this.particleShaderMat.uniforms.uTime.value = e, this.geometryUpdate()
        }, this.geometryUpdate = function () {
            if (!0 === this.particleUpdate) {
                this.particleUpdate = !1;
                var e = this.particleShaderGeo.getAttribute("positionStart"),
                    t = this.particleShaderGeo.getAttribute("startTime"),
                    n = this.particleShaderGeo.getAttribute("velocity"),
                    r = this.particleShaderGeo.getAttribute("turbulence"),
                    a = this.particleShaderGeo.getAttribute("color"),
                    o = this.particleShaderGeo.getAttribute("size"),
                    i = this.particleShaderGeo.getAttribute("lifeTime");
                this.offset + this.count < this.PARTICLE_COUNT ? (e.updateRange.offset = this.offset * e.itemSize, t.updateRange.offset = this.offset * t.itemSize, n.updateRange.offset = this.offset * n.itemSize, r.updateRange.offset = this.offset * r.itemSize, a.updateRange.offset = this.offset * a.itemSize, o.updateRange.offset = this.offset * o.itemSize, i.updateRange.offset = this.offset * i.itemSize, e.updateRange.count = this.count * e.itemSize, t.updateRange.count = this.count * t.itemSize, n.updateRange.count = this.count * n.itemSize, r.updateRange.count = this.count * r.itemSize, a.updateRange.count = this.count * a.itemSize, o.updateRange.count = this.count * o.itemSize, i.updateRange.count = this.count * i.itemSize) : (e.updateRange.offset = 0, t.updateRange.offset = 0, n.updateRange.offset = 0, r.updateRange.offset = 0, a.updateRange.offset = 0, o.updateRange.offset = 0, i.updateRange.offset = 0, e.updateRange.count = e.count, t.updateRange.count = t.count, n.updateRange.count = n.count, r.updateRange.count = r.count, a.updateRange.count = a.count, o.updateRange.count = o.count, i.updateRange.count = i.count), e.needsUpdate = !0, t.needsUpdate = !0, n.needsUpdate = !0, r.needsUpdate = !0, a.needsUpdate = !0, o.needsUpdate = !0, i.needsUpdate = !0, this.offset = 0, this.count = 0
            }
        }, this.dispose = function () {
            this.particleShaderGeo.dispose()
        }, this.init()
    }, THREE.GPUParticleContainer.prototype = Object.create(THREE.Object3D.prototype), THREE.GPUParticleContainer.prototype.constructor = THREE.GPUParticleContainer
}, function (e, t, n) {
    e.exports = n.p + "color-scheme.png"
}, function (e, t, n) {
    e.exports = n.p + "dot.png"
}, function (e, t, n) {
    var r = {
        "./DeepSpaceBlue/front.jpg": 5,
        "./DeepSpaceGreen/front.jpg": 6,
        "./DeepSpaceRed/front.jpg": 7,
        "./Stars/front.jpg": 8,
        "./sunset/front.jpg": 9,
        "./sunset_2/front.jpg": 10
    };

    function a(e) {
        var t = o(e);
        return n(t)
    }

    function o(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }
    a.keys = function () {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 4
}, function (e, t, n) {
    e.exports = n.p + "d283aaf2349c50877490da581d7c54cf.jpg"
}, function (e, t, n) {
    e.exports = n.p + "91eb80db9adfa404a8556ee37a6b7687.jpg"
}, function (e, t, n) {
    e.exports = n.p + "63edaa80b87cca12860941638eaec197.jpg"
}, function (e, t, n) {
    e.exports = n.p + "a203671b07a6d27e992369d4655bdb21.jpg"
}, function (e, t, n) {
    e.exports = n.p + "30268eff833255e98d0f6c6bd9ed2629.jpg"
}, function (e, t, n) {
    e.exports = n.p + "188c73e929942fe561bb7d4ef3614f07.jpg"
}, function (e, t, n) {
    var r = {
        "./DeepSpaceBlue/back.jpg": 12,
        "./DeepSpaceGreen/back.jpg": 13,
        "./DeepSpaceRed/back.jpg": 14,
        "./Stars/back.jpg": 15,
        "./sunset/back.jpg": 16,
        "./sunset_2/back.jpg": 17
    };

    function a(e) {
        var t = o(e);
        return n(t)
    }

    function o(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }
    a.keys = function () {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 11
}, function (e, t, n) {
    e.exports = n.p + "c7ba745fbdb0a068eb020e7a0b8aa617.jpg"
}, function (e, t, n) {
    e.exports = n.p + "cb8182a05c5321b9b0360dae59d8c1ae.jpg"
}, function (e, t, n) {
    e.exports = n.p + "cc498cfd7e8e86042a59417aca633bde.jpg"
}, function (e, t, n) {
    e.exports = n.p + "e93b067e8aea827cb493dbd7e270d922.jpg"
}, function (e, t, n) {
    e.exports = n.p + "46262a9323dee2232077fa782ab20f18.jpg"
}, function (e, t, n) {
    e.exports = n.p + "7b020e831ed797d3e48cefa819f558ff.jpg"
}, function (e, t, n) {
    var r = {
        "./DeepSpaceBlue/up.jpg": 19,
        "./DeepSpaceGreen/up.jpg": 20,
        "./DeepSpaceRed/up.jpg": 21,
        "./Stars/up.jpg": 22,
        "./sunset/up.jpg": 23,
        "./sunset_2/up.jpg": 24
    };

    function a(e) {
        var t = o(e);
        return n(t)
    }

    function o(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }
    a.keys = function () {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 18
}, function (e, t, n) {
    e.exports = n.p + "026425a04a522fb14a476111205d8e94.jpg"
}, function (e, t, n) {
    e.exports = n.p + "6b98e1257abc6a5825dbfea76ae03ac9.jpg"
}, function (e, t, n) {
    e.exports = n.p + "618e8c7205e4492998e5cb0a54365d49.jpg"
}, function (e, t, n) {
    e.exports = n.p + "893a893684088caf7a1b8988f134d108.jpg"
}, function (e, t, n) {
    e.exports = n.p + "b140b5f7feeb0aa9c9843465f5434daa.jpg"
}, function (e, t, n) {
    e.exports = n.p + "b140b5f7feeb0aa9c9843465f5434daa.jpg"
}, function (e, t, n) {
    var r = {
        "./DeepSpaceBlue/down.jpg": 26,
        "./DeepSpaceGreen/down.jpg": 27,
        "./DeepSpaceRed/down.jpg": 28,
        "./Stars/down.jpg": 29,
        "./sunset/down.jpg": 30,
        "./sunset_2/down.jpg": 31
    };

    function a(e) {
        var t = o(e);
        return n(t)
    }

    function o(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }
    a.keys = function () {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 25
}, function (e, t, n) {
    e.exports = n.p + "17af9f2afe84cf5d8ee12e4f51ab8602.jpg"
}, function (e, t, n) {
    e.exports = n.p + "ba6fa7a31c6bbb2420fa1bcf0e20188d.jpg"
}, function (e, t, n) {
    e.exports = n.p + "92f73bda76760e3efb0a55c8bdc34878.jpg"
}, function (e, t, n) {
    e.exports = n.p + "e971799caab0a438e0db0030c81cbd8a.jpg"
}, function (e, t, n) {
    e.exports = n.p + "5d191a3c8e1c48e07ed5a8ce0d10e168.jpg"
}, function (e, t, n) {
    e.exports = n.p + "78f107da8f7f8d18f504ed2caa589873.jpg"
}, function (e, t, n) {
    var r = {
        "./DeepSpaceBlue/right.jpg": 33,
        "./DeepSpaceGreen/right.jpg": 34,
        "./DeepSpaceRed/right.jpg": 35,
        "./Stars/right.jpg": 36,
        "./sunset/right.jpg": 37,
        "./sunset_2/right.jpg": 38
    };

    function a(e) {
        var t = o(e);
        return n(t)
    }

    function o(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }
    a.keys = function () {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 32
}, function (e, t, n) {
    e.exports = n.p + "9317549ebc27d742e6498a1f08d5b91b.jpg"
}, function (e, t, n) {
    e.exports = n.p + "4c5feb28e93e1279c5c8755c186abbe0.jpg"
}, function (e, t, n) {
    e.exports = n.p + "029738871a712c9e5b1379fc46262489.jpg"
}, function (e, t, n) {
    e.exports = n.p + "f39ac6a4a1924dc0d018bded17c52bd1.jpg"
}, function (e, t, n) {
    e.exports = n.p + "8e594f0e27f2cf97ed66283d9e36922c.jpg"
}, function (e, t, n) {
    e.exports = n.p + "e74af39906b879779ed310076a8f5973.jpg"
}, function (e, t, n) {
    var r = {
        "./DeepSpaceBlue/left.jpg": 40,
        "./DeepSpaceGreen/left.jpg": 41,
        "./DeepSpaceRed/left.jpg": 42,
        "./Stars/left.jpg": 43,
        "./sunset/left.jpg": 44,
        "./sunset_2/left.jpg": 45
    };

    function a(e) {
        var t = o(e);
        return n(t)
    }

    function o(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }
    a.keys = function () {
        return Object.keys(r)
    }, a.resolve = o, e.exports = a, a.id = 39
}, function (e, t, n) {
    e.exports = n.p + "ad04779e8bc9a58d7d61749a0ddbd357.jpg"
}, function (e, t, n) {
    e.exports = n.p + "50227720bcf7c70481db8c91a21774eb.jpg"
}, function (e, t, n) {
    e.exports = n.p + "1636a5556bc89da3435d4c75650ada0e.jpg"
}, function (e, t, n) {
    e.exports = n.p + "24f5def778522956edfe32a599e7a77d.jpg"
}, function (e, t, n) {
    e.exports = n.p + "39c2313172d949f3949a9b5cb4eca61f.jpg"
}, function (e, t, n) {
    e.exports = n.p + "e2cb0223999e85e61362129fae0393c7.jpg"
}, function (e, t) {
    e.exports = function (e) {
        function t(t, n) {
            var r, a, o, i, s;
            this.object = t, this.domElement = void 0 !== n ? n : document, this.enabled = !0, this.target = new e.Vector3, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                BOTTOM: 40
            }, this.mouseButtons = {
                ORBIT: e.MOUSE.LEFT,
                ZOOM: e.MOUSE.MIDDLE,
                PAN: e.MOUSE.RIGHT
            }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function () {
                return m.phi
            }, this.getAzimuthalAngle = function () {
                return m.theta
            }, this.reset = function () {
                c.target.copy(c.target0), c.object.position.copy(c.position0), c.object.zoom = c.zoom0, c.object.updateProjectionMatrix(), c.dispatchEvent(u), c.update(), f = d.NONE
            }, this.update = (r = new e.Vector3, a = (new e.Quaternion).setFromUnitVectors(t.up, new e.Vector3(0, 1, 0)), o = a.clone().inverse(), i = new e.Vector3, s = new e.Quaternion, function () {
                var e = c.object.position;
                return r.copy(e).sub(c.target), r.applyQuaternion(a), m.setFromVector3(r), c.autoRotate && f === d.NONE && A(2 * Math.PI / 60 / 60 * c.autoRotateSpeed), m.theta += g.theta, m.phi += g.phi, m.theta = Math.max(c.minAzimuthAngle, Math.min(c.maxAzimuthAngle, m.theta)), m.phi = Math.max(c.minPolarAngle, Math.min(c.maxPolarAngle, m.phi)), m.makeSafe(), m.radius *= b, m.radius = Math.max(c.minDistance, Math.min(c.maxDistance, m.radius)), c.target.add(v), r.setFromSpherical(m), r.applyQuaternion(o), e.copy(c.target).add(r), c.object.lookAt(c.target), !0 === c.enableDamping ? (g.theta *= 1 - c.dampingFactor, g.phi *= 1 - c.dampingFactor) : g.set(0, 0, 0), b = 1, v.set(0, 0, 0), !!(E || i.distanceToSquared(c.object.position) > h || 8 * (1 - s.dot(c.object.quaternion)) > h) && (c.dispatchEvent(u), i.copy(c.object.position), s.copy(c.object.quaternion), E = !1, !0)
            }), this.dispose = function () {
                c.domElement.removeEventListener("contextmenu", Y, !1), c.domElement.removeEventListener("mousedown", k, !1), c.domElement.removeEventListener("wheel", B, !1), c.domElement.removeEventListener("touchstart", F, !1), c.domElement.removeEventListener("touchend", Z, !1), c.domElement.removeEventListener("touchmove", V, !1), document.removeEventListener("mousemove", _, !1), document.removeEventListener("mouseup", z, !1), window.removeEventListener("keydown", G, !1)
            };
            var c = this,
                u = {
                    type: "change"
                },
                l = {
                    type: "start"
                },
                p = {
                    type: "end"
                },
                d = {
                    NONE: -1,
                    ROTATE: 0,
                    DOLLY: 1,
                    PAN: 2,
                    TOUCH_ROTATE: 3,
                    TOUCH_DOLLY: 4,
                    TOUCH_PAN: 5
                },
                f = d.NONE,
                h = 1e-6,
                m = new e.Spherical,
                g = new e.Spherical,
                b = 1,
                v = new e.Vector3,
                E = !1,
                y = new e.Vector2,
                R = new e.Vector2,
                T = new e.Vector2,
                w = new e.Vector2,
                S = new e.Vector2,
                O = new e.Vector2,
                x = new e.Vector2,
                P = new e.Vector2,
                j = new e.Vector2;

            function C() {
                return Math.pow(.95, c.zoomSpeed)
            }

            function A(e) {
                g.theta -= e
            }

            function M(e) {
                g.phi -= e
            }
            var L, D = (L = new e.Vector3, function (e, t) {
                L.setFromMatrixColumn(t, 0), L.multiplyScalar(-e), v.add(L)
            }),
                H = function () {
                    var t = new e.Vector3;
                    return function (e, n) {
                        t.setFromMatrixColumn(n, 1), t.multiplyScalar(e), v.add(t)
                    }
                }(),
                N = function () {
                    var t = new e.Vector3;
                    return function (n, r) {
                        var a = c.domElement === document ? c.domElement.body : c.domElement;
                        if (c.object instanceof e.PerspectiveCamera) {
                            var o = c.object.position;
                            t.copy(o).sub(c.target);
                            var i = t.length();
                            i *= Math.tan(c.object.fov / 2 * Math.PI / 180), D(2 * n * i / a.clientHeight, c.object.matrix), H(2 * r * i / a.clientHeight, c.object.matrix)
                        } else c.object instanceof e.OrthographicCamera ? (D(n * (c.object.right - c.object.left) / c.object.zoom / a.clientWidth, c.object.matrix), H(r * (c.object.top - c.object.bottom) / c.object.zoom / a.clientHeight, c.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), c.enablePan = !1)
                    }
                }();

            function U(t) {
                c.object instanceof e.PerspectiveCamera ? b /= t : c.object instanceof e.OrthographicCamera ? (c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom * t)), c.object.updateProjectionMatrix(), E = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), c.enableZoom = !1)
            }

            function I(t) {
                c.object instanceof e.PerspectiveCamera ? b *= t : c.object instanceof e.OrthographicCamera ? (c.object.zoom = Math.max(c.minZoom, Math.min(c.maxZoom, c.object.zoom / t)), c.object.updateProjectionMatrix(), E = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), c.enableZoom = !1)
            }

            function k(e) {
                if (!1 !== c.enabled) {
                    if (e.preventDefault(), e.button === c.mouseButtons.ORBIT) {
                        if (!1 === c.enableRotate) return;
                        ! function (e) {
                            y.set(e.clientX, e.clientY)
                        }(e), f = d.ROTATE
                    } else if (e.button === c.mouseButtons.ZOOM) {
                        if (!1 === c.enableZoom) return;
                        ! function (e) {
                            x.set(e.clientX, e.clientY)
                        }(e), f = d.DOLLY
                    } else if (e.button === c.mouseButtons.PAN) {
                        if (!1 === c.enablePan) return;
                        ! function (e) {
                            w.set(e.clientX, e.clientY)
                        }(e), f = d.PAN
                    }
                    f !== d.NONE && (document.addEventListener("mousemove", _, !1), document.addEventListener("mouseup", z, !1), c.dispatchEvent(l))
                }
            }

            function _(e) {
                if (!1 !== c.enabled)
                    if (e.preventDefault(), f === d.ROTATE) {
                        if (!1 === c.enableRotate) return;
                        ! function (e) {
                            R.set(e.clientX, e.clientY), T.subVectors(R, y);
                            var t = c.domElement === document ? c.domElement.body : c.domElement;
                            A(2 * Math.PI * T.x / t.clientWidth * c.rotateSpeed), M(2 * Math.PI * T.y / t.clientHeight * c.rotateSpeed), y.copy(R), c.update()
                        }(e)
                    } else if (f === d.DOLLY) {
                        if (!1 === c.enableZoom) return;
                        ! function (e) {
                            P.set(e.clientX, e.clientY), j.subVectors(P, x), j.y > 0 ? U(C()) : j.y < 0 && I(C()), x.copy(P), c.update()
                        }(e)
                    } else if (f === d.PAN) {
                        if (!1 === c.enablePan) return;
                        ! function (e) {
                            S.set(e.clientX, e.clientY), O.subVectors(S, w), N(O.x, O.y), w.copy(S), c.update()
                        }(e)
                    }
            }

            function z(e) {
                !1 !== c.enabled && (document.removeEventListener("mousemove", _, !1), document.removeEventListener("mouseup", z, !1), c.dispatchEvent(p), f = d.NONE)
            }

            function B(e) {
                !1 === c.enabled || !1 === c.enableZoom || f !== d.NONE && f !== d.ROTATE || (e.preventDefault(), e.stopPropagation(), function (e) {
                    e.deltaY < 0 ? I(C()) : e.deltaY > 0 && U(C()), c.update()
                }(e), c.dispatchEvent(l), c.dispatchEvent(p))
            }

            function G(e) {
                !1 !== c.enabled && !1 !== c.enableKeys && !1 !== c.enablePan && function (e) {
                    switch (e.keyCode) {
                        case c.keys.UP:
                            N(0, c.keyPanSpeed), c.update();
                            break;
                        case c.keys.BOTTOM:
                            N(0, -c.keyPanSpeed), c.update();
                            break;
                        case c.keys.LEFT:
                            N(c.keyPanSpeed, 0), c.update();
                            break;
                        case c.keys.RIGHT:
                            N(-c.keyPanSpeed, 0), c.update()
                    }
                }(e)
            }

            function F(e) {
                if (!1 !== c.enabled) {
                    switch (e.touches.length) {
                        case 1:
                            if (!1 === c.enableRotate) return;
                            ! function (e) {
                                y.set(e.touches[0].pageX, e.touches[0].pageY)
                            }(e), f = d.TOUCH_ROTATE;
                            break;
                        case 2:
                            if (!1 === c.enableZoom) return;
                            ! function (e) {
                                var t = e.touches[0].pageX - e.touches[1].pageX,
                                    n = e.touches[0].pageY - e.touches[1].pageY,
                                    r = Math.sqrt(t * t + n * n);
                                x.set(0, r)
                            }(e), f = d.TOUCH_DOLLY;
                            break;
                        case 3:
                            if (!1 === c.enablePan) return;
                            ! function (e) {
                                w.set(e.touches[0].pageX, e.touches[0].pageY)
                            }(e), f = d.TOUCH_PAN;
                            break;
                        default:
                            f = d.NONE
                    }
                    f !== d.NONE && c.dispatchEvent(l)
                }
            }

            function V(e) {
                if (!1 !== c.enabled) switch (e.preventDefault(), e.stopPropagation(), e.touches.length) {
                    case 1:
                        if (!1 === c.enableRotate) return;
                        if (f !== d.TOUCH_ROTATE) return;
                        ! function (e) {
                            R.set(e.touches[0].pageX, e.touches[0].pageY), T.subVectors(R, y);
                            var t = c.domElement === document ? c.domElement.body : c.domElement;
                            A(2 * Math.PI * T.x / t.clientWidth * c.rotateSpeed), M(2 * Math.PI * T.y / t.clientHeight * c.rotateSpeed), y.copy(R), c.update()
                        }(e);
                        break;
                    case 2:
                        if (!1 === c.enableZoom) return;
                        if (f !== d.TOUCH_DOLLY) return;
                        ! function (e) {
                            var t = e.touches[0].pageX - e.touches[1].pageX,
                                n = e.touches[0].pageY - e.touches[1].pageY,
                                r = Math.sqrt(t * t + n * n);
                            P.set(0, r), j.subVectors(P, x), j.y > 0 ? I(C()) : j.y < 0 && U(C()), x.copy(P), c.update()
                        }(e);
                        break;
                    case 3:
                        if (!1 === c.enablePan) return;
                        if (f !== d.TOUCH_PAN) return;
                        ! function (e) {
                            S.set(e.touches[0].pageX, e.touches[0].pageY), O.subVectors(S, w), N(O.x, O.y), w.copy(S), c.update()
                        }(e);
                        break;
                    default:
                        f = d.NONE
                }
            }

            function Z(e) {
                !1 !== c.enabled && (c.dispatchEvent(p), f = d.NONE)
            }

            function Y(e) {
                e.preventDefault()
            }
            c.domElement.addEventListener("contextmenu", Y, !1), c.domElement.addEventListener("mousedown", k, !1), c.domElement.addEventListener("wheel", B, !1), c.domElement.addEventListener("touchstart", F, !1), c.domElement.addEventListener("touchend", Z, !1), c.domElement.addEventListener("touchmove", V, !1), window.addEventListener("keydown", G, !1), this.update()
        }
        return t.prototype = Object.create(e.EventDispatcher.prototype), t.prototype.constructor = t, Object.defineProperties(t.prototype, {
            center: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .center has been renamed to .target"), this.target
                }
            },
            noZoom: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom
                },
                set: function (e) {
                    console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !e
                }
            },
            noRotate: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate
                },
                set: function (e) {
                    console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !e
                }
            },
            noPan: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan
                },
                set: function (e) {
                    console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !e
                }
            },
            noKeys: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys
                },
                set: function (e) {
                    console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !e
                }
            },
            staticMoving: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.enableDamping
                },
                set: function (e) {
                    console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.enableDamping = !e
                }
            },
            dynamicDampingFactor: {
                get: function () {
                    return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor
                },
                set: function (e) {
                    console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor = e
                }
            }
        }), t
    }
}, function (e, t, n) {
    "use strict";
    n.r(t);
    n(0), n(1);
    var r = {
        renderer: new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: !1
        }),
        camera: new THREE.PerspectiveCamera(45, document.documentElement.clientWidth / document.documentElement.clientHeight, .1, 1e4),
        options: {},
        particleOptions: {}
    };

    function a(e, t, n) {
        this.r = e, this.g = t, this.b = n, this.rS = this.gS = this.bS = 1
    }
    a.prototype.rgb = function () {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
    }, a.prototype.change = function () {
        20 != this.r && 240 != this.r || (this.rS *= -1), 20 != this.g && 240 != this.g || (this.gS *= -1), 20 != this.b && 240 != this.b || (this.bS *= -1), this.r = this.clamp(this.r + this.rS, 20, 240), this.g = this.clamp(this.g + this.gS, 20, 240), this.b = this.clamp(this.b + this.bS, 20, 240)
    }, a.prototype.clamp = function (e, t, n) {
        return Math.min(Math.max(e, t), n)
    };
    var o = {
        update: null,
        begin: null,
        loopBegin: null,
        changeBegin: null,
        change: null,
        changeComplete: null,
        loopComplete: null,
        complete: null,
        loop: 1,
        direction: "normal",
        autoplay: !0,
        timelineOffset: 0
    },
        i = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: "easeOutElastic(1, .5)",
            round: 0
        },
        s = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective"],
        c = {
            CSS: {},
            springs: {}
        };

    function u(e, t, n) {
        return Math.min(Math.max(e, t), n)
    }

    function l(e, t) {
        return e.indexOf(t) > -1
    }

    function p(e, t) {
        return e.apply(null, t)
    }
    var d = {
        arr: function (e) {
            return Array.isArray(e)
        },
        obj: function (e) {
            return l(Object.prototype.toString.call(e), "Object")
        },
        pth: function (e) {
            return d.obj(e) && e.hasOwnProperty("totalLength")
        },
        svg: function (e) {
            return e instanceof SVGElement
        },
        inp: function (e) {
            return e instanceof HTMLInputElement
        },
        dom: function (e) {
            return e.nodeType || d.svg(e)
        },
        str: function (e) {
            return "string" == typeof e
        },
        fnc: function (e) {
            return "function" == typeof e
        },
        und: function (e) {
            return void 0 === e
        },
        hex: function (e) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)
        },
        rgb: function (e) {
            return /^rgb/.test(e)
        },
        hsl: function (e) {
            return /^hsl/.test(e)
        },
        col: function (e) {
            return d.hex(e) || d.rgb(e) || d.hsl(e)
        },
        key: function (e) {
            return !o.hasOwnProperty(e) && !i.hasOwnProperty(e) && "targets" !== e && "keyframes" !== e
        }
    };

    function f(e) {
        var t = /\(([^)]+)\)/.exec(e);
        return t ? t[1].split(",").map((function (e) {
            return parseFloat(e)
        })) : []
    }

    function h(e, t) {
        var n = f(e),
            r = u(d.und(n[0]) ? 1 : n[0], .1, 100),
            a = u(d.und(n[1]) ? 100 : n[1], .1, 100),
            o = u(d.und(n[2]) ? 10 : n[2], .1, 100),
            i = u(d.und(n[3]) ? 0 : n[3], .1, 100),
            s = Math.sqrt(a / r),
            l = o / (2 * Math.sqrt(a * r)),
            p = l < 1 ? s * Math.sqrt(1 - l * l) : 0,
            h = 1,
            m = l < 1 ? (l * s - i) / p : -i + s;

        function g(e) {
            var n = t ? t * e / 1e3 : e;
            return n = l < 1 ? Math.exp(-n * l * s) * (h * Math.cos(p * n) + m * Math.sin(p * n)) : (h + m * n) * Math.exp(-n * s), 0 === e || 1 === e ? e : 1 - n
        }
        return t ? g : function () {
            var t = c.springs[e];
            if (t) return t;
            for (var n = 0, r = 0; ;)
                if (1 === g(n += 1 / 6)) {
                    if (++r >= 16) break
                } else r = 0;
            var a = n * (1 / 6) * 1e3;
            return c.springs[e] = a, a
        }
    }

    function m(e) {
        return void 0 === e && (e = 10),
            function (t) {
                return Math.round(t * e) * (1 / e)
            }
    }
    var g, b, v = function () {
        var e = 11,
            t = 1 / (e - 1);

        function n(e, t) {
            return 1 - 3 * t + 3 * e
        }

        function r(e, t) {
            return 3 * t - 6 * e
        }

        function a(e) {
            return 3 * e
        }

        function o(e, t, o) {
            return ((n(t, o) * e + r(t, o)) * e + a(t)) * e
        }

        function i(e, t, o) {
            return 3 * n(t, o) * e * e + 2 * r(t, o) * e + a(t)
        }
        return function (n, r, a, s) {
            if (0 <= n && n <= 1 && 0 <= a && a <= 1) {
                var c = new Float32Array(e);
                if (n !== r || a !== s)
                    for (var u = 0; u < e; ++u) c[u] = o(u * t, n, a);
                return function (e) {
                    return n === r && a === s ? e : 0 === e || 1 === e ? e : o(l(e), r, s)
                }
            }

            function l(r) {
                for (var s = 0, u = 1, l = e - 1; u !== l && c[u] <= r; ++u) s += t;
                --u;
                var p = s + (r - c[u]) / (c[u + 1] - c[u]) * t,
                    d = i(p, n, a);
                return d >= .001 ? function (e, t, n, r) {
                    for (var a = 0; a < 4; ++a) {
                        var s = i(t, n, r);
                        if (0 === s) return t;
                        t -= (o(t, n, r) - e) / s
                    }
                    return t
                }(r, p, n, a) : 0 === d ? p : function (e, t, n, r, a) {
                    var i, s, c = 0;
                    do {
                        (i = o(s = t + (n - t) / 2, r, a) - e) > 0 ? n = s : t = s
                    } while (Math.abs(i) > 1e-7 && ++c < 10);
                    return s
                }(r, s, s + t, n, a)
            }
        }
    }(),
        E = (g = {
            linear: function () {
                return function (e) {
                    return e
                }
            }
        }, b = {
            Sine: function () {
                return function (e) {
                    return 1 - Math.cos(e * Math.PI / 2)
                }
            },
            Circ: function () {
                return function (e) {
                    return 1 - Math.sqrt(1 - e * e)
                }
            },
            Back: function () {
                return function (e) {
                    return e * e * (3 * e - 2)
                }
            },
            Bounce: function () {
                return function (e) {
                    for (var t, n = 4; e < ((t = Math.pow(2, --n)) - 1) / 11;);
                    return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                }
            },
            Elastic: function (e, t) {
                void 0 === e && (e = 1), void 0 === t && (t = .5);
                var n = u(e, 1, 10),
                    r = u(t, .1, 2);
                return function (e) {
                    return 0 === e || 1 === e ? e : -n * Math.pow(2, 10 * (e - 1)) * Math.sin((e - 1 - r / (2 * Math.PI) * Math.asin(1 / n)) * (2 * Math.PI) / r)
                }
            }
        }, ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach((function (e, t) {
            b[e] = function () {
                return function (e) {
                    return Math.pow(e, t + 2)
                }
            }
        })), Object.keys(b).forEach((function (e) {
            var t = b[e];
            g["easeIn" + e] = t, g["easeOut" + e] = function (e, n) {
                return function (r) {
                    return 1 - t(e, n)(1 - r)
                }
            }, g["easeInOut" + e] = function (e, n) {
                return function (r) {
                    return r < .5 ? t(e, n)(2 * r) / 2 : 1 - t(e, n)(-2 * r + 2) / 2
                }
            }
        })), g);

    function y(e, t) {
        if (d.fnc(e)) return e;
        var n = e.split("(")[0],
            r = E[n],
            a = f(e);
        switch (n) {
            case "spring":
                return h(e, t);
            case "cubicBezier":
                return p(v, a);
            case "steps":
                return p(m, a);
            default:
                return p(r, a)
        }
    }

    function R(e) {
        try {
            return document.querySelectorAll(e)
        } catch (e) {
            return
        }
    }

    function T(e, t) {
        for (var n = e.length, r = arguments.length >= 2 ? arguments[1] : void 0, a = [], o = 0; o < n; o++)
            if (o in e) {
                var i = e[o];
                t.call(r, i, o, e) && a.push(i)
            } return a
    }

    function w(e) {
        return e.reduce((function (e, t) {
            return e.concat(d.arr(t) ? w(t) : t)
        }), [])
    }

    function S(e) {
        return d.arr(e) ? e : (d.str(e) && (e = R(e) || e), e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e])
    }

    function O(e, t) {
        return e.some((function (e) {
            return e === t
        }))
    }

    function x(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t
    }

    function P(e, t) {
        var n = x(e);
        for (var r in e) n[r] = t.hasOwnProperty(r) ? t[r] : e[r];
        return n
    }

    function j(e, t) {
        var n = x(e);
        for (var r in t) n[r] = d.und(e[r]) ? t[r] : e[r];
        return n
    }

    function C(e) {
        return d.rgb(e) ? (n = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t = e)) ? "rgba(" + n[1] + ",1)" : t : d.hex(e) ? function (e) {
            var t = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function (e, t, n, r) {
                return t + t + n + n + r + r
            })),
                n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return "rgba(" + parseInt(n[1], 16) + "," + parseInt(n[2], 16) + "," + parseInt(n[3], 16) + ",1)"
        }(e) : d.hsl(e) ? function (e) {
            var t, n, r, a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),
                o = parseInt(a[1], 10) / 360,
                i = parseInt(a[2], 10) / 100,
                s = parseInt(a[3], 10) / 100,
                c = a[4] || 1;

            function u(e, t, n) {
                return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
            }
            if (0 == i) t = n = r = s;
            else {
                var l = s < .5 ? s * (1 + i) : s + i - s * i,
                    p = 2 * s - l;
                t = u(p, l, o + 1 / 3), n = u(p, l, o), r = u(p, l, o - 1 / 3)
            }
            return "rgba(" + 255 * t + "," + 255 * n + "," + 255 * r + "," + c + ")"
        }(e) : void 0;
        var t, n
    }

    function A(e) {
        var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);
        if (t) return t[1]
    }

    function M(e, t) {
        return d.fnc(e) ? e(t.target, t.id, t.total) : e
    }

    function L(e, t) {
        return e.getAttribute(t)
    }

    function D(e, t, n) {
        if (O([n, "deg", "rad", "turn"], A(t))) return t;
        var r = c.CSS[t + n];
        if (!d.und(r)) return r;
        var a = document.createElement(e.tagName),
            o = e.parentNode && e.parentNode !== document ? e.parentNode : document.body;
        o.appendChild(a), a.style.position = "absolute", a.style.width = 100 + n;
        var i = 100 / a.offsetWidth;
        o.removeChild(a);
        var s = i * parseFloat(t);
        return c.CSS[t + n] = s, s
    }

    function H(e, t, n) {
        if (t in e.style) {
            var r = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                a = e.style[t] || getComputedStyle(e).getPropertyValue(r) || "0";
            return n ? D(e, a, n) : a
        }
    }

    function N(e, t) {
        return d.dom(e) && !d.inp(e) && (L(e, t) || d.svg(e) && e[t]) ? "attribute" : d.dom(e) && O(s, t) ? "transform" : d.dom(e) && "transform" !== t && H(e, t) ? "css" : null != e[t] ? "object" : void 0
    }

    function U(e) {
        if (d.dom(e)) {
            for (var t, n = e.style.transform || "", r = /(\w+)\(([^)]*)\)/g, a = new Map; t = r.exec(n);) a.set(t[1], t[2]);
            return a
        }
    }

    function I(e, t, n, r) {
        var a = l(t, "scale") ? 1 : 0 + function (e) {
            return l(e, "translate") || "perspective" === e ? "px" : l(e, "rotate") || l(e, "skew") ? "deg" : void 0
        }(t),
            o = U(e).get(t) || a;
        return n && (n.transforms.list.set(t, o), n.transforms.last = t), r ? D(e, o, r) : o
    }

    function k(e, t, n, r) {
        switch (N(e, t)) {
            case "transform":
                return I(e, t, r, n);
            case "css":
                return H(e, t, n);
            case "attribute":
                return L(e, t);
            default:
                return e[t] || 0
        }
    }

    function _(e, t) {
        var n = /^(\*=|\+=|-=)/.exec(e);
        if (!n) return e;
        var r = A(e) || 0,
            a = parseFloat(t),
            o = parseFloat(e.replace(n[0], ""));
        switch (n[0][0]) {
            case "+":
                return a + o + r;
            case "-":
                return a - o + r;
            case "*":
                return a * o + r
        }
    }

    function z(e, t) {
        if (d.col(e)) return C(e);
        if (/\s/g.test(e)) return e;
        var n = A(e),
            r = n ? e.substr(0, e.length - n.length) : e;
        return t ? r + t : r
    }

    function B(e, t) {
        return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
    }

    function G(e) {
        for (var t, n = e.points, r = 0, a = 0; a < n.numberOfItems; a++) {
            var o = n.getItem(a);
            a > 0 && (r += B(t, o)), t = o
        }
        return r
    }

    function F(e) {
        if (e.getTotalLength) return e.getTotalLength();
        switch (e.tagName.toLowerCase()) {
            case "circle":
                return function (e) {
                    return 2 * Math.PI * L(e, "r")
                }(e);
            case "rect":
                return function (e) {
                    return 2 * L(e, "width") + 2 * L(e, "height")
                }(e);
            case "line":
                return function (e) {
                    return B({
                        x: L(e, "x1"),
                        y: L(e, "y1")
                    }, {
                        x: L(e, "x2"),
                        y: L(e, "y2")
                    })
                }(e);
            case "polyline":
                return G(e);
            case "polygon":
                return function (e) {
                    var t = e.points;
                    return G(e) + B(t.getItem(t.numberOfItems - 1), t.getItem(0))
                }(e)
        }
    }

    function V(e, t) {
        var n = t || {},
            r = n.el || function (e) {
                for (var t = e.parentNode; d.svg(t) && d.svg(t.parentNode);) t = t.parentNode;
                return t
            }(e),
            a = r.getBoundingClientRect(),
            o = L(r, "viewBox"),
            i = a.width,
            s = a.height,
            c = n.viewBox || (o ? o.split(" ") : [0, 0, i, s]);
        return {
            el: r,
            viewBox: c,
            x: c[0] / 1,
            y: c[1] / 1,
            w: i / c[2],
            h: s / c[3]
        }
    }

    function Z(e, t) {
        function n(n) {
            void 0 === n && (n = 0);
            var r = t + n >= 1 ? t + n : 0;
            return e.el.getPointAtLength(r)
        }
        var r = V(e.el, e.svg),
            a = n(),
            o = n(-1),
            i = n(1);
        switch (e.property) {
            case "x":
                return (a.x - r.x) * r.w;
            case "y":
                return (a.y - r.y) * r.h;
            case "angle":
                return 180 * Math.atan2(i.y - o.y, i.x - o.x) / Math.PI
        }
    }

    function Y(e, t) {
        var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            r = z(d.pth(e) ? e.totalLength : e, t) + "";
        return {
            original: r,
            numbers: r.match(n) ? r.match(n).map(Number) : [0],
            strings: d.str(e) || t ? r.split(n) : []
        }
    }

    function X(e) {
        return T(e ? w(d.arr(e) ? e.map(S) : S(e)) : [], (function (e, t, n) {
            return n.indexOf(e) === t
        }))
    }

    function q(e) {
        var t = X(e);
        return t.map((function (e, n) {
            return {
                target: e,
                id: n,
                total: t.length,
                transforms: {
                    list: U(e)
                }
            }
        }))
    }

    function W(e, t) {
        var n = x(t);
        if (/^spring/.test(n.easing) && (n.duration = h(n.easing)), d.arr(e)) {
            var r = e.length;
            2 === r && !d.obj(e[0]) ? e = {
                value: e
            } : d.fnc(t.duration) || (n.duration = t.duration / r)
        }
        var a = d.arr(e) ? e : [e];
        return a.map((function (e, n) {
            var r = d.obj(e) && !d.pth(e) ? e : {
                value: e
            };
            return d.und(r.delay) && (r.delay = n ? 0 : t.delay), d.und(r.endDelay) && (r.endDelay = n === a.length - 1 ? t.endDelay : 0), r
        })).map((function (e) {
            return j(e, n)
        }))
    }

    function Q(e, t) {
        var n = [],
            r = t.keyframes;
        for (var a in r && (t = j(function (e) {
            for (var t = T(w(e.map((function (e) {
                return Object.keys(e)
            }))), (function (e) {
                return d.key(e)
            })).reduce((function (e, t) {
                return e.indexOf(t) < 0 && e.push(t), e
            }), []), n = {}, r = function (r) {
                var a = t[r];
                n[a] = e.map((function (e) {
                    var t = {};
                    for (var n in e) d.key(n) ? n == a && (t.value = e[n]) : t[n] = e[n];
                    return t
                }))
            }, a = 0; a < t.length; a++) r(a);
            return n
        }(r), t)), t) d.key(a) && n.push({
            name: a,
            tweens: W(t[a], e)
        });
        return n
    }

    function K(e, t) {
        var n;
        return e.tweens.map((function (r) {
            var a = function (e, t) {
                var n = {};
                for (var r in e) {
                    var a = M(e[r], t);
                    d.arr(a) && 1 === (a = a.map((function (e) {
                        return M(e, t)
                    }))).length && (a = a[0]), n[r] = a
                }
                return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n
            }(r, t),
                o = a.value,
                i = d.arr(o) ? o[1] : o,
                s = A(i),
                c = k(t.target, e.name, s, t),
                u = n ? n.to.original : c,
                l = d.arr(o) ? o[0] : u,
                p = A(l) || A(c),
                f = s || p;
            return d.und(i) && (i = u), a.from = Y(l, f), a.to = Y(_(i, l), f), a.start = n ? n.end : 0, a.end = a.start + a.delay + a.duration + a.endDelay, a.easing = y(a.easing, a.duration), a.isPath = d.pth(o), a.isColor = d.col(a.from.original), a.isColor && (a.round = 1), n = a, a
        }))
    }
    var $ = {
        css: function (e, t, n) {
            return e.style[t] = n
        },
        attribute: function (e, t, n) {
            return e.setAttribute(t, n)
        },
        object: function (e, t, n) {
            return e[t] = n
        },
        transform: function (e, t, n, r, a) {
            if (r.list.set(t, n), t === r.last || a) {
                var o = "";
                r.list.forEach((function (e, t) {
                    o += t + "(" + e + ") "
                })), e.style.transform = o
            }
        }
    };

    function J(e, t) {
        q(e).forEach((function (e) {
            for (var n in t) {
                var r = M(t[n], e),
                    a = e.target,
                    o = A(r),
                    i = k(a, n, o, e),
                    s = _(z(r, o || A(i)), i),
                    c = N(a, n);
                $[c](a, n, s, e.transforms, !0)
            }
        }))
    }

    function ee(e, t) {
        return T(w(e.map((function (e) {
            return t.map((function (t) {
                return function (e, t) {
                    var n = N(e.target, t.name);
                    if (n) {
                        var r = K(t, e),
                            a = r[r.length - 1];
                        return {
                            type: n,
                            property: t.name,
                            animatable: e,
                            tweens: r,
                            duration: a.end,
                            delay: r[0].delay,
                            endDelay: a.endDelay
                        }
                    }
                }(e, t)
            }))
        }))), (function (e) {
            return !d.und(e)
        }))
    }

    function te(e, t) {
        var n = e.length,
            r = function (e) {
                return e.timelineOffset ? e.timelineOffset : 0
            },
            a = {};
        return a.duration = n ? Math.max.apply(Math, e.map((function (e) {
            return r(e) + e.duration
        }))) : t.duration, a.delay = n ? Math.min.apply(Math, e.map((function (e) {
            return r(e) + e.delay
        }))) : t.delay, a.endDelay = n ? a.duration - Math.max.apply(Math, e.map((function (e) {
            return r(e) + e.duration - e.endDelay
        }))) : t.endDelay, a
    }
    var ne = 0;
    var re, ae = [],
        oe = [],
        ie = function () {
            function e() {
                re = requestAnimationFrame(t)
            }

            function t(t) {
                var n = ae.length;
                if (n) {
                    for (var r = 0; r < n;) {
                        var a = ae[r];
                        if (a.paused) {
                            var o = ae.indexOf(a);
                            o > -1 && (ae.splice(o, 1), n = ae.length)
                        } else a.tick(t);
                        r++
                    }
                    e()
                } else re = cancelAnimationFrame(re)
            }
            return e
        }();

    function se(e) {
        void 0 === e && (e = {});
        var t, n = 0,
            r = 0,
            a = 0,
            s = 0,
            c = null;

        function l(e) {
            var t = window.Promise && new Promise((function (e) {
                return c = e
            }));
            return e.finished = t, t
        }
        var p = function (e) {
            var t = P(o, e),
                n = P(i, e),
                r = Q(n, e),
                a = q(e.targets),
                s = ee(a, r),
                c = te(s, n),
                u = ne;
            return ne++, j(t, {
                id: u,
                children: [],
                animatables: a,
                animations: s,
                duration: c.duration,
                delay: c.delay,
                endDelay: c.endDelay
            })
        }(e);
        l(p);

        function d() {
            var e = p.direction;
            "alternate" !== e && (p.direction = "normal" !== e ? "normal" : "reverse"), p.reversed = !p.reversed, t.forEach((function (e) {
                return e.reversed = p.reversed
            }))
        }

        function f(e) {
            return p.reversed ? p.duration - e : e
        }

        function h() {
            n = 0, r = f(p.currentTime) * (1 / se.speed)
        }

        function m(e, t) {
            t && t.seek(e - t.timelineOffset)
        }

        function g(e) {
            for (var t = 0, n = p.animations, r = n.length; t < r;) {
                var a = n[t],
                    o = a.animatable,
                    i = a.tweens,
                    s = i.length - 1,
                    c = i[s];
                s && (c = T(i, (function (t) {
                    return e < t.end
                }))[0] || c);
                for (var l = u(e - c.start - c.delay, 0, c.duration) / c.duration, d = isNaN(l) ? 1 : c.easing(l), f = c.to.strings, h = c.round, m = [], g = c.to.numbers.length, b = void 0, v = 0; v < g; v++) {
                    var E = void 0,
                        y = c.to.numbers[v],
                        R = c.from.numbers[v] || 0;
                    E = c.isPath ? Z(c.value, d * y) : R + d * (y - R), h && (c.isColor && v > 2 || (E = Math.round(E * h) / h)), m.push(E)
                }
                var w = f.length;
                if (w) {
                    b = f[0];
                    for (var S = 0; S < w; S++) {
                        f[S];
                        var O = f[S + 1],
                            x = m[S];
                        isNaN(x) || (b += O ? x + O : x + " ")
                    }
                } else b = m[0];
                $[a.type](o.target, a.property, b, o.transforms), a.currentValue = b, t++
            }
        }

        function b(e) {
            p[e] && !p.passThrough && p[e](p)
        }

        function v(e) {
            var o = p.duration,
                i = p.delay,
                h = o - p.endDelay,
                v = f(e);
            p.progress = u(v / o * 100, 0, 100), p.reversePlayback = v < p.currentTime, t && function (e) {
                if (p.reversePlayback)
                    for (var n = s; n--;) m(e, t[n]);
                else
                    for (var r = 0; r < s; r++) m(e, t[r])
            }(v), !p.began && p.currentTime > 0 && (p.began = !0, b("begin")), !p.loopBegan && p.currentTime > 0 && (p.loopBegan = !0, b("loopBegin")), v <= i && 0 !== p.currentTime && g(0), (v >= h && p.currentTime !== o || !o) && g(o), v > i && v < h ? (p.changeBegan || (p.changeBegan = !0, p.changeCompleted = !1, b("changeBegin")), b("change"), g(v)) : p.changeBegan && (p.changeCompleted = !0, p.changeBegan = !1, b("changeComplete")), p.currentTime = u(v, 0, o), p.began && b("update"), e >= o && (r = 0, p.remaining && !0 !== p.remaining && p.remaining--, p.remaining ? (n = a, b("loopComplete"), p.loopBegan = !1, "alternate" === p.direction && d()) : (p.paused = !0, p.completed || (p.completed = !0, b("loopComplete"), b("complete"), !p.passThrough && "Promise" in window && (c(), l(p)))))
        }
        return p.reset = function () {
            var e = p.direction;
            p.passThrough = !1, p.currentTime = 0, p.progress = 0, p.paused = !0, p.began = !1, p.loopBegan = !1, p.changeBegan = !1, p.completed = !1, p.changeCompleted = !1, p.reversePlayback = !1, p.reversed = "reverse" === e, p.remaining = p.loop, t = p.children;
            for (var n = s = t.length; n--;) p.children[n].reset();
            (p.reversed && !0 !== p.loop || "alternate" === e && 1 === p.loop) && p.remaining++, g(p.reversed ? p.duration : 0)
        }, p.set = function (e, t) {
            return J(e, t), p
        }, p.tick = function (e) {
            a = e, n || (n = a), v((a + (r - n)) * se.speed)
        }, p.seek = function (e) {
            v(f(e))
        }, p.pause = function () {
            p.paused = !0, h()
        }, p.play = function () {
            p.paused && (p.completed && p.reset(), p.paused = !1, ae.push(p), h(), re || ie())
        }, p.reverse = function () {
            d(), h()
        }, p.restart = function () {
            p.reset(), p.play()
        }, p.reset(), p.autoplay && p.play(), p
    }

    function ce(e, t) {
        for (var n = t.length; n--;) O(e, t[n].animatable.target) && t.splice(n, 1)
    }
    "undefined" != typeof document && document.addEventListener("visibilitychange", (function () {
        document.hidden ? (ae.forEach((function (e) {
            return e.pause()
        })), oe = ae.slice(0), se.running = ae = []) : oe.forEach((function (e) {
            return e.play()
        }))
    })), se.version = "3.1.0", se.speed = 1, se.running = ae, se.remove = function (e) {
        for (var t = X(e), n = ae.length; n--;) {
            var r = ae[n],
                a = r.animations,
                o = r.children;
            ce(t, a);
            for (var i = o.length; i--;) {
                var s = o[i],
                    c = s.animations;
                ce(t, c), c.length || s.children.length || o.splice(i, 1)
            }
            a.length || o.length || r.pause()
        }
    }, se.get = k, se.set = J, se.convertPx = D, se.path = function (e, t) {
        var n = d.str(e) ? R(e)[0] : e,
            r = t || 100;
        return function (e) {
            return {
                property: e,
                el: n,
                svg: V(n),
                totalLength: F(n) * (r / 100)
            }
        }
    }, se.setDashoffset = function (e) {
        var t = F(e);
        return e.setAttribute("stroke-dasharray", t), t
    }, se.stagger = function (e, t) {
        void 0 === t && (t = {});
        var n = t.direction || "normal",
            r = t.easing ? y(t.easing) : null,
            a = t.grid,
            o = t.axis,
            i = t.from || 0,
            s = "first" === i,
            c = "center" === i,
            u = "last" === i,
            l = d.arr(e),
            p = l ? parseFloat(e[0]) : parseFloat(e),
            f = l ? parseFloat(e[1]) : 0,
            h = A(l ? e[1] : e) || 0,
            m = t.start || 0 + (l ? p : 0),
            g = [],
            b = 0;
        return function (e, t, d) {
            if (s && (i = 0), c && (i = (d - 1) / 2), u && (i = d - 1), !g.length) {
                for (var v = 0; v < d; v++) {
                    if (a) {
                        var E = c ? (a[0] - 1) / 2 : i % a[0],
                            y = c ? (a[1] - 1) / 2 : Math.floor(i / a[0]),
                            R = E - v % a[0],
                            T = y - Math.floor(v / a[0]),
                            w = Math.sqrt(R * R + T * T);
                        "x" === o && (w = -R), "y" === o && (w = -T), g.push(w)
                    } else g.push(Math.abs(i - v));
                    b = Math.max.apply(Math, g)
                }
                r && (g = g.map((function (e) {
                    return r(e / b) * b
                }))), "reverse" === n && (g = g.map((function (e) {
                    return o ? e < 0 ? -1 * e : -e : Math.abs(b - e)
                })))
            }
            return m + (l ? (f - p) / b : p) * (Math.round(100 * g[t]) / 100) + h
        }
    }, se.timeline = function (e) {
        void 0 === e && (e = {});
        var t = se(e);
        return t.duration = 0, t.add = function (n, r) {
            var a = ae.indexOf(t),
                o = t.children;

            function s(e) {
                e.passThrough = !0
            }
            a > -1 && ae.splice(a, 1);
            for (var c = 0; c < o.length; c++) s(o[c]);
            var u = j(n, P(i, e));
            u.targets = u.targets || e.targets;
            var l = t.duration;
            u.autoplay = !1, u.direction = t.direction, u.timelineOffset = d.und(r) ? l : _(r, l), s(t), t.seek(u.timelineOffset);
            var p = se(u);
            s(p), o.push(p);
            var f = te(o, e);
            return t.delay = f.delay, t.endDelay = f.endDelay, t.duration = f.duration, t.seek(0), t.reset(), t.autoplay && t.play(), t
        }, t
    }, se.easing = y, se.penner = E, se.random = function (e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    };
    var ue = se;

    function le(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }
    var pe = function () {
        function e() {
            ! function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, a, o;
        return t = e, (a = [{
            key: "switchOff",
            value: function (e) {
                ue({
                    targets: r.options,
                    spawnRate: 0,
                    duration: e,
                    easing: "easeInOutQuad"
                }), ue({
                    targets: r.cube.material.materials,
                    opacity: 0,
                    duration: e,
                    easing: "easeInOutQuad"
                })
            }
        }, {
            key: "tweenPreset",
            value: function (e, t) {
                var n = t || 5e3;
                ue({
                    targets: r.options,
                    lifetime: e.lifetime,
                    spawnRate: e.spawnRate,
                    turbulence: e.turbulence,
                    velocityRandomness: e.velocityRandomness,
                    size: e.size,
                    positionRandomness: e.positionRandomness,
                    sizeRandomness: e.sizeRandomness,
                    duration: n,
                    easing: "easeInOutQuad"
                }), r.options.colorAnimation = e.colorAnimation, r.options.colorRandomness = e.colorRandomness, ue({
                    targets: r.options.color,
                    r: e.color.r,
                    g: e.color.g,
                    b: e.color.b,
                    round: 1,
                    duration: n,
                    easing: "easeInOutQuad"
                }), e.skybox && this.loadSkybox(e.skybox, n)
            }
        }, {
            key: "pulse",
            value: function () {
                void 0 !== r.options && void 0 !== r.options.color && (r.options.size *= 2, r.particleOptions.color = "rgb(0,0,0)", setTimeout((function () {
                    r.options.size /= 2, r.particleOptions.color = r.options.color.rgb()
                }), 50))
            }
        }, {
            key: "loadSkybox",
            value: function (e, t) {
                var a = e;
                r.cube.material = new THREE.MultiMaterial([new THREE.MeshBasicMaterial({
                    opacity: 0,
                    transparent: !0,
                    map: (new THREE.TextureLoader).load(n(4)("./" + a + "/front.jpg")),
                    side: THREE.DoubleSide
                }), new THREE.MeshBasicMaterial({
                    opacity: 0,
                    transparent: !0,
                    map: (new THREE.TextureLoader).load(n(11)("./" + a + "/back.jpg")),
                    side: THREE.DoubleSide
                }), new THREE.MeshBasicMaterial({
                    opacity: 0,
                    transparent: !0,
                    map: (new THREE.TextureLoader).load(n(18)("./" + a + "/up.jpg")),
                    side: THREE.DoubleSide
                }), new THREE.MeshBasicMaterial({
                    opacity: 0,
                    transparent: !0,
                    map: (new THREE.TextureLoader).load(n(25)("./" + a + "/down.jpg")),
                    side: THREE.DoubleSide
                }), new THREE.MeshBasicMaterial({
                    opacity: 0,
                    transparent: !0,
                    map: (new THREE.TextureLoader).load(n(32)("./" + a + "/right.jpg")),
                    side: THREE.DoubleSide
                }), new THREE.MeshBasicMaterial({
                    opacity: 0,
                    transparent: !0,
                    map: (new THREE.TextureLoader).load(n(39)("./" + a + "/left.jpg")),
                    side: THREE.DoubleSide
                })]), setTimeout((function () {
                    ue({
                        targets: r.cube.material.materials,
                        opacity: .25,
                        duration: t,
                        easing: "easeInOutQuad"
                    })
                }), 1e3)
            }
        }]) && le(t.prototype, a), o && le(t, o), e
    }();
    var de, fe, he, me = (he = [], (fe = "presets") in (de = {
        presets: [],
        maxParticles: 1e5
    }) ? Object.defineProperty(de, fe, {
        value: he,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : de[fe] = he, de);
    me.presets.black = {
        lifetime: 20,
        positionRandomness: 0,
        size: 2,
        sizeRandomness: 2,
        spawnRate: 250,
        turbulence: 2,
        velocityRandomness: 10,
        color: {
            r: 40,
            g: 200,
            b: 255
        },
        colorRandomness: 0,
        colorAnimation: !0,
        skybox: !0
    }, me.switchPreset = function (e, t, n) {
        n.switchOff(1e3), setTimeout((function () {
            n.tweenPreset(e)
        }), 1e3);
        var r = me.presets[e].track;
        t.switchTrack(r)
    };
    var ge = me,
        be = n(46)(THREE),
        ve = new pe,
        Ee = 0,
        ye = 1,
        Re = [],
        Te = 9,
        we = new THREE.Scene;
    we.background = new THREE.Color(0);
    var Se = document.getElementById("canvas");
    r.renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight), r.camera.position.z = 1e3, ue({
        targets: r.camera.position,
        z: 90,
        duration: 4e3,
        easing: "easeOutQuad",
        complete: function () {
            setInterval((function () {
                ve.pulse()
            }), 3e3)
        }
    }), we.add(r.camera);
    var Oe = new be(r.camera, r.renderer.domElement);

    function xe() {
        requestAnimationFrame(xe), Ee += .01 * ye, Oe.update(), r.options.colorAnimation && r.options.color.change(), r.particleOptions.lifetime = r.options.lifetime, r.particleOptions.positionRandomness = r.options.positionRandomness, r.particleOptions.size = r.options.size, r.particleOptions.sizeRandomness = r.options.sizeRandomness, r.particleOptions.spawnRate = r.options.spawnRate, r.particleOptions.turbulence = r.options.turbulence, r.particleOptions.velocityRandomness = r.options.velocityRandomness, r.particleOptions.color = r.options.color.rgb(), r.particleOptions.colorRandomness = r.options.colorRandomness, r.particleOptions.sizeAttenuation = !0, r.particleOptions.velocityRandomness = r.options.velocityRandomness;
        for (var e = 0; e < r.options.spawnRate; e++)
            for (var t = 0; t < Te; t++) Re[t].spawnParticle(r.particleOptions);
        for (t = 0; t < Te; t++) Re[t].update(Ee + 2 * t);
        r.light.color = new THREE.Color(r.particleOptions.color), r.renderer.render(we, r.camera)
    }
    Oe.enableDamping = !1, Oe.dampingFactor = .25, Oe.enableZoom = !0, Oe.autoRotate = !0, Oe.autoRotateSpeed = 2, Oe.minDistance = 10, Oe.maxDistance = 500, Oe.enableRotate = !0, Oe.enablePan = !1, Oe.maxPolarAngle = .55 * Math.PI, r.cube = new THREE.Mesh(new THREE.SphereBufferGeometry(400, 16, 16), new THREE.MeshStandardMaterial({
        color: 3355443,
        side: THREE.BackSide,
        metalness: .1,
        roughness: .25,
        wireframe: !1
    })), we.add(r.cube), r.light = new THREE.PointLight(16777215, .2, 1e3), we.add(r.light), window.addEventListener("load", (function () {
        document.body.style.opacity = 1, Se.addEventListener("mousedown", (function (e) {
            1 == e.which && (Oe.autoRotateSpeed = .5, ye = .1)
        })), Se.addEventListener("mouseup", (function (e) {
            1 == e.which && (Oe.autoRotateSpeed = 1, ye = 1)
        })), window.addEventListener("resize", (function () {
            var e = window.innerWidth,
                t = window.innerHeight;
            r.renderer.setSize(e, t), r.camera.aspect = e / t, r.camera.updateProjectionMatrix()
        })),
            function () {
                var e = ge.presets.black,
                    t = {
                        lifetime: e.lifetime,
                        positionRandomness: e.positionRandomness,
                        size: e.size,
                        sizeRandomness: e.sizeRandomness,
                        spawnRate: e.spawnRate,
                        turbulence: e.turbulence,
                        velocityRandomness: e.velocityRandomness,
                        colorRandomness: e.colorRandomness,
                        color: new a(e.color.r, e.color.g, e.color.b),
                        colorAnimation: e.colorAnimation,
                        skybox: e.skybox
                    };
                for (var n in t) r.options[n] = t[n];
                for (n = 0; n < Te; n++) Re[n] = new THREE.GPUParticleSystem({
                    maxParticles: ge.maxParticles
                }), Re[n].rotation.y = 2 * n, Re[n].rotation.z = 10 * n, we.add(Re[n]);
                r.camera.lookAt(we.position), setTimeout((function () {
                    xe()
                }), 150)
            }()
    }))
}]);