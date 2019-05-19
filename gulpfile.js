/*
gulp.task -> Crear una tarea -> gulp.task('nombre de la tarea', ()=>{lo que va a hacer la tarea})
gulp.src -> Origen del documento -> gulp.src('ruta del origen del archivo')
gulp.pipe -> Unión de las diferentes secciones de la tarea -> .pipe (sección)
gulp.dest -> Destino del documento -> gulp.dest('Ruta de destino del archivo')
gulp.watch -> Vigilar los cambios en la ruta que le indiquemos -> gulp.watch('ruta a vigilar', ['tarea'])
*/

const gulp = require('gulp');
const sass = require ('gulp-sass');
const autoprefixer = require ('gulp-autoprefixer');
const pug = require ('gulp-pug');
const imagemin = require ('gulp-imagemin');

const browserSync = require('browser-sync').create(); 


gulp.task('sass', function(done){
    return gulp.src('./private/scss/styles.scss')
        .pipe(sass ({
            outputStyle:'nested'
        }))
        .pipe(autoprefixer({
            browsers:['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
        done()
});

gulp.task('pug', ()=>{
    return gulp.src('./private/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
});

gulp.task('img', ()=>{
    return gulp.src('private/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
})

gulp.task('default', function(done){
    return browserSync.init({
        server: './public'
    }),

    gulp.watch('./private/scss/styles.scss', gulp.series('sass')),
    gulp.watch('./private/pug/*.pug', gulp.series('pug')).on('change', browserSync.reload),
    done()
})


// gulp.task('default', function(done){
//     gulp.watch('./private/scss/styles.scss', gulp.series('sass')),
//     gulp.watch('./private/pug/*.pug', gulp.series('pug')),
//     done()
// })


