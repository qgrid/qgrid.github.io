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

## HTML components

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

## In TypeScript

Consider to use `columns` attribute of the q-grid component, when list of columns need to be created dynamically.

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

## Column Type

Column type is responsible for how the cell is drawn and how it behaves. Beside out of box column types it's possible to define own.  Note that some of supported column types are utilized for internal needs.

*  array
*  bool
*  cohort
*  currency
*  date
*  email
*  file
*  filter-row
*  group
*  id
*  image
*  number
*  pad
*  pivot
*  reference
*  row-details
*  row-expand
*  row-indicator
*  row-number
*  row-options
*  select
*  summary
*  text
*  time
*  url

## Column Key

A column unique identifier, used to retrieve cell values if path or value properties are not setup for the column.

## Column Title

Column header text, could be shown as column tooltip or in plugins like a column-filter plugin.

## Column Value & Label

The callback or some constant could be used to retrieve or setup the cell value/label.

```typescript
columns = [
   {
      key: 'myAddress',
      value: function myValue(row, value) {
         if (arguments.length > 1) {
           row.contact.address = value;
           return;
         }

         return row.contact.address;
      }
   }
];
```

> Be aware that if there is a requirement to use `this` pointer inside the `value` or `label` callback, `this` should be passed by using closure or lambda function.

## Column Path & LabelPath

String path to the cell value or label. Note that `path` property has lower priority than the `value` property.

```html
<q-grid-column path="address.phones.0.num"></q-grid-column>
```

## Column Pin

Indicates if the q-grid column should be frozen on `left` or `right`.

```html
<q-grid-column pin="right"></q-grid-column>
```

## Column Class

A functional type of the column. It's utilized by plugins and internal routines to filter out necessary columns.

## Column Editor & EditorOptions

Use editor type to shown predefined editor inside the not aligned type column.

```html
<q-grid-column type="id" editor="reference" [editorOptions]="idOptions"></q-grid-column>
```

## Column Width, MaxWidth & MinWidth

Indicates the column size which can be setup in `pixels` or `percents`. 

```html
<q-grid-column key="id" maxWidth="65"></q-grid-column>
<q-grid-column key="number" width="30%"></q-grid-column>
```
	
> Right now percents are materialized only once on view init, depending on the origin q-grid width. Future plans are to add additional modes to handle percents constantly.

## Column WidthMode

Sets percentage calculation algorithm. 

* `relative` mode means to get whole q-grid width minus static widths columns than apply percents.
* `absolute` mode means to get whole q-grid width and apply percents.

## Column ViewWidth

If setup, the host column expands width to the viewWidth value on focus occurs.

## Column Indicators

Use `can-` and `is-` properties to control q-grid columns interaction behavior.

* canEdit
* canResize
* canSort
* canMove
* canFilter
* canHighlight
* canFocus
* isVisible 

## Column Index 

Use index property to define the order of q-grid columns.
	 
## Column Compare

Setup this function to change order method that is used by `column sort pipe` to sort rows.

## Column Children

The q-grid header can utilize column hierarchy by using nested components or children property. Template below fills in the q-grid `columnList.index` property containing a node that represents header layout.

```html
<q-grid-columns>
   <q-grid-column key="parent">
      <q-grid-column key="child-1"></q-grid-column>
      <q-grid-column key="child-2"></q-grid-column>
   </q-grid-column>
</q-grid-columns>
```