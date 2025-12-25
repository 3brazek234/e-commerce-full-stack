"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Shadcn UI Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react"; // أيقونات (اختياري)
import { logoutAction } from "@/app/actions/auth";

export function UserNav() {
  const { user, logout } = useAuth(); // بيانات اليوزر ودالة الخروج من الكونتكست
  const router = useRouter();

  // حماية إضافية: لو مفيش يوزر، منعرضش حاجة (مع إن الهيدر بيعمل ده)
  if (!user) return null;

  // دالة استخراج أول حرفين من الاسم للـ Fallback
  // مثلاً "Ahmed Ali" تبقى "AA"
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";


  const handleLogout = async () => {
 
    await logoutAction();
    logout();
    router.push("/"); 
    router.refresh(); 
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
             <AvatarImage src="https://github.com/shadcn.png" alt={user.name} /> 
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {/* محتوى القائمة */}
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* جزء معلومات اليوزر */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* روابط إضافية (بروفايل، إعدادات) */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        {/* زرار تسجيل الخروج */}
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}