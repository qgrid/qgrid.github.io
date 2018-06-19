---
title: BodyView
type: api
group: API
order: 5
---
Use this class to get access to the main area rendering options.

{% docTable "source/api/body-view.json" %}

### How to access

```html
<ng-template let-$view="$view">
		Count of columns for the first row: {{$view.body.render.columns(rows[0], null, 0)]).length}}
</ng-template>
```

* ### Suggested Links

* [Render](/doc/api/render.html)
* [View](/doc/api/view.html)

