import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
        {t("back")} to homepage
      </Link>
    </div>
  );
}
