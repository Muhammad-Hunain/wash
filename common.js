    document.addEventListener("DOMContentLoaded", function () {
        // Retrieve selectedOptions from localStorage or initialize an empty array
        const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || [];

        // Log the selectedOptions if they exist
        if (selectedOptions.length > 0) {
            console.log("Selected Options:", selectedOptions);
        }

        // Find all elements with the class "add-option"
        const addButton = document.querySelectorAll(".add-option");

        // Add click event listeners to the "add-option" buttons
        addButton.forEach(function (button) {
            button.addEventListener("click", function () {
                // Extract category, name, and price attributes from the button
                const category = button.getAttribute("data-category");
                const name = button.getAttribute("data-name");
                const price = parseFloat(button.getAttribute("data-price"));

                // Check if the option is already in the array
                const isAlreadyAdded = selectedOptions.some(option => (
                    option.category === category && option.name === name
                ));

                if (isAlreadyAdded) {
                button.textContent = "Already Added";
                } else {
                    selectedOptions.push({
                        category: category,
                        name: name,
                        price: price
                    });

                    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
                    button.textContent = "Added";
                    button.style.backgroundColor = "#6503e7";
                    button.style.color = "#FFFFFF";
                    // Change background color
                    button.disabled = true;
                    console.log(`Selected Option: Category - ${category}, Name - ${name}, Price - €${price.toFixed(2)}`);
                    console.log("Selected Options:", selectedOptions);
                }
            });
        });

        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("remove")) {
                // Get the parent element of the "remove" button, which corresponds to the item
                
                
                // Remove the item from local storage
                localStorage.removeItem("selectedOptions");
                localStorage.removeItem("selectedChecklists");
        
                // Remove the item's element from the document
                itemElement.remove();
            }
        });
        

        const queryParams = new URLSearchParams(window.location.search);
        const washType = queryParams.get("type");

        console.log("Wash Type:", washType);

        const washTypePrices = {
            "small-car": 4.95,
            "medium-car": 5.95,
            "big-car": 6.95
        };

        const washTypePriceElements = document.querySelectorAll("#wash-type-price");

        if (washType && washTypePrices[washType]) {
            const priceText = `€ ${washTypePrices[washType].toFixed(2)}`;
            washTypePriceElements.forEach(function (element) {
                element.textContent = priceText;
            });

            console.log("Wash Type Price:", washTypePrices[washType]);
            console.log("Wash Type:", washType);
            localStorage.setItem('washType', washType);
            
        }
        
    if (washType === "small-car") {
      document.getElementById("mainheading").textContent = "PEQUEÑO";
      
    }
    else if (washType === "medium-car") {
      document.getElementById("mainheading").textContent = "MEDIANO";
     
      
    }
   else if (washType === "big-car") {
      document.getElementById("mainheading").textContent = "GRANDE";
      
    }

        const selectedChecklists = JSON.parse(localStorage.getItem('selectedChecklists')) || {
            interior: [],
            exterior: [],
            washType: washType
            
        };
        const addButtons = document.querySelectorAll(".wash-type-add-button");

        addButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const category = button.parentElement.querySelector(".wash-type-heading").textContent.toLowerCase();
                const checkboxes = button.parentElement.querySelectorAll(".wash-type-checkbox");
              console.log(checkboxes)
              checkboxes.checked = true;
              console.log(checkboxes)
                checkboxes.forEach(function (checkbox) {
                  
                        const label = checkbox.parentElement.textContent;
                        const isAlreadyAdded = selectedChecklists[category].includes(label);

                        if (!isAlreadyAdded) {
                            selectedChecklists[category].push(label);
                            
                            checkbox.style.backgroundColor = "#6503e7";
                            checkbox.style.clipPath = "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)";
                            checkbox.style.border = 'solid 1px purple'
                            button.textContent = "Added";
                            button.style.backgroundColor = "#682ce8";
                            button.style.color = "#FFFFFF";
                        } else {
                            // alert(`"${label}" is already added.`);
                            checkbox.style.backgroundColor = "red";
                            // checkbox.style.clipPath = "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)";
                            checkbox.style.border = 'solid 1px red'
                            button.textContent= " Already Added"
                            button.style.backgroundColor = "#FF0000";
                            button.style.color = "#FFFFFF";

                                            }
                    
                });

                localStorage.setItem('selectedChecklists', JSON.stringify(selectedChecklists));
            
                    // Change background color
                    button.disabled = true;
                console.log(`Selected Checklists - ${category}:`, selectedChecklists[category]);
                console.log("Selected Checklists:", selectedChecklists);
            });
        });

        function groupOptionsByCategory(options) {
            const groupedOptions = {};
            options.forEach(option => {
                if (!groupedOptions[option.category]) {
                    groupedOptions[option.category] = [];
                }
                groupedOptions[option.category].push(option);
            });
            return groupedOptions;
        }

        function calculateCategoryPrice(selectedChecklist) {
            let categoryPrice = 0;
            selectedChecklist.forEach(option => {
                categoryPrice += option.price;
            });
            return categoryPrice;
        }

        
    
            // This code will run when the button is clicked

            // Your existing code for calculateTotalPrice function
            function calculateTotalPrice() {
                // Your updated code here
                let interiorPrice = 0.0;
                let exteriorPrice = 0.0;
                const selectedOptionsPrice = calculateCategoryPrice(selectedOptions);

                console.log("Wash Types:", selectedChecklists.washType);
                console.log("Interior:", selectedChecklists);

                if (selectedChecklists.washType === "small-car") {
                    interiorPrice = selectedChecklists.interior.length > 0 ? interiorPrice + 4.95 : 0;
                   
                    exteriorPrice = selectedChecklists.exterior.length > 0 ? exteriorPrice + 4.95 : 0;
                } else if (selectedChecklists.washType === "medium-car") {
                    interiorPrice = selectedChecklists.interior.length > 0 ? interiorPrice + 5.95 : 0;
                    exteriorPrice = selectedChecklists.exterior.length > 0 ? exteriorPrice + 5.95 : 0;
                } else if (selectedChecklists.washType === "big-car") {
                    interiorPrice = selectedChecklists.interior.length > 0 ? interiorPrice + 6.95 : 0;
                    exteriorPrice = selectedChecklists.exterior.length > 0 ? exteriorPrice + 6.95 : 0;
                }

                const totalPrice = selectedOptionsPrice + interiorPrice + exteriorPrice;
                const service = totalPrice * 0.10;
                const lastprice = totalPrice + service;
              
                 console.log(selectedChecklists.interior.length)
               if(selectedChecklists.interior.length != 0){
                document.getElementById("summary-price").textContent = `€ ${interiorPrice.toFixed(2)}`;
               }else{
                document.getElementById("interior").textContent = "";
               }

                if(selectedChecklists.exterior.length != 0){
                document.getElementById("exteriorsummary-price").textContent = `€ ${exteriorPrice.toFixed(2)}`;
                }else{
                    document.getElementById("exterior").textContent = "";
                }
                document.getElementById("service-price").textContent = `€ ${service.toFixed(2)}`;
                document.getElementById("total-price").textContent = `€ ${lastprice.toFixed(2)}`;
            }

            // Call the calculateTotalPrice function
            console.log("hello");
            calculateTotalPrice();
            if (selectedOptions.length > 0) {
                console.log("Selected Options:", selectedOptions);
                const selectedOptionsDisplay = document.querySelector("#extra-proce");
                selectedOptionsDisplay.innerHTML = '';
            
                const groupedOptions = groupOptionsByCategory(selectedOptions);
                
                Object.keys(groupedOptions).forEach(category => {
                    
                    groupedOptions[category].forEach(option => {
                       
                        

                        const labelElement = document.createElement("div");
                        labelElement.className = "summary-label";
                        labelElement.textContent = option.name;
            
                        const priceElement = document.createElement("div");
                        priceElement.className = "summary-price";
                        priceElement.textContent = `€ ${option.price.toFixed(2)}`;
            
                        // Create a row div to contain the label and price
                        const optionRow = document.createElement("div");
                        optionRow.className = "summary-row";
            
                        // Append the label and price to the row
                        optionRow.appendChild(labelElement);
                        optionRow.appendChild(priceElement);
            
                        // Append the row to the selectedOptionsDisplay
                        selectedOptionsDisplay.appendChild(optionRow);
                        selectedOptionsDisplay.style.display ="flex";
                        selectedOptionsDisplay.style.flexDirection ="column";
                    });
                });
            }
            
        
        });


        

