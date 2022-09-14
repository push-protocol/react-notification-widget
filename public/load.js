var head = document.getElementsByTagName('head')[0];
var js = document.createElement("script");

js.type = "text/javascript";

if (window.origin.includes('localhost'))
{
  js.src = "dev/app.js";
}
else
{
  js.src = "demo/app.js";
}

head.appendChild(js);
