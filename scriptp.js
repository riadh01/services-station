function signup() {

    // Recuperation des données
    var firstName = document.getElementById('firstName').value;
    var verifFirstName = verifLength(firstName,3);

    if (verifFirstName) {
        document.getElementById("firstNameError").innerHTML = "";

    } else {
        
        document.getElementById("firstNameError").innerHTML = "First name must have at least 3 characters";
        document.getElementById('firstNameError').style.color = "red";

    }

    var lastName = document.getElementById('lastName').value;

    var verifLastName = verifLength(lastName,5);

    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML = "";

    } else {
        
        document.getElementById("lastNameError").innerHTML = "Last name must have at least 5 characters";
        document.getElementById('lastNameError').style.color = "red";
    }

    var email = document.getElementById('email').value;
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";

    } else {
        
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById('emailError').style.color = "red";
    }
    var emailExist = userExist(email);
    if (!emailExist) {
        document.getElementById("emailExistError").innerHTML = "";

    } else {
        
        document.getElementById("emailExistError").innerHTML = "Email already exist";
        document.getElementById('emailExistError').style.color = "red";
    }

    var password = document.getElementById('password').value;
    var verifPassword = verifLength(password,8);

    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";

    } else {
        
        document.getElementById("passwordError").innerHTML = "Password must have at least 8 characters";
        document.getElementById('passwordError').style.color = "red";

    }

    var confirmPwd = document.getElementById('confirmPwd').value;
    if (confirmPwd == password) {
        document.getElementById("confirmPasswordError").innerHTML = "";

    } else {
        document.getElementById("confirmPasswordError").innerHTML = "Invalid confirmation";
        document.getElementById("confirmPasswordError").style.color="red";
    }
    var tel = document.getElementById('tel').value;
    if ((tel.length == 8 )&&(isNaN(tel)==false)) {
        document.getElementById("telError").innerHTML = "";

    } else {
        document.getElementById("telError").innerHTML = "Invalid tel";
        document.getElementById("telError").style.color = "red";
    }

    if (verifFirstName && verifLastName && verifEmail && verifPassword && (confirmPwd == password) &&  (tel.length == 8 ) && (isNaN(tel)==false) && (!emailExist)) {
        // Regroupement des valeurs 
        
        var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
    
        var user = {
        id : idUser,
        firstName : firstName,
        lastName : lastName,
        email: email,
        password : password,
        confirmPwd : confirmPwd,
        tel : tel,
        role :  "client"
    };

    // Récupération des anciennes valeurs dans LS
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]") ;
    // Ajout de l'objet user dans le tableau usersTab
    usersTab.push(user);
    // Sauvegarde du tableau usersTab (mis à jour)
    localStorage.setItem("users",JSON.stringify(usersTab));
    localStorage.setItem("idUser" , idUser + 1);
    location.reload();
    }
}

function verifLength(ch,nb) {
    return ch.length >= nb ;
}

function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
  }
function validateOnlyTextField(element) {
    var str = element.value;
    if(!(/^[a-zA-Z, ]+$/.test(str))){
        // console.log('String contain number characters');
        str = str.substr(0,  str.length -100);
        element.value = str;
    }
}
function userExist(email) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var exist = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            exist = true;
        }
    }

    return exist;
}
function insertAdmins() {
    
    var admin1 = {
        id : 1,
        firstName : "Houssem",
        lastName : "Kawana",
        email : "houssemkawana@gmail.com",
        password : "123admin",
        tel : "54585652",
        role : "admin"
    };

    var admin2 = {
        id : 2,
        firstName : "riadh",
        lastName : "kawana",
        email : "riadhkawana@gmail.com",
        password : "159753852RIA",
        tel : "58242362",
        role : "admin"
    };

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    users.push(admin1);
    users.push(admin2);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("adminsAdded",true);

}
function login() {
    // alert("test");
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password ) {
            findedUser = users[i]
        }        
    }

    console.log("findedUser", findedUser);

    if (findedUser) {
        localStorage.setItem("connectedUser",JSON.stringify(findedUser));


        // User exist in LS
            if (findedUser.role == "client") {
                location.replace('index.html');
            } 
            else {
                location.replace('index.html'); 
            }

    } else {
        // User not exist
        document.getElementById("error").innerHTML = "Please try again!";
        document.getElementById("error").style.color="red";
    }
}
function addProduct() {
    // Get value from input
    var productName = document.getElementById("productName").value;
    // verif if productname > 6
    var verifProductName = verifLength(productName, 6);


    // verif if product exists
    var verifIfPrExist = searchProduct(productName);
    if (verifIfPrExist) {
      document.getElementById("productNameExistError").innerHTML =
        "Product already exists";
      document.getElementById("productNameExistError").style.color = "red";
    } else {
      document.getElementById("productNameError").innerHTML = "";
    }





    if (verifProductName) {
      document.getElementById("productNameError").innerHTML = "";
    } else {
      document.getElementById("productNameError").innerHTML =
        "Product Name must have at least 6 characters";
      document.getElementById("productNameError").style.color = "red";
    }
    var price = document.getElementById("price").value;
    var verifPrice = price > 0;
    if (verifPrice) {
      document.getElementById("priceError").innerHTML = "";
    } else {
      document.getElementById("priceError").innerHTML =
        "Price must be greater then 0";
      document.getElementById("priceError").style.color = "red";
    }
    var stock = document.getElementById("stock").value;
    var verifStock = stock > 10;
    if (verifStock) {
      document.getElementById("stockError").innerHTML = "";
    } else {
      document.getElementById("stockError").innerHTML = "Invalid stock (>10)";
      document.getElementById("stockError").style.color = "red";
    }
    var category = document.getElementById("category").value;
    var verifCategory = category.length !== 0;
    if (verifCategory) {
      document.getElementById("categoryError").innerHTML = "";
    } else {
      document.getElementById("categoryError").innerHTML = "Invalid category";
      document.getElementById("categoryError").style.color = "red";
    }
    // emplacement avec fakepath
    var productImage = document.getElementById("image").value;
    // appel de la fonction replaceCh pour ajuster l'emplacement
    var image = replaceCh(productImage);

    if (
      verifProductName &&
      verifPrice &&
      verifStock &&
      verifCategory &&
      !verifIfPrExist
    ) {
      var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
      var product = {
        id: idProduct,
        productName: productName,
        price: price,
        stock: stock,
        category: category,
        image : image
      };
      var products = JSON.parse(localStorage.getItem("products") || "[]");
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("idProduct", idProduct + 1);
      location.reload();
    }
  }
  function searchProduct(productName) {
    var products = JSON.parse(localStorage.getItem("products") || "[]");

    for (let i = 0; i < products.length; i++) {
          if (products[i].productName == productName) {
              return true ;
          }          
    }

    return false;
}
function replaceCh(ch) {


    var newCh = ch.replace(/\\/g, "/");
    var res = newCh.replace("fakepath", "Users/Riadh Kawana/OneDrive/Bureau/projet1/startbootstrap-blog-home-gh-pages/img/produit");
    return res;
  
  }
  function displayUsers() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var usersTable = `
    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Tel</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>

                          </tr>
                        </thead>
                        <tbody>`;

    for (let i = 0; i < users.length; i++) {

        usersTable = usersTable  + `
        <tr>
                            <th scope="row">${users[i].id}</th>
                            <td>${users[i].firstName}</td>
                            <td>${users[i].lastName}</td>
                            <td>${users[i].email}</td>
                            <td>${users[i].tel}</td>
                            <td>${users[i].role}</td>
                            <td>
                                <button type="button" class="btn btn-success" onclick="editUser(${users[i].id})">Update</button>
                                <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'users')">Delete</button>

                            </td>

        </tr>
        `;


    }

    usersTable = usersTable + `
    </tbody>
    </table>`;


    document.getElementById("usersTable").innerHTML =  usersTable;
 }


function displayProduct() {

  var products=JSON.parse(localStorage.getItem("products")||"[]");
  var productsTable=`
  <table class="table">
  <thead>
      <tr>
          <th scope="col">Id</th>
          <th scope="col">product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">product Catogory</th>
          
        </tr>
  </thead>
  <tbody>`;

  for (let i = 0; i < products.length; i++) {
      productsTable=productsTable+`
       <tr>
                      <th scope="row">${products[i].id}</th>
                      <td>${products[i].productName}</td>
                      <td>${products[i].price}</td>
                      <td>${products[i].stock}</td>
                      <td>${products[i].category}</td>
                      
           <td>
               <button type="button" class="btn btn-success" onclick="editproduct(${products[i].id})">Update</button>
               <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'products')">Delete</button>


           </td>
     </tr>`
      
 
 
  }
  productsTable=productsTable+`</tbody>
  </table>`;

  document.getElementById("productsTable").innerHTML = productsTable;
}
function editproduct(id) {
  //  alert("test");
 var product  = searchById(id,"products");
 
     var editproduct=`
  <div class="col-md-12 form-group">

  <input type="text" class="form-control" id="stock" name="name" placeholder="Stock" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Stock'" value=${product.stock}>
  <span id="stockerror"></span>
  
  </div>
  <div class="col-md-12 form-group">

  <input type="text" class="form-control" id="price" name="name" placeholder="price" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Price'" value=${product.price}>
  <span id="priceerror"></span>
  </div>

  <div class="col-md-12 form-group">
  
  <button type="submit" value="submit" class="primary-btn" onclick="validateEditProduct(${product.id})">Validate</button>
  
</div> `;
document.getElementById("editproduct").innerHTML = editproduct;
}

function deleteObject(position,key) {
    var Tab = JSON.parse(localStorage.getItem(key) || "[]");

    Tab.splice(position,1);

    localStorage.setItem(key,JSON.stringify(Tab));

    location.reload();
}
function deleteUser(position) {
   
  alert("test");
 
 var users=JSON.parse(localStorage.getItem("users")|| "[]");

// At position 2, add 2 elements, remove 1: 
users.splice(position ,1);
alert("test2");

localStorage.setItem("users",JSON.stringify(users));

location.reload();
}

function editUser(id) {
  // alert("test");
  var user = searchById(id,"users");
  console.log(user);
  var edituser= `
  <div class="col-md-12 form-group">
  <input type="password" class="form-control" id="password" name="name" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${user.password}>
  <span id="passwordError"></span>
  </div>
  <div class="col-md-12 form-group">
  <input type="tel" class="form-control" id="tel" name="name" placeholder="Tel" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${user.tel}>
  <span id="telError"></span>

  </div>
  <div class="col-md-12 form-group">
  <button type="submit" value="submit" class="primary-btn" onclick="validateEditUser(${user.id})">Validate</button>
  </div>

  `;
  
  document.getElementById("edituser").innerHTML=edituser;

}

function searchById(id,key){

  var Tab = JSON.parse(localStorage.getItem(key) || "[]");

  for (let i = 0; i < Tab.length; i++) {
      if (Tab[i].id == id ) {
          return Tab[i];
      }        
  }
}

function validateEditUser(id) {
  // Recupération des nouvelles valeurs
  var newPassword = document.getElementById('password').value;
  var verifPassword = verifLength(newPassword,8);

  if (verifPassword) {
      document.getElementById("passwordError").innerHTML = "";

  } else {
      
      document.getElementById("passwordError").innerHTML = "Password must have at least 8 characters";
      document.getElementById('passwordError').style.color = "red";

  }
  var newTel = document.getElementById('tel').value;
  if ((newTel.length == 8 )&&(isNaN(newTel)==false)) {
      document.getElementById("telError").innerHTML = "";

  } else {
      document.getElementById("telError").innerHTML = "Invalid tel";
      document.getElementById("telError").style.color = "red";
  }

  if (verifPassword && (newTel.length == 8 )&&(isNaN(newTel)==false)) {
  // Récupération des utilisateurs dans LS
  var users = JSON.parse(localStorage.getItem("users") || '[]');
  // Parcours tab, recherche user à modifier et modifications du password et tel
  for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
          users[i].password = newPassword;
          users[i].tel = newTel;

      }
      
  }
  // Sauvegarde du mise à jour
  localStorage.setItem("users",JSON.stringify(users));
  // refresh de la page
  location.reload();

  }

 
}
function validateEditProduct(id) {
  //récupération des  nouvelle valeur 
      var newStock = document.getElementById('stock').value;
      
      
      if ((newStock != 0)&&(newStock != "")&&(newStock>10)) {
          document.getElementById("stockerror").innerHTML="";
          
      } else {
          document.getElementById("stockerror").innerHTML="the  stock  must   be   superior to 10 ";
      
          document.getElementById("stockerror").style.color="orange";
          
      }
      var newPrice=document.getElementById('price').value ;
      if ((newPrice!=0)&&(newPrice!="")&&(newPrice>0)) {
          document.getElementById("priceerror").innerHTML="";
          
      } else {
          document.getElementById("priceerror").innerHTML="the  price   must   be   superior to ZERO ";
  
          document.getElementById("priceerror").style.color="orange";
          
      }
      if(((newStock != 0)&&(newStock != "")&&(newStock>10))&&  ((newPrice!=0)&&(newPrice!="")&&(newPrice>0))){
  // recupération des  utilisateur dans LS
      var products=JSON.parse(localStorage.getItem("products")|| "[]");
      
  
      //parcours tab,   recherche  product a  modifier et modification   de   password et  tel
      for (let i = 0; i < products.length; i++) {
          if (products[i].id==id) {
              products[i].stock=newStock;
              products[i].price=newPrice; 
              
          }
          
          
      }
      
  
      //sauvgarde de  mise a  jour 
      localStorage.setItem("products",JSON.stringify(products));
  //refresh de  la  page
  
      location.reload();
      
  }   
  
  }
  //=========magazin
  function displayShopProducts() {
    var products=JSON.parse(localStorage.getItem('products')||"[]") ;
    // var img1= document.getElementById("image").value;

    var shopProducts=``;
    for (let i = 0; i < products.length; i++)     {
        shopProducts+=`
       <div class="col-lg-4 col-md-4">
                      <div class="single-product">
                     
                      <img class="img-fluid" src="${products[i].image}"  alt="">
                     
                          <div class="product-details">
                               <h6>${products[i].productName}</h6>
                          <div class="price">
                              <h6>${products[i].price}DT</h6>
                               <h6>${products[i].stock}pieces</h6>
                          </div>
                          <button class="primary-btn" style="margin-left: 60px;" onclick="goToReservation(${products[i].id})"><a href="detailsproduit.html">Reserve</a></button>
                   </div>
                   </div>
   </div>
   `;
  
       
   }
   document.getElementById("shopProducts").innerHTML=shopProducts;
  
  
  }
//   agenda ====================
var dt = new Date();
function renderDate() {
dt.setDate(1);
var day = dt.getDay();
var today = new Date();
var endDate = new Date(
dt.getFullYear(),
dt.getMonth() + 1,
0
).getDate();
var prevDate = new Date(
dt.getFullYear(),
dt.getMonth(),
0
).getDate();
var months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
]
document.getElementById("month").innerHTML =
months[dt.getMonth()];
document.getElementById("date_str").innerHTML =
dt.toDateString();
var cells = "";
for (x = day; x > 0; x--) {
cells += "<div class='prev_date'>" + (prevDate - x +
1) + "</div>";
}
console.log(day);
for (i = 1; i <= endDate; i++) {
if (i == today.getDate() && dt.getMonth() ==
today.getMonth()) cells += "<div class='today'>" + i + "</div>";
else
cells += "<div>" + i + "</div>";
}
document.getElementsByClassName("days")[0].innerHTML =
cells;
}
function moveDate(para) {
if(para == "prev") {
dt.setMonth(dt.getMonth() - 1);
} else if(para == 'next') {
dt.setMonth(dt.getMonth() + 1);
}
renderDate();
}

// ==============================
function dateRdvSlection() {
  var idReservation = JSON.parse(localStorage.getItem("idReservation") || "1");
    var dateRdv = document.getElementById("dateRdv").value;

  var choixS= document.getElementById("services").value;
  var vehicule= document.getElementById("vc").value;
  var discription= document.getElementById("discription").value;
  console.log(dateRdv,choixS,vehicule,discription);
  var reservation = {
    id:idReservation,
    dateRdv : dateRdv,
   choixS:choixS,
    vehicule: vehicule,
    discription : discription
};

// Récupération des anciennes valeurs dans LS
var reservTab = JSON.parse(localStorage.getItem("reservations") || "[]") ;
// Ajout de l'objet user dans le tableau usersTab
reservTab.push(reservation);
// Sauvegarde du tableau usersTab (mis à jour)
localStorage.setItem("reservations",JSON.stringify(reservTab));
localStorage.setItem("idReservation" , idReservation + 1);

location.reload();

  }
  function displayReservation() {
   
        var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
        var reservTab = `
        <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">Date de Rendez-vous</th>
                                <th scope="col">services demander</th>
                                <th scope="col">marque de   vehicule </th>
                                <th scope="col">discription</th>
                             
    
                              </tr>
                            </thead>
                            <tbody>`;
    
        for (let i = 0; i < reservations.length; i++) {
    
            reservTab = reservTab  + `
            <tr>
                                <th scope="row">${reservations[i].id}</th>
                                <th scope="row">${reservations[i].dateRdv}</th>
                                <td>${reservations[i].choixS}</td>
                                <td>${reservations[i].vehicule}</td>
                                <td>${reservations[i].discription}</td>
                                
                                <td>
                                    <button type="button" class="btn btn-success" onclick="editReservation(${reservations[i].id})">Update</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'reservations')">Delete</button>
    
                                </td>
    
            </tr>
            `;
    
    
        }
    
        reservTab = reservTab + `
        </tbody>
        </table>`;
    
    
        document.getElementById("reservTab").innerHTML =  reservTab;
     
     

  }
  function editReservation(id) {
    //  alert("test");
   var reservationn  = searchById(id,"reservations");
   
       var editReservation=`
    <div class="col-md-12 form-group">
  
    
    <input type="datetime-local" class="form-control" id="dateRdv" name="Rendez-Vous"  style="width: 600px; box-shadow: brown;"  value=${reservationn.dateRdv}><br>
   
    
    </div>
    <div class="col-md-12 form-group">
  
    
    <select name="" id="choixS" style="width: 600px; box-shadow: brown;" value=${reservationn.choixS}> 
    <option value=" Lavage interieur" > Lavage interieur</option>
    <option value="Lavage exterieur"> Lavage exterieur</option>
    <option value="Lavage complet"> Lavage complet  </option>
    <option value="Vidange"> Vidange  </option>
    <option value=" Lavage complet + Vidange"> Lavage complet + Vidange  </option>
    <option value="Dignostic moteur "> Dignostic moteur  </option>

    </select><br>
    </div>
  
    <div class="col-md-12 form-group">
    
    <button type="submit" value="submit" class="primary-btn" onclick="validateReservation(${reservationn.id})">Validate</button>
    
  </div> `;
  document.getElementById("editReservation").innerHTML = editReservation;

  }
  function validateReservation(idReservation) {
    // Récupération de la quantité à partir de l'input
  
    
    var  newDateRdv=document.getElementById("dateRdv").value;
    var newChoixS=document.getElementById("choixS").value;
      // recupération des  utilisateur dans LS
      var reservations=JSON.parse(localStorage.getItem("reservations")|| "[]");
      
  
      
      for (let i = 0; i < reservations.length; i++) {
          if (reservations[i].id==idReservation) {
            reservations[i].dateRdv=newDateRdv;
            reservations[i].choixS=newChoixS; 
              
          }
          
          
      }
      
   
      //sauvgarde de  mise a  jour 
      localStorage.setItem("reservations",JSON.stringify(reservations));
  //refresh de  la  page
  
      location.reload();
  }
  function validateAge() {
    var age=document.getElementById("age").value ;
    if ((age != 0)&&(age != "")&&(age<10)) {
      document.getElementById("age").innerHTML="";
      
  } else {
      document.getElementById("age").innerHTML="il faut que  l'age superieur a 0 et inferieur a  10 ";
  
      document.getElementById("age").style.color="orange";
      
  }
    
  }
  function simuler(resultat) {
   
    var tyMoteur1=document.getElementById("me").value;
    var tyMoteur2=document.getElementById("md").value ;
   
    var age=document.getElementById("age").value ;
  var distance=document.getElementById("dis").value;
   
  var derVidange=document.getElementById("deVid").value ;
  // var res=document.getElementById("res").value;
  var simulation = {
    distance:distance,
    derVidange: derVidange,
   age:age,
    // res: res,
    tyMoteur1 : tyMoteur1,
    tyMoteur2:tyMoteur2
};
localStorage.setItem("simulation ",JSON.stringify(simulation ));
  let dif=0;
  let di=10000
  // var  resultat=0;
if ((distance>derVidange)&&((age>=1)&&(age<=5))&&(me)) {
  dif=(parseFloat(distance)-parseFloat(derVidange));
  if (parseFloat(dif)<parseFloat(di)) {
let  resultat=parseFloat(dif)-parseFloat(di);
var res=`
<div class="col-md-12 form-group">
<input type="number" class="form-control" id="res" name="name" placeholder="resultat" onfocus="this.placeholder = ''" onblur="this.placeholder = 'resultat'">

</div>`;
document.getElementById("res").innerHTML=res;
alert(res);

  }

} else {
  alert("il faut que  le  distance siot superieur au  dernier  vidange");
  
}



  }
  // ====================== employer
  function addEpmloyer() {
    // Get value from input
    var firstName = document.getElementById("firstName").value;
    // verif if firstName > 3
    var verifFirstName = verifLength(firstName, 3);
 // Get value from input
 var lastName = document.getElementById("lastName").value;
 // verif if firstName > 5
 var verifLastName = verifLength(lastName, 5);

    // verif if emplyer exists
    var verifIffrExist = searchProduct(firstName);
    if (verifIffrExist) {
      document.getElementById("firstNameExistError").innerHTML =
        "le prénom et existant";
      document.getElementById("firstNameExistError").style.color = "red";
    } else {
      document.getElementById("firstNameError").innerHTML = "";
    }





    if (verifFirstName) {
      document.getElementById("firstNameError").innerHTML = "";
    } else {
      document.getElementById("firstNameError").innerHTML =
        "le  prénom doit etre supérieur à 3 character";
      document.getElementById("firstNameError").style.color = "red";
    }

    // ==============================
    var verifIflaExist = searchEmployer(firstName,lastName);
    if (verifIflaExist) {
      document.getElementById("lastNameExistError").innerHTML =
        "le nom et existant";
      document.getElementById("lastNameExistError").style.color = "red";
    } else {
      document.getElementById("lastNameError").innerHTML = "";
    }





    if (verifLastName) {
      document.getElementById("lastNameError").innerHTML = "";
    } else {
      document.getElementById("lastNameError").innerHTML =
        "le  nom doit etre supérieur à 5 character";
      document.getElementById("lastNameError").style.color = "red";
    }
    // ==================================
    var salaireJ = document.getElementById("salaireJ").value;
    var verifSalaireJ = salaireJ >= 15;
    if (verifSalaireJ ) {
      document.getElementById("salaireError").innerHTML = "";
    } else {
      document.getElementById("salaireError").innerHTML =
        "le sailaire doit etre  égale ou superieur  à 15";
      document.getElementById("salaireError").style.color = "red";
    }
    // emplacement avec fakepath
  
    // appel de la fonction replaceCh pour ajuster l'emplacement
    // var image = replaceCh(productImage);

    if (
      verifLastName &&
      verifFirstName &&
      verifSalaireJ &&
     
      !verifIffrExist&&
      !verifIflaExist
    ) {
      var idEmployer = JSON.parse(localStorage.getItem("idEmployer") || "1");
      var employer = {
        id: idEmployer,
        firstName: firstName,
        lastName:lastName ,
        
        salaireJ:salaireJ,
      };
      var employers = JSON.parse(localStorage.getItem("employers") || "[]");
      employers.push(employer);
      localStorage.setItem("employers", JSON.stringify(employers));
      localStorage.setItem("idEmployer", idEmployer + 1);
      location.reload();
    }
  }
  function searchEmployer(firstName,lastName) {
    var employers = JSON.parse(localStorage.getItem("employers") || "[]");

    for (let i = 0; i < employers.length; i++) {
          if ((employers[i].firstName == firsttName)&&(employers[i].lastName == lastName)) {
              return true ;
          }          
    }

    return false;
}
// function replaceCh(ch) {


//     var newCh = ch.replace(/\\/g, "/");
//     var res = newCh.replace("fakepath", "Users/Riadh Kawana/OneDrive/Bureau/projet1/startbootstrap-blog-home-gh-pages/img/produit");
//     return res;
  
//   }
function displayEmployer() {
   
  var employers = JSON.parse(localStorage.getItem("employers") || "[]");
  var employersTab = `
  <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">Nom</th>
                          <th scope="col">prenom</th>
                          <th scope="col">salaire journalier </th>
                          <th scope="col">salaire hebdomadaire</th>
                          <th scope="col">salaire mensuelle :</th>
                       

                        </tr>
                      </thead>
                      <tbody>`;

  for (let i = 0; i < employers.length; i++) {

    employersTab = employersTab  + `
      <tr>
                          <th scope="row">${employers[i].id}</th>
                          <th scope="row">${employers[i].lastName}</th>
                          <td>${employers[i].firstName}</td>
                          <td>${employers[i].salaireJ}</td>
                          <td>${employers[i].salaireJ*5}</td>
                          <td>${employers[i].salaireJ*20}</td>
                          
                          <td>
                              <button type="button" class="btn btn-success" onclick="editEmployer(${employers[i].id})">Update</button>
                              <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'employers')">Delete</button>

                          </td>

      </tr>
      `;


  }

  employersTab =  employersTab + `
  </tbody>
  </table>`;


  document.getElementById("employersTab").innerHTML =  employersTab;



}
function editEmployer(id) {
  //  alert("test");
 var employer  = searchById(id,"employers");
 
     var editEmployer=`
  <
  <div class="col-md-12 form-group">
  <input type="text" class="form-control" id="salaireJ" name="name" placeholder="salaire journalier"  value=${employer.salaireJ}><br>
</div>
<span id="salaireError"></span><br>

 

  <div class="col-md-12 form-group">
  
  <button type="submit" value="submit" class="primary-btn" onclick="validateEmployer(${employer.id})">Validate</button>
  
</div> `;
document.getElementById("editEmployer").innerHTML = editEmployer;
}

function validateEmployer(idEmployer) {
  var  newSalaireJ=document.getElementById("salaireJ").value;
  
    // recupération des  utilisateur dans LS
    var employers=JSON.parse(localStorage.getItem("employers")|| "[]");
    

    //parcours tab,   recherche  product a  modifier et modification   de   password et  tel
    for (let i = 0; i < employers.length; i++) {
        if (employers[i].id==idEmployer ){
          employers[i].salaireJ=newSalaireJ;
    
            
        }
        
        
    }
    

    //sauvgarde de  mise a  jour 
    localStorage.setItem("employers",JSON.stringify(employers));
//refresh de  la  page

    location.reload();
}
// =====================panier
function basket() {
  // Recupération des informations de l'utilisateur connecté
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  // Récupération de toutes les commandes de tous les utilisateurs
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  // Déclaration d'un tableau vide pour affecter les commandes de l'utlisateur connecté
  var myOrders = [];

  // Parcours du tableau des commandes et recherche des commandes de l'utlisateur connecté
  // Filtrage
  for (let i = 0; i < orders.length; i++) {
      if (orders[i].idUser == connectedUser.id) {
          myOrders.push(orders[i]);
      }
      
  }

  // Part 1
  var cart = `
  <table class="table">
  <thead>
      <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>

      </tr>
  </thead>
  <tbody>`;
  var subTotal = 0;
  for (let i = 0; i < myOrders.length; i++) {
      // Recherche du produit à travers son id pour pouvoir afficher son nom et son prix
      var product = searchById(myOrders[i].idProduct,"products");
      var total = Number(product.price) * Number(myOrders[i].qty);
      subTotal += total;
          // Part 2
   cart += `   <tr>
   <td>
       <div class="media">
           <div class="d-flex">
               <img src="img/cart.jpg" alt="">
           </div>
           <div class="media-body">
               <p>${product.productName}</p>
           </div>
       </div>
   </td>
   <td>
       <h5>${product.price} DT</h5>
   </td>
   <td>
       <h5>${myOrders[i].qty} pieces</h5>
   </td>
   <td>
       <h5>${total} DT</h5>
   </td>
   <td>
   <button type="button" class="btn btn-success" onclick="editOrder(${myOrders[i].id})">Edit</button>
   <button type="button" class="btn btn-danger" onclick="deleteOrder(${myOrders[i].id})">Delete</button>
   </td>
</tr>
`;
      
  }

    
  // part 3
  cart += `    <tr>
          <td>

          </td>
          <td>

          </td>
          <td>
              <h5>Subtotal</h5>
          </td>
          <td>
              <h5>${subTotal} DT</h5>
          </td>
      </tr>
     
      
  </tbody>
</table>`;

document.getElementById("cart").innerHTML = cart;
}

function editOrder(id) {
  var order = searchById(id,"orders");
  var editOrderForm= `
  <div class="col-md-12 form-group">
  <input type="number" class="form-control" id="qty" name="name" placeholder="Quantity" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Quantity'" value=${order.qty}>
  <span id="qtyError"></span>
  </div>
  
  <div class="col-md-12 form-group">
  <button type="submit" value="submit" class="primary-btn" onclick="validateEditOrder(${order.id})">Validate</button>
  </div>

  `;
  
  document.getElementById("editOrderForm").innerHTML = editOrderForm;
}

function validateEditOrder(id) {
  var newQty = document.getElementById("qty").value;
  console.log(newQty);
  var order = searchById(id,"orders");
  console.log(order);
  var diff = Number(newQty) - Number(order.qty);
  console.log(diff);
  var product = searchById(order.idProduct,"products");

  if (newQty<=0 || diff>product.stock  ) {
      document.getElementById("qtyError").innerHTML = "Invalid Qty";
      document.getElementById("qtyError").style.color = "red";
  }
  else{
      document.getElementById("qtyError").innerHTML = "";

      // Mise à jour de la quantité dans la commande
      var orders = JSON.parse(localStorage.getItem("orders") || "[]");
      for (let i = 0; i < orders.length; i++) {
          if (orders[i].id == id) {
              orders[i].qty = Number(newQty);
          }
          
      }
      localStorage.setItem("orders",JSON.stringify(orders));
      
      // Mise à jour du stock du produit
      var products = JSON.parse(localStorage.getItem("products") || "[]");
      for (let i = 0; i < products.length; i++) {
          if (products[i].id == order.idProduct ) {
              products[i].stock = Number(products[i].stock) - Number(diff);
          }
          
      }
      localStorage.setItem("products",JSON.stringify(products));
      location.reload();
  }
}

function deleteOrder(id) {
  var order = searchById(id,"orders");

  // Mise à ajour du stock
  var products = JSON.parse(localStorage.getItem("products") || '[]');

  for (let i = 0; i < products.length; i++) {
      if (products[i].id == order.idProduct) {
          // Mise à jour
          products[i].stock = Number(products[i].stock) + Number(order.qty);
      }
      
  }

  localStorage.setItem("products",JSON.stringify(products));

  // Suppression de la commande

  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var pos; 
  // Recherche de la position de la commande à supprimer
  for (let i = 0; i < orders.length; i++) {
     if (orders[i].id== order.id) {
         pos = i;
     }
      
  }

  deleteObject(pos,"orders");
  location.reload();
}
function goToReservation(id) {
  localStorage.setItem("idPrToReserve",id);
  location.replace('detaisproduit.html');
}

function displayProductDetails() {
  var idProduct = localStorage.getItem("idPrToReserve");
  var product = searchById(idProduct,"products");
  console.log(product);
  document.getElementById("productName").innerHTML = product.productName;
  document.getElementById("price").innerHTML = product.price + "DT";
  document.getElementById("category").innerHTML = product.category;
  document.getElementById("stock").innerHTML = product.stock + " pieces";
}
function validateEditOrder(id) {
  var newQty=document.getElementById("qty").value;
  var order = searchById(id,"ordres");
  var diff = Number(newQty)-Number(order.qty);
  var product=  searchById(order.idProduct,"products");

  if (newQty<=0||diff>product.stock) {
      document.getElementById("qtyerror").innerHTML="Invalid quantity" ;
      document.getElementById("qtyerror").style.color="red";

      
  }
  else{
      document.getElementById("qtyerror").innerHTML="";
      //mise a  jour de   quantité dans  la commande  
      var ordres=JSON.parse(localStorage.getItem("ordres")||"[]");
      for (let i = 0; i < ordres.length; i++) {
          if (ordres[i].id == id) {
              ordres[i].qty= Number(newQty); 
          }
          
      }

      localStorage.setItem("ordres",JSON.stringify(ordres));
      //mise a  jour de   stock de  produit   
      var  products = JSON.parse(localStorage.getItem("products")||"[]");
      for (let i = 0; i < products.length; i++) {
         if (products[i].id ==order.idPorduct) {
             products[i].Stock=Number(products[i].Stock)-Number(diff);

         }
          
      }
localStorage.setItem("products",JSON.stringify(products));
location.reload();
  }
  
}
