import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
export default function Home() {
  const t = useTranslations("landingpage");

  return (
    <main className="p-2 lg:p-5 flex-1 bg-gradient-to-bl from-white to-indigo-600">
      <div className="p-24 lg:p-32 bg-white rounded-md drop-shadow-lg">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h2 className="text-base font-semibold text-indigo-600">{t("subtitle1")}</h2>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-gray-900">{t("title")}</h2>
          <p>{t("subtitle2")}</p>
          <p className="my-8 text-sm">{t("description")}</p>
          <Button>
            <Link href={"/dashboard"}>{t("cta")}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
