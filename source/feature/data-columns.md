---
title: Data Columns
group: Features
order: 1
---

Use column generation mode for a quick start, `shallow`, `deep` and `cohort` options are available.
    
```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
            <q-grid-columns generation="cohort"></q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   rows$: Observable<[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
}
```

> q-grid generation supports only objects in the array, if array item type is primitive q-grid won't be able to render it.

{% docEditor "github/qgrid/ng2-example/tree/generate-column-cohort/latest" %}

## Column Definitions

Use `q-grid-column` components to explicitly declare list of columns to show, column generation mode still can be used.
    
```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="firstName" title="First Name"></q-grid-column>
      <q-grid-column key="lastName" title="Last Name"></q-grid-column>
      <q-grid-column key="age" title="Age" type="number">
         <ng-template for="body" let-$cell="$cell">
            <em>{{$cell.label}}</em>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Structural directives

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

## How to define columns in TypeScript?

Consider to use `columns` attribute of the q-grid component, when list of columns need to be created in TypeScript.

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

## How to define columns using q-grid model?

The preferred way is to use `GridComponent`, note that component will be available only after `ngAfterViewInit` hook being passed.

```typescript
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
             { key: 'firstName', title: 'First Name' },
             { key: 'lastName', title: 'Last Name' },
             { key: 'age', title: 'Age', type: 'number' },
          ]
      });
   }
}
```

## How to define column order?

Column order depends on `index` property and column definition position. Position in the column list defined in TypeScript has higher priority than position defined in HTML. 

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column key="firstName" title="First Name" [index]="2"></q-grid-column>
      <q-grid-column key="lastName" title="Last Name"></q-grid-column>
      <q-grid-column key="age" title="Age" type="number"></q-grid-column>
   </q-grid-columns>
</q-grid>
```



## Suggested Links

* [Column Types](/column-type/grid-column.html)