/**
 * Created by Joe Wemyss on 17/12/2016.
 * The client-side logic for the timestamp service
 */
function submitMemonicClicked() {
    'use strict';
    console.log('submit memonic clicked');
}
function submitNumericClicked(){
    'use strict';
    console.log('submit numeric clicked');
    $('#submitUnix').click();
}
function toggleForms(e){
    'use strict';
    console.log('toggle forms clicked');
    $('#numericForm').toggleClass('hidden');
    $('#memonicForm').toggleClass('hidden');
}
$(document).ready(function () {
    $('#timestampDatePicker').datepicker();
    $('#submitMemonic').click(submitMemonicClicked);
    $('#submitNumeric').click(submitNumericClicked);
    $('#toggleForm').click(toggleForms);
});
