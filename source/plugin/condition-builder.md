---
title: Condition Builder
group: Plugins
order: 0
---
- [Installation](#installation)
- [The Contract](#the-contract)
- [Hot wot setup default condition on component load?](#ho-wot-setup-default-condition-on-component-load)
- [Suggested Links](#suggested-links)

Use query builder plugin to add unlimited possibilities to filter data using convenient hierarchical UI.

{% docEditor "github/qgrid/ng2-example/tree/filter-condition-basic/latest" %}

<a name="#installation">
   Installation
</a>

Add angular component inside of q-grid component, after that extended filter icon should appear in the top toolbar.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-condition-builder>
         </q-grid-condition-builder>
      </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;

   constructor(dataService: MyDataService) {
      this.rows$ = dataService.getRows();
   }
}
```

<a name="#the-contract">
   The Contract
</a>

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

<a name="#hot-wot-setup-default-condition-on-component-load">
   Hot wot setup default condition on component load?
</a>

Use filter model `$expression` property in `by` section, the same position should be used to get expression that was setup from UI.

```typescript
import { GridComponent, FetchContext } from 'ng2-qgrid';

@Component({
   template: '<q-grid [model]="gridModel"></q-grid>',
})
export class ExampleFilterRowCustomComponent implements AfterViewInit {
   gridModel = this.qgrid.model();

   constructor(private qgrid: Grid) {}

   ngAfterViewInit() {
      this.gridModel.filter({
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
                     right: [25, 30],
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
         }
      });
   }
}
```

<a name="#suggested-links">
   Suggested Links
</a>


* [Standalone expression builder](https://github.com/qgrid/ng2-expression-builder)
