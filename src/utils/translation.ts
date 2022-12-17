import { useTranslations as useNextIntl } from "next-intl";
import lang from "../../public/locales/en/lang.json";

export interface IAppProps {}

export default function useTranslations<T extends object = typeof lang>(
  nestedKey?: NestedKeyOf<typeof lang>
) {
  const t = useNextIntl(nestedKey);

  return (key: NestedKeyOf<T>, values?: Record<string, any>) =>
    // @ts-ignore
    t(key, values);
}

export const getNestedObjectValue: any = (o: any, nestedKey: string) => {
  const keyArr = nestedKey.split(".");
  if (typeof o !== "object" || keyArr.length === 0) return o;

  if (
    o &&
    o[keyArr[0]] &&
    typeof o === "object" &&
    typeof o[keyArr[0]] === "object" &&
    keyArr.length > 1
  ) {
    return getNestedObjectValue(o[keyArr[0]], keyArr.splice(1, keyArr.length).join("."));
  }

  return o[keyArr[0]];
};
