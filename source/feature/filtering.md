---
title: Filtering
group: Features
order: 11
---

There are situations when the end user need to show additional information for the rows in the q-grid. Row details serves to satisfy this necessary.

## Setup

Use q-grid model to setup filter options.

```javascript
gridModel.filter({
   by: {
      myTextColumn: { items: ['foo', 'bar'] },
      myCurrencyColumn: { blanks: true },
      myNumberColumn: { 
         expression: {
            kind: 'group',
            op: 'and',
            left: {
               kind: 'condition',
               left: key,
               op: 'in',
               right: ['foo', 'bar']
            },
            right: null
         }
      }
   }
});
```

## Column filters

```typescript
import { FetchContext } from 'ng2-qgrid';

@Component({
	template: '<q-grid [filterFetch]="getFilterItems"></q-grid>',
})
export class MyComponent {
   getFilterItems(key: string, context: FetchContext) {
      const { search, take, skip } = context;
      return dataService.getFilterItemsFor(key, search, take, skip);
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/filter-column-fetch/latest" %}

## Filter Row

{% docEditor "github/qgrid/ng2-example/tree/filter-row-basic/latest" %}

## Custom filters

{% docEditor "github/qgrid/ng2-example/tree/filter-row-custom/latest" %}

## Filter expressions

```javascript
gridModel.filter({
   by: {
      $expression: { 
         kind: 'group',
            op: 'and',
            left: {
               kind: 'condition',
               left: key,
               op: 'in',
               right: ['foo', 'bar']
         },
         right: null
      }
   }
});
```

{% docEditor "github/qgrid/ng2-example/tree/filter-condition-basic/latest" %}

## Expression builder contract


## Suggested links

* [Standalone expression builder](https://github.com/qgrid/ng2-expression-builder)