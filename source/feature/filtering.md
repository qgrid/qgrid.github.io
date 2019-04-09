---
title: Filtering
group: Features
order: 12
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

To show input controls under the column headers to filter out rows, use `filterUnit` attribute. Any of these inputs could be override by template definitions.

```html
<q-grid filterUnit="row">
   <q-grid-column key="myNumber">
      <ng-template for="filter" let-$cell>
         <input #input
                type="number"
                (change)="$view.filter.column.execute($cell.column.model, input.value)" />
      </ng-template>
   </q-grid-column>
</q-grid>
```

{% docEditor "github/qgrid/ng2-example/tree/filter-row-basic/latest" %}

## Custom Filters

There are various filter possibilities in the the q-grid but still to go own way is not a problem.

```typescript
import { GridComponent } from 'ng2-qgrid';

@Component({
   template: '<q-grid></q-grid>'
})
export class ExampleFilterRowCustomComponent {
   @ViewChild(GridComponent) myGrid: GridComponent;

   filter(value: string) {
      const { model } = this.myGrid;
      value = value.toLocaleLowerCase();
      model.filter({
         match: () => row => row.name.toLowerCase().indexOf(value) >= 0
      });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/filter-row-custom/latest" %}

## Condition Builder

Use query builder component to add unlimited possibilities to filter data out using convenient hierarchical UI.


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

By supporting q-grid expression contract building any custom filters with complex logic should not be a problem.

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