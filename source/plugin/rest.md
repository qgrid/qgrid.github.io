---
title: REST
group: Plugins
order: 6
---

Use REST plugin to connect q-grid with back-end directly.

## Installation

Add rest module to imports section.

```typescript
import { GridModule } from 'ng2-qgrid';
import { ThemeModule } from 'ng2-qgrid/theme/material';
import { RestModule } from 'ng2-qgrid/plugin/rest';

@NgModule({
   imports: [
      GridModule,
      ThemeModule,
      RestModule
   ]
})
export class AppModule {
}
```

Add angular component inside of q-grid component, after that a new action should appear.

```typescript
@Component({
   selector: 'my-component',
   template: `
      <q-grid>
         <q-grid-rest [url]="myServiceUrl" method="GET"></q-grid-rest>
      </q-grid>
   `
})
export class MyComponent {
   myServiceUrl = 'http://localhost:4000/exampleData'
}
```

## POST Method

Next body is produced for filtering, sorting and pagination.

```javascript
{
    filter: 'lastName=in:Doe,Jones;firstName=in:John,Harry',
    order: '+firstName,-lastName',
    skip: 100,
    take: 50
}
```

## GET Method

Next url is produced for filtering, sorting and pagination.

`?filter=lastName=in:Doe,Jones;firstName=in:John,Harry&order=+firstName,-lastName&skip=100&take=50`

## How to make a custom contract?

Override `serialize` method to change request output.

```typescript
@Component({
   selector: 'my-component',
   template: `
     <q-grid>
       <q-grid-rest [url]="myServiceUrl" method="POST"></q-grid-rest>
     </q-grid>
   `
})
export class MyComponent implements AfterViewInit {
   ViewChild(GridComponent) myGrid: GridComponent;   
   myServiceUrl = 'http://localhost:4000/exampleData'

   ngAfterViewInit() {
      const { model } = this.myGrid;      
      model.rest({
        serialize: () => {
            const pagination = model.pagination();
            const sort = model.sort();
            const filter = model.filter();

            return {
               filter: filter.by,
               order: sort.by.map(s => {
                  const key = Object.keys(s)[0];
                  const value = s[key];
                  return (value === 'asc' ? '+' : '-') + key;
               }),
               skip: pagination.current * paginationState.size,
               take: pagination.size
            };      
      });
   }
}
```

## Suggested Links

* [How to propagate list of items to the column filter from the server?](/feature/filtering.html#How-to-propagate-list-of-items-to-the-column-filter-from-the-server)