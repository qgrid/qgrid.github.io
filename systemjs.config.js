System.config({
   transpiler: 'typescript',
   typescriptOptions: {
	  emitDecoratorMetadata: true
   },
   packages: {
	  '.': {
		 defaultExtension: 'ts'
	  },
	  'vendor': {
		 defaultExtension: 'js'
	  }
   }
});

System.config({
   map: {
	  'main': 'main.js',

	  '@angular/core': 'https://unpkg.com/@angular/core/bundles/core.umd.js',
	  '@angular/common': 'https://unpkg.com/@angular/common/bundles/common.umd.js',
	  '@angular/common/http': 'https://unpkg.com/@angular/common/bundles/common-http.umd.js',
	  '@angular/compiler': 'https://unpkg.com/@angular/compiler/bundles/compiler.umd.js',
	  '@angular/animations': "https://unpkg.com/@angular/animations/bundles/animations.umd.js",
	  '@angular/animations/browser': 'https://unpkg.com/@angular/animations/bundles/animations-browser.umd.js',
	  '@angular/http': 'https://unpkg.com/@angular/http/bundles/http.umd.js',
	  '@angular/forms': 'https://unpkg.com/@angular/forms/bundles/forms.umd.js',
	  '@angular/router': 'https://unpkg.com/@angular/router/bundles/router.umd.js',
	  '@angular/platform-browser': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser.umd.js',
	  '@angular/platform-browser/animations': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
	  '@angular/platform-browser-dynamic': 'https://unpkg.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

	  '@angular/material': 'https://rawgit.com/angular/material2-builds/master/bundles/material.umd.js',
	  '@angular/cdk': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk.umd.js',

	  '@angular/cdk/a11y': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-a11y.umd.js',
	  '@angular/cdk/accordion': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-accordion.umd.js',
	  '@angular/cdk/bidi': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-bidi.umd.js',
	  '@angular/cdk/coercion': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-coercion.umd.js',
	  '@angular/cdk/keycodes': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-keycodes.umd.js',
	  '@angular/cdk/observers': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-observers.umd.js',
	  '@angular/cdk/platform': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-platform.umd.js',
	  '@angular/cdk/portal': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-portal.umd.js',
	  '@angular/cdk/rxjs': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-rxjs.umd.js',
	  '@angular/cdk/table': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-table.umd.js',
	  '@angular/cdk/testing': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-testing.umd.js',
	  '@angular/cdk/overlay': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-overlay.umd.js',
	  '@angular/cdk/scrolling': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-scrolling.umd.js',
	  '@angular/cdk/collections': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-collections.umd.js',
	  '@angular/cdk/stepper': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-stepper.umd.js',
	  '@angular/cdk/layout': 'https://rawgit.com/angular/cdk-builds/master/bundles/cdk-layout.umd.js',

	  'tslib': 'https://unpkg.com/tslib@1.7.1',
	  'rxjs': 'https://unpkg.com/rxjs@5.5.2',
	  
	  'ng2-qgrid': 'https://unpkg.com/ng2-qgrid'
   },
   packages: {
	  'rxjs': {
		 main: 'index'
	  },
   }
});
