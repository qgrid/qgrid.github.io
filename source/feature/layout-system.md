---
title: Layout System
group: Features
order: 7
---

Use q-grid layout system to define particular templates that can be shown under certain or custom conditions.

## Blank Layer

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

## How to implement a custom layer?

It's possible to add your own layers and define when they should be shown. Imagine that we want to implement custom layer that should be shown on button click, so we have next markup under the q-grid, of course, it's not required to trigger be visual or setup inside toolbar, be free in choosing the strategy.

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

Component `my-layer-trigger` should be implemented here. Bellow there is a basic implementation in which `table` abstraction is used to add/remove layer called `my-layer`. Please note that ng-template above should has appropriate to the code key, `my-layer` in this case.

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

{% docEditor "doc-qgrid-ng2-layer" %}

## How to change q-grid areas visibility?

Use `visibility` model to show or hide areas of the q-grid.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;

      model.visibility({
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
   }
}
```

## S