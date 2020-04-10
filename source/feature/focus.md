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
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(
      private qgrid: Grid,   
      dataService: MyDataService
   ) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;
      const service = this.qgrid.service(model);
      
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
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   constructor(
      private qgrid: Grid,   
      private dataService: MyDataService
   ) {
      this.rows$ = dataService.getRows();
   }

   ngAfterViewInit() {
      const { model } = this.myGrid;
      const service = this.qgrid.service(model);

      this.rows$.subscribe(rows => 
         service.focus(rows.length - 1, 0);
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
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;   
   rows$: Observable<[]>;

   loadCommand = new Command({
        execute: () => {
            this.rows$ = this.dataService.getAtoms();
        },
        canExecute: () => model.focus().isActive,
        shortcut: 'ctrl+l'
    });

   constructor(private dataService: MyDataService) {
   }
}
```