
"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, History, UserPlus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { getSubscriberLists, getNewsletters, sendNewsletter, type Newsletter } from "@/app/lib/data"
import Link from "next/link"

export default function NewsletterPage() {
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [selectedList, setSelectedList] = React.useState("")
  const [history, setHistory] = React.useState<Newsletter[]>(getNewsletters())

  const subscriberLists = getSubscriberLists();

  const refreshHistory = () => {
    setHistory(getNewsletters());
  }

  const handleSendNewsletter = () => {
    if (!title || !content || !selectedList) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields before sending.",
      });
      return;
    }

    sendNewsletter({
      title,
      content,
      listId: selectedList,
    });

    toast({
      title: "Newsletter Sent",
      description: "Your newsletter has been queued for delivery.",
    });

    setTitle("");
    setContent("");
    setSelectedList("");
    refreshHistory();
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Create Newsletter</CardTitle>
            <CardDescription>
              Compose and send a newsletter to selected subscriber lists.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Newsletter Subject / Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Start writing your newsletter here..."
              className="h-96"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Send to:</p>
                <Select onValueChange={setSelectedList} value={selectedList}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select a subscriber list" />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriberLists.map(list => (
                      <SelectItem key={list.id} value={list.id}>{list.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSendNewsletter}>
                <Send className="mr-2 h-4 w-4" />
                Send Newsletter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Subscribers
            </CardTitle>
            <CardDescription>Manage your mailing lists.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/communication/subscribers">Manage Subscribers</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <History className="h-5 w-5" />
              History
            </CardTitle>
            <CardDescription>View previously sent newsletters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {history.length > 0 ? history.map(nl => (
              <div key={nl.id} className="text-sm p-2 rounded-md hover:bg-muted/50 border-b last:border-0 pb-3">
                <p className="font-medium">{nl.title}</p>
                <p className="text-xs text-muted-foreground my-1 line-clamp-2">{nl.content}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                  {new Date(nl.date).toLocaleDateString()} • {nl.recipients} recipients
                </p>
              </div>
            )) : (
              <p className="text-sm text-center text-muted-foreground py-4">No newsletter history found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
