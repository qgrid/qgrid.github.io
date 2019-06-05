---
title: Visibility
group: Features
order: -1
---

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