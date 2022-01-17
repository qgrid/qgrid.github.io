---
title: Focusing
group: Features
order: 14
---
- [How to apply auto focus in q-grid?](#how-to-apply-auto-focus-in-q-grid)
- [How to focus the last row?](#how-to-focus-the-last-row)
- [How to understand if q-grid is in focus or not?](#how-to-understand-if-q-grid-is-in-focus-or-not)


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

<a name="how-to-apply-auto-focus-in-q-grid" href="#how-to-apply-auto-focus-in-q-grid">
   How to apply auto focus in q-grid?
</a>

Add `q-grid-autofocus` directive on q-grid component?

```html
<q-grid [rows]="rows$ | async"
        q-grid-autofocus>
   <q-grid-columns generation="deep">
   </q-grid-columns>
</q-grid>
```

<a name="how-to-focus-the-last-row" href="#how-to-focus-the-last-row">
   How to focus the last row?
</a>

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

<a name="how-to-understand-if-q-grid-is-in-focus-or-not" href="#how-to-understand-if-q-grid-is-in-focus-or-not">
   How to understand if q-grid is in focus or not?
</a>

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
