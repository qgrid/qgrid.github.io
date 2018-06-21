---
title: For Writers
group: Getting started
order: -1
---

## Markdown Documentation

* [The ultimate guide](https://blog.ghost.org/markdown/).
* [Etalon example](/doc/feature/selection.html).
* [Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## Typescript Documentation

### Significant Comment Example

```typescript

/**
 * All this text will go to the head of page. 
 * We call it "description".
 * 
 * ### Header
 * Starting the header above all text will go to the bottom of page. 
 * We call it "comment".
 *
 */
export declare class MyClass {

  /**
   * All properties inside class will be displayed in a table between "description" and "comment"
   */
    foo: any[];

  /**
   * Type is deferred automatically so no need to describe it.
   */
    bar: string;

  /**
   * Property won't be rendered if there is no any comment for it.
   */
    baz: Date;
}
```

### Consider to

* Make comments inside declaration `d.ts` files.
* Try to use `markdown` everywhere.
* `Avoid` to use html tags.
* For example, use ` ```html ` syntax to make an code example.
* Use 3 spaces for formatting inside markdown code example.
* Do not include live examples.

### Build Markdown from Typescript

* We use [typedoc](https://github.com/TypeStrong/typedoc) to generate `api.json` file that contains reflection metadata for defenitions.
* We use [gulp](https://github.com/qgrid/doc/blob/master/gulpfile.js) + [handlebars](https://github.com/qgrid/doc/blob/master/api.hbs) + [habdlebars extensions](https://github.com/qgrid/doc/blob/master/hbs.js) to generate `markdown` files from `api.json`.
* we use [ejs hexo plugin](https://github.com/qgrid/doc/blob/master/scripts/table.js) + [marked lib](https://www.npmjs.com/package/marked) to generate table that can contain markdown inside the cells.
* You type `npm run doc` to generate documentation, from `node_modules/ng2-qgrid/core/` folder.
* How you update `node_modules/ng2-qgrid/core/` folder is not defined yet.

### Stackblitz

* https://stackblitz.com/@qgrid
* Name convention is `qgrid-{framework}-{version}-{feature}`.
* For instance, `qgrid-ng-5-1-2-selection`.

### Version Support

> Not defined.