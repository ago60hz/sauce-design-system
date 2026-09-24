import * as React from "react"
import { AlertCircle, CheckCircle2, Mic, Pause, Play, Plus } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/elevenlabs-ui/ui/alert"
import { Avatar, AvatarFallback } from "@/registry/elevenlabs-ui/ui/avatar"
import { Badge } from "@/registry/elevenlabs-ui/ui/badge"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/elevenlabs-ui/ui/card"
import { Checkbox } from "@/registry/elevenlabs-ui/ui/checkbox"
import { Input } from "@/registry/elevenlabs-ui/ui/input"
import { Label } from "@/registry/elevenlabs-ui/ui/label"
import { Progress } from "@/registry/elevenlabs-ui/ui/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/elevenlabs-ui/ui/radio-group"
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/registry/elevenlabs-ui/ui/select"
import { Separator } from "@/registry/elevenlabs-ui/ui/separator"
import { Skeleton } from "@/registry/elevenlabs-ui/ui/skeleton"
import { Switch } from "@/registry/elevenlabs-ui/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/elevenlabs-ui/ui/tabs"
import { Textarea } from "@/registry/elevenlabs-ui/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/elevenlabs-ui/ui/toggle-group"

function Frame({
  id,
  title,
  className,
  children,
}: {
  id: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`frame ${className ?? ""}`} id={id}>
      <h2 className="frame-title">{title}</h2>
      <div className="bg-background text-foreground flex flex-col gap-6 rounded-xl border p-6 font-sans">
        {children}
      </div>
    </section>
  )
}

export function Preview() {
  return (
    <div className="canvas">
      <Frame id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Create agent</Button>
          <Button variant="secondary">Duplicate</Button>
          <Button variant="outline">Export</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete agent</Button>
          <Button variant="link">View docs</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">
            <Plus /> Small
          </Button>
          <Button>
            <Play /> Play sample
          </Button>
          <Button size="lg">Start call</Button>
          <Button size="icon" variant="outline" aria-label="Record">
            <Mic />
          </Button>
          <Button disabled>
            <Pause /> Disabled
          </Button>
        </div>
      </Frame>

      <Frame id="form" title="Form">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold">New voice agent</h3>
          <p className="text-muted-foreground text-sm">
            Answers support calls around the clock.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="agent-name">Agent name</Label>
            <Input id="agent-name" defaultValue="Support line" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agent-email">Alerts email (optional)</Label>
            <Input id="agent-email" type="email" placeholder="team@sauce.dev" />
          </div>
          <div className="grid gap-2">
            <Label>Voice</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rachel · warm, calm" />
              </SelectTrigger>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agent-invalid">Phone number</Label>
            <Input id="agent-invalid" defaultValue="+234 80" aria-invalid />
            <p className="text-destructive text-sm">
              Enter the full number, including area code.
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="agent-greeting">First message</Label>
          <Textarea
            id="agent-greeting"
            defaultValue="Hi, you've reached Sauce support. How can I help today?"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-10">
          <div className="flex items-center gap-3">
            <Switch id="agent-record" defaultChecked />
            <Label htmlFor="agent-record">Record calls</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="agent-share" defaultChecked />
            <Label htmlFor="agent-share">Share transcripts with team</Label>
          </div>
          <RadioGroup defaultValue="low" className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="low" id="latency-low" />
              <Label htmlFor="latency-low">Low latency</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="balanced" id="latency-balanced" />
              <Label htmlFor="latency-balanced">Balanced</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Create agent</Button>
        </div>
      </Frame>

      <Frame id="cards" title="Cards and badges">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Support line</CardTitle>
              <CardDescription>Last call 4 minutes ago</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums">
                  1,284
                </span>
                <span className="text-muted-foreground text-sm">
                  calls this week
                </span>
              </div>
              <Progress value={64} aria-label="Monthly minutes used" />
              <p className="text-muted-foreground text-xs">
                64% of monthly minutes used
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Open agent</Button>
              <Button size="sm" variant="ghost">
                Settings
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Agent status</CardTitle>
              <CardDescription>One badge per state</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Live</Badge>
                <Badge variant="secondary">Draft</Badge>
                <Badge variant="outline">Paused</Badge>
                <Badge variant="destructive">Failed</Badge>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Ada Okafor</span>
                  <span className="text-muted-foreground text-xs">Owner</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Frame>

      <Frame id="feedback" title="Alerts">
        <Alert>
          <CheckCircle2 />
          <AlertTitle>Transcript ready</AlertTitle>
          <AlertDescription>
            The call with +234 803 555 0142 was transcribed in 12 seconds.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Microphone blocked</AlertTitle>
          <AlertDescription>
            Allow microphone access in your browser settings, then try again.
          </AlertDescription>
        </Alert>
      </Frame>

      <Frame id="navigation" title="Tabs and toggles">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="text-muted-foreground pt-2 text-sm"
          >
            Average call length is 3m 42s, down 8% from last week.
          </TabsContent>
        </Tabs>
        <ToggleGroup type="single" defaultValue="week" variant="outline">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      </Frame>

      <Frame id="charts" title="Charts and code">
        <div
          className="flex h-32 items-end gap-3"
          aria-label="Chart colors 1 to 5"
        >
          <div className="bg-chart-1 h-[45%] flex-1 rounded-t-md" />
          <div className="bg-chart-2 h-[70%] flex-1 rounded-t-md" />
          <div className="bg-chart-3 h-[100%] flex-1 rounded-t-md" />
          <div className="bg-chart-4 h-[60%] flex-1 rounded-t-md" />
          <div className="bg-chart-5 h-[35%] flex-1 rounded-t-md" />
        </div>
        <pre className="bg-code text-code-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm">
          <code>
            {"npx shadcn@latest add "}
            <span className="text-code-number">./r/orb.json</span>
          </code>
        </pre>
      </Frame>
    </div>
  )
}
