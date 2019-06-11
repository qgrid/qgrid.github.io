---
title: Dropdown
group: Plugins
order: 11
---

{% docEditor "github/qgrid/ng2-example/tree/dropdown-basic/latest" %}

## Installation

Add dropdown module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { DropdownModule } from 'ng2-qgrid/plugin/dropdown';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      DropdownModule
   ]
})
export class AppModule {
}
```

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
   import { Command } from 'ng2-qgrid';

  	dropdownOptions = {
		fetch: [Math.PI, Math.LN10, Math.LN2, Math.E, Math.LOG10E, Math.LOG2E, Math.SQRT1_2]
	};

   constructor(dataService: MyDataService) {
      this.$rows = dataService.getData();
   }
}
```

## Suggested Links

* [Fetch](/reference/fetch.html)