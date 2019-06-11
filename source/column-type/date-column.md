---
title: Date Time
group: Column Types
order: 4
---

Use this column type to display date or date times.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="date" key="birth">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```


{% docEditor "github/qgrid/ng2-example/tree/column-date-basic/latest" %}

## Time

Use number type to display time values in a specific format.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="time" key="alarm">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-time-basic/latest" %}

## Default template and specific properties

* Use `format` property to build a date display value according to locale rules.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="date">
         <ng-template for="body" let-$cell>
            {{$cell.label | qGridDate: $cell.column.format}}
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Date as String

Usually data from http request goes directly to the q-grid, in this case if column is marked or generated as date only ISO 8601 format is supported.

* `YYYY-MM-DD` - 2017-08-10
* `YYYY-MM-DDTHH:mm` - 2017-08-10T15:20
* `YYYY-MM-DDTHH:mm` - 2017-08-10T15:20:23
* `YYYY-MM-DDTHH:mm` - 2017-08-10T15:20:23.738Z

If it's not possible to lead data contract to ISO 8601 and there is no chance to to convert string to date object before putting it to q-grid column `value` property can be overridden.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid>
         <q-grid-columns>
            <q-grid-column type="date" 
                           [value]="toDate">
            </q-grid-column>
         </q-grid-columns>
      </q-grid>
      `
})
export class MyComponent {
   toDate(row: any, column: Column) {
      return new Date(row[column.key]);
   }
}
```

## Suggested Links

* [Angular date pipe](https://angular.io/api/common/DatePipe)
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)