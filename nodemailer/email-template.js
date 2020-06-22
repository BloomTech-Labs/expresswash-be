const Hello = (data) => {
  const { firstName, lastName } = data;
  return `
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Hello</title>
            <style>
            #container{
                
             
                text-align:center;

            }
            .header{
                padding-top:5%;
                height:30px;
                font-size:30px;
                background-color:lightblue;
                color:white;
            }
            .text{
                
                font-size:20px;
                
            }
            <style/>
         </head>
     
             <body>
             <div id = "container">
             <p class = "header">Thank you for using our service ${firstName} ${lastName}</p>
             <p class = "text">Your job has been completed!</p>
             <p>We hope to see you back :)</p>
             <a href = "https://www.expresswash.us/clientDash" target = "_blank">Click here to go back to the website </a>
             
             
             <div/>
             </body>
     
       </html>
      `;
};

module.exports = { Hello };
