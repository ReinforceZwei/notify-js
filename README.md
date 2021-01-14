# Notify-js

A simple HTML notification box that slides out from the side. Require jQuery, browser only.

![Screenshot](screenshot/screenshot1.JPG)

It also support multiple notification box at the same time.
![Screenshot](screenshot/screenshot2.JPG)


_This is an old project intended for learning JavaScript. No support will be provided. But PR is welcomed. Community Power <3_

# Basic usage
```js
let box = window.notify.showNotification("Your message", {/* options */}); // showNotification returns a jQuery object
notify.closeNotification(box); // Close it
```

Available options
```js
{
    color:"#ffffffcc", // Background color of the box
    fontColor:"#000000", // Font color of the box
    darkMode:false,
    slideOut:true, // If false, fade effect will be used
    animetionTime:400,
    dismissTime:4000, // If dismiss is true, how long should it wait before closing
    position:"top", // top or bottom
    dismiss:true, // Automaticlly close the notification
    closeOnClick:true, // Close the notification when user click on the box
    onclickFunc:undefined // Callback function when user click on the box
}
```