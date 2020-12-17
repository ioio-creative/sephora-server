(this["webpackJsonpsephora-shakeshakegame"]=this["webpackJsonpsephora-shakeshakegame"]||[]).push([[2,8],{20:function(e,t,a){"use strict";a.r(t);var c=a(64),n=a(3),o=a(0),r=a(1),s=a(92),i=a(94),l=a(36),d={serverUrl:"shakeshakesephora.herokuapp.com"},u=function(){var e=Object(o.useState)(!1),t=Object(c.a)(e,2),a=t[0],n=t[1],r=Object(o.useState)(0),s=Object(c.a)(r,2),i=s[0],l=s[1];Object(o.useEffect)((function(){return a&&window.addEventListener("devicemotion",h,!1),function(){window.removeEventListener("devicemotion",h,!1)}}),[a]);var d=[null,null,null],u=Object(o.useRef)(0),h=function(e){var t=0,a=0,c=0;e.acceleration?(t=e.acceleration.x,a=e.acceleration.y,c=e.acceleration.z):(t=e.accelerationIncludingGravity.x,a=e.accelerationIncludingGravity.y,c=e.accelerationIncludingGravity.z);var n=Date.now(),o=n-u.current,r=(Math.abs(t-d[0]),Math.abs(a-d[1]));Math.abs(c-d[2]);Math.sign(d[1])!==Math.sign(a)&&(u.current=n,d=[t,a,c]),r/o>.5&&l((function(e){return e+1}))};return[{moveCounter:i,permissionGranted:a},{requestPermission:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Please allow the Device Motion to start the game.\n\u8acb\u5141\u8a31\u4f7f\u7528\u88dd\u7f6e\u52a0\u901f\u8a08\u6b0a\u9650\u4ee5\u9032\u884c\u904a\u6232";"function"===typeof DeviceMotionEvent&&"function"===typeof DeviceMotionEvent.requestPermission?DeviceMotionEvent.requestPermission().then((function(t){"granted"==t?n(!0):alert(e)})).catch(alert):n(!0)},setPermissionGranted:n,setMoveCounter:l}]},h=a(43);a(35);s.a.registerPlugin(i.a);var j=["Day","Night"];t.default=function(){var e=Object(r.g)().playerId,t=u(),a=Object(c.a)(t,2),i=a[0],m=i.moveCounter,f=i.permissionGranted,b=a[1],v=b.requestPermission,x=b.setMoveCounter,p=Object(o.useState)(""),O=Object(c.a)(p,2),g=O[0],F=O[1],k=Object(o.useState)(""),y=Object(c.a)(k,2),A=y[0],w=y[1];console.log("playerId: ",e);var N=Object(o.useRef)(null),T=Object(o.useRef)(null),D=function(e){T.current&&T.current.emit("selectGame",{data:e})},E=function(){N.current&&N.current.clear(),N.current=s.a.timeline({repeat:-1,repeatDelay:3}),s.a.set("#mainCircle",{scale:1,autoAlpha:1,transformOrigin:"center"}),s.a.set(".svgCircle",{scaleX:2,scaleY:1,rx:0,transformOrigin:"center"}),s.a.set("#circle1",{autoAlpha:0,r:4}),s.a.set(".scene",{autoAlpha:0}),s.a.set(".scene.scene0",{autoAlpha:1}),s.a.set("#circle1",{r:4}),s.a.set("#circleBackground",{r:0,fill:"none"}),N.current.add(s.a.to(".scene0 .joinGameButton",{rotate:-5,duration:.1,ease:"elastic.out(1, 0.75)"})),N.current.add(s.a.to(".scene0 .joinGameButton",{rotate:0,duration:1,ease:"elastic.out(2, 0.2)"}))},M=function(){N.current&&N.current.clear(),N.current=s.a.timeline({repeat:-1,paused:!0});var e=Array.from(document.querySelectorAll(".svgCircle")).reverse(),t=s.a.timeline();t.add([s.a.to(e,{scaleX:1,scaleY:1,rx:100,autoRound:!1,duration:.5}),s.a.to(".scene.scene0",{autoAlpha:0})]),t.add([s.a.set("#circle1",{autoAlpha:0}),s.a.set(".scene.scene1",{autoAlpha:1})]),t.add((function(){N.current.play()})),N.current.add([s.a.timeline().staggerFromTo(e,.6,{scale:1,autoRound:!1},{scale:1.1,autoRound:!1,ease:"power1.out"},.3),s.a.timeline().staggerFromTo(e,.6,{scale:1.1,autoRound:!1},{scale:1,autoRound:!1,delay:.6,ease:"power1.in"},.3)])},P=function(){N.current&&N.current.clear();var e=s.a.timeline();e.add([s.a.set(".scene2 .option",{scale:0,color:"transparent"})]),e.add(s.a.to("#mainCircle",{scale:4,transformOrigin:"center",duration:.5})),e.add(s.a.to(".scene1",{autoAlpha:0})),e.add(s.a.to(".scene2",{autoAlpha:1})),e.add([s.a.to(".scene2 .option1",{scale:1}),s.a.to(".scene2 .option2",{scale:1})]),e.add([s.a.to(".scene2 .option1",{color:"#000000"}),s.a.to(".scene2 .option2",{color:"#FFFFFF"})])},R=function(){N.current&&N.current.clear(),N.current=s.a.timeline({repeat:-1,paused:!0});var e=s.a.timeline();s.a.set("#circle1",{r:4,autoAlpha:0}),s.a.set(".svgCircle",{autoAlpha:0}),s.a.set("#mainCircle",{scale:1}),e.add(s.a.to(".scene2",{autoAlpha:0})),e.add([s.a.to(".scene3",{autoAlpha:1})]);var t=Array.from(document.querySelectorAll(".svgCircle")).reverse();e.add((function(){N.current.play()})),e.add([s.a.timeline().staggerTo(t,.6,{autoAlpha:1},.3)]),N.current.add([s.a.timeline().staggerFromTo(t,.6,{scale:1,autoRound:!1},{scale:1.1,autoRound:!1,ease:"power1.out"},.3),s.a.timeline().staggerFromTo(t,.6,{scale:1.1,autoRound:!1},{scale:1,autoRound:!1,delay:.6,ease:"power1.in"},.3)])},S=function(){N.current&&N.current.clear();var e=s.a.timeline();s.a.set("#circle1",{r:4,autoAlpha:0}),s.a.set("#circle1",{r:"Day"===A?3.5:4.2,autoAlpha:0}),s.a.set(".scene4 .resultText",{autoAlpha:0}),s.a.to("#mainCircle",{scale:2}),e.add(s.a.to(".scene3",{autoAlpha:0})),e.add([s.a.fromTo(".scene4",{autoAlpha:0,color:"transparent"},{autoAlpha:1,color:"Day"===A?"#000000":"#FFFFFF"}),s.a.fromTo("#circleBackground",{r:0,fill:"Day"===A?"#FFFFFF":"#000000"},{autoRound:!1,r:2.5})]),e.add([s.a.to(".scene4 .resultText",{autoAlpha:1,delay:2.6})])},C=function(){N.current&&N.current.clear();var e=s.a.timeline();e.add(s.a.to(".scene4",{autoAlpha:0,duration:.5})),s.a.set(".scene5 .centerText",{text:{value:3},color:"Day"===A?"#000000":"#FFFFFF"}),e.add(s.a.to(".scene5",{autoAlpha:1,duration:.5})),e.add(s.a.fromTo(".scene5 .centerText",{text:{value:2},scale:0,autoAlpha:0},{scale:1,autoAlpha:1,duration:1})),e.add(s.a.fromTo(".scene5 .centerText",{text:{value:1},scale:0,autoAlpha:0},{scale:1,autoAlpha:1,duration:1}))},I=function(){var e=s.a.timeline();s.a.set(".scene6 .centerText",{color:"Day"===A?"#000000":"#FFFFFF"}),e.add(s.a.to(".scene5",{autoAlpha:0,duration:.4})),e.add(s.a.to(".scene6",{autoAlpha:1,duration:.4}))},B=function(){var e=s.a.timeline();e.add(s.a.to(".scene6",{autoAlpha:0,duration:.4})),e.add(s.a.to(".scene7",{autoAlpha:1,duration:.4})),s.a.set(".scene7 .centerText",{color:"Day"===A?"#000000":"#FFFFFF"})},G=function(){var e=s.a.timeline();s.a.set(".scene8 .centerText",{color:"Day"===A?"#000000":"#FFFFFF"}),e.add(s.a.to(".scene7",{autoAlpha:0,duration:.4})),e.add(s.a.to(".scene8",{autoAlpha:1,duration:.4}))},W=function(){var e=s.a.timeline();e.add([s.a.to("#mainCircle",{scale:4,autoAlpha:0}),s.a.to(".scene8",{autoAlpha:0,duration:.4})]),e.add(s.a.to(".scene9",{autoAlpha:1,duration:.4})),T.current&&T.current.disconnect()},q=function(){T.current&&T.current.emit("shake");var e=s.a.timeline();s.a.set(".shakeEffect g",{stroke:"Day"===A?"#000000":"#FFFFFF"}),e.add(s.a.to(".mobileIcon",{rotate:10,ease:l.a.easeOut,duration:.1})),e.add([s.a.to(".shakeEffect",{autoAlpha:1,duration:.25}),s.a.to(".mobileIcon",{rotate:-15,duration:.25})]),e.add([s.a.to(".shakeEffect",{autoAlpha:0,duration:.15}),s.a.to(".mobileIcon",{rotate:0,ease:l.a.easeOut,duration:.15})])};return Object(o.useEffect)((function(){E(),document.addEventListener("click",(function(e){}))}),[]),Object(o.useEffect)((function(){f&&(T.current=Object(h.a)({host:d.serverUrl,eventEmitters:[{emitter:"joinRoom",data:{playerId:e||"empty"},ack:function(e){console.log("joinRoomAck",e),"joined"!==e.data&&(F(e.data),function(){var e=s.a.timeline();e.add(s.a.to(".scene",{autoAlpha:0})),e.add(s.a.to(".sceneError",{autoAlpha:1})),T.current&&T.current.disconnect()}())}}],eventListeners:[{listener:"gameStage",callback:function(e){switch(console.log("gameStage",e),e.data){case 0:E();break;case 1:M();break;case 2:P();break;case 3:R();break;case 4:S();break;case 5:C();break;case 6:I();break;case 7:B();break;case 8:break;case 9:G();break;case 10:W()}}},{listener:"gameResult",callback:function(e){console.log("gameResult",e)}},{listener:"playersInfo",callback:function(e){console.log("playersInfo",e)}},{listener:"OnPlayerSelectMode",callback:function(e){console.log("OnPlayerSelectMode",e);var t=e.data;w(j[t])}},{listener:"gameSelected",callback:function(e){console.log("gameSelected",e)}}]}),M())}),[f]),Object(o.useEffect)((function(){q()}),[m]),Object(n.jsxs)("div",{id:"gameMain",children:[Object(n.jsx)("div",{className:"background",children:Object(n.jsx)("svg",{viewBox:"0 0 10 10",children:Object(n.jsxs)("g",{id:"mainCircle",children:[new Array(11).fill(0).map((function(e,t){return Object(n.jsx)("rect",{id:"circle".concat(t+2),className:"svgCircle",rx:"100",x:5-(27-2*t)/2,y:5-(27-2*t)/2,width:27-2*t,height:27-2*t,fill:t%2?"#000000":"#FFFFFF"},t)})),Object(n.jsx)("circle",{id:"circle1",cx:"5",cy:"5",r:"4",fill:"none",stroke:"#000000",strokeWidth:"1"}),Object(n.jsx)("circle",{id:"circleBackground",cx:"5",cy:"5",r:"0",fill:"none"})]})})}),Object(n.jsx)("div",{className:"reset",style:{position:"absolute",bottom:0,right:0,background:"#FFF",zIndex:99},onPointerDown:E,children:"reset"}),Object(n.jsx)("div",{className:"debug",style:{position:"absolute",top:0,left:0,background:"#FFF",zIndex:99},onPointerDown:function(){return x(0)},children:m}),Object(n.jsx)("div",{className:"scene scene0",children:Object(n.jsx)("div",{className:"joinGameButton",onClick:v,children:"Join Game"})}),Object(n.jsx)("div",{className:"scene scene1",onPointerDown:P,children:Object(n.jsx)("div",{className:"centerText",children:"Wait for other players ..."})}),Object(n.jsxs)("div",{className:"scene scene2",children:[Object(n.jsx)("div",{className:"centerText",children:"Which look would you like to do?"}),Object(n.jsx)("div",{className:"option option1",onPointerDown:function(){D(0),R()},children:"Day"}),Object(n.jsx)("div",{className:"option option2",onPointerDown:function(){D(1),R()},children:"Night"})]}),Object(n.jsx)("div",{className:"scene scene3",onPointerDown:S,children:Object(n.jsx)("div",{className:"centerText",children:"Loading..."})}),Object(n.jsx)("div",{className:"scene scene4",onPointerDown:C,children:Object(n.jsxs)("div",{className:"centerText",children:[Object(n.jsx)("div",{className:"resultTitle",children:"The look we are doing is..."}),Object(n.jsxs)("div",{className:"resultText",children:[A,"!"]})]})}),Object(n.jsx)("div",{className:"scene scene5",onPointerDown:I,children:Object(n.jsx)("div",{className:"centerText"})}),Object(n.jsx)("div",{className:"scene scene6",children:Object(n.jsxs)("div",{className:"centerText",children:[Object(n.jsx)("svg",{viewBox:"0 0 35 23",className:"shakeEffect shakeEffect1",children:Object(n.jsxs)("g",{stroke:"#FFF",fill:"none",strokeWidth:"3",children:[Object(n.jsx)("path",{d:"M153.28 463.88l1.277-.34c7.393-1.973 14.995 2.385 17.029 9.762h0",transform:"translate(-141 -459) rotate(-177 162.433 466.64)"}),Object(n.jsx)("path",{d:"M142.736 467.692l2.32-.619c13.321-3.55 27.013 4.3 30.68 17.589h0",transform:"translate(-141 -459) rotate(-177 159.236 472.662)"})]})}),Object(n.jsx)("svg",{viewBox:"0 0 35 23",className:"shakeEffect shakeEffect2",children:Object(n.jsxs)("g",{stroke:"#FFF",fill:"none",strokeWidth:"3",children:[Object(n.jsx)("path",{d:"M153.28 463.88l1.277-.34c7.393-1.973 14.995 2.385 17.029 9.762h0",transform:"translate(-141 -459) rotate(-177 162.433 466.64)"}),Object(n.jsx)("path",{d:"M142.736 467.692l2.32-.619c13.321-3.55 27.013 4.3 30.68 17.589h0",transform:"translate(-141 -459) rotate(-177 159.236 472.662)"})]})}),Object(n.jsxs)("svg",{className:"mobileIcon",viewBox:"0 0 90 157",onPointerDown:q,children:[Object(n.jsx)("rect",{width:"90",height:"157",fill:"#FFF",rx:"2",stroke:"#000"}),Object(n.jsx)("rect",{width:"81",height:"121",x:"5",y:"14",fill:"#000",rx:"2"}),Object(n.jsx)("circle",{cx:"45",cy:"146",r:"6.5",stroke:"#000"})]}),Object(n.jsx)("div",{onPointerDown:B,children:"Shake!"})]})}),Object(n.jsx)("div",{className:"scene scene7",onPointerDown:G,children:Object(n.jsx)("div",{className:"centerText",children:"Waiting..."})}),Object(n.jsx)("div",{className:"scene scene8",children:Object(n.jsxs)("div",{className:"centerText",children:[Object(n.jsx)("svg",{viewBox:"0 0 35 23",className:"shakeEffect shakeEffect1",children:Object(n.jsxs)("g",{stroke:"#FFF",fill:"none",strokeWidth:"3",children:[Object(n.jsx)("path",{d:"M153.28 463.88l1.277-.34c7.393-1.973 14.995 2.385 17.029 9.762h0",transform:"translate(-141 -459) rotate(-177 162.433 466.64)"}),Object(n.jsx)("path",{d:"M142.736 467.692l2.32-.619c13.321-3.55 27.013 4.3 30.68 17.589h0",transform:"translate(-141 -459) rotate(-177 159.236 472.662)"})]})}),Object(n.jsx)("svg",{viewBox:"0 0 35 23",className:"shakeEffect shakeEffect2",children:Object(n.jsxs)("g",{stroke:"#FFF",fill:"none",strokeWidth:"3",children:[Object(n.jsx)("path",{d:"M153.28 463.88l1.277-.34c7.393-1.973 14.995 2.385 17.029 9.762h0",transform:"translate(-141 -459) rotate(-177 162.433 466.64)"}),Object(n.jsx)("path",{d:"M142.736 467.692l2.32-.619c13.321-3.55 27.013 4.3 30.68 17.589h0",transform:"translate(-141 -459) rotate(-177 159.236 472.662)"})]})}),Object(n.jsxs)("svg",{className:"mobileIcon",viewBox:"0 0 90 157",onPointerDown:q,children:[Object(n.jsx)("rect",{width:"90",height:"157",fill:"#FFF",rx:"2",stroke:"#000"}),Object(n.jsx)("rect",{width:"81",height:"121",x:"5",y:"14",fill:"#000",rx:"2"}),Object(n.jsx)("circle",{cx:"45",cy:"146",r:"6.5",stroke:"#000"})]}),Object(n.jsx)("div",{onPointerDown:W,children:"Shake!"})]})}),Object(n.jsx)("div",{className:"scene scene9",children:Object(n.jsxs)("div",{className:"centerText",children:[Object(n.jsx)("img",{id:"logo",src:"./media/logo.svg",alt:"SEPHORA"}),Object(n.jsx)("div",{className:"coupon",children:Object(n.jsx)("img",{src:"./media/coupon.jpg",alt:"coupon"})}),Object(n.jsxs)("div",{className:"disclaimer",children:["Offer is valid once per member during Jan 6 - 31, 2021 at in Sephora Hong Kong K-11 Art Mall store. Offer is not valid with other discounts and promotion, gift cards, services, charitable items or any other exclusions mentioned in-store, on ",Object(n.jsx)("a",{href:"https://sephora.hk",target:"_blank",children:"sephora.hk"})," and/or and Sephora Hong Kong mobile app."]})]})}),Object(n.jsx)("div",{className:"scene sceneError",children:Object(n.jsx)("div",{className:"centerText",children:g})})]})}},35:function(e,t,a){},43:function(e,t,a){"use strict";var c=a(50),n=a.n(c);t.a=function(e){var t=e.host,a=e.eventListeners,c=e.eventEmitters,o=n()(t,{secure:!1});return o.on("connect",(function(){console.log("connected !"),c.forEach((function(e){var t="function"===typeof e.ack?e.ack:null;o.emit(e.emitter,e.data,t)}))})),a.forEach((function(e){o.on(e.listener,e.callback)})),o}},59:function(e,t){}}]);
//# sourceMappingURL=2.703b791c.chunk.js.map