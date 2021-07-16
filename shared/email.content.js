
exports.commonMail = (subject,name,msg) => {
    let mailcontent = `                
    <div class="messageBody" style="text-size-adjust: 100%; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word; margin: 0px !important; padding: 0px !important; width: auto; height: auto;">
    <div class="" style="background-color: rgb(242, 242, 242);" bgcolor="#f2f2f2">
       <table role="presentation" class="" cellpadding="0" cellspacing="0" style="text-size-adjust: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word; margin: 0px; padding: 0px;  border-spacing: 0px !important;width: 100% !important;  min-width: 320px !important; height: 100% !important;"
          width="100%" height="100%">
          <tbody class="" style="">
             <tr class="" style="">
                <td class="" valign="top" style="border-collapse: collapse; text-size-adjust: 100%; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word;">
                   <div class="" style="color: inherit; font-size: inherit; line-height: inherit;">
                      <div id="section_0" class="" style="padding-left: 10px; padding-right: 10px; padding-top: 20px;">
                         <div class="" style="min-width: 280px; max-width: 600px; width: 100%; margin-left: auto; margin-right: auto; border-collapse: collapse; border-spacing: 0px; border-left: 1px solid rgb(204, 204, 204); border-right: 1px solid rgb(204, 204, 204); box-sizing: border-box; border-top: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255);"
                            bgcolor="#ffffff" width="100%">
                         </div>
                      </div>
                      <div id="section_1" class="" style="padding-left: 10px; padding-right: 10px;">
                         <div class="" style="min-width: 280px; max-width: 600px; width: 100%; margin-left: auto; margin-right: auto; border-collapse: collapse; border-spacing: 0px; border-left: 1px solid rgb(204, 204, 204); border-right: 1px solid rgb(204, 204, 204); box-sizing: border-box; background-color: rgb(255, 255, 255);"
                            bgcolor="#ffffff" width="100%">
                           <div style="text-align: right;padding: 5px 5px;
                           background: linear-gradient(to left, rgb(22, 1, 0) 0%, rgb(149, 149, 151) 100%);">
                              <img src="${process.env.LOGO_URL}" style="width: 106px;">
                           </div>
                            <div class="" style="">
                               <table cellpadding="0" cellspacing="0" width="100%" style="text-size-adjust: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word; border-spacing: 0px !important;"
                                  class="">
                                  <tbody class="" style="">
                                     <tr class="" style="">
                                        <td style="border-collapse: collapse; text-size-adjust: 100%; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word; padding: 10px 20px;" class="">
                                           <div id="hs_cos_wrapper_hs_email_body" class="" style="color: inherit; font-size: inherit; line-height: inherit;" data-hs-cos-general-type="widget" data-hs-cos-type="module">
                                              <div id="hs_cos_wrapper_hs_email_body_" class="" style="color: inherit; font-size: inherit; line-height: inherit;" data-hs-cos-general-type="widget" data-hs-cos-type="rich_text">
                                                 <p style="font-size: 20px; font-weight: bold; text-align: center; color:rgb(22, 1, 0)">${subject}</p>
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left;" align="left" class="">Hi&nbsp;${name},
                                                 </p>
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left;" align="left" class="">&nbsp;</p>
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left;" align="left" class="">
                                                   ${msg}
                                                 </p>
                                                
                                                 
                                                <p style="margin: 0px; text-size-adjust: 100%; text-align: left;" align="left" class="">&nbsp;</p>
 
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left;" align="left" class="">
                                                    Thank you for being with us.
                                                 </p>
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left;" align="left" class="">&nbsp;</p>
                                                
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left; " align="left " class=" ">&nbsp;</p>
                                                
                                              </div>
                                           </div>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                               <table cellpadding="0 " cellspacing="0 " width="100% " style="text-size-adjust: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break:
                                  break-word; border-spacing: 0px !important; " class=" ">
                                  <tbody class=" " style=" ">
                                     <tr class=" " style=" ">
                                        <td style="border-collapse: collapse; text-size-adjust: 100%; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word; padding: 10px 20px;
                                           " class=" ">
                                           <div class=" " style="color: inherit; font-size: inherit; line-height: inherit; ">
                                              <div class=" " style="color: inherit; font-size: inherit; line-height: inherit; ">
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left; " align="left " class=" ">
                                                    Thanks & Regards,
                                                 </p>
                                                 <p style="margin: 0px; text-size-adjust: 100%; text-align: left; " align="left " class=" ">
                                                 ${process.env.APP_NAME}
                                                 </p>
                                              </div>
                                           </div>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </div>
                         </div>
                      </div>
                      <div class=" " style="padding-left: 10px; padding-right: 10px; ">
                         <div class=" " style="min-width: 280px; max-width: 600px; width: 100%; margin-left: auto; margin-right: auto; border-collapse: collapse; border-spacing: 0px; border-left: 1px solid rgb(204, 204, 204); border-right: 1px solid rgb(204, 204, 204);
                            box-sizing: border-box; border-bottom: 1px solid rgb(204, 204, 204); background-color: rgb(255, 255, 255); " bgcolor="#ffffff " width="100% ">
                            <div id="column_4_0 " class=" " style=" ">
                               <table cellpadding="0 " cellspacing="0 " width="100% " style="text-size-adjust: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word; border-spacing: 0px
                                  !important; " class=" ">
                                  <tbody class=" " style=" ">
                                     <tr class=" " style=" ">
                                        <td style="border-collapse: collapse; text-size-adjust: 100%; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.75; color: rgb(68, 68, 68); word-break: break-word; padding: 10px 20px; " class=" ">
                                           <div class=" " style="color: inherit; font-size: inherit; line-height: inherit; ">
                                              <div class=" " style="color: inherit; font-size: inherit; line-height: inherit; ">
                                              </div>
                                           </div>
                                        </td>
                                     </tr>
                                  </tbody>
                               </table>
                            </div>
                         </div>
                      </div>
                      <div class=" " style="padding-left: 10px; padding-right: 10px; padding-bottom: 20px; ">
                         <div class=" " style="min-width: 280px; max-width: 600px; width: 100%; margin-left: auto; margin-right: auto; border-collapse: collapse; border-spacing: 0px; padding-bottom: 10px; padding-top: 10px; " width="100% ">
                            <div class=" " style=" ">
                               <div class=" " style="color: inherit; font-size: inherit; line-height: inherit; ">
                                  <table class=" " role="presentation " width="100% " cellpadding="0 " cellspacing="0 " style="text-size-adjust: 100%; border-collapse: collapse; word-break: break-word; text-align: center; font-family:
                                     sans-serif; font-size: 12px; line-height: 1.35; color: rgb(153, 153, 153); margin-bottom: 0px; padding: 0px; border-spacing: 0px !important; " align="center ">
                                     <tbody class=" " style=" ">
                                        <tr class=" " style=" ">
                                           <td align="center " valign="top " style="border-collapse: collapse; text-size-adjust: 100%; word-break: break-word; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color:
                                              rgb(35, 73, 109); font-weight: normal; font-style: normal; text-decoration: none; margin-bottom: 0px; padding: 10px 20px; line-height: 1.35; " class=" ">
                                              <p style="margin: 0px; text-size-adjust: 100%; " class=" "> <strong> &copy; Copyright 
                                              <a href="${process.env.APP_URL}">${process.env.APP_NAME}</a>
                                      </strong> All rights
                                      reserved.
                                              </p>
                                              
                                           </td>
                                        </tr>
                                     </tbody>
                                  </table>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </td>
             </tr>
          </tbody>
       </table>
    </div>
 </div>
 
 
     `;
    return mailcontent
 }

