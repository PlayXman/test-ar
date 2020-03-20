AFRAME.registerComponent('shadowonly-plane', {
    schema: {
        width: {
            type: 'number',
            default: 1,
        },
        height: {
            type: 'number',
            default: 1,
        },
        opacity: {
            type: 'number',
            default: 0.7,
        },
    },
    init: function () {
        var material = new THREE.ShadowMaterial({
            opacity: this.data.opacity
        });

        var geometry = new THREE.PlaneBufferGeometry(this.data.width, this.data.height);

        var mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = true;
        mesh.position.z = -0.01;

        this.el.setObject3D('mesh', mesh);
    },
});