---
title: Layout System
group: Features
order: 4
---

Use q-grid layout system to define particular templates that can be shown under certain or custom conditions.

## Layers

It's possible to add your own layers and define when they should be shown. Use `DomTable` to add or remove layer programmatically.

* Custom layer trigger component.

```typescript
import { GridPlugin } from 'ng2-qgrid';

@Component({
   selector: 'my-layer-trigger',
   providers: [GridPlugin],
   template: `
      <button (click)="toggleLayer()">Toggle Layer</button>
   `
})
export class MyLayerTriggerComponent {
   private isActive = false;

   constructor(private plugin: GridPlugin) { }

   toggleLayer() {
      const { table } = this.plugin;
      if(this.isActive) {
         table.view.removeLayer('my-layer');
      } else {
         table.view.addLayer('my-layer');
      }

      this.isActive = !this.isActive;
   }
}
```

* Custom layer template.

```html
<q-grid>
   <q-grid-toolbar>
      <ng-template for="top">
         <my-layer-trigger>
            <q-grid-layer>
               <ng-template for="my-layer">
                  Hello from the custom layer!
               </ng-template>
            </q-grid-layer>
			</my-layer-trigger>
		</ng-template>
   </q-grid-toolbar>
</q-grid>
```

{% docEditor "doc-qgrid-ng2-layer" %}

## Blank layer

Use a predefined `no-data` condition to show the custom template when the q-grid is empty.

```html
<q-grid>
   <q-grid-layer>
      <ng-template for="blank">
         No Data
      </ng-template>
   </q-grid-layer>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/layer-grid-blank/latest" %}

## Toolbars

There are four toolbars surrounding the q-grid: `top`, `right`, `bottom` and `left`. Any of them can be customized. By default, left and right toolbars are not visible.

```html
<q-grid>
   <q-grid-toolbar>
      <q-grid-toolbar for="bottom">
         <my-pager></my-pager> 
      </q-grid-toolbar>
   </q-grid-toolbar>
</q-grid>
```

## Visibility

Use `visibility` model to hide/show a work areas of the q-grid. Here is the default visibility configuration.

```javascript
gridModel.visibility({
   head: true,
   foot: true,
   body: true,
   toolbar: {
	  top: true,
	  bottom: true,
	  right: false,
      left: false
   }
});
```

## Coming soon

* Right toolbar customization example.
* Visibility component, convenient way to setup visibility inside the template.