/**
 * Created by Joe Wemyss on 17/12/2016.
 * The client-side logic for the timestamp service
 */
function submitMemonicClicked() {
    'use strict';
    $('#memonicDateStore').val(convertTimestamp($('#memonicDate').val()));
    $('#submitDate').click();
}
function convertTimestamp(timestamp){
    'use strict';
    var splitTimestamp = timestamp.split('/');
    return  getMonthName(splitTimestamp[0]) + ' ' + splitTimestamp[1] + ', ' + splitTimestamp[2];
}
function getMonthName(month){
    'use strict';
    var months = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];
    return months[month - 1];
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
    'use strict';
    $('#memonicDate').datepicker({
        inline : true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                                 });
    $('#submitMemonic').click(submitMemonicClicked);
    $('#submitNumeric').click(submitNumericClicked);
    $('#toggleForm').click(toggleForms);
});
