---
title: How to install
type: guide
group: Getting started
order: 1
---

## Install the q-grid

Download and install the package.

```bash
npm install ng2-qgrid
```

## Instantiate a q-grid

Once installed, import the `grid` and `theme` modules to your application root module.

```javascript
import {GridModule} from 'ng2-qgrid';
import {ThemeModule} from 'ng2-qgrid/theme/material';

@NgModule({
   imports: [
      GridModule,
      ThemeModule
   ]
})
export class AppModule {
}
```

Add grid `model` and grid `service` to your component if it's required.

```javascript
import {GridModel, GridService} from 'ng2-qgrid';

@Component({
   selector: 'my-component',
   templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
   public gridModel: GridModel;

   constructor(gridService: GridService) {
      this.gridModel = gridService.model();
   }

   ngOnInit(): void {
      this.gridModel
         .data({
            rows: getRows()
         });
   }
}
```

Add html markup to your component.

```html
<q-grid [model]="gridModel">
   <q-grid-columns generation="deep">
      <q-grid-column type="number" aggregation="sum"></q-grid-column>
      <q-grid-column key="totalAmount" type="currency" aggregation="sum"></q-grid-column>
      <q-grid-column key="businessUnit">
         <ng-template for="foot">
            Total:
         </ng-template>
      </q-grid-column>
   </q-grid-columns>
</q-grid>
```

## Dependencies

The q-grid package requires the following peer dependencies that have to be installed by your application.

* rxjs
* core-js
* @angular/cdk
* @angular/core
* @angular/forms
* @angular/common
* @angular/material
* @angular/anmations

## Development

```bash
git clone https://github.com/qgrid/ng2.git
npm install
npm run start
```

## Licence

Code licensed under MIT license.
