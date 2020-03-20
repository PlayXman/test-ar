const browserSync = require('browser-sync').create();

browserSync.init({
    server: "./",
    https: true
});

browserSync.watch(['pages/*']);