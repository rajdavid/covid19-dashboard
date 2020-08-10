(this["webpackJsonpcovid19-dashboard"]=this["webpackJsonpcovid19-dashboard"]||[]).push([[0],{43:function(e,t,a){e.exports=a(71)},48:function(e,t,a){},49:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(36),c=a.n(o),i=(a(48),a(12)),l=a(13),s=a(17),d=a(15),m=a(14),u=(a(49),a(94)),g=a(96),h=a(97),p=a(98),v=Object(u.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function f(){var e=v();return r.a.createElement("div",{className:e.root},r.a.createElement(g.a,{position:"static"},r.a.createElement(h.a,null,r.a.createElement(p.a,{variant:"h6",className:e.title},"Covid-19 DashBoard"))))}var E=a(4),b=a(99),j=a(100),D=Object(u.a)({root:{padding:"10px",width:"200px",height:"222px"},bullet:{display:"inline-block",margin:"2px",transform:"scale(0.8)"},title:{fontSize:25,fontWeight:"bold"},pos:{marginLeft:12,marginRight:12,marginTop:12,marginBottom:12}}),O=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(b.a,{className:e.root},r.a.createElement(j.a,null,r.a.createElement(p.a,{variant:"h5",component:"h2"},this.props.text),r.a.createElement(p.a,{variant:"h5",component:"h2"},this.props.val)))}}]),a}(n.Component),y=Object(E.a)(D)(O),k=a(107),w=a(104),x=a(106),C=a(101),S=a(103),T=a(105),B=a(102),N=a(39),M=Object(E.a)((function(e){return{head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:14}}}))(C.a),P=Object(E.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(B.a),R=Object(u.a)({table:{minWidth:700}}),U=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(S.a,{component:N.a},r.a.createElement(w.a,{className:e.table,"aria-label":"customized table"},r.a.createElement(T.a,null,r.a.createElement(B.a,null,r.a.createElement(M,{align:"center"},"States/UT "),r.a.createElement(M,{align:"center"},"Confirmed"),r.a.createElement(M,{align:"center"},"Active"),r.a.createElement(M,{align:"center"},"Recovered"),r.a.createElement(M,{align:"center"},"Deceased"),r.a.createElement(M,{align:"center"},"Test Per Million"),r.a.createElement(M,{align:"center"},"Total ICU Beds"))),r.a.createElement(x.a,null,this.props.val.filter((function(e){return"State Unassigned"!==e.state&&"Total"!==e.state})).map((function(e){return r.a.createElement(P,{key:e.state},r.a.createElement(M,{component:"th",scope:"row",align:"center"},e.state),r.a.createElement(M,{align:"center"},e.confirmed),r.a.createElement(M,{align:"center"},e.active),r.a.createElement(M,{align:"center"},e.recovered),r.a.createElement(M,{align:"center"},e.deaths),r.a.createElement(M,{align:"center"},e.testspermillion),r.a.createElement(M,{align:"center"},e.numicubeds))})))))}}]),a}(n.Component),W=Object(E.a)(R,{withTheme:!0})(U),_=a(24),z=a.n(_),A=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).mergeData=function(){var t=[],a=0,n=0;for(console.log("len state data",e.state.data.length),console.log("len testing  data",e.state.testingData.length),a=0;a<e.state.data.length;a++)for(console.log("len state data",a),n=0;n<e.state.testingData.length;n++)if(console.log("testing state data",n),e.state.data[a].state===e.state.testingData[n].state){var r={};console.log("dada"),r.state=e.state.data[a].state,r.confirmed=e.state.data[a].confirmed,r.active=e.state.data[a].active,r.recovered=e.state.data[a].recovered,r.deaths=e.state.data[a].deaths,r.testspermillion=e.state.testingData[n].testspermillion,r.numicubeds=e.state.testingData[n].numicubeds,t.push(r)}console.log("merged data",t),e.setState({mergedData:t})},e.getTestingData=function(){var t=Object(s.a)(e);z.a.get("https://api.covid19india.org/state_test_data.json").then((function(e){var a=e.data.states_tested_data;t.setState({testingData:a.filter((function(e){return"08/08/2020"===e.updatedon}))},(function(){t.mergeData()}))})).catch((function(e){console.log(e)})).finally((function(){}))},e.getPatientData=function(){var t=Object(s.a)(e);z.a.get("https://api.covid19india.org/data.json").then((function(e){t.setState({data:e.data.statewise},(function(){t.getTestingData()}))})).catch((function(e){console.log(e)})).finally((function(){}))},e.state={data:[],testingData:[],mergedData:[]},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.getPatientData()}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(f,null),r.a.createElement("br",null),r.a.createElement("div",{id:"cases",className:"Card-Padding"},r.a.createElement(k.a,{container:!0},r.a.createElement(k.a,{item:!0,md:3},r.a.createElement(y,{text:"Confirmed",val:void 0!==this.state.data[0]?this.state.data[0].confirmed:""})),r.a.createElement(k.a,{item:!0,md:3},r.a.createElement(y,{text:"Active",val:void 0!==this.state.data[0]?this.state.data[0].active:""})),r.a.createElement(k.a,{item:!0,md:3},r.a.createElement(y,{text:"Recovered",val:void 0!==this.state.data[0]?this.state.data[0].recovered:""})),r.a.createElement(k.a,{item:!0,md:3},r.a.createElement(y,{text:"Deaths",val:void 0!==this.state.data[0]?this.state.data[0].deaths:""})))),r.a.createElement("div",{style:{padding:"15px"}},r.a.createElement(W,{val:this.state.mergedData})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[43,1,2]]]);
//# sourceMappingURL=main.935755cb.chunk.js.map