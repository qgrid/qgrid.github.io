---
title: Autocomplete
group: Plugins
order: 11
---
- [Installation](#installation)
- [How to show custom label for this list of objects?](#how-to-show-custom-label-for-this-list-of-objects)
- [Suggested Links](#suggested-links)


{% docEditor "github/qgrid/ng2-example/tree/autocomplete-basic/latest" %}

<a name="#installation">
   Installation
</a>

Use `autocomplete` as a column editor.

```typescript
import { of } from 'rxjs';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
            <q-grid-column key="number"
                           title="Number"
                           type="number"
                           editor="autocomplete"
                           [editorOptions]="autocompleteOptions">
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;

     autocompleteOptions = {
      fetch: of([Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2])
   };

   constructor(dataService: MyDataService) {
      this.$rows = dataService.getData();
   }
}
```

<a name="#how-to-show-custom-label-for-this-list-of-objects">
   How to show custom label for this list of objects?
</a>

First make column type equals to `object`, than setup `[label]` callback that will receive data row and `[itemLabel]` callback that will receive values returned by `fetch` function. 

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
            <q-grid-column key="objectColumn"
                           type="object"
                           editor="autocomplete"
                           [getLabel]="getLabel"
                           [getItemLabel]="getItemLabel"
                           [editorOptions]="autocompleteOptions">
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;

   autocompleteOptions = {
      fetch: [
         { id: 1, label: 'First Option' }
         { id: 2, label: 'Second Option' }
      ]
   };

   constructor(dataService: MyDataService) {
      this.$rows = dataService.getData();
   }

   getLabel(row: any) {
      return row.object.label;
   }

   getItemLabel(item: {id: number, label: string }) {
      return item ? item.label : '';
   }   
}
```

<a name="#suggested-links">
   Suggested Links
</a>

* [Fetch](/reference/fetch.html)