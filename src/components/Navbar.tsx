"use client";
import { LogIn, LogOut, MenuIcon, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar5 = () => {
  const { status } = useSession();

  return (
    <section className="py-4 shadow mb-3">
      <div className="container px-4 md:px-0 mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                className="max-h-8"
                alt="Shadcn UI Navbar"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Note App
              </span>
            </Link>
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    {status === "authenticated" ? (
                      <Link href={"/"}>Home</Link>
                    ) : (
                      ""
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {status === "unauthenticated" ? (
            <div className="hidden items-center gap-4 lg:flex">
              <Button asChild variant="outline">
                <Link href={"../../login"}><LogIn /> Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="../../register"><UserPlus /> Sign up</Link>
              </Button>
            </div>
          ) : (
            <Button
              className="invisible lg:visible"
              variant={"outline"}
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut />
              Sign Out
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      Note App
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {status === "authenticated" ? (
                    <Link href="/" className="font-medium">
                      Home
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                {status === "unauthenticated" ? (
                  <div className="mt-6 flex flex-col gap-4">
                    <Button asChild variant="outline">
                      <Link href={"../../login"}><LogIn /> Sign in</Link>
                    </Button>
                    <Button asChild>
                      <Link href="../../register"><UserPlus /> Sign up</Link>
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant={"outline"}
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar5 };
