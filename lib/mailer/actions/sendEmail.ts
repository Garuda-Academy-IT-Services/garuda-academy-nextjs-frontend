'use server'

import { SignupConfirmationTemplate } from '@/components/email-templates/signup-confirmation.template';
import { siteConfig } from '@/config/site-config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const mandatoryFields = ['to', 'subject', 'name'] as const;

export type SendEmailRequest = {
    [key in typeof mandatoryFields[number]]: string;
};

export async function sendEmail(props: SendEmailRequest) {
    if (!mandatoryFields.every((field) => field in props)) {
        throw new Error('Missing mandatory fields');
    }

    try {
        const { data, error } = await resend.emails.send({
            from: `${siteConfig.name} <${siteConfig.emails.onboarding}>`,
            to: [props.to],
            subject: props.subject,
            react: SignupConfirmationTemplate({ name: props.name }),
        });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}