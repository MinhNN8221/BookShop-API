import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendNewPassword = async (email, newPass) => {
    const msg = {
      to: `${email}`,
      from: 'anhshop@yopmail.com',
      subject: 'Mật khẩu mới trên hệ thống AnhShop',
      html: `<p>Mật khẩu mới của bạn là: ${newPass}</p>`,
    };
    await sgMail.send(msg);
}

export default sendNewPassword;