---
title: Layer System
group: Features
order: 7
---

Use q-grid layer system to define custom templates that can be shown inside q-grid.

## How to implement a custom layer?

First - implement a custom trigger that will control when to show a new layer. Note that trigger not obligatory should be a visual component, any strategy could be selected where `GridPlugin` is available.

```typescript
import { GridPlugin } from 'ng2-qgrid';

@Component({
   selector: 'my-layer-trigger',
   providers: [GridPlugin],
   template: `<button (click)="toggleLayer()">Toggle Layer</button>`
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

Second - add a layer markup to the q-grid component.

```html
<q-grid>
   <q-grid-toolbar>
      <ng-template for="top">
         <my-layer-trigger></my-layer-trigger>
      </ng-template>
   </q-grid-toolbar>

   <q-grid-layer>
      <ng-template for="my-layer">
         Hello from the custom layer!
      </ng-template>
   </q-grid-layer>
</q-grid>
```

{% docEditor "doc-qgrid-ng2-layer" %}

## How to show message when there is no data?

Use a predefined `no-data` condition to show the custom template.

```html
<q-grid>
   <q-grid-layer>
      <ng-template for="blank">
         No Data
      </ng-template>
   </q-grid-layer>
</q-grid>
```
