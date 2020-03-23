(this["webpackJsonpmbqc-simulator"]=this["webpackJsonpmbqc-simulator"]||[]).push([[0],{20:function(e,t,a){e.exports=a(29)},25:function(e,t,a){},26:function(e,t,a){},29:function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),n=a(15),l=a.n(n),o=(a(25),a(5)),c=a(4),s=a(3),h=a(9),d=a(6),u=a(10),p=(a(26),a(19)),v=a(11),f=a(28),m=function(){function e(t){Object(c.a)(this,e);var a=f.matrix(t).size();if(a[0]!=a[1])throw new Error("Mishapen Adjacency Matrix :: The given matrix is "+a[0]+"x"+a[1]+", but it should be square (e.g. "+a[0]+"x"+a[0]+")");this.numVerticies=a[0];for(var r=0;r<this.numVerticies;r++)for(var i=r;i<this.numVerticies;i++)if(t[r][i]!=t[i][r])throw new Error("Non-symmetric Adjacency Matrix :: The given value at "+r+","+i+" should be equal to the value at "+i+","+r);this.adjacencyMatrix=f.matrix(t);var n=f.matrix([[1/f.sqrt(2)],[1/f.sqrt(2)]]);this.state=n;for(var l=0;l<this.numVerticies-1;l++)this.state=f.kron(this.state,n);var o=!0,s=!1,h=void 0;try{for(var d,u=this.edges()[Symbol.iterator]();!(o=(d=u.next()).done);o=!0){var p=d.value;console.log("performing cZ on ("+p[0]+","+p[1]+")"),this.cZ(p[0],p[1])}}catch(v){s=!0,h=v}finally{try{o||null==u.return||u.return()}finally{if(s)throw h}}console.log(":: Blank Graph Construction Complete ::"),console.log()}return Object(s.a)(e,[{key:"neighbors",value:function(e){for(var t=[],a=0;a<this.numVerticies;a++)1===this.adjacencyMatrix.valueOf()[e][a]&&(t=t.concat(a));return t}},{key:"edges",value:function(){for(var e=[],t=0;t<this.numVerticies;t++)for(var a=t;a<this.numVerticies;a++)1===f.subset(this.adjacencyMatrix,f.index(t,a))&&(e=e.concat([[t,a]]));return e}},{key:"oneQubitUnitary",value:function(e,t){for(var a=0===t?e:[[1,0],[0,1]],r=1;r<this.numVerticies;r++)a=r===t?f.kron(a,e):f.kron(a,[[1,0],[0,1]]);this.state=f.multiply(a,this.state)}},{key:"cZ",value:function(e,t){for(var a=f.matrix([[1,0],[0,1]]),r=f.matrix([[1,0],[0,0]]),i=f.matrix([[0,0],[0,1]]),n=f.matrix([[1,0],[0,-1]]),l=0==e?r:a,o=1;o<this.numVerticies;o++)l=e===o?f.kron(l,r):f.kron(l,a);for(var c=0===e?i:a,s=1;s<this.numVerticies;s++)c=e===s?f.kron(c,i):t===s?f.kron(c,n):f.kron(c,a);var h=f.add(l,c);this.state=f.multiply(h,this.state),console.log("completed cZ on edge ("+e+","+t+")")}},{key:"measureZ",value:function(e){var t=this.adjacencyMatrix.valueOf(),a=!0,r=!1,i=void 0;try{for(var n,l=this.neighbors(e)[Symbol.iterator]();!(a=(n=l.next()).done);a=!0){var o=n.value;t[e][o]=0,t[o][e]=0}}catch(c){r=!0,i=c}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}this.adjacencyMatrix=f.matrix(t)}},{key:"measureY",value:function(e){var t=this.adjacencyMatrix.valueOf();var a=!0,r=!1,i=void 0;try{for(var n,l=function(e,t){var a=[],r=!0,i=!1,n=void 0;try{for(var l,o=e[Symbol.iterator]();!(r=(l=o.next()).done);r=!0){var c=l.value,s=!0,h=!1,d=void 0;try{for(var u,p=t[Symbol.iterator]();!(s=(u=p.next()).done);s=!0){var v=u.value;c!=v&&(a=a.concat([[c,v]]))}}catch(f){h=!0,d=f}finally{try{s||null==p.return||p.return()}finally{if(h)throw d}}}}catch(f){i=!0,n=f}finally{try{r||null==o.return||o.return()}finally{if(i)throw n}}return a}(this.neighbors(e),this.neighbors(e))[Symbol.iterator]();!(a=(n=l.next()).done);a=!0){var o=n.value;t[o[0]][o[1]]=0}}catch(c){r=!0,i=c}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}this.adjacencyMatrix=f.matrix(t)}},{key:"measureX",value:function(e,t){var a=this;function r(e,t){var a=[],r=!0,i=!1,n=void 0;try{for(var l,o=e[Symbol.iterator]();!(r=(l=o.next()).done);r=!0){var c=l.value,s=!0,h=!1,d=void 0;try{for(var u,p=t[Symbol.iterator]();!(s=(u=p.next()).done);s=!0){var v=u.value;c!=v&&(a=a.concat([[c,v]]))}}catch(f){h=!0,d=f}finally{try{s||null==p.return||p.return()}finally{if(h)throw d}}}}catch(f){i=!0,n=f}finally{try{r||null==o.return||o.return()}finally{if(i)throw n}}return a}function i(e,t){var a=!0,r=!1,i=void 0;try{for(var n,l=e[Symbol.iterator]();!(a=(n=l.next()).done);a=!0){var o=n.value;if(o.length===t.length)for(var c=0;c<o.length&&o[c]==t[c];c++)if(c==o.length-1&&o[c]==t[c])return!0}}catch(s){r=!0,i=s}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}return!1}var n=function(e,t){return e.filter((function(e){return!i(t,e)})).concat(t.filter((function(t){return!i(e,t)})))};for(var l=this.neighbors(e).filter((function(e){return a.neighbors(t).includes(e)})),o=Object(v.a)(new Set([].concat(Object(v.a)(this.neighbors(e)),Object(v.a)(this.neighbors(t))))),c=n(n(n(function(e){for(var t=[],a=0;a<e.length;a++)t=(t=t.concat([e[a]])).concat([[e[a][1],e[a][0]]]);return t}(this.edges()),r(o,o)),r(l,l)),r(this.neighbors(e),this.neighbors(e))),s=this.adjacencyMatrix.valueOf(),h=0;h<s.length;h++)for(var d=0;d<=h;d++)i(c,[h,d])?(s[h][d]=1,s[d][h]=1):(s[h][d]=0,s[d][h]=0);this.adjacencyMatrix=f.matrix(s)}},{key:"newParticle",value:function(){for(var e=this.adjacencyMatrix.valueOf(),t=0;t<e.length;t++)e[t]=e[t].concat(0);e=e.concat([[0]]);for(var a=0;a<e.length-1;a++)e[e.length-1]=e[e.length-1].concat(0);this.adjacencyMatrix=f.matrix(e),this.numVerticies+=1}},{key:"newEdge",value:function(e,t){var a=this.adjacencyMatrix.valueOf();1!==a[e][t]&&1!==a[t][e]||console.warn("There already exists an edge there! ("+e+","+t+") is already in the list of edges"),a[e][t]=1,a[t][e]=1,this.adjacencyMatrix=f.matrix(a)}},{key:"getAdjacencyMatrix",value:function(){return this.adjacencyMatrix.valueOf()}}]),Object(s.a)(e,[{key:"getState",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"bin",t="",a=0;a<f.pow(2,this.numVerticies);a++){if("bin"==e)var r=a.toString(2).padStart(this.numVerticies,"0");else r=a;t=t.concat("|"+r+">\t"+this.state.subset(f.index(a,0))+"\n")}return t}}]),e}(),y=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("td",{id:this.props.isSelected?"selectedTool":"unselectedTool",className:"toolbarCell",onClick:function(t){e.props.handleClick(t)}},i.a.createElement("img",{src:"/mbqc-simulator"+"/icons/icons_".concat(this.props.id,".png"),id:this.props.id,alt:"",className:"buttonImage"}))}}]),t}(i.a.Component),g=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.selectedTool,t=this.props.clickHandler;return i.a.createElement("div",{className:"toolbar"},i.a.createElement("table",{className:"toolbarTable"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement(y,{id:"settings",handleClick:this.clickHandler}),i.a.createElement("td",{colSpan:"6"}," ",i.a.createElement("p",{className:"titleText"}," Cluster State Simulator ")," ")),i.a.createElement("tr",null,i.a.createElement(y,{id:"newParticle",isSelected:"newParticle"==e,handleClick:t}),i.a.createElement(y,{id:"newEdge",isSelected:"newEdge"==e,handleClick:t}),i.a.createElement(y,{id:"moveParticles",isSelected:"moveParticles"==e,handleClick:t}),i.a.createElement(y,{id:"unitary",isSelected:"unitary"==e,handleClick:t}),i.a.createElement(y,{id:"mx",isSelected:"mx"==e,handleClick:t}),i.a.createElement(y,{id:"my",isSelected:"my"==e,handleClick:t}),i.a.createElement(y,{id:"mz",isSelected:"mz"==e,handleClick:t})))))}}]),t}(i.a.Component),b=function(e){function t(e){var a;Object(c.a)(this,t);var r=(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).props.info;return r.onUpdate({x:0,y:0},r.number),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props.info;return i.a.createElement(p.a.div,{onUpdate:function(e,a){return t.onUpdate(e,t.number)},animate:{x:t.initialX,y:t.initialY},style:{backgroundColor:"blue",borderRadius:"50%",width:"10vh",height:"10vh",position:"fixed",top:"0vh",left:"0vw",border:"1vh solid #000",zIndex:"10000"},drag:t.draggable,dragConstraints:t.particleBox,onClick:function(a,r){return e.props.clickHandler(a,t.number)}},i.a.createElement("p",{id:"particleText",style:{textAlign:"center",verticalAlign:"middle",lineHeight:"50%",color:"white",fontSize:"4vh",pointerEvents:"none"}},t.number))}}]),t}(i.a.Component),x=function(e){function t(){return Object(c.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.firstVertex,t=this.props.secondVertex;return i.a.createElement("line",{x1:"calc("+e.x+"px + 6vh)",y1:"calc("+e.y+"px + 6vh)",x2:"calc("+t.x+"px + 6vh)",y2:"calc("+t.y+"px + 6vh)"})}}]),t}(i.a.Component),k=function(e){function t(e){var a;Object(c.a)(this,t),a=Object(h.a)(this,Object(d.a)(t).call(this,e));var r=new m(a.props.adjacencyMatrix);return a.state={positionTable:{},graph:r,edges:r.edges(),mxhelper:[void 0,!1],edgehelper:[void 0,!1],extraParticles:[]},a.particleClickHandler=a.particleClickHandler.bind(Object(o.a)(a)),a.onUpdate=a.onUpdate.bind(Object(o.a)(a)),a.newParticleCreator=a.newParticleCreator.bind(Object(o.a)(a)),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"onUpdate",value:function(e,t){var a=this.state.positionTable,r="undefined"!==typeof e.x?e.x:a[t].x,i="undefined"!==typeof e.y?e.y:a[t].y;a[t]={x:r,y:i},this.setState({positionTable:a})}},{key:"particleClickHandler",value:function(e,t){if("mx"!==this.props.selectedTool&&this.setState({mxhelper:[void 0,!1]}),"newEdge"!==this.props.selectedTool&&this.setState({edgehelper:[void 0,!1]}),"mz"===this.props.selectedTool){console.log("measurement in z direction initiated by click on particle #"+t);var a=this.state.graph;a.measureZ(t),this.setState({graph:a,edges:a.edges()})}if("my"===this.props.selectedTool){console.log("measurement in y direction initiated by click on particle #"+t);var r=this.state.graph;r.measureY(t),this.setState({graph:r,edges:r.edges()})}if("mx"!==this.props.selectedTool||this.state.mxhelper[1]){if("mx"===this.props.selectedTool&&this.state.mxhelper[1]){console.log("measurement in x direction initiated with special neighbor #"+t);var i=this.state.graph;i.measureX(t,this.state.mxhelper[0]),this.setState({graph:i,edges:i.edges()}),this.setState({mxhelper:[void 0,!1]})}}else console.log("measurement in x direction initiated by click on particle #"+t+" measurement will begin once a second particle is selected"),this.setState({mxhelper:[t,!0]});if("newEdge"!==this.props.selectedTool||this.state.edgehelper[1]){if("newEdge"===this.props.selectedTool&&this.state.edgehelper[1]){console.log("edge creation initiated with new neighbor #"+t);var n=this.state.graph;n.newEdge(this.state.edgehelper[0],t),this.setState({graph:n,edges:n.edges()}),this.setState({edgehelper:[void 0,!1]})}}else console.log("edge creation initiated by click on particle #"+t+" creation will begin once a second particle is selected"),this.setState({edgehelper:[t,!0]})}},{key:"newParticleCreator",value:function(e){if("newParticle"===this.props.selectedTool){var t=this.state.graph;t.newParticle();var a={number:t.getAdjacencyMatrix().length,initialX:"calc("+e.clientX+"px - 6vh)",initialY:"calc("+e.clientY+"px - 6vh)",particleBox:this.props.container,draggable:this.props.canDrag,onUpdate:this.onUpdate},r=i.a.createElement(b,{info:a,key:a.number.toString(),clickHandler:this.particleClickHandler});this.setState({extraParticles:this.state.extraParticles.concat(r)}),this.setState({graph:t,edges:t.edges()})}}},{key:"render",value:function(){for(var e=[],t=[],a=this.state.graph.getAdjacencyMatrix().length,r=0;r<a;r++){var n={number:r,initialX:150*r+300,initialY:150*Math.floor(r/5)+300+150*Math.cos(2*r/Math.PI),particleBox:this.props.container,draggable:this.props.canDrag,onUpdate:this.onUpdate};e.push(i.a.createElement(b,{info:n,key:n.number.toString(),clickHandler:this.particleClickHandler}))}var l=!0,o=!1,c=void 0;try{for(var s,h=this.state.edges[Symbol.iterator]();!(l=(s=h.next()).done);l=!0){var d=s.value,u=this.state.positionTable;"undefined"!==typeof u&&"undefined"!==typeof u[d[0]]&&"undefined"!==typeof u[d[1]]&&t.push(i.a.createElement(x,{firstVertex:u[d[0]],secondVertex:u[d[1]],key:"edge ("+d[0]+","+d[1]+")"}))}}catch(p){o=!0,c=p}finally{try{l||null==h.return||h.return()}finally{if(o)throw c}}return i.a.createElement("div",{className:"particlecanvas",onClick:this.newParticleCreator},e,i.a.createElement("svg",null,t))}}]),t}(i.a.Component),j=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).page=i.a.createRef(),a.state={selectedTool:"newParticle",adjacencyMatrix:[[0,1,0,0,1],[1,0,1,0,0],[0,1,0,1,0],[0,0,1,0,1],[1,0,0,1,0]]},a.toolbarClickHandler=a.toolbarClickHandler.bind(Object(o.a)(a)),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"toolbarClickHandler",value:function(e){var t=this;this.setState({selectedTool:e.target.getAttribute("id")},(function(){return console.log("tool switched to: "+t.state.selectedTool)}))}},{key:"render",value:function(){return i.a.createElement("div",{id:"page",ref:this.page},i.a.createElement(g,{container:this.page,selectedTool:this.state.selectedTool,clickHandler:this.toolbarClickHandler}),i.a.createElement(k,{container:this.page,selectedTool:this.state.selectedTool,canDrag:"moveParticles"==this.state.selectedTool,adjacencyMatrix:this.state.adjacencyMatrix}))}}]),t}(i.a.Component);var w=function(){return i.a.createElement(j,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.95819f92.chunk.js.map