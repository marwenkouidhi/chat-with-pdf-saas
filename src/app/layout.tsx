import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";

interface IProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<IProps>) => {
  const locale = await getLocale();

  return (
    <ClerkProvider>
      <NextIntlClientProvider>
        <html lang={locale}>
          <body className="">{children}</body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
