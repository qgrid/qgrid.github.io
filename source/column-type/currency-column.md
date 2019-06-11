---
title: Currency
group: Column Types
order: 3
---

Use currency type to display decimal values in a currency format.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="currency" key="cost">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-currency-basic/latest" %}

## Default template and specific properties

* Use `code` property to set the ISO 4217 currency code, such as `USD` for the US dollar and `EUR` for the euro. The default is `USD`.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="currency" code="EUR">
         <ng-template for="body" let-$cell>	
            <span>{{$cell.value | qGridCurrency: $cell.column.code}}</span>
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Suggested Links

* [Angular currency pipe](https://angular.io/api/common/CurrencyPipe)