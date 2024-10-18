import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: false,
    });
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

    try {
      // TODO: Better copy and layout for the email
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Verify your email address',
        html: `
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
      });
    } catch (error) {
      throw new Error('Failed to send verification email: ' + error);
    }
  }
}
