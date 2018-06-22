---
title: Data Columns
group: Features
order: 1
---

There are a few ways to fill in the q-grid with data columns.

## Auto Generation

Use column generation mode for a quick start. Sometimes, especially when data source is not familiar, it can be convenient to turn on auto generation column mode to explore data and next settings. Here are possible modes:
	  
* `deep` number of columns will be equal to number of graph leafs after deep traversing of first row object.
* `shallow` number of columns will be equal to number of keys from first row object.
* `cohort` similar to the `deep`, but column groups are used to display header hierarchy.
	 
```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="myRows | async">
            <q-grid-columns generation="deep"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   myRows: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.myRows = dataService.getRows();
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/generate-column-cohort/latest" %}

## Add columns in HTML

Use `q-grid-column` components to declare a list of columns to show in the q-grid. Note that the preferred way to define cell templates is to you `ng-template` inside the `q-grid-column` component.
	 
```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="name.first" title="First Name"></q-grid-column>
      <q-grid-column key="name.last" title="Last Name"></q-grid-column>
      <q-grid-column key="age" title="Age" type="number">
        <ng-template for="body" let-$cell>
            <em>{{$cell.value}}</em>
        </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Add columns in TypeScript

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [columns]="myColumns"></q-grid>
      `
})
export class MyComponent {
   myColumns = [
       { key: 'name.first', title: 'First Name' },
       { key: 'name.last', title: 'Last Name' },
       { key: 'age', title: 'Age', type: 'number' },
   ];
}
```

## Add columns using q-grid model

Two previous example are nothing more than wrappers to fill in q-grid data model with some column list. Another way to do it, to use the q-grid model directly.

```typescript
import { GridComponent } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;

   constructor() {}

   ngAfterViewInit() {
      const { model } = this.myGrid;
      model.data({
          columns: [
             { key: 'name.first', title: 'First Name' },
             { key: 'name.last', title: 'Last Name' },
             { key: 'age', title: 'Age', type: 'number' },
          ]
      });
   }
}
```

## Column model