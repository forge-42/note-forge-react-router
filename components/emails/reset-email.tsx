import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
  requestTime: string;
}

const PasswordResetEmail = ({
  userName,
  resetUrl,
  requestTime,
}: PasswordResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Reset Your Password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi {userName},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                We received a request to reset your password {requestTime}. If
                you made this request, click the button below to create a new
                password.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                This password reset link will expire in 1 hour for your
                security.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-red-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border hover:bg-red-700"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                {resetUrl}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Security Notice */}
            <Section className="mb-[24px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                <strong>Security Notice:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                • If you didn&apos;t request a password reset, please ignore
                this email. Your password will remain unchanged.
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                • For your security, this link can only be used once and expires
                in 1 hour.
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                • If you continue to receive these emails, please contact our
                support team immediately.
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="bg-gray-50 p-[20px] rounded-[6px] mb-[24px]">
              <Text className="text-[14px] text-gray-700 leading-[20px] mb-[8px] font-semibold">
                Need Help?
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                If you&apos;re having trouble with your password reset, please
                contact our support team at support@yourcompany.com or visit our
                help center.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                This email was sent by Your Company Name
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
