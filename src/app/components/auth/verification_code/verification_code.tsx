"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Card, CardHeader, CardBody, Button, Link, InputOtp } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import authAxios from "../../../../../helpers/utils";
import { CODE_VERIFY } from "../../../../../helpers/constants";

// Interface for form values
interface VerificationFormValues {
  verificationCode: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required").length(4, "Code must be exactly 4 digits"),
});

interface interfaceProps {
  initialUserRole: string | null;
  initialCompanyName: string | null;
}

export default function VerificationCode({ initialUserRole, initialCompanyName }: interfaceProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState<string>(initialUserRole || "");
  const [companyName, setCompanyName] = useState<string>(initialCompanyName || "");

  // Handle form submission
  const handleSubmit = async (
    values: VerificationFormValues,
    { setSubmitting }: FormikHelpers<VerificationFormValues>
  ) => {
    setError("");
    setSubmitting(true);

    try {
      console.log("Sending verification code:", values.verificationCode);
      const res = await authAxios.post(CODE_VERIFY, {
        verification_code: values.verificationCode,
      });

      console.log("Full response status:", res.status);
      console.log("Response data:", res.data);

      if (res.status === 200) {
        const { user_role, company_name } = res.data;

        console.log("User Role:", user_role);
        console.log("Company Name:", company_name);

        switch (user_role) {
          case "Company/Park":
            console.log("Attempting to navigate to /partner");
            setCompanyName(company_name);
            router.push("/partner");
            break;
          case "Сlinet":
            console.log("Attempting to navigate to /client");
            setUserRole(user_role);
            setCompanyName(company_name);
            router.push("/client");
            break;
          default:
            console.log("Attempting to navigate to root");
            router.push("/");
        }
      }
    } catch (err: unknown) {
      console.error("Full error object:", err);
      const errorMessage = err instanceof Error ? err.message : "Verification failed";
      console.error("Error message:", errorMessage);
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-[350px] h-[400px] max-w-md p-4">
          <CardHeader className="flex justify-center mt-5">
            <h2 className="w-[286px] h-[67px] text-center text-white text-2xl font-normal leading-[29px]">
              Перейдите в Telegram для получения кода
            </h2>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={{ verificationCode: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form className="flex flex-col justify-between gap-5 overflow-hidden">
                  <div className="flex justify-center">
                    <Field name="verificationCode">
                      {() => (
                        <InputOtp
                          value={values.verificationCode}
                          onValueChange={(val) => setFieldValue("verificationCode", val)}
                          maxLength={4}
                          color={errors.verificationCode && touched.verificationCode ? "danger" : "default"}
                          errorMessage={
                            errors.verificationCode && touched.verificationCode ? errors.verificationCode : error
                          }
                          size="lg"
                        />
                      )}
                    </Field>
                  </div>
                  <div className="flex">
                    <Button
                      fullWidth
                      type="submit"
                      className="mt-5 text-xl"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      color="primary"
                      variant="shadow"
                    >
                      Войти
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flex justify-center">
              <Link href="https://t.me/roxo2024_bot" target="_blank" color="primary">
                <Image src="/images/telegram-icon.png" alt="Telegram" width={48} height={48} className="m-5" />
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
