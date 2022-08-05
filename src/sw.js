importScripts('https://storage.googleapis.com/workbox-cdn/release/3.5.0/workbox-sw.js')

if(workbox){
    console.log('Yay!, Workbox is created')
    workbox.preaching.preachAndRoute([]);
}else{
    console.log('Nahh!, Workbox didnt load')
}