var btn = document.querySelector(".right.floated.ui.button");
var form = document.querySelector(".ui.reply.form");
btn.addEventListener("click",function(event){
        form.classList.toggle("hidden");
});

var btnEdit = document.querySelectorAll(".edit");
var editForm = document.querySelector("#EditForm");

btnEdit.forEach((btn)=>{
       btn.addEventListener("click",(event)=>{
                var commentid = btn.getAttribute("id");
                var URL =  form.getAttribute("action") + commentid + "?_method=PUT";
                var text = document.getElementById(commentid);
                var formInput = document.querySelector("#EditForm > div > textarea");
                formInput.value = text.textContent.trim();
                editForm.classList.toggle("hidden");
                editForm.setAttribute("action",URL);
         
         });
         
});
