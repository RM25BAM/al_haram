"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useFooterTranslations } from "@/hooks/use-translations";
import { Mail, Phone, BookOpen, HelpCircle, ExternalLink } from "lucide-react";
export function DashboardFooter() {
  const t = useFooterTranslations();

  return (
    <footer className="border-t border-[#b99751]">
      <div className="mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resources & Guidance */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t("resourcesGuidance")}
            </h3>
            <div className="flex flex-col space-y-2">
              <Button variant="link" className="text-muted-foreground h-auto p-0 justify-start" asChild>
                <Link href="#" className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-3 w-3" />
                  {t("userManual")}
                </Link>
              </Button>
              <Button variant="link" className="text-muted-foreground h-auto p-0 justify-start" asChild>
                <Link href="#" className="flex items-center gap-2 text-sm">
                  <HelpCircle className="h-3 w-3" />
                  {t("searchFaqs")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">
              {t("contactSupport")}
            </h3>
            <div className="flex flex-col space-y-2">
              <Button variant="link" className="text-muted-foreground h-auto p-0 justify-start" asChild>
                <Link
                  href="mailto:it.support@haram-waste.sa"
                  className="flex items-center gap-2 text-sm"
                >
                  <Mail className="h-3 w-3" />
                  it.support@haram-waste.sa
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </Link>
              </Button>
              <Button variant="link" className="text-muted-foreground h-auto p-0 justify-start" asChild>
                <Link
                  href="tel:9200-3342"
                  className="flex items-center gap-2 text-sm"
                >
                  <Phone className="h-3 w-3" />
                  {t("phoneInternal")}
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Affiliated Authorities */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">
              {t("affiliatedAuthorities")}
            </h3>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                • {t("ministryHajjUmrah")}
              </p>
              <p className="text-xs text-muted-foreground">
                • {t("royalCommission")}
              </p>
              <p className="text-xs text-muted-foreground">
                • {t("nationalCenterWaste")}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>{t("copyright")}</p>
          <p className="mt-2 sm:mt-0">{t("builtFor")}</p>
        </div>
      </div>
    </footer>

  );
}