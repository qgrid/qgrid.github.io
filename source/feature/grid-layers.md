---
title: Grid Layers
group: Features
order: 4
---

Use grid layer system to define to define particular views that can be shown under certain or custom conditions.

## Blank layer

The blank layer template will be shown until data is received. Use `blank` trigger inside the `q-grid-layer` to activate this.

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

## Custom layers

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