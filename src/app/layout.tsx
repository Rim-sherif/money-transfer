import "@/styles/globals.css";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar"
export const metadata = {
  title: 'Ta7wila',
  description: 'Generated by Next.js',
}
import AppProvider from "@/components/client";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <html lang="en">
      <body className="bg-black">
        <AppProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset style={{
              backgroundImage: "url('/Dashboard.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}>
              <Header />
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  )
}
