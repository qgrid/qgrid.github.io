---
title: Navigation
group: Features
order: 13
---

The q-grid navigation system supports various keyboard events but to start keyboard navigation q-grid should be focused. Focus can be setup in 3 different ways: by cell clicking, by using `q-grid-autofocus` directive and by using q-grid service.   

```typescript
export class MyComponent {
   gridModel: GridModel;

   constructor(dataService: DataService, qgrid: Grid) {
      this.gridModel = qgrid.model();

      dataService
         .getAtoms()
         .subscribe(rows => {
            this.gridModel.data({ rows });

            const gridService = qgrid.service(this.gridModel);
            gridService.focus(1, 2);
         });
   }
}
```

{% docEditor "github/qgrid/ng2-example/tree/focus-cell-auto/latest" %}


## Shortcut limitations for browser

Here's a number of `Ctrl` key combinations that browsers do not allow JavaScript to override for preventing malicious websites:
* `Ctrl+N`
* `Ctrl+Shift+N`
* `Ctrl+T`
* `Ctrl+Shift+T`
* `Ctrl+W`
This key combinations shouldn't be overriden. Browsers dissalow overriding this keycode combinations, linked bugs are closed with status `RESOLVED WONTFIX`

If you use qgrid in your electron application - these shortcuts could be overwritten.


## Suggested Links

* [Chromium issues](https://bugs.chromium.org/p/chromium/issues/detail?id=33056) 
* [Google code discussion](https://groups.google.com/a/chromium.org/forum/?fromgroups=#!topic/chromium-bugs/Ntc1byZXHfU)
* [Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1291706)