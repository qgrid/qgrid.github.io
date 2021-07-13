---
title: Tooltip
group: Plugins
order: 5
---

Tooltip provides a text label that is displayed when the user hovers over a q-grid cell.

## Installation

Add angular component inside of q-grid component.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
        	<q-grid-cell-tooltip [showDelay]="1000">
	      </q-grid-cell-tooltip>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
}
```