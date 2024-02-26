exports.VERIFYMAILHTML=(otpCode)=>{
    return  `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Doğrulama E postası Mobil Şube</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
    
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .content {
                background-color: #ffffff;
                padding: 40px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
    
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #888888;
            }
    
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                padding: 20px;
                background-color: #f0f0f0;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Doğrulama Kodu</h1>
            </div>
            <div class="content">
                <p>Mehaba</p>
                <p>Hesabınızı doğrulamak için aşağıdaki OTP (Tek Kullanımlık Şifre) kodunu kullanabilirsiniz</p>
                <div class="otp-code">${otpCode}</div>
                <p>Bu kod yalnızca bir kez kullanılabilir ve 10 dakika boyunca geçerlidir.</p>
                <p>İyi günler dileriz!</p>
            </div>
            <div class="footer">
                <p>Mobil Şube</p>
            </div>
        </div>
    </body>
    </html>`
}
