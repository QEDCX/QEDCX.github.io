var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {

        document.getElementById("img").setAttribute("src",xmlhttp.responseText);
    }
}
xmlhttp.open("GET","http://localhost/b");
xmlhttp.send();
