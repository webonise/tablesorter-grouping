(function($) {
  if(typeof($) === 'undefined') {
    console.error("Please load jQuery before loading the TableSorter grouping widget. Aborting the widget load.");
    return;
  } else if(typeof($.tablesorter) === 'undefined') {
    console.error("Please load TableSorter before loading the grouping widget. Aborting the widget load.");
    return;
  }

  var widget = {};
  widget.id = 'grouping'; // ID to register the widget under
  var classes = widget.cssClasses = {};
  classes.even = "even";                // "even" for zebra striping
  classes.odd = "odd";                  // "odd" for zebra striping
  classes.groupedRow = "grouped-row";   // 2nd and later "grouped" row
  classes.keyColumn = "key-column";     // a column that constitutes the key
  classes.groupNum = "tablesorter-grouping-group-";  //adds group numbers incremented by rowGroupIndex

  widget.format = function(table) {

    // Just be sure we've got a jQuery object here
    table = $(table);

    // Get a handle on the relevant CSS classes
    var keyColumnClass = this.cssClasses.keyColumn;
    var groupedRowClass = this.cssClasses.groupedRow;
    var evenClass = this.cssClasses.even;
    var oddClass = this.cssClasses.odd;
    var zebraClasses = evenClass + " " + oddClass;
    var groupNumClass = this.cssClasses.groupNum;


    // Read the indexes of the key columns from the header
    var keyCols = [];
    $("th", table).each(function(idx) {
      var th = $(this);
      if(th.hasClass(keyColumnClass)) {
        keyCols.push(idx);
      }
    });

    // Ensure the key column class is on only the appropriate columns
    $("tbody tr").each(function() {
      var row = $(this);
      var columns = $("td", row);
      columns.removeClass(keyColumnClass);
      $.each(keyCols, function(idx, value) {
        columns.eq(value).addClass(keyColumnClass);
      });
    });

    // Reset all the classes
    $("tr", table).removeClass();

    // Identify the grouped rows
    var previousColumns = null;

    $("tr", table).each(function(idx) {
      // Get a handle on the current row
      var currentRow = $(this);
      var currentColumns = $("td", currentRow);

      // Ignore rows without td elements (such as those with only th elements)
      if(!currentColumns.length) return;

      // If this is the first row, just set the previous row and return
      if(!previousColumns) {
        previousColumns = currentColumns;
        return;
      }

      // If this row matches the previous, add the groupedRowClass
      var matches = true;
		  $.each(keyCols, function(idx, value) {
        matches = matches && (previousColumns.eq(value).text() === currentColumns.eq(value).text());
      });
      if(matches) currentRow.addClass(groupedRowClass);

      // Set the previous columns to be the current columns and move on
      previousColumns = currentColumns;
      return;
    });
    previousCoumns = null; // Not using the previous columns anymore

    // Now apply zebra striping
    var groupIdx = -1;
    $("tr", table).each(function() {
      var currentRow = $(this);

      // Ignore rows without td elements (such as those with only th elements)
      if(!$("td", currentRow).length) return;

      // Increment the group idx if this isn't a grouped row
      if(!currentRow.hasClass(groupedRowClass)) groupIdx = groupIdx + 1;

      // Update the Zebra striping as appropriate
      var zebraClass = groupIdx % 2 ? oddClass : evenClass;
      if(!currentRow.hasClass(zebraClass)) { // Don't mess with it if it is okay
        currentRow.removeClass(zebraClasses).addClass(zebraClass);
      }
    });

    var rowGroupIndex = 0;
    var previousRow;

    //Apply table group numbers
    $("tr", table).each(function(idx) {
      var currentRow = $(this);

      if(previousRow === undefined) previousRow = currentRow;
        
      //Add the class to the first row in the group
      if(currentRow.hasClass(groupedRowClass) && !previousRow.hasClass(groupedRowClass))
        previousRow.addClass(groupNumClass+rowGroupIndex);
    
      //Add the correct group number to the grouped rows
      if(currentRow.hasClass(groupedRowClass))
        currentRow.addClass(groupNumClass+rowGroupIndex);

     //Decides whether its at the end of a group and increments the index
      if(previousRow.hasClass(groupedRowClass) && !currentRow.hasClass(groupedRowClass))
          rowGroupIndex++;

      previousRow = currentRow;
    });
  };

  if(typeof(webonise) === 'undefined') webonise = {};
  if(!webonise.tablesorter) webonise.tablesorter = {};
  webonise.tablesorter.grouping = widget;
})(jQuery);
