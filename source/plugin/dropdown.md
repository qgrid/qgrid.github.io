---
title: Dropdown
group: Plugins
order: 11
---
- [Installation](#installation)
- [How to show labels in dropdown list?](#how-to-show-labels-in-dropdown-list?)
- [Suggested Links](#suggested-links)

{% docEditor "github/qgrid/ng2-example/tree/dropdown-basic/latest" %}

<a name="installation" href="#installation">
   Installation
</a>

Use `dropdown` as a column editor.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
            <q-grid-column key="number"
                           title="Number"
                           type="number"
                           editor="dropdown"
                           [editorOptions]="dropdownOptions">
            </q-grid-column>
         </q-grid-columns>
    </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;


  	dropdownOptions = {
		fetch: [Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2]
	};

   constructor(dataService: MyDataService) {
      this.$rows = dataService.getData();
   }
}
```

<a name="how-to-show-labels-in-dropdown-list" href="#how-to-show-labels-in-dropdown-list">
   How to show labels in dropdown list?
</a>

Use `itemLabel` property in the dropdown column

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
            <q-grid-column key="labeledNumber"
                           title="Number"
                           type="number"
                           editor="dropdown"
					            [itemLabel]="getItemLabel"
                           [editorOptions]="dropdownOptions">
            </q-grid-column>
         </q-grid-columns>
    </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;

  	dropdownOptions = {
		fetch: [
         { label: 'PI', value: Math.PI }, 
         { label: 'E', value: Math.E }
      ]
	};

   constructor(dataService: MyDataService) {
      this.$rows = dataService.getData();
   }

   getItemLabel(item) {
		return item.label;
	}
}
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Fetch](/reference/fetch.html)