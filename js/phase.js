
$(document).ready(function(){
    var id=1;
    $('#add-phase').on('click',function(){
       
        $("tbody").append(
        `<tr id="">
            <td class="d-inline-block cell col-2" id="phase_${++id}">${id}</td>
            <td class="d-inline-block cell col-4">
                <textarea cols="1" rows="1" class="w-100 text-left select-border" placeholder="Write Description..." ></textarea>
            </td>
            <td class="d-inline-block cell col-2"><input type="number" name="phaseDay" id="phaseDay"  class="select-border"> </td>
            <td class="d-inline-block cell col-2">₹ <input type="number" name="phasePrice" id="phasePrice"  class="select-border"> </td>
            <td class="d-inline-block cell col-2">
                <button type="button" class="btn btn-info bg-gradient-info" id="save-phase" value=""><i class="fas fa-check"></i></button>
                <button type="button" class="btn btn-danger bg-gradient-danger" id="remove-phase" value=""><i class="far fa-trash-alt"></i></button>
            </td>  
        </tr>`
        ); 
        
    });  

    $("tbody").on('click','#remove-phase',function(){
        $(this).parent().parent().remove();
    });
    




}); 
