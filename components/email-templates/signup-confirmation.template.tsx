interface EmailTemplateProps {
    name: string;
}

export const SignupConfirmationTemplate = ({ name }: EmailTemplateProps) => (
    <div>
        <h3>Welcome, {name}!</h3>
    </div>
);
