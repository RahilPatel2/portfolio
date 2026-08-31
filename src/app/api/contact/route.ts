import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.warn("EMAIL_USER or EMAIL_APP_PASSWORD not set in environment. Logging message instead of sending.");
      console.log("New Contact Message:", message);
      // We simulate a tiny delay to show the cinematic loading state
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, warning: 'Emails are logged locally due to missing env variables.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'rahilpatel1199@gmail.com',
      subject: 'New Message from Portfolio',
      text: message,
      html: `<p>You have received a new message from your portfolio contact form:</p><blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0; font-style: italic;">${message.replace(/\n/g, '<br/>')}</blockquote>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
