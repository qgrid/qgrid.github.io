---
title: Action
group: Plugins
order: 8
---
- [installation](#installation)
- [How to override action template?](#how-to-override-action-template)

Action is just a representation of the command that is utilized by q-grid. Use `<ng-template for="trigger">` component to customize action.

{% docEditor "github/qgrid/ng2-example/tree/action-bar-template/latest" %}

<a name="installation" href="#installation">
   Installation
</a>

Add validation module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { ValidationModule } from 'ng2-qgrid/plugin/validation';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      ValidationModule
   ]
})
export class AppModule {
}
```

Add angular component inside of q-grid component.

```typescript
import { Command } from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   template: `
      <q-grid [rows]="rows$ | async">
         <q-grid-columns generation="deep">
         </q-grid-columns>

         <q-grid-actions>
            <q-grid-action icon="refresh"
                           title="Load Data"
                           [command]="loadCommand">
              </q-grid-action>
              <q-grid-action icon="clear_all"
                             title="Delete Data"
                             [command]="clearCommand">
              </q-grid-action>           
         </q-grid-actions>
    </q-grid>
   `
})
export class MyComponent {
   rows$: Observable<any[]>;
   canLoad = true;

   constructor(private dataService: MyDataService) {}

   loadCommand = new Command({
      execute: () => {
         this.rows$ = this.dataService.getAtoms();
         this.canLoad = false;
      },
      canExecute: () => this.canLoad,
      shortcut: 'ctrl+l'
   });

   clearCommand = new Command({
      execute: () => {
         this.rows$ = of([]);
         this.canLoad = true;
      },
      canExecute: () => !this.canLoad,
      shortcut: 'ctrl+d'
   });
}
```

<a name="how-to-override-action-template" href="#how-to-override-action-template">
   How to override action template?
</a>

Use `ng-template` inside `q-grid-action` template.

```html
 <q-grid [rows]="rows$ | async">
    <q-grid-columns generation="deep">
    </q-grid-columns>

    <q-grid-actions>
        <q-grid-action id="sort-by-symbol-asc">
            <ng-template for="trigger"
                         let-$action>
                <button (click)="sortAsc()"
                        mat-button>
                    Sort By Symbol Asc
                </button>
            </ng-template>
        </q-grid-action>
        <q-grid-action id="sort-by-symbol-desc">
            <ng-template for="trigger"
                         let-$action>
                <button (click)="sortDesc()"
                        mat-button>
                    Sort By Symbol Desc
                </button>
            </ng-template>
        </q-grid-action>
    </q-grid-actions>
</q-grid>
```

> Note that `id` property is required when use custom template for action.
