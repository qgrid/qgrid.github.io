---
title: Data Columns
group: Features
order: 1
---

- [Column Definitions](#column-definitions)
- [Structural directives and column visibility](#structural-directives-and-column-visibility)
- [How to make columns frozen/pinned?](#how-to-make-columns-frozen/pinned)
- [How to define column order?](#how-to-define-column-order)
- [Suggested Links](#suggested-links)

Use column auto generation modes for the quick start, try `shallow`, `deep` or `cohort` options to explore data in depth.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async"
              [model]="gridModel">
      </q-grid>
      `
})
export class MyComponent {
   rows$ = this.dataService.getRows();

   gridModel = this.qgrid
      .model();
      .columnList({ 
         generation: 'cohort' 
      });

   constructor(
      private dataService: MyDataService,
      private qgrid: Grid
   ) {
   }
}
```

> The column generator only supports objects, if row has type of primitive, e.g. number or string, it won't be rendered.

{% docEditor "github/qgrid/ng2-example/tree/generate-column-cohort/latest" %}

<a name="column-definitions" href="#column-definitions">
   Column Definitions
</a>

Use q-grid model to explicitly define column set to render. Still column generation can be used here.

```typescript
qgrid
   .model();
   .data({
      columns: [
         { key: 'name', type: 'text' },
         { key: 'age', type: 'number' },
      ]
   });
```

<a name="structural-directives-and-column-visibility" href="#structural-directives-and-column-visibility">
   Structural directives and column visibility
</a>

Sometimes it's convenient to control column visibility inside the component's html, for that case there are prepared components for you.

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

<a name="how-to-make-columns-frozen/pinned" href="#how-to-make-columns-frozen/pinned">
   How to make columns frozen/pinned?
</a>

`pin` property controls if the column should be pinned either to the `right` or to the `left`.

```typescript
qgrid
   .model();
   .data({
      columns: [
         { key: 'name', type: 'text', pin: 'left' },
         { key: 'age', type: 'number' },
      ]
   });
```

<a name="how-to-define-column-order" href="#how-to-define-column-order">
   How to define column order?
</a>

Column order calculates automatically depending on position in the array list and html template when `<q-grid-column>` is used. To explicitly set column order `index` property should be used.

```typescript
qgrid
   .model();
   .data({
      columns: [
         { key: 'name', type: 'text', index: 2 },
         { key: 'age', type: 'number', index: 1 },
      ]
   });
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Column Types](/column-type/grid-column.html)