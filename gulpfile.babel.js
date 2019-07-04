import gulp from 'gulp'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import watch from 'gulp-watch'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import minify from 'gulp-minify'
import imagemin from 'gulp-imagemin'
import sitemap from 'gulp-sitemap'
import cachebust from 'gulp-cache-bust'
import tildeImporter from 'node-sass-tilde-importer'
import handlebars from 'gulp-compile-handlebars'
import fs from 'fs'
import rename  from 'gulp-rename'



const server = browserSync.create()

const postcssPlugins = [
  cssnano({
    core: true,
    zindex: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
]

gulp.task('styles-dev', () => {
  gulp.src('./src/scss/styles.scss')
    .pipe(sourcemaps.init({ loadMaps : true}))
    .pipe(plumber())
    .pipe(sass({
      importer: tildeImporter,
      outputStyle: 'expanded',
      includePaths: ['./node_modules']
    }))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(server.stream({match: '**/*.css'}))
})

gulp.task('styles-build', () => {
  gulp.src('./src/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({
      importer: tildeImporter,
      includePaths: ['./node_modules']
    }))
    .pipe(postcss(
      [
        cssnano({
          core: true,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
          }
        })
      ]
    ))
    .pipe(gulp.dest('./public/assets/css/'))
})


gulp.task('hbs-dev', function () {
  let data = JSON.parse(fs.readFileSync('src/templates/data/data.json'));
	let options = {
		ignorePartials: true, // ignores any unknown partials. Useful if you only want to handle part of the file
		batch : ['src/templates/includes'] // Javascript array of filepaths to use as partials
	};
	return gulp.src('src/templates/pages/**/*.hbs')
		.pipe(handlebars(data, options)) 
		.pipe(rename(function(path) {
			path.extname = '.html';
		}))
		.pipe(gulp.dest('public/'));
});



gulp.task('scripts-dev', () =>
  browserify('./src/js/index.js')
    .transform(babelify, {
      global: true // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: '-min.js',
        min: '.js'
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/js'))
)

gulp.task('scripts-build', () =>
  browserify('./src/js/index.js')
    .transform(babelify, {
      global: true // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: '.js',
        min: '-min.js'
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/js'))
)

gulp.task('images-build', () => {
  gulp.src('./src/img/**/**')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('./public/assets/img'))
})

gulp.task('images-dev', () => {
  gulp.src('./src/img/**/**')
    .pipe(gulp.dest('./public/assets/img'))
})

gulp.task('sitemap', () => {
  gulp.src('./public/**/*.html', {
    read: false
  })
    .pipe(sitemap({
      siteUrl: 'https://example.com' // remplazar por tu dominio
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('dev', ['styles-dev', 'hbs-dev', 'scripts-dev', 'images-dev'], () => {
  server.init({
    server: {
      baseDir: './public'
    }
  })

  watch('./src/scss/**/**', () => gulp.start('styles-dev'))
  watch('./src/js/**/**', () => gulp.start('scripts-dev', server.reload))
  watch('./src/templates/**/**', () => gulp.start('hbs-dev', server.reload))
  watch('./src/img/**/**', () => gulp.start('images-dev'))
})

gulp.task('cache', () => {
  gulp.src('./public/**/*.html')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('./public'))
})


gulp.task(
  'build', 
  [
    'styles-build', 
    'hb-build', 
    'scripts-build', 
    'images-build', 
    'cache', 
    'sitemap'
  ]
)
