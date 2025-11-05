import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, DollarSign, Users, TrendingUp, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
              <Badge variant="secondary">{projectData.status}</Badge>
            </div>
          </div>
        </div>
        <Button>Edit Project</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="bg-card rounded-3xl card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-peach flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">{projectData.progress}%</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Progress</p>
            <Progress value={projectData.progress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-card rounded-3xl card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-lime flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">{projectData.stats.completed}/{projectData.stats.totalTasks}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">{projectData.stats.inProgress} active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card rounded-3xl card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-amber flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">{projectData.stats.hoursLogged}h</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Hours Logged</p>
            <Progress value={timePercentage} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">of {projectData.stats.estimatedHours}h estimated</p>
          </CardContent>
        </Card>

        <Card className="bg-card rounded-3xl card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-lavender flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">{projectData.spent}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Budget Spent</p>
            <Progress value={budgetPercentage} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1">of {projectData.budget} budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <Card className="bg-card rounded-3xl card-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{projectData.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-semibold">{projectData.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warning flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="text-sm font-semibold">{projectData.deadline}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Status */}
          <Card className="bg-card rounded-3xl card-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Task Status</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projectData.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      {task.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-success-foreground" />
                      ) : task.status === "in-progress" ? (
                        <Circle className="w-5 h-5 text-chart-blue" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">Due: {task.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card rounded-3xl card-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{activity.user}</AvatarFallback>
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
          <Card className="bg-card rounded-3xl card-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Team</CardTitle>
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-11 h-11">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="gradient-peach text-sm font-semibold text-primary">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Task Distribution */}
          <Card className="bg-card rounded-3xl card-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Task Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      Completed
                    </span>
                    <span className="text-sm font-semibold">{projectData.stats.completed}</span>
                  </div>
                  <Progress value={(projectData.stats.completed / projectData.stats.totalTasks) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-chart-blue" />
                      In Progress
                    </span>
                    <span className="text-sm font-semibold">{projectData.stats.inProgress}</span>
                  </div>
                  <Progress value={(projectData.stats.inProgress / projectData.stats.totalTasks) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted" />
                      Pending
                    </span>
                    <span className="text-sm font-semibold">{projectData.stats.pending}</span>
                  </div>
                  <Progress value={(projectData.stats.pending / projectData.stats.totalTasks) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Tracking Summary */}
          <Card className="bg-card rounded-3xl card-shadow gradient-blue">
            <CardContent className="p-6">
              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold mb-2">{projectData.stats.hoursLogged}h</h3>
                <p className="text-sm text-muted-foreground mb-1">Total Time Logged</p>
                <p className="text-xs text-muted-foreground">
                  {((projectData.stats.hoursLogged / projectData.stats.estimatedHours) * 100).toFixed(0)}% of estimated time
                </p>
                <Button variant="secondary" size="sm" className="mt-4">
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
