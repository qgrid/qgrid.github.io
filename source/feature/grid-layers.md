---
title: Grid Layers
group: Features
order: 4
---

There is possibility to define grid layers. It's particular views that will be shown under certain conditions.

## Blank layer

The blank layer template will be shown until data is received. Define it using `ng-template` inside the `q-grid-layer` component.

```html
<q-grid>
   <q-grid-layer>
      <ng-template for="blank">
         <div class="blank">
            No Data
         </div>
      </ng-template>
   </q-grid-layer>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/layer-grid-blank/latest" %}

## Custom layer

It's possible to add your own layers and define when it should be shown. `GridPlugin` should be used to add and remove layer dynamically.

* component which triggers appearance of layer

```typescript
import { GridPlugin } from 'ng2-qgrid';

@Component({
   selector: 'my-layer-trigger',
   template: '<button (click)="toggleLayer()">Toggle Layer</button>',
   providers: [GridPlugin]
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

* template of custom layer

```html
<q-grid>
   <q-grid-toolbar>
      <ng-template for="top">
         <my-layer-trigger>
            <q-grid-layer>
               <ng-template for="my-layer">
                  Hello from custom layer!
               </ng-template>
            </q-grid-layer>
			</my-layer-trigger>
		</ng-template>
   </q-grid-toolbar>
</q-grid>
```

{% docEditor "doc-qgrid-ng2-layer" %}