import { Link } from "react-router-dom";
import {
    ArrowRight,
    Boxes,
    ChartColumn,
    HandCoins,
    Moon,
    ShieldCheck,
    Store,
    Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/useTheme";
import { TbBrandStocktwits } from "react-icons/tb";
import { useSelector } from "react-redux";

const features = [
    {
        title: "Real-time Stock Visibility",
        description:
            "Track product quantities, low-stock alerts, and warehouse movement in one dashboard.",
        icon: Boxes,
    },
    {
        title: "Purchases & Sales Tracking",
        description:
            "Record purchases and sales with clear history to understand daily business flow.",
        icon: HandCoins,
    },
    {
        title: "Brand & Firm Management",
        description:
            "Manage suppliers, brands, and product relations from a structured central panel.",
        icon: Store,
    },
    {
        title: "Actionable Insights",
        description:
            "Turn operations data into simple reports that support faster inventory decisions.",
        icon: ChartColumn,
    },
];

export default function Home() {
    const { theme, setTheme } = useTheme();
    const { currentUser } = useSelector((state) => state.auth);
    return (
        <main
            className="min-h-svh bg-cover bg-center bg-no-repeat text-foreground"
            style={{ backgroundImage: "url('/auth-bg.png')" }}>
            <section className="min-h-svh bg-background/10">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 md:px-10">
                    <header className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 md:px-6">
                        <div className="flex items-center gap-2 text-sm font-semibold md:text-base">
                            <TbBrandStocktwits size={25} className="text-primary" />

                            <span>Smart Stock System</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant={theme === "light" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTheme("light")}
                                aria-label="Switch to light mode">
                                <Sun className="size-4" />
                            </Button>
                            <Button
                                type="button"
                                variant={theme === "dark" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTheme("dark")}
                                aria-label="Switch to dark mode">
                                <Moon className="size-4" />
                            </Button>
                            {currentUser ? (
                                <Button asChild size="sm">
                                    <Link to="/stock">Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link to="/sign-in">Sign In</Link>
                                    </Button>
                                    <Button asChild size="sm">
                                        <Link to="/sign-up">Get Started</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </header>

                    <section className="grid gap-6 rounded-xl border bg-card p-6 md:grid-cols-2 md:p-10">
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Inventory Management Platform</p>
                            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                                Manage your stock with speed and clarity.
                            </h1>
                            <p className="text-muted-foreground md:text-lg">
                                Smart Stock System helps teams control inventory, monitor purchases and sales,
                                and keep operations organized from one place.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button asChild size="lg">
                                    <Link to="/sign-up">
                                        Create account
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link to="/sign-in">I already have an account</Link>
                                </Button>
                            </div>
                        </div>

                        <Card className="border-dashed">
                            <CardHeader>
                                <CardTitle>Why teams use Smart Stock</CardTitle>
                                <CardDescription>
                                    Keep your inventory workflow simple, auditable, and easier to scale.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>• Reduce manual stock mistakes with centralized records.</li>
                                    <li>• Monitor business movement across products and suppliers.</li>
                                    <li>• Prepare reports quickly for better purchasing decisions.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </section>

                    <Separator />

                    <section className="grid gap-4 md:grid-cols-2">
                        {features.map((feature) => (
                            <Card key={feature.title}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <feature.icon className="size-5 text-primary" />
                                        {feature.title}
                                    </CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </section>
                </div>
            </section>
        </main>
    );
}
