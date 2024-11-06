(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2512],{8174:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/overextended/ox_fuel/Server/functions",function(){return n(4479)}])},4479:function(e,s,n){"use strict";n.r(s),n.d(s,{__toc:function(){return t}});var r=n(2676),l=n(2140),o=n(8745);let t=[{depth:2,value:"setPaymentMethod",id:"setpaymentmethod"},{depth:3,value:"Parameters",id:"parameters"},{depth:3,value:"Example",id:"example"}];function _createMdxContent(e){let s=Object.assign({h1:"h1",h2:"h2",p:"p",pre:"pre",code:"code",span:"span",h3:"h3",ul:"ul",li:"li"},(0,o.a)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{children:"Functions"}),"\n",(0,r.jsx)(s.h2,{id:"setpaymentmethod",children:"setPaymentMethod"}),"\n",(0,r.jsx)(s.p,{children:"Override the built-in payment method."}),"\n",(0,r.jsx)(s.pre,{"data-language":"lua","data-theme":"default",children:(0,r.jsx)(s.code,{"data-language":"lua","data-theme":"default",children:(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"exports.ox_fuel:"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-function)"},children:"setPaymentMethod"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"(method)"})]})})}),"\n",(0,r.jsx)(s.h3,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["method: ",(0,r.jsx)(s.code,{children:"function(): boolean?"})]}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"example",children:"Example"}),"\n",(0,r.jsx)(s.pre,{"data-language":"lua","data-theme":"default",children:(0,r.jsxs)(s.code,{"data-language":"lua","data-theme":"default",children:[(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"exports.ox_fuel:"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-function)"},children:"setPaymentMethod"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"function"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-parameter)"},children:"playerId"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-punctuation)"},children:","}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-parameter)"},children:"amount"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:")"})]}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"local"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" xPlayer "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" ESX."}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-function)"},children:"GetPlayerFromId"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"(playerId)"})]}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"local"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" bankAmount "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" xPlayer."}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-function)"},children:"getAccount"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'bank'"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:").money"})]}),"\n",(0,r.jsx)(s.span,{className:"line",children:" "}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"if"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" bankAmount "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:">="}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" amount "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"then"})]}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"        xPlayer."}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-function)"},children:"removeAccountMoney"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'bank'"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:", amount)"})]}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"        "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"return"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-constant)"},children:"true"})]}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"end"})]}),"\n",(0,r.jsx)(s.span,{className:"line",children:" "}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"    "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-function)"},children:"TriggerClientEvent"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'ox_lib:notify'"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:", source, {"})]}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"        type "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'error'"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:","})]}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"        description "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"="}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-function)"},children:"locale"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"("}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-string-expression)"},children:"'not_enough_money'"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:", amount "}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"-"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:" bankAmount)"})]}),"\n",(0,r.jsx)(s.span,{className:"line",children:(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:"    })"})}),"\n",(0,r.jsxs)(s.span,{className:"line",children:[(0,r.jsx)(s.span,{style:{color:"var(--shiki-token-keyword)"},children:"end"}),(0,r.jsx)(s.span,{style:{color:"var(--shiki-color-text)"},children:")"})]})]})})]})}s.default=(0,l.j)({MDXContent:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:s}=Object.assign({},(0,o.a)(),e.components);return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)},pageOpts:{filePath:"pages/overextended/ox_fuel/Server/functions.mdx",route:"/overextended/ox_fuel/Server/functions",timestamp:1730854598e3,title:"Functions",headings:t},pageNextRoute:"/overextended/ox_fuel/Server/functions"})}},function(e){e.O(0,[2601,9774,2888,179],function(){return e(e.s=8174)}),_N_E=e.O()}]);