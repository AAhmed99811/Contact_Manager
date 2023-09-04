//Validate fromm inputs before submitting data
function validateForm()
{
    var name = document.getElementById("name").value; 
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;

    if(name == "")
    {
        alert("Name is required");
        return false;
    }

    if(age == "")
    {
        alert("Age is required");
        return false;
    }
    else if (age < 1)
    {
        alert("Age must not be zero or less than zero");
        return false;
    }

    if(address == "")
    {
        alert("Address is required");
        return false;
    }

    if(email == "")
    {
        alert("E-Mail is required");
        return false;
    }
    else if (!email.includes("@"))
    {
        alert("Invalid email address");
        return false;
    }

    if(number == "")
    {
        alert("NUmber is required");
        return false;
    }

    return true;
}

//function to show data from local storage
function showData()
{
    var peopleList;
    if(localStorage.getItem("peopleList") == null)
    {
        peopleList = [];
    }
    else
    {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html ="";

    peopleList.forEach(function (element, index)
    {
        html += "<tr>";
        html += "<td>" + element.name ;
        html += "<td>"+ element.age;
        html += "<td>"+ element.address;
        html += "<td>" +element.number;
        html += "<td>" +element.email;
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Delete</button><button onclick="updateData('+index+')" class="btn btn-warning">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#Table tbody").innerHTML = html;
}

//Loads all data from local storage when document or page loaded
document.onload = showData();

//Function to add data to Local Storage
function AddData()
{
    //if form is validated
    if(validateForm() == true)
    {
        var name = document.getElementById("name").value; 
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var number = document.getElementById("number").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if(localStorage.getItem("peopleList") == null)
        {
            peopleList = [];
        }
        else
        {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name : name,
            age : age,
            address : address,
            number : number,
            email : email,
        })
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("number").value = "";
        document.getElementById("email").value = "";
    }
}

//Function to delete data from local storage
function deleteData(index)
{
    var peopleList;
    if(localStorage.getItem("peopleList") == null)
    {
        peopleList = [];
    }
    else
    {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//function to update/edit data in local storage
function updateData(index)
{
    //submit button will hide and update button show for updating of data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if(localStorage.getItem("peopleList") == null)
    {
        peopleList = [];
    }
    else
    {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("number").value = peopleList[index].number;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function()
    {
        if(validateForm() == true)
        {
            peopleList[index].name = document.getElementById("name").value;

            peopleList[index].age = document.getElementById("age").value;

            peopleList[index].address = document.getElementById("address").value;

            peopleList[index].number = document.getElementById("number").value;

            peopleList[index].email = document.getElementById("email").value;
            
            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("number").value = "";
            document.getElementById("email").value = "";

            //Update button will hide and submit button will show for updating data in local storage
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}