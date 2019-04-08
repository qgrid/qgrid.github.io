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

## HTML Components

Use `q-grid-column` components to declare a list of columns to show in the q-grid. Note that preferred way to define cell templates is to use `ng-template` inside the `q-grid-column` component. 
	 
```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="name.first" title="First Name"></q-grid-column>
      <q-grid-column key="name.last" title="Last Name"></q-grid-column>
      <q-grid-column key="age" title="Age" type="number">
         <ng-template for="cell" let-$cell="$cell">
            <em>{{$cell.label}}</em>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## [Columns] Input

Consider to use `columns` attribute of the q-grid component, when list of columns need to be created dynamically.

```typescript
@Component({
   selector: 'my-component',
   template: `<q-grid [columns]="myColumns"></q-grid>`
})
export class MyComponent {
   myColumns = [
       { key: 'name.first', title: 'First Name' },
       { key: 'name.last', title: 'Last Name' },
       { key: 'age', title: 'Age', type: 'number' },
   ];
}
```

## Grid Model

Two previous examples are nothing more than wrappers to fill in the data model with a list of columns. Low-level way to add some columns is to use the q-grid model directly.

```typescript
import { GridComponent } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: '<q-grid></q-grid>'
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;   

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

## The Order of Columns

The q-grid tries to do column sort in a smart way and applies weight calculation algorithm. The first candidate who has weight more than zero goes to the comparison routine. 

```javascript
const candidates = [
    // Uses column index property to get a score.
    column.index + scoreFor.index(column), 
    // Uses column position defined in TypeScript to 
    viewFind(key) + scoreFor.view(column), 
    // Uses column position defined in HTML to get a score.
	templateFind(key) + scoreFor.template(column) 
];

const weights = candidates.filter(w => w >= 0);
const weight = weights.length ? weights[0] : -1;
```

Approximately, the code above means that the most left position will get the column `already being added` to the column list, then the column with `the lowest index` but more then zero, the column that has the lowest position in the `TypeScript code` and finally the column with the lowest position in the `HTML template`.

## Column visibility & structural directives

The q-grid allows to utilize structural directives(starts with `*` in Angular) to control column visibility.

```html
<q-grid [ngSwitch]="group">
   <q-grid-columns *ngSwitchCase="'name'">
      <q-grid-column key="firstName" title="First Name"></q-grid-column>
		<q-grid-column key="lastName" title="Last Name"></q-grid-column>
	</q-grid-columns>

	<q-grid-columns *ngSwitchCase="'address'">
		<q-grid-column key="city" title="City"></q-grid-column>
		<q-grid-column key="state" title="State"></q-grid-column>
	</q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-list-basic/latest" %}

## How to override column order?

Typically if default column order algorithm should be changed the q-grid pipeline should be overridden. Another way is to modify `index` tree in the `columnList` model.

## Suggested Links

* [Column Types](/column-type/grid-column.html)