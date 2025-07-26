async function o({to:t,subject:s,html:a}){const e=await(await fetch("http://localhost:3001/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:t,subject:s,html:a})})).json();if(!e.success)throw new Error(e.error||"Failed to send email");return e.result}export{o as s};
//# sourceMappingURL=send-email-D3sSQfLx.js.map
