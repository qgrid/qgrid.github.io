---
title: Numeric
group: Column Types
order: 6
---
- [Default template and specific properties](#default-template-and-specific-properties)
- [Suggested Links](#suggested-links)

Use number type to display decimal values. Here are some specific properties:

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="number" key="numberOfFriends">
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/column-number-basic/latest" %}

<a name="default-template-and-specific-properties" href="#default-template-and-specific-properties">
  Default template and specific properties
</a>

* Use `format` property to transform a number into a string, formatted according to locale rules that determine group sizing and separator, decimal-point character, and other locale-specific configurations.

```html
<q-grid>
   <q-grid-columns>
      <q-grid-column type="number">
         <ng-template for="body" let-$cell>	
           {{$cell.label | qGridNumber: $cell.column.format}}
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

<a name="suggested-links" href="#suggested-links">
   Suggested Links
</a>

* [Angular decimal pipe](https://angular.io/api/common/DecimalPipe)