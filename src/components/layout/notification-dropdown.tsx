"use client";

import { Bell, Check, Trash2, Clock, Info, AlertTriangle, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { getMyNotificationsAction, markNotificationAsReadAction, markAllNotificationsAsReadAction } from "@/lib/notification-actions";
import { formatDistanceToNow } from "date-fns";

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    const res = await getMyNotificationsAction();
    if (res.success && res.data) {
      setNotifications(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
    // Refresh every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsReadAction(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsReadAction();
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white hover:bg-white/10 relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-[#172D13]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <DropdownMenuLabel className="p-0 font-bold">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[350px]">
          {loading && notifications.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center opacity-40">
                <Bell className="h-12 w-12 mb-4 text-slate-300" />
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs">No new notifications for you right now.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex flex-col p-4 border-b hover:bg-slate-50 transition-colors cursor-pointer relative group ${notification.isRead ? 'opacity-60' : 'bg-emerald-50/30'}`}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notification.isRead ? 'bg-transparent' : 'bg-emerald-500'}`} />
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm leading-none ${notification.isRead ? 'font-medium' : 'font-bold'}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] font-medium text-slate-400">
                           {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <button 
                        className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                        }}
                    >
                        <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator className="m-0" />
        <Button variant="ghost" className="w-full rounded-none h-12 text-xs font-bold text-slate-500 hover:text-emerald-600">
          View All Notifications
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
