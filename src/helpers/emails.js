import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const orderEmail = async (user, details) => {
  const msg = {
    to: `${user.email}`,
    from: 'anhshop@yopmail.com',
    subject: 'Đơn hàng của bạn đã được đặt thành công',
    html: `<strong>Cảm ơn bạn vì đã đặt hàng</strong>
    <p>Sau đây là thông tin chi tiết của đơn hàng</p>
    <p>Số lượng : ${details[0].total_amount}</p>
    <p>Phương thức giao hàng : ${details[0].shipping_type}</p>
    <p>Phí giao hàng : ${details[0].shipping_cost}</p>
    <p>Loại thuế : ${details[0].tax_type}</p>
    <p>Phần trăm thuế : ${details[0].tax_percentage}</p>
    `,
  };
  await sgMail.send(msg);
};

export default orderEmail;
