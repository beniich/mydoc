// @ts-nocheck
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, Filter, Download, Plus, MoreHorizontal } from "lucide-react";

const tableData = [
  { id: "ORD-001", date: "Oct 24, 2023", customer: "Apex Solutions", status: "Completed", amount: "$4,500.00", items: 12 },
  { id: "ORD-002", date: "Oct 24, 2023", customer: "Tech Flow Inc", status: "Processing", amount: "$2,340.50", items: 5 },
  { id: "ORD-003", date: "Oct 23, 2023", customer: "Eco Systems", status: "Cancelled", amount: "$1,200.00", items: 2 },
  { id: "ORD-004", date: "Oct 23, 2023", customer: "Global Corp", status: "Completed", amount: "$8,900.00", items: 24 },
  { id: "ORD-005", date: "Oct 22, 2023", customer: "Smart Innovation", status: "On Hold", amount: "$3,450.00", items: 8 },
  { id: "ORD-006", date: "Oct 22, 2023", customer: "NextGen Web", status: "Completed", amount: "$675.00", items: 1 },
  { id: "ORD-007", date: "Oct 21, 2023", customer: "Alpha Stream", status: "Processing", amount: "$5,600.00", items: 15 },
];

export function SpreadsheetsContent({ onAction }: { onAction?: (msg: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Spreadsheets</h1>
          <p className="text-muted-foreground">Manage your orders and data tables</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> Export
            </Button>
            <Button 
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => onAction && onAction("New record form opening...")}
            >
                <Plus className="h-4 w-4" /> Add Record
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
                <Tabs defaultValue="all" className="w-[400px]">
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Input placeholder="Search orders..." className="pl-8" />
                    <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Items</th>
                            <th className="p-4 text-right">Amount</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {tableData.map((row) => (
                            <tr key={row.id} className="hover:bg-muted/50 transition-colors bg-card">
                                <td className="p-4 font-medium text-foreground">{row.id}</td>
                                <td className="p-4 text-muted-foreground">{row.date}</td>
                                <td className="p-4 text-foreground">{row.customer}</td>
                                <td className="p-4">
                                    <Badge variant={
                                        row.status === 'Completed' ? 'default' : 
                                        row.status === 'Processing' ? 'secondary' : 
                                        row.status === 'Cancelled' ? 'destructive' : 'outline'
                                    } className={
                                        row.status === 'Completed' ? 'bg-emerald-500 hover:bg-emerald-600' : ''
                                    }>
                                        {row.status}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right text-muted-foreground">{row.items}</td>
                                <td className="p-4 text-right font-bold text-foreground">{row.amount}</td>
                                <td className="p-4 text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                <p>Showing 7 of 45 records</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
