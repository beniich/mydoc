import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, FileText, Activity } from "lucide-react";
import { DoctorTools } from '@/components/dashboard/DoctorTools';

// DOCTOR VIEW COMPONENTS
export function DoctorDashboard({ onAction }: { onAction?: (msg: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      
      {/* New Doctor Tools Section */}
      <DoctorTools onAction={onAction} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-border">
        <div>
          <h2 className="text-xl font-bold text-foreground">Overview & Stats</h2>
          <p className="text-muted-foreground">Quick summary of your practice today.</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="h-4 w-4" /> View Calendar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
          {/* Quick Stats */}
          <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-6">
                  <p className="text-sm font-medium text-blue-600">Total Patients</p>
                  <h3 className="text-3xl font-bold text-blue-700 mt-2">1,245</h3>
              </CardContent>
          </Card>
          <Card className="bg-emerald-500/10 border-emerald-500/20">
              <CardContent className="p-6">
                  <p className="text-sm font-medium text-emerald-600">Appointments Today</p>
                  <h3 className="text-3xl font-bold text-emerald-700 mt-2">5</h3>
              </CardContent>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-6">
                  <p className="text-sm font-medium text-purple-600">Pending Reports</p>
                  <h3 className="text-3xl font-bold text-purple-700 mt-2">3</h3>
              </CardContent>
          </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
           <Card className="md:col-span-1">
               <CardHeader>
                   <CardTitle>Next Appointment</CardTitle>
                   <CardDescription>Upcoming patient details</CardDescription>
               </CardHeader>
               <CardContent>
                   <div className="p-4 border border-border rounded-lg bg-card">
                       <div className="flex justify-between items-start mb-4">
                           <div>
                               <h4 className="font-bold text-lg">Emma Wilson</h4>
                               <p className="text-sm text-muted-foreground">General Checkup</p>
                           </div>
                           <Badge>10:00 AM</Badge>
                       </div>
                       <div className="space-y-2 text-sm">
                           <div className="flex items-center gap-2 text-muted-foreground">
                               <Clock className="h-4 w-4" /> 30 mins duration
                           </div>
                           <div className="flex items-center gap-2 text-muted-foreground">
                               <FileText className="h-4 w-4" /> Last visit: 2 months ago
                           </div>
                       </div>
                       <Button className="w-full mt-4" variant="outline">View Patient Record</Button>
                   </div>
               </CardContent>
           </Card>

           <Card className="md:col-span-1">
               <CardHeader>
                   <CardTitle>Recent Activity</CardTitle>
               </CardHeader>
               <CardContent>
                   <div className="space-y-4">
                       {[1,2,3].map(i => (
                           <div key={i} className="flex items-center gap-3 pb-3 border-b border-border last:border-0">
                               <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                   <Activity className="h-4 w-4" />
                               </div>
                               <div>
                                   <p className="text-sm font-medium">Lab results uploaded</p>
                                   <p className="text-xs text-muted-foreground">For Patient #8493</p>
                               </div>
                               <span className="ml-auto text-xs text-muted-foreground">2h ago</span>
                           </div>
                       ))}
                   </div>
               </CardContent>
           </Card>
       </div>
    </div>
  );
}

// CLIENT (PATIENT) VIEW COMPONENTS
export function ClientDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Health Portal</h1>
          <p className="text-muted-foreground">Manage your appointments and medical records</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
          <Card className="col-span-2">
              <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center p-4 border border-border rounded-lg bg-primary/5 border-l-4 border-l-primary">
                      <div className="mr-4 text-center">
                          <p className="text-xs text-muted-foreground uppercase">Oct</p>
                          <p className="text-2xl font-bold">24</p>
                      </div>
                      <div>
                          <h4 className="font-bold">Dr. Sarah Johnson</h4>
                          <p className="text-sm text-muted-foreground">Dental Checkup • 10:00 AM</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                               <MapPin className="h-3 w-3" /> Clinic A, Room 302
                          </div>
                      </div>
                      <Button className="ml-auto" size="sm">Reschedule</Button>
                  </div>
              </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle>Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-2">
                      <li className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer">
                          <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Blood Test Results</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Oct 10</span>
                      </li>
                      <li className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer">
                          <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Prescription #492</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Sep 28</span>
                      </li>
                  </ul>
                  <Button variant="link" className="w-full mt-2 text-primary">View All Records</Button>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
