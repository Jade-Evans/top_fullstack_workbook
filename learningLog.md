## RESOURCES
https://www.w3schools.com/html/html_table_borders.asp - For styling tables

## PROBLEM SOLVING:
# Issue: 1 - multiple HTML module files = duplication/not efficient/messy

Steps to overcome this issue: create one master module_template HTML, a modules.js file and put module objects inside. Link this to template html. 

- Create modules_template.html.


## FOOTER NOT FULL LENGTH OR FIXED AT DESIRED BOTTOM OF PAGE
https://www.w3schools.com/howto/howto_css_fixed_footer.asp
I used width 100% to stretch the footer along the whole length of the window, and bottom: 0, left: 0 to position correctly at the bottom of the page. 

## CREATE A RESPONSIVE LAYOUT WITH SIDEBAR
https://kinsta.com/blog/responsive-web-design/

## RESOURCES FOR CREATING UK DATE AND TIME
https://stackoverflow.com/questions/53862778/how-to-get-the-current-london-time-and-date-using-javascript

## CREATING A MODAL
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

## CREATING A RANDOM QUOTE GENERATOR WITH API
https://dev.to/codehuntersharath/building-a-random-quote-generator-with-api-using-html-css-and-javascript-2026

NOTES:
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
This can be replaced by inset:0 - with position: fixed; it tells the element to stretch to all four sides of the viewport (very useful for overlays).

## CREATING MODAL BUTTON (SIGNUP AND LOGIN) LOGIC

# STEP 1: CREATE THE modalController OBJECT:
- This object will be used to manage all modal button behaviour and state.
- it will store variable references to the overlay and reference each modal (signUp & login), as well as references to the close and submit buttons.
- it will handle methods for opening and closing. 

Object.values(modals) returns an array of the values inside the object, ignoring the keys.
magine your modals object is a drawer with labelled compartments:
modals = {
    login:  [login modal element],
    signup: [signup modal element]
}


Object.values(modals) is like pulling out all the compartments at once and putting them in a row:
[login modal element, signup modal element]


Now you can do something to each one in a simple loop.
## COPILOT NOTES FOR LEARNING HOW TO USE LOCALSTORAGE TO SAVE DATA INPUT ON PROGRESS TABLE (DASHBOARD):

# Think of your progress table as:
- The UI → what the user sees
- localStorage → the database
# Every time the user clicks Save:
- Read the values from that row
- Turn them into a JS object
- Push that object into an array
- Save the array to localStorage
# When the page loads:
- Read the array from localStorage
- Build table rows from it

- "modules" doesn’t exist at first — that’s correct
- The line gives you an empty array to start with
- You push the new module into it
- You save the whole array back under "modules"
- From then on, "modules" exists and loads normally




