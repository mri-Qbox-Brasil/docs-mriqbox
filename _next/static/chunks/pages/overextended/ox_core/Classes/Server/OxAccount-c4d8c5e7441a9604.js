(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3378],{3879:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/overextended/ox_core/Classes/Server/OxAccount",function(){return s(5291)}])},5291:function(e,n,s){"use strict";s.r(n),s.d(n,{__toc:function(){return a}});var c=s(2676),l=s(2140),r=s(8745);let a=[{depth:2,value:"OxAccount",id:"oxaccount"},{depth:2,value:"OxAccountMetadata",id:"oxaccountmetadata"},{depth:2,value:"OxAccount.get",id:"oxaccountget"},{depth:2,value:"OxAccount.addBalance",id:"oxaccountaddbalance"},{depth:2,value:"OxAccount.removeBalance",id:"oxaccountremovebalance"},{depth:2,value:"OxAccount.transferBalance",id:"oxaccounttransferbalance"},{depth:2,value:"OxAccount.depositMoney",id:"oxaccountdepositmoney"},{depth:2,value:"OxAccount.withdrawMoney",id:"oxaccountwithdrawmoney"},{depth:2,value:"OxAccount.deleteAccount",id:"oxaccountdeleteaccount"},{depth:2,value:"OxAccount.getCharacterRole",id:"oxaccountgetcharacterrole"},{depth:2,value:"OxAccount.setCharacterRole",id:"oxaccountsetcharacterrole"},{depth:2,value:"OxAccount.playerHasPermission",id:"oxaccountplayerhaspermission"},{depth:2,value:"OxAccount.setShared",id:"oxaccountsetshared"},{depth:2,value:"OxAccount.createInvoice",id:"oxaccountcreateinvoice"}];function _createMdxContent(e){let n=Object.assign({h2:"h2",ul:"ul",li:"li",code:"code",p:"p",pre:"pre",span:"span",strong:"strong"},(0,r.a)(),e.components);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h2,{id:"oxaccount",children:"OxAccount"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["accountId ",(0,c.jsx)(n.code,{children:"number"})]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountmetadata",children:"OxAccountMetadata"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["id: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["balance: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["isDefault: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["label?: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["owner?: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["group?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n",(0,c.jsxs)(n.li,{children:["type: ",(0,c.jsx)(n.code,{children:"personal"})," | ",(0,c.jsx)(n.code,{children:"shared"})," | ",(0,c.jsx)(n.code,{children:"group"})]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountget",children:"OxAccount.get"}),"\n",(0,c.jsx)(n.p,{children:"Pega o valor de uma chave espec\xedfica dos metadados da conta."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"get"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(key)"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["key: ",(0,c.jsx)(n.code,{children:"string"})," | ",(0,c.jsx)(n.code,{children:"string[]"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"OxAccountMetadata[key]"})," | ",(0,c.jsx)(n.code,{children:"OxAccountMetadata[key][]"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"Retorna um array se forem passadas m\xfaltiplas chaves."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountaddbalance",children:"OxAccount.addBalance"}),"\n",(0,c.jsx)(n.p,{children:"Adiciona fundos a conta."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"addBalance"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"({ amount, message })"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["amount: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["message?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'amount_not_number'"})," | ",(0,c.jsx)(n.code,{children:"'no_balance'"})," | ",(0,c.jsx)(n.code,{children:"'something_went_wrong'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountremovebalance",children:"OxAccount.removeBalance"}),"\n",(0,c.jsx)(n.p,{children:"Remove fundos da conta."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"removeBalance"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"({ amount, message, overdraw })"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["amount: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["message?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n",(0,c.jsxs)(n.li,{children:["overdraw?: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'amount_not_number'"})," | ",(0,c.jsx)(n.code,{children:"'no_balance'"})," | ",(0,c.jsx)(n.code,{children:"'something_went_wrong'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccounttransferbalance",children:"OxAccount.transferBalance"}),"\n",(0,c.jsx)(n.p,{children:"Transfere fundos para outra conta."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"transferBalance"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"({ toId, amount, overdraw, message, note, actorId })"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["toId: ",(0,c.jsx)(n.code,{children:"number"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"O accountId que receber\xe1 os fundos."}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["amount: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["message?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n",(0,c.jsxs)(n.li,{children:["overdraw?: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["note?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n",(0,c.jsxs)(n.li,{children:["actorId? ",(0,c.jsx)(n.code,{children:"number"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"O charId do player que fez a transfer\xeancia."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'amount_not_number'"})," | ",(0,c.jsx)(n.code,{children:"'no_balance'"})," | ",(0,c.jsx)(n.code,{children:"'something_went_wrong'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountdepositmoney",children:"OxAccount.depositMoney"}),"\n",(0,c.jsx)(n.p,{children:"Deposita dinheiro na conta."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"transferBalance"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(playerId, amount, message, note)"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["playerId: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["amount: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["message?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n",(0,c.jsxs)(n.li,{children:["note?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'amount_not_number'"})," | ",(0,c.jsx)(n.code,{children:"'insufficient_funds'"})," | ",(0,c.jsx)(n.code,{children:"'no_balance'"})," | ",(0,c.jsx)(n.code,{children:"'no_access'"})," | ",(0,c.jsx)(n.code,{children:"'something_went_wrong'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountwithdrawmoney",children:"OxAccount.withdrawMoney"}),"\n",(0,c.jsx)(n.p,{children:"Retira dinheiro da conta(saque)."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"transferBalance"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(playerId, amount, message, note)"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["playerId: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["amount: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["message?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n",(0,c.jsxs)(n.li,{children:["note?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'amount_not_number'"})," | ",(0,c.jsx)(n.code,{children:"'no_charId'"})," | ",(0,c.jsx)(n.code,{children:"'insufficient_funds'"})," | ",(0,c.jsx)(n.code,{children:"'no_balance'"})," | ",(0,c.jsx)(n.code,{children:"'no_access'"})," | ",(0,c.jsx)(n.code,{children:"'something_went_wrong'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountdeleteaccount",children:"OxAccount.deleteAccount"}),"\n",(0,c.jsx)(n.p,{children:"Marca a conta como exclu\xedda. Ela n\xe3o pode mais ser acessada, mas permanece no banco de dados."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"deleteAccount"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"()"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'something_went_wrong'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountgetcharacterrole",children:"OxAccount.getCharacterRole"}),"\n",(0,c.jsx)(n.p,{children:"Pega o cargo de acesso de um personagem pelo seu charId ou stateId."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"getCharacterRole"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(id)"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["id: ",(0,c.jsx)(n.code,{children:"number"})," | ",(0,c.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"string"})}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountsetcharacterrole",children:"OxAccount.setCharacterRole"}),"\n",(0,c.jsx)(n.p,{children:"Seta o cargo de acesso de um personagem pelo seu charId ou stateId."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"setCharacterRole"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(id, role)"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["id: ",(0,c.jsx)(n.code,{children:"number"})," | ",(0,c.jsx)(n.code,{children:"string"})]}),"\n",(0,c.jsxs)(n.li,{children:["role?: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'something_went_wrong'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountplayerhaspermission",children:"OxAccount.playerHasPermission"}),"\n",(0,c.jsx)(n.p,{children:"Verifica se o personagem ativo do jogadortem permiss\xe3o para realizar uma a\xe7\xe3o na conta."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"playerHasPermission"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(playerId, permission)"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["playerId: ",(0,c.jsx)(n.code,{children:"number"})]}),"\n",(0,c.jsxs)(n.li,{children:["permission: ",(0,c.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"boolean"})}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountsetshared",children:"OxAccount.setShared"}),"\n",(0,c.jsx)(n.p,{children:"Marca a conta como compartilhada, permitindo que permiss\xf5es sejam atribuidas a outros personagens."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"setShared"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"()"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'update_account_error'"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"oxaccountcreateinvoice",children:"OxAccount.createInvoice"}),"\n",(0,c.jsx)(n.p,{children:"Cria uma nova cobran\xe7a na conta."}),"\n",(0,c.jsx)(n.pre,{"data-language":"lua","data-theme":"default",children:(0,c.jsx)(n.code,{"data-language":"lua","data-theme":"default",children:(0,c.jsxs)(n.span,{className:"line",children:[(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"account."}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-token-function)"},children:"createInvoice"}),(0,c.jsx)(n.span,{style:{color:"var(--shiki-color-text)"},children:"(invoice)"})]})})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Par\xe2metros"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["invoice: ",(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["actorId?: number;","\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"O charId do player que fez a cobran\xe7a."}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(n.li,{children:["toAccount: number;","\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"O accountId da conta que receber\xe1 a cobran\xe7a."}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.li,{children:"amount: number;"}),"\n",(0,c.jsx)(n.li,{children:"message: string;"}),"\n",(0,c.jsx)(n.li,{children:"dueDate: string;"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Retornos"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"object"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["success: ",(0,c.jsx)(n.code,{children:"boolean"})]}),"\n",(0,c.jsxs)(n.li,{children:["message: ",(0,c.jsx)(n.code,{children:"'no_charId'"})," | ",(0,c.jsx)(n.code,{children:"'no_permission'"})," | ",(0,c.jsx)(n.code,{children:"'no_target_account'"})]}),"\n"]}),"\n"]}),"\n"]})]})}n.default=(0,l.j)({MDXContent:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,r.a)(),e.components);return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)},pageOpts:{filePath:"pages/overextended/ox_core/Classes/Server/OxAccount.mdx",route:"/overextended/ox_core/Classes/Server/OxAccount",frontMatter:{title:"OxAccount"},timestamp:1735236637e3,title:"OxAccount",headings:a},pageNextRoute:"/overextended/ox_core/Classes/Server/OxAccount"})}},function(e){e.O(0,[2601,9774,2888,179],function(){return e(e.s=3879)}),_N_E=e.O()}]);