/*Generating html code for menu subcategory */
let names = [
    ["toggle-menu", "Close Menu"],
    ["add-category", "Add Category"],
    ["delete-category", "Delete Category"],
    ["sort-categories", "Sort Categories"],
    ["top-up-categories", "Top-up Category"],
    ["logout", "Logout"]
]

/*names.forEach(([id, label]) => {
    console.log(`\t\t\t<div id="menu-categories-${id}-row" class="menu-row">`);
    console.log(`\t\t\t\t<div id="menu-categories-${id}-label" class="menu-label">${label}</div>`);
    console.log(`\t\t\t\t<div id="menu-categories-${id}-icon" class="menu-icon"></div>`);
    console.log(`\t\t\t</div>`);
})*/

let css = '';
let top = 0;
names.forEach(([id, label]) => {
    css += `#menu-categories-${id}-row {\n\ttop: ${top}em;\n}\n`;
    top += 4;
});
console.log(css)