document.getElementById('add-task').addEventListener('click', function() {
    document.getElementById('form-div').classList.remove('d-none');
    document.getElementById('app').style.filter = "blur(5px)";
    document.getElementById('app').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  
});
document.getElementById('cancel').addEventListener('click',function(){
    document.getElementById('form-div').classList.add('d-none');
    document.getElementById('app').style.filter = "";
    document.getElementById('app').style.backgroundColor = "";
})
