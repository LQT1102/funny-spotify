import { getNestedObjectValue } from "@/src/utils/translation";
import { NextIntlProvider } from "next-intl";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface IMultipleLangWrapperProps {
    children: ReactNode;
}

const languages: { [key: string]: any } = {
    vi: require("/public/locales/vi/lang.json"),
    en: require("/public/locales/en/lang.json"),
};

export default function MultipleLangWrapper({
    children,
}: IMultipleLangWrapperProps) {
    const router = useRouter();
    const { locale = "", defaultLocale = "" } = router;
    const messages = languages[locale || ""];
    return (
        <NextIntlProvider
            messages={messages}
            locale={locale}
            onError={(error) => {
                //Uncomment to see the missing key error
                // console.log(error.originalMessage);
            }}
            getMessageFallback={({ namespace, key, error }) => {
                const path = [namespace, key]
                    .filter((part) => part != null)
                    .join(".");
                return getNestedObjectValue(languages.en, path);
            }}
            defaultTranslationValues={{
                defaultLocale: defaultLocale,
            }}
        >
            {children}
        </NextIntlProvider>
    );
}
