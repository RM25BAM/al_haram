"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardLayout, DashboardMain } from "@/components/dashboard/layout";
import { DashboardTabs } from "@/components/dashboard/tabs";
import { DashboardModals } from "@/components/dashboard/modals";
import { DashboardFooter } from "@/components/dashboard/footer";
import { DashboardStats } from "@/components/dashboard-stats";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />

      <DashboardMain>
        <DashboardStats />
        <DashboardTabs />
      </DashboardMain>

      <DashboardFooter />
      <DashboardModals />
    </DashboardLayout>
  );
}
