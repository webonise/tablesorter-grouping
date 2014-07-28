Row Grouping Widget for TableSorter
======================================

A widget for [TableSorter](http://tablesorter.com/) that groups columns with a matching key. If you have two rows in your table, and the keys of the two rows are the same,
then it will group those two rows together by attaching the `grouped-row` class.
In addition, it provides zebra striping on a for-group basis: the first group of rows is tagged with the `odd` class, the next
group of rows with the `even` class, the next with the `odd` class, and so on.
All of this enables you to customize the appearance of your sorted table based on the groups of rows, instead of based on rows individually.
These groupings are all automatically recalculated when you sort the table.
The `demo.html` file is a basic demo, which is published
[here](http://files.enfranchisedmind.com/tablesorter-grouping/demo.html): to see the sorting magic in action, hold the shift key and click on the
first three headers.

Please note that all this widget does is apply CSS classes to denote key columns and grouped rows, and to make the zebra stripe classes match within groups.
It is your job to make those CSS classes do what you want them to do.

Usage
-------

1. Include the `tablesorter-grouping.js` JavaScript file after you include your TableSorter JavaScript file.
2. Call `$.tablesorter.addWidget(webonise.tablesorter.grouping);` to register the grouping widget.
3. When you create your tablesorter, attach the widget: `$("#mytable").tablesorter({widgets: ["grouping"]});`
4. When you define your table, add the `key-column` class to those `TH` HTML tags which make up your key columns.
5. Your table will now be grouped by those key columns. Grouped rows are denoted by having the `grouped-row` class.

Note that neither TableSorter nor the Grouping widget apply any CSS styling by default, so you may not see any change visually at this point. If you examine the elements
through your developer tools, put breakpoints in the JavaScript, or attach the CSS that the `demo.html` file uses, though, you can then see the changes being made.

Configuration
---------------

The `$.tablesorter.addWidget` method takes a JavaScript object of a particular shape. If you want multiple slight variations on the grouping,
you can use the `webonise.tablesorter.grouping` object as a template, and customize the following properties:

* `id`: The identifier of the widget, which is passed to the `widgets` configuration when creating the `tablesorter`.
* `cssClasses.even`: The CSS class to apply to "even" row groups to create the zebra striping.
* `cssClasses.odd`: The CSS class to apply to "odd" row groups to create the zebra striping.
* `cssClasses.groupedRow`: The CSS class to apply to rows which should be grouped with the previous row.
* `cssClasses.keyColumn`: The CSS class that defines the key columns on the `th` elements and is attached to the `td` in those columns.

