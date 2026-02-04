import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, DollarSign, Users, TrendingUp, CheckCircle2, Circle, AlertCircle, Plus, Settings, Pencil, FolderKanban, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - in real app, fetch based on project ID
const projectData = {
  name: "Website Redesign",
  client: "Acme Corp",
  status: "In Progress",
  progress: 65,
  budget: "$45,000",
  spent: "$29,250",
  deadline: "Dec 31, 2024",
  startDate: "Oct 1, 2024",
  description: "Complete website redesign with modern UI/UX and improved performance",
  team: [
    { name: "Sarah Chen", role: "Lead Designer", avatar: "/placeholder.svg", initials: "SC" },
    { name: "Mike Johnson", role: "Developer", avatar: "/placeholder.svg", initials: "MJ" },
    { name: "Emma Wilson", role: "Project Manager", avatar: "/placeholder.svg", initials: "EW" },
    { name: "Alex Brown", role: "QA Tester", avatar: "/placeholder.svg", initials: "AB" },
  ],
  stats: {
    totalTasks: 48,
    completed: 31,
    inProgress: 12,
    pending: 5,
    hoursLogged: 287,
    estimatedHours: 440,
  },
  tasks: [
    { id: 1, title: "Design homepage mockup", status: "completed", assignee: "SC", date: "Nov 20" },
    { id: 2, title: "Implement responsive navigation", status: "in-progress", assignee: "MJ", date: "Nov 25" },
    { id: 3, title: "User testing round 2", status: "in-progress", assignee: "EW", date: "Nov 28" },
    { id: 4, title: "Performance optimization", status: "pending", assignee: "MJ", date: "Dec 5" },
    { id: 5, title: "Final QA review", status: "pending", assignee: "AB", date: "Dec 15" },
  ],
  recentActivity: [
    { action: "Completed task", detail: "Homepage design approved", time: "2 hours ago", user: "SC" },
    { action: "Updated milestone", detail: "Phase 2 kickoff", time: "5 hours ago", user: "EW" },
    { action: "Logged time", detail: "8 hours on development", time: "1 day ago", user: "MJ" },
  ],
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const budgetPercentage = (parseFloat(projectData.spent.replace(/[$,]/g, "")) / parseFloat(projectData.budget.replace(/[$,]/g, ""))) * 100;
  const timePercentage = (projectData.stats.hoursLogged / projectData.stats.estimatedHours) * 100;

  const cardColors = ["bg-card-pink", "bg-card-green", "bg-card-yellow", "bg-card-blue"];
  const taskColors = ["bg-card-green", "bg-card-blue", "bg-card-pink", "bg-card-lavender", "bg-card-yellow"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/projects")}
            className="mt-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{projectData.name}</h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="text-sm">Client: {projectData.client}</span>
              <span className="text-sm">•</span>
              <Badge variant="yellow">{projectData.status}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Pencil className="w-4 h-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <UserPlus className="w-4 h-4" />
                Add Team Member
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FolderKanban className="w-4 h-4" />
                Manage Workspace
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Clock className="w-4 h-4" />
                Log Time
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-card-pink rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">{projectData.progress}%</span>
          </div>
          <p className="text-sm font-semibold text-foreground/80 mb-3">Project Progress</p>
          <div className="h-2.5 bg-white/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground/70 rounded-full transition-all duration-500"
              style={{ width: `${projectData.progress}%` }}
            />
          </div>
        </div>

        <div className="bg-card-green rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">{projectData.stats.completed}/{projectData.stats.totalTasks}</span>
          </div>
          <p className="text-sm font-semibold text-foreground/80 mb-3">Tasks Completed</p>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-white/50 border-0 text-xs font-semibold">{projectData.stats.inProgress} active</Badge>
            <Badge variant="outline" className="bg-white/50 border-0 text-xs font-semibold">{projectData.stats.pending} pending</Badge>
          </div>
        </div>

        <div className="bg-card-yellow rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">{projectData.stats.hoursLogged}h</span>
          </div>
          <p className="text-sm font-semibold text-foreground/80 mb-3">Hours Logged</p>
          <div className="h-2.5 bg-white/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground/70 rounded-full transition-all duration-500"
              style={{ width: `${timePercentage}%` }}
            />
          </div>
          <p className="text-xs text-foreground/60 mt-2 font-medium">of {projectData.stats.estimatedHours}h estimated</p>
        </div>

        <div className="bg-card-blue rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">{projectData.spent}</span>
          </div>
          <p className="text-sm font-semibold text-foreground/80 mb-3">Budget Spent</p>
          <div className="h-2.5 bg-white/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground/70 rounded-full transition-all duration-500"
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
          <p className="text-xs text-foreground/60 mt-2 font-medium">of {projectData.budget} budget</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-xl">Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{projectData.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card-green">
                  <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 font-medium">Start Date</p>
                    <p className="text-sm font-bold text-foreground">{projectData.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card-pink">
                  <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 font-medium">Deadline</p>
                    <p className="text-sm font-bold text-foreground">{projectData.deadline}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Status */}
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Task Status</CardTitle>
              <Button variant="secondary" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projectData.tasks.map((task, index) => (
                  <div key={task.id} className={`flex items-center justify-between p-4 rounded-xl ${taskColors[index % taskColors.length]} hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-pointer`}>
                    <div className="flex items-center gap-3 flex-1">
                      {task.status === "completed" ? (
                        <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-foreground" />
                        </div>
                      ) : task.status === "in-progress" ? (
                        <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center">
                          <Circle className="w-5 h-5 text-foreground" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{task.title}</p>
                        <p className="text-xs text-foreground/60 font-medium">Due: {task.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 border-2 border-white/60">
                        <AvatarFallback className="text-xs font-bold text-foreground bg-white/50">{task.assignee}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-card-lavender">{activity.user}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.detail}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Team & Stats */}
        <div className="space-y-6">
          {/* Team Members */}
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Team</CardTitle>
              <Button variant="secondary" size="sm">
                <Users className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projectData.team.map((member, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-xl ${cardColors[index % cardColors.length]} hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-pointer`}>
                    <Avatar className="w-11 h-11 border-2 border-white/60">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-white/50 text-sm font-bold text-foreground">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{member.name}</p>
                      <p className="text-xs text-foreground/60 font-medium">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Task Distribution */}
          <Card variant="blue">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Task Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold flex items-center gap-2 text-foreground">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      Completed
                    </span>
                    <span className="text-sm font-bold text-foreground">{projectData.stats.completed}</span>
                  </div>
                  <div className="h-2.5 bg-white/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success rounded-full transition-all duration-500"
                      style={{ width: `${(projectData.stats.completed / projectData.stats.totalTasks) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold flex items-center gap-2 text-foreground">
                      <div className="w-3 h-3 rounded-full bg-chart-amber" />
                      In Progress
                    </span>
                    <span className="text-sm font-bold text-foreground">{projectData.stats.inProgress}</span>
                  </div>
                  <div className="h-2.5 bg-white/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-chart-amber rounded-full transition-all duration-500"
                      style={{ width: `${(projectData.stats.inProgress / projectData.stats.totalTasks) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold flex items-center gap-2 text-foreground">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      Pending
                    </span>
                    <span className="text-sm font-bold text-foreground">{projectData.stats.pending}</span>
                  </div>
                  <div className="h-2.5 bg-white/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-muted-foreground rounded-full transition-all duration-500"
                      style={{ width: `${(projectData.stats.pending / projectData.stats.totalTasks) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Tracking Summary */}
          <Card variant="pink">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-foreground">{projectData.stats.hoursLogged}h</p>
                  <p className="text-sm text-foreground/60">of {projectData.stats.estimatedHours}h estimated</p>
                </div>
                
                <div className="h-3 bg-white/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-foreground/70 rounded-full transition-all duration-500"
                    style={{ width: `${timePercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/40 text-center">
                    <p className="text-lg font-bold text-foreground">{projectData.stats.estimatedHours - projectData.stats.hoursLogged}h</p>
                    <p className="text-xs text-foreground/60">Remaining</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/40 text-center">
                    <p className="text-lg font-bold text-foreground">{Math.round(timePercentage)}%</p>
                    <p className="text-xs text-foreground/60">Complete</p>
                  </div>
                </div>

                <Button className="w-full" variant="default">
                  <Clock className="w-4 h-4 mr-2" />
                  Log Time
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
