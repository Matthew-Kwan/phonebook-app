(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){},36:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(13),r=t.n(c),u=(t(18),t(2)),l=t(3),i=t.n(l),s="/api/persons",m=function(){return i.a.get(s).then((function(e){return e.data}))},f=function(e){return i.a.post(s,e).then((function(e){return e.data}))},d=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(s,"/").concat(e))},p=function(e){var n=e.message,t=e.type;return null===n?null:"success"===t?o.a.createElement("div",{className:"message"},n):o.a.createElement("div",{className:"error"},n)},b=function(e){var n=e.person,t=e.filter,a=e.deleteInfoOf,c=t.length;return n.name.slice(0,c)===t?o.a.createElement("div",{key:n.name},o.a.createElement("p",null,n.name," ",n.number," ",o.a.createElement("button",{onClick:a},"Delete"))):void 0},g=function(e){var n=e.filter,t=e.onChange;return o.a.createElement("div",null,o.a.createElement("input",{value:n,onChange:t}))},v=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),l=Object(u.a)(r,2),i=l[0],s=l[1],v=Object(a.useState)(""),E=Object(u.a)(v,2),w=E[0],O=E[1],y=Object(a.useState)(""),k=Object(u.a)(y,2),j=k[0],S=k[1],C=Object(a.useState)(null),T=Object(u.a)(C,2),D=T[0],I=T[1],N=Object(a.useState)("success"),x=Object(u.a)(N,2),B=x[0],J=x[1],P=function(){m().then((function(e){c(e)}))};Object(a.useEffect)(P,[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(p,{message:D,type:B}),o.a.createElement(g,{filter:j,onChange:function(e){S(e.target.value)}}),o.a.createElement("h3",null,"Add a new entry"),o.a.createElement("form",{onSubmit:function(e){console.log("addInfo called!"),e.preventDefault();var n={name:i,number:w};if(t.map((function(e){return e.name})).includes(n.name)){if(window.confirm("".concat(n.name," already exists in the phonebook. Updating their number to ").concat(n.number," if OK."))){var a=t.find((function(e){return e.name===n.name}));d(a.id,n).then((function(e){c(t.map((function(n){return n.name!==a.name?n:e}))),J("success"),I("The number for ".concat(n.name," was successfully updated!")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){J("error"),I("The person you are trying to update in the phonebook does not exist."),setTimeout((function(){I(null)}),5e3),console.log(e)}))}}else f(n).then((function(e){c(t.concat(e)),s(""),O(""),J("success"),I("".concat(n.name," was successfully added to the phonebook!")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){J("error"),I(e.response.data),setTimeout((function(){I(null)}),5e3),console.log(e.response.data)}))}},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:i,onChange:function(e){console.log(e.target.value),s(e.target.value)}})," ",o.a.createElement("br",null),"number: ",o.a.createElement("input",{value:w,onChange:function(e){console.log(e.target.value),O(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))),o.a.createElement("h2",null,"Numbers"),t.map((function(e,n){return o.a.createElement(b,{person:e,filter:j,key:n,deleteInfoOf:function(){return n=e.id,console.log(n),void(window.confirm("Do you want to delete this person from your phonebook?")&&h(n).then((function(e){P(),console.log("Person deleted")})).catch((function(e){console.log("Deletion failed: ".concat(e))})));var n}})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.8f5ba052.chunk.js.map