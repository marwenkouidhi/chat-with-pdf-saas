import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  GlobeIcon,
  ZapIcon,
  ServerCogIcon,
  MonitorIcon,
  EyeIcon,
  BrainCogIcon,
} from "lucide-react";

export default function Home() {
  const t = useTranslations("landingpage");

  const features = [
    {
      title: "title-feature1",
      description: "description-feature1",
      icon: GlobeIcon,
    },
    {
      title: "title-feature2",
      description: "description-feature2",
      icon: ZapIcon,
    },
    {
      title: "title-feature3",
      description: "description-feature3",
      icon: BrainCogIcon,
    },
    {
      title: "title-feature4",
      description: "description-feature4",
      icon: EyeIcon,
    },
    {
      title: "title-feature5",
      description: "description-feature5",
      icon: ServerCogIcon,
    },
    {
      title: "title-feature6",
      description: "description-feature6",
      icon: MonitorIcon,
    },
  ];
  return (
    <main className="p-2 lg:p-5 flex-1 bg-gradient-to-bl from-white to-indigo-600">
      <div className="p-24 lg:p-32 bg-white rounded-md drop-shadow-lg h-full space-y-16">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h2 className="text-base font-semibold text-indigo-600">{t("subtitle1")}</h2>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-gray-900">{t("title")}</h2>
          <p>{t("subtitle2")}</p>
          <p className="my-8 text-sm">{t("description")}</p>
          <Button>
            <Link href={"/dashboard"}>{t("cta")}</Link>
          </Button>
        </div>

        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl drop-shadow-2xl shadow-indigo-600">
          <Image
            alt="app-screenshot"
            src="https://i.imgur.com/VciRSTI.jpeg"
            width={2000}
            height={1400}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-5">
              <div className="">
                <feature.icon className="text-indigo-600 fill-indigo-200" />
              </div>
              <p className="text-sm">{t(feature.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
