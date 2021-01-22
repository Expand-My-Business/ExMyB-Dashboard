
$(document).ready(function(){
    var ph_indx=1;
    var ph_remove;
    var ph_disabled;
    $('#add-phase').on('click',function(){
       
        $("tbody").append(
        `<tr id="phtr_${++ph_indx}">
            <td class="d-inline-block cell col-1" id="phase_${ph_indx}"><sapn style="display:block;padding: 0.375rem 0.75rem;line-height: 1.5;">${ph_indx}</sapn></td>
            <td class="d-inline-block cell col-6">
                <textarea cols="1" rows="2" id="desc_${ph_indx}" class="form-control w-100 text-left select-border" placeholder="Write Description..." ></textarea>
            </td>
            <td class="d-inline-block cell col-2"><input type="number" name="phaseDay" id="phaseDay_${ph_indx}"  class="form-control select-border" placeholder="Timeline in Days"> </td>
            <td class="d-inline-block cell col-2"><input type="number" name="phasePrice" id="phasePrice_${ph_indx}"  class="form-control select-border" placeholder="Payment in Rupees"> </td>
            <td class="d-inline-block cell col-1">
                <button type="button" class="btn  del-btn" data-ph-id="phtr_${ph_indx}" id="remove-phase" value=""><i class="far fa-trash-alt"></i></button>
            </td>  
        </tr>`
        ); 
        
    });  

    $("tbody").on('click','#remove-phase',function(){
      /*   $(this).parent().parent().remove(); */

      if(ph_indx<=1){
        alert("Atleast one phase is required");
        return;
    }

      var child = $(this).closest('tr').nextAll();

      child.each(function(){
          var id = $(this).attr('id');
          
          var iid = parseInt(id.substring(5));
          var newid = "phtr_" + (iid-1);
          var sph = "phase_" + (iid-1);
          var sdes = "desc_" + (iid-1);
          var sdays = "phaseDay_" + (iid-1);
          var sprice = "phasePrice_" + (iid-1);
          $('tbody tr#' + id +' > td:nth-child(1)').prop('id',sph).html(iid-1);
          $('tbody tr#' + id +' > td:nth-child(2) > textarea').prop('id',sdes);
          $('tbody tr#' + id +' > td:nth-child(3) > input').prop('id',sdays);
          $('tbody tr#' + id +' > td:nth-child(4) > input').prop('id',sprice);
          $('tbody tr#' + id +' > td:nth-child(5) > button').attr('data-ph-id',newid);
          $(this).prop('id',newid);
         });
  
            ph_remove = "#" + $(this).data('ph-id');
            $(ph_remove).remove(); 
            --ph_indx;


    });
    // Disable property added with not allowed cursor
    $("tbody").on('click','#save-phase',function(){
        
        ph_disabled="#" + $(this).data('save-id');
        var id = $(this).data('save-id');
        var iid = parseInt(id.substring(7));

        console.log(iid);
        $('tr td textarea#desc_' + iid).prop('disabled',true).css('cursor','not-allowed');
        $('tr td input#phaseDay_' + iid).prop('disabled',true).css('cursor','not-allowed');
        $('tr td input#phasePrice_' + iid).prop('disabled',true).css('cursor','not-allowed');
      
      });
   
      


}); 
