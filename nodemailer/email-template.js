const Hello = (data) => {
  const { firstName, lastName } = data;
  return `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Hello</title>
         </head>
     
             <body style="margin: 0; padding: 0;">
                <p>Thank you for using our service ${firstName} ${lastName}</p>
                <br/>
                <br/>
                <p>We hope to see you back :)</p>
             </body>
     
       </html>
      `;
};

module.exports = { Hello };
