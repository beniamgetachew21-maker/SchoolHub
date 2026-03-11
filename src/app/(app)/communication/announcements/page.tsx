
"use client"
import * as React from "react"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { getAnnouncements, type Announcement } from "@/app/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(getAnnouncements());
  const [newTitle, setNewTitle] = React.useState("");
  const [newContent, setNewContent] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<Announcement['category']>("General");

  const handlePostAnnouncement = () => {
    if (!newTitle || !newContent) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide a title and content for the announcement.",
        });
        return;
    }

    const newAnnouncement: Announcement = {
        id: announcements.length + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString().split('T')[0], // a YYYY-MM-DD format
        postedBy: "Admin", // In a real app, this would come from user session
        category: newCategory,
        dueDate: newCategory === 'Homework' ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle("");
    setNewContent("");
    setNewCategory("General");

    toast({
        title: "Announcement Posted",
        description: "Your announcement has been successfully posted.",
    });
  }
  
  const filteredAnnouncements = (category: Announcement['category'] | 'All') => {
    if (category === 'All') return announcements;
    return announcements.filter(a => a.category === category);
  }


  return (
    <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Announcements & Homework</CardTitle>
                    <CardDescription>
                        View recent announcements, homework, and exam details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <Tabs defaultValue="all">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="homework">Homework</TabsTrigger>
                             <TabsTrigger value="exam">Exams</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="pt-6">
                            <AnnouncementList announcements={filteredAnnouncements('All')} />
                        </TabsContent>
                        <TabsContent value="general" className="pt-6">
                             <AnnouncementList announcements={filteredAnnouncements('General')} />
                        </TabsContent>
                        <TabsContent value="homework" className="pt-6">
                             <AnnouncementList announcements={filteredAnnouncements('Homework')} />
                        </TabsContent>
                         <TabsContent value="exam" className="pt-6">
                             <AnnouncementList announcements={filteredAnnouncements('Exam')} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">New Post</CardTitle>
                    <CardDescription>Create and post a new message for students or staff.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={newCategory} onValueChange={(value) => setNewCategory(value as Announcement['category'])}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="General">General Announcement</SelectItem>
                                <SelectItem value="Homework">Homework</SelectItem>
                                <SelectItem value="Exam">Exam Schedule</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                            id="title" 
                            placeholder="Enter title" 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea 
                            id="content" 
                            placeholder="Enter details" 
                            rows={6}
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                    </div>
                    <Button className="w-full" onClick={handlePostAnnouncement}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}


function AnnouncementList({ announcements }: { announcements: Announcement[] }) {
    const getCategoryBadge = (category: Announcement['category']) => {
        switch(category) {
            case 'Homework': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Homework</Badge>;
            case 'Exam': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Exam</Badge>;
            default: return <Badge variant="secondary">General</Badge>;
        }
    }

    return (
        <div className="space-y-8">
            {announcements.map((ann, index) => (
                <div key={ann.id}>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                             {getCategoryBadge(ann.category)}
                             <h3 className="text-lg font-semibold">{ann.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">{new Date(ann.date).toLocaleDateString()}</p>
                    </div>
                     <div className="pl-9">
                        <p className="text-sm text-muted-foreground mb-2">Posted by: {ann.postedBy}</p>
                        <p className="text-sm">{ann.content}</p>
                        {ann.category === 'Homework' && ann.dueDate && (
                            <p className="text-xs text-destructive font-medium mt-2">Due Date: {new Date(ann.dueDate).toLocaleDateString()}</p>
                        )}
                     </div>
                     {index < announcements.length -1 && <Separator className="mt-6" />}
                </div>
            ))}
             {announcements.length === 0 && (
                <div className="text-center text-muted-foreground py-16">
                    <p>No announcements in this category.</p>
                </div>
             )}
        </div>
    )
}
