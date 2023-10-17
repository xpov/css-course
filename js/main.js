const gridContainer = document.querySelector(".grid-container");
const colorOptions = document.querySelectorAll(".color-option");
let isMouseDown = false;
let isBrash = true;
let isEraser = false;
let selectedColor = "#d37878";
const darkGray = "#888";
const lightGray = "#ccc";
const originalColors = [];
const brush = document.getElementById('brush')
const eraser = document.getElementById('eraser')
const reset = document.getElementById('reset')

const toggleButton = document.getElementById('toggleButton');
const sidebar = document.getElementsByClassName('side-nav')[0];


toggleButton.addEventListener('click', function(){
  sidebar.classList.toggle('hide');
});


document.addEventListener("DOMContentLoaded", function(){
    //! fillin the grid
    const rows = 32; 
    const cols = 32; 

    //* for each row of 32
    for (let i = 0; i < rows; i++) {
        //* for each column of 32
        for (let j = 0; j < cols; j++) {
            // creating an element div
            const gridItem = document.createElement("div");
            // assigning css class
            gridItem.classList.add("grid-item");
            // adding it to grid container in html flow
            gridContainer.appendChild(gridItem);
    
            // making it colors are chess like
            if ((Math.floor(j / 4) + Math.floor(i / 4)) % 2 == 0) {
                gridItem.style.backgroundColor = darkGray;
            } else {
                gridItem.style.backgroundColor = lightGray;
            }
            gridItem.style.opacity = 0.5; 

            // pushing data colors to array for furute use in refresh
            // to not calculate for color again
            originalColors.push(gridItem.style.backgroundColor);
        }
    }
    //! consts
    const gridItems = document.querySelectorAll(".grid-item");

    //! func to draw
    function draw(event){
        //* getting the current grid cell
        const target = event.target;
        //* checking if it is having "grid-item" class
        if (target.classList.contains("grid-item")) {
            // if so change background and opacity
            target.style.backgroundColor = selectedColor;
            target.style.opacity = 1;
        }
    }
    //! func to erase
    function erase(event){
        const target = event.target;

        gridItems.forEach((item, index) => {
            if(item == target && target.classList.contains("grid-item")){
                item.style.backgroundColor = originalColors[index];
                item.style.opacity = 0.5;
            }
        });
        
    }
  
    //! choosing color from color palette
    colorOptions.forEach((option) => {
        //* on click get the backgroundColor form the elevent that was clicked
        option.addEventListener("click", function () {
            // rewrite the value to selectedColor var.
            selectedColor = getComputedStyle(this).backgroundColor;
        });
    });
    
    //! event listeners for mouse, to check if it is pressed or not
    gridContainer.addEventListener("mousedown", function () {
      isMouseDown = true;
    });
  
    gridContainer.addEventListener("mouseup", function () {
      isMouseDown = false;
    });
    
    //! event listener for mouse, to check if it moves
    gridContainer.addEventListener("mousemove", function (event) {
      if (isMouseDown && isBrash) {
        draw(event)
      }
      else if(isMouseDown && isEraser){
        erase(event)
      }
    });

    //! same thing for but for click, but not need to check if mouse it pressed or not
    gridContainer.addEventListener("click", function (event) {
        if(isBrash){
            draw(event)
        }else{
            erase(event)
        }
    });

    //! buttons
    //* reset button
    reset.addEventListener("click", function () {
        gridItems.forEach((item, index) => {
            item.style.backgroundColor = originalColors[index];
            item.style.opacity = 0.5
        });
    });

    //* eraser button
    eraser.addEventListener("click", function(){
        isEraser = true;
        isBrash = false;
    })

    //* brash button
    brush.addEventListener("click", function(){
        isEraser = false;
        isBrash = true;
    })
    
      
  });
  