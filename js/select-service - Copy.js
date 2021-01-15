//selectpicker for select > option
$(function () {
    $('.selectpicker').selectpicker();
});

var pre_selected = [];

var myjson = {
    '1': {'d_type': 2,'has_child': 1,'l2_info': {'id': 42,'name': 'smm'},'l3_info': [{'id': 2,'name': 'digital'},{'id': 3,'name': 'facebook'}]},
    '2': {'d_type': 2,'has_child': 1,'l2_info': {'id': 42,'name': 'smm'},'l3_info': [{'id': 2,'name': 'digital'},{'id': 3,'name': 'facebook'}]},
    '3': {'d_type': 2,'has_child': 1,'l2_info': {'id': 42,'name': 'smm'},'l3_info': [{'id': 2,'name': 'digital'},{'id': 3,'name': 'facebook'}]},
    '4': {'d_type': 2,'has_child': 1,'l2_info': {'id': 42,'name': 'smm'},'l3_info': [{'id': 2,'name': 'digital'},{'id': 3,'name': 'facebook'}]}
};

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
                              <thead class="th-bg-color vcs-thead">
                                  <tr class="vcs-thead">
                                      <th class="cell w-10"><input name="all_checkboxes" class="top_check all_checkboxes" id="ch_${new_id}" type="checkbox" value="l2_${new_id}" ></th>
                                      <th class="cell w-40"><input type="text" value="${myjson[new_id]['l2_info']['name']}" name="l2_${new_id}_name" class="select-border" disabled></th>
                                      <th class="cell "><input name="l2_${new_id}_minprice" id="min_price_default" type="input" placeholder="Min Price (₹)" class="select-border"  ></th>
                                      <th class="cell "><input name="l2_${new_id}_maxprice" id="max_price_default" type="input" placeholder="Max Price (₹)" class="select-border" ></th>
                                      <th class="cell "><button type="button" class="btn" data-toggle="collapse" data-target="#collapse_${new_id}"><i class="fas fa-chevron-down"></i></button></th>
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
                                                                
                                                                <input name="all_checkboxes" class="ch_${new_id} all_checkboxes" id="checkbox_1" type="checkbox" value="l2_${new_id}_l3_${temp[j]['id']}">
                                                                
                                                            </td>
                                                            <td class="cell"><input type="text" name="l2_${new_id}_l3_${temp[j]['id']}_name" value="${temp[j]['name']}"></td>
                                                            <td class="cell">
                                                                <input name="l2_${new_id}_l3_${temp[j]['id']}_minprice" id="min_price_default" type="input" class="select-border " >
                                                            </td>
                                                            <td class="cell">
                                                                <input name="l2_${new_id}_l3_${temp[j]['id']}_maxprice" id="max_price_default" type="input" class="select-border " >
                                                            </td>
                                                        </tr>
                        
                        `;
                        all_ttrow += ttrow;

                    }
                }else{
                    all_ttrow = 'No data';
                }

                $('#mydiv').prepend(`
                
                                            <table id="t_${new_id}" class="table my-4 text-center shadow-sm ">
                                                    ${tthead}
                                                    <tbody id="collapse_${new_id}" class="show">
                                                        
                                                        ${all_ttrow}
                                                       
                                                    </tbody>
                                            </table>
                
                
                `);


            }



        }

         // Remove table when select option removed
         var selected = $(this).find('option:selected');
         var unselected = $(this).find('option:not(:selected)');
         selected.attr('data-selected', '1');
         $.each(unselected, function(index, value){
           if($(this).attr('data-selected') == '1'){
                 //this option was selected before
                 // alert("I was selected before " + $(this).val());
                 var id = '#t_'+$(this).val();
                 // alert("my id is : " + id);
                 $(id).remove();
                 $(this).attr('data-selected', '0');
             }
         });
    }); 
});


$(document).ready(function(){
    // Check or Uncheck All checkboxes
    // Add required attribute when tr is checked


    // $("#checkbox_all").change(function(){
    //   var checked = $(this).is(':checked');
    //   if(checked){
    //     $(".checkbox").each(function(){
    //       $(this).prop("checked",true);
    //     });
    //   }else{
    //     $(".checkbox").each(function(){
    //       $(this).prop("checked",false);
    //     });
    //   }
    // });

    $("div#mydiv").on('click',"input.all_checkboxes",function(){
        var myval = $(this).val();
        console.log("test: "+myval);
        var minprice = myval + "_minprice";
        var maxprice = myval + "_maxprice";
        var i_minp = "input[name='" + minprice + "']";
        var i_maxp = "input[name='" + maxprice + "']";
        if($(this).prop('checked')){
          console.log("checked");
          $(i_minp).prop('required',true);
          $(i_maxp).prop('required',true);
        }else{
          $(i_minp).prop('required',false);
          $(i_maxp).prop('required',false);
          console.log("not checked");
        }



    });

    $("div#mydiv").on('change',"input.top_check.all_checkboxes",function(){
        console.log("working");
        var checked = $(this).is(':checked');
        var myclass = "." + $(this).attr('id');
        console.log("myclass: " + myclass);
        if(checked){
        // console.log("working1");

            $(myclass).each(function(){
              $(this).prop("checked",true);
              var tminprice = $(this).val() + "_minprice";
              var tmaxprice = $(this).val() + "_maxprice";
              var i_minp = "input[name='" + tminprice + "']";
              var i_maxp = "input[name='" + tmaxprice + "']";
              if($(this).prop('checked')){
                $(i_minp).prop('required',true);
                $(i_maxp).prop('required',true);
              }else{
                $(i_minp).prop('required',false);
                $(i_maxp).prop('required',false);
                console.log("not checked");
              }
            });
        }else{
        // console.log("working2");

            $(myclass).each(function(){
              $(this).prop("checked",false);
              var tminprice = $(this).val() + "_minprice";
              var tmaxprice = $(this).val() + "_maxprice";
              var i_minp = "input[name='" + tminprice + "']";
              var i_maxp = "input[name='" + tmaxprice + "']";
              if($(this).prop('checked')){
                $(i_minp).prop('required',true);
                $(i_maxp).prop('required',true);
              }else{
                $(i_minp).prop('required',false);
                $(i_maxp).prop('required',false);
                console.log("not checked");
              }
            });
        }
    });

    // $(".top_check.all_checkboxes")
  
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


 });



//Add row and remove row in custom Service

$(document).ready(function(){
    var os_trIndex = 1;
        /* var os_customservice = 1;
        var os_minprice = 1;
        var os_maxprice = 1; */
        var tr_remove;
    $('.custom-service-form').on('click','#add-service',function(){
        
        $("#custom-tbody").append(
        `<tr id="ctr_${++os_trIndex}">
            <td class="cell"><input name="customservice" id="customservice_${os_trIndex}"  type="text" class="select-border" required></td>
            <td class="cell"><input name="minPriceDefault" id="min_price_${os_trIndex}" type="text" class="select-border" style="width: 50%;" required></td>
            <td class="cell"><input name="maxPriceDefault" id="max_price_${os_trIndex}" type="text" class="select-border" style="width: 50%;" required></td>
            <td class="cell"><button type="button" data-tr-id="ctr_${os_trIndex}" id="" class="btn del-btn remove-service"><i class="far fa-trash-alt"></i></button></td>   
        </tr>`
        ); 
        
    });  
    
$('#custom-tbody').on('click','.remove-service',function(){
    
   var child = $(this).closest('tr').nextAll();

    child.each(function(){
        var id = $(this).attr('id');
        // var mid1 = "#custom-tbody tr#" + id + " > td";
        var iid = parseInt(id.substring(4));
        var newid = "ctr_" + (iid-1);
        var sname = "customservice_" + (iid-1);
        var sminprice = "min_price_" + (iid-1);
        var smaxprice = "max_price_" + (iid-1);
          $('#custom-tbody tr#' + id +' > td:nth-child(1) > input').prop('id',sname);
          $('#custom-tbody tr#' + id +' > td:nth-child(2) > input').prop('id',sminprice);
          $('#custom-tbody tr#' + id +' > td:nth-child(3) > input').prop('id',smaxprice);
          $('#custom-tbody tr#' + id +' > td:nth-child(4) > button').attr('data-tr-id',newid);
          $(this).prop('id',newid);
          
   });

   tr_remove = "#" + $(this).data('tr-id');
   $(tr_remove).remove(); 
   --os_trIndex;
  


}); 
});

