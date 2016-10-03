'use strict';

/* Lab 3: Airline route display. */

/**
 * App name space.
 *
 * The airlineRouteApp object encapsulates the variables and functions
 * into a namespace to prevent interference with global variables from
 * other libraries. In this case, it isn't strictly necessary, but a good
 * habit to get into.
 *
 * @type {object} airlineRouteApp
 */
var airlineRouteApp = airlineRouteApp || {};
var routes = document.getElementById('routes');
var cities = document.getElementById('cities');
/**
 * Indicates which cities have a direct flight between them.
 * A key has a direct flight to each of the cities in the array
 * associated with that key.
 *
 * @type {object} routes
 * @const
 */
airlineRouteApp.ROUTES = {
  'YYZ': ['YVR', 'YYC', 'YOW'],
  'YVR': ['YYZ', 'YYC'],
  'YXE': ['YYC'],
  'YYC': ['YXE','YVR', 'YYZ'],
  'YOW': ['YYZ']
};

/**
 * Detects presence of class in an element.
 * Return true if element has the class cls, false otherwise.
 *
 * @param {object} element
 * @param {string} cls
 * @return {boolean}
 */
airlineRouteApp.elementHasClass = function(element, cls) {
  return element.classList.contains(cls);
};

/**
 * Checks if there are any duplicates in the give element 
 * that have the same key value pair
 *
 * @param {object} element
 * @param {string} key
 * @param {string} value
 */
airlineRouteApp.checkDuplicate = function(element, key, value) {

  for (let i = 0; i < element.childNodes.length; i++) {
      if (airlineRouteApp.elementHasClass(element.childNodes[i], key) 
          && airlineRouteApp.elementHasClass(element.childNodes[i], value)) {
          return true;
      }
  }
  return false;
};

/**
 * Checks which route matches the city whose button is clicked on
 */
airlineRouteApp.checkRoutes = function() {

    for (let i = 0; i < routes.childNodes.length; i++) {
        if (airlineRouteApp.elementHasClass(routes.childNodes[i], this.id)) {
            routes.childNodes[i].style.color = "red";
        }else{
            routes.childNodes[i].style.color = "black";
        }       
    }
};

/**
 * Create a paragraph element for each route in the routes object.
 * The text of the element will be "SRC <=> DEST" where SRC is is one of
 * the keys in routes, and DEST is in the array of cities.
 * Because routes are bi-directional, they should not be duplicated in the
 * output. In other words only one of the following should appear on the
 * page: "YYZ <=> YVR" xor "YVR <=> YYZ".
 */
airlineRouteApp.buildRoutes = function() {

    for (let key in airlineRouteApp.ROUTES){
        for (let i = 0; i < airlineRouteApp.ROUTES[key].length; i++) {
            if (!airlineRouteApp.checkDuplicate(routes, key, airlineRouteApp.ROUTES[key][i])) {
                let routenode = document.createElement("p");
                let node = document.createTextNode(key + " <=> " + airlineRouteApp.ROUTES[key][i]);
                routenode.appendChild(node);
                routenode.setAttribute("class", key);
                routenode.className += " " + airlineRouteApp.ROUTES[key][i];
                routes.appendChild(routenode);
            }
        }
    }


};

/**
 * Create one button element for each city in `routes`.
 * When the button is clicked, it will change the colour to red for all of the
 * paragraph elements with the class "route" and with the class name of
 * the city that is the name of the button.
 *
 * For example, if the user clicks on "YOW", only the "YOW <=> YYZ" route
 * will be coloured red. All other routes will be black.
 */
airlineRouteApp.buildCities = function() {

    for (let key in airlineRouteApp.ROUTES){
      let buttonnode= document.createElement('input');
      buttonnode.setAttribute('type','button');
      buttonnode.setAttribute('name', key);
      buttonnode.setAttribute('value', key);
      buttonnode.id = key;
      // buttonnode.onclick = function() {airlineRouteApp.checkRoutes()};
      buttonnode.addEventListener("click", airlineRouteApp.checkRoutes);
      cities.appendChild(buttonnode);
    }
};

/**
 * Init function.
 */
airlineRouteApp.init = function() {
  this.buildRoutes();
  this.buildCities();
};

// Initializing.
airlineRouteApp.init();
