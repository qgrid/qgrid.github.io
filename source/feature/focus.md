---
title: Focusing
group: Features
order: 14
---

Use q-grid service to get control over focused cell, selected page will be automatically adjusted.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   rows$ = this.qgrid.model();
   gridModel = this.dataService.getRows();

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
   }

   ngAfterViewInit() {
      const service = this.qgrid.service(this.gridModel);
      service.focus(5, 2);
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/focus-cell-basic/latest" %}

## How to apply auto focus in q-grid?

Add `q-grid-autofocus` directive on q-grid component?

```html
<q-grid [rows]="rows$ | async"
        q-grid-autofocus>
   <q-grid-columns generation="deep">
   </q-grid-columns>
</q-grid>
```

## How to focus the last row?

Use focus method of q-grid service, it will automatically got to the necessary page if required.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   rows$ = this.dataService.getRows();
   gridModel = this.qgrid.model();

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
   }

   ngAfterViewInit() {
      const service = this.qgrid.service(this.gridModel);

      this.rows$.subscribe(
         {
            next: (rows) => { service.focus(rows.length - 1, 0);
         }
      );
   }
}
```

## How to understand if q-grid is in focus or not?

Use q-grid `focus` model to understand whether it's active or not.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async" [model]="gridModel">
         <q-grid-columns generation="deep"></q-grid-columns>
         <q-grid-actions>
            <q-grid-action
               icon="refresh"
               title="Load Data"
               [command]="loadCommand">
            </q-grid-action>
         </q-grid-actions>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<[]>;
   gridModel = this.qgrid.model();

   loadCommand = new Command({
      execute: () => {
         this.rows$ = this.dataService.getAtoms();
      },
      canExecute: () => this.gridModel.focus().isActive,
      shortcut: 'ctrl+l',
   });

   constructor(
      private qgrid: Grid,
      private dataService: MyDataService
   ) {
   }
}
```
