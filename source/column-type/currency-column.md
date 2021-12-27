---
title: Currency
group: Column Types
order: 3
---
- [Default template and specific properties](#default-template-and-specific-properties)
- [Suggested Links](#suggested-links)

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

<a name="#default-template-and-specific-properties">
   Default template and specific properties
</a>

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

<a name="#suggested-links">
   Suggested Links
</a>

* [Angular currency pipe](https://angular.io/api/common/CurrencyPipe)