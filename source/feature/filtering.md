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

## Column Filters

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

## Custom Filters

{% docEditor "github/qgrid/ng2-example/tree/filter-row-custom/latest" %}

## Filter Expressions

```javascript
gridModel.filter({
   by: {
      $expression: {
      kind: 'group',
      op: 'and',
      left: {
         kind: 'group',
         op: 'or',
         left: {
            kind: 'condition',
            op: 'between',
            left: 'Age',
               right: [25, 30]
         },
         right: {
            kind: 'condition',
            op: 'GreaterThan',
            left: 'Age',
            right: 40
         }
      },
      right: {
         kind: 'group',
         op: 'and',
         left: {
            kind: 'condition',
            op: 'in',
            left: 'PayerName',
            right: ['John', 'Gerard', 'Steve']
         },
         right: {
            kind: 'condition',
            op: 'isNotNull',
            left: 'Account',
            right: null
         }
      }
   }
});
```

{% docEditor "github/qgrid/ng2-example/tree/filter-condition-basic/latest" %}

## Expression Contract

```typescript
{
   kind: 'condition' | 'group'
   group[left]: condition[left] | group
   group[right]: condition[right] | group | null
   group[op]: 'and' | 'or'
   condition[left]: columnKey
   condition[right]: string | number | array | bool | date | null
   condition[op]: 
      'isNotNull' 
      | 'isNull' 
      | 'equals' 
      | 'notEquals' 
      | 'greaterThanOrEquals' 
      | 'greaterThan' 
      | 'lessThanOrEquals' 
      | 'lessThan' 
      | 'between' 
      | 'in' 
      | 'like' 
      | 'notLike'
}
```
## Suggested Links

* [Standalone expression builder](https://github.com/qgrid/ng2-expression-builder)