import { SignupConfirmationTemplate } from '@/components/email-templates/signup-confirmation.template';
import { siteConfig } from '@/config/site-config';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const mandatoryFields = ['to', 'subject', 'name'];

export async function POST(request: NextRequest) {
    const sendEmailRequest = await request.json();

    if (!mandatoryFields.every((field) => field in sendEmailRequest)) {
        return Response.json({ error: 'Missing mandatory fields' }, { status: 400 });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: `${siteConfig.name} <${siteConfig.emails.onboarding}>`,
            to: [sendEmailRequest.to],
            subject: sendEmailRequest.subject,
            react: SignupConfirmationTemplate({ name: sendEmailRequest.name }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
