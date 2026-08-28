import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "../ui/sidebar"
import { Button } from "../ui/button"
import { useTheme } from "../theme-provider";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Bell } from "lucide-react";

export default function NavHeader() {

    const { setTheme, theme } = useTheme();

    return (
        <header className=" bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="gap-3">
                    <SidebarTrigger />
                    <Separator orientation="vertical" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="text-center">
                            <h1 className="text-lg font-semibold text-foreground">
                                Stock Management
                            </h1>
                            {/* <p className="text-xs text-muted-foreground">System</p> */}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        {theme === "light" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
