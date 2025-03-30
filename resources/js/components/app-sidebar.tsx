import { usePage } from '@inertiajs/react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookMarked, GraduationCap , UsersRound, Folder, LayoutDashboard, Newspaper} from 'lucide-react';
import AppLogo from './app-logo';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

// ✅ Extender de Inertia.PageProps para evitar el error
interface PageProps extends InertiaPageProps {
    auth?: {
        user?: {
            roles?: string[];
        };
    };
}

export function AppSidebar() { 
    // ✅ Obtener datos del usuario desde Inertia.js
    const { props } = usePage<PageProps>(); 

    const userRoles = props.auth?.user?.roles ?? []; // Garantiza que siempre sea un array

    // Función para determinar el rol principal (el primer rol)
    const userRole = userRoles.length > 0 ? userRoles[0] : 'Egresado';

    // Configuración del sidebar según el rol
    const navItemsByRole: Record<string, NavItem[]> = {
        Administrador: [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { title: 'Users', href: '/users', icon: UsersRound },
        ],
        Coordinador: [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { title: 'News', href: '/news', icon: Newspaper },
        ],
        Egresado: [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { title: 'Basic Information', href: '/basicInformation', icon: BookMarked },
            { title: 'Academic information', href: '/academicInformation', icon: GraduationCap }

        ],
    };

    const mainNavItems = navItemsByRole[userRole] || navItemsByRole['Egresado'];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={[]} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
