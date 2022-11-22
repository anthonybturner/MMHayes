//This data can also be read in from a text file to populate the states drop down list.
function PopulateStates(){
    var states_arr = [
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    //Populate states dropdown list with these states
    $.each(states_arr, function (i, item) {
        $('#states').append($('<option>', {
            value: item,
            text: item,
        }, '</option>'));
    });
}

//Triggered when Current Employee checkbox is selected or deselected
//Handles the value and form submitting for the checkbox
function HandleCurrentEmployeeChange(el){
    var isChecked = $(el).prop("checked");
    if(isChecked){
        $("#current-emp-val").val("1");
    }else{
        $("#current-emp-val").val("0");
    }
}
function CheckValidation(el){
    if(el == null || $(el).val() === "" ){
        $(el).addClass("error");
        return false;
    }else{
        $(el).removeClass("error");
        return true;
    }
}

function InitValidation(){
    //Not implemented yet
    $("form.emp-form").jqxValidator({  rules : [
        {
            input : '#employee-name',
            message : 'Employee Name is required!',
            action : 'keyup, blur',
            rule : 'required'
        },
        {
          input : '#phone-number',
          message : 'Employee phone number is required!',
          action : 'keyup, blur',
          rule : 'required'
        }],       
    });
}

$(document).ready(function () {

    PopulateStates();
    $("#phone-number").mask("999-999-9999");
    $("#current-emp").change(function(){
        HandleCurrentEmployeeChange($(this));
    });
   // InitValidation(); validation code when ready
    $("#submit").on('click', function (event) {
        event.preventDefault();//Prevents the page from reloading
        var empData = $("form.emp-form").serialize();                
        var request = $.ajax({
            url: "submit.php", //Sudo fake page. Server-side typically hands the post request
            method: "POST",
            data: empData,
            dataType: "json"
            });
            alert("Serialized json data: " +  empData );
            request.done(function( msg ) {
            alert( "Submisson done: " + textStatus );
            });
            request.fail(function( jqXHR, textStatus ) {
            alert( "Submisson will fail due to cross origins " + textStatus );
            });
        return false;
        });
});
