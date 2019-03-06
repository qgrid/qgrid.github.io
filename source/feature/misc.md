---
title: Miscellaneous
group: Features
order: 16
---

## Action Bar

Action is just a representation of the command that is utilized by q-grid. Use `<ng-template for="trigger">` component to customize action.

```html
<q-grid>
   <q-grid-actions>

      <q-grid-action icon="refresh" title="Load Data" [command]="loadCommand">
      </q-grid-action>

      <q-grid-action id="sort-by-symbol-desc">
         <ng-template for="trigger" let-$action>
            <button (click)="sort($action.model)">Sort By Desc</button>
         </ng-template>
      </q-grid-action>

   </q-grid-actions>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/action-bar-template/latest" %}

## Pager

Use pager component to change pagination options.

```html
<q-grid>
   <q-grid-pager [size]="10" [sizeList]="[5, 10, 20]"></q-grid-pager>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/pagination-basic/latest" %}

## Legend

To show hints or additional information use `q-grid-legend` component.

```html
<q-grid>
   <q-grid-legend>
      <ng-template for="content">
         <ul class="q-grid-legend-list">
            <li>
               <div class="q-grid-legend-item Gas"></div>Gas
            </li>
            <li>
               <div class="q-grid-legend-item Solid"></div>Solid
            </li>
         </ul>
      </ng-template>
   <q-grid-legend>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/legend-grid-basic/latest" %}

## Persistence

To allow save/load q-grid state use `q-grid-persistence` component, both client and server side configurations are supported.

```typescript
@Component({
   template: `
      <q-grid [model]="gridModel">
         <q-grid-persistence></q-grid-persistence>
      </q-grid>
   `
})
export class MyComponent {
   gridModel: GridModel;

   constructor(private dataService: DataService, private qgrid: Grid) {
      this.gridModel = this.qgrid.model();
      this.gridModel.persistence({
         storage: this.buildStorage()
      });
   }

   buildStorage() {
      return {
         getItem: id =>
            new Promise(resolve => {
               this.dataService
                  .getRows(id)
                  .subscribe(resolve);
            }),
         setItem: (id, items) =>
            new Promise(resolve => {
               this.dataService
                  .setRows(id, items)
                  .subscribe(resolve);
            })
      };
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/focus-cell-auto/latest" %}

## Row Drag & Drop

Row drag and drop configuration is setting up through `q-grid-row` component.

```html
<q-grid>
   <q-grid-row [canMove]="true"></q-grid-row>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/drag-row-basic/latest" %}

## Row Resizing

Row resizing configuration is setting up through `q-grid-row` component.

```html
<q-grid>
   <q-grid-row [canResize]="true"></q-grid-row>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/size-row-basic/latest" %}

## Floating Rows

Use `row` model to pin rows to top or bottom.

```typescript
@Component({
   template: '<q-grid></q-grid>'
})
export class MyComponent {
   gridModel: GridModel;

   constructor(dataService: DataService, qgrid: Grid) {
      this.gridModel = qgrid.model();

      dataService
         .getRows()
         .subscribe(rows => {
            this.gridModel.data({ rows });
            this.gridModel.row({
               pinTop: [rows[0], rows[1]],
               pinBottom: [rows[rows.length - 1]]
            });
         });
      }
}
```

{% docEditor "github/qgrid/ng2-example/tree/floating-rows-basic/latest" %}

## Busy Indicator

The q-grid service provides access to control progress bar visibility.

```typescript
@Component({
      template: '<q-grid></q-grid>'
})
export class MyComponent {
      @ViewChild(GridComponent) myGrid: GridComponent;

      constructor(private dataService: DataService, private qgrid: Grid) {
      }

   onInit() {
      const { model } = this.myGrid;
      const service = this.qgrid.service(model);
         const cancelBusy = service.busy();

            this.dataService
         .getAtoms()
         .subscribe(rows => {
            cancelBusy();
            model.data({ rows });
         });
      }
}
```