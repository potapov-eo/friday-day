(this["webpackJsonpfriday-day"]=this["webpackJsonpfriday-day"]||[]).push([[0],{20:function(e,t,r){e.exports={header:"Header_header__P8m-Z",burgerToggle:"Header_burgerToggle__3gMSP",nk1:"Header_nk1__1mUjG",nk3:"Header_nk3__2JrMK",nk2:"Header_nk2__A8gP4"}},21:function(e,t,r){e.exports={nav:"nav_nav__1K_HG"}},25:function(e,t,r){e.exports={profile:"Profile_profile__AOdLM",profileContainer:"Profile_profileContainer__1GNWh",info:"Profile_info__bWyEn"}},26:function(e,t,r){e.exports={notification:"ErrorSnackBar_notification__N4HPG",text:"ErrorSnackBar_text__2glv8",close:"ErrorSnackBar_close__1paLn"}},34:function(e,t,r){e.exports={button:"SuperButton_button__1JisP"}},35:function(e,t,r){e.exports={input:"SuperInput_input__1p_BM"}},49:function(e,t,r){e.exports={pre:"Preloader_pre__3-i-h"}},62:function(e,t,r){},63:function(e,t,r){},88:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r(0),s=r.n(a),c=r(29),i=r.n(c),o=(r(62),r(63),r(8)),d=r(2),l=r(49),u=r.n(l),j=r.p+"static/media/Infinity-1s-200px.2a677e42.svg",b=function(){return Object(n.jsx)("div",{className:u.a.pre,children:Object(n.jsx)("img",{src:j,style:{height:200}})})},p=r(6),O=function(){return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)("div",{children:"404"}),Object(n.jsx)("img",{src:"https://programmist1s.ru/wp-content/uploads/2013/09/Pole-ob'ekta-nedostupno-dlya-zapisi-1S.jpg",alt:"404"}),Object(n.jsx)("div",{children:"Page not found!"})]})},h=r(5),m=r(56),v=r(34),x=r.n(v),f=function(e){var t=e.name,r=void 0===t?"push":t,a=Object(m.a)(e,["name"]);return Object(n.jsxs)("button",Object(h.a)(Object(h.a)({className:x.a.button},a),{},{children:[r," "]}))},g=r(35),w=r.n(g),S=function(e){var t=Object.assign({},e);return Object(n.jsx)("input",Object(h.a)(Object(h.a)({},t),{},{className:w.a.input}))},E=r(15),_=r.n(E),P=r(24),R=r(50),y=r.n(R).a.create({baseURL:"https://neko-back.herokuapp.com/2.0",withCredentials:!0}),k=function(){return y.post("auth/me")},I=function(e,t,r){return y.post("auth/login",{email:e,password:t,rememberMe:r})},N=function(){return y.delete("auth/me")},C=function(e){return y.post("/auth/register",e)},A=function(e){return y.post("/auth/forgot",e)},T=function(e){return y.post("/auth/set-new-password",e)},L={status:"succeeded",error:null,UserData:{_id:null,email:null,name:null,avatar:null,publicCardPacksCount:null,created:null,updated:null,isAdmin:!1,verified:!1,rememberMe:!1},isLoggedIn:!1},G=function(e){return{type:"APP/SET-STATUS",status:e}},D=function(e){return{type:"APP/SET-ERROR",error:e}},W={},F=function(e){return{type:"SET_USER_DATA",userData:e}},M=function(e){return{type:"SET_ISLOGGEDIN",value:e}},B=function(){return function(){var e=Object(P.a)(_.a.mark((function e(t){var r,n,a;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(G("loading")),e.next=4,k();case 4:r=e.sent,n=r.data,t(F(n)),t(G("succeeded")),t(M(!0)),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(0),t(G("failed")),a=e.t0.response?e.t0.response.data.error:e.t0.message+", more details in the console",t(D(a));case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()},U=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.app.isLoggedIn}));return Object(a.useEffect)((function(){t||e(B())}),[t]),Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)(f,{}),Object(n.jsx)(f,{name:"xxx"}),Object(n.jsx)(S,{type:"text"}),Object(n.jsx)(O,{})]})},V=r(18),Z=function(){var e=Object(d.c)((function(e){return e.app.status})),t=Object(d.c)((function(e){return e.app.isLoggedIn})),r=Object(d.b)(),a="loading"===e,s=Object(V.a)({initialValues:{email:"nya-admin@nya.nya",password:"1qazxcvBG",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password||(t.password="Required"),t},onSubmit:function(e){var t,n,a,c=(t=e.email,n=e.password,a=e.rememberMe,function(){var e=Object(P.a)(_.a.mark((function e(r){var s,c,i;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r(G("loading")),e.next=4,I(t,n,a);case 4:s=e.sent,c=s.data,r(F(c)),r(M(!0)),r(G("succeeded")),r(D(null)),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(0),r(G("failed")),i=e.t0.response?e.t0.response.data.error:e.t0.message+", more details in the console",r(D(i));case 17:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}());r(c),s.resetForm()}});return t?(r(D("you are already logged in")),Object(n.jsx)(p.a,{to:te.PROFILE})):Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)("h1",{children:"LOG IN"}),Object(n.jsxs)("form",{onSubmit:s.handleSubmit,children:[Object(n.jsx)("div",{children:Object(n.jsx)(S,{name:"email",onChange:s.handleChange,onBlur:s.handleBlur,type:"text",value:s.values.email,placeholder:"Email"})}),s.touched.email&&s.errors.email?Object(n.jsxs)("div",{style:{color:"red"},children:[" ",s.errors.email," "]}):null,Object(n.jsx)("div",{children:Object(n.jsx)(S,{name:"password",onChange:s.handleChange,onBlur:s.handleBlur,type:"password",value:s.values.password,placeholder:"Password"})}),s.touched.password&&s.errors.password?Object(n.jsxs)("div",{style:{color:"red"},children:[" ",s.errors.password," "]}):null,Object(n.jsxs)("div",{children:[Object(n.jsx)("span",{children:"Remember me "}),Object(n.jsx)(S,{name:"rememberMe",onChange:s.handleChange,checked:s.values.rememberMe,type:"checkbox"})]}),Object(n.jsx)("div",{children:Object(n.jsx)(f,{disabled:a,name:"log in"})})]})]})},H={isRegister:!1},q=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.app.status})),r=Object(d.c)((function(e){return e.app.isLoggedIn})),a=Object(d.c)((function(e){return e.register.isRegister})),s="loading"===t,c=Object(V.a)({initialValues:{email:"potapov.eo@yandex.ru",password:"jekajeka",password2:"jekajeka"},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="email Required",e.password?e.password.length<7?t.password="Invalid email address":e.password2!==e.password&&(t.password="Passwords do not match"):t.password="password Required",t},onSubmit:function(t){var r;e((r={email:t.email,password:t.password},function(){var e=Object(P.a)(_.a.mark((function e(t){var n;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(G("loading")),e.next=4,C(r);case 4:t({type:"SET-IS-REGISTER",value:!0}),t(G("succeeded")),t(D(null)),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(0),t(G("failed")),n=e.t0.response?e.t0.response.data.error:e.t0.message+", more details in the console",t(D(n));case 14:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}())),c.resetForm()}});return r?(e(D("you are already logged in")),Object(n.jsx)(p.a,{to:te.PROFILE})):a?Object(n.jsx)(p.a,{to:te.LOGIN}):Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)("form",{onSubmit:c.handleSubmit,children:[Object(n.jsx)("h1",{children:"REGISTRATION"}),Object(n.jsxs)("div",{children:[Object(n.jsx)(S,{placeholder:"email",type:"email",name:"email",onChange:c.handleChange,value:c.values.email}),c.touched.email&&c.errors.email?Object(n.jsx)("div",{style:{color:"red"},children:c.errors.email}):null]}),Object(n.jsx)("div",{children:Object(n.jsx)(S,{placeholder:"password",type:"password",name:"password",onChange:c.handleChange,value:c.values.password})}),Object(n.jsxs)("div",{children:[Object(n.jsx)(S,{placeholder:"password2",type:"password",name:"password2",onChange:c.handleChange,value:c.values.password2}),c.touched.password&&c.errors.password?Object(n.jsx)("div",{style:{color:"red"},children:c.errors.password}):null]}),Object(n.jsx)(f,{disabled:s,type:"submit"})]})})},$={registeredEmail:!1},z=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.app.status})),r=Object(d.c)((function(e){return e.recoveryPassword.registeredEmail})),a="loading"===t,s=Object(V.a)({initialValues:{email:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",t},onSubmit:function(t){var r;e((r={email:t.email,from:"test-front-admin <ai73a@yandex.by>",message:"<div>password recovery link:<a href='http://localhost:3000/#/new-password/$token$'>link</a></div>"},function(e){return e(G("loading")),A(r).then((function(t){t.data.success&&e({type:"VERIFICATION-EMAIL",value:!0}),e(G("succeeded"))})).catch((function(t){e(G("failed"));var r=t.response?t.response.data.error:t.message+", more details in the console";e(D(r))}))})),s.resetForm()}});Object(p.g)().token;return r?Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{children:"Success!"}),Object(n.jsx)("div",{children:"Click the link in the message in your email"})]}):Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)("form",{onSubmit:s.handleSubmit,children:["RecoveryPassword",Object(n.jsxs)("div",{children:[Object(n.jsx)(S,{placeholder:"email",type:"email",name:"email",onChange:s.handleChange,value:s.values.email}),s.touched.email&&s.errors.email?Object(n.jsx)("div",{style:{color:"red"},children:s.errors.email}):null]}),Object(n.jsx)(f,{disabled:a,type:"submit",name:"Send"})]})})},J=r(25),Y=r.n(J),K=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.app.isLoggedIn})),r=Object(d.c)((function(e){return e.app.UserData}));if(Object(a.useEffect)((function(){t||e(B())}),[t]),!t)return Object(n.jsx)(p.a,{to:te.LOGIN});return Object(n.jsxs)("div",{className:Y.a.profile,children:[Object(n.jsx)("h1",{children:"PROFILE"}),Object(n.jsxs)("div",{className:Y.a.profileContainer,children:[Object(n.jsx)("img",{className:Y.a.avatar,src:"https://www.gravatar.com/avatar/c37e0453882ec1e1d40bb4387e27b1dc?s=200&r=g&d=mm"}),Object(n.jsxs)("div",{className:Y.a.info,children:[Object(n.jsxs)("div",{children:[" Name: ",Object(n.jsx)("span",{children:r?r.name:null})]}),Object(n.jsxs)("div",{children:[" Email: ",Object(n.jsx)("span",{children:r?r.email:null})]}),Object(n.jsxs)("div",{children:["Public Card Packs Count: ",Object(n.jsx)("span",{children:r?r.publicCardPacksCount:null})]})]})]})]})},X={newPassword:""},Q=function(e){return{type:"APP/SET-PASSWORD",newPassword:e}},ee=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.app.status})),r=Object(d.c)((function(e){return e.newPassword.newPassword})),a=Object(p.g)().token;console.log(a);var s="loading"===t,c=Object(V.a)({initialValues:{password:"",password2:"",resetPasswordToken:a},validate:function(e){var t={};return e.password?e.password.length<7?t.password="length of passwords should be 7 and more simbols":e.password2!==e.password&&(t.password="Passwords do not match"):t.password="password Required",t},onSubmit:function(t){var r;e((r={password:t.password,resetPasswordToken:t.resetPasswordToken},function(e){return e(G("loading")),T(r).then((function(t){e(Q(r.password)),e(G("succeeded"))}))})),c.resetForm()}});return r?Object(n.jsx)(p.a,{to:te.LOGIN}):Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)("form",{onSubmit:c.handleSubmit,children:["NewPassword",Object(n.jsxs)("div",{children:[Object(n.jsx)(S,{placeholder:"password",type:"password",name:"password",onChange:c.handleChange,value:c.values.password}),c.touched.password&&c.errors.password?Object(n.jsx)("div",{style:{color:"red"},children:c.errors.password}):null]}),Object(n.jsxs)("div",{children:[Object(n.jsx)(S,{placeholder:"confirm password",type:"password",name:"password2",onChange:c.handleChange,value:c.values.password2}),c.touched.password2&&c.errors.password2?Object(n.jsx)("div",{style:{color:"red"},children:c.errors.password2}):null]}),Object(n.jsx)(f,{disabled:s,type:"submit",name:"Send"})]})})},te={HOME:"/home",TEST:"/test",LOGIN:"/login",REGISTER:"/register",RECOVERY_PASSWORD:"/recovery-password",NEW_PASSWORD:"/new-password",PROFILE:"/profile"},re=function(){return Object(n.jsx)("div",{children:Object(n.jsxs)(p.d,{children:[Object(n.jsx)(p.b,{path:"/",exact:!0,render:function(){return Object(n.jsx)(p.a,{to:te.PROFILE})}}),Object(n.jsx)(p.b,{path:te.TEST,render:function(){return Object(n.jsx)(U,{})}}),Object(n.jsx)(p.b,{path:te.LOGIN,render:function(){return Object(n.jsx)(Z,{})}}),Object(n.jsx)(p.b,{path:te.REGISTER,render:function(){return Object(n.jsx)(q,{})}}),Object(n.jsx)(p.b,{path:te.RECOVERY_PASSWORD,render:function(){return Object(n.jsx)(z,{})}}),Object(n.jsx)(p.b,{path:"".concat(te.NEW_PASSWORD,"/:token"),render:function(){return Object(n.jsx)(ee,{})}}),Object(n.jsx)(p.b,{path:te.NEW_PASSWORD,exact:!0,render:function(){return Object(n.jsx)(z,{})}}),Object(n.jsx)(p.b,{path:te.PROFILE,render:function(){return Object(n.jsx)(K,{})}}),Object(n.jsx)(p.b,{render:function(){return Object(n.jsx)(O,{})}})]})})},ne=r(26),ae=r.n(ne),se=function(e){var t=Object(d.b)();return Object(n.jsxs)("div",{className:ae.a.notification,children:[Object(n.jsxs)("div",{className:ae.a.text,children:[" ",e.errorMessage," "]}),Object(n.jsx)("div",{className:"".concat(ae.a.close),children:Object(n.jsx)("div",{className:ae.a.text,onClick:function(){return t(D(null))},children:"X"})})]})},ce=r(20),ie=r.n(ce),oe=r(21),de=r.n(oe),le=function(){return Object(n.jsxs)("div",{className:de.a.nav,children:[Object(n.jsx)("span",{children:Object(n.jsx)(o.b,{to:te.TEST,activeClassName:de.a.activeLink,children:"TEST"})}),Object(n.jsx)("span",{children:Object(n.jsx)(o.b,{to:te.LOGIN,activeClassName:de.a.activeLink,children:"LOGIN"})}),Object(n.jsx)("span",{children:Object(n.jsx)(o.b,{to:te.REGISTER,activeClassName:de.a.activeLink,children:"REGISTER"})}),Object(n.jsx)("span",{children:Object(n.jsx)(o.b,{to:te.RECOVERY_PASSWORD,activeClassName:de.a.activeLink,children:"RECOVERY_PASSWORD"})}),Object(n.jsx)("span",{children:Object(n.jsx)(o.b,{to:te.NEW_PASSWORD,activeClassName:de.a.activeLink,children:"NEW_PASSWORD"})}),Object(n.jsx)("span",{children:Object(n.jsx)(o.b,{to:te.PROFILE,activeClassName:de.a.activeLink,children:"PROFILE"})})]})},ue=r(53),je=r(54),be=function(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.app.UserData?e.app.UserData.name:null})),r=Object(d.c)((function(e){return e.app.isLoggedIn}));return Object(n.jsxs)("div",{className:ie.a.header,children:[Object(n.jsx)(ue.a,{icon:je.a,size:"4x"}),Object(n.jsx)(le,{}),Object(n.jsx)("div",{className:ie.a.burger,children:Object(n.jsx)("a",{href:"",className:ie.a.a,onClick:function(){alert("menu open")},children:Object(n.jsxs)("span",{className:ie.a.burgerToggle,children:[Object(n.jsx)("span",{className:ie.a.nk1}),Object(n.jsx)("span",{className:ie.a.nk2}),Object(n.jsx)("span",{className:ie.a.nk3})]})})}),r&&Object(n.jsx)(f,{onClick:function(){var t=function(){var e=Object(P.a)(_.a.mark((function e(t){var r;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(G("loading")),e.next=4,N();case 4:t(G("succeeded")),t(M(!1)),t(F(null)),t(D(null)),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),r=e.t0.response?e.t0.response.data.error:e.t0.message+", more details in the console",t(D(r));case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}();e(t)},name:"logout"}),r&&Object(n.jsxs)("div",{style:{margin:"10px",color:"#e08821",fontWeight:"bold",fontSize:"20px"},children:[" ",t," "]})]})};var pe=function(){var e=Object(d.c)((function(e){return e.app.status})),t=Object(d.c)((function(e){return e.app.error}));return Object(n.jsx)("div",{children:Object(n.jsxs)(o.a,{children:[Object(n.jsx)(be,{}),"loading"===e&&Object(n.jsx)(b,{}),Object(n.jsx)(re,{}),t&&Object(n.jsx)(se,{errorMessage:t})]})})},Oe=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,89)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;r(e),n(e),a(e),s(e),c(e)}))},he=r(23),me=r(55),ve=Object(he.c)({login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;return t.type,e},register:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET-IS-REGISTER":return Object(h.a)(Object(h.a)({},e),{},{isRegister:t.value});default:return e}},recoveryPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"VERIFICATION-EMAIL":return Object(h.a)(Object(h.a)({},e),{},{registeredEmail:t.value});default:return e}},newPassword:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-PASSWORD":return Object(h.a)(Object(h.a)({},e),{},{newPassword:t.newPassword});default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(h.a)(Object(h.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(h.a)(Object(h.a)({},e),{},{error:t.error});case"SET_USER_DATA":return Object(h.a)(Object(h.a)({},e),{},{UserData:t.userData});case"SET_ISLOGGEDIN":return Object(h.a)(Object(h.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),xe=Object(he.d)(ve,Object(he.a)(me.a));window.store=xe,i.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(d.a,{store:xe,children:Object(n.jsx)(pe,{})})}),document.getElementById("root")),Oe()}},[[88,1,2]]]);
//# sourceMappingURL=main.46db7521.chunk.js.map