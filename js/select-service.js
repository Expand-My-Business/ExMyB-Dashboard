//selectpicker for select > option
$(function () {
    $('.selectpicker').selectpicker();
});

var pre_selected = [];

var myjson = {'1': {'d_type': 2,'has_child': 1,'l2_info': {'id': 42,'name': 'smm'},'l3_info': [{'id': 2,'name': 'digital'},{'id': 3,'name': 'facebook'}]}};

$(function() {
    $('#service-level2').change(function(e) {
        var selected = $(e.target).val();
        console.dir(selected);
        /* ---task--- */
        var new_id;
        
        for(var i in selected){
            if(pre_selected.includes(selected[i])){
                console.log("Yes");
                new_id = null;
            }else{
                console.log("No");
                pre_selected.push(selected[i]);
                new_id = selected[i];
            }
            console.log("new_id: "+new_id);

            if(new_id){

                var tthead = `
                                                    <thead>
                                                        <tr>
                                                            <th class="cell">  <input name="all_checkboxes" id="checkbox_all" type="checkbox" value="l2_${new_id}" ></th>
                                                            <th class="cell"><input type="text" value="${myjson[new_id]['l2_info']['name']}" name="l2_${new_id}_name" class="select-border" disabled></th>
                                                            <th class="cell">₹ <input name="l2_${new_id}_minprice" id="min_price_default" type="input" placeholder="Min Price" class="select-border" ></th>
                                                            <th class="cell">₹ <input name="l2_${new_id}_maxprice" id="max_price_default" type="input" placeholder="Max Price" class="select-border" ></th>
                                                            <th class="cell"><button type="button" class="btn" data-toggle="collapse" data-target="#collapse"><i class="fas fa-chevron-down"></i></button></th>
                                                        </tr>
                                                    </thead>
                `;

                var all_ttrow = ``;
                if(myjson[new_id]['has_child']==1){
                    var ttrow = ``;
                    var temp = myjson[new_id]['l3_info'];
                    for(var j in temp){

                        ttrow = `
                                                        <tr>
                                                            <td class="cell">
                                                                
                                                                <input name="all_checkboxes" id="checkbox_1" type="checkbox" value="l2_${new_id}_l3_${temp[j]['id']}">
                                                                
                                                            </td>
                                                            <td class="cell"><input type="text" name="l2_${new_id}_l3_${temp[j]['id']}_name" value="${temp[j]['name']}"></td>
                                                            <td class="cell">
                                                                <input name="l2_${new_id}_l3_${temp[j]['id']}_minprice" id="min_price_default" type="input" class="select-border" style="width: 50%;">
                                                            </td>
                                                            <td class="cell">
                                                                <input name="l2_${new_id}_l3_${temp[j]['id']}_maxprice" id="max_price_default" type="input" class="select-border" style="width: 50%;">
                                                            </td>
                                                        </tr>
                        
                        `;
                        all_ttrow += ttrow;

                    }
                }else{
                    all_ttrow = 'No data';
                }

                $('#mydiv').prepend(`
                
                                            <table class="table mb-2 text-center">
                                                    ${tthead}
                                                    <tbody id="collapse" class="show">
                                                        
                                                        ${all_ttrow}
                                                       
                                                    </tbody>
                                            </table>
                
                
                `);


            }



        }
    }); 
});


$(document).ready(function(){
    // Check or Uncheck All checkboxes
    $("#checkbox_all").change(function(){
      var checked = $(this).is(':checked');
      if(checked){
        $(".checkbox").each(function(){
          $(this).prop("checked",true);
        });
      }else{
        $(".checkbox").each(function(){
          $(this).prop("checked",false);
        });
      }
    });
  
   // Changing state of CheckAll checkbox 
   $(".checkbox").click(function(){
  
     if($(".checkbox").length == $(".checkbox:checked").length) {
       $("#checkbox_all").prop("checked", true);
     } else {
       $("#checkbox_all").removeAttr("checked");
     }
 
   });

   // Add required attribute when tr is checked

   //rnd 1 --working fine
/*    $(".service-form").on('click','#save-serivce',function(){
    
    if($('.checkbox').prop('checked')){
      $('#sr_min_price').prop('required',true);
      $('#sr_max_price').prop('required',true);
      
    }else{  
      $('#sr_min_price').prop('required',false);
      $('#sr_max_price').prop('required',false);
    }
  }); */

  //rnd 2
/*         $('.service-form').keyup(function () {
            if ($(this).val() == '') {
                //Check to see if there is any text entered
                // If there is no text within the input ten disable the button
                $('#save-serivce').prop('disabled', true);
            } else {
                //If there is text in the input, then enable the button
                $('#save-serivce').prop('disabled', false);
            }
        }); */

        //rnd 3
       /*  $('.service-form').keyup(function() {

            var empty = false;
            $('form > input').each(function() {
                if ($(this).val() == '') {
                    empty = true;
                }
            });

            if (empty) {
                $('#save-serivce').attr('disabled', 'disabled');
            } else {
                $('#save-serivce').removeAttr('disabled');
            }
        }); */

        //rnd 4
        $('.service-form').keyup(function() {
        var inputs = document.getElementsByTagName("input");
        var filled = true;
        var oneChecked = false;
        
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "text" && !inputs[i].value) {
                filled = false;
            }
            
            if (inputs[i].type === "checkbox" && inputs[i].checked) {
                oneChecked = true;
            }
    
        }
    
        if (!oneChecked) {
            filled = false;
        }
    
        
        if (filled) {
            document.getElementById("save-serivce").disabled = false;
        } else {
            document.getElementById("save-serivce").disabled = true;
        }
    });




 });



//Add row and remove row in custom Service

$(document).ready(function(){
 
    $('.custom-service-form').on('click','#add-service',function(){
        $("#custom-tbody").append( /* "<tr>"+ "<td><input type='text'/></td>" */
        '<tr id="custom-row">'+
            '<td class="cell"><input name="customservice" id="customservice" type="input" class="select-border" required></td>'+
            '<td class="cell">₹ <input name="minPriceDefault" id="min_price_default" type="input" class="select-border" style="width: 50%;" required></td>'+
            '<td class="cell">₹ <input name="maxPriceDefault" id="max_price_default" type="input" class="select-border" style="width: 50%;" required></td>'+
            '<td class="cell"><input type="button" value="Add" class="btn btn-primary bg-gradient-primary "> <button type="button" id="remove-service" class="btn btn-danger bg-gradient-danger ">Remove</button></td>'+    
        '</tr>'
        ); 
        
    });  
    
$('#custom-tbody').on('click','#remove-service',function(){
   /*  $(this).closet('tr').remove(); */
   $('#custom-row').remove();
}); 
});

