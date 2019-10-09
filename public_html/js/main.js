
$(function () {

    //customer names
    var $users = $('#list_users');
    var $uId = $('#nameId');
    var $fName = $('#firstName');
    var $lName = $('#lastName');

    var $iId = $('#inventoryId');
    var $iDesc = $('#inventoryDesc');
    var $iPrice = $('#inventoryPric');


    //customerbasket

    var $customerdata = "402881b06da20f0b016da22f82ec0001";
    var $customerbasketlist = $('#customerlist');

    var $customerfirstNames = $('#customerfirstName');
    var $customerlastNames = $('#customerlastName');
    var $customerStreets = $('#customerstreet');
    var $customerCities = $('#customercity');
    var $customerRegions = $('#customerregion');
    var $customerPostals = $('#customerpostal');
    var $customerCellContacts = $('#customercellcontact');
    var $customerWorkContacts = $('#customerworkcontact');
    var $customerHomeContacts = $('#customerhomecontact');
    var $customerEmails = $('#customeremail');

    var sum = 0;

    var $invNumbr = $('#invNum');


    //update address, contact and email details
    var $eAddressId = $('#editAddressId');
    var $eStreet = $('#editStreet');
    var $eCity = $('#editCity');
    var $eRegion = $('#editRegion');
    var $ePostalcode = $('#editPostalcode');
    var $eContactId = $('#editContactId');
    var $eCellContact = $('#editCellContact');
    var $eWorkContact = $('#editWorkContact');
    var $eHomeContact = $('#editHomeContact');
    var $eEmailId = $('#editEmailId');
    var $eEmailAddress = $('#editEmailAddress');

    $.ajax({
        url: 'http://localhost:8080/invoicesystem/registerdname/read/all',
        type: 'GET',
        crossDomain: true,

        success: function (name_data) {

            $.each(name_data, function (i, name) {
                $("#table_data").append("<tr><td>" + name.rnameId + "</td><td>" + name.rfirstName + "</td><td>" + name.rlastName + "</td></tr>");
                //$users.append('<li> ID: ' + name.nameId + ', First Name: ' + name.firstName + ', Surname: ' + name.lastName + '</li>');
            });
        },
        error: function () {
            alert('Error loading user names')
        }

    });

    $.ajax({
        url: 'http://localhost:8080/invoicesystem/customer/read/all',
        type: 'GET',
        crossDomain: true,

        success: function (history_data) {
//            console.log(history_data);
//            console.log(history_data[0].name.firstName)
            $.each(history_data, function (p, name) {
                $("#history_data").append("<tr><td>" + history_data[p].name.firstName + "</td><td>" + history_data[p].name.lastName + "</td><td>" + history_data[p].customerId + "</td></tr>");
                $("#contactEdit_data").append("<tr><td>" + history_data[p].customerId + "</td><td>" + history_data[p].name.firstName + "</td><td>" + history_data[p].name.lastName + "</td></tr>");
                //$users.append('<li> ID: ' + name.nameId + ', First Name: ' + name.firstName + ', Surname: ' + name.lastName + '</li>');
            });
        },
        error: function () {
            alert('Error loading user names')
        }

    })

    $.ajax({
        url: 'http://localhost:8080/invoicesystem/inventory/read/all',
        type: 'GET',
        crossDomain: true,

        success: function (product_data) {

            $.each(product_data, function (i, prodc) {
                $("#tInven").append("<tr><td>" + prodc.productDescription + "</td><td>" + prodc.productPrice + "</td></tr>");
                //$users.append('<li> ID: ' + name.nameId + ', First Name: ' + name.firstName + ', Surname: ' + name.lastName + '</li>');
            });
        },
        error: function () {
            alert('Error loading products')
        }

    });

    $.ajax({
        url: 'http://localhost:8080/invoicesystem/inventory/read/all',
        type: 'GET',
        crossDomain: true,

        success: function (inventory_data) {

            $.each(inventory_data, function (ei, prodc) {
                $("#editInven").append("<tr><td>" + prodc.inventoryId + "</td><td>" + prodc.productDescription + "</td><td>" + prodc.productPrice + "</td></tr>");
                //$users.append('<li> ID: ' + name.nameId + ', First Name: ' + name.firstName + ', Surname: ' + name.lastName + '</li>');
            });
        },
        error: function () {
            alert('Error loading products')
        }

    });


    $('#purchase-users').on('click', function () {

        var emptyAddCustomer1 = $.trim(document.forms["form1"]["nameBlank1"].value);
        var emptyAddCustomer2 = $.trim(document.forms["form1"]["nameBlank2"].value);
        var emptyAddCustomer0 = $.trim(document.forms["form1"]["nameBlank0"].value);


        if (emptyAddCustomer0 == "" || emptyAddCustomer1 == "" || emptyAddCustomer2 == "") {
            alert("please select customer and make sure fields are completed");
            return false;
        } else {


            var inputFName = document.getElementById("firstName");
            localStorage.setItem("firstName", inputFName.value);

            var inputLName = document.getElementById("lastName");
            localStorage.setItem("lastName", inputLName.value);
        }

    });

    $('#refreshB').on('click', function () {



        $.ajax({
            url: 'http://localhost:8080/invoicesystem/customer/read/' + $customerdata,
            type: 'GET',
            crossDomain: true,

            success: function (customerbasket_data) {
                console.log(customerbasket_data);
                console.log(customerbasket_data.name.firstName)

                $customerbasketlist.append('<li> First Name: ' + customerbasket_data.name.firstName + ', Surname: ' + customerbasket_data.name.lastName + '</li>');

            },
            error: function () {
                alert('Error loading user names')
            }

        });
    });




    $('#add-users').on('click', function () {

        var name = {
            rfirstName: $fName.val(),
            rlastName: $lName.val(),
        };

        var emptyAddCustomer1 = $.trim(document.forms["form1"]["nameBlank1"].value);
        var emptyAddCustomer2 = $.trim(document.forms["form1"]["nameBlank2"].value);

        if (emptyAddCustomer1 == "" || emptyAddCustomer2 == "") {
            alert("Status: 204 No Content - please complete all blank fields");
            return false;
        } else {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/invoicesystem/registerdname/create',
                type: 'POST',
                dataType: 'json',
                //crossDomain: true,
                data: JSON.stringify(name),
                success: function (newOrder) {
                    //$users.append('<li> ID: ' + newOrder.nameId + ', First Name: ' + newOrder.firstName + ', Surname: ' + newOrder.lastName + '</li>');
                    alert("Status: 200 OK - customer has been added");
                },
                error: function () {

                }
            });
        }

    });

    $('#add-invent').on('click', function () {
        console.log("add-inventory");
        var invenItem = {
            productDescription: $iDesc.val(),
            productPrice: $iPrice.val(),
        };
        
        
        var inBlankIn1 = $.trim(document.forms["form3"]["blankIn1"].value);
        var inBlankIn2 = $.trim(document.forms["form3"]["blankIn2"].value);


        if (inBlankIn1 == "" || inBlankIn2 == "") {
            alert("Status: 204 No Content - please make sure fields are completed");
            return false;
        } else {


        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:8080/invoicesystem/inventory/create',
            type: 'POST',
            dataType: 'json',
            //crossDomain: true,
            data: JSON.stringify(invenItem),
            success: function (newInvenItem) {
                //$users.append('<li> ID: ' + newOrder.nameId + ', First Name: ' + newOrder.firstName + ', Surname: ' + newOrder.lastName + '</li>');
                alert("Status:200 OK - updated");
            },
            error: function () {
                alert("Status: 400 Bad Request");
            }
        });
        }
    });


    $('#customer-purchase').on('click', function () {

        var name = {
            firstName: $customerfirstNames.val(),
            lastName: $customerlastNames.val(),
        };
        var address = {
            street: $customerStreets.val(),
            city: $customerCities.val(),
            region: $customerRegions.val(),
            postalCode: $customerPostals.val(),
        };
        var contact = {
            cellContact: $customerCellContacts.val(),
            workContact: $customerWorkContacts.val(),
            homeContact: $customerHomeContacts.val(),
        };
        var email = {
            emailAddress: $customerEmails.val(),
        };
        
        var emptyblank1 = $.trim(document.forms["form2"]["blank1"].value);
        var emptyblank2 = $.trim(document.forms["form2"]["blank2"].value);
        var emptyblank3 = $.trim(document.forms["form2"]["blank3"].value);
        var emptyblank4 = $.trim(document.forms["form2"]["blank4"].value);
        var emptyblank5 = $.trim(document.forms["form2"]["blank5"].value);
        var emptyblank6 = $.trim(document.forms["form2"]["blank6"].value);


        if (emptyblank1 == "" || emptyblank2 == "" || emptyblank3 == "" || emptyblank4 == "" || emptyblank5 == "" || emptyblank6 == "") {
            alert("Status: 204 No Content - please complete all blank fields");
            return false;
        } else {

        var products;
        products = storeTblValues()
        //TableData = $.toJSON(TableData);

        function storeTblValues()
        {
            var products = new Array();

            $('#tItems tr').each(function (row, tr) {
                products[row] = {
                    "productName": $(tr).find('td:eq(0)').text()
                    , "productQuantity": $(tr).find('td:eq(1)').text()
                    , "price": $(tr).find('td:eq(3)').text()
                }
            });
            products.shift();  // first row will be empty - so remove
            return products;
        }
        var customerSale = {
            products, name, address, contact, email
        };
        console.log("this is data" + JSON.stringify(customerSale));
//        alert(TableData);
//        console.log(JSON.stringify(TableData));

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:8080/invoicesystem/customer/create',
            type: 'POST',
            dataType: 'json',
            //crossDomain: true,
            data: JSON.stringify(customerSale),
            success: function (newOrder) {
                //$users.append('<li> ID: ' + newOrder.nameId + ', First Name: ' + newOrder.firstName + ', Surname: ' + newOrder.lastName + '</li>');
                alert("Status: 200 OK - purchase has been created");
            },
            error: function () {
                alert("Status: 400 Bad Request");
                
            }
        });
        }
    });

    $('#delete-users').on('click', function () {

        var name = {
            rnameId: $uId.val(),
            rfirstName: $fName.val(),
            rlastName: $lName.val(),
        };

        var emptyAddCustomer1 = $.trim(document.forms["form1"]["nameBlank1"].value);
        var emptyAddCustomer2 = $.trim(document.forms["form1"]["nameBlank2"].value);
        var emptyAddCustomer0 = $.trim(document.forms["form1"]["nameBlank0"].value);


        if (emptyAddCustomer0 == "" || emptyAddCustomer1 == "" || emptyAddCustomer2 == "") {
            alert("Status: 204 No Content - please select customer and make sure fields are completed");
            return false;
        } else {


            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/invoicesystem/registerdname/update',
                type: 'PUT',
                dataType: 'json',
                //crossDomain: true,
                data: JSON.stringify(name),
                success: function (newOrder) {
                    alert("Status:200 OK - customer updated");
                },
                error: function () {
                    alert("Status: 400 Bad Request");
                }
            });
        }

    });

    $('#delete-inventory').on('click', function () {

        var deleteId = $iId.val();
        console.log(deleteId);
        
        var inBlankIn0 = $.trim(document.forms["form3"]["blankIn0"].value);


        if (inBlankIn0 == "") {
            alert("Status: 204 No Content - please select Item");
            return false;
        } else {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:8080/invoicesystem/inventory/delete/' + deleteId,
            type: 'DELETE',
            //dataType: 'json',
            //crossDomain: true,
            //data: JSON.stringify(name),
            success: function () {
                alert("Status:200 OK - deleted");
            },
            error: function () {
                alert("Status: 400 Bad Request");
            }
        });
        
        }
        window.location.reload();
    });

    $('#delete-sales').on('click', function () {

        var delInvId = $invNumbr.text();
        console.log(delInvId);


        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:8080/invoicesystem/customer/delete/' + delInvId,
            type: 'DELETE',
            //dataType: 'json',
            //crossDomain: true,
            //data: JSON.stringify(name),
            success: function () {
                alert("Status:200 OK - updated");
            },
            error: function () {
                alert("Status: 204 No Content - please select customer");
            }
        });

    });



    $('#update-inventory').on('click', function () {
        
        
        var invenItem = {
            inventoryId: $iId.val(),
            productDescription: $iDesc.val(),
            productPrice: $iPrice.val(),
        };
        
        var inBlankIn0 = $.trim(document.forms["form3"]["blankIn0"].value);
        var inBlankIn1 = $.trim(document.forms["form3"]["blankIn1"].value);
        var inBlankIn2 = $.trim(document.forms["form3"]["blankIn2"].value);


        if (inBlankIn0 == "" || inBlankIn1 == "" || inBlankIn2 == "") {
            alert("Status: 204 No Content - please select Item and make sure fields are completed");
            return false;
        } else {


        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:8080/invoicesystem/inventory/update',
            type: 'PUT',
            dataType: 'json',
            //crossDomain: true,
            data: JSON.stringify(invenItem),
            success: function (newOrder) {
                alert("Status:200 OK - customer updated");
            },
            error: function () {
                alert("Status: 400 Bad Request");
            }
        });
        }
    });

    $(document).ready(function () {

        $('#historyTable tbody').on('click', 'tr', function () {
            $("#historyItems tbody tr").remove();
            var tableData = $(this).children("td").map(function () {
                return $(this).text();
            }).get();
            var td = tableData[0] + '*' + tableData[1] + '*' + tableData[2];


            var historyId = tableData[2];
            console.log(historyId);

            $.ajax({
                url: 'http://localhost:8080/invoicesystem/customer/read/' + historyId,
                type: 'GET',
                crossDomain: true,

                success: function (hist_data) {

                    console.log(hist_data.products);
                    var d = new Date();

                    document.getElementById("dateNow").innerHTML
                            = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
                    //console.log(customerbasket_data.name.firstName)
                    document.getElementById("invNum").innerHTML = historyId;
                    document.getElementById("firstNam").innerHTML = hist_data.name.firstName;
                    document.getElementById("lastNam").innerHTML = hist_data.name.lastName;
                    document.getElementById("streetAdd").innerHTML = hist_data.address.street;
                    document.getElementById("cityAdd").innerHTML = hist_data.address.city;
                    document.getElementById("regionAdd").innerHTML = hist_data.address.region;
                    document.getElementById("postalAdd").innerHTML = hist_data.address.postalCode;
                    document.getElementById("homeNum").innerHTML = hist_data.contact.homeContact;
                    document.getElementById("workNum").innerHTML = hist_data.contact.workContact;
                    document.getElementById("cellNum").innerHTML = hist_data.contact.cellContact;
                    document.getElementById("emailAdd").innerHTML = hist_data.email.emailAddress;
                    $.each(hist_data.products, function (h, histd) {
                        $("#historyItems").append("<tr><td>" + histd.productName + "</td><td>" + histd.productQuantity + "</td><td class =\"price\">" + histd.price + "</td></tr>");
                        //$users.append('<li> ID: ' + name.nameId + ', First Name: ' + name.firstName + ', Surname: ' + name.lastName + '</li>');

                        var sum = 0;

                        $(".price").each(function () {

                            var value = $(this).text();
                            // add only if the value is number
                            if (!isNaN(value) && value.length != 0) {
                                sum += parseFloat(value);
                                console.log("this is" + sum);
                                document.getElementById("subTotal").innerHTML = sum.toFixed(2);
                            }


                        });
                    });
                },
                error: function () {
                    alert('Error loading products')
                }

            });

            var sum = 0;

            $(".price").each(function () {

                var value = $(this).text();
                // add only if the value is number
                if (!isNaN(value) && value.length != 0) {
                    sum += parseFloat(value);
                    console.log("this is" + sum);
                }
                document.getElementById("subTotal").value = sum;

            });
        });

        $('#update_editDetails').on('click', function () {
            var eAddress = {
                addressId: $eAddressId.val(),
                street: $eStreet.val(),
                city: $eCity.val(),
                region: $eRegion.val(),
                postalCode: $ePostalcode.val(),
            };

            var eContact = {
                contactId: $eContactId.val(),
                cellContact: $eCellContact.val(),
                workContact: $eWorkContact.val(),
                homeContact: $eHomeContact.val(),
            };

            var eEmail = {
                emailId: $eEmailId.val(),
                emailAddress: $eEmailAddress.val(),
            };

            if ($('#addressCheck1').is(":checked") || $('#contactCheck1').is(":checked") || $('#emailCheck1').is(":checked")) {
                alert("Check box is Checked");
                if ($('#addressCheck1').is(":checked")) {
                    alert("Address Checkbox ticked");
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        url: 'http://localhost:8080/invoicesystem/address/update',
                        type: 'PUT',
                        dataType: 'json',
                        //crossDomain: true,
                        data: JSON.stringify(eAddress),
                        success: function () {
                            alert("Updated");
                        },
                        error: function () {
                            alert(JSON.stringify(eAddress));
                        }
                    });
                }
                if ($('#contactCheck1').is(":checked")) {
                    alert("Contact Checkbox ticked");
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        url: 'http://localhost:8080/invoicesystem/contact/update',
                        type: 'PUT',
                        dataType: 'json',
                        //crossDomain: true,
                        data: JSON.stringify(eContact),
                        success: function () {
                            alert("Updated");
                        },
                        error: function () {
                            alert(JSON.stringify(eContact));
                        }
                    });
                }
                if ($('#emailCheck1').is(":checked")) {
                    alert("Email Checkbox ticked");
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        url: 'http://localhost:8080/invoicesystem/email/update',
                        type: 'PUT',
                        dataType: 'json',
                        //crossDomain: true,
                        data: JSON.stringify(eEmail),
                        success: function () {
                            alert("Updated");
                        },
                        error: function () {
                            alert(JSON.stringify(eEmail));
                        }
                    });
                }
            } else {
                alert("Please Select to Details to Update");
            }
        });

        //this is new to the document if #history table does not work check out

        $('#contactEditTable tbody').on('click', 'tr', function () {
            var editData = $(this).children("td").map(function () {
                return $(this).text();
            }).get();
            var td = editData[0] + '*' + editData[1] + '*' + editData[2];


            var tableEditId = editData[0];
            console.log(tableEditId);

            $.ajax({
                url: 'http://localhost:8080/invoicesystem/customer/read/' + tableEditId,
                type: 'GET',
                crossDomain: true,

                success: function (edit_data) {

                    console.log(edit_data.address.street);

                    document.getElementById("editAddressId").value = edit_data.address.addressId;
                    document.getElementById("editStreet").value = edit_data.address.street;
                    document.getElementById("editCity").value = edit_data.address.city;
                    document.getElementById("editRegion").value = edit_data.address.region;
                    document.getElementById("editPostalcode").value = edit_data.address.postalCode;
                    document.getElementById("editContactId").value = edit_data.contact.contactId;
                    document.getElementById("editCellContact").value = edit_data.contact.cellContact;
                    document.getElementById("editWorkContact").value = edit_data.contact.workContact;
                    document.getElementById("editHomeContact").value = edit_data.contact.homeContact;
                    document.getElementById("editEmailId").value = edit_data.email.emailId;
                    document.getElementById("editEmailAddress").value = edit_data.email.emailAddress;
//                    $.each(hist_data.products, function (h, histd) {
//                        $("#historyItems").append("<tr><td>" + histd.productName + "</td><td>" + histd.productQuantity + "</td><td class =\"price\">" + histd.price + "</td></tr>");
//                        //$users.append('<li> ID: ' + name.nameId + ', First Name: ' + name.firstName + ', Surname: ' + name.lastName + '</li>');
//
//                        var sum = 0;
//
//                        $(".price").each(function () {
//
//                            var value = $(this).text();
//                            // add only if the value is number
//                            if (!isNaN(value) && value.length != 0) {
//                                sum += parseFloat(value);
//                                console.log("this is" + sum);
//                                document.getElementById("subTotal").innerHTML = sum.toFixed(2);
//                            }
//
//
//                        });
//                    });
                },
                error: function () {
                    alert('Error loading products')
                }

            });
        });
    });
});