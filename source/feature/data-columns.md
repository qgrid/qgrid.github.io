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

## Use HTML to add columns

Use `q-grid-column` components to declare a list of columns to show in the q-grid. Note that preferred way to define cell templates is to you `ng-template` inside the `q-grid-column` component. 
	 
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

## Use TypeScript to add columns

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

## Use Grid Model to add columns

Two previous example are nothing more than wrappers to fill in the data model with list of columns. Another way to do it, to use the q-grid model directly.

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

## Column Model

Here is a list of basic column properties, all of them can be setup both in TypeScript and HTML.

* `type`.
Column `type` is responsible for how the cell is drawn and how it behaves. Beside out of box column types it's possible to define own.  Note that some of supported column types are utilized for internal needs.

* `key`.
A column unique identifier. If path or value properties are not setup, key property is used to retrieve the cell value.

* `title`.
Column header text, can be shown as column tooltip and used in plugins like column-filter plugin.

* `value`, `label`.
If the property is setup, it is used to get/set cell value/label. Callback or constant ca be used as the value.

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

* `path`, `labelPath`.
Path to the value/label. The `path` property has a lower priority than the `value` property.

```html
<q-grid-column path="address.phones.0.num"></q-grid-column>
```

* `pin`.
Indicates if a column should be frozen, `left` and `right` options are available.

* `class`.
A functional type of the column. It's utilized by plugins and internal routines to filter out necessary columns.

* `editor`, `editorOptions`.
An editor type that will be shown in the edit mode instead of default one.

```html
<q-grid-column type="id" editor="number"></q-grid-column>
```

* `width`, `maxWidth`, `minWidth`.
Size of columns that can be setup in `pixels` or `percents`. Note that percents are materialized only once on init, depending on the initial q-grid width.

```html
<q-grid-column key="id" maxWidth="65"></q-grid-column>
<q-grid-column key="number" width="30%"></q-grid-column>
```
	
* `widthMode`
Indicates how to calculate width px from percentage. Mode `relative` means to get whole q-grid width minus column static widths than calculate percents, `absolute` means to get whole q-grid width and calculate percents.

* `viewWidth`
If setup, the column expands its width to viewWidth value on focus.

* `canEdit`, `canResize`, `canSort`, `canMove`, `canFilter`, `canHighlight`, `canFocus`, `isVisible`.
Boolean triggers to control the column behavior.

* `index`.
Indicates the order of the column. q-grid tries to do sort in a smart way and uses weight calculation. The first candidate who has weight more than zero goes to the sorting routine.

```javascript
const candidates = [
    // Uses columnList index property to get a score.
    listFind(key) + scoreFor.list(column), 
    // Uses column index property to get a score.
    column.index + scoreFor.index(column), 
    // Uses column position defined in TypeScript to 
    viewFind(key) + scoreFor.view(column), 
    // Uses column position defined in HTML to get a score.
	templateFind(key) + scoreFor.template(column) 
];
```
	 
* `compare`.
Setup this function to change order method that is used by `column sort pipe` to sort rows.

* `children`.
If children property is setup the column automatically becomes a group container.

```html
<q-grid-columns>
   <q-grid-column key="parent">
      <q-grid-column key="child-1"></q-grid-column>
      <q-grid-column key="child-2"></q-grid-column>
   </q-grid-column>
</q-grid-columns>
```